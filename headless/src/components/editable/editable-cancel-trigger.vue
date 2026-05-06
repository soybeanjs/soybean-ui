<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableCancelTriggerProps } from './types';

defineOptions({
  name: 'EditableCancelTrigger'
});

const props = defineProps<EditableCancelTriggerProps>();

const attrs = useAttrs();

const { dataReadonly, dataState, disabled, readonly, cancel, isEditing } =
  useEditableRootContext('EditableCancelTrigger');

const cls = useEditableUi('cancelTrigger');

const triggerDisabled = computed(() => disabled.value || readonly.value);

const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Cancel';
});

function onClick() {
  cancel();
}
</script>

<template>
  <Button
    v-bind="props"
    :class="cls"
    :aria-label="ariaLabel"
    :data-readonly="dataReadonly"
    :data-state="dataState"
    :disabled="triggerDisabled"
    :hidden="!isEditing"
    @click="onClick"
  >
    <slot>Cancel</slot>
  </Button>
</template>
