<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectSwitchRootContext } from './context';
import type { SwitchThumbPropsWithPrimitive } from './types';

defineOptions({
  name: 'SwitchThumb'
});

const { class: className, as = 'span' } = defineProps<SwitchThumbPropsWithPrimitive>();

const { modelValue, disabled } = injectSwitchRootContext();

const dataState = computed(() => (modelValue?.value ? 'checked' : 'unchecked'));

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive :class="className" :as :as-child :data-state :data-disabled>
    <slot />
  </Primitive>
</template>
