<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import PopperAnchor from '../popper/popper-anchor.vue';
import { usePopoverRootContext } from './context';
import type { PopoverTriggerProps } from './types';

defineOptions({
  name: 'PopoverTrigger'
});

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, dataState, contentId, initTriggerId, setTriggerElement, hasCustomAnchor } =
  usePopoverRootContext('DialogTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

initTriggerId();
</script>

<template>
  <component
    :is="hasCustomAnchor ? Primitive : PopperAnchor"
    v-bind="props"
    :ref="setTriggerElement"
    :type="tag"
    aria-haspopup="dialog"
    :aria-expanded="open || false"
    :aria-controls="open ? contentId : undefined"
    :data-state="dataState"
    @click="onOpenToggle"
  >
    <slot />
  </component>
</template>
