<script setup lang="ts">
import { SButtonIcon, SCard } from '@soybean-ui/vue';
import type { CardSplit, ThemeSize } from '@soybean-ui/vue';
import { X } from 'lucide-vue-next';

defineOptions({
  name: 'UiCard'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const splits: CardSplit[] = ['all', 'header', 'footer'];
</script>

<template>
  <div class="w-800px lt-sm:w-full">
    <div class="py-12px text-18px">Size</div>
    <div class="w-1/2 i-flex-c pr-10px lt-sm:(w-full pr-0)">
      <SCard v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" class="mb-12px">
        <template #extra>
          <span>extra</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
    </div>
    <div class="w-1/2 i-flex-c pl-10px lt-sm:(w-full pl-0)">
      <SCard v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" split="all" class="mb-12px">
        <template #extra>
          <span>extra</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
    </div>
  </div>
  <div class="w-400px lt-sm:w-full">
    <div class="py-12px text-18px">Split</div>
    <SCard v-for="split in splits" :key="split" :title="`Split: ${split}`" :split="split" class="mb-12px">
      <template #extra>
        <SButtonIcon fit-content>
          <X />
        </SButtonIcon>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
      <template #footer>Footer</template>
    </SCard>
    <div class="py-12px text-18px">More</div>
    <SCard class="mb-12px">
      <p class="text-gray-500 dark:text-neutral-400">Only Content</p>
    </SCard>
    <SCard title="Title" split="header" class="mb-12px">
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </SCard>
    <SCard split="footer">
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
      <template #footer>Footer</template>
    </SCard>
  </div>
</template>

<style scoped></style>
