<?php
$formattedTime = $eventData['Time'];
try {
    $dt = new DateTime($eventData['Time']);
    $formattedTime = $dt->format('d.m.Y, H:i') . ' Uhr';
} catch (Exception $e) {
    $formattedTime = $eventData['Time'];
}

$eventDetails = "Event-Details:\n";
$eventDetails .= "─────────────────────────────────────\n";
$eventDetails .= "Titel: {$eventTitle}\n";
$eventDetails .= "Ort: {$eventData['Location']}\n";
$eventDetails .= "Zeit: {$formattedTime}\n";
$eventDetails .= "Typ: {$eventData['EventType']}\n";
if (!empty($eventData['Description'])) {
    $eventDetails .= "Beschreibung: {$eventData['Description']}\n";
}
$eventDetails .= "\n";
$eventDetails .= "Veranstalter: {$eventData['Organizer']['Name']}\n";
if (!empty($eventData['Organizer']['Contact']['Phone'])) {
    $eventDetails .= "Telefon: {$eventData['Organizer']['Contact']['Phone']}\n";
}
if (!empty($eventData['WebsiteUrl'])) {
    $eventDetails .= "\nWebseite: {$eventData['WebsiteUrl']}\n";
}
if (!empty($eventData['SocialMediaLinks']) && is_array($eventData['SocialMediaLinks'])) {
    $eventDetails .= "\nSocial Media:\n";
    foreach ($eventData['SocialMediaLinks'] as $link) {
        $eventDetails .= "  - {$link}\n";
    }
}
if (!empty($eventData['HelpersNeededMinimum'])) {
    $eventDetails .= "\nHelfer:innen benötigt: mindestens {$eventData['HelpersNeededMinimum']}\n";
}
if (!empty($eventData['SpecialRequirements'])) {
    $eventDetails .= "Material/Sonderbedarf: {$eventData['SpecialRequirements']}\n";
}

$textBody = <<<TEXT
Hallo,

Sie haben ein neues Event bei Bündnis Ost eingetragen.

{$eventDetails}
Um das Event zu bestätigen und zu veröffentlichen, klicken Sie bitte auf folgenden Link:
{$confirmUrl}

Dieser Link ist 24 Stunden gültig.

Falls Sie dieses Event nicht eingetragen haben, ignorieren Sie diese E-Mail.

Viele Grüße,
Das Bündnis Ost Team
TEXT;

