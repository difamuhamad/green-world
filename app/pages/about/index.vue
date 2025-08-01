<template>
  <Header />
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <!-- Hero Section -->
    <section
      class="relative bg-[url('/images/green-world-thumbnail1.jpg')] bg-cover bg-center bg-no-repeat text-white min-h-screen"
    >
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative container mx-auto px-4 py-20 lg:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mt-15 mb-6 leading-tight">
            Langkah Kecilmu, adalah Nafas Panjang untuk
            <span class="text-green-200">Bumi</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Deteksi, tukar, dan rawat bumi yang kita pijak.
          </p>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"
      ></div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Menciptakan masa depan yang berkelanjutan di mana setiap individu
              memiliki kemudahan untuk membuat dampak positif pada lingkungan.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-[#87B844] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Sprout class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Environmental Love
                  </h3>
                  <p class="text-gray-600">
                    Setiap tindakan yang Anda lakukan melalui aplikasi kami
                    berkontribusi dalam mengurangi limbah yang dibuang ke tempat
                    pembuangan akhir dan melindungi sumber daya alam planet
                    kita.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-[#2192D1] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <MonitorCog class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Data-Driven Sustainability
                  </h3>
                  <p class="text-gray-600">
                    Kelola dan pantau upaya daur ulang secara real-time. Sistem
                    kami mengubah setiap transaksi di RVM menjadi data yang
                    dapat diukur, dianalisis, dan dilaporkan.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Cpu class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Innovation Drive
                  </h3>
                  <p class="text-gray-600">
                    Memanfaatkan teknologi terdepan untuk membuat daur ulang
                    menjadi mudah diakses, menguntungkan, dan menyenangkan bagi
                    semua orang.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/vending-machine-demo.jpg"
                alt="reverse vending machine"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powerful Features
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan bagaimana fitur inovatif kami membuat daur ulang menjadi
              mudah dan menguntungkan.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div
                class="w-16 h-16 bg-[#87B844] rounded-2xl flex items-center justify-center mb-6"
              >
                <Camera class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Smart Detection
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Deteksi objek botol plastik dan laninnya untuk memilah sampah
                dan juga menghitung estimasi jumlah berat
              </p>
            </div>

            <div
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div
                class="w-16 h-16 bg-[#2192D1] rounded-2xl flex items-center justify-center mb-6"
              >
                <MapPin class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">GIS Map</h3>
              <p class="text-gray-600 leading-relaxed">
                Map interaktif yang menampilkan lokasi RVM (reverse vending
                machine) pada setiap kota atau provinsi
              </p>
            </div>

            <div
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div
                class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6"
              >
                <Gift class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Reward System
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Dapatkan poin untuk setiap barang yang didaur ulang dan tukarkan
                poin tersebut dengan produk, diskon, dan hadiah eksklusif
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="py-20 bg-white"></section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-r from-[#87B844] to-[#2192D1] text-white"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Bersama Membangun Masa Depan Tanpa Sampah Plastik
          </h2>
          <p class="text-xl mb-8 opacity-90 leading-relaxed">
            Bangun citra positif dan dampak nyata dengan mengadopsi teknologi
            daur ulang cerdas.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/vending-machine">
              <button
                class="bg-white text-[#2192D1] px-4 py-2 rounded-full font-semibold text-md hover:bg-gray-50 transition-colors shadow-lg hover:shadow-2xl cursor-pointer"
              >
                Try Reverse Vending Machine Demo
              </button>
            </NuxtLink>
            <NuxtLink to="/browser-app/register">
              <button
                class="bg-white text-[#87B844] px-4 py-2 rounded-full font-semibold text-md hover:bg-gray-50 transition-colors shadow-lg hover:shadow-2xl cursor-pointer"
              >
                Create new account
              </button>
            </NuxtLink>
          </div>
          <p class="text-sm mt-6 opacity-75">Mobile App is coming soon!</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8">
            <div class="col-span-2">
              <h3 class="text-2xl font-bold mb-4 text-[#87B844]">
                GREEN WORLD
              </h3>
              <p class="text-gray-300 mb-8 leading-relaxed">
                Mengubah cara dunia memandang limbah, satu barang daur ulang
                pada satu waktu. Bersama-sama, kita sedang membangun masa depan
                yang berkelanjutan untuk generasi mendatang.
              </p>
              <div class="flex space-x-4">
                <a
                  href="https://github.com/difamuhamad"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-[#2192D1] rounded-full flex items-center justify-center hover:bg-[#2192D1]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2192D1]"
                >
                  <span class="sr-only">GitHub</span>
                  <Github class="w-5 h-5" />
                </a>

                <a
                  href="https://instagram.com/d_fluorites"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-[#2192D1] rounded-full flex items-center justify-center hover:bg-[#2192D1]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2192D1]"
                >
                  <span class="sr-only">Instagram</span>
                  <Instagram class="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-gray-300">
                <NuxtLink to="/browser-app">
                  <li class="hover:text-[#87B844] transition-colors">Home</li>
                </NuxtLink>
                <NuxtLink to="/vending-machine">
                  <li class="hover:text-[#87B844] transition-colors">
                    RVM Demo
                  </li>
                </NuxtLink>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Support</h4>
              <ul class="space-y-2 text-gray-300">
                <li>
                  <a href="#" class="hover:text-[#87B844] transition-colors"
                    >Help Center</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-[#87B844] transition-colors"
                    >Contact Us</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div
            class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          >
            <p>
              &copy; 2025 GreenWorld. All rights reserved. Made with 💚 for our
              planet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {
  Camera,
  Cpu,
  Flashlight,
  Gift,
  Github,
  Instagram,
  MapPin,
  MonitorCog,
  Sprout,
  Users,
} from 'lucide-vue-next';
import { onMounted } from 'vue';
import Header from '~/components/header/Header.vue';

// SEO Meta tags
const title = 'GREEN WORLD - Penukaran Sampah Plastik';
const description =
  'Green World App, penyedia layanan untuk menukar sampah plastik.';

// Set document title and meta description for SEO
onMounted(() => {
  document.title = title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  // Add structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EcoRecycle',
    description: description,
    url: window.location.href,
    logo: '/logo.png',
    sameAs: [
      'https://facebook.com/ecorecycle',
      'https://twitter.com/ecorecycle',
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);

  definePageMeta({
    layout: false,
  });
});
</script>
