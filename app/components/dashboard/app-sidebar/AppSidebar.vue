<script setup lang="ts">
import type { SidebarProps } from '../../ui/sidebar';

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  User,
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
import TeamSwitcher from './TeamSwitcher.vue';
import NavMain from './NavMain.vue';

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
      name: 'Chart Analytics',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'GIS Map',
      url: '#',
      icon: Map,
    },
    {
      name: 'User Management',
      url: '/browser-app/admin/dashboard/users',
      icon: User,
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :projects="data.projects" />
      <NavOthers :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
