// events-lib.js

/**
 * Validates and parses a JSON string for new events.
 * Returns { valid: boolean, error: string|null, events: array|null, previewHtml: string }
 */
function parseAndPreviewEvents(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return { valid: false, error: 'Ungültiges JSON: ' + e.message, events: null, previewHtml: '' };
  }
  const arr = Array.isArray(parsed) ? parsed : [parsed];
  const previewHtml = arr.map(ev =>
    `<div style="margin-bottom:0.5em; border-bottom:1px solid #eee;">
      <strong>${ev.Title || 'No title'}</strong><br>
      <span>${ev.Time ? new Date(ev.Time).toLocaleDateString() : ''}</span><br>
      <span>${ev.Location || ''}</span>
    </div>`
  ).join('');
  return { valid: true, error: null, events: arr, previewHtml };
}

class EventManager {
  /**
   * Adds new events to the list. Validates that each event is an object.
   * @param {Array} newEvents
   */
  addEventsToList(newEvents) {
    if (!Array.isArray(newEvents)) throw new Error('newEvents muss ein Array sein');
    for (const ev of newEvents) {
      if (typeof ev !== 'object' || ev === null) throw new Error('Jedes Event muss ein Objekt sein');
    }
    this.events.push(...newEvents);
  }
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
}

window.EventManager = EventManager;
window.EventUI = EventUI;
window.parseAndPreviewEvents = parseAndPreviewEvents;
