<script setup lang="ts">
import BasicPage from '~/app/components/global-layout/BasicPage.vue';

import DataTable from '~/app/components/DataTable.vue';
import { columns, type User } from './columns';

const users = ref<User[]>([
  {
    id: 'usr-001',
    email: 'super.admin@example.com',
    role: 'superadmin',
    status: 'active',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    phoneNumber: '+6281234567890',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-06-20'),
    name: 'John Doe', // Opsional jika ingin menggunakan name
    lastLogin: '2023-06-20T08:30:00Z',
  },
  {
    id: 'usr-002',
    email: 'store.manager@example.com',
    role: 'manager',
    status: 'active',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    phoneNumber: '+6289876543210',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-06-18'),
    lastLogin: '2023-06-18T14:15:00Z',
  },
  {
    id: 'usr-003',
    email: 'cashier.one@example.com',
    role: 'cashier',
    status: 'active',
    firstName: 'Robert',
    lastName: 'Johnson',
    username: 'robertj',
    phoneNumber: '+6285678912340',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-06-19'),
    lastLogin: '2023-06-19T11:20:00Z',
  },
  {
    id: 'usr-004',
    email: 'admin.one@example.com',
    role: 'admin',
    status: 'inactive',
    firstName: 'Emily',
    lastName: 'Davis',
    username: 'emilyd',
    phoneNumber: '+6283456789012',
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-06-15'),
    lastLogin: '2023-06-10T09:45:00Z',
  },
  {
    id: 'usr-005',
    email: 'new.cashier@example.com',
    role: 'cashier',
    status: 'invited',
    firstName: 'Michael',
    lastName: 'Wilson',
    username: 'michaelw',
    phoneNumber: '+6286789012345',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01'),
    lastLogin: null,
  },
  {
    id: 'usr-006',
    email: 'suspended.admin@example.com',
    role: 'admin',
    status: 'suspended',
    firstName: 'Sarah',
    lastName: 'Brown',
    username: 'sarahb',
    phoneNumber: '+6287890123456',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-05'),
    lastLogin: '2023-05-30T16:30:00Z',
  },
]);
</script>

<template>
  <BasicPage title="Users" description="Users Management" sticky>
    <template #actions> </template>
    <div class="overflow-x-auto">
      <DataTable :data="users" :columns="columns" />
    </div>
  </BasicPage>
</template>
