class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
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
        const allEvents = window._eventsJson.filter(event => !event.draft);
        const events = allEvents.sort((a, b) => new Date(a.Time) - new Date(b.Time)).slice(0, maxEventsStartpage);

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

        // Events List View: Alle Events zeigen
        const allEvents = window._eventsJson.filter(event => !event.draft);
        const events = allEvents.sort((a, b) => new Date(a.Time) - new Date(b.Time));

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
        card.setAttribute('data-event-id', event.id);

        const date = new Date(event.Time);
        card.querySelector('.day').textContent = date.getDate().toString().padStart(2, '0');
        card.querySelector('.month').textContent = date.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase();

        card.querySelector('.event-title').textContent = event.Title;
        card.querySelector('.event-location span').textContent = event.Location;

        return card;
    }

    createEventListItem(event, template) {
        const listItem = template.content.cloneNode(true).querySelector('.event-list-item');

        listItem.setAttribute('data-event-id', event.id);
        listItem.querySelector('.event-list-image').setAttribute('data-category', event.category);

        const date = new Date(event.Time);
        listItem.querySelector('.event-list-date').textContent =
            date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        listItem.querySelector('h4').textContent = event.Title;

        return listItem;
    }

    getFilteredEvents() {
        let filtered = window._eventsJson.filter(event => !event.draft);
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(event => event.category === this.currentFilter);
        }
        return filtered.sort((a, b) => new Date(a.Time) - new Date(b.Time));
    }

    showView(viewName) {
        document.querySelectorAll('[id$="-view"], #event-details').forEach(view =>
            view.classList.add('hidden'));

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.updateNavigation(viewName);
            this.currentView = viewName;

            if (viewName === 'events') {
                this.renderEventList('events-list-container');
            }
            
            // Special handling for network view social media effects
            if (viewName === 'network') {
                this.enhanceNetworkView();
            }
        }
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
        const event =  window._eventsJson.find(e => e.id === eventId);

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
        this.renderEvents();

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
}

document.addEventListener('DOMContentLoaded', () => new EventApp());