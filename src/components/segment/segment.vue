<script setup lang="ts" generic="T extends SegmentOptionData = SegmentOptionData">
import { computed } from 'vue';
import { SegmentCompact, provideTabsUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tabsVariants } from '../tabs/variants';
import type { SegmentEmits, SegmentProps, SegmentSlots, SegmentOptionData } from './types';

defineOptions({
  name: 'SSegment'
});

const props = withDefaults(defineProps<SegmentProps<T>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  fill: 'auto',
  enableIndicator: true
});

const emit = defineEmits<SegmentEmits<T['value']>>();

defineSlots<SegmentSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'fill']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tabsVariants({
    size: props.size,
    orientation: props.orientation,
    shape: props.shape,
    fill: props.fill,
    enableIndicator: props.enableIndicator
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTabsUi(ui);
</script>

<template>
  <SegmentCompact v-bind="forwardedProps" v-on="listeners">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
    <template #indicator>
      <slot name="indicator" />
    </template>
  </SegmentCompact>
</template>
