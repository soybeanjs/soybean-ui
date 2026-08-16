<script setup lang="ts">
import { computed } from 'vue';
import { SBreadcrumb, SBreadcrumbPage, SDropdownMenu } from '@soybeanjs/ui';
import { appBreadcrumbVariants } from '@/styles/app-breadcrumb';
import type { AppBreadcrumbProps, AppBreadcrumbEmits, AppBreadcrumbItem } from './types';

defineOptions({
  name: 'SAppBreadcrumb'
});

const props = withDefaults(defineProps<AppBreadcrumbProps>(), {
  ui: undefined
});

const emit = defineEmits<AppBreadcrumbEmits>();

const ui = computed(() => appBreadcrumbVariants({}, props.ui, { root: props.class }));

function handleClick(item: AppBreadcrumbItem) {
  emit('click', item);
}

function handleSelectChild(item: AppBreadcrumbItem) {
  emit('select-child', item);
}
</script>

<template>
  <SBreadcrumb :items="items" :ui="ui">
    <template #default="{ item }">
      <SDropdownMenu
        v-if="item.children?.length"
        :items="item.children"
        :modal="false"
        trigger="hover"
        @select="handleSelectChild"
      >
        <template #trigger>
          <SBreadcrumbPage class="cursor-pointer">{{ item.label }}</SBreadcrumbPage>
        </template>
      </SDropdownMenu>
      <SBreadcrumbPage v-else @click="handleClick(item)">{{ item.label }}</SBreadcrumbPage>
    </template>
  </SBreadcrumb>
</template>
