<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogClose'
});

const props = withDefaults(defineProps<DialogClosePropsWithPrimitive>(), {
  as: 'button'
});

const { onOpenChange } = injectDialogRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
