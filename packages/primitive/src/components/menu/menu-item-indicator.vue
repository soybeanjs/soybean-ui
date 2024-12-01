<script setup lang="ts">
import { ref } from 'vue';
import { getCheckedState, isIndeterminate } from '../checkbox/shared';
import { Presence } from '../presence';
import { Primitive } from '../primitive';
import { injectMenuItemIndicatorContext } from './context';
import type { MenuItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuItemIndicator'
});

const props = withDefaults(defineProps<MenuItemIndicatorPropsWithPrimitive>(), {
  as: 'span'
});

const indicatorContext = injectMenuItemIndicatorContext({
  modelValue: ref(false)
});
</script>

<template>
  <Presence
    :present="
      forceMount || isIndeterminate(indicatorContext.modelValue.value) || indicatorContext.modelValue.value === true
    "
  >
    <Primitive
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-state="getCheckedState(indicatorContext.modelValue.value)"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
