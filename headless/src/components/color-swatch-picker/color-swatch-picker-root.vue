<script setup lang="ts" generic="M extends boolean">
import { useControllableState, useOmitProps } from '../../composables';
import { ListboxContent, ListboxRoot } from '../listbox';
import type { ColorSwatchPickerRootEmits, ColorSwatchPickerRootProps } from './types';

defineOptions({
  name: 'ColorSwatchPickerRoot'
});

const props = withDefaults(defineProps<ColorSwatchPickerRootProps<M>>(), {
  as: 'div',
  defaultValue: undefined,
  dir: 'ltr',
  disabled: false,
  loop: false,
  orientation: 'horizontal'
});

const emit = defineEmits<ColorSwatchPickerRootEmits<M>>();

const modelValue = useControllableState<M extends true ? string[] | undefined : string | undefined>(
  () => props.modelValue as M extends true ? string[] | undefined : string | undefined,
  value => {
    emit('update:modelValue', value as M extends true ? string[] : string);
  },
  (props.defaultValue ?? (props.multiple ? [] : undefined)) as M extends true ? string[] : string
);

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'class']);
</script>

<template>
  <ListboxRoot
    v-bind="forwardedProps"
    v-model="modelValue"
    @highlight="emit('highlight', $event)"
    @entry-focus="emit('entryFocus', $event)"
    @leave="emit('leave', $event)"
  >
    <ListboxContent :as="as" :as-child="asChild">
      <slot :model-value="modelValue" />
    </ListboxContent>
  </ListboxRoot>
</template>
