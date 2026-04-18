<script setup lang="ts">
import { computed } from 'vue';
import { Backtop } from '@soybeanjs/headless/backtop';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import Icon from '../icon/icon.vue';
import { buttonVariants } from '../button/variants';
import { backtopVariants } from './variants';
import type { BacktopEmits, BacktopProps } from './types';

defineOptions({
  name: 'SBacktop'
});

const props = withDefaults(defineProps<BacktopProps>(), {
  color: 'primary',
  size: 'lg',
  variant: 'solid',
  shape: 'circle',
  shadow: 'lg',
  fitContent: true,
  icon: 'lucide:arrow-up'
});

const emit = defineEmits<BacktopEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
  'color',
  'size',
  'variant',
  'shape',
  'shadow',
  'fitContent',
  'icon',
  'iconClass',
  'iconProps'
]);

const listeners = useForwardListeners(emit);

const cls = computed(() => {
  const fixed = backtopVariants();
  const button = buttonVariants({
    color: props.color,
    size: props.size,
    variant: props.variant,
    shape: props.shape,
    shadow: props.shadow,
    fitContent: props.fitContent
  });

  return cn(fixed, button, props.class);
});
</script>

<template>
  <Backtop v-bind="forwardedProps" :class="cls" v-on="listeners">
    <slot>
      <Icon v-bind="iconProps" :icon="icon" :class="iconClass" />
    </slot>
  </Backtop>
</template>
