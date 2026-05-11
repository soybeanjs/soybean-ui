<script setup lang="ts">
import { computed } from 'vue';
import { HoverCardCompact, provideHoverCardUi } from '@soybeanjs/headless/hover-card';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { hoverCardVariants } from './variants';
import type { HoverCardProps, HoverCardEmits, HoverCardSlots } from './types';

defineOptions({
  name: 'SHoverCard'
});

const props = withDefaults(defineProps<HoverCardProps>(), {
  open: undefined,
  showArrow: true
});

const emit = defineEmits<HoverCardEmits>();

const slots = defineSlots<HoverCardSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = hoverCardVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { popup: props.class });
});

provideHoverCardUi(ui);
</script>

<template>
  <HoverCardCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </HoverCardCompact>
</template>
