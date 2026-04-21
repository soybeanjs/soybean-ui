<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
  "
>
import { computed } from 'vue';
import { SegmentCompact, provideTabsUi } from '@soybeanjs/headless';
import type { AcceptableValue } from '@soybeanjs/headless';
import type { SegmentCompactItemSlotProps } from '@soybeanjs/headless/tabs';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tabsVariants } from '../tabs/variants';
import type { SegmentEmits, SegmentOptionData, SegmentProps, SegmentSlots } from './types';

defineOptions({
  name: 'SSegment'
});

const props = withDefaults(defineProps<SegmentProps<T, S>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  fill: 'auto',
  enableIndicator: true
});

const emit = defineEmits<SegmentEmits<T>>();

const slots = defineSlots<SegmentSlots<S>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'fill'
]);

const listeners = useForwardListeners(emit);
const hasItemSlot = computed(() => Boolean(slots.item));
// `@vue-ignore` is still required on `<SegmentCompact>` because `vue-tsc` loses the generic relation between `T` and `S` in template inference.
const compactItems = computed(() => props.items as SegmentOptionData<NonNullable<T>>[]);
const getItemSlotProps = (slotProps: SegmentCompactItemSlotProps<SegmentOptionData<NonNullable<T>>>) => {
  return slotProps as SegmentCompactItemSlotProps<S>;
};

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
  <!-- @vue-ignore generic props are validated by SegmentProps/SegmentCompactProps -->
  <SegmentCompact v-bind="forwardedProps" :items="compactItems" v-on="listeners">
    <template v-if="hasItemSlot" #item="slotProps">
      <slot name="item" v-bind="getItemSlotProps(slotProps)" />
    </template>
  </SegmentCompact>
</template>
