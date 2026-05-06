<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableSubmitTriggerProps } from './types';

defineOptions({
  name: 'EditableSubmitTrigger'
});

const props = defineProps<EditableSubmitTriggerProps>();

const attrs = useAttrs();

const { dataReadonly, dataState, disabled, readonly, isEditing, submit } =
  useEditableRootContext('EditableSubmitTrigger');

const cls = useEditableUi('submitTrigger');

const triggerDisabled = computed(() => disabled.value || readonly.value);

const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Submit';
});

function onClick() {
  submit();
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
    <slot>Submit</slot>
  </Button>
</template>
