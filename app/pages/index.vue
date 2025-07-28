<template>
  <div class="flex flex-col items-center py-8">
    <!-- Logo dan Judul -->
    <div class="flex flex-col items-center mb-12">
      <div class="flex">
        <img
          src="/assets/images/main-logo.svg"
          alt="main-logo"
          class="w-16 h-16 mb-4"
        />
        <div class="text-center text-primary">
          <h1 class="text-4xl font-bold mb-2">GREEN WORLD RECYCLE</h1>
          <h2 class="text-xl font-normal text-gray-600">
            Lingkungan Bersih, Kita Sehat
          </h2>
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-4">
      <NuxtLink to="vending-machine" class="group">
        <div
          class="w-80 h-96 flex flex-col items-center justify-between py-8 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <img
            class="w-48 h-48 object-contain"
            src="/assets/images/plastic-recycle.png"
            alt="Reverse Vending Machine"
          />
          <div class="text-center text-xl font-medium px-4">
            Reverse Vending Machine
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="browser-app" class="group">
        <div
          class="w-80 h-96 flex flex-col items-center justify-between py-8 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <img
            class="w-56 h-56 object-contain"
            src="/assets/images/garbage-truck.png"
            alt="Browser App"
          />
          <div class="text-center text-xl font-medium px-4">Browser App</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>
