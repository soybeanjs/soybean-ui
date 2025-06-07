<script setup lang="ts">
import { Rocket, X } from 'lucide-vue-next';
import type { ThemeSize } from '@theme';
import { Card } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <Card title="Card" :ui="{ content: 'flex-c-stretch gap-4' }">
    <Card title="Size" split>
      <div class="w-1/2 i-flex-c pr-10px lt-sm:(w-full pr-0)">
        <Card v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" class="mb-12px">
          <template #extra>
            <span>extra</span>
          </template>
          <p class="text-gray-500 dark:text-neutral-400">Content</p>
          <template #footer>Footer</template>
        </Card>
      </div>
      <div class="w-1/2 i-flex-c pl-10px lt-sm:(w-full pl-0)">
        <Card v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" split class="mb-12px">
          <template #extra>
            <X />
          </template>
          <p class="text-gray-500 dark:text-neutral-400">Content</p>
          <template #footer>Footer</template>
        </Card>
      </div>
    </Card>
    <Card title="More" split :ui="{ content: 'flex-c-stretch gap-4' }">
      <Card>
        <p class="text-gray-500 dark:text-neutral-400">Only Content</p>
      </Card>
      <Card title="Title" split>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </Card>
      <Card split>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </Card>
      <Card title="Title Slot" split>
        <template #title-leading>
          <Rocket />
        </template>
        <template #title-trailing>
          <span>Trailing</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </Card>
    </Card>
    <Card title="Description" split description="this is a description">
      <template #title-leading>
        <Rocket />
      </template>
      <template #title-trailing>
        <span>Trailing</span>
      </template>
      <template #extra>
        <X />
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </Card>
  </Card>
</template>
