<?php
/**
 * Plugin Name: Post Engagement Meter
 * Description: Manage post analytics with a custom table in WordPress. Includes REST API, admin dashboard, and proper uninstall handling.
 * Version: 1.6
 * Author: Mohamed Hafez
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Activation Hook: Create Table
register_activation_hook(__FILE__, 'post_engagement_meter_create_table');
function post_engagement_meter_create_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'post_engagement_meter';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        post_id BIGINT(20) UNSIGNED NOT NULL,
        post_title VARCHAR(255) NOT NULL,
        post_author VARCHAR(255) NOT NULL,
        post_categories TEXT NOT NULL,
        post_tags TEXT NOT NULL,
        likes_count BIGINT(20) UNSIGNED DEFAULT 0,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Deactivation Hook: Keep Table
register_deactivation_hook(__FILE__, 'post_engagement_meter_deactivate');
function post_engagement_meter_deactivate() {
    // Do nothing; keep the table intact
}

// Uninstall Hook: Remove Table
register_uninstall_hook(__FILE__, 'post_engagement_meter_uninstall');
function post_engagement_meter_uninstall() {
    if (!defined('WP_UNINSTALL_PLUGIN')) {
        exit;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'post_engagement_meter';
    $wpdb->query("DROP TABLE IF EXISTS $table_name");
}

// Add Admin Dashboard
add_action('admin_menu', 'post_engagement_meter_add_menu');
function post_engagement_meter_add_menu() {
    add_menu_page(
        'Post Engagement Meter',
        'Post Engagement Meter',
        'manage_options',
        'post-engagement-meter',
        'post_engagement_meter_dashboard',
        'dashicons-chart-bar',
        108
    );
}

// Admin Dashboard Content
// function post_engagement_meter_dashboard() {
//     global $wpdb;
//     $table_name = $wpdb->prefix . 'post_engagement_meter';

//     // Check if table exists
//     $table_exists = ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name);

//     echo '<div class="wrap">';
//     echo '<h1 class="wp-heading-inline">Post Engagement Meter Dashboard</h1>';

//     if (!$table_exists) {
//         echo '<p>The analytics table does not exist. Click the button below to create it.</p>';
//         echo '<form method="post">';
//         echo '<input type="hidden" name="create_table_action" value="1">';
//         echo '<button type="submit" class="button button-primary">Create Analytics Table</button>';
//         echo '</form>';

//         if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_table_action'])) {
//             post_engagement_meter_create_table();
//             echo '<p>Table created successfully! Refresh the page to view it.</p>';
//             return;
//         }
//     } else {
//         $results = $wpdb->get_results("SELECT * FROM $table_name");

//         if (!empty($results)) {
//             echo '<div class="w-3/4 mx-auto mt-4">';
//             echo '<table class="table-auto border-collapse border border-gray-300 w-full">';
//             echo '<thead><tr class="bg-gray-200">';
//             echo '<th class="border border-gray-300 px-4 py-2">ID</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Post ID</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Title</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Author</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Categories</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Tags</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Likes</th>';
//             echo '</tr></thead><tbody>';

//             foreach ($results as $row) {
//                 echo '<tr>';
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->id}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_id}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_title}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_author}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_categories}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_tags}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->likes_count}</td>";
//                 echo '</tr>';
//             }

//             echo '</tbody></table>';
//             echo '</div>';
//         } else {
//             echo '<p>No data available yet.</p>';
//         }
//     }

//     echo '</div>';
// }

// function post_engagement_meter_dashboard() {
//     global $wpdb;
//     $table_name = $wpdb->prefix . 'post_engagement_meter';

//     // Check if table exists
//     $table_exists = ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name);

//     echo '<div class="wrap">';
//     echo '<h1 class="wp-heading-inline">Blooming Brands LLC</h1>';

//     if (!$table_exists) {
//         // Show message and button to create the table if it doesn't exist
//         echo '<p>The analytics table does not exist. Click the button below to create it.</p>';
//         echo '<form method="post">';
//         echo '<input type="hidden" name="create_table_action" value="1">';
//         echo '<button type="submit" class="button button-primary">Create Analytics Table</button>';
//         echo '</form>';

//         if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_table_action'])) {
//             post_engagement_meter_create_table();
//             echo '<p>Table created successfully! Refresh the page to view it.</p>';
//             return;
//         }
//     } else {
//         // Fetch the table data
//         $results = $wpdb->get_results("SELECT * FROM $table_name");

//         if (!empty($results)) {
//             // Display the table
//             echo '<div class="w-3/4 mt-4">';
//             echo '<table class="table-auto border-collapse border border-gray-300 w-full">';
//             echo '<thead><tr class="bg-gray-200 text-left">';
//             echo '<th class="border border-gray-300 px-4 py-2">ID</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Post ID</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Title</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Author</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Categories</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Tags</th>';
//             echo '<th class="border border-gray-300 px-4 py-2">Likes</th>';
//             echo '</tr></thead><tbody>';

//             foreach ($results as $row) {
//                 // Check if the author name is valid; fallback to "Unknown" if missing
//                 $author_name = !empty($row->post_author) ? $row->post_author : 'Unknown';

//                 echo '<tr>';
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->id}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_id}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_title}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$author_name}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_categories}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_tags}</td>";
//                 echo "<td class='border border-gray-300 px-4 py-2'>{$row->likes_count}</td>";
//                 echo '</tr>';
//             }

//             echo '</tbody></table>';
//             echo '</div>';
//         } else {
//             // Show a message if no data is available
//             echo '<p>No data available yet.</p>';
//         }
//     }

//     echo '</div>';
// }

function post_engagement_meter_dashboard() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'post_engagement_meter';

    // Check if the table exists
    $table_exists = ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name);

    echo '<div class="wrap">';
    echo '<h1 class="wp-heading-inline">Blooming Brands LLC</h1>';

    if (!$table_exists) {
        // Show message and button to create the table if it doesn't exist
        echo '<p>The analytics table does not exist. Click the button below to create it.</p>';
        echo '<form method="post">';
        echo '<input type="hidden" name="create_table_action" value="1">';
        echo '<button type="submit" class="button button-primary">Create Analytics Table</button>';
        echo '</form>';

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_table_action'])) {
            post_engagement_meter_create_table();
            echo '<p>Table created successfully! Refresh the page to view it.</p>';
            return;
        }
    } else {
        // Handle manual like updates
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_likes'])) {
            $post_id = intval($_POST['post_id']);
            $action = $_POST['action'];

            if ($action === 'add') {
                $wpdb->query($wpdb->prepare(
                    "UPDATE $table_name SET likes_count = likes_count + 1 WHERE post_id = %d",
                    $post_id
                ));
            } elseif ($action === 'remove') {
                $wpdb->query($wpdb->prepare(
                    "UPDATE $table_name SET likes_count = GREATEST(likes_count - 1, 0) WHERE post_id = %d",
                    $post_id
                ));
            }

            echo '<p>Likes updated successfully! Refresh the page to see changes.</p>';
        }

        // Fetch the table data
        $results = $wpdb->get_results("SELECT * FROM $table_name");

        if (!empty($results)) {
            // Display the table
            echo '<div class="w-3/4 mt-4">';
            echo '<h1>Post Engagement Meter Plugin</h1>';
            echo '<p style="display:flex;flex-direction:column;row-gap:10px;margin-bottom:25px;margin-top:25px;">';
            echo '<a style="width:260px;border:1px solid black; background-color:blue;color:white;padding:5px 10px; margin-right:10px" href="https://blooming-brands.com/contact">Buy/Download/Get License</a>';
            echo '<a style="width:260px;border:1px solid black; background-color:green;color:white;padding:5px 10px; margin-right:10px" href="https://blooming-brands.com/contact">Need Support</a>';
            echo '</p>';
            echo '<table class="table-auto border-collapse border border-gray-300 w-full">';
            echo '<thead><tr class="bg-gray-200 text-left">';
            echo '<th class="border border-gray-300 px-4 py-2">ID</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Post ID</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Title</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Author</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Categories</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Tags</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Likes</th>';
            echo '<th class="border border-gray-300 px-4 py-2">Actions</th>';
            echo '</tr></thead><tbody>';

            foreach ($results as $row) {
                // Check if the author name is valid; fallback to "Unknown" if missing
                $author_name = !empty($row->post_author) ? $row->post_author : 'Unknown';

                echo '<tr>';
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->id}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_id}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_title}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$author_name}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_categories}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->post_tags}</td>";
                echo "<td class='border border-gray-300 px-4 py-2'>{$row->likes_count}</td>";
                echo '<td class="border border-gray-300 px-4 py-2">';
                echo '<form method="post" style="display: inline-block; margin-right: 5px;">';
                echo '<input type="hidden" name="post_id" value="' . esc_attr($row->post_id) . '">';
                echo '<input type="hidden" name="action" value="add">';
                echo '<div class="w-full flex flex-row justify-center items-center gap-2">';
                echo '<button type="submit" name="update_likes" class="button button-small flex justify-center bg-green-500 text-white">+</button>';
                echo '</form>';
                echo '<form method="post" style="display: inline-block;">';
                echo '<input type="hidden" name="post_id" value="' . esc_attr($row->post_id) . '">';
                echo '<input type="hidden" name="action" value="remove">';
                echo '<button type="submit" name="update_likes" class="button button-small flex justify-center bg-red-500 text-white" >-</button>';
                echo '</div>';
                echo '</form>';
                echo '</td>';
                echo '</tr>';
            }

            echo '</tbody></table>';
            echo '</div>';
        } else {
            // Show a message if no data is available
            echo '<p>No data available yet.</p>';
        }
    }

    echo '</div>';
}



// Add REST API Endpoints
// add_action('rest_api_init', function () {
//     register_rest_route('post-engagement-meter/v1', '/get-likes/(?P<post_id>\d+)', [
//         'methods' => 'GET',
//         'callback' => 'post_engagement_meter_get_likes',
//         'permission_callback' => '__return_true',
//     ]);

//     register_rest_route('post-engagement-meter/v1', '/add-like', [
//         'methods' => 'POST',
//         'callback' => 'post_engagement_meter_add_like',
//         'permission_callback' => '__return_true',
//     ]);
// });

// Add REST API Endpoints
add_action('rest_api_init', function () {
    // Route to get likes for a specific post
    register_rest_route('post-engagement-meter/v1', '/get-likes/(?P<post_id>\d+)', [
        'methods' => 'GET',
        'callback' => 'post_engagement_meter_get_likes',
        'permission_callback' => '__return_true', // Allow public access
    ]);

    // Route to add a like to a specific post
    register_rest_route('post-engagement-meter/v1', '/add-like', [
        'methods' => 'POST',
        'callback' => 'post_engagement_meter_add_like',
        'permission_callback' => '__return_true', // Allow public access
    ]);

    // Route to remove a like from a specific post
    register_rest_route('post-engagement-meter/v1', '/remove-like', [
        'methods' => 'POST',
        'callback' => 'post_engagement_meter_remove_like',
        'permission_callback' => '__return_true', // Allow public access
    ]);
});


// Add a Like to a Post
// function post_engagement_meter_add_like($request) {
//     global $wpdb;
//     $table_name = $wpdb->prefix . 'post_engagement_meter';

//     $post_id = $request->get_param('post_id');
//     $post = get_post($post_id);

//     if (!$post) {
//         return new WP_REST_Response(['message' => 'Post not found'], 404);
//     }

//     $categories = implode(', ', wp_get_post_categories($post_id, ['fields' => 'names']));
//     $tags = implode(', ', wp_get_post_tags($post_id, ['fields' => 'names']));
//     $author_name = get_the_author_meta('display_name', $post->post_author);

//     $existing_likes = $wpdb->get_var($wpdb->prepare("SELECT likes_count FROM $table_name WHERE post_id = %d", $post_id));

//     if ($existing_likes === null) {
//         $wpdb->insert($table_name, [
//             'post_id' => $post_id,
//             'post_title' => $post->post_title,
//             'post_author' => $author_name,
//             'post_categories' => $categories,
//             'post_tags' => $tags,
//             'likes_count' => 1,
//         ]);
//     } else {
//         $wpdb->update($table_name, ['likes_count' => $existing_likes + 1], ['post_id' => $post_id]);
//     }

//     return new WP_REST_Response(['post_id' => $post_id, 'likes_count' => $existing_likes + 1], 200);
// }

function post_engagement_meter_get_likes($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'post_engagement_meter';

    // Get the post ID from the request
    $post_id = $request->get_param('post_id');

    // Query the database for the likes count
    $likes_count = $wpdb->get_var($wpdb->prepare(
        "SELECT likes_count FROM $table_name WHERE post_id = %d",
        $post_id
    ));

    // Check if the post exists in the database
    if ($likes_count === null) {
        return new WP_REST_Response([
            'message' => 'Post not found',
            'likes_count' => 0,
        ], 404);
    }

    // Return the likes count
    return new WP_REST_Response([
        'post_id' => $post_id,
        'likes_count' => (int) $likes_count,
    ], 200);
}


// function post_engagement_meter_add_like($request) {
//     global $wpdb;
//     $table_name = $wpdb->prefix . 'post_engagement_meter';

//     $post_id = $request->get_param('post_id');
//     $post = get_post($post_id);

//     if (!$post) {
//         return new WP_REST_Response(['message' => 'Post not found'], 404);
//     }

//     $categories = implode(', ', wp_get_post_categories($post_id, ['fields' => 'names']));
//     $tags = implode(', ', wp_get_post_tags($post_id, ['fields' => 'names']));
//     $author_name = get_the_author_meta('display_name', $post->post_author); // Fetch the author's display name

//     $existing_likes = $wpdb->get_var($wpdb->prepare("SELECT likes_count FROM $table_name WHERE post_id = %d", $post_id));

//     if ($existing_likes === null) {
//         $wpdb->insert($table_name, [
//             'post_id' => $post_id,
//             'post_title' => $post->post_title,
//             'post_author' => $author_name, // Save the author's name
//             'post_categories' => $categories,
//             'post_tags' => $tags,
//             'likes_count' => 1,
//         ]);
//     } else {
//         $wpdb->update($table_name, ['likes_count' => $existing_likes + 1], ['post_id' => $post_id]);
//     }

//     return new WP_REST_Response(['post_id' => $post_id, 'likes_count' => $existing_likes + 1], 200);
// }


// post_engagement_meter_add_like
function post_engagement_meter_add_like($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'post_engagement_meter';

    // Get the post ID from the request body
    $post_id = $request->get_param('post_id');
    $post = get_post($post_id);

    if (!$post) {
        return new WP_REST_Response(['message' => 'Post not found'], 404);
    }

    // Check if the post already has a record in the database
    $existing_likes = $wpdb->get_var($wpdb->prepare(
        "SELECT likes_count FROM $table_name WHERE post_id = %d",
        $post_id
    ));

    if ($existing_likes === null) {
        // If no record exists, insert a new one with 1 like
        $wpdb->insert($table_name, [
            'post_id' => $post_id,
            'post_title' => $post->post_title,
            'post_author' => get_the_author_meta('display_name', $post->post_author),
            'post_categories' => implode(', ', wp_get_post_categories($post_id, ['fields' => 'names'])),
            'post_tags' => implode(', ', wp_get_post_tags($post_id, ['fields' => 'names'])),
            'likes_count' => 1,
        ]);
    } else {
        // If a record exists, increment the like count
        $wpdb->update($table_name, [
            'likes_count' => $existing_likes + 1,
        ], ['post_id' => $post_id]);
    }

    // Return the updated likes count
    $updated_likes = $wpdb->get_var($wpdb->prepare(
        "SELECT likes_count FROM $table_name WHERE post_id = %d",
        $post_id
    ));

    return new WP_REST_Response([
        'post_id' => $post_id,
        'likes_count' => (int) $updated_likes,
    ], 200);
}


function post_engagement_meter_remove_like($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'post_engagement_meter';

    // Get the post ID from the request body
    $post_id = $request->get_param('post_id');
    $existing_likes = $wpdb->get_var($wpdb->prepare(
        "SELECT likes_count FROM $table_name WHERE post_id = %d",
        $post_id
    ));

    if ($existing_likes === null) {
        return new WP_REST_Response(['message' => 'Post not found'], 404);
    }

    // Ensure likes count doesn't go below 0
    $new_likes = max(0, $existing_likes - 1);

    $wpdb->update($table_name, ['likes_count' => $new_likes], ['post_id' => $post_id]);

    return new WP_REST_Response([
        'post_id' => $post_id,
        'likes_count' => $new_likes,
    ], 200);
}


