document.addEventListener('DOMContentLoaded', function() {
  window.updateEventMarkers = updateEventMarkers;
  window.addEventMarkers = addEventMarkers;
  window.renderEventInfo = renderEventInfo;
  
  let stateSelectionLayer = null;

  function createMap() {
    return L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView([51.2, 12.5], 6);
  }

  function addTileLayer(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      minZoom: 5,
      attribution: '© OpenStreetMap-Mitwirkende'
    }).addTo(map);
  }

  function renderEventInfo(ev) {
    const eventDate = new Date(ev.Time).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    let linksHtml = '';
    const links = [];

    // Universeller Karten-Link: geo: für mobile Apps, OSM als Fallback
    const latitude = ev.Geolocation.Latitude ?? 0;
    const longitude = ev.Geolocation.Longitude ?? 0;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let mapUrl;
    if (isMobile) {
      mapUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    } else {
      mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`;
    }

    links.push(`<a href='${mapUrl}' target='_blank' rel='noopener' style='color:#376287;text-decoration:underline;'>📍 Auf Karte öffnen</a>`);

    if (ev.Website && ev.Website.trim() !== '') {
      links.push(`<a href='${ev.Website}' target='_blank' rel='noopener' style='color:#487eca;text-decoration:underline;'>Website</a>`);
    }

    if (ev.Wolke && ev.Wolke.trim() !== '') {
      links.push(`<a href='${ev.Wolke}' target='_blank' rel='noopener' style='color:#487eca;text-decoration:underline;'>Wolke</a>`);
    }

    if (links.length > 0) {
      linksHtml = `<div style='margin-top:1em;'>${links.join(' | ')}</div>`;
    }

    const buttonLink = (ev.Website && ev.Website.trim() !== '') ? ev.Website :
                       (ev.Wolke && ev.Wolke.trim() !== '') ? ev.Wolke : '#';

    return `
      <b>${ev.Organizer.Name}</b><br>
      <span style='color:#4976ce;'>${eventDate}</span> – ${ev.Location}<br>
      <div style='margin-top:.5em;'>${ev.Description}</div>
      ${linksHtml}
      <button onclick="window.open('${buttonLink}','_blank')" style="margin-top:1.2em;padding:.7em 2em;background:#376287;color:#fff;border:none;border-radius:22px;font-size:1.08em;cursor:pointer;box-shadow:0 2px 8px #b6d0f7a0;">Mehr Infos</button>
    `;
  }

  function addEventMarkers(map, events = null) {
    const eventsToUse = events || window._eventsJson;

    eventsToUse.forEach(ev => {
      if (!ev.Geolocation || ev.Geolocation.Latitude === null || ev.Geolocation.Longitude === null)
        return;
      
      const marker = L.circleMarker([ev.Geolocation.Latitude, ev.Geolocation.Longitude], {
        radius: 6,
        color: 'var(--eventMarkerColor)',
        fillColor: 'var(--eventMarkerFillColor)',
        fillOpacity: 'var(--eventMarkerFillOpacity)',
        weight: 2
      }).addTo(map);
      marker.on('click', () => {
        // Verwende die globale showEventDetails Funktion
        if (window.eventApp && typeof window.eventApp.showEventDetailsFromMap === 'function') {
          window.eventApp.showEventDetailsFromMap(ev.Id);
        }
      });
      marker.bindTooltip(ev.Organizer.Name, {permanent: false, direction: 'top'});
    });
  }

  function updateEventMarkers(events = null) {
    if (!window._eventMap) 
        return;

    window._eventMap.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        window._eventMap.removeLayer(layer);
      }
    });

    addEventMarkers(window._eventMap, events);
  }

  async function initEventMap() {
    const m = createMap();
    window._eventMap = m;
    addTileLayer(window._eventMap);

    try {
      let eventsToShow = window._eventsJson;
      if (window.eventApp && typeof window.eventApp.getFilteredEvents === 'function') {
        eventsToShow = window.eventApp.getFilteredEvents();
      }
      addEventMarkers(window._eventMap, eventsToShow);
    } catch (error) {
      console.log('Events konnten nicht geladen werden:', error);
    }
  }

  let mapInitialized = false;

  function initMapWhenVisible() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    if (mapInitialized) return;

    // polling fallback for older browsers
    function fallbackPoll() {
      if (mapInitialized) return;
      if (mapContainer.offsetParent !== null) {
        mapInitialized = true;
        initEventMap();
      } else {
        setTimeout(fallbackPoll, 200);
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !mapInitialized) {
            mapInitialized = true;
            initEventMap();
            obs.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(mapContainer);
    } else {
      fallbackPoll();
    }
  }

  // Grenzen eines Bundeslands anzeigen/entfernen
  async function ShowStateBorders(mapFile) {
    if (!window._eventMap)
      return;

   if (stateSelectionLayer) {
      window._eventMap.removeLayer(stateSelectionLayer);
      stateSelectionLayer = null;
    }
    if (mapFile === 'all') {
      let centerOfTheEast = [52.5, 12.45];
      window._eventMap.setView(centerOfTheEast, 6);
      
      // Event-Marker wieder hinzufügen für "Ostdeutschland"
      if (window.eventApp && typeof window.eventApp.getFilteredEvents === 'function') {
        const filteredEvents = window.eventApp.getFilteredEvents();
        updateEventMarkers(filteredEvents);
      }
      return;
    }

    try {
      const mapFilePath = `/data/${mapFile}.geojson`;
      const response = await fetch(mapFilePath);
      if (!response.ok) throw new Error(`GeoJSON not found: ${mapFilePath}`);
      const geojson = await response.json();

      stateSelectionLayer = L.geoJSON(geojson, {
        style: {
          color: 'var(--stateSelectionColor)',
          weight: 2,
          fillOpacity: 0.05
        }
      }).addTo(window._eventMap);

      // zoom to state boundaries
      const bounds = stateSelectionLayer.getBounds();
      if (bounds && bounds.isValid()) {
        window._eventMap.fitBounds(bounds, { padding: [20, 20] });
      }

      // Event-Marker wieder hinzufügen nach dem Zeichnen der Grenzen
      if (window.eventApp && typeof window.eventApp.getFilteredEvents === 'function') {
        const filteredEvents = window.eventApp.getFilteredEvents();
        updateEventMarkers(filteredEvents);
      }
    } catch (e) {
      console.error('Konnte Bundesland-Grenzen nicht laden:', e);
    }
  }
  window._ShowStateBorders = ShowStateBorders;

  initMapWhenVisible();
});
