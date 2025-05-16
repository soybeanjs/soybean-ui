<script setup lang="ts">
import { SCard, SContextMenu } from 'soy-ui';
import type { MenuOptionData } from 'soy-ui';
import {
  CirclePlus,
  Cloud,
  CreditCard,
  Facebook,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageCircle,
  Settings,
  Twitter,
  User,
  UserPlus,
  Users
} from 'lucide-vue-next';

defineOptions({
  name: 'DemoContextMenu'
});

const menus: MenuOptionData<string>[] = [
  {
    isGroupLabel: true,
    value: 'myAccount',
    label: 'My Account',
    separator: true
  },
  { value: '01', label: 'Profile', icon: User, shortcut: ['command', 'shift', 'p'] },
  { value: '02', label: 'Billing', icon: CreditCard, shortcut: ['command', 'b'] },
  { value: '03', label: 'Settings', icon: Settings, shortcut: ['command', 's'] },
  { value: '04', label: 'Keyboard shortcuts', icon: Keyboard, shortcut: ['command', 'k'], separator: true },
  { value: '05', label: 'Team', icon: Users, shortcut: ['command', 'shift', 't'] },
  {
    value: '06',
    label: 'Invite Users',
    icon: UserPlus,
    separator: true,
    children: [
      { value: '0601', label: 'Email', icon: Mail, shortcut: ['command', 'shift', 'e'] },
      { value: '0602', label: 'Facebook', icon: Facebook, shortcut: ['command', 'shift', 'f'] },
      { value: '0603', label: 'Twitter', icon: Twitter, shortcut: ['command', 'shift', 't'], separator: true },
      {
        value: '0604',
        label: 'More',
        icon: CirclePlus,
        children: [{ value: '060401', label: 'Message', icon: MessageCircle, shortcut: ['command', 'm'] }]
      }
    ]
  },
  {
    value: '07',
    label: 'Github',
    icon: Github,
    linkProps: { href: 'https://github.com', target: '_blank' }
  },
  { value: '08', label: 'Support', icon: LifeBuoy },
  { value: '09', label: 'API', icon: Cloud, disabled: true, separator: true },
  { value: '10', label: 'Sign out', icon: LogOut, shortcut: ['command', 'shift', 'Q'] }
];
</script>

<template>
  <SCard title="ContextMenu" split>
    <SContextMenu :items="menus">
      <template #trigger>
        <div class="h-50 w-80 flex items-center justify-center border rounded-md border-dashed text-sm">
          Right click here
        </div>
      </template>
    </SContextMenu>
  </SCard>
</template>
