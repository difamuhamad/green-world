import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { city } from '../data/city';
import type { Coordinate, PlaceNameResponse, VendingMachine } from '../types';

// Lazy-loaded leaflet
let L: typeof import('leaflet') | undefined;

async function loadLeaflet() {
  if (!L) {
    const leaflet = await import('leaflet');
    await import('leaflet/dist/leaflet.css');
    L = leaflet;
  }
  return L;
}

const DEFAULT_CENTER: [number, number] = [-6.2088, 106.8456];
const DEFAULT_ZOOM = 5;
const MIN_ZOOM = 4;

let INDONESIA_BOUNDS: import('leaflet').LatLngBounds;

export default class IndonesiaMap {
  private map: import('leaflet').Map | null = null;
  private apiKey: string;
  private selector: string;
  private options: { center?: [number, number]; zoom?: number };

  constructor(
    selector: string,
    apiKey: string,
    options: { center?: [number, number]; zoom?: number } = {}
  ) {
    if (!apiKey) throw new Error('API key is required');

    this.selector = selector;
    this.apiKey = apiKey;
    this.options = options;
  }

  public async init() {
    const leaflet = await loadLeaflet();
    const center = this.options.center || DEFAULT_CENTER;
    const zoom = this.options.zoom || DEFAULT_ZOOM;

    // bound init first
    INDONESIA_BOUNDS = leaflet.latLngBounds(
      leaflet.latLng(-11.0, 94.0),
      leaflet.latLng(6.0, 141.0)
    );

    const centerLatLng = leaflet.latLng(center);
    if (!INDONESIA_BOUNDS.contains(centerLatLng)) {
      console.warn('Center out of bounds, fallback to default center.');
    }

    const tileOsm = leaflet.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        minZoom: MIN_ZOOM,
      }
    );

    const tileSatellite = leaflet.tileLayer(
      `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${this.apiKey}`,
      {
        attribution:
          '&copy; <a href="https://www.maptiler.com/" target="_blank">MapTiler</a> contributors',
        minZoom: MIN_ZOOM,
      }
    );

    this.map = leaflet.map(
      document.querySelector(this.selector) as HTMLElement,
      {
        center,
        zoom,
        layers: [tileOsm],
        maxBounds: INDONESIA_BOUNDS,
        maxBoundsViscosity: 1.0,
        minZoom: MIN_ZOOM,
        scrollWheelZoom: true,
        keyboard: false,
      }
    );

    this.setupRestrictions();

    leaflet.control
      .layers(
        {
          'Peta Standar': tileOsm,
          'Tampilan Satelit': tileSatellite,
        },
        {
          Kota: city,
        }
      )
      .addTo(this.map);
  }

  private setupRestrictions() {
    if (!this.map || !L) return;

    this.map.setMaxBounds(INDONESIA_BOUNDS);

    this.map.on('drag', () => {
      this.map?.panInsideBounds(INDONESIA_BOUNDS, { animate: false });
    });

    this.map.on('moveend', () => {
      const center = this.map?.getCenter();
      if (center && !INDONESIA_BOUNDS.contains(center)) {
        this.map?.panInsideBounds(INDONESIA_BOUNDS, { animate: true });
      }
    });
  }

  public changeView(coordinate: [number, number], zoom = DEFAULT_ZOOM) {
    if (!this.map || !L) return;

    const target = L.latLng(coordinate);
    if (!INDONESIA_BOUNDS.contains(target)) {
      console.warn('Out of bounds');
      return;
    }

    this.map.setView(target, Math.max(MIN_ZOOM, zoom));
  }

  public getCurrentCenter(): Coordinate | null {
    if (!this.map) return null;
    const center = this.map.getCenter();
    return {
      latitude: center.lat,
      longitude: center.lng,
    };
  }

  public createCustomIcon(options: Partial<L.IconOptions> = {}) {
    if (!L) throw new Error('Leaflet not loaded');
    return L.icon({
      iconUrl: '/images/vending-machine.png',
      iconSize: [35, 40],
      ...options,
    });
  }

  public addMarker(
    coordinates: [number, number],
    markerOptions: L.MarkerOptions = {},
    popupContent: string | HTMLElement | null = null,
    popupOptions: Omit<L.PopupOptions, 'content'> = {}
  ): L.Marker | null {
    if (!this.map || !L) return null;

    const latlng = L.latLng(coordinates);
    if (!INDONESIA_BOUNDS.contains(latlng)) {
      console.warn('Out of bounds');
      return null;
    }

    const marker = L.marker(coordinates, {
      icon: this.createCustomIcon(),
      keyboard: false,
      ...markerOptions,
    }).addTo(this.map);

    if (popupContent) {
      const popup = L.popup(popupOptions).setContent(popupContent);
      marker.bindPopup(popup);
    }

    return marker;
  }

  public static async getPlaceNameByCoordinate(
    lat: number,
    lon: number,
    apiKey: string
  ): Promise<string> {
    const leaflet = await loadLeaflet();
    const coordinate = leaflet.latLng(lat, lon);

    if (!INDONESIA_BOUNDS.contains(coordinate)) {
      return `${lat}, ${lon}`;
    }

    try {
      const url = new URL(
        `https://api.maptiler.com/geocoding/${lon},${lat}.json?key=${apiKey}&language=id&limit=1`
      );

      const response = await fetch(url.toString());
      const json: PlaceNameResponse = await response.json();

      const placeName = json.features?.[0]?.place_name ?? `${lat}, ${lon}`;
      const placeParts = placeName.split(' ');
      return [placeParts.at(-2), placeParts.at(-1)].join(' ');
    } catch (e) {
      console.error(e);
      return `${lat}, ${lon}`;
    }
  }
}

export async function VendingMachineMapper(
  vendingMachine: VendingMachine,
  apiKey: string
): Promise<
  VendingMachine & {
    location: {
      latitude: number | null;
      longitude: number | null;
      placeName: string;
    };
  }
> {
  const lat = vendingMachine.latitude ?? null;
  const lon = vendingMachine.longitude ?? null;

  let placeName = 'Location not found';
  if (lat !== null && lon !== null) {
    placeName = await IndonesiaMap.getPlaceNameByCoordinate(lat, lon, apiKey);
  }

  return {
    ...vendingMachine,
    location: {
      latitude: lat,
      longitude: lon,
      placeName,
    },
  };
}
