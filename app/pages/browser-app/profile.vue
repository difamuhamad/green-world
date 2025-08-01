<template>
  <div
    v-if="isLoading"
    class="flex justify-center items-center mt-10 min-h-screen"
  >
    <Loading />
  </div>
  <div v-else class="container mx-auto px-4 py-6 max-w-5xl mt-15">
    <h1 class="text-2xl md:text-2xl mb-6 font-bold">Profile</h1>

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
          <h3 class="text-lg font-semibold">{{ userStore.nama }}</h3>
          <p class="text-gray-500 text-sm">{{ userStore.email }}</p>
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
              userStore.domisili
            }}</span>
          </div>
          <p class="text-gray-500 text-sm mt-1">
            Bergabung sejak: {{ userStore.join_year }}
          </p>
        </div>
      </div>

      <!-- Badge Card -->
      <BadgeCard :badge="userStore.badge" />

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
          <h3 class="text-lg font-bold">+{{ userStore.points }}</h3>
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
      <AlertDialog v-model:open="isDialogOpen">
        <AlertDialogTrigger as-child>
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center cursor-pointer"
          >
            <img
              src="/assets/images/exit-icon.png"
              alt="Logout"
              class="w-10 h-10 mr-3"
            />
            <h3 class="text-base font-medium">Keluarkan Akun</h3>
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan dikeluarkan dari akun ini dan harus login kembali untuk
            mengakses layanan.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel @click="isDialogOpen = false"
              >Batal</AlertDialogCancel
            >
            <AlertDialogAction @click="handleLogout">
              Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <!-- Dashboard Section -->
    <h2 class="text-xl md:text-2xl mb-6 font-bold">Dashboard</h2>

    <!-- Date Range Picker -->
    <div class="flex items-center gap-2 mb-4">
      <div
        class="flex items-center border border-gray-300 rounded-md px-3 py-1.5 w-full max-w-sm"
      >
        <Calendar class="w-4 h-4 mr-2 text-gray-500" />
        <span class="text-sm text-gray-700"
          >Jul 27, 2025 - Agustus 20, 2025</span
        >
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
          v-for="(transaction, index) in userTransactions"
          :key="`transaction-${index}`"
          :type="transaction.type"
          :date="transaction.date"
          :status="transaction.status"
          :amount="transaction.amount"
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
            <component :is="stat.icon" class="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <h2 class="font-semibold">*Total dari data terakhir bulan ini</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, ChevronDown, Coins, Recycle, Truck } from 'lucide-vue-next';
import { useTransactionStats } from '../../stores/transaction-stats';
import { useUserStore } from '../../stores/user-profile';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '~/components/ui/alert-dialog';
import type {
  DisplayTransaction,
  StatItem,
  TransactionStatus,
} from '../../types';
import { logoutUser } from '../../lib/logout';
import { getUserBadge } from '~/lib/utils';

// Component State
const supabase = useSupabase();
const isLoading = ref(true);
const error = ref<Error | null>(null);
const isDialogOpen = ref(false);
const transactionStats = useTransactionStats();
const userStore = useUserStore();
const router = useRouter();

const userTransactions = ref<DisplayTransaction[]>([]);
const statsData = ref<StatItem[]>([
  { label: 'Total Botol Plastik ditukar', value: '-', icon: Recycle },
  { label: 'Total Pengambilan ', value: '-', icon: Truck },
  { label: 'Total Point diperoleh', value: '+', icon: Coins },
]);

// Helper Functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Data Fetching
const fetchUserData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Get authenticated user
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      throw authError || new Error('User not authenticated');
    }

    // Fetch user profile
    const { data: userData, error: userError } = await supabase
      .from('user_profile')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (userError || !userData) {
      throw userError || new Error('User profile not found');
    }

    const { data: userStats, error: errorStats } = await supabase
      .from('user_data')
      .select('*')
      .eq('id', userData.id)
      .single();

    if (errorStats || !userStats) {
      throw userError || new Error('User data is not found');
    }

    // Update user data in global state
    userStore.setUser({
      id: userData.id || '',
      nama: userData.full_name || 'Nama Pengguna',
      email: authUser.email || '',
      domisili: userData.address || 'Kota belum diatur',
      badge: getUserBadge(userStats.exp_level) || 'empty',
      points: userStats.point || '0',
      join_year: new Date(userData.created_at).getFullYear().toString(),
    });

    // Fetch transactions
    const { data: transactions, error: transError } = await supabase
      .from('transactions')
      .select('*')
      .eq('email', authUser.email)
      .order('created_at', { ascending: false })
      .limit(10);

    if (transError) {
      console.warn('Error fetching transactions:', transError);
    }

    if (transactions) {
      userTransactions.value = transactions.map((tx) => ({
        type: tx.type || 'unknown',
        date: formatDate(tx.created_at),
        status: (tx.status as TransactionStatus) || 'pending',
        amount: tx.amount_kg || '0',
      }));

      const totalPengambilan = transactions.filter(
        (tx) => tx.type === 'Pengangkutan Kiloan'
      ).length;

      statsData.value = [
        {
          label: 'Total Botol Plastik ditukar',
          value: `${userStats.total_weight} kg`,
          icon: Recycle,
        },
        {
          label: 'Total Pengambilan',
          value: `${totalPengambilan}`,
          icon: Truck,
        },
        {
          label: 'Total Point diperoleh',
          value: `+${userStats.point}`,
          icon: Coins,
        },
      ];
    }
  } catch (err) {
    console.error('Profile data error:', err);
    error.value =
      err instanceof Error
        ? err
        : new Error('Failed to load profile transaction');
  } finally {
    isLoading.value = false;
  }
};

// Logout Handler
const handleLogout = async () => {
  isLoading.value = true;
  await logoutUser(router);
};

// Lifecycle Hooks
onMounted(async () => {
  fetchUserData();
  await transactionStats.fetchStats();
});

// Page Meta
definePageMeta({
  layout: 'secondary-layout',
});
</script>
