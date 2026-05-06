<script setup lang="ts">
import { useForwardElement } from '../../composables';
import Button from '../button/button.vue';
import { PopperAnchor } from '../popper';
import { usePopoverRootContext, usePopoverUi } from './context';
import type { PopoverTriggerProps } from './types';

defineOptions({
  name: 'PopoverTrigger'
});

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button'
});

const cls = usePopoverUi('trigger');

const { open, onOpenToggle, dataState, popupId, disabled, initTriggerId, onTriggerElementChange, hasCustomAnchor } =
  usePopoverRootContext('PopoverTrigger');

const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

initTriggerId();
</script>

<template>
  <component :is="hasCustomAnchor ? 'template' : PopperAnchor" as-child>
    <Button
      :ref="setTriggerElement"
      v-bind="props"
      :class="cls"
      aria-haspopup="dialog"
      :aria-expanded="open || false"
      :aria-controls="open ? popupId : undefined"
      :disabled="disabled"
      :data-state="dataState"
      @click="onOpenToggle"
    >
      <slot />
    </Button>
  </component>
</template>
