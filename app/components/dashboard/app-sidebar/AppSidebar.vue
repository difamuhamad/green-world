<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="w-full h-full">
        <img src="/images/navbar-logo.png" alt="green world" />
      </div>
      <!-- <TeamSwitcher :teams="data.teams" /> -->
    </SidebarHeader>
    <SidebarContent>
      <NavMain :projects="data.projects" />
      <!-- <NavOthers :items="data.navMain" /> -->
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="adminStore" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import type { SidebarProps } from '../../ui/sidebar';

import {
  AudioWaveform,
  ChartNoAxesCombined,
  Command,
  Focus,
  GalleryVerticalEnd,
  Map,
  Refrigerator,
  Settings2,
  ShoppingBasket,
  Users,
} from 'lucide-vue-next';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '../../ui/sidebar';
import NavOthers from './NavOthers.vue';
import NavUser from './NavUser.vue';
import NavMain from './NavMain.vue';

const adminStore = useAdminStore();
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
});

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Komodo Water',
      logo: GalleryVerticalEnd,
      plan: 'Startup',
    },
    {
      name: 'Government',
      logo: AudioWaveform,
      plan: 'Enterprise',
    },
    {
      name: 'Some Corp',
      logo: Command,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Theme',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Monitoring',
      url: '/browser-app/admin/dashboard',
      icon: ChartNoAxesCombined,
    },
    {
      name: 'GIS Map',
      url: '/browser-app/admin/dashboard/map',
      icon: Map,
    },
    {
      name: 'RVM List',
      url: '/browser-app/admin/dashboard/machines',
      icon: Refrigerator,
    },
    {
      name: 'Point Store',
      url: '/browser-app/admin/dashboard/point-store',
      icon: ShoppingBasket,
    },
    {
      name: 'User Management',
      url: '/browser-app/admin/dashboard/users',
      icon: Users,
    },
    {
      name: 'Realtime Detector',
      url: '/browser-app/admin/dashboard/detector',
      icon: Focus,
    },
  ],
};
</script>
