<template>
  <client-only>
    <BasicPage
      title="Reward Items"
      description="Manage your reward products"
      sticky
    >
      <!-- Add Reward Form -->
      <div class="m-5 p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Add New Reward</h2>
        <form @submit.prevent="addReward" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label class="mb-2" for="product-name">Product Name</Label>
              <Input
                id="product-name"
                v-model="newReward.nama_produk"
                required
              />
            </div>
            <div>
              <Label class="mb-2" for="point-price">Point Price</Label>
              <Input
                id="point-price"
                v-model="newReward.point_price"
                type="number"
                min="0"
                placeholder="e.g., 500"
                required
              />
            </div>
            <div class="md:col-span-2">
              <Label class="mb-2" for="image-url">Image URL</Label>
              <Input
                id="image-url"
                v-model="newReward.image_url"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <Button type="button" variant="outline" @click="resetForm">
              Reset
            </Button>
            <Button type="submit" :disabled="addingReward">
              <Plus class="w-4 h-4 mr-2" />
              {{ addingReward ? 'Adding...' : 'Add Reward' }}
            </Button>
          </div>
        </form>
      </div>

      <!-- Reward List with Actions -->
      <div class="m-5">
        <Card>
          <CardHeader>
            <div class="flex justify-between items-center">
              <div>
                <CardTitle>Reward Items</CardTitle>
                <CardDescription>Manage your reward products</CardDescription>
              </div>
              <div class="flex space-x-2">
                <Input
                  v-model="searchQuery"
                  placeholder="Search rewards..."
                  class="max-w-[300px]"
                />
                <Button variant="outline" @click="fetchRewards">
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
                  <TableHead class="w-[100px]">Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Point Price</TableHead>
                  <TableHead class="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="reward in filteredRewards" :key="reward.id">
                  <TableCell>
                    <Avatar v-if="reward.image_url">
                      <AvatarImage :src="reward.image_url" />
                      <AvatarFallback>
                        {{ reward.nama_produk.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <Avatar v-else>
                      <AvatarFallback>
                        {{ reward.nama_produk.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell class="font-medium">
                    {{ reward.nama_produk }}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" class="px-3 py-1">
                      {{ reward.point_price }} pts
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal class="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem @click="editReward(reward)">
                          <Pencil class="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          class="text-red-600"
                          @click="deleteReward(reward.id)"
                        >
                          <Trash2 class="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- Edit Dialog -->
      <Dialog v-model:open="isEditDialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
            <DialogDescription>
              Update the reward item details
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="edit-name" class="text-right"> Product Name </Label>
              <Input
                id="edit-name"
                v-model="editingReward.nama_produk"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="edit-points" class="text-right"> Point Price </Label>
              <Input
                id="edit-points"
                v-model="editingReward.point_price"
                type="number"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="edit-image" class="text-right"> Image URL </Label>
              <Input
                id="edit-image"
                v-model="editingReward.image_url"
                class="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="isEditDialogOpen = false">
              Cancel
            </Button>
            <Button type="submit" @click="updateReward"> Save Changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BasicPage>
  </client-only>
</template>

<script setup lang="ts">
import {
  Plus,
  MoreHorizontal,
  Trash2,
  Pencil,
  RefreshCw,
} from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';
import BasicPage from '~/components/global-layout/BasicPage.vue';
import { toast } from 'vue-sonner';

// UI Components
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface RewardItem {
  id?: number;
  nama_produk: string;
  image_url: string | null;
  point_price: number;
}

const supabase = useSupabaseClient();
const rewards = ref<RewardItem[]>([]);
const loading = ref(false);
const addingReward = ref(false);
const updatingReward = ref(false);
const searchQuery = ref('');
const isEditDialogOpen = ref(false);

const newReward = ref<RewardItem>({
  nama_produk: '',
  image_url: null,
  point_price: 0,
});

const editingReward = ref<RewardItem>({
  id: 0,
  nama_produk: '',
  image_url: null,
  point_price: 0,
});

// Filter rewards based on search query
const filteredRewards = computed(() => {
  if (!searchQuery.value) return rewards.value;
  return rewards.value.filter((reward) =>
    reward.nama_produk.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Fetch rewards from database
const fetchRewards = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('reward_item')
      .select('*')
      .order('point_price', { ascending: true });

    if (error) throw error;
    rewards.value = data || [];
  } catch (error) {
    toast.error('Failed to fetch rewards', {
      description: 'Please try again later',
    });
  } finally {
    loading.value = false;
  }
};

// Add new reward
const addReward = async () => {
  addingReward.value = true;
  try {
    const { data, error } = await supabase
      .from('reward_item')
      .insert([
        {
          nama_produk: newReward.value.nama_produk,
          image_url: newReward.value.image_url || null,
          point_price: newReward.value.point_price,
        },
      ])
      .select();

    if (error) throw error;

    if (data?.[0]) {
      rewards.value.unshift(data[0]);
      toast.success('Reward added successfully');
      resetForm();
    }
  } catch (error) {
    toast.error('Failed to add reward', {
      description: 'Please check your input',
    });
  } finally {
    addingReward.value = false;
  }
};

// Edit reward
const editReward = (reward: RewardItem) => {
  editingReward.value = { ...reward };
  isEditDialogOpen.value = true;
};

// Update reward
const updateReward = async () => {
  updatingReward.value = true;
  try {
    const { data, error } = await supabase
      .from('reward_item')
      .update({
        nama_produk: editingReward.value.nama_produk,
        image_url: editingReward.value.image_url,
        point_price: editingReward.value.point_price,
      })
      .eq('id', editingReward.value.id)
      .select();

    if (error) throw error;

    if (data?.[0]) {
      const index = rewards.value.findIndex((r) => r.id === data[0].id);
      if (index !== -1) {
        rewards.value[index] = data[0];
      }
      toast.success('Reward updated successfully');
      isEditDialogOpen.value = false;
    }
  } catch (error) {
    toast.error('Failed to update reward', {
      description: 'Please try again later',
    });
  } finally {
    updatingReward.value = false;
  }
};

// Delete reward
const deleteReward = async (id: number | undefined) => {
  try {
    const { error } = await supabase.from('reward_item').delete().eq('id', id);

    if (error) throw error;

    rewards.value = rewards.value.filter((reward) => reward.id !== id);
    toast.success('Reward deleted successfully');
  } catch (error) {
    toast.error('Failed to delete reward', {
      description: 'Please try again later',
    });
  }
};

// Reset form
const resetForm = () => {
  newReward.value = {
    nama_produk: '',
    image_url: null,
    point_price: 0,
  };
};

onMounted(async () => {
  await fetchRewards();
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
