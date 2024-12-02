<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme';
import { SCollapsibleContent, SCollapsibleRoot, SCollapsibleTrigger } from 'soybean-ui';
import { Icon } from '@iconify/vue';
import DocSidebarItem from './docs-sidebar-item.vue';

defineOptions({
  name: 'DocsSidebar'
});

interface Props {
  items: DefaultTheme.SidebarItem[];
}

defineProps<Props>();
</script>

<template>
  <div v-for="item in items" :key="item.text">
    <SCollapsibleRoot v-if="item.items?.length" v-slot="{ open }" class="mb-6" :default-open="true">
      <SCollapsibleTrigger
        class="group w-full inline-flex items-center justify-between pb-2 pl-4 pr-4 text-sm font-bold"
      >
        <span>{{ item.text }}</span>
        <Icon
          icon="lucide:chevron-down"
          class="text-lg text-muted-foreground transition group-hover:text-foreground"
          :class="{ '-rotate-90': !open }"
        />
      </SCollapsibleTrigger>
      <SCollapsibleContent>
        <DocSidebarItem v-for="subitem in item.items" :key="subitem.text" :item="subitem" />
      </SCollapsibleContent>
    </SCollapsibleRoot>
    <DocSidebarItem v-else :item="item" />
  </div>
</template>
