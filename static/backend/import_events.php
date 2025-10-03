<?php
declare(strict_types=1);

$configPath = __DIR__ . '/config.php';
$importAttempted = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$importSummary = [
    'success' => false,
    'attempted' => $importAttempted,
    'imported' => 0,
    'skipped' => 0,
    'total' => 0,
    'filename' => null,
    'skipped_details' => [],
    'errors' => []
];
$uploadedFileName = null;

if (!file_exists($configPath)) {
    $fatalError = 'Konfigurationsdatei config.php nicht gefunden. Bitte richten Sie die Datenbankverbindung ein.';
} else {
    require_once $configPath;

    try {
        $schemaPath = __DIR__ . '/event_schema.json';
        if (!file_exists($schemaPath)) {
            throw new RuntimeException('event_schema.json wurde nicht gefunden.');
        }
        $schema = json_decode(file_get_contents($schemaPath), true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($schema) || empty($schema['table']) || empty($schema['fields'])) {
            throw new RuntimeException('event_schema.json enthält ein ungültiges Schema.');
        }

        if ($importAttempted) {
            if (!isset($_FILES['events_file'])) {
                throw new RuntimeException('Bitte wählen Sie eine JSON-Datei aus.');
            }

            $file = $_FILES['events_file'];
            if (!is_array($file) || !isset($file['error'])) {
                throw new RuntimeException('Fehler beim Datei-Upload.');
            }

            if ($file['error'] !== UPLOAD_ERR_OK) {
                throw new RuntimeException(describeUploadError((int)$file['error']));
            }

            if (!is_uploaded_file($file['tmp_name'] ?? '')) {
                throw new RuntimeException('Die hochgeladene Datei konnte nicht verifiziert werden.');
            }

            $uploadedFileName = (string)($file['name'] ?? 'events.json');
            $importSummary['filename'] = $uploadedFileName;

            $maxBytes = 5 * 1024 * 1024;
            if (($file['size'] ?? 0) > $maxBytes) {
                throw new RuntimeException('Die Datei ist größer als 5 MB.');
            }

            $fileContents = file_get_contents($file['tmp_name']);
            if ($fileContents === false) {
                throw new RuntimeException('Die Datei konnte nicht gelesen werden.');
            }

            if (trim($fileContents) === '') {
                throw new RuntimeException('Die hochgeladene Datei ist leer.');
            }

            $eventsData = json_decode($fileContents, true, 512, JSON_THROW_ON_ERROR);
            if (!is_array($eventsData)) {
                throw new RuntimeException('Die Datei enthält keine gültige Eventliste.');
            }

            $importSummary['total'] = count($eventsData);

            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            $db = new PDO($dsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

            verifyEventsTableExists($db, $schema['table']);

            $table = $schema['table'];
            $columns = determineInsertColumns($schema);
            $quotedColumns = array_map(fn($col) => '`' . $col . '`', $columns);
            $placeholders = implode(', ', array_fill(0, count($columns), '?'));
            $insertSql = 'INSERT INTO `' . $table . '` (' . implode(', ', $quotedColumns) . ') VALUES (' . $placeholders . ')';
            $insertStmt = $db->prepare($insertSql);
            $checkStmt = $db->prepare('SELECT id FROM `' . $table . '` WHERE title = ? AND event_time = ? LIMIT 1');

            $db->beginTransaction();
            foreach ($eventsData as $index => $event) {
                if (!is_array($event)) {
                    $importSummary['skipped']++;
                    $importSummary['skipped_details'][] = 'Eintrag ' . ($index + 1) . ': Ungültiges Format.';
                    continue;
                }

                $title = trim((string)($event['Title'] ?? ''));
                if ($title === '') {
                    $importSummary['skipped']++;
                    $importSummary['skipped_details'][] = 'Eintrag ' . ($index + 1) . ': Kein Titel vorhanden.';
                    continue;
                }

                $normalizedTime = normalizeEventDate($event['Time'] ?? null);
                if ($normalizedTime === null) {
                    $importSummary['skipped']++;
                    $importSummary['skipped_details'][] = 'Eintrag ' . ($index + 1) . ' („' . $title . '“): Ungültiges Datum.';
                    continue;
                }

                $checkStmt->execute([$title, $normalizedTime]);
                if ($checkStmt->fetch()) {
                    $importSummary['skipped']++;
                    $importSummary['skipped_details'][] = 'Eintrag ' . ($index + 1) . ' („' . $title . '“): Bereits vorhanden.';
                    continue;
                }

                $values = mapEventToDbValues($event, $columns, $normalizedTime);
                if ($values === null) {
                    $importSummary['skipped']++;
                    $importSummary['skipped_details'][] = 'Eintrag ' . ($index + 1) . ' („' . $title . '“): Pflichtfelder fehlen.';
                    continue;
                }

                $insertStmt->execute($values);
                $importSummary['imported']++;
            }
            $db->commit();
            $importSummary['success'] = true;
        }
    } catch (Throwable $e) {
        if (isset($db) && $db instanceof PDO && $db->inTransaction()) {
            $db->rollBack();
        }
        $importSummary['errors'][] = $e->getMessage();
    }
}

function verifyEventsTableExists(PDO $db, string $table): void
{
    try {
        $db->query('SELECT 1 FROM `' . $table . '` LIMIT 1');
    } catch (Throwable $e) {
        throw new RuntimeException('Die Event-Tabelle "' . $table . '" existiert nicht oder ist nicht erreichbar. Bitte führen Sie die Datenbankschemata vorab aus.', 0, $e);
    }
}

function determineInsertColumns(array $schema): array
{
    $columns = [];
    foreach (array_keys($schema['fields']) as $field) {
        if (in_array($field, ['id', 'created_at', 'updated_at'], true)) {
            continue;
        }
        $columns[] = $field;
    }
    return $columns;
}

function normalizeEventDate(?string $value): ?string
{
    if ($value === null || trim($value) === '') {
        return null;
    }
    try {
        $dt = new DateTime($value);
        return $dt->format('Y-m-d H:i:s');
    } catch (Exception $e) {
        return null;
    }
}

function trimmedOrNull($value): ?string
{
    if ($value === null) {
        return null;
    }
    $trimmed = trim((string)$value);
    return $trimmed === '' ? null : $trimmed;
}

function mapEventToDbValues(array $event, array $columns, string $normalizedTime): ?array
{
    $values = [];
    $links = [];
    $statusPayload = [];

    if (!empty($event['SocialMediaLinks']) && is_array($event['SocialMediaLinks'])) {
        $links = array_merge($links, array_filter($event['SocialMediaLinks']));
    }
    if (!empty($event['Organizer']['SocialMediaLinks']) && is_array($event['Organizer']['SocialMediaLinks'])) {
        $links = array_merge($links, array_filter($event['Organizer']['SocialMediaLinks']));
    }
    if (!empty($event['EventStatus']) && is_array($event['EventStatus'])) {
        $statusPayload = $event['EventStatus'];
    }
    if (!empty($event['Website'])) {
        $statusPayload['Website'] = $event['Website'];
    }
    if (!empty($event['Image'])) {
        $statusPayload['Image'] = $event['Image'];
    }
    if (!empty($event['Id'])) {
        $statusPayload['SourceId'] = $event['Id'];
    }

    $links = array_values(array_unique($links));
    $title = trim((string)($event['Title'] ?? ''));
    if ($title === '') {
        return null;
    }

    foreach ($columns as $column) {
        switch ($column) {
            case 'title':
                $values[] = $title;
                break;
            case 'location':
                $values[] = trimmedOrNull($event['Location'] ?? null) ?? 'Unbekannter Ort';
                break;
            case 'event_time':
                $values[] = $normalizedTime;
                break;
            case 'latitude':
                $values[] = isset($event['Geolocation']['Latitude']) ? (float)$event['Geolocation']['Latitude'] : null;
                break;
            case 'longitude':
                $values[] = isset($event['Geolocation']['Longitude']) ? (float)$event['Geolocation']['Longitude'] : null;
                break;
            case 'organizer_name':
                $values[] = trimmedOrNull($event['Organizer']['Name'] ?? null) ?? 'Unbekannter Veranstalter';
                break;
            case 'organizer_email':
                $email = trimmedOrNull($event['Organizer']['Contact']['Email'] ?? null);
                $values[] = $email ?: (defined('MAIL_FROM') ? MAIL_FROM : 'noreply@example.com');
                break;
            case 'organizer_phone':
                $values[] = trimmedOrNull($event['Organizer']['Contact']['Phone'] ?? null);
                break;
            case 'event_type':
                $values[] = trimmedOrNull($event['EventType'] ?? null) ?? 'Import';
                break;
            case 'description':
                $values[] = trimmedOrNull($event['Description'] ?? null) ?? 'Keine Beschreibung verfügbar';
                break;
            case 'wolke':
                $values[] = trimmedOrNull($event['Wolke'] ?? null);
                break;
            case 'chatbegruenung':
                $values[] = trimmedOrNull($event['Chatbegruenung'] ?? null);
                break;
            case 'social_media_links':
                $values[] = !empty($links) ? json_encode($links, JSON_UNESCAPED_UNICODE) : null;
                break;
            case 'helpers_needed_minimum':
                $values[] = isset($event['EventStatus']['HelpersNeededMinimum']) ? (int)$event['EventStatus']['HelpersNeededMinimum'] : null;
                break;
            case 'special_requirements':
                $values[] = trimmedOrNull($event['EventStatus']['SpecialRequirements'] ?? null);
                break;
            case 'event_status':
                $values[] = !empty($statusPayload) ? json_encode($statusPayload, JSON_UNESCAPED_UNICODE) : null;
                break;
            case 'status':
                $values[] = 'active';
                break;
            default:
                $values[] = null;
        }
    }

    return $values;
}

function describeUploadError(int $errorCode): string
{
    return match ($errorCode) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Die Datei überschreitet die zulässige Größe.',
        UPLOAD_ERR_PARTIAL => 'Die Datei wurde nur teilweise hochgeladen.',
        UPLOAD_ERR_NO_FILE => 'Es wurde keine Datei hochgeladen.',
        UPLOAD_ERR_NO_TMP_DIR => 'Temporärer Upload-Ordner fehlt auf dem Server.',
        UPLOAD_ERR_CANT_WRITE => 'Die Datei konnte nicht auf den Server geschrieben werden.',
        UPLOAD_ERR_EXTENSION => 'Ein PHP-Plugin hat den Upload gestoppt.',
        default => 'Unbekannter Upload-Fehler (Code ' . $errorCode . ').'
    };
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>events.json importieren</title>
    <link rel="stylesheet" href="/backend/test.css">
</head>
<body>
    <h1>Event-Import</h1>
    <div class="test-section">
        <?php if (isset($fatalError)): ?>
            <div class="status error">
                <?php echo esc($fatalError); ?>
            </div>
        <?php else: ?>
            <?php if ($importSummary['success']): ?>
                <div class="status success">
                    ✅ Import abgeschlossen: <?php echo esc((string)$importSummary['imported']); ?> Event(s) importiert, <?php echo esc((string)$importSummary['skipped']); ?> übersprungen.
                    <?php if (!empty($importSummary['filename'])): ?>
                        <div>Quelle: <?php echo esc((string)$importSummary['filename']); ?><?php if ($importSummary['total'] > 0): ?> (<?php echo esc((string)$importSummary['total']); ?> Einträge)<?php endif; ?></div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if ($importSummary['attempted'] && !$importSummary['success'] && empty($importSummary['errors'])): ?>
                <div class="status info">
                    Keine neuen Events importiert. Prüfen Sie, ob die Datei neue Daten enthält.
                </div>
            <?php endif; ?>

            <?php foreach ($importSummary['errors'] as $error): ?>
                <div class="status error">❌ <?php echo esc($error); ?></div>
            <?php endforeach; ?>

            <?php if (!empty($importSummary['skipped_details'])): ?>
                <div class="status info">
                    <strong>Übersprungene Einträge:</strong>
                    <ul>
                        <?php foreach ($importSummary['skipped_details'] as $detail): ?>
                            <li><?php echo esc($detail); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <p>
            Laden Sie eine neue <code>.json</code>-Datei mit Events hoch, um sie in die Datenbank zu importieren.
            Bereits vorhandene Einträge werden anhand von Titel und Datum automatisch übersprungen.
            Unterstützt werden Dateien bis zu einer Größe von 5&nbsp;MB.
        </p>
        <form method="post" enctype="multipart/form-data">
            <label class="field-label" for="events_file">JSON-Datei auswählen:</label>
            <input type="file" name="events_file" id="events_file" accept="application/json,.json" required>
            <button type="submit">Import starten</button>
        </form>
        <a href="/backend/test.php">← Zurück zur Testseite</a>
    </div>
</body>
</html>
