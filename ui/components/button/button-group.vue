<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@headless';
import { useOmitProps } from '@headless/composables';
import { transformPropsToContext } from '@headless/shared';
import { buttonGroupVariants } from '@variants/button-group';
import { provideButtonGroupContext } from './context';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'ButtonGroup'
});

const props = defineProps<ButtonGroupProps>();

const forwardedProps = useOmitProps(props, ['orientation', 'color', 'size', 'variant', 'shape', 'shadow', 'disabled']);

const cls = computed(() =>
  buttonGroupVariants({
    orientation: props.orientation
  })
);

provideButtonGroupContext(transformPropsToContext(props, ['color', 'size', 'variant', 'shape', 'shadow', 'disabled']));
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cls">
    <slot />
  </Primitive>
</template>
