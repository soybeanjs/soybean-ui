<script setup lang="ts">
import { SBreadcrumb, SBreadcrumbEllipsis, SBreadcrumbPage, SCard, SDropdownMenu } from 'soy-ui';
import type { BreadcrumbItem, MenuOptionData, ThemeSize } from 'soy-ui';
import { Component, Dock, Home } from 'lucide-vue-next';

defineOptions({
  name: 'DemoBreadcrumb'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <SBreadcrumb :items="items" @click="handleClick" />
    </SCard>
    <SCard title="Custom Separator" split>
      <SBreadcrumb :items="items">
        <template #separator>&nbsp;/&nbsp;</template>
      </SBreadcrumb>
    </SCard>
    <SCard title="Link" split>
      <SBreadcrumb :items="items2" />
    </SCard>
    <SCard title="Ellipsis" split>
      <SBreadcrumb :items="items3" ellipsis />
    </SCard>
    <SCard title="Item Dropdown" split>
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
    </SCard>
    <SCard title="Ellipsis Dropdown" split>
      <SBreadcrumb :items="items3" ellipsis>
        <template #ellipsis="{ ellipsisItems }">
          <SDropdownMenu :items="ellipsisItems" :modal="false">
            <template #trigger>
              <SBreadcrumbEllipsis class="cursor-pointer" />
            </template>
          </SDropdownMenu>
        </template>
      </SBreadcrumb>
    </SCard>
    <SCard title="Size" split>
      <div class="flex-c-stretch gap-12px">
        <SBreadcrumb v-for="size in sizes" :key="size" :items="items" :size="size" />
      </div>
    </SCard>
  </div>
</template>
