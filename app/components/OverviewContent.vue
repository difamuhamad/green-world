<script lang="ts" setup>
import OverviewChart from './OverviewChart.vue';
import RecentTrans from './RecentTrans.vue';
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between pb-2 space-y-0"
      >
        <UiCardTitle class="text-sm font-medium"> Total Revenue </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between pb-2 space-y-0"
      >
        <UiCardTitle class="text-sm font-medium"> Subscriptions </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">+2350</div>
        <p class="text-xs text-muted-foreground">+180.1% from last month</p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between pb-2 space-y-0"
      >
        <UiCardTitle class="text-sm font-medium"> Sales </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">+12,234</div>
        <p class="text-xs text-muted-foreground">+19% from last month</p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between pb-2 space-y-0"
      >
        <UiCardTitle class="text-sm font-medium"> Active Now </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold">+573</div>
        <p class="text-xs text-muted-foreground">+201 since last hour</p>
      </UiCardContent>
    </UiCard>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
    <UiCard class="col-span-1 lg:col-span-4">
      <UiCardHeader>
        <UiCardTitle>Overview</UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <OverviewChart />
      </UiCardContent>
    </UiCard>
    <UiCard class="col-span-1 lg:col-span-3">
      <UiCardHeader>
        <UiCardTitle>Recent Sales</UiCardTitle>
        <UiCardDescription> You made 265 sales this month. </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <RecentTrans />
      </UiCardContent>
    </UiCard>
  </div>
</template>
