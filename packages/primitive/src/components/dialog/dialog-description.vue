<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogDescriptionPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogDescription'
});

const { class: className, as = 'p' } = defineProps<DialogDescriptionPropsWithPrimitive>();

const { descriptionId } = injectDialogRootContext();

useForwardExpose();
</script>

<template>
  <Primitive :id="descriptionId" :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
