<script lang="ts" setup>
import type { LayoutHeaderProps } from '~/app/types';

import BasicHeader from './BasicHeader.vue';

defineProps<LayoutHeaderProps>();
</script>

<template>
  <main>
    <BasicHeader :title="title" :description="description" class="mx-5">
      <template #actions>
        <slot name="actions" />
      </template>
    </BasicHeader>

    <main class="py-4">
      <slot />
    </main>
  </main>
</template>
