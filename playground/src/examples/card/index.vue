<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Card } from '@ui';
</script>

<template>
  <Card title="Card" :ui="{ content: 'flex-c-stretch gap-4' }">
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
          <Icon icon="lucide:rocket" />
        </template>
        <template #title-trailing>
          <span>Trailing</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </Card>
    </Card>
    <Card title="Description" split description="this is a description">
      <template #title-leading>
        <Icon icon="lucide:rocket" />
      </template>
      <template #title-trailing>
        <span>Trailing</span>
      </template>
      <template #extra>
        <Icon icon="lucide:x" />
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </Card>
  </Card>
</template>
