<script setup lang="ts">
import { computed } from 'vue';
import {
  EditableArea,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
  provideEditableUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { editableVariants } from './variants';
import type { EditableEmits, EditableProps } from './types';

defineOptions({
  name: 'SEditable'
});

const props = defineProps<EditableProps>();

const emit = defineEmits<EditableEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'areaProps',
  'previewProps',
  'inputProps',
  'editTriggerProps',
  'submitTriggerProps',
  'cancelTriggerProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = editableVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideEditableUi(ui);
</script>

<template>
  <EditableRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-bind="slotProps">
      <EditableArea v-bind="areaProps">
        <slot name="preview" v-bind="slotProps">
          <EditablePreview v-bind="previewProps" />
        </slot>
        <slot name="input" v-bind="slotProps">
          <EditableInput v-bind="inputProps" />
        </slot>
        <div :class="ui.controls">
          <slot name="edit-trigger" v-bind="slotProps">
            <EditableEditTrigger v-bind="editTriggerProps">
              <Icon icon="lucide:pencil-line" :aria-hidden="true" />
            </EditableEditTrigger>
          </slot>
          <slot name="submit-trigger" v-bind="slotProps">
            <EditableSubmitTrigger v-bind="submitTriggerProps">
              <Icon icon="lucide:check" :aria-hidden="true" />
            </EditableSubmitTrigger>
          </slot>
          <slot name="cancel-trigger" v-bind="slotProps">
            <EditableCancelTrigger v-bind="cancelTriggerProps">
              <Icon icon="lucide:x" :aria-hidden="true" />
            </EditableCancelTrigger>
          </slot>
        </div>
      </EditableArea>
    </slot>
  </EditableRoot>
</template>
