<template>
  <div
    style="
      background-image: url('/images/secondary-background.png');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Header -->
    <header class="w-full h-16 shadow-md bg-white">
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
        <nuxt-link to="/browser-app/profile" class="ml-auto">
          <Button class="flex items-center gap-1 transition-colors">
            <SkipBack :size="18" :stroke-width="2" />
            Kembali
          </Button>
        </nuxt-link>
      </div>
    </header>

    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <Loading />
    </div>
    <div v-else class="container mx-auto px-4 py-6 max-w-5xl">
      <h1 class="text-2xl md:text-3xl mb-6 font-bold">Profile</h1>

      <!-- Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <!-- Profile Card -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
        >
          <div
            class="bg-primary-blue rounded-full w-16 h-16 flex items-center justify-center mr-3"
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

        <!-- Points Card -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center"
        >
          <img
            src="/assets/images/point-icon.svg"
            alt="Points"
            class="w-12 h-12 mr-4"
          />
          <div>
            <p class="text-sm text-gray-600 mb-1">Total points:</p>
            <h3 class="text-lg font-bold">+{{ userData.points }}</h3>
          </div>
        </div>

        <!-- Badge Card -->
        <BadgeCard :badge="userData.badge" />
      </div>

      <!-- Exchange Section -->
      <div
        class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6"
      >
        <!-- Header Exchange -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
          <div>
            <h2 class="text-2xl font-bold mb-1">Tukar Point</h2>
            <p class="text-base text-gray-600">
              Naikkan badge profile mu untuk mendapatkan penawaran diskon point!
            </p>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto">
            <div class="relative flex-grow sm:flex-grow-0">
              <div
                class="flex items-center bg-white rounded-lg border border-gray-300 px-3 py-1.5 w-full sm:w-48 text-sm"
              >
                <span class="text-gray-700">Filter :</span>
              </div>
            </div>
            <button
              class="w-8 h-8 bg-white rounded-lg border border-gray-300 flex items-center justify-center flex-shrink-0"
            >
              <ChevronDown class="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <!-- Reward Items -->
        <div class="space-y-4">
          <!-- Reward Item -->
          <div
            v-for="item in rewardItems"
            :key="item.name"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div class="flex items-center mb-3 sm:mb-0 gap-5">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-12 h-12 mr-4 object-cover rounded-lg"
              />
              <div>
                <h3 class="text-xl font-semibold">{{ item.name }}</h3>
                <div class="flex items-center mt-1">
                  <img
                    src="/assets/images/point-icon.svg"
                    alt="Points"
                    class="w-5 h-5 mr-2"
                  />
                  <span class="font-semibold">{{ item.points }} Point</span>
                </div>
              </div>
            </div>
            <button
              class="w-full sm:w-32 h-10 bg-white rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors text-base font-semibold"
            >
              Tukar Point →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, SkipBack } from 'lucide-vue-next';
import { restoreUserFromSupabase } from '../../lib/restore-user';
import type { RewardItem } from '../../types';
const userData = useUserStore();

const supabase = useSupabase();
const isLoading = ref(true);
const error = ref<string | null>(null);

const rewardItems = ref<RewardItem[]>([]);

definePageMeta({
  layout: false,
});

const fetchRewardItem = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const { data, error: supabaseError } = await supabase
      .from('reward_item')
      .select('*');

    if (supabaseError) {
      throw new Error(supabaseError.message);
    }

    if (data) {
      rewardItems.value = data.map((item) => ({
        id: item.id,
        name: item.nama_produk || 'Unknown Reward',
        image: item.image_url || 'https://placehold.co/80x80',
        points: item.point_price || '0',
      }));
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load rewards';
    console.error('Error fetching rewards:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await restoreUserFromSupabase();
  await fetchRewardItem();
});
</script>
