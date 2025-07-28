<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'light',
  },
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <NuxtRouteAnnouncer />
    </NuxtLayout>
  </div>
</template>
