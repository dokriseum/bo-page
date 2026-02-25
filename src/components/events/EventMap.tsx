'use client'

import { useEffect, useRef } from 'react'
import type { Event } from '@/lib/types'

interface EventMapProps {
  events: Event[]
  center?: [number, number]
  zoom?: number
}

export default function EventMap({ events, center = [52.0, 12.5], zoom = 6 }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Dynamic import to avoid SSR issues
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return

      // Fix leaflet icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center,
        zoom,
        zoomControl: true,
      })

      // Dark tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Add event markers
      const eventsWithCoords = events.filter(
        (e) => e.location_lat !== null && e.location_lng !== null
      )

      eventsWithCoords.forEach((event) => {
        const isMachbar = event.type === 'machbar'
        const color = isMachbar ? '#f97316' : '#3b82f6'

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width: 32px; height: 32px;
            background: ${color};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          "></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })

        const marker = L.marker([event.location_lat!, event.location_lng!], { icon })

        const popupContent = `
          <div style="
            background: #161b27;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 12px;
            min-width: 200px;
            border: 1px solid #2d3748;
          ">
            <div style="
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: ${color};
              font-weight: 600;
              margin-bottom: 4px;
            ">
              ${isMachbar ? 'MachBar-Event' : 'Standard-Event'}
            </div>
            <div style="font-weight: 600; font-size: 13px; margin-bottom: 6px;">
              ${event.title}
            </div>
            ${event.location_name ? `<div style="font-size: 11px; color: #8892a4;">📍 ${event.location_name}</div>` : ''}
            <a
              href="/events/${event.id}"
              style="
                display: inline-block;
                margin-top: 8px;
                padding: 4px 10px;
                background: ${color};
                color: white;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                text-decoration: none;
              "
            >
              Details →
            </a>
          </div>
        `

        marker.bindPopup(popupContent, {
          className: 'dark-popup',
          maxWidth: 280,
        })
        marker.addTo(map)
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstanceRef.current as any).remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers when events change
  useEffect(() => {
    // Handled by re-mount for simplicity
  }, [events])

  return (
    <>
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #161b27 !important;
          border: 1px solid #2d3748 !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
          color: #e2e8f0 !important;
        }
        .dark-popup .leaflet-popup-tip {
          background: #161b27 !important;
        }
        .dark-popup .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
      <div ref={mapRef} className="map-container" style={{ height: '500px' }} />
    </>
  )
}
