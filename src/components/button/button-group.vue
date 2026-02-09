<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { cn } from '@/theme';
import { useConfigProvider } from '../config-provider';
import { provideButtonGroupContext } from './context';
import { buttonGroupVariants } from './variants';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'SButtonGroup'
});

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, [
  'class',
  'orientation',
  'color',
  'size',
  'variant',
  'shape',
  'shadow',
  'disabled'
]);

const config = useConfigProvider('ButtonGroup');

const cls = computed(() => {
  const variants = buttonGroupVariants({
    orientation: props.orientation
  });

  return cn(variants, props.class);
});

const dir = computed(() => props.dir ?? config.dir.value);

provideButtonGroupContext(
  transformPropsToContext(props, ['color', 'size', 'variant', 'shape', 'shadow', 'fitContent', 'disabled'])
);
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cls" :dir="dir">
    <slot />
  </Primitive>
</template>
