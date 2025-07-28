<template>
  <Html class="light">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
          </div>
        </header>
        <!-- Content Here -->
        <main>
          <div class="mx-5">
            <slot />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  </Html>
</template>

<script lang="ts">
export const description = 'A sidebar that collapses to icons.';
export const iframeHeight = '800px';
export const containerClass = 'w-full h-full';
const themeClass = 'light';
</script>

<script setup lang="ts">
import AppSidebar from '../components/dashboard/app-sidebar/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { Separator } from '../components/ui/separator';
</script>
