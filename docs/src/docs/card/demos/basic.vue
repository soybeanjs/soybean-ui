<script setup lang="ts">
import { SButton, SCard } from '@soybeanjs/ui';
</script>

<template>
  <div class="max-w-md">
    <SCard title="Card Title" description="Card Description">
      <template #extra>
        <SButton size="small" variant="ghost">Action</SButton>
      </template>
      <p class="text-gray-600 dark:text-gray-300">This is the content of the card. It can contain any elements.</p>
      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <SButton variant="outline">Cancel</SButton>
          <SButton>Submit</SButton>
        </div>
      </template>
    </SCard>
  </div>
</template>
