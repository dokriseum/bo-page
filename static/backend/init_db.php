<?php
// Initialisiert die Event-Tabelle anhand des event_schema.json
require_once __DIR__ . '/config.php';

function loadSchema($file) {
    $json = file_get_contents($file);
    return json_decode($json, true);
}

function buildCreateTableSQL($schema) {
    $fields = [];
    foreach ($schema['fields'] as $name => $def) {
        $sql = "`$name` ";
        $sql .= $def['type'];
        if (!empty($def['auto_increment'])) $sql .= " AUTO_INCREMENT";
        if (!empty($def['primary'])) $sql .= " PRIMARY KEY";
        if (!empty($def['required'])) $sql .= " NOT NULL";
        if (!empty($def['nullable'])) $sql .= " NULL";
        if (isset($def['default'])) {
            $default = $def['default'];
            $type = strtoupper($def['type']);
            $isTimestampKeyword = is_string($default) && (stripos($default, 'CURRENT_TIMESTAMP') === 0 || stripos($default, 'NOW()') === 0 || stripos($default, 'ON UPDATE') !== false);
            $isNumeric = is_numeric($default);
            
            if (strpos($type, 'ENUM') === 0) {
                // ENUM defaults must be quoted
                $sql .= " DEFAULT '" . addslashes((string)$default) . "'";
            } elseif ($isTimestampKeyword) {
                // leave SQL function keywords as-is
                $sql .= " DEFAULT " . $default;
            } elseif ($isNumeric) {
                $sql .= " DEFAULT " . $default;
            } else {
                $sql .= " DEFAULT '" . addslashes((string)$default) . "'";
            }
        }
        $fields[] = $sql;
    }
    return "CREATE TABLE IF NOT EXISTS `{$schema['table']}` (\n    " . implode(",\n    ", $fields) . "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
}

try {
    $schema = loadSchema(__DIR__ . '/event_schema.json');
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $db = new PDO($dsn, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = buildCreateTableSQL($schema);
    $db->exec($sql);
    echo "Tabelle '{$schema['table']}' erfolgreich initialisiert.";
} catch (Exception $e) {
    echo "Fehler: " . $e->getMessage();
}
