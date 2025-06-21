<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { isIndeterminate } from '../../shared';
import { Primitive } from '../primitive';
import { useMenuItemIndicatorContext } from './context';
import type { MenuItemIndicatorProps } from './types';

defineOptions({
  name: 'MenuItemIndicator'
});

const props = withDefaults(defineProps<MenuItemIndicatorProps>(), {
  as: 'span'
});

const [indicatorElement, setIndicatorElement] = useForwardElement();

const { modelValue } = useMenuItemIndicatorContext('MenuItemIndicator');

const checked = computed(() => isIndeterminate(modelValue.value) || modelValue.value === true);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(indicatorElement, checked);
</script>

<template>
  <Primitive v-if="isPresent" v-bind="props" :ref="setIndicatorElement">
    <slot />
  </Primitive>
</template>
