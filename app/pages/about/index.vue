<template>
  <Header />
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <!-- Hero Section -->
    <section
      class="relative bg-[url('/images/green-world-thumbnail.jpg')] bg-cover bg-center bg-no-repeat text-white min-h-screen"
    >
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative container mx-auto px-4 py-20 lg:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
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
              Kami percaya dalam menciptakan masa depan yang berkelanjutan di
              mana setiap sampah menemukan tujuannya, dan setiap individu
              memiliki kekuatan untuk membuat dampak lingkungan.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-[#87B844] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
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
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Community Impact
                  </h3>
                  <p class="text-gray-600">
                    Bergabunglah dengan orang-orang yang memiliki minat yang
                    sama dan ciptakan efek domino perubahan lingkungan yang
                    positif di komunitas Anda.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
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
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Smart Recognition
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Cukup ambil foto barang apa pun, dan AI kami akan langsung
                mengidentifikasi metode daur ulang terbaik dan lokasi penukaran
                terdekat.
              </p>
            </div>

            <div
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div
                class="w-16 h-16 bg-[#2192D1] rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Location Finder
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Temukan pusat daur ulang terdekat, titik penitipan, dan jadwal
                pengumpulan di wilayah Anda dengan pembaruan real-time.
              </p>
            </div>

            <div
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div
                class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Reward System
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Dapatkan poin untuk setiap barang yang didaur ulang dan tukarkan
                poin tersebut dengan produk ramah lingkungan, diskon, dan hadiah
                eksklusif.
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
            Siap untuk memulai perubahan?
          </h2>
          <p class="text-xl mb-8 opacity-90 leading-relaxed">
            Bergabunglah dengan komunitas pejuang lingkungan kami dan mulailah
            perjalanan Anda menuju masa depan yang lebih berkelanjutan hari ini.
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
              <p class="text-gray-300 mb-4 leading-relaxed">
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
                <NuxtLink to="/browser-app"> </NuxtLink>
                <li>Home</li>
                <NuxtLink to="/vending-machine">
                  <li>Vending Machine Demo</li>
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
import { Github, Instagram } from 'lucide-vue-next';
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
