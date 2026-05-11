<script setup lang="ts">
import { computed } from 'vue';
import { PaginationCompact, providePaginationUi } from '@soybeanjs/headless/pagination';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { paginationVariants } from './variants';
import type { PaginationProps, PaginationEmits, PaginationSlots } from './types';

defineOptions({
  name: 'SPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  showFirstOrLast: true
});

const emit = defineEmits<PaginationEmits>();

const slots = defineSlots<PaginationSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size', 'variant', 'shape', 'actionAsSelected']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = paginationVariants({
    size: props.size,
    variant: props.variant,
    shape: props.shape,
    actionAsSelected: props.actionAsSelected
  });

  const { button, navigationButton } = variants;

  return mergeVariants(
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
  <PaginationCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </PaginationCompact>
</template>
