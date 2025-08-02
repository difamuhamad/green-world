<template>
  <BasicPage title="Analytics" description="Overall Analytics" sticky>
    <!-- Monthly Chart -->
    <BarChart
      v-if="chartData.length > 0"
      :data="chartData"
      index="month"
      :categories="['recycle', 'pickup']"
      :colors="['#2192D1', '#87B844']"
      :rounded-corners="4"
    />
    <div v-else class="h-[400px] flex items-center justify-center">
      <p class="text-muted-foreground">Loading chart data...</p>
    </div>

    <!-- Transaction History -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Last 20 transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead class="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(transaction, index) in transactions"
              :key="`transaction-${index}`"
            >
              <TableCell class="font-medium capitalize">
                {{ transaction.type }}
              </TableCell>
              <TableCell>
                {{ transaction.email }}
              </TableCell>
              <TableCell>
                {{ transaction.date }}
              </TableCell>
              <TableCell> {{ transaction.amount }} kg </TableCell>
              <TableCell class="text-right">
                <Badge :class="getStatusClass(transaction.status)">
                  {{ transaction.status }}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </BasicPage>
</template>

<script setup lang="ts">
import { Coins, Recycle, Truck } from 'lucide-vue-next';
import { formatDate } from '~/lib/utils';
import { useSupabaseClient } from '#imports';
import type { DisplayTransaction, StatItem, TransactionStatus } from '~/types';

// UI Components
import { Badge } from '~/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from '~/components/ui/table';
import type { Transaction } from '~/app/types';

// Component State
const supabase = useSupabaseClient();
const isLoading = ref(true);
const error = ref<Error | null>(null);
const transactions = ref<DisplayTransaction[]>([]);
const chartData = ref<{ month: string; recycle: number; pickup: number }[]>([]);
const statsData = ref<StatItem[]>([
  { label: 'Total Botol Plastik ditukar', value: '-', icon: Recycle },
  { label: 'Total Pengambilan', value: '-', icon: Truck },
  { label: 'Total Point', value: '+', icon: Coins },
]);

const getStatusClass = (status: TransactionStatus) => {
  switch (status.toLowerCase()) {
    case 'dibatalkan':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'sedang diproses':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'selesai':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const fetchTransactionData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    if (data) {
      if (data) {
        transactions.value = data.map((tx: Transaction) => ({
          type: tx.type || 'unknown',
          email: tx.email || 'unknown',
          date: formatDate(tx.created_at),
          status: (tx.status as TransactionStatus) || 'pending',
          amount: tx.amount_kg || '0',
        }));

        // Calculate stats
        const totalAmount = data.reduce(
          (sum: number, tx: Transaction) => sum + (Number(tx.amount_kg) || 0),
          0
        );
        const totalPoints = data.reduce(
          (sum: number, tx: Transaction) => sum + (Number(tx.points) || 0),
          0
        );
        const totalPickups = data.filter(
          (tx: Transaction) => tx.type === 'Pengangkutan Kiloan'
        ).length;

        statsData.value = [
          {
            label: 'Total Botol Plastik ditukar',
            value: `${totalAmount.toFixed(1)} kg`,
            icon: Recycle,
          },
          {
            label: 'Total Pengambilan',
            value: `${totalPickups}`,
            icon: Truck,
          },
          {
            label: 'Total Point',
            value: `+${totalPoints}`,
            icon: Coins,
          },
        ];
      }
      const monthlyData: Record<string, { recycle: number; pickup: number }> =
        {};

      data.forEach((tx: Transaction) => {
        const date = new Date(tx.created_at);
        const monthYear = `${date.toLocaleString('default', {
          month: 'short',
        })} ${date.getFullYear()}`;

        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { recycle: 0, pickup: 0 };
        }

        const amount = Number(tx.amount_kg) || 0;
        if (tx.type === 'Recycle') {
          monthlyData[monthYear].recycle += amount;
        } else if (tx.type === 'Pengangkutan Kiloan') {
          monthlyData[monthYear].pickup += amount;
        }
      });

      chartData.value = Object.entries(monthlyData)
        .map(([month, values]) => ({
          month,
          ...values,
        }))
        .sort((a, b) => {
          return new Date(a.month).getTime() - new Date(b.month).getTime();
        });
    }
  } catch (err) {
    console.error('Failed to fetch transactions:', err);
    error.value = err instanceof Error ? err : new Error('Failed to load data');
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchTransactionData();
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
