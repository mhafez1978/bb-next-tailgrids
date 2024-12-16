<?php
/**
 * Plugin Name: Tasks Todo
 * Description: A futuristic task management plugin.
 * Version: 1.0
 * Author: Moohamed Hafez
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Include API routes
require_once plugin_dir_path( __FILE__ ) . 'includes/api-routes.php';

// Add menu to admin panel
function tasks_todo_add_menu() {
    add_menu_page(
        'Tasks Todo',
        'Tasks Todo',
        'manage_options',
        'tasks-todo',
        'tasks_todo_render_dashboard',
        'dashicons-list-view',
        110
    );
}
add_action( 'admin_menu', 'tasks_todo_add_menu' );

// Load TailwindCSS
function tasks_todo_load_styles() {
    echo '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
}
add_action( 'admin_head', 'tasks_todo_load_styles' );

// Render Dashboard
function tasks_todo_render_dashboard() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks';

    // Check if table exists
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name;

    // Handle form submission
    if ( isset( $_POST['create_table'] ) && !$table_exists ) {
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            title varchar(255) NOT NULL,
            content text NOT NULL,
            tags varchar(255),
            categories varchar(255),
            author bigint(20) UNSIGNED NOT NULL,
            assigned bigint(20) UNSIGNED,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
        $table_exists = true;
        echo '<div class="notice notice-success"><p>Table created successfully!</p></div>';
    }

    // Handle adding a task
    if ( isset( $_POST['add_task'] ) ) {
        $wpdb->insert( $table_name, [
            'title' => sanitize_text_field( $_POST['title'] ),
            'content' => sanitize_textarea_field( $_POST['content'] ),
            'tags' => sanitize_text_field( $_POST['tags'] ),
            'categories' => sanitize_text_field( $_POST['categories'] ),
            'author' => get_current_user_id(),
            'assigned' => intval( $_POST['assigned'] )
        ] );
        echo '<div class="notice notice-success"><p>Task added successfully!</p></div>';
    }

    // Fetch tasks
    $tasks = $table_exists ? $wpdb->get_results( "SELECT * FROM $table_name" ) : [];

    ?>
    <div class="wrap">
        <h1 class="text-2xl font-bold mb-4">Tasks Todo Dashboard</h1>
        <form method="post" class="mb-6">
            <button type="submit" name="create_table" class="bg-blue-500 text-white px-4 py-2 rounded" <?php echo $table_exists ? 'disabled' : ''; ?>>
                <?php echo $table_exists ? 'Table Exists' : 'Create Table'; ?>
            </button>
        </form>
        <form method="post" class="mb-6">
            <div class="w-1/3 grid grid-cols-1 gap-4">
                <input type="text" name="title" placeholder="Task Title" class="border rounded p-2" required>
                <textarea name="content" placeholder="Task Content" class="border rounded p-2" required></textarea>
                <input type="text" name="tags" placeholder="Tags" class="border rounded p-2">
                <input type="text" name="categories" placeholder="Categories" class="border rounded p-2">
                <select name="assigned" class="border rounded p-2">
                    <option value="">Assign to User</option>
                    <?php
                    $users = get_users();
                    foreach ( $users as $user ) {
                        echo '<option value="' . esc_attr( $user->ID ) . '">' . esc_html( $user->display_name ) . '</option>';
                    }
                    ?>
                </select>
            </div>
            <button type="submit" name="add_task" class="bg-green-500 text-white px-4 py-2 rounded mt-4">Add Task</button>
        </form>
        <h2 class="text-xl font-bold mb-4">Tasks</h2>
        <div class="grid grid-cols-4 gap-4">
            <?php foreach ( $tasks as $task ) : ?>
                <div class="border rounded p-4 bg-gray-100">
                    <h3 class="font-bold"><?php echo esc_html( $task->title ); ?></h3>
                    <p><?php echo esc_html( $task->content ); ?></p>
                    <p><strong>Tags:</strong> <?php echo esc_html( $task->tags ); ?></p>
                    <p><strong>Categories:</strong> <?php echo esc_html( $task->categories ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
}