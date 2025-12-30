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

const { open, onOpenToggle, dataState, popupId, initTriggerId, onTriggerElementChange, hasCustomAnchor } =
  usePopoverRootContext('PopoverTrigger');

const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

initTriggerId();
</script>

<template>
  <component
    :is="hasCustomAnchor ? Primitive : PopperAnchor"
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
  </component>
</template>
