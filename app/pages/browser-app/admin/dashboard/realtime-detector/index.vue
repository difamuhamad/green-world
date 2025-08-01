<template>
  <div class="min-h-screen">
    <div
      class="mx-auto w-4xl bg-white rounded-md border-2 border-sky-600 p-6 my-10 mt-20"
    >
      <!-- Camera Preview -->
      <div class="relative w-full h-full bg-zinc-300 mb-8 overflow-hidden">
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full object-cover"
          v-show="isCameraActive"
        ></video>
        <div
          v-if="!isCameraActive"
          class="absolute inset-0 flex items-center justify-center bg-black"
        >
          <p class="text-white">Kamera dimatikan</p>
        </div>
      </div>

      <!-- Detection Result -->
      <div class="mb-8">
        <h3 class="font-medium text-left mb-4">Botol Plastik terdeteksi:</h3>
        <div
          class="w-full h-32 bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <p v-if="detectionResult" class="p-4 text-center">
            {{ detectionResult }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center">
        <button
          @click="toggleCamera"
          class="flex items-center gap-2 text-primary-blue hover:underline rounded border border-gray p-2"
        >
          <CameraOff v-if="isCameraActive" class="w-5 h-5" />
          <Camera v-else class="w-5 h-5" />
          {{ isCameraActive ? 'Matikan Kamera' : 'Hidupkan Kamera' }}
        </button>

        <Button
          @click="processImage"
          class="rounded-2xl shadow-sm font-bold"
          :disabled="isCameraActive"
        >
          Deteksi Objek →
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Camera, CameraOff } from 'lucide-vue-next';

const videoRef = ref(null);
const isCameraActive = ref(true);
const detectionResult = ref(null);
let stream = null;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    videoRef.value.srcObject = stream;
    isCameraActive.value = true;
  } catch (err) {
    console.error('Error accessing camera:', err);
    alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    videoRef.value.srcObject = null;
    isCameraActive.value = false;
  }
};

const toggleCamera = () => {
  if (isCameraActive.value) {
    stopCamera();
  } else {
    startCamera();
  }
};

const processImage = () => {
  detectionResult.value = 'Botol Aqua 600ml - 1 Poin';
};

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
