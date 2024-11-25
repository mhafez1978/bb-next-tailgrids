<?php
/**
 * Plugin Name: JWT Management Plugin
 * Description: A simple plugin to enable/disable JWT, generate tokens, and validate tokens.
 * Version: 1.1
 * Author: Mohamed Hafez
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

// Include Firebase JWT library directly
if (!class_exists('JWT')) {
    class JWT {
        public static function encode($payload, $key, $alg = 'HS256') {
            $header = ['typ' => 'JWT', 'alg' => $alg];
            $segments = [];
            $segments[] = self::base64UrlEncode(json_encode($header));
            $segments[] = self::base64UrlEncode(json_encode($payload));
            $signing_input = implode('.', $segments);
            $signature = self::sign($signing_input, $key, $alg);
            $segments[] = self::base64UrlEncode($signature);
            return implode('.', $segments);
        }

        public static function decode($jwt, $key, $allowed_algs = ['HS256']) {
            $tks = explode('.', $jwt);
            if (count($tks) != 3) {
                throw new Exception('Invalid JWT structure.');
            }
            list($headb64, $bodyb64, $cryptob64) = $tks;
            $header = json_decode(self::base64UrlDecode($headb64));
            $payload = json_decode(self::base64UrlDecode($bodyb64));
            $sig = self::base64UrlDecode($cryptob64);
            if (!in_array($header->alg, $allowed_algs)) {
                throw new Exception('Algorithm not allowed.');
            }
            if (!self::verify("$headb64.$bodyb64", $sig, $key, $header->alg)) {
                throw new Exception('Invalid signature.');
            }
            return $payload;
        }

        private static function sign($input, $key, $alg) {
            switch ($alg) {
                case 'HS256':
                    return hash_hmac('sha256', $input, $key, true);
                default:
                    throw new Exception('Algorithm not supported.');
            }
        }

        private static function verify($input, $signature, $key, $alg) {
            switch ($alg) {
                case 'HS256':
                    return hash_equals(self::sign($input, $key, $alg), $signature);
                default:
                    throw new Exception('Algorithm not supported.');
            }
        }

        private static function base64UrlEncode($data) {
            return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
        }

        private static function base64UrlDecode($data) {
            return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
        }
    }
}

// Default settings
register_activation_hook(__FILE__, function () {
    add_option('jwt_plugin_status', false);
    add_option('jwt_secret_key', 'k_o0GS79_d9SZQArHDua2AIZTg_1_-tCXsK1g8cZCLw'); // Generated test key
});

register_deactivation_hook(__FILE__, function () {
    delete_option('jwt_plugin_status');
    delete_option('jwt_secret_key');
});

// Admin menu
add_action('admin_menu', function () {
    add_menu_page(
        'JWT Management',
        'JWT Management',
        'manage_options',
        'jwt-management',
        'jwt_management_page'
    );
});

// Admin page content
function jwt_management_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $jwt_status = get_option('jwt_plugin_status', false);
    $jwt_secret_key = get_option('jwt_secret_key', 'k_o0GS79_d9SZQArHDua2AIZTg_1_-tCXsK1g8cZCLw');
    $token_response = '';
    $validation_response = '';

    // Handle form submissions
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['toggle_jwt'])) {
            $jwt_status = !$jwt_status;
            update_option('jwt_plugin_status', $jwt_status);
        }

        if (isset($_POST['generate_token'])) {
            $username = sanitize_text_field($_POST['username']);
            $password = sanitize_text_field($_POST['password']);

            // Authenticate user using WordPress
            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                // Log and display detailed error message
                error_log('JWT Plugin: Authentication failed for user: ' . $username);
                error_log('JWT Plugin: Error - ' . $user->get_error_message());
                $token_response = 'Invalid credentials! Error: ' . esc_html($user->get_error_message());
            } else {
                // Log successful authentication
                error_log('JWT Plugin: Authentication successful for user: ' . $user->user_login);

                // Generate JWT token
                $payload = [
                    'iss' => get_bloginfo('url'), // Issuer URL
                    'iat' => time(),             // Issued at
                    'exp' => time() + 3600,      // Expiration time (1 hour)
                    'user' => [
                        'id' => $user->ID,
                        'login' => $user->user_login,
                        'email' => $user->user_email,
                    ],
                ];

                // Encode the payload to a JWT token
                $token_response = JWT::encode($payload, $jwt_secret_key, 'HS256');
            }
        }

        if (isset($_POST['validate_token'])) {
            $token = sanitize_text_field($_POST['token']);
            try {
                $decoded = JWT::decode($token, $jwt_secret_key, ['HS256']);
                $validation_response = 'Token is valid. Payload: ' . json_encode($decoded);
            } catch (Exception $e) {
                $validation_response = 'Invalid token: ' . $e->getMessage();
            }
        }
    }

    ?>
    <div class="wrap">
        <h1>JWT Management</h1>
        <form method="post">
            <h2>JWT Status</h2>
            <button type="submit" name="toggle_jwt" class="button button-primary">
                <?php echo $jwt_status ? 'Disable JWT' : 'Enable JWT'; ?>
            </button>
            <p>Status: <strong><?php echo $jwt_status ? 'Enabled' : 'Disabled'; ?></strong></p>
        </form>
        <hr>
        <form method="post">
            <h2>Generate Token</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit" name="generate_token" class="button button-primary">Generate Token</button>
        </form>
        <?php if ($token_response): ?>
            <p><strong>Token:</strong> <?php echo esc_html($token_response); ?></p>
        <?php endif; ?>
        <hr>
        <form method="post">
            <h2>Validate Token</h2>
            <label for="token">Token:</label>
            <input type="text" id="token" name="token" required>
            <button type="submit" name="validate_token" class="button button-primary">Validate Token</button>
        </form>
        <?php if ($validation_response): ?>
            <p><strong>Validation Response:</strong> <?php echo esc_html($validation_response); ?></p>
        <?php endif; ?>
    </div>
    <?php
}
