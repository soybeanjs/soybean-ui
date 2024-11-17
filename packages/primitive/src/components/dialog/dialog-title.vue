<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogTitlePropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogTitle'
});

const { class: className, as = 'h2' } = defineProps<DialogTitlePropsWithPrimitive>();

const { titleId } = injectDialogRootContext();

useForwardExpose();
</script>

<template>
  <Primitive :id="titleId" :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
