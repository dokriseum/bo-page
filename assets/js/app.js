class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
        this.eventsData = [];
        this.selectedEvent = null;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        this.bindGlobalFunctions();
        this.bindEvents();
        await this.loadEvents();
        this.showView('main');
    }

    bindGlobalFunctions() {
        window.showView = this.showView.bind(this);
        window.showEventDetails = this.showEventDetails.bind(this);
        window.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
        window.filterEvents = this.filterEvents.bind(this);
        window.filterByCategory = this.filterByCategory.bind(this);
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
    }

    async loadEvents() {
        try {
            const response = await fetch('/events.json');
            const data = await response.json();
            this.eventsData = data.events || [];
            this.renderEvents();
        } catch (error) {
            console.error('Error loading events:', error);
            // Fallback zu leerer Liste
            this.eventsData = [];
        }
    }

    renderEvents() {
        this.renderEventGrid();
        this.renderEventList('event-list-grid');
        this.renderEventList('events-list-container');
    }

    renderEventGrid() {
        const container = document.getElementById('events-grid');
        const template = document.getElementById('event-card-template');

        if (!container || !template) return;

        // Alte Events entfernen (außer Template)
        container.querySelectorAll('.event-card').forEach(card => card.remove());

        // Gefilterte Events (max 6 für Hauptseite)
        const events = this.getFilteredEvents().slice(0, 6);

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

        // Alle gefilterten Events
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
        if (event.image) {
            bgImage.src = event.image;
            bgImage.alt = event.title;
            bgImage.onload = () => {
                bgImage.style.display = 'block';
                imageContainer.style.background = 'none';
            };
            bgImage.onerror = () => {
                // Fallback zu Gradient
                imageContainer.style.background = event.fallbackGradient || 'var(--default-gradient)';
            };
        }

        // Daten setzen
        card.setAttribute('data-category', event.category);
        card.setAttribute('data-event-id', event.id);

        // Datum formatieren
        const date = new Date(event.date);
        card.querySelector('.day').textContent = date.getDate().toString().padStart(2, '0');
        card.querySelector('.month').textContent = date.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase();

        // Titel und Ort
        card.querySelector('.event-title').textContent = event.title;
        card.querySelector('.event-location span').textContent = event.location;

        return card;
    }

    createEventListItem(event, template) {
        const listItem = template.content.cloneNode(true).querySelector('.event-list-item');

        // Daten setzen
        listItem.setAttribute('data-event-id', event.id);
        listItem.querySelector('.event-list-image').setAttribute('data-category', event.category);

        // Datum formatieren
        const date = new Date(event.date);
        listItem.querySelector('.event-list-date').textContent =
            date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        // Titel
        listItem.querySelector('h4').textContent = event.title;

        return listItem;
    }

    getFilteredEvents() {
        let filtered = this.eventsData.filter(event => !event.draft);

        // Nach Kategorie filtern
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(event => event.category === this.currentFilter);
        }

        // Nach Datum sortieren
        return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('[id$="-view"], #event-details').forEach(view =>
            view.classList.add('hidden'));

        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.updateNavigation(viewName);
            this.currentView = viewName;

            // View-spezifische Aktionen
            if (viewName === 'search') {
                this.renderEventList('event-list-grid');
            } else if (viewName === 'events') {
                this.renderEventList('events-list-container');
            }
        }
    }

    showEventDetails(element) {
        const eventId = element.getAttribute('data-event-id');
        const event = this.eventsData.find(e => e.id === eventId);

        if (!event) return;

        this.selectedEvent = event;
        this.renderEventDetails(event);

        // Alle Views verstecken und Details zeigen
        document.querySelectorAll('[id$="-view"]').forEach(view =>
            view.classList.add('hidden'));
        document.getElementById('event-details')?.classList.remove('hidden');
    }

    renderEventDetails(event) {
        const detailsView = document.getElementById('event-details');
        if (!detailsView) return;

        // Header Image Kategorie
        detailsView.querySelector('.event-header-image').setAttribute('data-category', event.category);

        // Titel
        detailsView.querySelector('.event-meta-title').textContent = event.title;

        // Datum
        const date = new Date(event.date);
        detailsView.querySelector('.event-date').textContent =
            date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        detailsView.querySelector('.event-time').textContent =
            `${date.toLocaleDateString('de-DE', { weekday: 'long' })}, ${event.startTime} bis ${event.endTime} Uhr`;

        // Location
        detailsView.querySelector('.event-location-name').textContent = event.location;
        detailsView.querySelector('.event-address').textContent = event.address;

        // Organizer
        detailsView.querySelector('.event-organizer').textContent = event.organizer;

        // Description
        detailsView.querySelector('.event-description').textContent = event.description || 'Keine Beschreibung verfügbar.';
    }

    toggleBurgerMenu() {
        if (!this.isDesktop) {
            document.getElementById('burger-overlay')?.classList.toggle('hidden');
        }
    }

    updateNavigation(viewName) {
        const navMapping = { 'main': 0, 'events': 1, 'calendar': 2 };
        const index = navMapping[viewName];

        if (index !== undefined) {
            // Update burger menu and sidebar
            document.querySelectorAll('.burger-item, .sidebar-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
    }

    filterEvents(searchTerm) {
        const container = document.getElementById('event-list-grid');
        if (!container) return;

        const items = container.querySelectorAll('.event-list-item');
        const term = searchTerm.toLowerCase();

        items.forEach(item => {
            const eventId = item.getAttribute('data-event-id');
            const event = this.eventsData.find(e => e.id === eventId);

            if (event) {
                const matches = event.title.toLowerCase().includes(term) ||
                    event.location.toLowerCase().includes(term) ||
                    event.organizer.toLowerCase().includes(term);

                item.style.display = matches ? 'flex' : 'none';
            }
        });
    }

    filterByCategory(category) {
        this.currentFilter = category;
        this.renderEvents();

        // Tab aktiv setzen
        const tabs = document.querySelectorAll('.tabs .tab');
        tabs.forEach((tab, index) => {
            const categories = ['all', 'be', 'bb', 'mv', 'sn', 'st', 'th'];
            tab.classList.toggle('active', categories[index] === category);
        });
    }
}

// App initialisieren
document.addEventListener('DOMContentLoaded', () => new EventApp());