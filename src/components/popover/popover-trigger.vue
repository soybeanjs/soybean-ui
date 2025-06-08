<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { PopperAnchor } from '../popper';
import { usePopoverRootContext } from './context';
import type { PopoverTriggerProps } from './types';

defineOptions({
  name: 'PopoverTrigger'
});

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, dataState, contentId, initTriggerId, onTriggerElementChange, hasCustomAnchor } =
  usePopoverRootContext('DialogTrigger');

const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

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
