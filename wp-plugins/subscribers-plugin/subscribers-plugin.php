<?php
/**
 * Plugin Name: Mohamed's Subscribers Plugin
 * Description: A plugin to manage subscribers with an admin interface for adding, editing, deleting, exporting, and managing the subscribers table.
 * Version: 2.1
 * Author: Mohamed Hafez
 */

add_action('admin_post_download_subscribers_json', 'download_subscribers_json');
add_action('admin_post_download_subscribers_csv', 'download_subscribers_csv');
add_action('admin_post_download_subscribers_pdf', 'download_subscribers_pdf');


// Enqueue TailwindCSS for styling
add_action('admin_enqueue_scripts', 'enqueue_tailwind_cdn_for_plugin_page');
function enqueue_tailwind_cdn_for_plugin_page($hook_suffix) {
    if ($hook_suffix === 'toplevel_page_subscribers-plugin') {
        wp_enqueue_script(
            'tailwindcss',
            'https://cdn.tailwindcss.com',
            [],
            null,
            true
        );
    }
}

// Add shortcode for the signup form
add_shortcode('newsletter_signup_form', 'render_newsletter_signup_form');
function render_newsletter_signup_form() {
    ob_start();
    ?>
    <div class="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4 text-center">Signup for our Newsletter</h2>
        <form id="newsletter-signup-form" class="flex flex-col space-y-4">
            <input
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="Enter your email"
                required
                class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Register
            </button>
        </form>
        <p id="newsletter-message" class="mt-4 text-sm text-center"></p>
    </div>

    <script>
        document.getElementById('newsletter-signup-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            const messageElement = document.getElementById('newsletter-message');

            messageElement.textContent = 'Submitting...';
            messageElement.classList.remove('text-red-500', 'text-green-500');

            const response = await fetch('<?php echo esc_url(rest_url('newsletter/v2/signup')); ?>', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                messageElement.textContent = result.message;
                messageElement.classList.add('text-green-500');
                document.getElementById('newsletter-email').value = '';
            } else {
                messageElement.textContent = result.error || 'An error occurred.';
                messageElement.classList.add('text-red-500');
            }
        });
    </script>
    <?php
    return ob_get_clean();
}


// Add menu item to the WordPress admin dashboard
add_action('admin_menu', 'subscribers_plugin_menu');
function subscribers_plugin_menu() {
    add_menu_page(
        'Newsletter Subscribers',
        'Subscribers',
        'manage_options',
        'subscribers-plugin',
        'subscribers_admin_page',
        'dashicons-email-alt',
        100
    );
}

