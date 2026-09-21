<script setup lang="ts">
import { computed, ref } from 'vue';
import { SButton, SDropdownMenuWrapper, SMenuOptions, SSwitch } from '@vean/ui';
import type { MenuOptionData } from '@vean/ui';

const canDelete = ref(false);

const items = computed<MenuOptionData<string>[]>(() => [
  { label: 'Rename', value: 'rename', icon: 'lucide:pencil' },
  { label: 'Duplicate', value: 'duplicate', icon: 'lucide:copy' },
  { label: 'Delete', value: 'delete', icon: 'lucide:trash', hidden: !canDelete.value },
  {
    label: 'Share',
    value: 'share',
    children: [
      { label: 'Email', value: 'email' },
      { label: 'Internal channel', value: 'internal', hidden: true }
    ]
  }
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex-y-center gap-2">
      <SSwitch v-model="canDelete" />
      <span>Show the hidden "Delete" item</span>
    </div>
    <SDropdownMenuWrapper>
      <template #trigger>
        <SButton variant="outline">Open Menu</SButton>
      </template>
      <SMenuOptions :items="items" class="w-72" />
    </SDropdownMenuWrapper>
  </div>
</template>
