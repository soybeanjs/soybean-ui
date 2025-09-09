<script setup lang="ts">
import { SBreadcrumb, SCard, SDropdownMenu } from '@ui';
import { BreadcrumbPage } from '@headless';
import type { BreadcrumbOptionData, MenuOptionData } from '@ui';

interface DropdownItem extends BreadcrumbOptionData {
  items?: MenuOptionData[];
}

const dropdownItems: DropdownItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: 'lucide:home'
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
    icon: 'lucide:component'
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: 'lucide:dock'
  }
];
</script>

<template>
  <SCard title="Item Dropdown">
    <SBreadcrumb :items="dropdownItems">
      <template #default="{ item }">
        <SDropdownMenu v-if="item.items" :items="item.items" :modal="false" trigger="hover">
          <template #trigger>
            <BreadcrumbPage class="cursor-pointer">{{ item.label }}</BreadcrumbPage>
          </template>
        </SDropdownMenu>
        <BreadcrumbPage v-else>{{ item.label }}</BreadcrumbPage>
      </template>
    </SBreadcrumb>
  </SCard>
</template>
