<?php
/**
 * Plugin Name: User Tracking Plugin
 * Description: Tracks user login and registration events with toggleable tracking, real-time updates, REST API endpoints, and database management.
 * Version: 1.0
 * Author: Mohamed Hafez
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Load tracking state from options
add_action('init', function () {
    if (get_option('usertrack_enabled') === false) {
        add_option('usertrack_enabled', false); // Default state is disabled
    }
});

// Activation Hook: Create Tables if Tracking is Enabled
register_activation_hook(__FILE__, 'usertrack_on_activation');
function usertrack_on_activation() {
    if (get_option('usertrack_enabled', false)) {
        usertrack_create_tables();
    }
}

// Uninstallation Hook: Delete Tables and Options
register_uninstall_hook(__FILE__, 'usertrack_on_uninstall');
function usertrack_on_uninstall() {
    global $wpdb;

    $login_logs_table = $wpdb->prefix . 'usertrack_login_logs';
    $registration_logs_table = $wpdb->prefix . 'usertrack_registration_logs';

    $wpdb->query("DROP TABLE IF EXISTS $login_logs_table");
    $wpdb->query("DROP TABLE IF EXISTS $registration_logs_table");
    delete_option('usertrack_enabled');
}

// Create Tables if They Don’t Exist
function usertrack_create_tables() {
    global $wpdb;

    $login_logs_table = $wpdb->prefix . 'usertrack_login_logs';
    $registration_logs_table = $wpdb->prefix . 'usertrack_registration_logs';
    $charset_collate = $wpdb->get_charset_collate();

    // Create login logs table
    if ($wpdb->get_var("SHOW TABLES LIKE '$login_logs_table'") !== $login_logs_table) {
        $wpdb->query("CREATE TABLE $login_logs_table (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            login_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;");
    }

    // Create registration logs table
    if ($wpdb->get_var("SHOW TABLES LIKE '$registration_logs_table'") !== $registration_logs_table) {
        $wpdb->query("CREATE TABLE $registration_logs_table (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            registration_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;");
    }
}

// Admin Menu: Settings and Logs
add_action('admin_menu', function () {
    add_menu_page(
        'User Tracking Settings',
        'User Tracking',
        'manage_options',
        'usertrack-settings',
        'usertrack_render_settings_page',
        'dashicons-desktop',
        101
    );

    add_submenu_page(
        'usertrack-settings',
        'User Tracking Logs',
        'Logs',
        'manage_options',
        'usertrack-logs',
        'usertrack_render_logs_page'
    );
});

// Render Settings Page with Toggle
function usertrack_render_settings_page() {
    $usertrack_enabled = get_option('usertrack_enabled', false);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $usertrack_enabled = isset($_POST['usertrack_enabled']) ? true : false;
        update_option('usertrack_enabled', $usertrack_enabled);

        if ($usertrack_enabled) {
            usertrack_create_tables();
        }

        echo '<div class="updated"><p>Settings saved.</p></div>';
    }

    echo '<div class="wrap">';
    echo '<h1>User Tracking Settings</h1>';
    echo '<form method="post">';
    echo '<label>';
    echo '<input type="checkbox" name="usertrack_enabled" value="1" ' . checked($usertrack_enabled, true, false) . '> Enable User Tracking';
    echo '</label>';
    echo '<p>Toggle user tracking. When enabled, logs are tracked, and the REST API is active.</p>';
    echo '<input type="submit" class="button-primary" value="Save Settings">';
    echo '</form>';
    echo '</div>';
}

// Render Logs Page with Real-Time Updates
function usertrack_render_logs_page() {
    echo '<div class="wrap">';
    echo '<h1>User Tracking Logs</h1>';
    echo '<h2>Login Logs</h2>';
    echo '<div id="login-logs"><p>Loading...</p></div>';
    echo '<h2>Registration Logs</h2>';
    echo '<div id="registration-logs"><p>Loading...</p></div>';

    echo '
    <script>
        async function fetchLogs() {
            const timezoneOffset = new Date().getTimezoneOffset(); // Get timezone offset in minutes
            const response = await fetch("/wp-json/usertrack/v1/logs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Timezone-Offset": timezoneOffset, // Send the timezone offset in the request headers
                },
            });
            const data = await response.json();

            if (data.login_logs) {
                document.getElementById("login-logs").innerHTML = `<table>
                    <thead><tr><th>Email</th><th>Login Time</th></tr></thead>
                    <tbody>${data.login_logs.map(log => `
                        <tr><td>${log.user_email}</td><td>${log.login_time}</td></tr>
                    `).join("")}</tbody>
                </table>`;
            } else {
                document.getElementById("login-logs").innerHTML = "<p>No login logs available.</p>";
            }

            if (data.registration_logs) {
                document.getElementById("registration-logs").innerHTML = `<table>
                    <thead><tr><th>Email</th><th>Registration Time</th></tr></thead>
                    <tbody>${data.registration_logs.map(log => `
                        <tr><td>${log.user_email}</td><td>${log.registration_time}</td></tr>
                    `).join("")}</tbody>
                </table>`;
            } else {
                document.getElementById("registration-logs").innerHTML = "<p>No registration logs available.</p>";
            }
        }

        fetchLogs();
        setInterval(fetchLogs, 60000); // Refresh every 1 minute

    </script>';
    echo '</div>';
}

// REST API Endpoints - Public Access
add_action('rest_api_init', function () {
    if (get_option('usertrack_enabled', false)) {
        register_rest_route('usertrack/v1', '/logs', [
            'methods' => 'GET',
            'callback' => 'usertrack_fetch_logs',
            'permission_callback' => '__return_true', // Public access allowed
        ]);

        register_rest_route('usertrack/v1', '/log', [
            'methods' => 'POST',
            'callback' => 'usertrack_log_event',
            'permission_callback' => '__return_true', // Public access allowed
        ]);
    }
});

// Fetch Logs
// Fetch Logs and adjust date/time to user's local timezone
function usertrack_fetch_logs() {
    global $wpdb;

    $login_logs_table = $wpdb->prefix . 'usertrack_login_logs';
    $registration_logs_table = $wpdb->prefix . 'usertrack_registration_logs';
    $users_table = $wpdb->prefix . 'users';

    // Fetch the timezone offset from the request headers
    $timezone_offset = isset($_SERVER['HTTP_X_TIMEZONE_OFFSET']) ? intval($_SERVER['HTTP_X_TIMEZONE_OFFSET']) : 0;

    // Fetch login logs
    $login_logs = $wpdb->get_results("
        SELECT u.user_email, l.login_time
        FROM $login_logs_table AS l
        JOIN $users_table AS u ON l.user_id = u.ID
        ORDER BY l.login_time DESC
    ");

    // Fetch registration logs
    $registration_logs = $wpdb->get_results("
        SELECT u.user_email, r.registration_time
        FROM $registration_logs_table AS r
        JOIN $users_table AS u ON r.user_id = u.ID
        ORDER BY r.registration_time DESC
    ");

    // Format the date and time for each log entry based on the user's timezone
    foreach ($login_logs as &$log) {
        $log->login_time = format_datetime_to_timezone($log->login_time, $timezone_offset);
    }

    foreach ($registration_logs as &$log) {
        $log->registration_time = format_datetime_to_timezone($log->registration_time, $timezone_offset);
    }

    return new WP_REST_Response([
        'login_logs' => $login_logs,
        'registration_logs' => $registration_logs,
    ], 200);
}

// Helper function to format datetime to the user's local timezone
function format_datetime_to_timezone($datetime, $timezone_offset) {
    $date = new DateTime($datetime, new DateTimeZone('UTC')); // Assuming stored time is in UTC
    $date->modify($timezone_offset > 0 ? "+{$timezone_offset} minutes" : "{$timezone_offset} minutes"); // Apply the offset
    return $date->format('F j, Y g:i A'); // Format to 'Month Day, Year Hour:Minute AM/PM'
}


// Log Events
function usertrack_log_event(WP_REST_Request $request) {
    global $wpdb;

    $action = $request->get_param('action');
    $user_id = intval($request->get_param('user_id'));

    if (!$user_id || !in_array($action, ['login', 'register'])) {
        return new WP_REST_Response(['error' => 'Invalid parameters.'], 400);
    }

    if ($action === 'login') {
        $wpdb->insert(
            $wpdb->prefix . 'usertrack_login_logs',
            ['user_id' => $user_id, 'login_time' => current_time('mysql')],
            ['%d', '%s']
        );
    } elseif ($action === 'register') {
        $wpdb->insert(
            $wpdb->prefix . 'usertrack_registration_logs',
            ['user_id' => $user_id, 'registration_time' => current_time('mysql')],
            ['%d', '%s']
        );
    }

    return new WP_REST_Response(['status' => 'success'], 200);
}

// Hooks for Login and Registration Events
add_action('wp_login', 'usertrack_log_login', 10, 2);
function usertrack_log_login($user_login, $user) {
    global $wpdb;

    $wpdb->insert($wpdb->prefix . 'usertrack_login_logs', [
        'user_id' => $user->ID,
        'login_time' => current_time('mysql'),
    ], ['%d', '%s']);
}

add_action('user_register', 'usertrack_log_registration', 10, 1);
function usertrack_log_registration($user_id) {
    global $wpdb;

    $wpdb->insert($wpdb->prefix . 'usertrack_registration_logs', [
        'user_id' => $user_id,
        'registration_time' => current_time('mysql'),
    ], ['%d', '%s']);
}
