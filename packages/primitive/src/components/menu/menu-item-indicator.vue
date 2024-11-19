<script setup lang="ts">
import { ref } from 'vue';
import { Primitive } from '../primitive';
import { Presence } from '../presence';
import { getCheckedState, isIndeterminate } from '../checkbox/shared';
import { injectMenuItemIndicatorContext } from './context';
import type { MenuItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuItemIndicator'
});

const { class: className, as = 'span', forceMount } = defineProps<MenuItemIndicatorPropsWithPrimitive>();

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
    <Primitive :class="className" :as="as" :as-child :data-state="getCheckedState(indicatorContext.modelValue.value)">
      <slot />
    </Primitive>
  </Presence>
</template>
