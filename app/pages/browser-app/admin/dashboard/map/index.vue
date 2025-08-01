<template>
  <client-only>
    <BasicPage title="Map" description="Vending Machine Location" sticky>
      <div class="w-full h-[70vh]">
        <div
          v-if="loading"
          class="inset-0 flex justify-center items-center bg-white z-10"
        >
          <span>Memuat peta...</span>
        </div>
        <div id="map" ref="mapRef" class="w-full h-full" />
      </div>
    </BasicPage>
  </client-only>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { VendingMachine } from '~/app/types';
import BasicPage from '~/components/global-layout/BasicPage.vue';
import IndonesiaMap from '~/utils/map';

const mapRef = ref<HTMLElement | null>(null);
const loading = ref(true);
const config = useRuntimeConfig();
const apiKey = config.public.mapTilerApiKey;
const supabase = useSupabase();
const machines = ref<VendingMachine[]>([]);

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('machine_location').select('*');
    if (error) throw error;

    if (data) {
      // console.log(data)
      machines.value = data;

      // map initializaion
      const map = new IndonesiaMap('#map', apiKey, {
        center: [-2.5489, 118.0149],
        zoom: 5,
      });

      await map.init();
      machines.value.forEach((machine) => {
        if (machine.latitude && machine.longitude) {
          const popupContent = ` 
          <p class="font-semibold">${machine.address}</p>
          `;

          map.addMarker(
            [machine.latitude, machine.longitude],
            {}, // markerOptions
            popupContent, // popupContent
            {
              // popupOptions
              maxWidth: 200,
              className: 'custom-popup',
            }
          );
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
