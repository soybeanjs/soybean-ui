<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { AnchorRoot, provideAnchorUi } from '@soybeanjs/headless';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { provideExtraAnchorUi } from './context';
import AnchorItem from './anchor-item.vue';
import { anchorVariants } from './variants';
import type { AnchorEmits, AnchorProps } from './types';

defineOptions({
  name: 'SAnchor'
});

const props = withDefaults(defineProps<AnchorProps>(), {
  offsetTop: 0,
  sticky: true
});

const emit = defineEmits<AnchorEmits>();

const forwardedProps = useOmitProps(props, [
  'color',
  'size',
  'ui',
  'class',
  'items',
  'sticky',
  'linkProps',
  'indicatorProps',
  'titleProps',
  'subProps'
]);

const events = useForwardListeners(emit);

const style = computed<CSSProperties>(() => ({
  '--soybean-anchor-offset-top': `${props.offsetTop}px`
}));

const ui = computed(() => {
  const variants = anchorVariants({
    color: props.color,
    orientation: props.orientation,
    size: props.size,
    sticky: props.sticky
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAnchorUi(ui);
provideExtraAnchorUi(ui);
</script>

<template>
  <AnchorRoot v-slot="{ modelValue }" v-bind="forwardedProps" :style="style" v-on="events">
    <AnchorItem
      v-for="item in items"
      :key="item.href"
      :item="item"
      :link-props="linkProps"
      :indicator-props="indicatorProps"
      :title-props="titleProps"
      :sub-props="subProps"
      :model-value="modelValue"
      :ui="ui"
    />
  </AnchorRoot>
</template>
