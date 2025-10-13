<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Test - Bündnis Ost</title>
    <link rel="stylesheet" href="/backend/test.css">
</head>
<body>
    <h1>Backend Test - Bündnis Ost Event API</h1>
    <h2 style="color: red;"><?php echo $_SERVER['HTTP_HOST']; ?></h2>

    <!-- PHP Info Test -->
    <div class="test-section">
        <h2>1. PHP & MariaDB Grundfunktionalität</h2>
        <div class="status success">
            ✅ PHP Version: <?php echo phpversion(); ?><br>
            ✅ Server Zeit: <?php echo date('Y-m-d H:i:s'); ?><br>
            ✅ PDO MySQL Support: <?php echo extension_loaded('pdo_mysql') ? 'Verfügbar' : 'Nicht verfügbar'; ?><br>
            ✅ Mail Funktion: <?php echo function_exists('mail') ? 'Verfügbar' : 'Nicht verfügbar'; ?><br>
            ✅ Session Support: <?php echo session_status() === PHP_SESSION_ACTIVE ? 'Aktiv' : 'Inaktiv'; ?>
        </div>
    </div>

    <!-- Database Test -->
    <div class="test-section">
        <h2>2. MariaDB Verbindungstest</h2>
        <div class="status info">
            📋 <strong>Setup-Schritte:</strong><br>
            1. <code>cp config.example.php config.php</code><br>
            2. DB-Credentials in config.php anpassen<br>
            3. E-Mail-Konfiguration prüfen<br>
            4. HTTPS für Produktionsumgebung sicherstellen
        </div>
        <div id="db-status">
            <?php
            try {
                require_once __DIR__ . '/config.php';
                $schema = json_decode(file_get_contents(__DIR__ . '/event_schema.json'), true);
                
                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $db = new PDO($dsn, DB_USER, DB_PASS);
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                echo '<div class="status success">✅ Datenbankverbindung erfolgreich<br>';
                echo '✅ DB Host: ' . DB_HOST . '<br>';
                echo '✅ DB Name: ' . DB_NAME . '<br>';
                echo '✅ DB User: ' . DB_USER . '<br>';
                echo '✅ Mail From: ' . MAIL_FROM . '</div>';
                
                // Test if tables exist
                echo '<div class="status info">📊 Tabellen Status:<br>';
                if (isset($schema['tables']) && is_array($schema['tables'])) {
                    foreach ($schema['tables'] as $tableSchema) {
                        $table = $tableSchema['table'];
                        $stmt = $db->query("SHOW TABLES LIKE '" . $table . "'");
                        $tableExists = $stmt->fetch();
                        
                        echo '• ' . $table . ': ' . ($tableExists ? '✅ Existiert' : '❌ Wird bei erstem API-Aufruf erstellt') . '<br>';
                        
                        if ($tableExists && $table === 'events') {
                            $stmt = $db->query("SELECT COUNT(*) as count FROM `" . $table . "`");
                            $count = $stmt->fetch();
                            echo '  → Events in DB: ' . $count['count'] . '<br>';
                        }
                        if ($tableExists && $table === 'event_confirmations') {
                            $stmt = $db->query("SELECT COUNT(*) as count FROM `" . $table . "`");
                            $count = $stmt->fetch();
                            echo '  → Ausstehende Bestätigungen: ' . $count['count'] . '<br>';
                        }
                    }
                }
                echo '</div>';
                
            } catch (Exception $e) {
                if (strpos($e->getMessage(), 'config.php') !== false) {
                    echo '<div class="status error">❌ Konfigurationsdatei nicht gefunden<br>';
                    echo '💡 Bitte kopieren Sie config.example.php zu config.php und passen Sie die Werte an</div>';
                } else {
                    echo '<div class="status error">❌ Datenbankverbindung fehlgeschlagen<br>';
                    echo 'Fehler: ' . $e->getMessage() . '<br>';
                    echo '💡 Bitte prüfen Sie die Datenbank-Konfiguration in config.php</div>';
                }
            }
            ?>
        </div>
    </div>

    <!-- Token Management Test -->
    <div class="test-section">
        <h2>3. Token-System Test</h2>
        
        <button onclick="requestToken()">Neuen Submission-Token anfordern</button>
        <div id="token-display"></div>
        
        <div class="workflow">
            <strong>🔄 Workflow:</strong><br>
            1. Frontend fordert Token an (GET /api.php/token)<br>
            2. Token wird in Session gespeichert (TTL: 1 Stunde)<br>
            3. Event-Submission mit Token (POST /api.php/events)<br>
            4. Token wird nach einmaliger Nutzung invalidiert
        </div>
    </div>

    <!-- API Test -->
    <div class="test-section">
        <h2>4. API Endpunkt Tests</h2>
        
        <button onclick="testGetEvents()">GET /api.php/events testen</button>
        <button onclick="testSubmitEvent()" id="submitBtn" disabled>POST Event einreichen (Token erforderlich)</button>
        
        <div id="api-results"></div>
    </div>

    <!-- Email Confirmation Workflow -->
    <div class="test-section">
        <h2>5. E-Mail Bestätigungs-Workflow</h2>
        
        <div class="workflow">
            <strong>📧 Bestätigungs-Workflow:</strong><br>
            1. Event wird mit gültigem Token eingereicht<br>
            2. Event-Daten werden in <code>event_confirmations</code> Tabelle gespeichert<br>
            3. Bestätigungs-E-Mail mit Token wird versendet<br>
            4. Nutzer klickt auf Bestätigungslink<br>
            5. Event wird in die Datenbank geschrieben und JSON-Datei aktualisiert
        </div>
        
        <form id="testEventForm">
            <label>E-Mail für Test: <input type="email" name="test_email" value="<?php echo htmlspecialchars(MAIL_TEST_TO) ?>" required></label>
            <label>Event Titel: <input type="text" name="title" value="API Test Event" required></label>
            <label>Ort: <input type="text" name="location" value="Berlin, Deutschland" required></label>
            <label>Latitude: <input type="number" name="latitude" step="any" value="52.520008" placeholder="z.B. 52.520008"></label>
            <label>Longitude: <input type="number" name="longitude" step="any" value="13.404954" placeholder="z.B. 13.404954"></label>
            <label>Datum/Zeit: <input type="datetime-local" name="time" required></label>
            <label>Veranstalter Name: <input type="text" name="organizer_name" value="Test Organizer" required></label>
            <label>Veranstalter Email: <input type="email" name="test_email" value="<?php echo htmlspecialchars(MAIL_TEST_TO) ?>" required></label>
            <label>Veranstalter Telefon: <input type="tel" name="organizer_phone" value="+49 30 12345678" placeholder="z.B. 0123 456789"></label>
            <label>Event Typ: <input type="text" name="event_type" value="Test" required></label>
            <label>Beschreibung: <textarea name="description" required>Dies ist ein Test Event für das Backend</textarea></label>
            <label>Webseite: <input type="url" name="website_url" value="https://www.tolles-event-im-osten.de/#2138912jhdf"></label>
            <label>Wolke-Link: <input type="url" name="wolke" value="https://wolke.netzbegruenung.de/test-ordner" placeholder="https://wolke.netzbegruenung.de/..."></label>
            <label>Chatbegruenung-Link: <input type="url" name="chatbegruenung" value="https://chatbegruenung.de/channel/test" placeholder="https://chatbegruenung.de/..."></label>
            <label>Social Media Links (ein Link pro Zeile): <textarea name="social_media_links" placeholder="Ein Link pro Zeile">https://facebook.com/test
