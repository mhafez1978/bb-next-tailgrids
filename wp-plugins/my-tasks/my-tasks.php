<?php
/**
 * Plugin Name: My Tasks
 * Description: A personal task management plugin for WordPress users with role-based task visibility. Admins and editors can manage all tasks, while other roles manage only their tasks.
 * Version: 1.3
 * Author: Mohamed Hafez
 * License: GPL2
 *
 * API Endpoints:
 * 1. GET    /wp-json/mytasks/v1/tasks
 *    - Fetch all tasks.
 *    - Admin/Editor: Fetch all tasks.
 *    - Other Roles: Fetch only their tasks.
 *
 * 2. POST   /wp-json/mytasks/v1/tasks
 *    - Create a new task.
 *    - Required: title, content.
 *    - Optional: tags, categories.
 *
 * 3. PUT    /wp-json/mytasks/v1/tasks/{id}
 *    - Update an existing task.
 *    - Admin/Editor: Update any task.
 *    - Other Roles: Update only their tasks.
 *    - Required: title, content.
 *
 * 4. DELETE /wp-json/mytasks/v1/tasks/{id}
 *    - Delete an existing task.
 *    - Admin/Editor: Delete any task.
 *    - Other Roles: Delete only their tasks.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Include API routes
require_once plugin_dir_path( __FILE__ ) . 'includes/api-routes.php';

// Add menu to admin panel
function my_plugin_add_admin_menu() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'my_tasks';
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name;

    $current_user = wp_get_current_user();

    $menu_title = ( in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) )
        ? 'Task Mgr'
        : ( $table_exists ? 'My Tasks' : '' );

    if ( $menu_title ) {
        add_menu_page(
            'My Tasks Dashboard',
            $menu_title,
            'read',
            'my-tasks',
            'my_tasks_render_admin_page',
            'dashicons-plus',
            111
        );
    }
}
add_action( 'admin_menu', 'my_plugin_add_admin_menu' );

// Render Admin Page
function my_tasks_render_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $current_user = wp_get_current_user();
    $current_user_id = get_current_user_id();
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name;

    if ( ! $table_exists ) {
        echo '<div class="wrap">';
        echo '<h1 class="text-3xl font-bold">Tasks Dashboard</h1>';
        echo '<div class="bg-red-100 text-red-800 p-4 rounded">The tasks table does not exist. Please create it by activating the plugin.</div>';
        echo '</div>';
        return;
    }

    $tasks = ( in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) )
        ? $wpdb->get_results( "SELECT * FROM $table_name" )
        : $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $table_name WHERE author = %d", $current_user_id ) );

    echo '<div class="wrap flex flex-col lg:flex-row gap-6">';
    
    // Left Section: Tasks List
    echo '<div class="lg:w-3/4 bg-gray-100 rounded-lg shadow-lg p-6">';
    echo '<h1 class="text-3xl font-bold mb-4">Tasks Dashboard</h1>';
    
    if ( empty( $tasks ) ) {
        echo '<div class="bg-yellow-100 text-yellow-800 rounded-lg p-4 text-center">No tasks found. Add a new task to get started!</div>';
    } else {
        echo '<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">';
        foreach ( $tasks as $task ) {
            echo '<li class="relative bg-white shadow-md border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-xl">';
            echo '<h2 class="font-bold text-xl text-gray-700">' . esc_html( $task->title ) . '</h2>';
            echo '<p class="text-gray-600">' . esc_html( $task->content ) . '</p>';
            echo '<p class="text-gray-500 text-sm">Tags: ' . esc_html( $task->tags ) . '</p>';
            echo '<p class="text-gray-500 text-sm">Categories: ' . esc_html( $task->categories ) . '</p>';
            echo '<p class="text-gray-500 text-sm">Created By: ' . ( $task->author == $current_user_id ? 'You' : 'User ID ' . $task->author ) . '</p>';

            if ( $task->author == $current_user_id || in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) {
                echo '<div class="absolute bottom-2 left-2 flex gap-2">';
                echo '<button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editTask(' . esc_js( $task->id ) . ')">Edit</button>';
                echo '<button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteTask(' . esc_js( $task->id ) . ')">Delete</button>';
                echo '</div>';
            }

            echo '</li>';
        }
        echo '</ul>';
    }
    echo '</div>'; // Close Left Section

    // Right Section: Task Form
    echo '<div class="lg:w-1/4 bg-white rounded-lg shadow-md p-6">';
    echo '<h2 class="text-2xl font-bold mb-4" id="form-title">Add New Task</h2>';
    echo '<form id="task-form" method="post" class="space-y-4">';
    echo '<input type="hidden" id="task-id" name="task_id" value="">'; // Hidden field for editing
    echo '<input type="text" id="task-title" name="task_title" placeholder="Task Title" class="w-full p-2 border rounded" required>';
    echo '<textarea id="task-content" name="task_content" placeholder="Task Content" class="w-full p-2 border rounded" required></textarea>';
    echo '<input type="text" id="task-tags" name="task_tags" placeholder="Tags" class="w-full p-2 border rounded">';
    echo '<input type="text" id="task-categories" name="task_categories" placeholder="Categories" class="w-full p-2 border rounded">';
    echo '<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Task</button>';
    echo '</form>';
    echo '</div>'; // Close Right Section

    echo '</div>'; // Close Main Wrapper
    ?>

    <script>
        async function editTask(taskId) {
            const response = await fetch(`/wp-json/mytasks/v1/tasks/${taskId}`);
            if (!response.ok) {
                alert("Failed to fetch task data.");
                return;
            }
            const task = await response.json();
            document.getElementById("task-id").value = task.id;
            document.getElementById("task-title").value = task.title;
            document.getElementById("task-content").value = task.content;
            document.getElementById("task-tags").value = task.tags || '';
            document.getElementById("task-categories").value = task.categories || '';
            document.getElementById("form-title").innerText = "Edit Task";
        }

        async function deleteTask(taskId) {
            if (!confirm("Are you sure you want to delete this task?")) {
                return;
            }
            const response = await fetch(`/wp-json/mytasks/v1/tasks/${taskId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                alert("Failed to delete task.");
                return;
            }
            location.reload();
        }
    </script>
    <?php
}

// Enqueue TailwindCSS
function my_tasks_enqueue_styles() {
    wp_enqueue_style( 'tailwindcss', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', [], '2.2.19' );
}
add_action( 'admin_enqueue_scripts', 'my_tasks_enqueue_styles' );

// Create table on plugin activation
function my_tasks_create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        content text NOT NULL,
        tags varchar(255),
        categories varchar(255),
        author bigint(20) UNSIGNED NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'my_tasks_create_table' );
