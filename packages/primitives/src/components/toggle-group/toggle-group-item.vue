<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { isValueEqualOrExist } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { Toggle } from '../toggle';
import { injectToggleGroupRootContext } from './context';
import type { ToggleGroupItemPropsWithPrimitive } from './types';

const props = withDefaults(defineProps<ToggleGroupItemPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectToggleGroupRootContext();
const disabled = computed(() => rootContext.disabled?.value || props.disabled);
const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));

const { forwardRef } = useForwardExpose();
</script>

<template>
  <component
    :is="rootContext.rovingFocus.value ? RovingFocusItem : Primitive"
    as-child
    :focusable="!disabled"
    :active="pressed"
  >
    <Toggle
      v-bind="props"
      :ref="forwardRef"
      :disabled="disabled"
      :model-value="pressed"
      @update:model-value="rootContext.changeModelValue(value)"
    >
      <slot />
    </Toggle>
  </component>
</template>
