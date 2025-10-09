<?php
$body = <<<TEXT
Hallo,

Sie haben ein neues Event '{$eventTitle}' bei Bündnis Ost eingetragen.

Um das Event zu bestätigen und zu veröffentlichen, klicken Sie bitte auf folgenden Link:
{$confirmUrl}

Dieser Link ist 24 Stunden gültig.

Falls Sie dieses Event nicht eingetragen haben, ignorieren Sie diese E-Mail.

Viele Grüße,
Das Bündnis Ost Team
TEXT;

return [
    'subject' => "Event-Bestätigung erforderlich: {$eventTitle}",
    'body' => $body
];
