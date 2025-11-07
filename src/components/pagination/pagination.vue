<script setup lang="ts">
import { computed } from 'vue';
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  providePaginationThemeContext
} from '@soybeanjs/headless';
import type { PaginationThemeSlot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn, mergeSlotVariants } from '@/theme';
import { paginationVariants } from '@/variants/pagination';
import Icon from '../icon/icon.vue';
import type { PaginationEmits, PaginationProps } from './types';

defineOptions({
  name: 'SPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  showFirstOrLast: true
});

const emit = defineEmits<PaginationEmits>();

const forwardedProps = useOmitProps(props, [
  'ui',
  'size',
  'variant',
  'shape',
  'actionAsSelected',
  'showFirstOrLast',
  'listProps',
  'listItemProps',
  'ellipsisProps',
  'firstProps',
  'prevProps',
  'nextProps',
  'lastProps'
]);

const dataSelected = computed(() => (props.actionAsSelected ? '' : undefined));

const ui = computed(() => {
  const variants = paginationVariants({
    size: props.size,
    variant: props.variant,
    shape: props.shape,
    actionAsSelected: props.actionAsSelected
  });

  const slots: PaginationThemeSlot[] = ['listItem', 'first', 'prev', 'next', 'last'];

  return {
    ...mergeSlotVariants(variants, props.ui),
    ...slots.reduce(
      (acc, slot) => {
        acc[slot] = cn(slot === 'listItem' ? variants.button() : variants.navigationButton(), props.ui?.[slot]);
        return acc;
      },
      {} as Record<PaginationThemeSlot, string>
    )
  };
});

providePaginationThemeContext({
  ui
});
</script>

<template>
  <PaginationRoot v-bind="forwardedProps" @update:page="emit('update:page', $event)">
    <PaginationList v-slot="{ items }" v-bind="props.listProps">
      <PaginationFirst v-if="showFirstOrLast" v-bind="props.firstProps" :data-selected="dataSelected">
        <slot name="first">
          <Icon icon="lucide:chevrons-left" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-bind="props.prevProps" :data-selected="dataSelected">
        <slot name="prev">
          <Icon icon="lucide:chevron-left" />
        </slot>
      </PaginationPrev>
      <template v-for="item in items" :key="item">
        <PaginationListItem v-if="item.type === 'page'" v-bind="props.listItemProps" :value="item.value" />
        <PaginationEllipsis v-else-if="item.type === 'ellipsis'" v-bind="props.ellipsisProps">
          <slot name="ellipsis">
            <Icon icon="lucide:ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>
      <PaginationNext v-bind="props.nextProps" :data-selected="dataSelected">
        <slot name="next">
          <Icon icon="lucide:chevron-right" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="showFirstOrLast" v-bind="props.lastProps" :data-selected="dataSelected">
        <slot name="last">
          <Icon icon="lucide:chevrons-right" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
