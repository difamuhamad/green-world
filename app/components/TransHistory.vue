<template>
  <div
    class="border-b border-gray-200 pb-4 mb-4 flex items-center justify-between"
  >
    <div class="flex items-center">
      <div
        class="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4"
      >
        <Truck class="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <p class="font-semibold">{{ title }}</p>
        <a href="#" class="text-gray-500 underline text-sm">{{ email }}</a>
      </div>
    </div>
    <div class="text-right">
      <p
        class="font-medium"
        :class="{
          'text-yellow-500': status === 'Sedang diproses',
          'text-green-500': status === 'Selesai',
          'text-red-500': status === 'Dibatalkan',
        }"
      >
        {{ status }}
      </p>
      <p class="font-semibold">{{ amount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Truck } from 'lucide-vue-next';
import type { TransactionStatus } from '../types';

defineProps<{
  title: string;
  email: string;
  status: TransactionStatus;
  amount: string;
}>();
</script>
