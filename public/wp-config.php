<?php
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
define( 'DB_NAME', 'nodesunl_apibb' );

/** Database username */
define( 'DB_USER', 'nodesunl_apibb' );

/** Database password */
define( 'DB_PASSWORD', '$F9J$XaZ%3jZ' );

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
define( 'AUTH_KEY',         'jlwbckkrbuocfnxuvgtjv531k79ma0zmbh6p8h8y2budjk4mu7jogweqdeoytqhv' );
define( 'SECURE_AUTH_KEY',  'ravqnp17kudjywktlodcm7dbiszpyi7i1qln6paokajrcdfy3inl7r9pqw8jpjik' );
define( 'LOGGED_IN_KEY',    'x8bysynlbwpomvymvcyhjy7io9re8b92kaph3cngxejbysrxwsrsexita6uylggw' );
define( 'NONCE_KEY',        'bc8ha6dgc4omlvua9viprg3uchdik14esyzo1ohagskeyktxmhylgaosqx41vn3r' );
define( 'AUTH_SALT',        'hfcspvsw6xqnvwcqc1n2jnhrprf8ls9pjk2zjl7vh8vrpmpy5elkdknqmmnlfdac' );
define( 'SECURE_AUTH_SALT', '9lsyhfdhqkwanuzbn6aesz8g8222f4hgeh2px6tye6mkmlhdyfmioz1qshlpgwvp' );
define( 'LOGGED_IN_SALT',   'tgpucp2cdgpse5tfwhx17qt9dywbxo8isnp4vy4lnczifn5ckdtezd98fcwlayfh' );
define( 'NONCE_SALT',       'wl8dg6dlfajezn9zvj8cradxvkrsotxurnzsxna3msa3gnzykvkrxt1eloxfmfxz' );

/**#@-*/



/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wphw_';

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
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );
/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

define('JWT_AUTH_SECRET_KEY', '^y5qB=7BR(inu+5&.d4.E)WTPD*pRCC-VxG- 9 >#9xpM-svGm=|P/Wq#U(SZS|;');
define('JWT_AUTH_CORS_ENABLE', true);




/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

