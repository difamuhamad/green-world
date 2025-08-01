<template>
  <Card>
    <CardHeader>
      <div class="flex justify-between items-center">
        <div>
          <CardTitle>User Profiles</CardTitle>
          <CardDescription
            >List of all registered users with their achievement
            badges</CardDescription
          >
        </div>
        <div class="flex space-x-2">
          <Input
            v-model="searchQuery"
            placeholder="Search users..."
            class="max-w-[300px]"
          />
          <Button variant="outline" @click="fetchCombinedUserData">
            <RefreshCw
              class="w-4 h-4 mr-2"
              :class="{ 'animate-spin': loading }"
            />
            Refresh
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in filteredUsers" :key="user.email">
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {{ getInitials(user.full_name) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-medium">{{ user.full_name || 'No name' }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ user.id?.substring(0, 8) }}...
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <a :href="`mailto:${user.email}`" class="hover:underline">
                {{ user.email }}
              </a>
            </TableCell>
            <TableCell>
              {{ user.phone_number || '-' }}
            </TableCell>
            <TableCell class="max-w-[200px] truncate">
              {{ user.address || '-' }}
            </TableCell>
            <TableCell>
              {{ user.point?.toLocaleString() || 0 }}
            </TableCell>
            <TableCell>
              <Badge :class="getBadgeClass(user.exp_level)">
                {{ getBadgeLevel(user.exp_level) }}
              </Badge>
            </TableCell>
            <TableCell>
              {{ formatDate(user.created_at) }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';

// UI Components
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
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
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { formatDate } from '~/lib/utils';

interface CombinedUserData {
  id: string;
  email: string;
  created_at: string;
  full_name?: string | null;
  address?: string | null;
  phone_number?: string | null;
  point?: number | null;
  exp_level?: number | null;
  total_weight?: number | null;
}

const supabase = useSupabaseClient();
const combinedUsers = ref<CombinedUserData[]>([]);
const loading = ref(false);
const searchQuery = ref('');

// Fetch combined user data from both tables
const fetchCombinedUserData = async () => {
  loading.value = true;
  try {
    // Pertama ambil data user_profile
    const { data: profiles, error: profileError } = await supabase
      .from('user_profile')
      .select('id, email, created_at, full_name, address, phone_number')
      .order('created_at', { ascending: false });

    if (profileError) throw profileError;

    // Kemudian ambil data user_data
    const { data: userData, error: dataError } = await supabase
      .from('user_data')
      .select('id, point, exp_level, total_weight');

    if (dataError) throw dataError;

    // Gabungkan data secara manual
    combinedUsers.value = (profiles || []).map((profile) => {
      const userStats = (userData || []).find((data) => data.id === profile.id);
      return {
        id: profile.id,
        email: profile.email,
        created_at: profile.created_at,
        full_name: profile.full_name,
        address: profile.address,
        phone_number: profile.phone_number,
        point: userStats?.point,
        exp_level: userStats?.exp_level,
        total_weight: userStats?.total_weight,
      };
    });
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    toast.error('Failed to load user data');
  } finally {
    loading.value = false;
  }
};

// Filter users based on search query
const filteredUsers = computed(() => {
  if (!searchQuery.value) return combinedUsers.value;
  const query = searchQuery.value.toLowerCase();
  return combinedUsers.value.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone_number?.toLowerCase().includes(query) ||
      user.address?.toLowerCase().includes(query)
  );
});

// Get badge level based on exp_level
const getBadgeLevel = (expLevel?: number | null) => {
  if (!expLevel) return 'empty';
  if (expLevel > 800) return 'platinum';
  if (expLevel > 300) return 'diamond';
  if (expLevel > 100) return 'gold';
  return 'empty';
};

// Get badge class for styling
const getBadgeClass = (expLevel?: number | null) => {
  const level = getBadgeLevel(expLevel);
  switch (level) {
    case 'platinum':
      return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
    case 'diamond':
      return 'bg-gradient-to-r from-blue-100 to-cyan-200 text-blue-900';
    case 'gold':
      return 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

// Helper to get initials from name
const getInitials = (name?: string | null) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

onMounted(async () => {
  await fetchCombinedUserData();
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
