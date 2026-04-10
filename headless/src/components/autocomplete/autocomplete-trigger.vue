<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { usePopoverRootContext } from '../popover/context';
import { useAutocompleteRootContext, useAutocompleteUi } from './context';
import type { AutocompleteTriggerProps } from './types';

defineOptions({
  name: 'AutocompleteTrigger'
});

const props = withDefaults(defineProps<AutocompleteTriggerProps>(), {
  as: 'button'
});

const cls = useAutocompleteUi('trigger');

const { dataState } = usePopoverRootContext('AutocompleteTrigger');
const { contentId, disabled: rootDisabled, onOpenChange, open } = useAutocompleteRootContext('AutocompleteTrigger');

const disabled = computed(() => rootDisabled.value || props.disabled || false);
const type = computed(() => (props.as === 'button' ? 'button' : undefined));

const onClick = () => {
  if (disabled.value) return;

  onOpenChange(!open.value);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :aria-controls="contentId"
    :aria-expanded="open || false"
    :data-disabled="disabled ? '' : undefined"
    :data-state="dataState"
    :disabled="disabled"
    :type="type"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
