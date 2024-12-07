<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'nodesunl_wp139' );

/** Database username */
define( 'DB_USER', 'nodesunl_wp139' );

/** Database password */
define( 'DB_PASSWORD', 'Su61-@23pp' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define('DISABLE_WP_CRON', true);

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'hrrjzaiwfjunz93x1qtemmm472ich5qnwrnair73assdzc8e7iiozuahnqt9mcvd' );
define( 'SECURE_AUTH_KEY',  'jueouypsh8zmcq93xwz4wxvhg9muzc5j3pc8jzy1spr6zfcq9my6wxa218wx6ox5' );
define( 'LOGGED_IN_KEY',    'wcvmsdzqexnhkgdt56ihedwfz9y7kmxv8nqvri1bcaasoxztvqefpsr9qwuqe0sh' );
define( 'NONCE_KEY',        '9vw0bgqkskllop6ea0wc2ew48q3dsjcnromuetdqoti7centvilwatai0bdzqcm4' );
define( 'AUTH_SALT',        'uorzmmf456z1kmc7ukqe010kppabmx2ohwck1zsamuayzzl6dts8ttknolaovb4h' );
define( 'SECURE_AUTH_SALT', 'nqsut0nlgvmjkhumhzhjeta1dgqd1owektufakkocnlnlfwxqtjf1dh4orbw261k' );
define( 'LOGGED_IN_SALT',   'rccvyieu33dt7tbsbxn9syo7foyjna0wzsh8oxo6p2yi4lf6ddfpgoz9tc2zacgi' );
define( 'NONCE_SALT',       'jiejazz9p4ni1fw04m3b5hkzztv0vmngoobselofezrivvdfalztrcrn8orrqcoy' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp140_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';