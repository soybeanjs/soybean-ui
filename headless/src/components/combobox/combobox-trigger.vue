<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { PopperAnchor } from '../popper';
import { Primitive } from '../primitive';
import { usePopoverRootContext } from '../popover/context';
import { useComboboxUi } from './context';
import type { ComboboxTriggerProps } from './types';

defineOptions({
  name: 'ComboboxTrigger'
});

const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
  as: 'button'
});

const { open, dataState, popupId, onOpenToggle, onTriggerElementChange } = usePopoverRootContext('ComboboxTrigger');
const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

const cls = useComboboxUi('trigger');
const triggerIconCls = useComboboxUi('triggerIcon');

const disabled = computed(() => props.disabled || false);
const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <PopperAnchor as-child>
    <Primitive
      :ref="setTriggerElement"
      :as="as"
      :as-child="asChild"
      :type="tag"
      :class="cls"
      aria-haspopup="listbox"
      :aria-expanded="open || false"
      :aria-controls="open ? popupId : undefined"
      :data-state="dataState"
      :data-disabled="disabled ? '' : undefined"
      :disabled="disabled"
      role="combobox"
      @click="onOpenToggle"
    >
      <slot :trigger-icon-class="triggerIconCls" />
    </Primitive>
  </PopperAnchor>
</template>
