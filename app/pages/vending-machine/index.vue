<template>
<<<<<<< HEAD
  <div class="min-h-screen">
=======
  <div class="min-h-screen bg-gray-50 py-8 px-4 mt-10">
    <!-- Main Container -->
>>>>>>> feature/object-detection
    <div
      class="mx-auto max-w-4xl bg-white rounded-xl shadow-md overflow-hidden border border-sky-200"
    >
<<<<<<< HEAD
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
=======
      <!-- Camera Section -->
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
          Plastic Bottle Detection
        </h1>

        <!-- Camera Preview -->
        <div class="relative w-full aspect-video">
          <!-- Video Preview -->
          <video
            ref="videoRef"
            autoplay
            playsinline
            class="absolute inset-0 w-full h-full object-cover"
            v-show="isCameraActive"
          ></video>

          <!-- Canvas Detection -->
          <canvas
            ref="canvasRef"
            class="absolute inset-0 w-full h-full object-cover"
            v-show="isCameraActive"
          ></canvas>

          <!-- Frozen Result -->
          <canvas
            ref="frozenCanvasRef"
            class="absolute inset-0 w-full h-full object-cover"
            v-show="!isCameraActive"
          ></canvas>
>>>>>>> feature/object-detection
        </div>

<<<<<<< HEAD
      <!-- Detection Result -->
      <div class="mb-8">
        <h3 class="font-medium text-left mb-4">Botol Plastik terdeteksi:</h3>
        <div
          class="w-full h-32 bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <p v-if="detectionResult" class="p-4 text-center">
            {{ detectionResult }}
          </p>
=======
        <!-- Detection Results -->
        <div class="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="font-semibold text-lg mb-3 text-gray-700">
            Hasil Deteksi :
          </h3>

          <div class="min-h-32 p-4 bg-white rounded-lg shadow-sm">
            <div
              v-if="detectionResult.length && isCameraActive === false"
              class="space-y-2"
            >
              <div
                class="grid grid-cols-3 gap-4 font-semibold text-gray-600 px-2"
              >
                <span>Tipe</span>
                <span class="text-center">Jumlah</span>
                <span class="text-right">Total Berat</span>
              </div>

              <div
                v-for="(item, i) in detectionResult"
                :key="i"
                class="grid grid-cols-3 gap-4 items-center p-2"
              >
                <span class="font-medium capitalize">{{ item.tipe }}</span>
                <span class="text-center">{{ item.jumlah }}</span>
                <span class="text-right font-bold">{{ item.berat }} kg</span>
              </div>
            </div>

            <div
              v-if="detectionResult.length"
              class="mt-4 p-2 bg-blue-50 rounded-lg"
            >
              <div class="flex justify-between font-semibold">
                <span>Total :</span>
                <span
                  >{{
                    detectionResult.reduce(
                      (sum, item) => sum + Number(item.jumlah),
                      0
                    )
                  }}
                  items</span
                >
                <span
                  >{{
                    detectionResult
                      .reduce((sum, item) => sum + Number(item.berat), 0)
                      .toFixed(2)
                  }}
                  kg</span
                >
              </div>
            </div>

            <div v-if="detectionResult.length">
              <TransButton :detectionResult="detectionResult" />
            </div>
          </div>
>>>>>>> feature/object-detection
        </div>

<<<<<<< HEAD
      <!-- Action Buttons -->
      <div class="flex justify-between items-center">
        <button
          @click="toggleCamera"
          class="flex items-center gap-2 text-primary-blue hover:underline rounded border border-gray p-2"
