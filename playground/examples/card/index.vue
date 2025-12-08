<script setup lang="ts">
import { SCard, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Card" :ui="{ content: 'flex-c-stretch gap-4' }">
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
          <SIcon icon="lucide:rocket" />
        </template>
        <template #title-trailing>
          <span>Trailing</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </SCard>
    </SCard>
    <SCard title="Description" split description="this is a description">
      <template #title-leading>
        <SIcon icon="lucide:rocket" />
      </template>
      <template #title-trailing>
        <span>Trailing</span>
      </template>
      <template #extra>
        <SIcon icon="lucide:x" />
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </SCard>
  </SCard>
</template>
