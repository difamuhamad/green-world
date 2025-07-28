<template>
  <div class="container mx-auto px-4 py-6 max-w-5xl">
    <h1 class="text-2xl md:text-3xl mb-6 font-bold">Profile</h1>

    <!-- Profile Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <!-- Profile Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
      >
        <div
          class="bg-primary-blue rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center mr-3"
        >
          <img
            src="/assets/images/profile-icon.svg"
            alt="Profile"
            class="w-12 h-12"
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold">{{ userData.nama }}</h3>
          <p class="text-gray-500 text-sm">{{ userData.email }}</p>
        </div>
      </div>

      <!-- Location Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
      >
        <img
          src="/assets/images/map-pin-icon.svg"
          alt="Location"
          class="w-12 h-12 mr-3"
        />
        <div>
          <div class="flex items-center gap-1">
            <span class="text-base font-medium">Domisili:</span>
            <span class="text-primary-blue text-base font-medium">{{
              userData.domisili
            }}</span>
          </div>
          <p class="text-gray-500 text-sm mt-1">Bergabung sejak: 2025</p>
        </div>
      </div>

      <!-- Badge Card -->
      <BadgeCard :badge="userData.badge" />

      <!-- Points Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
      >
        <img
          src="assets/images/point-icon.svg"
          alt="Points"
          class="w-12 h-12 mr-4"
        />
        <div>
          <p class="text-sm text-gray-600 mb-1">Total points:</p>
          <h3 class="text-lg font-bold">+{{ userData.points }}</h3>
        </div>
      </div>

      <!-- Redeem Points Card -->
      <NuxtLink to="/browser-app/exchange">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between"
        >
          <div class="flex items-center">
            <img
              src="/assets/images/money-exchange-icon.svg"
              alt="Redeem"
              class="w-12 h-12 mr-3"
            />
            <h2 class="mx-5 font-bold">Tukar Point</h2>
          </div>
        </div>
      </NuxtLink>

      <!-- Logout Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
      >
        <img
          src="/assets/images/exit-icon.png"
          alt="Logout"
          class="w-10 h-10 mr-3"
        />
        <h3 class="text-base font-medium">Keluarkan Akun</h3>
      </div>
    </div>

    <!-- Dashboard Section -->
    <h2 class="text-xl md:text-2xl mb-6 font-bold">Dashboard</h2>

    <!-- Date Range Picker -->
    <div class="flex items-center gap-2 mb-4">
      <div
        class="flex items-center border border-gray-300 rounded-md px-3 py-1.5 w-full max-w-sm"
      >
        <Calendar class="w-4 h-4 mr-2 text-gray-500" />
        <span class="text-sm text-gray-700">Mar 12, 2025 - Jul 11, 2025</span>
      </div>
      <button class="bg-white border border-gray-300 rounded-md p-1.5">
        <ChevronDown class="w-4 h-4 text-gray-500" />
      </button>
    </div>

    <!-- History Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main History -->
      <div
        class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h3 class="text-lg font-semibold mb-4">Riwayat Terakhir:</h3>

        <!-- Transaction History -->
        <TransHistory
          v-for="(history, index) in historyData"
          :key="index"
          :title="history.title"
          :email="history.email"
          :status="history.status as TransactionStatus"
          :amount="history.amount"
        />
      </div>

      <!-- Side Stats -->
      <div class="space-y-4">
        <!-- Stats Cards -->
        <div
          v-for="(stat, index) in statsData"
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-600">{{ stat.label }}</p>
              <h3 class="text-lg font-bold mt-1">{{ stat.value }}</h3>
            </div>
            <Recycle class="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, ChevronDown, Recycle } from 'lucide-vue-next';
import type { TransactionStatus } from '~/app/types';

definePageMeta({
  layout: 'secondary-layout',
});

const userData = {
  nama: 'Budiono Siregar',
  email: 'budionosiregar@gmail.com',
  domisili: 'Bandung',
  badge: 'gold',
  points: '230',
};

const historyData = [
  {
    title: 'Penukaran Botol Plastik',
    email: 'ollivia.martin@email.com',
    status: 'Selesai',
    amount: '0.5 kg',
  },
  {
    title: 'Pengangkutan Kiloan',
    email: 'john.doe@email.com',
    status: 'Sedang diproses',
    amount: '2 kg',
  },
  {
    title: 'Pengangkutan Kiloan',
    email: 'john.doe@email.com',
    status: 'Dibatalkan',
    amount: '2 kg',
  },
];

const statsData = [
  { label: 'Botol Plastik ditukar', value: '+230' },
  { label: 'Botol Plastik ditukar', value: '+230' },
  { label: 'Botol Plastik ditukar', value: '+230' },
];
</script>
