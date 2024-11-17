<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogTrigger'
});

const { class: className, as = 'button' } = defineProps<DialogTriggerPropsWithPrimitive>();

const {
  open,
  contentId,
  onOpenToggle,
  triggerElement,
  dataState,
  initContentId
  //
} = injectDialogRootContext();
initContentId();

const { forwardRef, currentElement } = useForwardExpose();

const tag = computed(() => (as === 'button' ? 'button' : undefined));

onMounted(() => {
  triggerElement.value = currentElement.value;
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :class="className"
    :as
    :as-child
    :type="tag"
    aria-haspopup="dialog"
    :aria-expanded="open || false"
    :aria-controls="open ? contentId : undefined"
    :data-state
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
