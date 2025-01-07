<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectDialogRootContext } from './context';
import type { DialogDescriptionPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogDescription'
});

const props = withDefaults(defineProps<DialogDescriptionPropsWithPrimitive>(), {
  as: 'p'
});

const { descriptionId } = injectDialogRootContext();

useForwardExpose();
</script>

<template>
  <Primitive :id="descriptionId" :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
