<template>
  <div>
    <button
      v-if="props.detectionResult"
      class="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-xl"
      @click="sendTransaction"
      :disabled="isLoading"
    >
      <span v-if="isLoading">sedang mengirim...</span>
      <span v-else>CREATE TRANSACTION</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { DetectionItem } from '../data/schema';
import { restoreUserFromSupabase } from '../lib/restore-user';
import { countExp } from '../lib/utils';

const userData = useUserStore();
const router = useRouter();
const supabase = useSupabase();
const isLoading = ref(false);
const transactionData = ref<DetectionItem[]>([]);

// Definisikan tipe props
const props = defineProps<{
  detectionResult: DetectionItem[];
}>();

// Hitung total weight dan points
const totalWeight = computed(() => {
  return transactionData.value.reduce(
    (sum, item) => sum + parseFloat(item.berat),
    0
  );
});

const totalPoints = computed(() => {
  return Math.floor(totalWeight.value * 10); // 1 point per 0.1kg
});

// Simpan data dari props ke state komponen
watch(
  () => props.detectionResult,
  (newValue) => {
    if (newValue && Array.isArray(newValue)) {
      transactionData.value = [...newValue];
      console.log('Transaction data updated:', transactionData.value);
    } else {
      transactionData.value = [];
    }
  },
  { immediate: true }
);

const sendTransaction = async () => {
  console.log(transactionData);
  console.log(userData);

  try {
    isLoading.value = true;
    console.log('Sending transaction data:', transactionData.value);

    // 1. Hitung point dan exp baru
    const newPoints = totalPoints.value;
    const newWeight = totalWeight.value;
    const newExp = countExp(newWeight);

    // 2. Simpan transaksi baru
    const transactionPayload = {
      email: userData.email,
      city: userData.domisili,
      type: 'Penukaran Botol Plastik',
      amount_kg: newWeight,
      status: 'Selesai',
      points: newPoints,
    };

    const { error: insertError } = await supabase
      .from('transactions')
      .insert(transactionPayload);

    if (insertError) throw insertError;

    // 3. Cek apakah user_data sudah ada
    const { data: existingUserData, error: fetchError } = await supabase
      .from('user_data')
      .select('point, exp_level, total_weight')
      .eq('id', userData.id)
      .maybeSingle(); // Gunakan maybeSingle agar tidak error jika kosong

    if (fetchError) throw fetchError;

    if (!existingUserData) {
      // 4a. Jika belum ada data, insert baru
      const { error: insertUserDataError } = await supabase
        .from('user_data')
        .insert({
          id: userData.id,
          point: newPoints,
          exp_level: newExp,
          total_weight: newWeight,
        });

      if (insertUserDataError) throw insertUserDataError;
    } else {
      // 4b. Jika sudah ada, update nilai total
      const updatedPayload = {
        point: existingUserData.point + newPoints,
        exp_level: existingUserData.exp_level + newExp,
        total_weight: existingUserData.total_weight + newWeight,
      };

      const { error: updateError } = await supabase
        .from('user_data')
        .update(updatedPayload)
        .eq('id', userData.id);

      if (updateError) throw updateError;
    }

    alert(`Transaksi Berhasil! Anda mendapatkan ${newPoints} points`);

    transactionData.value = [];
    router.push('/browser-app/profile');
  } catch (error) {
    console.error('Error saving transaction:', error);
    alert('Gagal membuat transaksi: ' + error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await restoreUserFromSupabase();
});
</script>
