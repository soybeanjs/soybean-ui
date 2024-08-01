<script setup lang="ts">
import { SButton, SCard } from '@soybean-unify/ui';
import { Moon } from 'lucide-vue-next';

defineOptions({
  name: 'UiCard'
});
</script>

<template>
  <SCard title="Create project" description="Deploy your new project in one-click." class="mb-24px w-400px">
    <template #extra>
      <SButton color="secondary" variant="text" shape="square">
        <Moon :size="16" />
      </SButton>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <template #footer>
      <SButton class="w-full">Create</SButton>
    </template>
  </SCard>
  <SCard title="Create project" class="mb-24px h-360px w-400px">
    <template #extra>
      <SButton color="secondary" variant="text" shape="square">
        <Moon :size="16" />
      </SButton>
    </template>
    <div class="h-full overflow-auto">
      <p v-for="i in 10" :key="i" class="text-gray-500 dark:text-neutral-400">
        With supporting text below as a natural lead-in to additional content.
      </p>
    </div>
    <template #footer>
      <SButton class="w-full">Create</SButton>
    </template>
  </SCard>
  <SCard class="w-400px">
    <p class="text-gray-500 dark:text-neutral-400">
      With supporting text below as a natural lead-in to additional content.
    </p>
  </SCard>
</template>

<style scoped></style>
