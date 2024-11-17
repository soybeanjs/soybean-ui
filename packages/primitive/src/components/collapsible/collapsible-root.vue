<script setup lang="ts">
import { toRef } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { provideCollapsibleRootContext } from './context';
import type { CollapsibleRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleRoot'
});

const {
  class: className,
  defaultOpen = false,
  unmountOnHide = true,
  disabled
} = defineProps<CollapsibleRootPropsWithPrimitive>();

const open = defineModel<boolean>('open', {
  default: defaultOpen
});

const { dataState, dataDisabled } = provideCollapsibleRootContext({
  open,
  unmountOnHide: toRef(() => unmountOnHide),
  disabled: toRef(() => disabled)
});

useForwardExpose();
defineExpose({ open });
</script>

<template>
  <Primitive :class="className" :as :as-child :data-state :data-disabled>
    <slot :open />
  </Primitive>
</template>
