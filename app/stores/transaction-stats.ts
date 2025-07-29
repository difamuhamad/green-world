import { defineStore } from 'pinia';

export const useTransactionStats = defineStore('transactionStats', {
  state: () => ({
    totalAmount: 0,
    totalTransaction: 0,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchStats() {
      this.loading = true;
      this.error = null;

      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from('transactions')
        .select('amount_kg');

      if (error) {
        this.error = error.message;
        this.loading = false;
        return;
      }

      this.totalTransaction = data.length;
      this.totalAmount = data.reduce(
        (acc, cur) => acc + (cur.amount_kg || 0),
        0
      );

      this.loading = false;
    },
  },
});
