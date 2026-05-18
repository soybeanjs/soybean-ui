<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybeanjs/headless/primitive';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { buttonGroupVariants } from '@/styles/button';
import { useConfigProvider } from '../config-provider/context';
import { provideButtonGroupContext } from './context';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'SButtonGroup'
});

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal'
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

const cls = computed(() =>
  buttonGroupVariants(
    {
      orientation: props.orientation
    },
    props.class
  )
);

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
