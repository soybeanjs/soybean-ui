<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogTriggerProps } from './types';

defineOptions({
  name: 'DialogTrigger'
});

const props = defineProps<DialogTriggerProps>();

const { open, onOpenToggle, dataState, popupId, setTriggerElement } = useDialogRootContext('DialogTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :type="tag"
    aria-haspopup="dialog"
    :aria-expanded="open || false"
    :aria-controls="open ? popupId : undefined"
    :data-state="dataState"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
