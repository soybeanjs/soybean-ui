<script setup lang="ts">
import { computed, ref } from 'vue';
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

const { modelValue } = injectMenuItemIndicatorContext({
  modelValue: ref(false)
});

const presence = computed(() => props.forceMount || isIndeterminate(modelValue.value) || modelValue.value === true);

const dataState = computed(() => getCheckedState(modelValue.value));
</script>

<template>
  <Presence :present="presence">
    <Primitive :class="props.class" :as="as" :as-child="asChild" :data-state="dataState">
      <slot />
    </Primitive>
  </Presence>
</template>
