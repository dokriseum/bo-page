<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/backend/config.php';

if (!defined('BACKEND_ROOT')) {
    define('BACKEND_ROOT', __DIR__ . '/backend');
}
if (!defined('TEMPLATE_ROOT')) {
    define('TEMPLATE_ROOT', BACKEND_ROOT . '/templates');
}
if (!defined('SCHEMA_PATH')) {
    define('SCHEMA_PATH', BACKEND_ROOT . '/event_schema.json');
}

class EventDatabase {
    private $db;
    
    public function __construct() {
        $this->initDatabase();
    }
    
    private function initDatabase() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $this->db = new PDO($dsn, DB_USER, DB_PASS);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->createTables();
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            exit();
        }
    }
    
    private function createTables() {
        if (!file_exists(SCHEMA_PATH)) {
            error_log('Schema file not found: ' . SCHEMA_PATH);
            return;
        }
        $schemaRaw = file_get_contents(SCHEMA_PATH);
        $schema = json_decode($schemaRaw, true);
        if (!$schema || !isset($schema['tables']) || !is_array($schema['tables'])) {
            error_log('Invalid schema JSON in ' . SCHEMA_PATH);
            return;
        }
        
        foreach ($schema['tables'] as $tableSchema) {
            if (!isset($tableSchema['table'], $tableSchema['fields'])) {
                error_log('Invalid table definition in schema');
                continue;
            }
            
            $fields = [];
            foreach ($tableSchema['fields'] as $name => $def) {
                $sql = "`$name` ";
                $sql .= $def['type'];
                if (!empty($def['auto_increment'])) $sql .= " AUTO_INCREMENT";
                if (!empty($def['primary'])) $sql .= " PRIMARY KEY";
                if (!empty($def['unique'])) $sql .= " UNIQUE";
                if (!empty($def['required'])) $sql .= " NOT NULL";
                if (!empty($def['nullable'])) $sql .= " NULL";
                if (isset($def['default'])) {
                    $default = $def['default'];
                    $type = strtoupper($def['type']);
                    $isTimestampKeyword = is_string($default) && (stripos($default, 'CURRENT_TIMESTAMP') === 0 || stripos($default, 'NOW()') === 0 || stripos($default, 'ON UPDATE') !== false);
                    $isNumeric = is_numeric($default);
                    if (strpos($type, 'ENUM') === 0) {
                        $sql .= " DEFAULT '" . addslashes((string)$default) . "'";
                    } elseif ($isTimestampKeyword) {
                        $sql .= " DEFAULT " . $default;
                    } elseif ($isNumeric) {
                        $sql .= " DEFAULT " . $default;
                    } else {
                        $sql .= " DEFAULT '" . addslashes((string)$default) . "'";
                    }
                }
                $fields[] = $sql;
            }
            
            if (isset($tableSchema['indexes']) && is_array($tableSchema['indexes'])) {
                foreach ($tableSchema['indexes'] as $index) {
                    $indexName = $index['name'] ?? '';
                    $indexColumns = $index['columns'] ?? [];
                    if ($indexName && !empty($indexColumns)) {
                        $columns = implode('`, `', $indexColumns);
                        $fields[] = "INDEX `$indexName` (`$columns`)";
                    }
                }
            }
            
            $table = $tableSchema['table'];

            $options = $tableSchema['options'] ?? [];
            $engine = $options['engine'] ?? 'InnoDB';
            $charset = $options['charset'] ?? 'utf8mb4';
            $collation = $options['collation'] ?? 'utf8mb4_unicode_ci';
            
            $create = "CREATE TABLE IF NOT EXISTS `$table` (\n    " . implode(",\n    ", $fields) . "\n) ENGINE=$engine DEFAULT CHARSET=$charset COLLATE=$collation;";
            $this->db->exec($create);
        }
    }
    
    public function getAllEvents() {
        try {
            $schema = [];
            if (file_exists(SCHEMA_PATH)) {
                $schema = json_decode(file_get_contents(SCHEMA_PATH), true) ?: [];
            } else {
                error_log('Schema file not found when fetching events: ' . SCHEMA_PATH);
            }
            
            $table = 'events';
            if (isset($schema['tables']) && is_array($schema['tables'])) {
                foreach ($schema['tables'] as $tableSchema) {
                    if ($tableSchema['table'] === 'events') {
                        $table = $tableSchema['table'];
                        break;
                    }
                }
            }
            
            $sql = "SELECT * FROM `$table` ORDER BY event_time ASC";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $formattedEvents = [];
            foreach ($events as $event) {
                $formattedEvent = [];
                $formattedEvent['Id'] = (string)$event['id'];
                $formattedEvent['Title'] = $event['title'];
                $formattedEvent['Location'] = $event['location'];
                $formattedEvent['Time'] = $event['event_time'];
                $formattedEvent['EventType'] = $event['event_type'];
                $formattedEvent['Description'] = $event['description'];
                $formattedEvent['Organizer'] = [
                    'Name' => $event['organizer_name'],
                    'Contact' => [
                        'Email' => $event['organizer_email']
                    ]
                ];
                if (!empty($event['organizer_phone'])) {
                    $formattedEvent['Organizer']['Contact']['Phone'] = $event['organizer_phone'];
                }
                if (!empty($event['latitude']) && !empty($event['longitude'])) {
                    $formattedEvent['Geolocation'] = [
                        'Latitude' => (float)$event['latitude'],
                        'Longitude' => (float)$event['longitude']
                    ];
                }
                if (!empty($event['website_url'])) $formattedEvent['WebsiteUrl'] = $event['website_url'];
                if (!empty($event['wolke'])) $formattedEvent['Wolke'] = $event['wolke'];
                if (!empty($event['chatbegruenung'])) $formattedEvent['Chatbegruenung'] = $event['chatbegruenung'];
                if (!empty($event['social_media_links'])) {
                    $formattedEvent['SocialMediaLinks'] = json_decode($event['social_media_links'], true);
                }
                if (!empty($event['event_images'])) {
                    $formattedEvent['event_images'] = json_decode($event['event_images'], true);
                }
                if (!empty($event['helpers_needed_minimum'])) {
                    $formattedEvent['HelpersNeededMinimum'] = (int)$event['helpers_needed_minimum'];
                }
                if (!empty($event['special_requirements'])) {
                    $formattedEvent['SpecialRequirements'] = $event['special_requirements'];
                }
                if (!empty($event['status'])) {
                    $formattedEvent['Status'] = $event['status'];
                }
                $formattedEvents[] = $formattedEvent;
            }
            return $formattedEvents;
        } catch (PDOException $e) {
            if ($e->getCode() === '42S02') {
                $this->createTables();
                return [];
            }
            throw new Exception('Error fetching events: ' . $e->getMessage());
        }
    }
    
    public function createEventConfirmation($eventData) {
        try {
            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', time() + 7 * 24 * 60 * 60);
            $stmt = $this->db->prepare("
                INSERT INTO event_confirmations (token, event_data, email, expires_at)
                VALUES (?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $token,
                json_encode($eventData),
                $eventData['Organizer']['Contact']['Email'],
                $expiresAt
            ]);
            
            return $token;
        } catch (PDOException $e) {
            throw new Exception('Error creating confirmation: ' . $e->getMessage());
        }
    }
    
    public function confirmEvent($token) {
        try {
            $this->db->beginTransaction();
            $stmt = $this->db->prepare("
                SELECT event_data, email, expires_at 
                FROM event_confirmations 
                WHERE token = ? AND expires_at > NOW()
            ");
            $stmt->execute([$token]);
            $confirmation = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$confirmation) {
                throw new Exception('Invalid or expired confirmation token');
            }
            
            $eventData = json_decode($confirmation['event_data'], true);
            $eventId = $this->insertEvent($eventData);
            
            $stmt = $this->db->prepare("UPDATE event_confirmations SET event_id = ? WHERE token = ?");
            $stmt->execute([$eventId, $token]);
            
            $this->db->commit();
            $this->updateEventsJson();
            
            return $eventId;
        } catch (Exception $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            throw $e;
        }
    }
    
    private function insertEvent($eventData) {
        $schema = [];
        if (file_exists(SCHEMA_PATH)) {
            $schema = json_decode(file_get_contents(SCHEMA_PATH), true) ?: [];
        }
        
        $eventsTable = null;
        if (isset($schema['tables']) && is_array($schema['tables'])) {
            foreach ($schema['tables'] as $tableSchema) {
                if ($tableSchema['table'] === 'events') {
                    $eventsTable = $tableSchema;
                    break;
                }
            }
        }
        
        if (empty($eventsTable) || empty($eventsTable['fields']) || !is_array($eventsTable['fields'])) {
            throw new RuntimeException('Ungültiges oder fehlendes Event-Schema.');
        }
        
        $table = $eventsTable['table'];
        $fields = array_keys($eventsTable['fields']);
        $insertFields = [];
        $params = [];
        foreach ($fields as $field) {
            switch ($field) {
                case 'title': $insertFields[] = 'title'; $params[] = $eventData['Title'] ?? null; break;
                case 'location': $insertFields[] = 'location'; $params[] = $eventData['Location'] ?? null; break;
                case 'event_time': $insertFields[] = 'event_time'; $params[] = $eventData['Time'] ?? null; break;
                case 'latitude': $insertFields[] = 'latitude'; $params[] = $eventData['Geolocation']['Latitude'] ?? null; break;
                case 'longitude': $insertFields[] = 'longitude'; $params[] = $eventData['Geolocation']['Longitude'] ?? null; break;
                case 'organizer_name': $insertFields[] = 'organizer_name'; $params[] = $eventData['Organizer']['Name'] ?? null; break;
                case 'organizer_email': $insertFields[] = 'organizer_email'; $params[] = $eventData['Organizer']['Contact']['Email'] ?? null; break;
                case 'organizer_phone': $insertFields[] = 'organizer_phone'; $params[] = $eventData['Organizer']['Contact']['Phone'] ?? null; break;
                case 'event_type': $insertFields[] = 'event_type'; $params[] = $eventData['EventType'] ?? null; break;
                case 'description': $insertFields[] = 'description'; $params[] = $eventData['Description'] ?? null; break;
                case 'website_url': $insertFields[] = 'website_url'; $params[] = isset($eventData['WebsiteUrl']) ? sanitizeUrl($eventData['WebsiteUrl']) : null; break;
                case 'wolke': $insertFields[] = 'wolke'; $params[] = isset($eventData['Wolke']) ? sanitizeUrl($eventData['Wolke']) : null; break;
                case 'chatbegruenung': $insertFields[] = 'chatbegruenung'; $params[] = isset($eventData['Chatbegruenung']) ? sanitizeUrl($eventData['Chatbegruenung']) : null; break;
                case 'social_media_links': $insertFields[] = 'social_media_links'; $params[] = isset($eventData['SocialMediaLinks']) ? json_encode($eventData['SocialMediaLinks'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null; break;
                case 'event_images': $insertFields[] = 'event_images'; $params[] = isset($eventData['EventImages']) ? json_encode($eventData['EventImages'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null; break;
                case 'helpers_needed_minimum': $insertFields[] = 'helpers_needed_minimum'; $params[] = $eventData['HelpersNeededMinimum'] ?? $eventData['EventStatus']['HelpersNeededMinimum'] ?? null; break;
                case 'special_requirements': $insertFields[] = 'special_requirements'; $params[] = $eventData['SpecialRequirements'] ?? $eventData['EventStatus']['SpecialRequirements'] ?? null; break;
                case 'status': $insertFields[] = 'status'; $params[] = $eventData['Status'] ?? 'active'; break;
            }
        }
        $sql = "INSERT INTO `$table` (" . implode(", ", $insertFields) . ") VALUES (" . rtrim(str_repeat('?, ', count($insertFields)), ', ') . ")";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $this->db->lastInsertId();
    }
    
    public function updateEventsJson() {
        try {
            $events = $this->getAllEvents();
            $jsonPath = __DIR__ . '/events.json';
            file_put_contents($jsonPath, json_encode($events, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        } catch (Exception $e) {
            error_log("Failed to update events.json: " . $e->getMessage());
        }
    }
    
    public function cleanupExpiredConfirmations() {
        try {
            $stmt = $this->db->prepare("
                DELETE FROM event_confirmations 
                WHERE event_id IS NOT NULL 
                AND expires_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
            ");
            $stmt->execute();
        } catch (PDOException $e) {
            error_log("Failed to cleanup expired confirmations: " . $e->getMessage());
        }
    }
}

function sanitizeUrl($url) {
    if (empty($url)) {
        return $url;
    }
    
    $url = trim($url);
    
    if (preg_match('/^["\'](.*)["\']$/', $url, $matches)) {
        $url = $matches[1];
    }
    
    return $url;
}

function loadTemplateData(string $path, array $variables = []): array {
    if (!file_exists($path)) {
        throw new RuntimeException('Template not found: ' . $path);
    }
    extract($variables);
    $data = include $path;
    if (!is_array($data)) {
        throw new RuntimeException('Template did not return array data: ' . $path);
    }
    return $data;
}

function renderTemplate(string $path, array $variables = []): string {
    if (!file_exists($path)) {
        throw new RuntimeException('Template not found: ' . $path);
    }
    extract($variables);
    ob_start();
    include $path;
    return (string)ob_get_clean();
}

function generateSubmissionToken() {
    $token = bin2hex(random_bytes(32));
    $_SESSION['submission_token'] = $token;
    $_SESSION['token_expires'] = time() + 3600;
    return $token;
}

function validateSubmissionToken($token) {
    if (!isset($_SESSION['submission_token']) || 
        !isset($_SESSION['token_expires']) ||
        $_SESSION['token_expires'] < time() ||
        $_SESSION['submission_token'] !== $token) {
        return false;
    }
    
    unset($_SESSION['submission_token']);
    unset($_SESSION['token_expires']);
    
    return true;
}

function sendConfirmationEmail($email, $token, $eventTitle) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $confirmUrl = $protocol . $_SERVER['HTTP_HOST'] . "/api.php/confirm/" . $token;
    $template = loadTemplateData(TEMPLATE_ROOT . '/confirmation_email.php', [
        'eventTitle' => $eventTitle,
        'confirmUrl' => $confirmUrl
    ]);
    
    $subject = $template['subject'] ?? '';
    $textBody = $template['text'] ?? '';
    $htmlBody = $template['html'] ?? '';
    
    if ($subject === '' || $textBody === '') {
        throw new RuntimeException('Invalid confirmation email template content');
    }
    
    $boundary = md5(time());
    
    $headers = "From: " . MAIL_FROM . "\r\n";
    $headers .= "Reply-To: " . MAIL_FROM . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    
    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $textBody . "\r\n\r\n";
    
    if ($htmlBody !== '') {
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $message .= $htmlBody . "\r\n\r\n";
    }
    
    $message .= "--{$boundary}--";
    
    return mail($email, $subject, $message, $headers);
}

try {
    $database = new EventDatabase();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['PATH_INFO'] ?? '';
    
    if (rand(1, 100) <= 5) {
        $database->cleanupExpiredConfirmations();
    }
    
    switch ($method) {
        case 'GET':
            if ($path === '/events' || $path === '') {
                $events = $database->getAllEvents();
                echo json_encode($events, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            } elseif ($path === '/token') {
                $token = generateSubmissionToken();
                echo json_encode(['token' => $token, 'expires_in' => 3600]);
            } elseif ($path === '/validate-url') {
                if (!isset($_GET['url'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'URL parameter missing']);
                    break;
                }
                
                $url = $_GET['url'];
                
                if (!filter_var($url, FILTER_VALIDATE_URL)) {
                    echo json_encode([
                        'valid' => false,
                        'error' => 'Invalid URL format'
                    ]);
                    break;
                }
                
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
                curl_setopt($ch, CURLOPT_USERAGENT, 'BuendnisOst-EventValidator/1.0');
                curl_setopt($ch, CURLOPT_HEADER, true);
                curl_setopt($ch, CURLOPT_NOBODY, false);
                
                $response = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
                $body = substr($response, $headerSize);
                $error = curl_error($ch);
                curl_close($ch);
                
                if ($error) {
                    echo json_encode([
                        'valid' => false,
                        'error' => $error,
                        'title' => ''
                    ]);
                    break;
                }
                
                $valid = ($httpCode >= 200 && $httpCode < 400);
                
                $title = '';
                if ($valid && $body) {
                    if (preg_match('/<title[^>]*>([^<]+)<\/title>/i', $body, $matches)) {
                        $title = html_entity_decode(trim($matches[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
                    } elseif (preg_match('/<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i', $body, $matches)) {
                        $title = html_entity_decode(trim($matches[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
                    }
                }
                
                echo json_encode([
                    'valid' => $valid,
                    'http_code' => $httpCode,
                    'title' => $title,
                    'error' => $valid ? '' : "HTTP $httpCode"
                ]);
            } elseif (preg_match('/^\/confirm\/([a-f0-9]{64})$/', $path, $matches)) {
                header('Content-Type: text/html; charset=utf-8');
                $token = $matches[1];
                try {
                    $eventId = $database->confirmEvent($token);
                    echo renderTemplate(TEMPLATE_ROOT . '/confirm_success.php');
                } catch (Exception $e) {
                    header('Content-Type: text/html; charset=utf-8');
                    http_response_code(400);
                    echo renderTemplate(TEMPLATE_ROOT . '/confirm_error.php', ['errorMessage' => $e->getMessage()]);
                }
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;
            
        case 'POST':
            if ($path === '/events' || $path === '') {
                $input = file_get_contents('php://input');
                $requestData = json_decode($input, true);
                
                if (!$requestData) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid JSON data']);
                    break;
                }
                
                if (!isset($requestData['submission_token']) || 
                    !validateSubmissionToken($requestData['submission_token'])) {
                    http_response_code(403);
                    echo json_encode(['error' => 'Invalid or expired submission token']);
                    break;
                }
                
                $eventData = $requestData['event_data'] ?? $requestData;
                
                $required = ['Title', 'Location', 'Time', 'EventType', 'Description'];
                foreach ($required as $field) {
                    if (empty($eventData[$field])) {
                        http_response_code(400);
                        echo json_encode(['error' => "Missing required field: $field"]);
                        exit();
                    }
                }
                
                if (empty($eventData['Organizer']['Name']) || empty($eventData['Organizer']['Contact']['Email'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Missing organizer information']);
                    break;
                }
                
                $confirmationToken = $database->createEventConfirmation($eventData);
                $email = $eventData['Organizer']['Contact']['Email'];
                
                if (sendConfirmationEmail($email, $confirmationToken, $eventData['Title'])) {
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Bestätigungs-E-Mail wurde versendet. Bitte prüfen Sie Ihr Postfach.',
                        'email' => $email
                    ]);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to send confirmation email']);
                }
            } elseif ($path === '/export') {
                $database->updateEventsJson();
                $events = $database->getAllEvents();
                echo json_encode([
                    'success' => true,
                    'message' => 'Events wurden erfolgreich nach events.json exportiert',
                    'count' => count($events),
                    'file' => '/events.json'
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>