<script setup lang="ts">
import { computed } from 'vue';
import type { ToggleProps } from '../toggle';
import { Toggle } from '../toggle';
import { RovingFocusItem } from '../roving-focus';
import { Primitive } from '../primitive';
import { isValueEqualOrExist, useForwardExpose } from '../../composables';
import type { AcceptableValue } from '../../composables/types';

import { injectToggleGroupRootContext } from './toggle-group-root.vue';

export interface ToggleGroupItemProps extends Omit<ToggleProps, 'name' | 'required'> {
  /** A string value for the toggle group item. All items within a toggle group should use a unique value. */
  value: AcceptableValue;
}

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
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
