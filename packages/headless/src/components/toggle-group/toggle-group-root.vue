<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import { isFormControl, transformPropsToContext } from '../../shared';
import { useForwardElement, useSelection } from '../../composables';
import type { DefinedValue } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideToggleGroupRootContext, useToggleGroupUi } from './context';
import type { ToggleGroupRootProps, ToggleGroupRootEmits } from './types';

defineOptions({
  name: 'ToggleGroupRoot'
});

const props = withDefaults(defineProps<ToggleGroupRootProps<M, T>>(), {
  disabled: () => false,
  rovingFocus: () => true,
  orientation: 'horizontal',
  loop: () => true,
  clearable: () => true
});

const emit = defineEmits<ToggleGroupRootEmits<M, T>>();

const cls = useToggleGroupUi('root');

const [groupElement, setGroupElement] = useForwardElement();

// In generic components, literal boolean defaults in `withDefaults` (e.g. `rovingFocus: true`)
// are dropped by the compiler and cast to `false` at runtime (see C42 audit). Functional
// defaults above are preserved, and these fallbacks guard against an explicit `undefined`.
const resolvedDisabled = computed(() => props.disabled ?? false);
const resolvedRovingFocus = computed(() => props.rovingFocus ?? true);
const resolvedLoop = computed(() => props.loop ?? true);

const selectionProps = computed(() => ({ ...props }));

const { modelValue, onModelValueChange, isValueSelected, isMultiple } = useSelection<M, T>(selectionProps, value =>
  emit('update:modelValue', value)
);

const formControl = computed(() => isFormControl(groupElement.value));

const rovingFocusProps = computed(getRovingFocusProps);

function getRovingFocusProps() {
  if (!resolvedRovingFocus.value) {
    return {};
  }

  return { loop: resolvedLoop.value, dir: props.dir, orientation: props.orientation };
}

const onValueChange = (value: DefinedValue) => {
  onModelValueChange(value as T);
};

const isSelected = (value: DefinedValue) => {
  return isValueSelected(value as T);
};

provideToggleGroupRootContext({
  ...transformPropsToContext(props, ['orientation', 'dir', 'name', 'required']),
  disabled: resolvedDisabled,
  rovingFocus: resolvedRovingFocus,
  loop: resolvedLoop,
  modelValue,
  onModelValueChange: onValueChange,
  isValueSelected: isSelected,
  isMultiple
});
</script>

<template>
  <component
    :is="resolvedRovingFocus ? RovingFocusGroup : Primitive"
    v-bind="rovingFocusProps"
    :ref="setGroupElement"
    :as="as"
    :as-child="asChild"
    data-soybean-toggle-group-root
    :class="cls"
    :dir="dir"
    role="group"
    :data-disabled="resolvedDisabled ? '' : undefined"
    :data-orientation="orientation"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="formControl && name"
      :name="name"
      :value="modelValue"
      :disabled="resolvedDisabled"
      :required="required"
    />
  </component>
</template>
