<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogClose'
});

const { class: className, as = 'button' } = defineProps<DialogClosePropsWithPrimitive>();

const { onOpenChange } = injectDialogRootContext();

const tag = computed(() => (as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive :class="className" :as :as-child :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
