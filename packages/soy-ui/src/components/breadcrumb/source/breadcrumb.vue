<script setup lang="ts" generic="T extends BreadcrumbItem">
import { computed } from 'vue';
import type { BreadcrumbEmits, BreadcrumbItem, BreadcrumbProps } from '../types';
import SBreadcrumbRoot from './breadcrumb-root.vue';
import SBreadcrumbList from './breadcrumb-list.vue';
import SBreadcrumbItem from './breadcrumb-item.vue';
import SBreadcrumbPage from './breadcrumb-page.vue';
import SBreadcrumbLink from './breadcrumb-link.vue';
import SBreadcrumbEllipsis from './breadcrumb-ellipsis.vue';
import SBreadcrumbSeparator from './breadcrumb-separator.vue';

defineOptions({
  name: 'SBreadcrumb'
});

const { class: cls, size, items, ui, ellipsis } = defineProps<BreadcrumbProps<T>>();

const emit = defineEmits<BreadcrumbEmits<T>>();

function getEllipsisRange() {
  /** when the item count is greater than 4, we will show ellipsis */
  const MIN_ITEM_COUNT_WITH_ELLIPSIS = 5;

  if (!ellipsis || items.length < MIN_ITEM_COUNT_WITH_ELLIPSIS) return null;

  if (ellipsis === true) {
    return [1, items.length - 2];
  }

  let [start, end] = ellipsis;

  if (start === 0) {
    start = 1;
  }

  if (end === items.length) {
    end = items.length - 1;
  }

  return [start, end];
}

const computedEllipsisRange = computed(() => getEllipsisRange());

const startEllipsisIndex = computed(() => computedEllipsisRange.value?.[0]);

const itemsFilterEllipsis = computed(() => {
  if (!computedEllipsisRange.value) return items;

  const [start, end] = computedEllipsisRange.value;

  return [...items.slice(0, start), ...items.slice(end)];
});

const ellipsisItems = computed(() => {
  if (!computedEllipsisRange.value) return [];

  const [start, end] = computedEllipsisRange.value;

  return items.slice(start, end);
});

function handleItemClick(item: T) {
  emit('click', item);
}
</script>

<template>
  <SBreadcrumbRoot :class="cls || ui?.root" :size="size">
    <SBreadcrumbList :class="ui?.list" :size="size">
      <template v-for="(item, index) in itemsFilterEllipsis" :key="item.value">
        <template v-if="startEllipsisIndex && index === startEllipsisIndex">
          <slot name="ellipsis" :ellipsis-items="ellipsisItems">
            <SBreadcrumbEllipsis :class="ui?.ellipsis">
              <slot name="ellipsis-icon" />
            </SBreadcrumbEllipsis>
          </slot>
          <SBreadcrumbSeparator :class="ui?.separator">
            <slot name="separator" />
          </SBreadcrumbSeparator>
        </template>
        <SBreadcrumbItem :class="ui?.item" :size="size" @click="handleItemClick(item)">
          <slot name="item-leading" :item="item">
            <component :is="item.icon" v-if="item.icon" />
          </slot>
          <slot :item="item">
            <SBreadcrumbLink
              v-if="item.href"
              :class="ui?.link"
              :href="item.href"
              :target="item.target"
              :disabled="item.disabled"
            >
              <slot name="item-link" :item="item">{{ item.label }}</slot>
            </SBreadcrumbLink>
            <SBreadcrumbPage v-else :class="ui?.page">
              <slot name="item-label" :item="item">{{ item.label }}</slot>
            </SBreadcrumbPage>
          </slot>
          <slot name="item-trailing" :item="item" />
        </SBreadcrumbItem>
        <SBreadcrumbSeparator v-if="index < itemsFilterEllipsis.length - 1" :class="ui?.separator">
          <slot name="separator" />
        </SBreadcrumbSeparator>
      </template>
    </SBreadcrumbList>
  </SBreadcrumbRoot>
</template>
