<script setup lang="ts">
import { SButtonIcon, SCard } from 'soy-ui';
import type { ThemeSize } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';

defineOptions({
  name: 'UiCard'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="lt-sm:w-full">
    <div class="py-12px text-18px">Size</div>
    <div class="w-1/2 i-flex-c pr-10px lt-sm:(w-full pr-0)">
      <SCard v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" class="mb-12px">
        <template #extra>
          <span>extra</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Body</p>
        <template #footer>Footer</template>
      </SCard>
    </div>
    <div class="w-1/2 i-flex-c pl-10px lt-sm:(w-full pl-0)">
      <SCard v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" split class="mb-12px">
        <template #extra>
          <SButtonIcon fit-content :size="size">
            <X />
          </SButtonIcon>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Body</p>
        <template #footer>Footer</template>
      </SCard>
    </div>
  </div>

  <div class="w-400px lt-sm:w-full">
    <div class="py-12px text-18px">More</div>
    <SCard class="mb-12px">
      <p class="text-gray-500 dark:text-neutral-400">Only Body</p>
    </SCard>
    <SCard title="Title" split class="mb-12px">
      <p class="text-gray-500 dark:text-neutral-400">Body</p>
    </SCard>
    <SCard split>
      <p class="text-gray-500 dark:text-neutral-400">Body</p>
      <template #footer>Footer</template>
    </SCard>
  </div>
</template>
