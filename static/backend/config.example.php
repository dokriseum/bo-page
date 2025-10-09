<?php
/**
 * Backend Configuration - Example
 * 
 * Copy this file to config.php and adjust the values for your environment.
 * The config.php file should NOT be committed to version control.
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'database_name');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

// Email Configuration
define('MAIL_FROM', 'noreply@buendnis-ost.de');
// Test recipient for backend test page (test.php)
// Used as default recipient for confirmation tests and UI default value
define('MAIL_TEST_TO', 'test@example.com');

// Optional: Additional configuration
// define('DEBUG_MODE', false);
?>