<script setup lang="ts">
import { computed, inject } from 'vue';
import { ButtonGroup } from '@soybeanjs/headless/button';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { toContext } from '@soybeanjs/headless/shared';
import { buttonGroupVariants } from '@/styles/button';
import { UI_CONFIG_PROVIDER_CONTEXT_KEY } from '../../constants';
import type { ConfigProviderContext } from '../config-provider/types';
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
  'color',
  'size',
  'dir',
  'variant',
  'shape',
  'shadow',
  'fitContent',
  'disabled'
]);

const config = inject<ConfigProviderContext>(UI_CONFIG_PROVIDER_CONTEXT_KEY);

const cls = computed(() =>
  buttonGroupVariants(
    {
      orientation: props.orientation
    },
    props.class
  )
);

const dir = computed(() => props.dir ?? config?.dir);

provideButtonGroupContext(toContext(props, ['color', 'size', 'variant', 'shape', 'shadow', 'fitContent', 'disabled']));
</script>

<template>
  <ButtonGroup v-bind="forwardedProps" :class="cls" :dir="dir">
    <slot />
  </ButtonGroup>
</template>
