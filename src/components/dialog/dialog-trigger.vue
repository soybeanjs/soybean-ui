<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogTriggerProps } from './types';

defineOptions({
  name: 'DialogTrigger'
});

const props = withDefaults(defineProps<DialogTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, dataState, contentId, initContentId, setTriggerElement } =
  useDialogRootContext('DialogTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

initContentId();
</script>

<template>
  <Primitive
    v-bind="props"
    :ref="setTriggerElement"
    :as="as"
    :type="tag"
    aria-haspopup="dialog"
    :aria-expanded="open || false"
    :aria-controls="open ? contentId : undefined"
    :data-state="dataState"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
