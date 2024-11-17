<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectSwitchRootContext } from './switch-root.vue';

export interface SwitchThumbProps extends PrimitiveProps {}

withDefaults(defineProps<SwitchThumbProps>(), { as: 'span' });

const rootContext = injectSwitchRootContext();

useForwardExpose();
</script>

<template>
  <Primitive
    :data-state="rootContext.modelValue?.value ? 'checked' : 'unchecked'"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :as
    :as-child
  >
    <slot />
  </Primitive>
</template>
