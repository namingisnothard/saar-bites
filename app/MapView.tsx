'use client';

import { useEffect, useRef } from 'react';
import { mapUrl, placeCoordinates, type Place } from './data';

type MapEntry = {
  place: Place;
  status: { state: 'open' | 'closed' | 'unknown'; label: string; detail: string };
};

type Props = {
  entries: MapEntry[];
  categoryFor: (place: Place) => string;
  openMapLabel: string;
};

export default function MapView({ entries, categoryFor, openMapLabel }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import('leaflet').Map | undefined;

    async function mountMap() {
      const L = await import('leaflet');
      if (cancelled || !container.current) return;

      map = L.map(container.current, {
        center: [49.2344, 6.9967],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const bounds: [number, number][] = [];
      entries.forEach(({ place, status }, index) => {
        const point = placeCoordinates[place.name];
        if (!point) return;
        bounds.push(point);

        const color = status.state === 'open' ? '#167f4e' : status.state === 'closed' ? '#ff6d3a' : '#67736b';
        const marker = L.circleMarker(point, {
          radius: 9,
          color: '#19251f',
          weight: 2,
          fillColor: color,
          fillOpacity: 1,
        }).addTo(map!);

        const popup = document.createElement('div');
        popup.className = 'map-popup';
        const number = document.createElement('span');
        number.className = 'map-popup-index';
        number.textContent = String(index + 1).padStart(2, '0');
        const title = document.createElement('strong');
        title.textContent = place.name;
        const meta = document.createElement('p');
        meta.textContent = `${categoryFor(place)} · ★ ${place.rating}`;
        const hours = document.createElement('small');
        hours.className = `map-popup-status ${status.state}`;
        hours.textContent = `${status.label} · ${status.detail}`;
        const link = document.createElement('a');
        link.href = mapUrl(place);
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = openMapLabel;
        [number, title, meta, hours, link].forEach((node) => popup.appendChild(node));
        marker.bindPopup(popup, { minWidth: 210, maxWidth: 280 });
      });

      if (bounds.length === 1) map.setView(bounds[0], 16);
      else if (bounds.length > 1) map.fitBounds(bounds, { padding: [34, 34], maxZoom: 16 });
    }

    void mountMap();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [entries, categoryFor, openMapLabel]);

  return <div className="places-map" ref={container} aria-label={openMapLabel} />;
}
