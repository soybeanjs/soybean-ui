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
  provideBreadcrumbUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { breadcrumbVariants } from './variants';
import { getEllipsisRange } from './shared';
import type { BreadcrumbEmits, BreadcrumbOptionData, BreadcrumbProps } from './types';

defineOptions({
  name: 'SBreadcrumb'
});

const props = defineProps<BreadcrumbProps<T>>();

const emit = defineEmits<BreadcrumbEmits<T>>();

const forwardedRootProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'ellipsis',
  'listProps',
  'itemProps',
  'linkProps',
  'pageProps',
  'separatorProps',
  'ellipsisProps'
]);

const ui = computed(() => {
  const variants = breadcrumbVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
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

provideBreadcrumbUi(ui);
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
            <Icon :icon="item.icon" />
          </slot>
          <slot :item="item">
            <BreadcrumbLink
              v-if="item.to || item.href"
              v-bind="linkProps"
              :disabled="item.disabled"
              :to="item.to"
              :href="item.href"
              :target="item.target"
              :external="item.external"
            >
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
