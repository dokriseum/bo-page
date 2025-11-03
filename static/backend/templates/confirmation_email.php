<?php
$textBody = <<<TEXT
Hallo,

Sie haben ein neues Event '{$eventTitle}' bei Bündnis Ost eingetragen.

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
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background-color: #46962b; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Bündnis Ost</h1>
                            <p style="margin: 10px 0 0 0; font-size: 16px;">Event-Bestätigung erforderlich</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Hallo,
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Sie haben ein neues Event <strong style="color: #46962b;">"{$eventTitle}"</strong> bei Bündnis Ost eingetragen.
                            </p>
                            <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                                Um das Event zu bestätigen und zu veröffentlichen, klicken Sie bitte auf folgenden Button:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 0 0 30px 0;">
                                        <a href="{$confirmUrl}" style="display: inline-block; padding: 15px 40px; background-color: #46962b; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">Event bestätigen</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #666666;">
                                Falls der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:
                            </p>
                            <p style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.6; color: #46962b; word-break: break-all;">
                                {$confirmUrl}
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #999999;">
                                Dieser Link ist 24 Stunden gültig.
                            </p>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #999999;">
                                Falls Sie dieses Event nicht eingetragen haben, ignorieren Sie diese E-Mail.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">
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
