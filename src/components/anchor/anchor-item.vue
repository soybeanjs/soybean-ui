<script setup lang="ts">
import { computed } from 'vue';
import { AnchorLink } from '@soybeanjs/headless';
import type { AnchorLinkProps } from '@soybeanjs/headless';
import type { AnchorExtendedUi, AnchorItemData } from './types';

defineOptions({
  name: 'SAnchorItem'
});

const props = defineProps<{
  item: AnchorItemData;
  linkProps?: Omit<AnchorLinkProps, 'href'>;
  modelValue?: string;
  ui: Partial<AnchorExtendedUi>;
}>();

function hasActiveChild(item: AnchorItemData, modelValue: string): boolean {
  if (item.href === modelValue) {
    return true;
  }

  return item.children?.some(child => hasActiveChild(child, modelValue)) ?? false;
}

const dataState = computed(() => (hasActiveChild(props.item, props.modelValue ?? '') ? 'active' : 'inactive'));
</script>

<template>
  <div :class="ui.item" :data-state="dataState">
    <AnchorLink v-bind="linkProps" :href="item.href" :target="item.target" :disabled="item.disabled">
      <span :class="ui.indicator" aria-hidden="true" />
      <span class="min-w-0 truncate">{{ item.title || item.href }}</span>
    </AnchorLink>
    <div v-if="item.children?.length" :class="ui.children">
      <AnchorItem
        v-for="child in item.children"
        :key="child.href"
        :item="child"
        :link-props="linkProps"
        :model-value="modelValue"
        :ui="ui"
      />
    </div>
  </div>
</template>
