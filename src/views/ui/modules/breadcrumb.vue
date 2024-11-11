<script setup lang="ts">
import { SBreadcrumb, SBreadcrumbEllipsis, SBreadcrumbPage, SDropdownMenu } from 'soybean-ui';
import type { BreadcrumbItem, DropdownMenuItemOption, ThemeSize } from 'soybean-ui';
import { Component, Dock, Home, Slash } from 'lucide-vue-next';

defineOptions({
  name: 'UiBreadcrumb'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: Home
  },
  {
    label: 'Components',
    value: 'components',
    icon: Component
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: Dock
  }
];

const items2: BreadcrumbItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: Home
  },
  {
    label: 'Vue',
    value: 'vue',
    href: 'https://vuejs.org',
    target: '_blank'
  },
  {
    label: 'RekaUI',
    value: 'reka-ui',
    href: 'https://reka-ui.com',
    target: '_blank'
  }
];

const items3: BreadcrumbItem[] = items.concat([
  {
    label: 'Components2',
    value: 'components2',
    icon: Component
  },
  {
    label: 'Breadcrumb2',
    value: 'breadcrumb2',
    icon: Dock
  }
]);

interface DropdownItem extends BreadcrumbItem {
  items?: DropdownMenuItemOption[];
}

const dropdownItems: DropdownItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: Home
  },
  {
    label: 'Dropdown',
    value: 'dropdown',
    items: [
      {
        label: 'Documentation',
        value: 'documentation'
      },
      {
        label: 'Themes',
        value: 'themes'
      },
      {
        label: 'Github',
        value: 'github'
      }
    ]
  },
  {
    label: 'Components',
    value: 'components',
    icon: Component
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: Dock
  }
];

function handleClick(item: BreadcrumbItem) {
  console.log('clicked:', item);
}
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <SBreadcrumb :items @click="handleClick" />
  <div class="py-12px text-18px">Custom Separator</div>
  <SBreadcrumb :items>
    <template #separator>
      <Slash />
    </template>
  </SBreadcrumb>
  <div class="py-12px text-18px">Link</div>
  <SBreadcrumb :items="items2" />
  <div class="py-12px text-18px">Ellipsis</div>
  <SBreadcrumb :items="items3" ellipsis />
  <div class="py-12px text-18px">Item Dropdown</div>
  <SBreadcrumb :items="dropdownItems">
    <template #default="{ item }">
      <SDropdownMenu v-if="item.items" :options="item.items">
        <template #trigger>
          <SBreadcrumbPage class="cursor-pointer">{{ item.label }}</SBreadcrumbPage>
        </template>
      </SDropdownMenu>
      <SBreadcrumbPage v-else>{{ item.label }}</SBreadcrumbPage>
    </template>
  </SBreadcrumb>
  <div class="py-12px text-18px">Ellipsis Dropdown</div>
  <SBreadcrumb :items="items3" ellipsis>
    <template #ellipsis="{ ellipsisItems }">
      <SDropdownMenu :options="ellipsisItems">
        <template #trigger>
          <SBreadcrumbEllipsis class="cursor-pointer" />
        </template>
      </SDropdownMenu>
    </template>
  </SBreadcrumb>
  <div class="py-12px text-18px">Size</div>
  <div class="flex-col-stretch gap-12px">
    <div v-for="size in sizes" :key="size" class="flex gap-12px">
      <span class="w-36px text-right">{{ size }}:</span>
      <SBreadcrumb :items :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
