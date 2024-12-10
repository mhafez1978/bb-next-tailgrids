<?php
/**
 * Plugin Name: My Tasks
 * Description: A personal task management plugin for WordPress users with role-based task visibility. Admins and editors can manage all tasks, while other roles manage only their tasks.
 * Version: 1.2
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
 *    - Required: `title`, `content`.
 *    - Optional: `tags`, `categories`.
 *
 * 3. PUT    /wp-json/mytasks/v1/tasks/{id}
 *    - Update an existing task.
 *    - Admin/Editor: Update any task.
 *    - Other Roles: Update only their tasks.
 *    - Required: `title`, `content`.
 *
 * 4. DELETE /wp-json/mytasks/v1/tasks/{id}
 *    - Delete an existing task.
 *    - Admin/Editor: Delete any task.
 *    - Other Roles: Delete only their tasks.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Include API routes (if applicable, ensure this file exists)
require_once plugin_dir_path( __FILE__ ) . 'includes/api-routes.php';

// Add menu to admin panel
function my_plugin_add_admin_menu() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name;

    $current_user = wp_get_current_user();

    // Determine the menu title based on the user's role
    $menu_title = '';
    if ( in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) {
        $menu_title = 'Task Mgr'; // Admin/Editor sees "Task Mgr"
    } else {
        $menu_title = $table_exists ? 'My Tasks' : ''; // Other roles see "My Tasks" if the table exists
    }

    // Add the menu only if the title is set (e.g., table exists for non-admin roles)
    if ( $menu_title ) {
        add_menu_page(
            'My Tasks Dashboard',           // Page title
            $menu_title,                    // Menu title
            'read',                         // Capability (applies to all logged-in users)
            'my-tasks',                     // Menu slug
            'my_tasks_render_admin_page',   // Callback function
            'dashicons-plus',               // Icon
            111                             // Position
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

    // Check if the table exists
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name;

    // Fetch tasks
    $tasks = [];
    if ( $table_exists ) {
        if ( in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) {
            // Admins and editors can view all tasks
            $tasks = $wpdb->get_results( "SELECT * FROM $table_name" );
        } else {
            // Other roles can view only their own tasks
            $tasks = $wpdb->get_results(
                $wpdb->prepare( "SELECT * FROM $table_name WHERE author = %d", $current_user_id )
            );
        }
    }

    echo '<div class="wrap flex flex-col lg:flex-row gap-6">';

    // Left Section: Tasks List
    echo '<div class="lg:w-3/4 bg-gray-100 rounded-lg shadow-lg p-6">';
    echo '<h1 class="text-3xl font-bold mb-4">Tasks Dashboard</h1>';

    if ( empty( $tasks ) ) {
        echo '<div class="bg-yellow-100 text-yellow-800 rounded-lg p-4 text-center">
                <p>No tasks found. Add a new task to get started!</p>
              </div>';
    } else {
        echo '<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">';
        foreach ( $tasks as $task ) {
            echo '<li class="flex flex-col gap-4 bg-white shadow-md border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-xl relative">';
            echo '<h2 class="font-bold text-xl text-gray-700">' . esc_html( $task->title ) . '</h2>';
            echo'<hr/>';
            echo '<p class="text-gray-600 text-sm">' . esc_html( $task->content ) . '</p>';
            echo '<p class="text-gray-500 text-xs">Tags: ' . esc_html( $task->tags ) . '</p>';
            echo '<p class="text-gray-500 text-xs">Categories: ' . esc_html( $task->categories ) . '</p>';
            echo '<p class="text-gray-500 text-xs">Created By: ' . ( $task->author == $current_user_id ? 'You' : 'User ID ' . $task->author ) . '</p>';
            echo'<br>';
            // Buttons for Admin/Editor or task owner
            if ( $task->author == $current_user_id || in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) {
                echo '<div class="absolute bottom-2 left-2 flex gap-2">
                        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editTask(' . esc_js( $task->id ) . ')">Edit</button>
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteTask(' . esc_js( $task->id ) . ')">Delete</button>
                      </div>';
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

    // Hidden field for task ID during editing
    echo '<input type="hidden" id="task-id" name="task_id" value="">';

    // Title
    echo '<input type="text" id="task-title" name="task_title" placeholder="Task Title" class="w-full p-2 border rounded" required>';

    // Content
    echo '<textarea id="task-content" name="task_content" placeholder="Task Content" class="w-full p-2 border rounded" required></textarea>';

    // Tags
    echo '<input type="text" id="task-tags" name="task_tags" placeholder="Tags" class="w-full p-2 border rounded">';

    // Categories
    echo '<input type="text" id="task-categories" name="task_categories" placeholder="Categories" class="w-full p-2 border rounded">';

    echo '<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Task</button>';
    echo '</form>';
    echo '</div>'; // Close Right Section

    echo '</div>'; // Close Main Wrapper

    // Handle form submissions for task creation and editing
    if ( isset( $_POST['task_title'] ) && isset( $_POST['task_content'] ) ) {
        $task_id = isset( $_POST['task_id'] ) ? intval( $_POST['task_id'] ) : 0;
        $data = [
            'title' => sanitize_text_field( $_POST['task_title'] ),
            'content' => sanitize_textarea_field( $_POST['task_content'] ),
            'tags' => sanitize_text_field( $_POST['task_tags'] ),
            'categories' => sanitize_text_field( $_POST['task_categories'] ),
            'author' => $current_user_id,
        ];

        if ( $task_id > 0 ) {
            // Update task
            $wpdb->update( $table_name, $data, [ 'id' => $task_id ] );
        } else {
            // Create new task
            $wpdb->insert( $table_name, $data );
        }
        wp_redirect( admin_url( 'admin.php?page=my-tasks' ) );
        exit;
    }

    // Handle task deletion
    if ( isset( $_GET['delete_task'] ) && is_numeric( $_GET['delete_task'] ) ) {
        $task_id = intval( $_GET['delete_task'] );

        // Ensure only the author or admin/editor can delete the task
        $task = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE id = %d", $task_id ) );
        if ( $task && ( $task->author == $current_user_id || in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) ) {
            $wpdb->delete( $table_name, [ 'id' => $task_id ] );
        }
        wp_redirect( admin_url( 'admin.php?page=my-tasks' ) );
        exit;
    }
}

// Enqueue TailwindCSS from CDN
function my_tasks_enqueue_styles() {
    wp_enqueue_style(
        'tailwindcss',
        'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
        [],
        '2.2.19'
    );
}
add_action( 'admin_enqueue_scripts', 'my_tasks_enqueue_styles' );

// On plugin activation, check for the custom table
register_activation_hook( __FILE__, 'my_tasks_activation' );
function my_tasks_activation() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';

    if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) !== $table_name ) {
        set_transient( 'my_tasks_table_missing', true, 30 ); // Transient expires in 30 seconds
    }
}

// Create the custom table
function my_tasks_create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
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

// On plugin uninstallation, drop the custom table
register_uninstall_hook( __FILE__, 'my_tasks_uninstall' );
function my_tasks_uninstall() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';

    $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
}
