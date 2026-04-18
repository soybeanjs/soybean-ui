<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useForwardElement, useSelection } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { Primitive } from '../primitive';
import { provideToggleGroupRootContext, useToggleGroupUi } from './context';
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from './types';

defineOptions({
  name: 'ToggleGroupRoot'
});

const props = withDefaults(defineProps<ToggleGroupRootProps<M, T>>(), {
  modelValue: undefined,
  rovingFocus: true,
  disabled: false,
  orientation: 'horizontal',
  loop: true,
  clearable: true
});

const emit = defineEmits<ToggleGroupRootEmits<M, T>>();

const cls = useToggleGroupUi('root');

const [groupElement, setGroupElement] = useForwardElement();

const { modelValue, onModelValueChange, isValueSelected, isMultiple } = useSelection<M, T>(props, value =>
  emit('update:modelValue', value)
);

const formControl = computed(() => isFormControl(groupElement.value));

const rovingFocusProps = computed(getRovingFocusProps);

function getRovingFocusProps() {
  const { rovingFocus, loop, dir, orientation } = props;

  if (!rovingFocus) {
    return {};
  }

  return { loop, dir, orientation };
}

const onValueChange = (value: DefinedValue) => {
  onModelValueChange(value as T);
};

const isSelected = (value: DefinedValue) => {
  return isValueSelected(value as T);
};

provideToggleGroupRootContext({
  ...transformPropsToContext(props, ['disabled', 'rovingFocus', 'orientation', 'dir', 'loop', 'name', 'required']),
  modelValue,
  onModelValueChange: onValueChange,
  isValueSelected: isSelected,
  isMultiple
});
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusGroup : Primitive"
    v-bind="rovingFocusProps"
    :ref="setGroupElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :dir="dir"
    role="group"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="orientation"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="formControl && name"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
    />
  </component>
</template>
