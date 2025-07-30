<template lang="">
  <BasicPage title="Analytics" description="Overall Analytics" sticky>
    <div class="overflow-x-auto">
      <ChardAnalytics />
    </div>
  </BasicPage>
</template>

<script setup lang="ts">
import BasicPage from '../../../../components/global-layout/BasicPage.vue';

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
