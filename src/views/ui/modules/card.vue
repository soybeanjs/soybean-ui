<script setup lang="ts">
import { SButtonIcon, SCard } from '@soybean-unify/ui';
import { CircleX, Expand, Settings, X } from 'lucide-vue-next';

defineOptions({
  name: 'UiCard'
});
</script>

<template>
  <div class="py-12px text-18px">Default Card</div>
  <SCard title="Title" description="Description" class="w-400px">
    <template #extra>
      <span>extra</span>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
    <template #footer>Footer</template>
  </SCard>
  <div class="py-12px text-18px">Split Card</div>
  <SCard title="Title" split="all" class="w-400px">
    <template #extra>
      <SButtonIcon>
        <X />
      </SButtonIcon>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
    <template #footer>Footer</template>
  </SCard>
  <div class="py-12px text-18px">Small size Card</div>
  <SCard title="Title" split="all" size="sm" class="w-400px">
    <template #extra>
      <SButtonIcon>
        <CircleX />
      </SButtonIcon>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
    <template #footer>Footer</template>
  </SCard>
  <div class="py-12px text-18px">Xs size Card</div>
  <SCard title="Title" split="all" size="xs" class="w-400px">
    <template #extra>
      <SButtonIcon>
        <Expand />
      </SButtonIcon>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
  </SCard>
  <div class="py-12px text-18px">Large size Card</div>
  <SCard title="Title" split="all" size="lg" class="w-400px">
    <template #extra>
      <SButtonIcon>
        <Settings />
      </SButtonIcon>
    </template>
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
  </SCard>
  <div class="py-12px text-18px">Only Content Card</div>
  <SCard class="w-400px">
    <p class="text-gray-500 dark:text-neutral-400">Content</p>
  </SCard>
</template>

<style scoped></style>
