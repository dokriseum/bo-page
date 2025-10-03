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

require_once __DIR__ . '/config.php';

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
        $schemaPath = __DIR__ . '/event_schema.json';
        if (!file_exists($schemaPath)) {
            error_log('Schema file not found: ' . $schemaPath);
            return;
        }
        $schemaRaw = file_get_contents($schemaPath);
        $schema = json_decode($schemaRaw, true);
        if (!$schema || !isset($schema['table'], $schema['fields'])) {
            error_log('Invalid schema JSON in ' . $schemaPath);
            return;
        }
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
        $table = $schema['table'];
        $create = "CREATE TABLE IF NOT EXISTS `$table` (\n    " . implode(",\n    ", $fields) . "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
        $this->db->exec($create);
    }
    
    public function getAllEvents($status = 'active') {
        try {
            $schema = json_decode(file_get_contents(__DIR__ . '/event_schema.json'), true);
            $table = $schema['table'] ?? 'events';
            $sql = "SELECT * FROM `$table` WHERE status = ? ORDER BY event_time ASC";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$status]);
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $formattedEvents = [];
            foreach ($events as $event) {
                $formattedEvent = [];
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
                if (!empty($event['wolke'])) $formattedEvent['Wolke'] = $event['wolke'];
                if (!empty($event['chatbegruenung'])) $formattedEvent['Chatbegruenung'] = $event['chatbegruenung'];
                if (!empty($event['social_media_links'])) {
                    $formattedEvent['SocialMediaLinks'] = json_decode($event['social_media_links'], true);
                }
                if (!empty($event['event_status'])) {
                    $formattedEvent['EventStatus'] = json_decode($event['event_status'], true);
                } else {
                    $formattedEvent['EventStatus'] = [];
                    if (!empty($event['helpers_needed_minimum'])) {
                        $formattedEvent['EventStatus']['HelpersNeededMinimum'] = (int)$event['helpers_needed_minimum'];
                    }
                    if (!empty($event['special_requirements'])) {
                        $formattedEvent['EventStatus']['SpecialRequirements'] = $event['special_requirements'];
                    }
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
            $this->ensureEventConfirmationsTable();
            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', time() + 24 * 60 * 60);
            $stmt = $this->db->prepare("
                INSERT INTO event_confirmations (token, event_data, email, expires_at)
                VALUES (?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $token,
                json_encode($eventData, JSON_UNESCAPED_UNICODE),
                $eventData['Organizer']['Contact']['Email'],
                $expiresAt
            ]);
            
            return $token;
        } catch (PDOException $e) {
            throw new Exception('Error creating confirmation: ' . $e->getMessage());
        }
    }
    
    public function confirmEvent($token) {
        $this->ensureEventConfirmationsTable();
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
            $stmt = $this->db->prepare("DELETE FROM event_confirmations WHERE token = ?");
            $stmt->execute([$token]);
            
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

    private function ensureEventConfirmationsTable() {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS event_confirmations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                token VARCHAR(64) NOT NULL UNIQUE,
                event_data JSON NOT NULL,
                email VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_token (token),
                INDEX idx_expires (expires_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    }
    
    private function insertEvent($eventData) {
        $schema = json_decode(file_get_contents(__DIR__ . '/event_schema.json'), true);
        $table = $schema['table'];
        $fields = array_keys($schema['fields']);
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
                case 'wolke': $insertFields[] = 'wolke'; $params[] = $eventData['Wolke'] ?? null; break;
                case 'chatbegruenung': $insertFields[] = 'chatbegruenung'; $params[] = $eventData['Chatbegruenung'] ?? null; break;
                case 'social_media_links': $insertFields[] = 'social_media_links'; $params[] = isset($eventData['SocialMediaLinks']) ? json_encode($eventData['SocialMediaLinks']) : null; break;
                case 'helpers_needed_minimum': $insertFields[] = 'helpers_needed_minimum'; $params[] = $eventData['EventStatus']['HelpersNeededMinimum'] ?? null; break;
                case 'special_requirements': $insertFields[] = 'special_requirements'; $params[] = $eventData['EventStatus']['SpecialRequirements'] ?? null; break;
                case 'event_status': $insertFields[] = 'event_status'; $params[] = isset($eventData['EventStatus']) ? json_encode($eventData['EventStatus']) : null; break;
                case 'status': $insertFields[] = 'status'; $params[] = 'active'; break;
            }
        }
        $sql = "INSERT INTO `$table` (" . implode(", ", $insertFields) . ") VALUES (" . rtrim(str_repeat('?, ', count($insertFields)), ', ') . ")";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $this->db->lastInsertId();
    }
    
    public function updateEventsJson() {
        try {
            $events = $this->getAllEvents('active');
            $jsonPath = __DIR__ . '/../events.json';
            file_put_contents($jsonPath, json_encode($events, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        } catch (Exception $e) {
            error_log("Failed to update events.json: " . $e->getMessage());
        }
    }
    
    public function cleanupExpiredConfirmations() {
        try {
            $this->ensureEventConfirmationsTable();
            $stmt = $this->db->prepare("DELETE FROM event_confirmations WHERE expires_at < NOW()");
            $stmt->execute();
        } catch (PDOException $e) {
            error_log("Failed to cleanup expired confirmations: " . $e->getMessage());
        }
    }
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
    $confirmUrl = "https://" . $_SERVER['HTTP_HOST'] . "/backend/api.php/confirm/" . $token;
    $template = loadTemplateData(__DIR__ . '/templates/confirmation_email.php', [
        'eventTitle' => $eventTitle,
        'confirmUrl' => $confirmUrl
    ]);
    $subject = $template['subject'] ?? '';
    $message = $template['body'] ?? '';
    if ($subject === '' || $message === '') {
        throw new RuntimeException('Invalid confirmation email template content');
    }
    $headers = "From: " . MAIL_FROM . "\r\n";
    $headers .= "Reply-To: " . MAIL_FROM . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
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
            } elseif (preg_match('/^\/confirm\/([a-f0-9]{64})$/', $path, $matches)) {
                header('Content-Type: text/html; charset=utf-8');
                $token = $matches[1];
                try {
                    $eventId = $database->confirmEvent($token);
                    echo renderTemplate(__DIR__ . '/templates/confirm_success.php');
                } catch (Exception $e) {
                    header('Content-Type: text/html; charset=utf-8');
                    http_response_code(400);
                    echo renderTemplate(__DIR__ . '/templates/confirm_error.php', ['errorMessage' => $e->getMessage()]);
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