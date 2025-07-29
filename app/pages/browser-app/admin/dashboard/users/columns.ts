import { h } from 'vue';
import Badge from '~/app/components/ui/badge/Badge.vue';
import Checkbox from '~/app/components/ui/checkbox/Checkbox.vue';
import { format } from 'date-fns';
import {
  HeaderContext,
  ColumnDef,
  CellContext,
  Row,
} from '@tanstack/vue-table';

// Definisikan tipe User sesuai dengan struktur data kita
export type User = {
  id: string; // Ubah dari number ke string
  email: string;
  role: 'superadmin' | 'admin' | 'cashier' | 'manager';
  status: 'active' | 'inactive' | 'invited' | 'suspended';
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  // Tambahkan properti opsional jika perlu
  name?: string;
  lastLogin?: string | null;
};

// Type untuk filter function
type FilterFn = (row: Row<User>, id: string, value: any) => boolean;

// Type untuk variant Badge yang sesuai dengan komponen Anda
type BadgeVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | null
  | undefined;

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }: HeaderContext<User, unknown>) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) =>
          table.toggleAllPageRowsSelected(value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }: CellContext<User, unknown>) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(value),
        'aria-label': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }: CellContext<User, unknown>) =>
      h('div', { class: 'text-right' }, row.getValue('id')),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: CellContext<User, unknown>) => {
      return h('div', { class: 'flex space-x-2' }, [
        h(
          'span',
          {
            class: 'max-w-[200px] truncate font-medium',
          },
          row.getValue('name')
        ),
      ]);
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }: CellContext<User, unknown>) => {
      return h('div', { class: 'flex space-x-2' }, [
        h(
          'span',
          {
            class: 'max-w-[200px] truncate',
          },
          row.getValue('email')
        ),
      ]);
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }: CellContext<User, unknown>) => {
      const role = row.getValue('role') as User['role'];
      return h(
        Badge,
        {
          variant: 'outline' as BadgeVariant,
          class: 'capitalize',
        },
        role.toLowerCase()
      );
    },
    filterFn: ((row: Row<User>, id: string, value: any) => {
      return value.includes(row.getValue(id));
    }) as FilterFn,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: CellContext<User, unknown>) => {
      const status = row.getValue('status') as User['status'];

      const variantMap: Record<User['status'], BadgeVariant> = {
        active: 'default',
        inactive: 'destructive',
        invited: 'secondary',
        suspended: 'secondary',
      };

      return h(
        Badge,
        {
          variant: variantMap[status],
        },
        status
      );
    },
    filterFn: ((row: Row<User>, id: string, value: any) => {
      return value.includes(row.getValue(id));
    }) as FilterFn,
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }: CellContext<User, unknown>) => {
      const date = row.getValue('lastLogin');

      if (!date) {
        return h('span', { class: 'text-muted-foreground' }, 'Never logged in');
      }

      return format(new Date(date), 'PPpp');
    },
  },
];
