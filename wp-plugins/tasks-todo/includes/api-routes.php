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
        'methods' => ['DELETE', 'PUT'], // Add PUT here
        'callback' => 'tasks_todo_handle_task',
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

// Delete or update task (PUT or DELETE handler)
function tasks_todo_handle_task( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks';
    $id = intval( $request['id'] );

    if ( $request->get_method() === 'DELETE' ) {
        $wpdb->delete( $table_name, [ 'id' => $id ] );
        return [ 'success' => true, 'message' => 'Task deleted successfully' ];
    }

    if ( $request->get_method() === 'PUT' ) {
        $data = $request->get_json_params();
        $wpdb->update( $table_name, [
            'title' => sanitize_text_field( $data['title'] ),
            'content' => sanitize_textarea_field( $data['content'] ),
            'tags' => sanitize_text_field( $data['tags'] ),
            'categories' => sanitize_text_field( $data['categories'] ),
            'assigned' => intval( $data['assigned'] )
        ], [ 'id' => $id ] );
        return [ 'success' => true, 'message' => 'Task updated successfully' ];
    }

    return new WP_Error( 'invalid_method', 'Invalid method', [ 'status' => 400 ] );
}

// Verify JWT
function tasks_todo_verify_token( $request ) {
    // Add JWT token verification logic here
    return true;
}
