<script setup lang="ts" generic="T extends BreadcrumbOptionData = BreadcrumbOptionData">
import { computed } from 'vue';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  provideBreadcrumbThemeContext
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { breadcrumbVariants } from '@/variants/breadcrumb';
import Icon from '../icon/icon.vue';
import { getEllipsisRange } from './shared';
import type { BreadcrumbEmits, BreadcrumbOptionData, BreadcrumbProps } from './types';

defineOptions({
  name: 'SBreadcrumb'
});

const props = defineProps<BreadcrumbProps<T>>();

const emit = defineEmits<BreadcrumbEmits<T>>();

const forwardedRootProps = useOmitProps(props, [
  'size',
  'ui',
  'items',
  'ellipsis',
  'listProps',
  'itemProps',
  'pageProps',
  'separatorProps',
  'ellipsisProps'
]);

const ui = computed(() => {
  const variants = breadcrumbVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const ellipsisRange = computed(() => getEllipsisRange(props.items, props.ellipsis));

const startIndex = computed(() => ellipsisRange.value?.[0]);

const items = computed(() => {
  if (!ellipsisRange.value) return props.items;

  const [start, end] = ellipsisRange.value;

  return [...props.items.slice(0, start), ...props.items.slice(end)];
});

const ellipsisItems = computed(() => {
  if (!ellipsisRange.value) return [];

  const [start, end] = ellipsisRange.value;

  return props.items.slice(start, end);
});

function handleItemClick(item: T) {
  emit('click', item);
}

provideBreadcrumbThemeContext({
  ui
});
</script>

<template>
  <BreadcrumbRoot v-bind="forwardedRootProps">
    <BreadcrumbList v-bind="listProps">
      <template v-for="(item, index) in items" :key="item.value || index">
        <template v-if="startIndex && index === startIndex">
          <slot name="ellipsis" :ellipsis-items="ellipsisItems">
            <BreadcrumbEllipsis v-bind="ellipsisProps">
              <slot name="ellipsis-icon">
                <Icon icon="lucide:ellipsis" />
              </slot>
            </BreadcrumbEllipsis>
          </slot>
          <BreadcrumbSeparator v-bind="separatorProps">
            <slot name="separator">
              <Icon icon="lucide:chevron-right" />
            </slot>
          </BreadcrumbSeparator>
        </template>
        <BreadcrumbItem v-bind="itemProps" @click="handleItemClick(item)">
          <slot name="item-leading" :item="item">
            <Icon v-if="item.icon" :icon="item.icon" />
          </slot>
          <slot :item="item">
            <BreadcrumbLink v-if="item.linkProps" v-bind="item.linkProps">
              <slot name="item-link" :item="item">{{ item.label }}</slot>
            </BreadcrumbLink>
            <BreadcrumbPage v-else v-bind="pageProps">
              <slot name="item-label" :item="item">{{ item.label }}</slot>
            </BreadcrumbPage>
          </slot>
          <slot name="item-trailing" :item="item" />
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" v-bind="separatorProps">
          <slot name="separator">
            <Icon icon="lucide:chevron-right" />
          </slot>
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </BreadcrumbRoot>
</template>
