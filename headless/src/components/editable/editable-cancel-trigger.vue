<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableCancelTriggerProps } from './types';

defineOptions({
  name: 'EditableCancelTrigger'
});

const props = withDefaults(defineProps<EditableCancelTriggerProps>(), {
  as: 'button'
});

const { dataDisabled, dataReadonly, dataState, disabled, cancel, isEditing } =
  useEditableRootContext('EditableCancelTrigger');

const cls = useEditableUi('cancelTrigger');

const buttonType = computed(() => (props.as === 'button' ? 'button' : undefined));

function onClick() {
  cancel();
}
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Cancel"
    :class="cls"
    :data-disabled="dataDisabled"
    :data-readonly="dataReadonly"
    :data-state="dataState"
    :disabled="disabled"
    :hidden="!isEditing"
    :type="buttonType"
    @click="onClick"
  >
    <slot>Cancel</slot>
  </Primitive>
</template>
