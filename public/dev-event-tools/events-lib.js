// events-lib.js

class EventManager {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
    this.events = [];
  }

  async loadEvents() {
    const response = await fetch(this.jsonUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load events');
    this.events = await response.json();
    return this.events;
  }

  getEvents() {
    return this.events;
  }

  async deleteEventsByIndices(indices) {
    this.events = this.events.filter((_, i) => !indices.includes(i));
    await this.saveEvents();
  }

  async saveEvents() {
  }
}

class EventUI {
  constructor(eventManager, listSelector, deleteBtnSelector) {
    this.eventManager = eventManager;
    this.listEl = document.querySelector(listSelector);
    this.selectedIndices = new Set();
    this.init();
  }

  async init() {
    await this.renderList();
  }

  async renderList() {
    const events = this.eventManager.getEvents();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const eventsWithIndex = events.map((event, idx) => ({ event, idx }));
    eventsWithIndex.sort((a, b) => {
      const ta = a.event.Time ? new Date(a.event.Time).getTime() : 0;
      const tb = b.event.Time ? new Date(b.event.Time).getTime() : 0;
      return ta - tb;
    });
    // Split into past and future
    const past = [], future = [];
    eventsWithIndex.forEach(({ event, idx }) => {
      const t = event.Time ? new Date(event.Time) : null;
      if (t && t < weekAgo) {
        past.push({ event, idx });
      } else {
        future.push({ event, idx });
      }
    });
    this.listEl.innerHTML = '';
    const renderEventListSection = (arr, checked, sectionTitle = null, sectionStyle = null) => {
      if (arr.length === 0) 
        return;
      let container = this.listEl;
      if (sectionTitle) {
        const div = document.createElement('div');
        if (sectionStyle) 
            Object.assign(div.style, sectionStyle);
        const title = document.createElement('div');
        title.textContent = sectionTitle;
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '0.5em';
        div.appendChild(title);
        container.appendChild(div);
        container = div;
      }
      arr.forEach(({ event, idx }) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <label>
            <input type="checkbox" data-idx="${idx}"${checked ? ' checked' : ''}>
            <strong>${event.Title || 'No title'}</strong> –
            <span>${event.Time ? new Date(event.Time).toLocaleDateString() : ''}</span> –
            <span>${event.Location || ''}</span>
          </label>
        `;
        li.querySelector('input[type=checkbox]').addEventListener('change', (e) => {
          if (e.target.checked) {
            this.selectedIndices.add(idx);
          } else {
            this.selectedIndices.delete(idx);
          }
        });
        if (checked) this.selectedIndices.add(idx);
        container.appendChild(li);
      });
    };
    // Render past events (checked)
    renderEventListSection(
      past,
      false,
      'Vergangene Events (älter als 1 Woche)',
      { border: '2px solid #ccc', padding: '0.5em', marginBottom: '1em', background: '#f9f9f9' }
    );
    // Render future events (unchecked)
    renderEventListSection(future, true);
  }

  async handleDelete() {
    if (this.selectedIndices.size === 0) return;
    if (!confirm('Really delete selected events?')) return;
    try {
      await this.eventManager.deleteEventsByIndices([...this.selectedIndices]);
      this.selectedIndices.clear();
      await this.renderList();
      alert('Events deleted (only in API environment).');
    } catch (err) {
      alert(err.message);
    }
  }
}

window.EventManager = EventManager;
window.EventUI = EventUI;
