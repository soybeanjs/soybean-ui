<script setup lang="ts">
import { ref } from 'vue';
import {
  SButton,
  SButtonGroup,
  SCard,
  SDropdownMenu,
  SDropdownMenuCheckbox,
  SDropdownMenuRadio,
  SSelect
} from 'soy-ui';
import type { MenuOptionData, SelectOptionData, ThemeSize } from 'soy-ui';
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
  name: 'DemoDropdownMenu'
});

const size = ref<ThemeSize>('md');

const sizes: SelectOptionData<ThemeSize>[] = [
  {
    label: 'xs',
    value: 'xs'
  },
  {
    label: 'sm',
    value: 'sm'
  },
  {
    label: 'md',
    value: 'md'
  },
  {
    label: 'lg',
    value: 'lg'
  },
  {
    label: 'xl',
    value: 'xl'
  },
  {
    label: '2xl',
    value: '2xl'
  }
];

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

function handleSelect(_event: Event, item: MenuOptionData) {
  console.log('Selected:', item);
}

const items: MenuOptionData[] = [
  { isGroupLabel: true, value: 'myAccount', label: 'My Account', separator: true },
  { value: '01', label: 'Profile', icon: User, shortcut: '⇧⌘P' },
  { value: '02', label: 'Billing', icon: CreditCard, shortcut: '⌘B' },
  { value: '03', label: 'Settings', icon: Settings, shortcut: '⌘S', separator: true },
  { value: '04', label: 'Keyboard shortcuts', icon: Keyboard, shortcut: '⌘K' }
];

const checks = ref(['01']);

const placement = ref('top-start');

const placements = [
  { isGroupLabel: true, value: 'tooltipPlacement', label: 'Tooltip Placement', separator: true },
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
  <div class="flex-c gap-4">
    <SCard title="Dropdown Menu" split>
      <template #extra>
        <SButtonGroup>
          <SButton size="sm" variant="pure" class="cursor-default">size</SButton>
          <SSelect v-model="size" size="sm" :items="sizes" placeholder="Select size" class="w-30" />
        </SButtonGroup>
      </template>
      <SDropdownMenu :size="size" :items="menus" @select="handleSelect">
        <template #trigger>
          <SButton variant="pure">Dropdown</SButton>
        </template>
      </SDropdownMenu>
    </SCard>
    <SCard title="With Arrow" split>
      <SDropdownMenu :items="menus" show-arrow>
        <template #trigger>
          <SButton variant="pure">Open Dropdown</SButton>
        </template>
      </SDropdownMenu>
    </SCard>
    <SCard title="Checkbox" split>
      <SDropdownMenuCheckbox v-model="checks" :items="items">
        <template #trigger>
          <SButton variant="pure">Checkbox Dropdown</SButton>
        </template>
      </SDropdownMenuCheckbox>
    </SCard>
    <SCard title="Radio" split>
      <SDropdownMenuRadio v-model="placement" :items="placements">
        <template #trigger>
          <SButton variant="pure">Radio Dropdown</SButton>
        </template>
      </SDropdownMenuRadio>
    </SCard>
  </div>
</template>
