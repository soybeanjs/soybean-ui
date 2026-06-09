<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { ToggleGroupRoot, provideToggleGroupUi } from '@soybeanjs/headless/toggle-group';
import type { DefinedValue } from '@soybeanjs/headless/types';
import { toggleGroupVariants } from '@/styles/toggle-group';
import type { ToggleGroupProps, ToggleGroupEmits } from './types';

defineOptions({
  name: 'SToggleGroup'
});

const props = defineProps<ToggleGroupProps<M, T>>();

const emit = defineEmits<ToggleGroupEmits<M, T>>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'variant', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() =>
  toggleGroupVariants(
    {
      color: props.color,
      size: props.size,
      variant: props.variant,
      orientation: props.orientation
    },
    props.ui,
    { root: props.class }
  )
);

provideToggleGroupUi(ui);
</script>

<template>
  <ToggleGroupRoot v-bind="forwardedProps" v-on="listeners">
    <slot />
  </ToggleGroupRoot>
</template>
