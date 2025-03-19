<script setup lang="ts">
import { SBreadcrumb, SBreadcrumbEllipsis, SBreadcrumbPage, SDropdownMenu } from 'soy-ui';
import type { BreadcrumbItem, MenuOptionData, ThemeSize } from 'soy-ui';
import { Component, Dock, Home } from 'lucide-vue-next';

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
    label: 'SoybeanUI',
    value: 'soybean-ui',
    href: 'https://soybean-ui.com',
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
  items?: MenuOptionData[];
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
  <div class="demo-breadcrumb">
    <div class="py-12px text-18px">Default</div>
    <SBreadcrumb :items="items" @click="handleClick" />
    <div class="py-12px text-18px">Custom Separator</div>
    <SBreadcrumb :items="items">
      <template #separator>&nbsp;/&nbsp;</template>
    </SBreadcrumb>
    <div class="py-12px text-18px">Link</div>
    <SBreadcrumb :items="items2" />
    <div class="py-12px text-18px">Ellipsis</div>
    <SBreadcrumb :items="items3" ellipsis />
    <div class="py-12px text-18px">Item Dropdown</div>
    <SBreadcrumb :items="dropdownItems">
      <template #default="{ item }">
        <SDropdownMenu v-if="item.items" :items="item.items" :modal="false">
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
        <SDropdownMenu :items="ellipsisItems" :modal="false">
          <template #trigger>
            <SBreadcrumbEllipsis class="cursor-pointer" />
          </template>
        </SDropdownMenu>
      </template>
    </SBreadcrumb>
    <div class="py-12px text-18px">Size</div>
    <div class="flex-c-stretch gap-12px">
      <div v-for="size in sizes" :key="size" class="flex gap-12px">
        <span class="w-36px flex-center text-right">{{ size }}:</span>
        <SBreadcrumb :items="items" :size="size" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-breadcrumb :deep(li) {
  list-style-type: none;
}
</style>
