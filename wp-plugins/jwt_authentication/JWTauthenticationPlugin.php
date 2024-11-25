<?php
/**
 * Plugin Name: Enhanced JWT Management Plugin
 * Description: A plugin to manage JWT tokens with admin controls, REST API endpoints, and secure token handling.
 * Version: 2.2
 * Author: Mohamed Hafez
 *
 * API Routes (exposed when JWT is enabled):
 * - POST /wp-json/jwt/v1/login
 *   Description: Authenticate a user and generate a JWT token.
 *   Request Body: { "username": "user", "password": "password" }
 *   Response: { "token": "JWT_TOKEN", "expires_in": 3600 }
 *
 * - POST /wp-json/jwt/v1/register
 *   Description: Register a new user and generate a JWT token.
 *   Request Body: { "username": "newuser", "password": "password", "email": "user@example.com" }
 *   Response: { "token": "JWT_TOKEN", "expires_in": 3600 }
 *
 * - POST /wp-json/jwt/v1/refresh
 *   Description: Refresh an existing JWT token.
 *   Request Body: { "token": "EXISTING_JWT_TOKEN" }
 *   Response: { "token": "NEW_JWT_TOKEN", "expires_in": 3600 }
 *
 * Notes:
 * - These API routes are only available when JWT is enabled via the admin interface.
 * - When JWT is disabled, the routes are dynamically unregistered.
 * - Admin interface allows toggling JWT, generating tokens, and validating tokens manually.
 */

if (!defined('ABSPATH')) exit;

// Include Firebase JWT library
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

// Activation Hook: Set up initial options and generate a secure salt
register_activation_hook(__FILE__, function () {
    if (!get_option('jwt_plugin_status')) {
        add_option('jwt_plugin_status', false);
    }

    if (!get_option('jwt_secret_key')) {
        $salt = bin2hex(random_bytes(32)); // Generate a secure 256-bit salt
        add_option('jwt_secret_key', $salt);
    }
});

// Helper Function: Check if JWT is enabled
function is_jwt_enabled() {
    return get_option('jwt_plugin_status', false);
}

// Admin Menu
add_action('admin_menu', function () {
    add_menu_page(
        'JWT Management',
        'JWT Mgmt',
        'manage_options',
        'jwt-management',
        'jwt_management_admin_page',
		'dashicons-admin-tools',
		100
    );
});

// Admin Page Content
function jwt_management_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $jwt_status = get_option('jwt_plugin_status', false);
    $jwt_secret_key = get_option('jwt_secret_key', '');
    $token_response = '';
    $validation_response = '';

    // Handle Form Submissions
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['toggle_jwt'])) {
            $jwt_status = !$jwt_status;
            update_option('jwt_plugin_status', $jwt_status);
        }

        if ($jwt_status) {
            if (isset($_POST['generate_token'])) {
                $username = sanitize_text_field($_POST['username']);
                $password = sanitize_text_field($_POST['password']);
                $user = wp_authenticate($username, $password);

                if (is_wp_error($user)) {
                    $token_response = 'Invalid credentials! Error: ' . esc_html($user->get_error_message());
                } else {
                    $payload = [
                        'iss' => get_bloginfo('url'),
                        'iat' => time(),
                        'exp' => time() + 3600,
                        'user' => [
                            'id' => $user->ID,
                            'login' => $user->user_login,
                            'email' => $user->user_email,
                        ],
                    ];
                    $token_response = JWT::encode($payload, $jwt_secret_key, 'HS256');
                }
            }

            if (isset($_POST['validate_token'])) {
                $token = sanitize_text_field($_POST['token']);
                try {
                    $decoded = JWT::decode($token, $jwt_secret_key, ['HS256']);
                    $validation_response = json_encode($decoded, JSON_PRETTY_PRINT);
                } catch (Exception $e) {
                    $validation_response = 'Invalid token: ' . $e->getMessage();
                }
            }
        }
    }

    // Enqueue TailwindCSS
    wp_enqueue_script(
        'tailwindcss',
        'https://cdn.tailwindcss.com',
        [],
        null,
        true
    );

    ?>
    <div class="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">JWT Management</h1>

        <!-- JWT Status -->
        <form method="post" class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Toggle JWT</h2>
            <button type="submit" name="toggle_jwt" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <?php echo $jwt_status ? 'Disable JWT' : 'Enable JWT'; ?>
            </button>
            <p class="mt-2">Status: <strong><?php echo $jwt_status ? 'Enabled' : 'Disabled'; ?></strong></p>
        </form>

        <!-- Show Message When JWT is Disabled -->
        <?php if (!$jwt_status): ?>
            <p class="text-red-500 mb-6">
                JWT is currently disabled. Please enable it to generate or validate tokens.
            </p>
        <?php endif; ?>

        <!-- Generate Token -->
        <form method="post" class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Generate Token</h2>
            <label for="username" class="block text-sm font-medium">Username:</label>
            <input type="text" id="username" name="username" required class="border border-gray-300 rounded px-4 py-2 mb-2 w-full" <?php echo !$jwt_status ? 'disabled' : ''; ?> />
            <label for="password" class="block text-sm font-medium">Password:</label>
            <input type="password" id="password" name="password" required class="border border-gray-300 rounded px-4 py-2 mb-4 w-full" <?php echo !$jwt_status ? 'disabled' : ''; ?> />
            <button type="submit" name="generate_token"
                    class="<?php echo $jwt_status ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'; ?> px-4 py-2 rounded"
                    <?php echo !$jwt_status ? 'disabled' : ''; ?>>
                Generate Token
            </button>
        </form>
        <?php if ($token_response): ?>
            <p><strong>Generated Token:</strong></p>
            <div class="overflow-hidden">
                <pre class="bg-gray-200 p-4 rounded text-wrap break-all"><?php echo esc_html($token_response); ?></pre>
            </div>
        <?php endif; ?>

        <!-- Validate Token -->
        <form method="post" class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Validate Token</h2>
            <label for="token" class="block text-sm font-medium">Token:</label>
            <textarea id="token" name="token" required class="border border-gray-300 rounded px-4 py-2 mb-4 w-full" <?php echo !$jwt_status ? 'disabled' : ''; ?>></textarea>
            <button type="submit" name="validate_token"
                    class="<?php echo $jwt_status ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'; ?> px-4 py-2 rounded"
                    <?php echo !$jwt_status ? 'disabled' : ''; ?>>
                Validate Token
            </button>
        </form>
        <?php if ($validation_response): ?>
            <p><strong>Token Details:</strong></p>
            <pre class="bg-gray-200 p-4 rounded break-all"><?php echo esc_html($validation_response); ?></pre>
        <?php endif; ?>
    </div>
    <?php
}

