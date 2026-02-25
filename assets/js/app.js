class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
        this.selectedEvent = null;
        this.currentFilter = 'all';
        this.currentTextFilter = '';
        this.showPastEvents = false;
        this.eventsTabMode = 'events';
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
        window.openLocation = this.openLocation.bind(this);
        window.showSharePopover = this.showSharePopover.bind(this);
        window.showICSPopover = this.showICSPopover.bind(this);
        window.showQRPopover = this.showQRPopover.bind(this);
        window.downloadICS = this.downloadICS.bind(this);
        window.downloadQRCode = this.downloadQRCode.bind(this);
        window.copyShareUrl = this.copyShareUrl.bind(this);
        window.switchEventsTab = this.switchEventsTab.bind(this);
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

        const maxEventsStartpage = 4;
        const now = new Date();
        
        const allEvents = window._eventsJson.filter(event => {
            if (event.draft) return false;
            const eventDate = new Date(event.Time);
            return eventDate >= now;
        });
        
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

        container.querySelectorAll('.event-list-item').forEach(item => item.remove());

        const events = this.getFilteredEvents();

        events.forEach(event => {
            const listItem = this.createEventListItem(event, template);
            container.appendChild(listItem);
        });
    }
    
    switchEventsTab(mode) {
        this.eventsTabMode = mode;
        
        const tabs = document.querySelectorAll('#events-view .tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        const pendingHint = document.getElementById('pending-hint');
        
        if (mode === 'events') {
            document.querySelector('#events-view .tab-events').classList.add('active');
            if (pendingHint) pendingHint.style.display = 'none';
        } else {
            document.querySelector('#events-view .tab-cta').classList.add('active');
            if (pendingHint) pendingHint.style.display = 'block';
        }
        
        this.renderEventList('events-list-container');
    }

    createEventCard(event, template) {
        const card = template.content.cloneNode(true).querySelector('.event-card');
        const imageContainer = card.querySelector('.event-image');
        const bgImage = card.querySelector('.event-bg-image');

        const imageToShow = this.getMainImageFromEvent(event);
        if (imageToShow) {
            bgImage.src = imageToShow;
            bgImage.alt = event.Title;
            bgImage.style.display = 'block';
        }

        bgImage.onerror = () => {
            imageContainer.style.background = event.FallbackGradient || 'var(--default-gradient)';
        };

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

        const imageToShow = this.getMainImageFromEvent(event);
        if (imageToShow) {
            bgImage.src = imageToShow;
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
        
        listItem.querySelector('.event-list-location .location-name').textContent = event.Location;

        if (event.Status === 'pending') {
            const helpersInfo = listItem.querySelector('.event-helpers-info');
            const requirementsInfo = listItem.querySelector('.event-requirements-info');

            if (event.HelpersNeededMinimum && event.HelpersNeededMinimum > 0) {
                const helpersText = `${event.HelpersNeededMinimum} Helfer*innen benötigt`;
                listItem.querySelector('.helpers-needed').textContent = helpersText;
                helpersInfo.style.display = 'block';
            }

            if (event.SpecialRequirements && event.SpecialRequirements.trim() !== '') {
                listItem.querySelector('.special-requirements').textContent = event.SpecialRequirements;
                requirementsInfo.style.display = 'block';
            }
        }

        return listItem;
    }

    getFilteredEvents() {       
        let filtered = window._eventsJson.filter(event => !event.draft);
        
        if (this.eventsTabMode === 'pending') {
            filtered = filtered.filter(event => event.Status === 'pending');
        } else {
            filtered = filtered.filter(event => event.Status === 'active');
        }
         
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

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 0);

            if (viewName === 'events') {
                this.resetSearchInput('events-search-input');
                this.eventsTabMode = 'events';
                const tabs = document.querySelectorAll('#events-view .tab');
                tabs.forEach(tab => tab.classList.remove('active'));
                document.querySelector('#events-view .tab-events')?.classList.add('active');
                
                const pendingHint = document.getElementById('pending-hint');
                if (pendingHint) pendingHint.style.display = 'none';
                
                this.renderEventList('events-list-container');
            } else if (viewName === 'calendar') {
                this.resetSearchInput('calendar-search-input');
            }
            
            if (viewName === 'network') {
                this.enhanceNetworkView();
            }

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
    }

    showEventDetails(element) {
        const eventId = element.getAttribute('data-event-id');
        const event =  window._eventsJson.find(e => e.Id === eventId);
        if (!event) 
            return;

        this.selectedEvent = event;
        this.renderEventDetails(event, 'main'); 
        this.hideAllViews();
        this.updateUrlForEventDetails(eventId);
    }

    showEventDetailsFromMap(eventId) {
        const event = window._eventsJson.find(e => e.Id === eventId);

        if (!event) 
            return;

        this.selectedEvent = event;
        this.renderEventDetails(event, 'calendar'); 
        this.hideAllViews();

        this.updateUrlForEventDetails(eventId);
    }

    hideAllViews() {
        document.querySelectorAll('[id$="-view"]').forEach(view =>
            view.classList.add('hidden'));
        document.getElementById('event-details')?.classList.remove('hidden');
    }

    getMainImageFromEvent(event) {
        let imageToShow = null;      
        if (event.event_images && Array.isArray(event.event_images) && event.event_images.length > 0) {
            imageToShow = event.event_images[0];
        } 
        else if (event.Image && event.Image !== '') {
            imageToShow = event.Image;
        }
        return imageToShow;
    }

    renderEventDetails(event, returnView = 'main') {
        const detailsView = document.getElementById('event-details');
        if (!detailsView) return;

        const headerImage = detailsView.querySelector('.event-header-image');
        headerImage.setAttribute('data-category', event.category);

        const bgImage = headerImage.querySelector('.event-header-bg-image');
        bgImage.style.display = 'none';
        
        let centerImage = headerImage.querySelector('.event-header-center-image');
        if (!centerImage) {
            centerImage = document.createElement('img');
            centerImage.className = 'event-header-center-image';
            centerImage.setAttribute('referrerpolicy', 'no-referrer');
            headerImage.appendChild(centerImage);
        }
        centerImage.style.display = 'none';
        
        const imageToShow = this.getMainImageFromEvent(event);
        if (imageToShow) {
            bgImage.src = imageToShow;
            bgImage.alt = event.Title;
            bgImage.style.display = 'block';
            
            centerImage.src = imageToShow;
            centerImage.alt = event.Title;
            centerImage.style.display = 'block';
        }
        bgImage.onerror = () => {
            bgImage.style.display = 'none';
            centerImage.style.display = 'none';
        };
        centerImage.onerror = () => {
            centerImage.style.display = 'none';
        };

        detailsView.querySelector('.event-meta-title').textContent = event.Title;

        const date = new Date(event.Time);
        detailsView.querySelector('.event-date').textContent =
            date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        detailsView.querySelector('.event-time').textContent =
            `${date.toLocaleDateString('de-DE', { weekday: 'long' })}, ${event.Time} Uhr`;

        detailsView.querySelector('.event-location-name').textContent = event.Location;
        detailsView.querySelector('.event-organizer').textContent = event.Organizer.Name;
        detailsView.querySelector('.event-description').innerHTML = event.Description || 'Keine Beschreibung verfügbar.';
        
        const eventTypeContainer = detailsView.querySelector('.event-type-container');
        const eventTypeElement = detailsView.querySelector('.event-type');
        if (event.EventType && event.EventType.trim() !== '') {
            eventTypeElement.textContent = event.EventType;
            eventTypeContainer.style.display = 'flex';
        } else {
            eventTypeContainer.style.display = 'none';
        }
        
        const websiteUrlContainer = detailsView.querySelector('.website-url-container');
        if (event.WebsiteUrl && event.WebsiteUrl.trim() !== '') {
            
            const websiteUrlElement = detailsView.querySelector('.event-website-url');
            let displayUrl = event.WebsiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
            if (displayUrl.length > 35) {
                displayUrl = displayUrl.substring(0, 32) + '...';
            }
            websiteUrlElement.textContent = displayUrl;
            websiteUrlElement.href = event.WebsiteUrl;
            websiteUrlContainer.style.display = 'flex';
        } else {
            websiteUrlContainer.style.display = 'none';
        }
        
        const socialLinksContainer = detailsView.querySelector('.social-links-container');
        const socialLinksElement = detailsView.querySelector('.event-social-links');
        
        let socialLinks = [];
        if (event.SocialMediaLinks) {
            if (Array.isArray(event.SocialMediaLinks)) {
                socialLinks = event.SocialMediaLinks.filter(link => link && link.trim() !== '');
            } else if (typeof event.SocialMediaLinks === 'string' && event.SocialMediaLinks.trim() !== '') {
                socialLinks = event.SocialMediaLinks.split(/[\n\s]+/).filter(link => link.trim() !== '');
            }
        }
        
        if (socialLinks.length > 0) {
            socialLinksElement.innerHTML = socialLinks.map(link => {
                let icon = '🔗';
                let platform = 'Link';
                
                try {
                    const url = new URL(link);
                    const domain = url.hostname.replace('www.', '');
                    platform = domain;
                    
                    if (link.includes('facebook.com')) {
                        icon = '📘';
                        platform = 'Facebook';
                    } else if (link.includes('instagram.com')) {
                        icon = '📷';
                        platform = 'Instagram';
                    } else if (link.includes('twitter.com') || link.includes('x.com')) {
                        icon = '🐦';
                        platform = 'Twitter/X';
                    } else if (link.includes('mastodon')) {
                        icon = '🐘';
                        platform = 'Mastodon';
                    } else if (link.includes('youtube.com')) {
                        icon = '📹';
                        platform = 'YouTube';
                    } else if (link.includes('linkedin.com')) {
                        icon = '💼';
                        platform = 'LinkedIn';
                    }
                } catch (e) {
                    platform = link.substring(0, 30) + (link.length > 30 ? '...' : '');
                }
                
                return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="social-link-badge">
                    <span class="social-icon">${icon}</span>
                    <span>${platform}</span>
                </a>`;
            }).join('');
            socialLinksContainer.style.display = 'flex';
        } else {
            socialLinksContainer.style.display = 'none';
        }
        
        const helpersNeededContainer = detailsView.querySelector('.helpers-needed-container');
        if (event.Status === 'pending' && event.HelpersNeededMinimum && event.HelpersNeededMinimum > 0) {
            const helpersText = `Mindestens ${event.HelpersNeededMinimum} Helfer*innen werden für diese Veranstaltung benötigt.`;
            detailsView.querySelector('.event-helpers-needed').textContent = helpersText;
            helpersNeededContainer.style.display = 'flex';
        } else {
            helpersNeededContainer.style.display = 'none';
        }

        const requirementsContainer = detailsView.querySelector('.requirements-container');
        if (event.Status === 'pending' && event.SpecialRequirements && event.SpecialRequirements.trim() !== '') {
            detailsView.querySelector('.event-special-requirements').textContent = event.SpecialRequirements;
            requirementsContainer.style.display = 'flex';
        } else {
            requirementsContainer.style.display = 'none';
        }

        const helpCtaContainer = detailsView.querySelector('.help-cta-container');
        if (event.Status === 'pending') {
            const eventTitle = encodeURIComponent(event.Title);
            const eventId = encodeURIComponent(event.Id);
            const mailtoLink = `mailto:info@buendnisost.de?subject=Helfen%20bei%3A%20${eventTitle}&body=Hallo%2C%0A%0Aich%20m%C3%B6chte%20gerne%20bei%20folgendem%20Event%20helfen%3A%0A%0AEvent%3A%20${eventTitle}%0AEvent-ID%3A%20${eventId}%0A%0AViele%20Gr%C3%BC%C3%9Fe`;
            const ctaButton = helpCtaContainer.querySelector('.cta-btn');
            ctaButton.setAttribute('onclick', `window.location.href='${mailtoLink}'`);
            helpCtaContainer.style.display = 'block';
        } else {
            helpCtaContainer.style.display = 'none';
        }
        
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

    openLocation() {
        if (!this.selectedEvent) 
            return;

        const event = this.selectedEvent;
        if (!event.Geolocation || !event.Geolocation.Latitude || !event.Geolocation.Longitude)
        {
            const encodedLocation = encodeURIComponent(event.Location);
            const searchUrl = `https://www.openstreetmap.org/search?query=${encodedLocation}`;
            window.open(searchUrl, '_blank');
            return;
        }

        const lat = event.Geolocation.Latitude;
        const lon = event.Geolocation.Longitude;
        const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`;
        const isAppleDevice = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
        
        if (isAppleDevice) {
            const appleMapsUrl = `maps://maps.apple.com/?q=${lat},${lon}`;
            window.location.href = appleMapsUrl;
        } else {
            const isAndroid = /Android/.test(navigator.userAgent);
            if (isAndroid) {
                const geoUri = `geo:${lat},${lon}?q=${lat},${lon}(${encodeURIComponent(event.Title)})`;
                window.location.href = geoUri;
            } else {
                window.open(osmUrl, '_blank');
            }
        }
    }

    showICSPopover() {
        const popover = document.getElementById('ics-popover');
        if (popover) {
            popover.showPopover();
        }
    }

    downloadICS() {
        if (!this.selectedEvent) return;

        const event = this.selectedEvent;
        const eventDate = new Date(event.Time);
        
        const formatICSDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        const isAppleDevice = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
        const appleLocation = event.Location.replace(',', '\\n').replace(/,/g, '\\,');
        const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Bündnis Ost//Event Calendar//DE',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTART:${formatICSDate(eventDate)}`,
            `DTEND:${formatICSDate(endDate)}`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            `UID:${event.Id}@buendnis-ost.de`,
            `SUMMARY:${event.Title}`,
            `DESCRIPTION:${(event.Description || '').replace(/\n/g, '\\n').replace(/,/g, '\\,')}`,
            `LOCATION:${event.Location.replace(/,/g, '\\,')}`,
            `GEO:${event.Geolocation.Latitude};${event.Geolocation.Longitude}`,
            `DTEND:${formatICSDate(endDate)}`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            `UID:${event.Id}@buendnis-ost.de`,
            `SUMMARY:${event.Title}`,
            `DESCRIPTION:${(event.Description || '').replace(/\n/g, '\\n')}`,
            `LOCATION:${isAppleDevice ? appleLocation : event.Location}`,
            `GEO:${event.Geolocation.Latitude};${event.Geolocation.Longitude}`,
            `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="${appleLocation}";X-APPLE-RADIUS=100;X-TITLE=${appleLocation}:geo:${event.Geolocation.Latitude},${event.Geolocation.Longitude}`,
            `ORGANIZER;CN=${event.Organizer.Name}:MAILTO:${event.Organizer.Email || 'info@buendnis-ost.de'}`,
            `URL:${window.location.origin}/?event=${event.Id}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${event.Title.replace(/[^a-z0-9\-äöü]/gi, '_')}.ics`;
        link.download = link.download.replaceAll('___', '_');
        link.download = link.download.replaceAll('__', '_');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const popover = document.getElementById('ics-popover');
        if (popover) {
            popover.hidePopover();
        }
    }

    showQRPopover() {
        const popover = document.getElementById('qr-popover');
        if (popover) {
            this.loadQRCodeLibrary().then(() => {
                this.generateQRCode();
                popover.showPopover();
            });
        }
    }

    loadQRCodeLibrary() {
        if (window.QRCode) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }


    generateQRCode() {
        if (!this.selectedEvent) return;

        const eventUrl = `${window.location.origin}/#detail-${this.selectedEvent.Id}`;
        const container = document.getElementById('qr-code-container');
        
        container.innerHTML = '';

        if (!window.QRCode) {
            container.innerHTML = '<p>QR-Code-Bibliothek wird geladen...</p>';
            return;
        }

        new QRCode(container, {
            text: eventUrl,
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    downloadQRCode() {
        if (!this.selectedEvent) return;

        const container = document.getElementById('qr-code-container');
        const canvas = container.querySelector('canvas');
        
        if (!canvas) {
            const img = container.querySelector('img');
            if (img) {
                const link = document.createElement('a');
                link.href = img.src;
                link.download = `qr-code-${this.selectedEvent.Title.replace(/[^a-z0-9]/gi, '_')}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            return;
        }
    }

    showSharePopover() {
        if (!this.selectedEvent) return;
        
        const protocol = window.location.protocol;
        const host = window.location.host;
        const shareUrl = `${protocol}//${host}/event.php?id=${this.selectedEvent.Id}`;
        
        const input = document.getElementById('share-url-input');
        if (input) {
            input.value = shareUrl;
        }
        
        document.getElementById('share-popover')?.showPopover();
    }

    copyShareUrl() {
        const input = document.getElementById('share-url-input');
        const btnText = document.getElementById('copy-btn-text');
        
        if (input) {
            input.select();
            input.setSelectionRange(0, 99999);
            
            navigator.clipboard.writeText(input.value).then(() => {
                if (btnText) {
                    const originalText = btnText.textContent;
                    btnText.textContent = '✓ Kopiert!';
                    setTimeout(() => {
                        btnText.textContent = originalText;
                    }, 2000);
                }
            }).catch(err => {
                console.error('Fehler beim Kopieren:', err);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.eventApp = new EventApp();
});