<script setup lang="ts">
import { SBadge, SButtonIcon, SCard } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import { Rocket, X } from 'lucide-vue-next';

defineOptions({
  name: 'DemoCard'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Size" split>
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
        <SCard v-for="size in sizes" :key="size" :title="`Size: ${size}`" :size="size" split class="mb-12px">
          <template #extra>
            <SButtonIcon fit-content :size="size">
              <X />
            </SButtonIcon>
          </template>
          <p class="text-gray-500 dark:text-neutral-400">Content</p>
          <template #footer>Footer</template>
        </SCard>
      </div>
    </SCard>
    <SCard title="More" split :ui="{ content: 'flex-c-stretch gap-4' }">
      <SCard>
        <p class="text-gray-500 dark:text-neutral-400">Only Content</p>
      </SCard>
      <SCard title="Title" split>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </SCard>
      <SCard split>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
      <SCard title="Title Slot" split>
        <template #title-leading>
          <Rocket />
        </template>
        <template #title-trailing>
          <SBadge variant="soft">Badge</SBadge>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </SCard>
    </SCard>
  </div>
</template>
