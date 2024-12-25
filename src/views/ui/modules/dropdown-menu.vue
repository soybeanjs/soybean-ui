<script setup lang="ts">
import { SButton, SDropdownMenu, SDropdownMenuCheckbox, SDropdownMenuRadio } from '@soybean-ui/vue';
import type {
  DropdownMenuCheckboxOption,
  DropdownMenuItemOption,
  DropdownMenuOptionType,
  ThemeSize
} from '@soybean-ui/vue';
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
import { ref } from 'vue';

defineOptions({
  name: 'UiDropdownMenu'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const menus: DropdownMenuOptionType[] = [
  {
    groupId: 'myAccount',
    label: 'My Account',
    separator: true,
    items: [
      { value: '01', label: 'Profile', icon: User, shortcut: '⇧⌘P' },
      { value: '02', label: 'Billing', icon: CreditCard, shortcut: '⌘B' },
      { value: '03', label: 'Settings', icon: Settings, shortcut: '⌘S' },
      { value: '04', label: 'Keyboard shortcuts', icon: Keyboard, shortcut: '⌘K', separator: true }
    ]
  },
  { value: '05', label: 'Team', icon: Users, shortcut: '⇧⌘T' },
  {
    label: 'Invite Users',
    icon: UserPlus,
    separator: true,
    items: [
      { value: '06', label: 'Email', icon: Mail, shortcut: '⇧⌘E' },
      { value: '07', label: 'Facebook', icon: Facebook, shortcut: '⇧⌘F' },
      { value: '08', label: 'Twitter', icon: Twitter, shortcut: '⇧⌘T', separator: true },
      {
        value: '09',
        label: 'More',
        icon: CirclePlus,
        items: [{ value: '0901', label: 'Message', icon: MessageCircle, shortcut: '⌘M' }]
      }
    ]
  },
  { value: '12', label: 'Github', icon: Github },
  { value: '13', label: 'Support', icon: LifeBuoy },
  { value: '14', label: 'API', icon: Cloud, disabled: true, separator: true },
  { value: '15', label: 'Sign out', icon: LogOut }
];

function handleSelect(item: DropdownMenuItemOption) {
  console.log('Selected:', item);
}

const items: DropdownMenuCheckboxOption[] = [
  { value: '01', label: 'Profile', icon: User, shortcut: '⇧⌘P' },
  { value: '02', label: 'Billing', icon: CreditCard, shortcut: '⌘B' },
  { value: '03', label: 'Settings', icon: Settings, shortcut: '⌘S', separator: true },
  { value: '04', label: 'Keyboard shortcuts', icon: Keyboard, shortcut: '⌘K' }
];

const checks = ref(['01']);

const placement = ref('top-start');

const placements = [
  { value: 'top-start', label: 'Top Start' },
  { value: 'top', label: 'Top' },
  { value: 'top-end', label: 'Top End' },
  { value: 'right-start', label: 'Right Start' },
  { value: 'right', label: 'Right' },
  { value: 'right-end', label: 'Right End' },
  { value: 'bottom-start', label: 'Bottom Start' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-end', label: 'Bottom End' },
  { value: 'left-start', label: 'Left Start' },
  { value: 'left', label: 'Left' },
  { value: 'left-end', label: 'Left End' }
];
</script>

<template>
  <div class="py-12px text-18px">Size</div>
  <div class="w-fit flex-c gap-12px">
    <SDropdownMenu v-for="size in sizes" :key="size" :size="size" :items="menus" @select="handleSelect">
      <template #trigger>
        <SButton variant="pure" :size="size">{{ size }} Dropdown</SButton>
      </template>
    </SDropdownMenu>
  </div>
  <div class="py-12px text-18px">With Arrow</div>
  <SDropdownMenu :items="menus" show-arrow>
    <template #trigger>
      <SButton variant="pure">Open Dropdown</SButton>
    </template>
  </SDropdownMenu>
  <div class="py-12px text-18px">Checkbox</div>
  <SDropdownMenuCheckbox v-model="checks" group-label="My Account" group-separator :items="items">
    <template #trigger>
      <SButton variant="pure">Checkbox Dropdown</SButton>
    </template>
  </SDropdownMenuCheckbox>
  <div class="py-12px text-18px">Radio</div>
  <SDropdownMenuRadio v-model="placement" group-label="Tooltip placement" group-separator :items="placements">
    <template #trigger>
      <SButton variant="pure">Radio Dropdown</SButton>
    </template>
  </SDropdownMenuRadio>
</template>

<style scoped></style>
