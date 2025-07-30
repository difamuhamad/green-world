<template>
  <BasicPage title="Users" description="Users Management" sticky>
    <div class="overflow-x-auto">
      <DataTable :data="users" :columns="columns" />
    </div>
  </BasicPage>
</template>

<script setup lang="ts">
import DataTable from '../../../../../components/DataTable.vue';
import { columns } from '../../../../../composables/columns';
import BasicPage from '../../../../../components/global-layout/BasicPage.vue';
import type { User } from '../../../../../data/schema';

const users: User[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alice.johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '+1 202-555-0110',
    status: 'active',
    role: 'admin',
    createdAt: new Date('2022-04-01T10:20:30Z'),
    updatedAt: new Date('2025-07-29T12:15:00Z'),
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bob.smith',
    email: 'bob.smith@example.com',
    phoneNumber: '+1 303-555-0175',
    status: 'inactive',
    role: 'cashier',
    createdAt: new Date('2021-08-15T09:10:00Z'),
    updatedAt: new Date('2025-07-28T18:45:00Z'),
  },
  {
    id: '3',
    firstName: 'Clara',
    lastName: 'Nguyen',
    username: 'clara.nguyen',
    email: 'clara.nguyen@example.com',
    phoneNumber: '+62 812-3456-7890',
    status: 'invited',
    role: 'manager',
    createdAt: new Date('2023-01-10T14:00:00Z'),
    updatedAt: new Date('2025-07-30T08:30:00Z'),
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Lee',
    username: 'david.lee',
    email: 'david.lee@example.com',
    phoneNumber: '+65 9001 2345',
    status: 'suspended',
    role: 'superadmin',
    createdAt: new Date('2020-06-20T17:30:00Z'),
    updatedAt: new Date('2025-07-29T21:00:00Z'),
  },
  {
    id: '5',
    firstName: 'Eva',
    lastName: 'Martinez',
    username: 'eva.martinez',
    email: 'eva.martinez@example.com',
    phoneNumber: '+34 612 345 678',
    status: 'active',
    role: 'admin',
    createdAt: new Date('2021-12-01T11:11:11Z'),
    updatedAt: new Date('2025-07-27T10:10:10Z'),
  },
];

definePageMeta({
  layout: 'dashboard-layout',
});
</script>
