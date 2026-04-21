<script setup lang="ts">
import { computed } from 'vue';
import AnchorLink from './anchor-link.vue';
import { useAnchorUi } from './context';
import type { AnchorCompactItemProps, AnchorItemData } from './types';

defineOptions({
  name: 'AnchorCompactItem'
});

const props = defineProps<AnchorCompactItemProps>();

const ui = useAnchorUi();

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
      <span v-bind="indicatorProps" :class="ui.indicator" aria-hidden="true" />
      <span v-bind="titleProps" :class="ui.title">{{ item.title || item.href }}</span>
    </AnchorLink>
    <div v-if="item.children?.length" v-bind="subProps" :class="ui.sub">
      <AnchorCompactItem
        v-for="child in item.children"
        :key="child.href"
        :model-value="modelValue"
        :item="child"
        :link-props="linkProps"
        :indicator-props="indicatorProps"
        :title-props="titleProps"
        :sub-props="subProps"
      />
    </div>
  </div>
</template>
