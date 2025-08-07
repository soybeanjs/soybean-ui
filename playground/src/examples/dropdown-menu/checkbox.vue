<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDropdownMenuCheckbox } from '@ui';
import type { MenuCheckboxOptionData } from '@ui';

const modelValue = ref<string[]>([]);

const items = ref<MenuCheckboxOptionData<string>[]>([
  { isGroupLabel: true, value: 'myAccount', label: 'My Account', separator: true },
  { value: '01', label: 'Profile', icon: 'lucide:user', shortcut: ['command', 'shift', 'p'] },
  { value: '02', label: 'Billing', icon: 'lucide:credit-card', shortcut: ['command', 'b'] },
  { value: '03', label: 'Settings', icon: 'lucide:settings', shortcut: ['command', 's'], separator: true },
  { value: '04', label: 'Keyboard shortcuts', icon: 'lucide:keyboard', shortcut: ['command', 'k'] }
]);
</script>

<template>
  <SCard title="Checkbox">
    <SDropdownMenuCheckbox v-model="modelValue" :items="items">
      <template #trigger>
        <SButton variant="pure">Checkbox</SButton>
      </template>
    </SDropdownMenuCheckbox>
  </SCard>
</template>