=======
        <!-- Action Buttons -->
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
>>>>>>> feature/object-detection
        >
          <div class="flex items-center gap-4">
            <button
              @click="toggleCamera"
              class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              :class="{
                'text-red-600': isCameraActive,
              }"
            >
              <CameraOff v-if="isCameraActive" class="w-5 h-5" />
              <Camera v-else class="w-5 h-5" />
              {{ isCameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera' }}
            </button>
          </div>

<<<<<<< HEAD
        <Button
          @click="processImage"
          class="rounded-2xl shadow-sm font-bold"
          :disabled="isCameraActive"
        >
          Deteksi Objek →
        </Button>
=======
          <Button
            @click="processImage"
            class="text-white text-md font-semibold rounded-lg shadow-sm transition-colors flex items-center"
            size="lg"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Sedang diproses...' : 'Deteksi Hasil' }}
            <ScanSearch />
          </Button>
        </div>

        <p class="text-center text-gray-500 mt-4">
          Pastikan seluruh botol plastik terlihat pada camera
        </p>
>>>>>>> feature/object-detection
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Camera, CameraOff, ScanSearch } from 'lucide-vue-next';
import * as tf from '@tensorflow/tfjs';
import { bottleWeight } from '~/data/object-data';
import { restoreUserFromSupabase } from '~/lib/restore-user';

const videoRef = ref(null);
const isCameraActive = ref(false);
const labels = ['gelas-plastik', 'botol-plastik-kecil', 'botol-plastik-besar'];
const canvasRef = ref(null);
const frozenCanvasRef = ref(null);
const detectionResult = ref([]);
const userStore = useUserStore();
const router = useRouter();

let isLoading = ref(false);
let stream = null;
let model = null; // tensorflow model

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

    videoRef.value.onloadeddata = () => {
      const width = videoRef.value.videoWidth;
      const height = videoRef.value.videoHeight;

      if (canvasRef.value) {
        canvasRef.value.width = width;
        canvasRef.value.height = height;
      }
      if (frozenCanvasRef.value) {
        frozenCanvasRef.value.width = width;
        frozenCanvasRef.value.height = height;
      }
    };
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
  if (isCameraActive.value) stopCamera();
  else startCamera();
};

// process image and run model
const processImage = async () => {
  if (!model || !videoRef.value || !canvasRef.value || !frozenCanvasRef.value) {
    alert('Model atau elemen belum siap.');
    return;
  }

  isLoading.value = true;

  try {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    const frozenCanvas = frozenCanvasRef.value;

    if (video.readyState < 2) {
      await new Promise((resolve) => {
        video.onloadeddata = () => resolve();
      });
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = frozenCanvas.width = width;
    canvas.height = frozenCanvas.height = height;

    const ctxFrozen = frozenCanvas.getContext('2d');

    // Bekukan frame dari video
    ctxFrozen.drawImage(video, 0, 0, width, height);

    // Hentikan kamera
    stopCamera();

    // Tampilkan hasil beku
    await nextTick();
    isCameraActive.value = false;

    // Preprocess image untuk TensorFlow
    const inputTensor = tf.browser
      .fromPixels(frozenCanvas)
      .resizeBilinear([640, 640])
      .toFloat()
      .div(255.0)
      .expandDims(0)
      .transpose([0, 3, 1, 2]);

    // Jalankan model
    const output = await model.executeAsync({ images: inputTensor });
    const predictions = (await output.array())[0];

    const threshold = 0.5;
    const detectedBoxes = [];

    for (const pred of predictions) {
      const [x, y, w, h, objectness, ...classScores] = pred;
      const classConfidence = Math.max(...classScores);
      const classId = classScores.indexOf(classConfidence);
      const score = objectness * classConfidence;

      if (score > threshold) {
        detectedBoxes.push({ box: [x, y, w, h], score, classId });
      }
    }

    // Gambar hasil deteksi
    const scaleX = width / 640;
    const scaleY = height / 640;

    ctxFrozen.strokeStyle = 'red';
    ctxFrozen.lineWidth = 2;
    ctxFrozen.font = '16px Arial';
    ctxFrozen.fillStyle = 'red';

    detectedBoxes.forEach((det) => {
      const [x, y, w, h] = det.box;
      const x0 = x - w / 2;
      const y0 = y - h / 2;

      ctxFrozen.strokeRect(x0 * scaleX, y0 * scaleY, w * scaleX, h * scaleY);
      const label = `${labels[det.classId]} (${(det.score * 100).toFixed(1)}%)`;
      ctxFrozen.fillText(label, x0 * scaleX + 4, y0 * scaleY + 18);
    });

    // Hitung hasil
    const jumlahTiapTipe = {};
    detectedBoxes.forEach((det) => {
      const label = labels[det.classId];
      if (!jumlahTiapTipe[label]) jumlahTiapTipe[label] = 0;
      jumlahTiapTipe[label]++;
    });

    detectionResult.value = Object.entries(jumlahTiapTipe).map(
      ([tipe, jumlah]) => ({
        tipe,
        jumlah,
        berat: (jumlah * bottleWeight[tipe]).toFixed(2),
      })
    );

    tf.dispose([output, inputTensor]);
  } catch (err) {
    console.error('Error saat proses deteksi:', err);
    alert('Gagal mendeteksi objek.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await restoreUserFromSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    router.push('/browser-app/profile');
  }

  console.log('Loading model...');
  model = await tf.loadGraphModel('/models/tfjs_model/model.json');
  console.log('Model loaded.');
});

onBeforeUnmount(() => {
  stopCamera();
});

definePageMeta({
  layout: 'secondary-layout',
});
</script>
