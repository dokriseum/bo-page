class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
        this.selectedEvent = null;
        this.currentFilter = 'all';
        this.currentTextFilter = '';
        this.showPastEvents = false;
        this.init();
    }

    async init() {
        this.bindGlobalFunctions();
        this.bindEvents();
        await this.loadEvents();
        this.initRouting();
        this.loadViewFromUrl();
    }

    bindGlobalFunctions() {
        window.showView = this.showView.bind(this);
        window.showEventDetails = this.showEventDetails.bind(this);
        window.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
        window.filterByCategory = this.filterByCategory.bind(this);
        window.filterEventsByText = this.filterEventsByText.bind(this);
        window.togglePastEvents = this.togglePastEvents.bind(this);
    }

    bindEvents() {
        // Tab switching mit Event Delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.tab, .toggle-btn')) {
                e.target.parentElement.querySelectorAll('.tab, .toggle-btn').forEach(el =>
                    el.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Resize handling
        window.addEventListener('resize', () => {
            const wasDesktop = this.isDesktop;
            this.isDesktop = window.innerWidth >= 1024;
            if (wasDesktop !== this.isDesktop && this.isDesktop) {
                document.getElementById('burger-overlay')?.classList.add('hidden');
            }
        });

        // URL-basierte Navigation (Hash/Query Parameter)
        window.addEventListener('hashchange', () => this.loadViewFromUrl());
        window.addEventListener('popstate', () => this.loadViewFromUrl());
    }

    async loadEvents() {
        try {
            const response = await fetch('/events.json');
            window._eventsJson =  await response.json() || [];
            this.renderEvents();
        } catch (error) {
            console.error('Error loading events:', error);
            // Fallback zu leerer Liste
             window._eventsJson = [];
        }
    }

    renderEvents() {
        this.renderEventGrid();
        this.renderEventList('events-list-container');
    }

    renderEventGrid() {
        const container = document.getElementById('events-grid');
        const template = document.getElementById('event-card-template');

        if (!container || !template) return;

        container.querySelectorAll('.event-card').forEach(card => card.remove());

        const maxEventsStartpage = 6;
        const now = new Date();
        
        // Filtere Events: nicht draft UND in der Zukunft
        const allEvents = window._eventsJson.filter(event => {
            if (event.draft) return false;
            const eventDate = new Date(event.Time);
            return eventDate >= now;
        });
        
        // Sortiere nach Datum (nächste zuerst) und nimm die ersten 6
        const events = allEvents
            .sort((a, b) => new Date(a.Time) - new Date(b.Time))
            .slice(0, maxEventsStartpage);

        events.forEach(event => {
            const card = this.createEventCard(event, template);
            container.appendChild(card);
        });
    }

    renderEventList(containerId) {
        const container = document.getElementById(containerId);
        const template = document.getElementById('event-list-template');

        if (!container || !template) return;

        // Alte Events entfernen
        container.querySelectorAll('.event-list-item').forEach(item => item.remove());

        // Events List View: Gefilterte Events zeigen
        const events = this.getFilteredEvents();

        events.forEach(event => {
            const listItem = this.createEventListItem(event, template);
            container.appendChild(listItem);
        });
    }

    createEventCard(event, template) {
        const card = template.content.cloneNode(true).querySelector('.event-card');
        const imageContainer = card.querySelector('.event-image');
        const bgImage = card.querySelector('.event-bg-image');

        // Bild setzen falls vorhanden
        if (event.Image) {
            bgImage.src = event.Image;
            bgImage.alt = event.Title;
            bgImage.onload = () => {
                bgImage.style.display = 'block';
                imageContainer.style.background = 'none';
            };
            bgImage.onerror = () => {
                imageContainer.style.background = event.FallbackGradient || 'var(--default-gradient)';
            };
        }

        card.setAttribute('data-category', event.category);
        card.setAttribute('data-event-id', event.Id);

        const date = new Date(event.Time);
        card.querySelector('.day').textContent = date.getDate().toString().padStart(2, '0');
        card.querySelector('.month').textContent = date.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase();

        card.querySelector('.event-title').textContent = event.Title;
        card.querySelector('.event-location span').textContent = event.Location;

        return card;
    }

    createEventListItem(event, template) {
        const listItem = template.content.cloneNode(true).querySelector('.event-list-item');

        listItem.setAttribute('data-event-id', event.Id);
        
        const imageContainer = listItem.querySelector('.event-list-image');
        const bgImage = listItem.querySelector('.event-list-bg-image');
        
        imageContainer.setAttribute('data-category', event.category);

        // Bild setzen falls vorhanden (gleiche Logik wie bei Event Cards)
        if (event.Image) {
            bgImage.src = event.Image;
            bgImage.alt = event.Title;
            bgImage.onload = () => {
                bgImage.style.display = 'block';
                imageContainer.style.background = 'none';
            };
            bgImage.onerror = () => {
                imageContainer.style.background = event.FallbackGradient || 'var(--default-gradient)';
            };
        } else {
            // Fallback wenn kein Bild vorhanden
            imageContainer.style.background = event.FallbackGradient || 'var(--default-gradient)';
        }

        const date = new Date(event.Time);
        listItem.querySelector('.event-list-date').textContent =
            date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        listItem.querySelector('h4').textContent = event.Title;

        return listItem;
    }

    getFilteredEvents() {
        let filtered = window._eventsJson.filter(event => !event.draft);
        
        // Filter by past events
        if (!this.showPastEvents) {
            const now = new Date();
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.Time);
                return eventDate >= now;
            });
        }
                
        // Filter by text search
        if (this.currentTextFilter && this.currentTextFilter.trim() !== '') {
            const searchTerm = this.currentTextFilter.toLowerCase().trim();
            filtered = filtered.filter(event => 
                event.Title.toLowerCase().includes(searchTerm) ||
                event.Location.toLowerCase().includes(searchTerm) ||
                (event.Description && event.Description.toLowerCase().includes(searchTerm)) ||
                (event.Organizer && event.Organizer.Name && event.Organizer.Name.toLowerCase().includes(searchTerm))
            );
        }
        
        return filtered.sort((a, b) => new Date(a.Time) - new Date(b.Time));
    }

    showView(viewName, updateUrl = true) {
        this.cleanFilters(viewName);
        document.querySelectorAll('[id$="-view"], #event-details').forEach(view =>
            view.classList.add('hidden'));

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.updateNavigation(viewName);
            this.currentView = viewName;

            if (viewName === 'events') {
                // Reset search when switching to events view
                this.resetSearchInput('events-search-input');
                this.renderEventList('events-list-container');
            } else if (viewName === 'calendar') {
                // Reset search when switching to calendar view
                this.resetSearchInput('calendar-search-input');
            }
            
            // Special handling for network view social media effects
            if (viewName === 'network') {
                this.enhanceNetworkView();
            }

            // URL aktualisieren
            if (updateUrl) {
                this.updateUrlForView(viewName);
            }
        }
    }

    cleanFilters(viewName) {
        if (viewName !== 'calendar') {
            this.currentFilter = 'all';
        }
        this.showPastEvents = false;
        this.resetPastEventsCheckboxes();
    }

    enhanceNetworkView() {
        // Add click analytics for social media links
        const networkView = document.getElementById('network-view');
        if (!networkView) return;

        const socialLinks = networkView.querySelectorAll('a[href*="mastodon"], a[href*="matrix"], a[href*="discord"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add a nice click effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255,255,255,0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                link.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add hover tooltips for social media platforms
        const tooltips = {
            'mastodon': '🐘 Folge uns auf Mastodon',
            'matrix': '💬 Chatte mit uns auf Matrix',
            'discord': '🎮 Join unseren Discord Server',
            'mailto': '📧 Schreib uns eine E-Mail',
            'ostdeutschland.info': '🌐 Besuche Ostdeutschland.info',
            'kreuzer': '📰 Lies den Kreuzer Leipzig',
            'mdr.de': '📺 Schau MDR Sachsen'
        };

        Object.entries(tooltips).forEach(([platform, text]) => {
            const links = networkView.querySelectorAll(`a[href*="${platform}"]`);
            links.forEach(link => {
                link.setAttribute('title', text);
                link.style.position = 'relative';
            });
        });

        // Add live counter animation for hashtag section
        const hashtagSection = Array.from(networkView.querySelectorAll('h2, h3'))
            .find(h => h.textContent.includes('#'));
        
        if (hashtagSection && !hashtagSection.querySelector('.live-badge')) {
            const counter = document.createElement('span');
            counter.className = 'live-badge';
            counter.style.cssText = `
                background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
                color: white;
                padding: 0.2rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
                margin-left: 0.5rem;
                animation: pulse 2s infinite;
            `;
            counter.textContent = 'LIVE';
            hashtagSection.appendChild(counter);
        }
    }

    showEventDetails(element) {
        const eventId = element.getAttribute('data-event-id');
        const event =  window._eventsJson.find(e => e.Id === eventId);
        if (!event) 
            return;

        this.selectedEvent = event;
        this.renderEventDetails(event, 'main'); // Standard: zurück zur Hauptseite
        this.hideAllViews();
        this.updateUrlForEventDetails(eventId);
    }

    showEventDetailsFromMap(eventId) {
        const event = window._eventsJson.find(e => e.Id === eventId);

        if (!event) 
            return;

        this.selectedEvent = event;
        this.renderEventDetails(event, 'calendar'); // Von Karte: zurück zur Karte
        this.hideAllViews();

        // URL für Event-Details aktualisieren
        this.updateUrlForEventDetails(eventId);
    }

    hideAllViews() {
        document.querySelectorAll('[id$="-view"]').forEach(view =>
            view.classList.add('hidden'));
        document.getElementById('event-details')?.classList.remove('hidden');
    }

    renderEventDetails(event, returnView = 'main') {
        const detailsView = document.getElementById('event-details');
        if (!detailsView) return;

        detailsView.querySelector('.event-header-image').setAttribute('data-category', event.category);

        detailsView.querySelector('.event-meta-title').textContent = event.Title;

        const date = new Date(event.Time);
        detailsView.querySelector('.event-date').textContent =
            date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        detailsView.querySelector('.event-time').textContent =
            `${date.toLocaleDateString('de-DE', { weekday: 'long' })}, ${event.Time} Uhr`;

        detailsView.querySelector('.event-location-name').textContent = event.Location;
        detailsView.querySelector('.event-address').textContent = event.Geolocation.Latitude;

        detailsView.querySelector('.event-organizer').textContent = event.Organizer.Name;

        detailsView.querySelector('.event-description').textContent = event.Description || 'Keine Beschreibung verfügbar.';
        
        // Zurück-Button dynamisch anpassen
        const backBtn = detailsView.querySelector('.back-btn');
        if (backBtn) {
            backBtn.setAttribute('onclick', `showView('${returnView}')`);
        }
    }

    toggleBurgerMenu() {
        if (!this.isDesktop) {
            document.getElementById('burger-overlay')?.classList.toggle('hidden');
        }
    }

    updateNavigation(viewName) {
        const navMapping = { 'main': 0, 'events': 1, 'calendar': 2, 'stories': 3, 'network': 4 };
        const index = navMapping[viewName];

        if (index !== undefined) {
            document.querySelectorAll('.burger-item, .sidebar-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
    }

    filterByCategory(category) {
        const categories = ['all', 'be', 'bb', 'mv', 'sn', 'st', 'th'];
        const mapBorderFiles = {
            all: 'all',
            be: 'berlin',
            bb: 'brandenburg',
            mv: 'mecklenburg-vorpommern',
            sn: 'sachsen',
            st: 'sachsen-anhalt',
            th: 'thueringen'
        };

        this.currentFilter = category;
        
        if (this.currentView === 'calendar') {
            this.updateMapMarkers();
        } else {
            this.renderEvents();
        }

        const tabs = document.querySelectorAll('.tabs .map-state-selection');
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', categories[index] === category);
        });

        // Grenzen nur zeichnen, wenn Karte initialisiert ist und Funktion existiert
        if (window._eventMap && typeof window._ShowStateBorders === 'function') {
            const file = mapBorderFiles[category] || 'all';
            window._ShowStateBorders(file);
        }
    }

    filterEventsByText(searchTerm) {
        this.currentTextFilter = searchTerm;
        
        // Re-render events in current view
        if (this.currentView === 'events') {
            this.renderEventList('events-list-container');
        } else if (this.currentView === 'calendar') {
            this.updateMapMarkers();
        }
    }

    resetSearchInput(inputId) {
        const searchInput = document.getElementById(inputId);
        if (searchInput) {
            searchInput.value = '';
            this.currentTextFilter = '';
        }
    }

    // URL-Routing Funktionen
    initRouting() {
        // Hash-basiertes Routing
    }

    loadViewFromUrl() {
        const { view, eventId } = this.parseUrlForRouting();
        
        if (eventId) {
            // Event-Details laden
            const eventElement = document.querySelector(`[data-event-id="${eventId}"]`);
            if (eventElement) {
                this.showEventDetails(eventElement);
            } else {
                // Fallback: Event direkt laden
                this.loadEventDetailsById(eventId);
            }
        } else if (view) {
            // Normale View laden
            this.showView(view, false); // updateUrl = false um Rekursion zu vermeiden
        } else {
            // Standard-View
            this.showView('main', false);
        }
    }

    parseUrlForRouting() {
        const hash = window.location.hash.substring(1); // # entfernen
        
        let view = null;
        let eventId = null;

        if (hash) {
            if (hash.includes('-')) {
                // Event-Details: z.B. #detail-2025001
                const parts = hash.split('-');
                if (parts[0] === 'detail' && parts[1]) {
                    eventId = parts[1];
                }
            } else {
                // Normale View: z.B. #events
                view = hash;
            }
        }

        return { view, eventId };
    }

    updateUrlForView(viewName) {
        // Hash-basiert: #events
        window.location.hash = viewName === 'main' ? '' : viewName;
    }

    updateUrlForEventDetails(eventId) {
        // Hash-basiert: #detail-2025001
        window.location.hash = `detail-${eventId}`;
    }

    loadEventDetailsById(eventId) {
        const event = window._eventsJson.find(e => e.Id === eventId);
        if (event) {
            this.selectedEvent = event;
            this.renderEventDetails(event);
            
            // Alle Views verstecken und Details zeigen
            document.querySelectorAll('[id$="-view"]').forEach(view =>
                view.classList.add('hidden'));
            document.getElementById('event-details')?.classList.remove('hidden');
        } else {
            // Event nicht gefunden, zurück zur Hauptseite
            this.showView('main');
        }
    }
    togglePastEvents(showPast) {
        this.showPastEvents = showPast;
        
        // Synchronisiere beide Checkboxen
        const eventsCheckbox = document.getElementById('events-show-past');
        const calendarCheckbox = document.getElementById('calendar-show-past');
        
        if (eventsCheckbox) eventsCheckbox.checked = showPast;
        if (calendarCheckbox) calendarCheckbox.checked = showPast;
        
        // Re-render events in current view
        if (this.currentView === 'events') {
            this.renderEventList('events-list-container');
        } else if (this.currentView === 'calendar') {
            this.updateMapMarkers();
        }
    }

    resetPastEventsCheckboxes() {
        const eventsCheckbox = document.getElementById('events-show-past');
        const calendarCheckbox = document.getElementById('calendar-show-past');
        
        if (eventsCheckbox) eventsCheckbox.checked = false;
        if (calendarCheckbox) calendarCheckbox.checked = false;
    }

    updateMapMarkers() {
        // Verwende die globale Funktion aus event-map.js
        if (typeof window.updateEventMarkers === 'function') {
            const filteredEvents = this.getFilteredEvents();
            window.updateEventMarkers(filteredEvents);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.eventApp = new EventApp();
});