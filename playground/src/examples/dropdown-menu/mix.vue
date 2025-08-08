<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDropdownMenuWrapper, SMenuCheckboxOptions, SMenuOptions, SMenuRadioOptions } from '@ui';
import type { MenuCheckboxOptionData, MenuOptionData, MenuRadioOptionData } from '@ui';

const menus: MenuOptionData<string>[] = [
  {
    isGroupLabel: true,
    value: 'MenuOption',
    label: 'MenuOption'
  },
  { value: '01', label: 'Profile', icon: 'lucide:user', shortcut: ['command', 'shift', 'p'] },
  { value: '02', label: 'Billing', icon: 'lucide:credit-card', shortcut: ['command', 'b'] },
  { value: '03', label: 'Settings', icon: 'lucide:settings', shortcut: ['command', 's'] },
  {
    value: '06',
    label: 'Invite Users',
    icon: 'lucide:user-plus',
    separator: true,
    children: [
      { value: '0601', label: 'Email', icon: 'lucide:mail', shortcut: ['command', 'shift', 'e'] },
      { value: '0602', label: 'Facebook', icon: 'simple-icons:facebook', shortcut: ['command', 'shift', 'f'] },
      { value: '0603', label: 'Twitter', icon: 'simple-icons:x', shortcut: ['command', 'shift', 't'], separator: true },
      {
        value: '0604',
        label: 'More',
        icon: 'lucide:circle-plus',
        children: [{ value: '060401', label: 'Message', icon: 'lucide:message-circle', shortcut: ['command', 'm'] }]
      }
    ]
  }
];

const checkbox = ref(['vue', 'solid']);

const checkboxes: MenuCheckboxOptionData<string>[] = [
  { isGroupLabel: true, value: 'JSFramework', label: 'JS Frameworks' },
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
  { value: 'react', label: 'React', icon: 'logos:react' },
  { value: 'angular', label: 'Angular', icon: 'logos:angular' },
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte' },
  { value: 'solid', label: 'Solid', icon: 'logos:solid' },
  { value: 'preact', label: 'Preact', icon: 'logos:preact', separator: true }
];

const radio = ref('left');

const radios: MenuRadioOptionData<string>[] = [
  { isGroupLabel: true, value: 'Side', label: 'Side' },
  { value: 'top', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' }
];
</script>

<template>
  <SCard title="Mix">
    <SDropdownMenuWrapper>
      <template #trigger>
        <SButton variant="pure">Open Mix Dropdown</SButton>
      </template>
      <SMenuOptions :items="menus" />
      <SMenuCheckboxOptions v-model="checkbox" :items="checkboxes" />
      <SMenuRadioOptions v-model="radio" :items="radios" />
    </SDropdownMenuWrapper>
  </SCard>
</template>
