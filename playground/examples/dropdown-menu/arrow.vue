<script setup lang="ts">
import { SButton, SDropdownMenu } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const menus: MenuOptionData<string>[] = [
  {
    isGroupLabel: true,
    value: 'myAccount',
    label: 'My Account'
  },
  { value: '01', label: 'Profile', icon: 'lucide:user', shortcut: ['command', 'shift', 'p'] },
  { value: '02', label: 'Billing', icon: 'lucide:credit-card', shortcut: ['command', 'b'] },
  { value: '03', label: 'Settings', icon: 'lucide:settings', shortcut: ['command', 's'] },
  { value: '04', label: 'Keyboard shortcuts', icon: 'lucide:keyboard', shortcut: ['command', 'k'], separator: true },
  { value: '05', label: 'Team', icon: 'lucide:users', shortcut: ['command', 'shift', 't'] },
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
  },
  {
    value: '07',
    label: 'Github',
    icon: 'simple-icons:github',
    linkProps: { href: 'https://github.com', target: '_blank' }
  },
  { value: '08', label: 'Support', icon: 'lucide:life-buoy' },
  { value: '09', label: 'API', icon: 'lucide:cloud', disabled: true, separator: true },
  { value: '10', label: 'Sign out', icon: 'lucide:log-out', shortcut: ['command', 'shift', 'Q'] }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Arrow</h3>
    <SDropdownMenu :items="menus" :show-arrow="true">
      <template #trigger>
        <SButton variant="pure">With Arrow</SButton>
      </template>
    </SDropdownMenu>
  </div>
</template>
