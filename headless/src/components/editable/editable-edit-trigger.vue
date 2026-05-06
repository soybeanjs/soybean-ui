<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableEditTriggerProps } from './types';

defineOptions({
  name: 'EditableEditTrigger'
});

const props = defineProps<EditableEditTriggerProps>();

const attrs = useAttrs();

const { dataReadonly, dataState, disabled, edit, isEditing, readonly } = useEditableRootContext('EditableEditTrigger');

const cls = useEditableUi('editTrigger');

const triggerDisabled = computed(() => disabled.value || readonly.value);

const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Edit';
});

function onClick() {
  edit();
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
    :hidden="isEditing"
    @click="onClick"
  >
    <slot>Edit</slot>
  </Button>
</template>