// Admin page to manage subscribers
function subscribers_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';

    echo '<div class="p-6 bg-gray-100 rounded-lg">';
    echo '<h1 class="text-2xl font-bold mb-4">Subscribers Management</h1>';

    // Handle form actions
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add subscriber
        if (isset($_POST['add_subscriber']) && isset($_POST['subscriber_email'])) {
            $subscriber_email = sanitize_email($_POST['subscriber_email']);
            if (is_email($subscriber_email)) {
                $exists = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $table_name WHERE email = %s", $subscriber_email));
                if ($exists > 0) {
                    echo '<p class="text-red-500">This email is already subscribed.</p>';
                } else {
                    $wpdb->insert($table_name, ['email' => $subscriber_email]);
                    echo '<p class="text-green-500">Subscriber added successfully.</p>';
                }
            } else {
                echo '<p class="text-red-500">Invalid email address.</p>';
            }
        }

        // Delete subscriber
        if (isset($_POST['delete_subscriber']) && isset($_POST['subscriber_id'])) {
            $subscriber_id = intval($_POST['subscriber_id']);
            $wpdb->delete($table_name, ['id' => $subscriber_id]);
            echo '<p class="text-green-500">Subscriber deleted successfully.</p>';
        }

        // Save edited subscriber
        if (isset($_POST['save_subscriber']) && isset($_POST['subscriber_id']) && isset($_POST['subscriber_email'])) {
            $subscriber_id = intval($_POST['subscriber_id']);
            $subscriber_email = sanitize_email($_POST['subscriber_email']);
            $wpdb->update($table_name, ['email' => $subscriber_email], ['id' => $subscriber_id]);
            echo '<p class="text-green-500">Subscriber updated successfully.</p>';
        }

        // Download actions
        if (isset($_POST['download_json'])) {
            download_subscribers_json($table_name);
            return;
        }
        if (isset($_POST['download_csv'])) {
            download_subscribers_csv($table_name);
            return;
        }
        if (isset($_POST['download_pdf'])) {
            download_subscribers_pdf($table_name);
            return;
        }

        // Delete table
        if (isset($_POST['delete_table'])) {
            delete_subscribers_table();
            echo '<p class="text-green-500">The Subscribers table has been deleted.</p>';
            return;
        }

        // Create table
        if (isset($_POST['create_table'])) {
            create_subscribers_table();
            echo '<p class="text-green-500">The Subscribers table has been created successfully.</p>';
            return;
        }
    }

    // Check if the table exists
    $table_exists = ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name);

    if ($table_exists) {
        // Add Subscriber Form
        echo '<h2 class="text-xl font-semibold mb-4">Add New Subscriber</h2>';
        echo '<form method="post" class="flex flex-row items-center justify-center gap-4 mb-6">';
        echo '<input type="hidden" name="add_subscriber" value="1" />';
        echo '<input type="email" name="subscriber_email" placeholder="Enter email address" required class="border border-gray-300 rounded px-4 py-2" />';
        echo '<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Subscriber</button>';
        echo '</form>';

        // Download Buttons
       echo '<div class="flex flex-row justify-center items-center gap-4">';

        // JSON download button
        echo '<form method="get" action="' . admin_url('admin-post.php') . '">';
        echo '<input type="hidden" name="action" value="download_subscribers_json" />';
        echo '<button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Download JSON</button>';
        echo '</form>';

        // CSV download button
        echo '<form method="get" action="' . admin_url('admin-post.php') . '">';
        echo '<input type="hidden" name="action" value="download_subscribers_csv" />';
        echo '<button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download CSV</button>';
        echo '</form>';

        // PDF download button
        echo '<form method="get" action="' . admin_url('admin-post.php') . '">';
        echo '<input type="hidden" name="action" value="download_subscribers_pdf" />';
        echo '<button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Download PDF</button>';
        echo '</form>';

        echo '</div>';


        // Subscribers Table
        $subscribers = $wpdb->get_results("SELECT * FROM $table_name");
        if (!empty($subscribers)) {
            echo '<h2 class="text-xl font-semibold mt-6 mb-4">Subscribers List</h2>';
            echo '<table class="w-full table-auto border-collapse border border-gray-400">';
            echo '<thead>';
            echo '<tr class="bg-gray-200">';
            echo '<th class="border border-gray-400 px-4 py-2">ID</th>';
            echo '<th class="border border-gray-400 px-4 py-2">Email</th>';
            echo '<th class="border border-gray-400 px-4 py-2">Subscribed On</th>';
            echo '<th class="border border-gray-400 px-4 py-2">Actions</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            foreach ($subscribers as $subscriber) {
                echo '<tr>';
                echo '<td class="border border-gray-400 px-4 py-2">' . esc_html($subscriber->id) . '</td>';
                echo '<td id="email-' . esc_attr($subscriber->id) . '" class="border border-gray-400 px-4 py-2">' . esc_html($subscriber->email) . '</td>';
                echo '<td class="border border-gray-400 px-4 py-2">' . esc_html($subscriber->created_at) . '</td>';
                echo '<td class="border border-gray-400 px-4 py-2 flex gap-2">';
                echo '<button class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" id="edit-button-' . esc_attr($subscriber->id) . '" onclick="toggleEdit(' . esc_attr($subscriber->id) . ')">Edit</button>';
                echo '<form method="post" style="display: inline-block;">';
                echo '<input type="hidden" name="delete_subscriber" value="1" />';
                echo '<input type="hidden" name="subscriber_id" value="' . esc_attr($subscriber->id) . '" />';
                echo '<button type="submit" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="return confirm(\'Are you sure you want to delete this subscriber?\')">Delete</button>';
                echo '</form>';
                echo '</td>';
                echo '</tr>';
            }

            echo '</tbody>';
            echo '</table>';
        } else {
            echo '<p class="text-gray-500">No subscribers found.</p>';
        }

        // Delete Table Button
        echo '<form method="post" class="mt-4">';
        echo '<input type="hidden" name="delete_table" value="1" />';
        echo '<button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onclick="return confirm(\'Are you sure you want to delete the entire table? This action cannot be undone.\')">Delete Subscribers Table</button>';
        echo '</form>';
    } else {
        // Create Table Button
        echo '<p class="text-red-500">The Subscribers table does not exist.</p>';
        echo '<form method="post">';
        echo '<input type="hidden" name="create_table" value="1" />';
        echo '<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Subscribers Table</button>';
        echo '</form>';
    }

    echo '</div>';
    ?>
    <script>
        function toggleEdit(id) {
            const emailCell = document.getElementById(`email-${id}`);
            const editButton = document.getElementById(`edit-button-${id}`);
            if (editButton.textContent === 'Edit') {
                const email = emailCell.textContent.trim();
                emailCell.innerHTML = `<form method="post" style="display: inline;">
                    <input type="hidden" name="save_subscriber" value="1" />
                    <input type="hidden" name="subscriber_id" value="${id}" />
                    <input type="email" name="subscriber_email" value="${email}" required class="border border-gray-300 rounded px-2 py-1" />
                    <button type="submit" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Save</button>
                </form>`;
                editButton.textContent = 'Cancel';
            } else {
                const emailInput = emailCell.querySelector('input[name="subscriber_email"]');
                const originalEmail = emailInput ? emailInput.defaultValue : '';
                emailCell.textContent = originalEmail;
                editButton.textContent = 'Edit';
            }
        }
    </script>
    <?php
}

