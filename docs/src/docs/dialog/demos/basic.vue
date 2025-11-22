<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SDialog } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDialog
    v-model:open="open"
    title="Edit Profile"
    description="Make changes to your profile here. Click save when you're done."
  >
    <template #trigger>
      <SButton variant="outline">Edit Profile</SButton>
    </template>

    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <label class="text-right text-sm font-medium">Name</label>
        <input
          class="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value="Pedro Duarte"
        />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <label class="text-right text-sm font-medium">Username</label>
        <input
          class="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value="@peduarte"
        />
      </div>
    </div>

    <template #footer>
      <SButton @click="open = false">Save changes</SButton>
    </template>
  </SDialog>
</template>
