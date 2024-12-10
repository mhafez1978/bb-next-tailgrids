<!-- <?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Register API routes
add_action( 'rest_api_init', function () {
    register_rest_route( 'mytasks/v2', '/tasks', [
        'methods'  => 'GET',
        'callback' => 'mytasks_get_tasks',
        'permission_callback' => 'is_user_logged_in'
    ]);

    register_rest_route( 'mytasks/v2', '/tasks', [
        'methods'  => 'POST',
        'callback' => 'mytasks_add_task',
        'permission_callback' => 'is_user_logged_in'
    ]);

    register_rest_route( 'mytasks/v2', '/tasks/(?P<id>\d+)', [
        'methods'  => ['PUT', 'DELETE'],
        'callback' => 'mytasks_modify_task',
        'permission_callback' => 'is_user_logged_in'
    ]);
});

// **1. GET tasks**
function mytasks_get_tasks( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $current_user_id = get_current_user_id();
    $current_user = wp_get_current_user();

    // Admins/Editors: Fetch all tasks. Others: Fetch their tasks.
    if ( in_array( 'administrator', $current_user->roles ) || in_array( 'editor', $current_user->roles ) ) {
        $tasks = $wpdb->get_results( "SELECT * FROM $table_name" );
    } else {
        $tasks = $wpdb->get_results(
            $wpdb->prepare( "SELECT * FROM $table_name WHERE author = %d", $current_user_id )
        );
    }

    return rest_ensure_response( $tasks );
}

// **2. POST task**
function mytasks_add_task( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $data = $request->get_json_params();

    // Validate required fields
    if ( empty( $data['title'] ) || empty( $data['content'] ) ) {
        return new WP_Error( 'invalid_data', 'Title and Content are required.', [ 'status' => 400 ] );
    }

    // Insert task into the database
    $wpdb->insert( $table_name, [
        'title'      => sanitize_text_field( $data['title'] ),
        'content'    => sanitize_textarea_field( $data['content'] ),
        'tags'       => sanitize_text_field( $data['tags'] ?? '' ),
        'categories' => sanitize_text_field( $data['categories'] ?? '' ),
        'author'     => get_current_user_id()
    ]);

    return rest_ensure_response( [ 'success' => true, 'message' => 'Task added successfully.' ] );
}

// **3. PUT/DELETE task**
function mytasks_modify_task( $request ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_tasks';
    $current_user_id = get_current_user_id();
    $current_user = wp_get_current_user();
    $task_id = intval( $request['id'] );

    // Fetch the task
    $task = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE id = %d", $task_id ) );

    if ( ! $task ) {
        return new WP_Error( 'not_found', 'Task not found.', [ 'status' => 404 ] );
    }

    // Permission check
    if ( $task->author !== $current_user_id && ! in_array( 'administrator', $current_user->roles ) && ! in_array( 'editor', $current_user->roles ) ) {
        return new WP_Error( 'unauthorized', 'You are not allowed to modify this task.', [ 'status' => 403 ] );
    }

    if ( $request->get_method() === 'DELETE' ) {
        // Delete task
        $wpdb->delete( $table_name, [ 'id' => $task_id ] );
        return rest_ensure_response( [ 'success' => true, 'message' => 'Task deleted successfully.' ] );
    } elseif ( $request->get_method() === 'PUT' ) {
        // Update task
        $data = $request->get_json_params();
        if ( empty( $data['title'] ) || empty( $data['content'] ) ) {
            return new WP_Error( 'invalid_data', 'Title and Content are required.', [ 'status' => 400 ] );
        }

        $wpdb->update(
            $table_name,
            [
                'title'      => sanitize_text_field( $data['title'] ),
                'content'    => sanitize_textarea_field( $data['content'] ),
                'tags'       => sanitize_text_field( $data['tags'] ?? '' ),
                'categories' => sanitize_text_field( $data['categories'] ?? '' )
            ],
            [ 'id' => $task_id ]
        );

        return rest_ensure_response( [ 'success' => true, 'message' => 'Task updated successfully.' ] );
    }
}