// Helper functions
function create_subscribers_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
        id INT(11) NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

function delete_subscribers_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';
    $wpdb->query("DROP TABLE IF EXISTS $table_name");
}

// Problem starts with the following functions that are not downloading the content file in the browser 

function download_subscribers_json() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You are not allowed to access this page.'));
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';
    $subscribers = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Prepare JSON data
    $json_data = json_encode($subscribers, JSON_PRETTY_PRINT);

    // Send headers to force download
    header('Content-Type: application/json');
    header('Content-Disposition: attachment; filename="subscribers.json"');
    header('Content-Length: ' . strlen($json_data));

    echo $json_data;
    exit; // Stop further processing
}

function download_subscribers_csv() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You are not allowed to access this page.'));
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';
    $subscribers = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Set headers to trigger CSV file download
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="subscribers.csv"');
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: 0');

    // Open output stream
    $output = fopen('php://output', 'w');

    // Write CSV headers
    fputcsv($output, ['ID', 'Email', 'Subscribed On']);

    // Write rows
    foreach ($subscribers as $subscriber) {
        fputcsv($output, [
            $subscriber['id'], 
            $subscriber['email'], 
            $subscriber['created_at']
        ]);
    }

    fclose($output);
    exit; // End execution
}


function download_subscribers_pdf() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You are not allowed to access this page.'));
    }

    global $wpdb;
    require_once(plugin_dir_path(__FILE__) . 'fpdf.php');
    $table_name = $wpdb->prefix . 'subscribers';
    $subscribers = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Set headers to trigger PDF file download
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="subscribers.pdf"');
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: 0');

    // Generate PDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Subscribers List', 0, 1, 'C');
    $pdf->Ln(10);
    $pdf->SetFont('Arial', '', 12);

    // Table Headers
    $pdf->Cell(10, 10, 'ID', 1);
    $pdf->Cell(70, 10, 'Email', 1);
    $pdf->Cell(50, 10, 'Subscribed On', 1);
    $pdf->Ln();

    // Table Rows
    foreach ($subscribers as $subscriber) {
        $pdf->Cell(10, 10, $subscriber['id'], 1);
        $pdf->Cell(70, 10, $subscriber['email'], 1);
        $pdf->Cell(50, 10, $subscriber['created_at'], 1);
        $pdf->Ln();
    }

    // Output the PDF
    $pdf->Output('D', 'subscribers.pdf');
    exit; // End execution
}

add_action('rest_api_init', function () {
    register_rest_route('newsletter/v2', '/signup', [
        'methods' => 'POST',
        'callback' => 'handle_newsletter_signup',
        'permission_callback' => '__return_true', // Allow public access
    ]);
});





// Handle AJAX requests for newsletter signup
add_action('wp_ajax_newsletter_signup', 'handle_newsletter_signup');
add_action('wp_ajax_nopriv_newsletter_signup', 'handle_newsletter_signup');

function handle_newsletter_signup() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'subscribers';

    // Get the email from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $email = sanitize_email($data['email']);

    // Validate email
    if (!is_email($email)) {
        wp_send_json_error(['error' => 'Invalid email address'], 400);
    }

    // Check if the email already exists
    $exists = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $table_name WHERE email = %s", $email));
    if ($exists > 0) {
        wp_send_json_error(['error' => 'This email is already subscribed.'], 409);
    }

    // Add email to the database
    $inserted = $wpdb->insert($table_name, ['email' => $email]);
    if (!$inserted) {
        wp_send_json_error(['error' => 'Failed to add subscriber. Please try again later.'], 500);
    }

    wp_send_json_success(['message' => 'Successfully subscribed!'], 200);
}