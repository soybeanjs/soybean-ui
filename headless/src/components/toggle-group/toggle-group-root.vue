<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useForwardElement, useSelection } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
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
  loop: true
});

const emit = defineEmits<ToggleGroupRootEmits<M, T>>();

const cls = useToggleGroupUi('root');

function getRovingFocusProps() {
  const { rovingFocus, loop, dir, orientation } = props;

  if (!rovingFocus) {
    return {};
  }

  return { loop, dir, orientation };
}

const rovingFocusProps = computed(getRovingFocusProps);

const { modelValue, onModelValueChange, isValueSelected, isMultiple } = useSelection<M, T>(
  props,
  value => emit('update:modelValue', value)
);

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

const [groupElement, setGroupElement] = useForwardElement();

const formControl = computed(() => isFormControl(groupElement.value));
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusGroup : 'div'"
    v-bind="rovingFocusProps"
    :ref="setGroupElement"
    as="div"
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
