<?php
$errorText = htmlspecialchars($errorMessage ?? 'Unbekannter Fehler', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Bestätigung fehlgeschlagen</title>
    <link rel="stylesheet" href="/backend/css/confirmation.css">
</head>
<body class="confirm-error">
    <main class="confirmation-page">
        <header class="confirmation-header">
            <div class="confirmation-icon">⚠️</div>
            <h1 class="confirmation-title">Bestätigung fehlgeschlagen</h1>
            <p class="confirmation-subtitle">Der Link ist abgelaufen oder wurde bereits verwendet. Bitte fordere gegebenenfalls eine neue Bestätigung an.</p>
        </header>
        <section class="confirmation-content">
            <p>Du kannst das Event einfach erneut einreichen oder dich bei uns melden, damit wir gemeinsam eine Lösung finden.</p>
            <ul class="details-list">
                <li>Fehlernachricht: <?php echo $errorText; ?></li>
                <li>Der ursprüngliche Bestätigungslink ist jetzt ungültig.</li>
                <li>Bei Problemen hilft dir unser Team jederzeit weiter.</li>
            </ul>
            <div class="confirmation-actions">
                <a class="action-link" href="/event-submit.html">Neues Event einreichen</a>
            </div>
        </section>
        <footer class="confirmation-footer">
            Fragen? Schreib uns über ein Mail an <a href="mailto:events@buendnis-ost.de">events@buendnis-ost.de</a>.
        </footer>
    </main>
</body>
</html>
