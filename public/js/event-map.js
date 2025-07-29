document.addEventListener('DOMContentLoaded', function() {
  async function fetchEvents() {
    const response = await fetch('/events.json');
    return await response.json();
  }

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
    const latitude = ev.Geolocation.Latitude;
    const longitude = ev.Geolocation.Longitude;
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

  function addEventMarkers(map, events) {
    const info = document.getElementById('event-info');
    events.forEach(ev => {
      const marker = L.circleMarker([ev.Geolocation.Latitude, ev.Geolocation.Longitude], {
        radius: 10,
        color: '#487eca',
        fillColor: '#b6d0f7',
        fillOpacity: 0.95,
        weight: 2
      }).addTo(map);
      marker.on('click', () => {
        info.innerHTML = renderEventInfo(ev);
        info.style.display = 'block';
        info.scrollIntoView({behavior:'smooth', block:'center'});
      });
      marker.bindTooltip(ev.Organizer.Name, {permanent: false, direction: 'top'});
    });
  }

  async function initEventMap() {
    const map = createMap();
    addTileLayer(map);
    try {
      const events = await fetchEvents();
      addEventMarkers(map, events);
    } catch (error) {
      console.log('Events konnten nicht geladen werden:', error);
    }
  }

  initEventMap();
});
