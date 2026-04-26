<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { AnchorCompact, provideAnchorUi } from '@soybeanjs/headless';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
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

const forwardedProps = useOmitProps(props, ['color', 'size', 'ui', 'class', 'sticky']);

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
</script>

<template>
  <AnchorCompact v-bind="forwardedProps" :items="items" :style="style" v-on="events" />
</template>
