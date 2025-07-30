<template>
  <client-only>
    <BasicPage title="Map" description="Vending Machine Location" sticky>
      <div class="w-full h-[70vh] relative">
        <div
          v-if="loading"
          class="absolute inset-0 flex justify-center items-center bg-white z-10"
        >
          <span>Memuat peta...</span>
        </div>
        <div ref="mapRef" class="w-full h-full" />
      </div>
    </BasicPage>
  </client-only>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasicPage from '../../../../../components/global-layout/BasicPage.vue';

// --- Import image lokal marker shadow
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// --- Data kota
import { city } from '~/data/city';
// --- Types
import type { Coordinate, PlaceNameResponse } from '../../../../../types';

// --- Lazy load Leaflet
let L: typeof import('leaflet') | undefined;
async function loadLeaflet() {
  if (!L) {
    const leaflet = await import('leaflet');
    await import('leaflet/dist/leaflet.css');
    L = leaflet;
  }
  return L;
}

// --- Konstanta & variabel global
const DEFAULT_CENTER: [number, number] = [-6.2088, 106.8456];
const DEFAULT_ZOOM = 5;
const MIN_ZOOM = 4;
let INDONESIA_BOUNDS: import('leaflet').LatLngBounds;

// --- Refs dan config
const mapRef = ref<HTMLElement | null>(null);
const loading = ref(true);
const config = useRuntimeConfig();
const apiKey = config.public.mapTilerApiKey;

let map: import('leaflet').Map | null = null;

// --- Fungsi utama
async function initMap() {
  const leaflet = await loadLeaflet();
  const center = DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

  INDONESIA_BOUNDS = leaflet.latLngBounds(
    leaflet.latLng(-11.0, 94.0),
    leaflet.latLng(6.0, 141.0)
  );

  const tileOsm = leaflet.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      minZoom: MIN_ZOOM,
    }
  );

  const tileSatellite = leaflet.tileLayer(
    `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${apiKey}`,
    {
      attribution:
        '&copy; <a href="https://www.maptiler.com/" target="_blank">MapTiler</a> contributors',
      minZoom: MIN_ZOOM,
    }
  );

  map = leaflet.map(mapRef.value as HTMLElement, {
    center,
    zoom,
    layers: [tileOsm],
    maxBounds: INDONESIA_BOUNDS,
    maxBoundsViscosity: 1.0,
    minZoom: MIN_ZOOM,
    scrollWheelZoom: true,
    keyboard: false,
  });

  setupMapRestrictions();

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
    .addTo(map);

  city.addTo(map);
}

// --- Restriksi navigasi
function setupMapRestrictions() {
  if (!map || !L) return;
  map.setMaxBounds(INDONESIA_BOUNDS);

  map.on('drag', () => {
    map?.panInsideBounds(INDONESIA_BOUNDS, { animate: false });
  });

  map.on('moveend', () => {
    const center = map?.getCenter();
    if (center && !INDONESIA_BOUNDS.contains(center)) {
      map?.panInsideBounds(INDONESIA_BOUNDS, { animate: true });
    }
  });
}

// --- Tambah marker
function addMarker(
  coordinates: [number, number],
  markerOptions: L.MarkerOptions = {},
  popupOptions: L.PopupOptions | null = null
): L.Marker | null {
  if (!map || !L) return null;

  const latlng = L.latLng(coordinates);
  if (!INDONESIA_BOUNDS.contains(latlng)) {
    console.warn('Out of bounds');
    return null;
  }

  const marker = L.marker(coordinates, {
    icon: createCustomIcon(),
    keyboard: false,
    ...markerOptions,
  });

  if (popupOptions && popupOptions.content) {
    marker.bindPopup(L.popup(popupOptions));
  }

  marker.addTo(map);
  return marker;
}

// --- Buat custom icon
function createCustomIcon(options: Partial<L.IconOptions> = {}) {
  if (!L) throw new Error('Leaflet not loaded');
  return L.icon({
    iconUrl:
      'https://preview.redd.it/2yv5x9hto5f61.png?width=341&format=png&auto=webp&s=eccf34f646917d5a7c0196de5c2fc2e7ef3e2427',
    shadowUrl: markerShadow,
    iconSize: [35, 40],
    ...options,
  });
}

// --- Lifecycle
onMounted(async () => {
  await initMap();

  // Contoh tambah marker Jakarta
  addMarker(
    [-6.2088, 106.8456],
    {},
    {
      content: 'Jakarta',
    }
  );

  loading.value = false;
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
