<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectDialogRootContext } from './context';
import type { DialogTitlePropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogTitle'
});

const props = withDefaults(defineProps<DialogTitlePropsWithPrimitive>(), {
  as: 'h2'
});

const { titleId } = injectDialogRootContext();

useForwardExpose();
</script>

<template>
  <Primitive :id="titleId" :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
