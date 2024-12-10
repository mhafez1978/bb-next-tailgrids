<!-- Older routes -->
 
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register API routes
add_action( 'rest_api_init', function () {
    register_rest_route( 'tasks-todo/v2', '/tasks', [
        'methods' => 'GET',
        'callback' => 'tasks_todo_get_tasks',
        'permission_callback' => '__return_true'
    ]);

    register_rest_route( 'tasks-todo/v2', '/task', [
        'methods' => 'POST',
        'callback' => 'tasks_todo_add_task',
        'permission_callback' => 'tasks_todo_verify_token'
    ]);

    register_rest_route( 'tasks-todo/v2', '/task/(?P<id>\d+)', [
        'methods' => 'DELETE',
        'callback' => 'tasks_todo_delete_task',
        'permission_callback' => 'tasks_todo_verify_token'
    ]);
});

// Get tasks
function tasks_todo_get_tasks() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks';
    return $wpdb->get_results( "SELECT * FROM $table_name" );
}

// Add task
function tasks_todo_add_task( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks';
    $data = $request->get_json_params();
    $wpdb->insert( $table_name, [
        'title' => sanitize_text_field( $data['title'] ),
        'content' => sanitize_textarea_field( $data['content'] ),
        'tags' => sanitize_text_field( $data['tags'] ),
        'categories' => sanitize_text_field( $data['categories'] ),
        'author' => get_current_user_id(),
        'assigned' => intval( $data['assigned'] )
    ]);
    return [ 'success' => true ];
}

// Delete task
function tasks_todo_delete_task( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks';
    $wpdb->delete( $table_name, [ 'id' => intval( $request['id'] ) ] );
    return [ 'success' => true ];
}

// Verify JWT
function tasks_todo_verify_token( $request ) {
    // Add JWT token verification logic here
    return true;
}



