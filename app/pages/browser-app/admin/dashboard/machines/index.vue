<template>
  <client-only>
    <BasicPage
      title="RVM"
      description="Reverse Vending Machine Analytics"
      sticky
    >
      <!-- Add Machine Form -->
      <div class="m-5 p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Add New Machine</h2>
        <form @submit.prevent="addMachine" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="machine-name">Machine Name</Label>
              <Input
                id="machine-name"
                v-model="newMachine.machine_name"
                required
              />
            </div>
            <div>
              <Label for="province">Province</Label>
              <Input id="province" v-model="newMachine.province" required />
            </div>
            <div>
              <Label for="address">Address</Label>
              <Input id="address" v-model="newMachine.address" required />
            </div>
            <div class="flex space-x-2">
              <div class="flex-1">
                <Label for="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  v-model="newMachine.latitude"
                  type="number"
                  step="0.000001"
                  required
                />
              </div>
              <div class="flex-1">
                <Label for="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  v-model="newMachine.longitude"
                  type="number"
                  step="0.000001"
                  required
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              @click="getCurrentLocation"
              :disabled="gettingLocation"
            >
              <MapPin class="w-4 h-4 mr-2" />
              {{
                gettingLocation ? 'Getting Location...' : 'Use Current Location'
              }}
            </Button>
            <Button type="submit" :disabled="addingMachine">
              <Plus class="w-4 h-4 mr-2" />
              {{ addingMachine ? 'Adding...' : 'Add Machine' }}
            </Button>
          </div>
        </form>
      </div>

      <!-- Machine List with Actions -->
      <div class="m-5">
        <Card>
          <CardHeader>
            <CardTitle>Machine List</CardTitle>
            <CardDescription>Manage your vending machines</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine Name</TableHead>
                  <TableHead>Province</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead class="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="machine in machines" :key="machine.id">
                  <TableCell class="font-medium">
                    {{ machine.machine_name }}
                  </TableCell>
                  <TableCell>{{ machine.province }}</TableCell>
                  <TableCell class="max-w-[200px] truncate">
                    {{ machine.address }}
                  </TableCell>
                  <TableCell>
                    {{ machine.latitude?.toFixed(4) }},
                    {{ machine.longitude?.toFixed(4) }}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal class="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          class="text-red-600"
                          @click="deleteMachine(machine.id)"
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
    </BasicPage>
  </client-only>
</template>

<script setup lang="ts">
import { MapPin, Plus, MoreHorizontal, Trash2 } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import type { VendingMachine } from '~/types';
import BasicPage from '~/components/global-layout/BasicPage.vue';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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
import { toast } from 'vue-sonner';

const addingMachine = ref(false);
const gettingLocation = ref(false);
const supabase = useSupabaseClient();
const machines = ref<VendingMachine[]>([]);

const newMachine = ref({
  machine_name: '',
  province: '',
  address: '',
  latitude: null as number | null,
  longitude: null as number | null,
});

// Fetch machines
const fetchMachines = async () => {
  try {
    const { data, error } = await supabase
      .from('machine_location')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    machines.value = data || [];
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch machines',
      variant: 'destructive',
    });
  }
};

// Add new machine
const addMachine = async () => {
  addingMachine.value = true;
  try {
    const { data, error } = await supabase
      .from('machine_location')
      .insert([newMachine.value])
      .select();

    if (error) throw error;

    if (data?.[0]) {
      machines.value.unshift(data[0]);
      toast({
        title: 'Success',
        description: 'Machine added successfully',
      });
      resetForm();
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to add machine',
      variant: 'destructive',
    });
  } finally {
    addingMachine.value = false;
  }
};

// Delete machine
const deleteMachine = async (id: number) => {
  try {
    const { error } = await supabase
      .from('machine_location')
      .delete()
      .eq('id', id);

    if (error) throw error;

    machines.value = machines.value.filter(
      (machine: VendingMachine) => machine.id !== id
    );
    toast({
      title: 'Success',
      description: 'Machine deleted successfully',
    });
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to delete machine',
      variant: 'destructive',
    });
  }
};

// Get current location
const getCurrentLocation = () => {
  gettingLocation.value = true;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        newMachine.value.latitude = position.coords.latitude;
        newMachine.value.longitude = position.coords.longitude;
        gettingLocation.value = false;
      },
      (error) => {
        toast({
          title: 'Error',
          description: 'Failed to get current location',
          variant: 'destructive',
        });
        gettingLocation.value = false;
      }
    );
  } else {
    toast({
      title: 'Error',
      description: 'Geolocation is not supported by this browser',
      variant: 'destructive',
    });
    gettingLocation.value = false;
  }
};

const resetForm = () => {
  newMachine.value = {
    machine_name: '',
    province: '',
    address: '',
    latitude: null,
    longitude: null,
  };
};

onMounted(async () => {
  await fetchMachines();
});

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
