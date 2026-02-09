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
  providePaginationUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { paginationVariants } from './variants';
import type { PaginationEmits, PaginationProps } from './types';

defineOptions({
  name: 'SPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  showFirstOrLast: true
});

const emit = defineEmits<PaginationEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
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

  const { button, navigationButton } = variants;

  return mergeSlotVariants(
    {
      ...variants,
      listItem: button,
      first: navigationButton,
      prev: navigationButton,
      next: navigationButton,
      last: navigationButton
    },
    props.ui,
    { root: props.class }
  );
});

providePaginationUi(ui);
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
