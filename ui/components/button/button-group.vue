<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@headless';
import { useOmitProps } from '@headless/composables';
import { transformPropsToContext } from '@headless/shared';
import { buttonGroupVariants } from '@variants/button-group';
import { useConfigProvider } from '../config-provider';
import { provideButtonGroupContext } from './context';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'SButtonGroup'
});

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, ['orientation', 'color', 'size', 'variant', 'shape', 'shadow', 'disabled']);

const config = useConfigProvider('ButtonGroup');

const cls = computed(() =>
  buttonGroupVariants({
    orientation: props.orientation
  })
);

const dir = computed(() => props.dir ?? config.dir.value);

provideButtonGroupContext(transformPropsToContext(props, ['color', 'size', 'variant', 'shape', 'shadow', 'disabled']));
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cls" :dir="dir">
    <slot />
  </Primitive>
</template>
