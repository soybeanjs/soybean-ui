<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectSwitchRootContext } from './context';
import type { SwitchThumbPropsWithPrimitive } from './types';

defineOptions({
  name: 'SwitchThumb'
});

const props = withDefaults(defineProps<SwitchThumbPropsWithPrimitive>(), {
  as: 'span'
});

const { modelValue, disabled } = injectSwitchRootContext();

const dataState = computed(() => (modelValue?.value ? 'checked' : 'unchecked'));

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" :data-state="dataState" :data-disabled="dataDisabled">
    <slot />
  </Primitive>
</template>
