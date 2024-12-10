<?php
/**
 * Plugin Name: My Plugin with Table Management
 * Plugin URI: https://example.com/my-plugin
 * Description: A WordPress plugin that manages a database table with a create button and warning on deletion.
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL2
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add a menu item to the WordPress admin dashboard
 */
function my_plugin_add_admin_menu() {
    add_menu_page(
        'My Plugin',                      // Page title
        'My Plugin',                      // Menu title
        'manage_options',                 // Capability
        'my-plugin',                      // Menu slug
        'my_plugin_render_admin_page',    // Callback function
        'dashicons-database',             // Icon
        110                               // Position
    );
}
add_action( 'admin_menu', 'my_plugin_add_admin_menu' );

/**
 * Render the admin page
 */
function my_plugin_render_admin_page() {
    global $wpdb;

    // Table name
    $table_name = $wpdb->prefix . 'my_custom_table';

    // Check if the button is clicked
    if ( isset( $_POST['create_table'] ) ) {
        // Check if the table exists
        if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) != $table_name ) {
            // SQL to create the table
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE $table_name (
                id mediumint(9) NOT NULL AUTO_INCREMENT,
                name tinytext NOT NULL,
                created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY  (id)
            ) $charset_collate;";
            
            // Include WordPress's dbDelta function
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            dbDelta( $sql );

            echo '<div class="notice notice-success"><p>Table created successfully!</p></div>';
        } else {
            echo '<div class="notice notice-info"><p>Table already exists.</p></div>';
        }
    }

    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'My Plugin Dashboard', 'my-plugin' ); ?></h1>
        <form method="post">
            <input type="submit" name="create_table" class="button button-primary" value="<?php esc_attr_e( 'Create Table', 'my-plugin' ); ?>">
        </form>
    </div>
    <?php
}

/**
 * Plugin uninstall hook to warn users about table deletion
 */
function my_plugin_uninstall() {
    global $wpdb;

    // Table name
    $table_name = $wpdb->prefix . 'my_custom_table';

    // Remove the table
    $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
}
register_uninstall_hook( __FILE__, 'my_plugin_uninstall' );

/**
 * Warn the user before deletion
 */
function my_plugin_add_delete_warning() {
    ?>
    <script>
        jQuery(document).ready(function($) {
            $('a.submitdelete').on('click', function(e) {
                const pluginName = 'my-plugin/my-plugin.php';
                if ($(this).closest('tr').data('slug') === pluginName) {
                    if (!confirm('Warning: Deleting this plugin will also delete its database table. Are you sure?')) {
                        e.preventDefault();
                    }
                }
            });
        });
    </script>
    <?php
}
add_action( 'admin_footer', 'my_plugin_add_delete_warning' );
