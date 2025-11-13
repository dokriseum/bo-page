<?php
header('Content-Type: text/html; charset=utf-8');

$eventId = $_GET['id'] ?? null;

if (!$eventId) {
    header('Location: /');
    exit;
}

$eventsJsonPath = __DIR__ . '/events.json';
$events = [];

if (file_exists($eventsJsonPath)) {
    $eventsJson = file_get_contents($eventsJsonPath);
    $events = json_decode($eventsJson, true) ?: [];
}

$event = null;
foreach ($events as $e) {
    if ($e['Id'] === $eventId) {
        $event = $e;
        break;
    }
}

if (!$event) {
    header('Location: /');
    exit;
}

$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$isCrawler = preg_match('/bot|crawler|spider|crawling|facebook|twitter|linkedin|whatsapp|signal|threema|telegram|slack|discord/i', $userAgent);

if (!$isCrawler) {
    $redirectUrl = '/?event=' . urlencode($eventId);
    header('Location: ' . $redirectUrl);
    exit;
}

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$currentUrl = $protocol . $host . $_SERVER['REQUEST_URI'];

$title = htmlspecialchars($event['Title'] ?? 'Event', ENT_QUOTES, 'UTF-8');
$description = htmlspecialchars($event['Description'] ?? '', ENT_QUOTES, 'UTF-8');
$location = htmlspecialchars($event['Location'] ?? '', ENT_QUOTES, 'UTF-8');
$time = htmlspecialchars($event['Time'] ?? '', ENT_QUOTES, 'UTF-8');
$organizer = htmlspecialchars($event['Organizer']['Name'] ?? '', ENT_QUOTES, 'UTF-8');

$imageUrl = '';
if (!empty($event['event_images']) && is_array($event['event_images']) && count($event['event_images']) > 0) {
    $imageUrl = $protocol . $host . '/' . ltrim($event['event_images'][0], '/');
} elseif (!empty($event['image'])) {
    $imageUrl = $protocol . $host . '/' . ltrim($event['image'], '/');
}

$siteName = 'Bündnis OST';
$siteDescription = 'Entdecke Veranstaltungen, Geschichten und Menschen aus dem Osten Deutschlands';

$ogDescription = $description;
if (strlen($ogDescription) > 200) {
    $ogDescription = substr($ogDescription, 0, 197) . '...';
}

$fullDescription = $title;
if ($time) {
    $fullDescription .= ' am ' . $time;
}
if ($location) {
    $fullDescription .= ' in ' . $location;
}
if ($organizer) {
    $fullDescription .= ' | Veranstaltet von ' . $organizer;
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?> | <?php echo $siteName; ?></title>
    <meta name="description" content="<?php echo $fullDescription; ?>">
    
    <!-- OpenGraph Tags -->
    <meta property="og:type" content="event">
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:description" content="<?php echo $ogDescription ?: $fullDescription; ?>">
    <meta property="og:url" content="<?php echo $currentUrl; ?>">
    <meta property="og:site_name" content="<?php echo $siteName; ?>">
    <?php if ($imageUrl): ?>
    <meta property="og:image" content="<?php echo $imageUrl; ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?php echo $title; ?>">
    <?php endif; ?>
    
    <?php if ($time): ?>
    <meta property="event:start_time" content="<?php echo date('c', strtotime($time)); ?>">
    <?php endif; ?>
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $ogDescription ?: $fullDescription; ?>">
    <?php if ($imageUrl): ?>
    <meta name="twitter:image" content="<?php echo $imageUrl; ?>">
    <?php endif; ?>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 { color: #333; margin-bottom: 20px; }
        .event-meta { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .meta-item { margin: 10px 0; }
        .meta-label { font-weight: 600; color: #666; }
        p { color: #555; }
        .redirect-notice {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #2196f3;
        }
    </style>
</head>
<body>
    <h1><?php echo $title; ?></h1>
    
    <div class="event-meta">
        <?php if ($time): ?>
        <div class="meta-item">
            <span class="meta-label">Datum & Uhrzeit:</span> <?php echo $time; ?>
        </div>
        <?php endif; ?>
        
        <?php if ($location): ?>
        <div class="meta-item">
            <span class="meta-label">Ort:</span> <?php echo $location; ?>
        </div>
        <?php endif; ?>
        
        <?php if ($organizer): ?>
        <div class="meta-item">
            <span class="meta-label">Veranstalter:</span> <?php echo $organizer; ?>
        </div>
        <?php endif; ?>
    </div>
    
    <?php if ($description): ?>
    <p><?php echo nl2br($description); ?></p>
    <?php endif; ?>
    
    <div class="redirect-notice">
        <p><strong>Hinweis:</strong> Diese Seite ist für Social Media Crawler optimiert. Normale Besucher werden automatisch zur interaktiven Event-Seite weitergeleitet.</p>
    </div>
</body>
</html>