$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event-Bestätigung</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .wrapper { width: 100%; border-collapse: collapse; }
        .container { width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { padding: 40px 30px; text-align: center; background-color: #46962b; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; font-size: 16px; }
        .content { padding: 40px 30px; }
        .text { margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333; }
        .text-intro { margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #333333; }
        .event-box { width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 5px; }
        .event-box td { padding: 20px; }
        .event-title { margin: 0 0 15px 0; font-size: 20px; color: #46962b; }
        .details-table { width: 100%; border-collapse: collapse; }
        .detail-label { padding: 5px 0; font-size: 14px; color: #666666; width: 120px; vertical-align: top; font-weight: bold; }
        .detail-value { padding: 5px 0; font-size: 14px; color: #333333; }
        .divider { padding: 15px 0 5px 0; }
        .divider hr { border: none; border-top: 1px solid #e0e0e0; margin: 0; }
        .button-cell { padding: 0 0 30px 0; text-align: center; }
        .button { display: inline-block; padding: 15px 40px; background-color: #46962b; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; }
        .small-text { margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #666666; }
        .link { margin: 0 0 30px 0; font-size: 14px; line-height: 1.6; color: #46962b; word-break: break-all; }
        .footer-text { margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #999999; }
        .footer { padding: 30px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #e0e0e0; }
        .footer p { margin: 0; font-size: 14px; color: #666666; }
        .green-link { color: #46962b; text-decoration: none; }
    </style>
</head>
<body>
    <table role="presentation" class="wrapper">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" class="container">
                    <tr>
                        <td class="header">
                            <h1>Bündnis Ost</h1>
                            <p>Event-Bestätigung erforderlich</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p class="text">
                                Hallo,
                            </p>
                            <p class="text">
                                Sie haben ein neues Event bei Bündnis Ost eingetragen:
                            </p>
                            
                            <table role="presentation" class="event-box">
                                <tr>
                                    <td>
                                        <h2 class="event-title">{$eventTitle}</h2>
                                        
                                        <table role="presentation" class="details-table">
                                            <tr>
                                                <td class="detail-label"><strong>Ort:</strong></td>
                                                <td class="detail-value">{$eventData['Location']}</td>
                                            </tr>
                                            <tr>
                                                <td class="detail-label"><strong>Zeit:</strong></td>
                                                <td class="detail-value">{$formattedTime}</td>
                                            </tr>
                                            <tr>
                                                <td class="detail-label"><strong>Typ:</strong></td>
                                                <td class="detail-value">{$eventData['EventType']}</td>
                                            </tr>
HTML;

if (!empty($eventData['Description'])) {
    $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Beschreibung:</strong></td>
                                                <td class="detail-value">{$eventData['Description']}</td>
                                            </tr>
HTML;
}

$htmlBody .= <<<HTML
                                            <tr class="divider">
                                                <td colspan="2">
                                                    <hr>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="detail-label"><strong>Veranstalter:</strong></td>
                                                <td class="detail-value">{$eventData['Organizer']['Name']}</td>
                                            </tr>
HTML;

if (!empty($eventData['Organizer']['Contact']['Phone'])) {
    $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Telefon:</strong></td>
                                                <td class="detail-value">{$eventData['Organizer']['Contact']['Phone']}</td>
                                            </tr>
HTML;
}

if (!empty($eventData['WebsiteUrl'])) {
    $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Webseite:</strong></td>
                                                <td class="detail-value"><a href="{$eventData['WebsiteUrl']}" class="green-link">{$eventData['WebsiteUrl']}</a></td>
                                            </tr>
HTML;
}

if (!empty($eventData['SocialMediaLinks']) && is_array($eventData['SocialMediaLinks'])) {
    $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Social Media:</strong></td>
                                                <td class="detail-value">
HTML;
    
    foreach ($eventData['SocialMediaLinks'] as $idx => $link) {
        if ($idx > 0) {
            $htmlBody .= '<br>';
        }
        $htmlBody .= '<a href="' . htmlspecialchars($link, ENT_QUOTES, 'UTF-8') . '" class="green-link">' . htmlspecialchars($link, ENT_QUOTES, 'UTF-8') . '</a>';
    }
    
    $htmlBody .= <<<HTML
                                                </td>
                                            </tr>
HTML;
}

if (!empty($eventData['HelpersNeededMinimum']) || !empty($eventData['SpecialRequirements'])) {
    $htmlBody .= <<<HTML
                                            <tr class="divider">
                                                <td colspan="2">
                                                    <hr>
                                                </td>
                                            </tr>
HTML;
    
    if (!empty($eventData['HelpersNeededMinimum'])) {
        $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Helfer:innen:</strong></td>
                                                <td class="detail-value">mindestens {$eventData['HelpersNeededMinimum']}</td>
                                            </tr>
HTML;
    }
    
    if (!empty($eventData['SpecialRequirements'])) {
        $htmlBody .= <<<HTML
                                            <tr>
                                                <td class="detail-label"><strong>Material:</strong></td>
                                                <td class="detail-value">{$eventData['SpecialRequirements']}</td>
                                            </tr>
HTML;
    }
}

$htmlBody .= <<<HTML
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p class="text">
                                Um das Event zu bestätigen und zu veröffentlichen, klicken Sie bitte auf folgenden Button:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td class="button-cell">
                                        <a href="{$confirmUrl}" class="button">Event bestätigen</a>
                                    </td>
                                </tr>
                            </table>
                            <p class="small-text">
                                Falls der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:
                            </p>
                            <p class="link">
                                {$confirmUrl}
                            </p>
                            <p class="footer-text">
                                Dieser Link ist eine Woche gültig.
                            </p>
                            <p class="footer-text">
                                Falls Sie dieses Event nicht eingetragen haben, ignorieren Sie diese E-Mail.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>
                                Viele Grüße,<br>
                                <strong>Das Bündnis Ost Team</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

return [
    'subject' => "Event-Bestätigung erforderlich: {$eventTitle}",
    'text' => $textBody,
    'html' => $htmlBody
];
