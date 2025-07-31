<template>
  <header class="fixed top-0 left-0 w-full h-16 shadow-md bg-white z-50">
    <div class="container mx-auto h-full flex items-center px-4">
      <img
        src="/assets/images/main-logo.svg"
        alt="Logo"
        class="w-8 h-12 mr-3"
      />
      <div>
        <h1 class="text-xl font-bold text-primary">GREEN WORLD</h1>
        <p class="text-sm font-normal text-primary">
          Lingkungan Bersih, Kita Sehat
        </p>
      </div>
      <nuxt-link to="/" class="ml-auto">
        <Button class="flex items-center gap-1 transition-colors">
          <SkipBack :size="18" :stroke-width="2" />
          Kembali
        </Button>
      </nuxt-link>
    </div>
  </header>
</template>

<script setup>
import { SkipBack } from 'lucide-vue-next';
</script>