https://twitter.com/test
https://instagram.com/test</textarea></label>
            <label>Event-Bilder (URLs, ein Link pro Zeile): <textarea name="event_images" placeholder="Ein Bild-Link pro Zeile">https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mar%C3%ADa_Corina_Machado_perfil.jpg/500px-Mar%C3%ADa_Corina_Machado_perfil.jpg
https://upload.wikimedia.org/wikipedia/commons/f/f6/OTVbelweder-front.jpg</textarea></label>
            <label>Helfer benötigt (Minimum): <input type="number" name="helpers" value="3" placeholder="z.B. 3"></label>
            <label>Material/Sonderbedarf: <input type="text" name="special_requirements" value="Pavillon, Flyer, Banner" placeholder="z.B. Pavillon, Flyer"></label>
            
            <button type="submit" id="formSubmitBtn" disabled>Test Event einreichen (Token erforderlich)</button>
        </form>
        
        <div id="email-test-results"></div>
    </div>

    <!-- Events Import -->
    <div class="test-section">
        <h2>6. Events aus events.json importieren</h2>
        <p>Importiert Events aus JSON Datei in die Datenbank.</p>
        <form action="/backend/import_events.php" method="get">
            <button type="submit">events.json importieren</button>
        </form>
        <p class="workflow">Der Import wird in einem separaten Schritt ausgeführt. Nach Abschluss können Sie die Zusammenfassung einsehen und optional erneut ausführen.</p>
        
        <hr style="margin: 20px 0;">
        
        <h3>Datenbank in events.json exportieren</h3>
        <p>Exportiert alle aktiven Events aus der Datenbank in die events.json Datei.</p>
        <button onclick="exportEventsToJson()">Datenbank → events.json exportieren</button>
        <div id="export-results"></div>
    </div>

    <script>
    let currentToken = null;
        
        // Set default datetime to tomorrow
        document.querySelector('input[name="time"]').value = new Date(Date.now() + 24*60*60*1000).toISOString().slice(0,16);

        async function requestToken() {
            try {
                const response = await fetch('/api.php/token');
                const data = await response.json();
                
                if (response.ok) {
                    currentToken = data.token;
                    document.getElementById('token-display').innerHTML = `
                        <div class="token-display">
                            <strong>🔑 Neuer Token generiert:</strong><br>
                            ${data.token}<br>
                            <small>Gültig für: ${data.expires_in} Sekunden (1 Stunde)</small>
                        </div>
                    `;
                    
                    // Enable submission buttons
                    document.getElementById('submitBtn').disabled = false;
                    document.getElementById('formSubmitBtn').disabled = false;
                } else {
                    document.getElementById('token-display').innerHTML = `
                        <div class="status error">❌ Token-Anfrage fehlgeschlagen: ${JSON.stringify(data)}</div>
                    `;
                }
            } catch (error) {
                document.getElementById('token-display').innerHTML = `
                    <div class="status error">❌ Network Error: ${error.message}</div>
                `;
            }
        }

    async function testGetEvents() {
            const resultsDiv = document.getElementById('api-results');
            resultsDiv.innerHTML = '<p>Testing GET /api.php/events...</p>';
            
            try {
                const response = await fetch('/api.php/events');
                const data = await response.json();
                
                if (response.ok) {
                    resultsDiv.innerHTML = `
                        <div class="status success">
                            ✅ GET Request erfolgreich<br>
                            📊 Anzahl Events: ${data.length}
                        </div>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                } else {
                    resultsDiv.innerHTML = `
                        <div class="status error">
                            ❌ GET Request Fehler: ${response.status}<br>
                            ${JSON.stringify(data, null, 2)}
                        </div>
                    `;
                }
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="status error">❌ Network Error: ${error.message}</div>
                `;
            }
        }

        async function testSubmitEvent() {
            if (!currentToken) {
                alert('⚠️ Bitte zuerst einen Token anfordern!');
                return;
            }
            
            const resultsDiv = document.getElementById('api-results');
            resultsDiv.innerHTML = '<p>Testing POST /api.php/events...</p>';
            
            const testEvent = {
                "submission_token": currentToken,
                "event_data": {
                    "Title": "API Test Event",
                    "Location": "Leipzig, Deutschland", 
                    "Time": "2025-12-15T14:00",
                    "EventType": "API Test",
                    "Description": "Dies ist ein automatischer Test des API Endpunkts",
                    "WebsiteUrl": "https://example.com/test-event",
                    "Organizer": {
                        "Name": "API Tester",
                        "Contact": {
                            "Email": "<?php echo htmlspecialchars(MAIL_TEST_TO) ?>"
                        }
                    },
                    "EventStatus": {
                        "HelpersNeededMinimum": 3
                    }
                }
            };
            
            try {
                const response = await fetch('/api.php/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testEvent)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultsDiv.innerHTML = `
                        <div class="status success">
                            ✅ Event erfolgreich eingereicht!<br>
                            � Bestätigungsmail gesendet an: ${data.email}
                        </div>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                    
                    // Token is now used up
                    currentToken = null;
                    document.getElementById('submitBtn').disabled = true;
                    document.getElementById('formSubmitBtn').disabled = true;
                } else {
                    resultsDiv.innerHTML = `
                        <div class="status error">
                            ❌ Submission Fehler: ${response.status}<br>
                            ${JSON.stringify(data, null, 2)}
                        </div>
                    `;
                }
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="status error">❌ Network Error: ${error.message}</div>
                `;
            }
        }

        document.getElementById('testEventForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!currentToken) {
                alert('⚠️ Bitte zuerst einen Token anfordern!');
                return;
            }
            
            const formData = new FormData(e.target);
            const eventData = {
                "submission_token": currentToken,
                "event_data": {
                    "Title": formData.get('title'),
                    "Location": formData.get('location'),
                    "Time": formData.get('time'),
                    "EventType": formData.get('event_type'),
                    "Description": formData.get('description'),
                    "Organizer": {
                        "Name": formData.get('organizer_name'),
                        "Contact": {
                            "Email": formData.get('test_email')
                        }
                    }
                }
            };
            
            // Geolocation
            const lat = formData.get('latitude');
            const lng = formData.get('longitude');
            if (lat && lng) {
                eventData.event_data.Geolocation = {
                    "Latitude": parseFloat(lat),
                    "Longitude": parseFloat(lng)
                };
            }
            
            // Organizer Phone
            if (formData.get('organizer_phone')) {
                eventData.event_data.Organizer.Contact.Phone = formData.get('organizer_phone');
            }
            
            // Optional URL fields
            if (formData.get('website_url')) {
                eventData.event_data.WebsiteUrl = formData.get('website_url');
            }
            
            if (formData.get('wolke')) {
                eventData.event_data.Wolke = formData.get('wolke');
            }
            
            if (formData.get('chatbegruenung')) {
                eventData.event_data.Chatbegruenung = formData.get('chatbegruenung');
            }
            
            // Social Media Links (array)
            if (formData.get('social_media_links')) {
                eventData.event_data.SocialMediaLinks = formData.get('social_media_links').split('\n').filter(link => link.trim());
            }
            
            // Event Images (array)
            if (formData.get('event_images')) {
                eventData.event_data.EventImages = formData.get('event_images').split('\n').filter(link => link.trim());
            }
            
            // EventStatus
            const eventStatus = {};
            if (formData.get('helpers')) {
                eventStatus.HelpersNeededMinimum = parseInt(formData.get('helpers'));
            }
            if (formData.get('special_requirements')) {
                eventStatus.SpecialRequirements = formData.get('special_requirements');
            }
            if (Object.keys(eventStatus).length > 0) {
                eventData.event_data.EventStatus = eventStatus;
            }
            
            const resultsDiv = document.getElementById('email-test-results');
            resultsDiv.innerHTML = '<p>Sende Event...</p>';
            
            try {
                const response = await fetch('/api.php/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultsDiv.innerHTML = `
                        <div class="status success">
                            ✅ Event erfolgreich eingereicht!<br>
                            📧 Bestätigungsmail sollte gesendet werden an: ${data.email}<br>
                            💡 Prüfen Sie die Server-Logs für Mail-Delivery-Status
                        </div>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                    
                    // Token is now used up
                    currentToken = null;
                    document.getElementById('submitBtn').disabled = true;
                    document.getElementById('formSubmitBtn').disabled = true;
                    
                    e.target.reset();
                    document.querySelector('input[name="time"]').value = new Date(Date.now() + 24*60*60*1000).toISOString().slice(0,16);
                } else {
                    resultsDiv.innerHTML = `
                        <div class="status error">
                            ❌ Fehler: ${response.status}<br>
                            ${JSON.stringify(data, null, 2)}
                        </div>
                    `;
                }
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="status error">❌ Network Error: ${error.message}</div>
                `;
            }
        });

        async function exportEventsToJson() {
            const resultsDiv = document.getElementById('export-results');
            resultsDiv.innerHTML = '<p>Exportiere Events zur JSON...</p>';
            
            try {
                const response = await fetch('/api.php/export', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultsDiv.innerHTML = `
                        <div class="status success">
                            ✅ Export erfolgreich!<br>
                            📊 ${data.count} Events wurden in events.json exportiert<br>
                            📁 Datei: ${data.file}
                        </div>
                    `;
                } else {
                    resultsDiv.innerHTML = `
                        <div class="status error">
                            ❌ Export Fehler: ${response.status}<br>
                            ${JSON.stringify(data, null, 2)}
                        </div>
                    `;
                }
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="status error">❌ Network Error: ${error.message}</div>
                `;
            }
        }
    </script>
</body>
</html>