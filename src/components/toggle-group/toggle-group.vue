<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import { ToggleGroupRoot, provideToggleGroupUi } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { toggleGroupVariants } from './variants';
import type { ToggleGroupEmits, ToggleGroupProps } from './types';

defineOptions({
  name: 'SToggleGroup'
});

const props = defineProps<ToggleGroupProps<M, T>>();

const emit = defineEmits<ToggleGroupEmits<M, T>>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'variant', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = toggleGroupVariants({
    color: props.color,
    size: props.size,
    variant: props.variant,
    orientation: props.orientation
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideToggleGroupUi(ui);
</script>

<template>
  <ToggleGroupRoot v-bind="forwardedProps" v-on="listeners">
    <slot />
  </ToggleGroupRoot>
</template>