// REST API Routes
add_action('rest_api_init', function () {
    if (!is_jwt_enabled()) {
        return; // Do not register endpoints if JWT is disabled
    }

    register_rest_route('jwt/v1', '/login', [
        'methods' => 'POST',
        'callback' => 'handle_jwt_login',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('jwt/v1', '/register', [
        'methods' => 'POST',
        'callback' => 'handle_jwt_register',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('jwt/v1', '/refresh', [
        'methods' => 'POST',
        'callback' => 'handle_jwt_refresh',
        'permission_callback' => '__return_true',
    ]);
});

// Handle Login API
function handle_jwt_login(WP_REST_Request $request) {
    if (!is_jwt_enabled()) {
        return new WP_REST_Response(['error' => 'JWT functionality is disabled.'], 403);
    }

    $params = $request->get_json_params();
    $username = sanitize_text_field($params['username'] ?? '');
    $password = sanitize_text_field($params['password'] ?? '');

    $user = wp_authenticate($username, $password);

    if (is_wp_error($user)) {
        return new WP_REST_Response(['error' => $user->get_error_message()], 403);
    }

    $jwt_secret_key = get_option('jwt_secret_key', '');
    $payload = [
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + 3600,
        'user' => [
            'id' => $user->ID,
            'login' => $user->user_login,
            'email' => $user->user_email,
        ],
    ];

    $token = JWT::encode($payload, $jwt_secret_key, 'HS256');

    return new WP_REST_Response(['token' => $token, 'expires_in' => 3600], 200);
}

// Handle Registration API
function handle_jwt_register(WP_REST_Request $request) {
    if (!is_jwt_enabled()) {
        return new WP_REST_Response(['error' => 'JWT functionality is disabled.'], 403);
    }

    $params = $request->get_json_params();
    $username = sanitize_text_field($params['username'] ?? '');
    $password = sanitize_text_field($params['password'] ?? '');
    $email = sanitize_email($params['email'] ?? '');

    if (!username_exists($username) && !email_exists($email)) {
        $user_id = wp_create_user($username, $password, $email);
        if (is_wp_error($user_id)) {
            return new WP_REST_Response(['error' => $user_id->get_error_message()], 500);
        }

        $jwt_secret_key = get_option('jwt_secret_key', '');
        $payload = [
            'iss' => get_bloginfo('url'),
            'iat' => time(),
            'exp' => time() + 3600,
            'user' => [
                'id' => $user_id,
                'login' => $username,
                'email' => $email,
            ],
        ];

        $token = JWT::encode($payload, $jwt_secret_key, 'HS256');

        return new WP_REST_Response(['token' => $token, 'expires_in' => 3600], 200);
    } else {
        return new WP_REST_Response(['error' => 'Username or email already exists'], 409);
    }
}

// Handle Refresh API
function handle_jwt_refresh(WP_REST_Request $request) {
    if (!is_jwt_enabled()) {
        return new WP_REST_Response(['error' => 'JWT functionality is disabled.'], 403);
    }

    $params = $request->get_json_params();
    $token = sanitize_text_field($params['token'] ?? '');

    $jwt_secret_key = get_option('jwt_secret_key', '');

    try {
        $decoded = JWT::decode($token, $jwt_secret_key, ['HS256']);
        $decoded_array = (array) $decoded;

        // Refresh the token
        $decoded_array['iat'] = time();
        $decoded_array['exp'] = time() + 3600;

        $new_token = JWT::encode($decoded_array, $jwt_secret_key, 'HS256');

        return new WP_REST_Response(['token' => $new_token, 'expires_in' => 3600], 200);
    } catch (Exception $e) {
        return new WP_REST_Response(['error' => $e->getMessage()], 403);
    }
}
