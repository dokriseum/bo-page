# Backend Configuration Files

## Files in this directory:

- `config.example.php` - Example configuration (committed to git)
- `config.php` - Actual configuration with sensitive data (NOT committed to git)

## Setup Instructions:

1. Copy the example configuration:
   ```bash
   cp static/backend/config.example.php static/backend/config.php
   ```

2. Edit `config.php` with your actual database credentials and settings:
   ```php
   define('DB_HOST', 'your-mariadb-host');
   define('DB_NAME', 'your-database-name');
   define('DB_USER', 'your-database-user');
   define('DB_PASS', 'your-database-password');
   define('MAIL_FROM', 'your-sender-email@example.com');
   ```

3. Ensure `config.php` is in your `.gitignore` to prevent committing sensitive data.

## Security Notes:

- Never commit `config.php` to version control
- Use strong database passwords
- Restrict database user permissions to necessary operations only
- Use HTTPS in production for secure API communication