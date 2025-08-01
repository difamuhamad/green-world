<template>
  <div
    class="border-b border-gray-200 pb-4 mb-4 flex items-center justify-between"
  >
    <div class="flex items-center">
      <div
        class="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4"
      >
        <div v-if="type === 'Pengangkutan Kiloan'">
          <Truck class="w-6 h-6 text-gray-600" />
        </div>
        <div v-else>
          <Recycle class="w-6 h-6 text-gray-600" />
        </div>
      </div>
      <div>
        <p class="font-semibold">{{ type }}</p>
        <a href="#" class="text-gray-500 underline text-sm">{{ date }}</a>
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
      <p class="font-semibold">{{ amount }} kg</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Truck, Recycle } from 'lucide-vue-next';
import type { TransactionStatus } from '../types';

defineProps<{
  type: string;
  date: string;
  status: TransactionStatus;
  amount: string;
}>();
</script>
