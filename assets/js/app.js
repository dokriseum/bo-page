class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
        this.init();
    }

    init() {
        this.bindGlobalFunctions();
        this.bindEvents();
        this.showView('main');
    }

    bindGlobalFunctions() {
        window.showView = this.showView.bind(this);
        window.showEventDetails = this.showEventDetails.bind(this);
        window.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
        window.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        const root = document.documentElement;
        const key  = 'bo-theme';
        const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem(key, newTheme);
        // Meta theme-color updaten (mobile Browser-Chrome)
        document.querySelector('meta[name="theme-color"]').content =
            newTheme === 'dark' ? '#121212' : '#f8f9fa';
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
        }
    }

    showEventDetails() {
        document.querySelectorAll('[id$="-view"]').forEach(view => 
            view.classList.add('hidden'));
        document.getElementById('event-details')?.classList.remove('hidden');
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
            // Update burger menu
            document.querySelectorAll('.burger-item, .sidebar-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new EventApp());
document.getElementById('theme-toggle')?.addEventListener('click', () => toggleTheme());
