<script setup lang="ts">
import { SCollapsible, SCollapsibleTrigger } from 'soy-ui';
import { Icon } from '@iconify/vue';
import type { SidebarItem } from '../../../types';
import DocSidebarItem from './docs-sidebar-item.vue';

defineOptions({
  name: 'DocsSidebar'
});

interface Props {
  items: SidebarItem[];
}

defineProps<Props>();
</script>

<template>
  <div v-for="item in items" :key="item.text">
    <SCollapsible v-if="item.items?.length" class="mb-6" :default-open="true">
      <template #default="{ open }">
        <SCollapsibleTrigger class="group w-full i-flex-y-center justify-between pb-2 pl-4 pr-4 text-sm font-bold">
          <span>{{ item.text }}</span>
          <Icon
            icon="lucide:chevron-down"
            class="text-muted-foreground transition group-hover:text-foreground"
            :class="{ '-rotate-90': !open }"
          />
        </SCollapsibleTrigger>
      </template>
      <template #content>
        <DocSidebarItem v-for="subitem in item.items" :key="subitem.text" :item="subitem" />
      </template>
    </SCollapsible>
    <DocSidebarItem v-else :item="item" />
  </div>
</template>
