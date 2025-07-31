<template lang="">
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
  >
    <img :src="badgeImage" alt="badge-icon" class="w-14 h-14 mr-4" />
    <div>
      <p class="text-sm text-gray-600 mb-1">Badge Saat ini</p>
      <h3 class="text-lg font-bold capitalize">{{ badge }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import badgeGold from '~/assets/images/badge-icon-gold.svg';
import badgeDiamond from '~/assets/images/badge-icon-diamond.svg';
import badgeEmpty from '~/assets/images/badge-icon-empty.svg';

const props = defineProps<{
  badge: string;
}>();

const badgeImage = computed(() => {
  switch (props.badge) {
    case 'gold':
      return badgeGold;
    case 'diamond':
      return badgeDiamond;
    case 'empty':
    default:
      return badgeEmpty;
  }
});
</script>
