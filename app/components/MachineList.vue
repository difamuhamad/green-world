<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[150px]">Machine Name</TableHead>
        <TableHead>Province</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Latitude</TableHead>
        <TableHead>Longitude</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="machine in machines"
        :key="machine.id || machine.machine_name"
      >
        <TableCell class="font-medium">
          {{ machine.machine_name }}
        </TableCell>
        <TableCell>{{ machine.province }}</TableCell>
        <TableCell>{{ machine.address }}</TableCell>
        <TableCell>{{ machine.latitude }}</TableCell>
        <TableCell>{{ machine.longitude }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
const props = defineProps<{
  machines: VendingMachine[];
}>();

import type { VendingMachine } from '../types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
</script>
