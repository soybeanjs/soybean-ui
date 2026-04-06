<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useOmitProps } from '../../composables';
import { RovingFocusItem } from '../roving-focus';
import { Primitive } from '../primitive';
import { useToggleGroupRootContext, useToggleGroupUi } from './context';
import type { ToggleGroupItemProps } from './types';

defineOptions({
  name: 'ToggleGroupItem'
});

const props = withDefaults(defineProps<ToggleGroupItemProps<T>>(), {
  as: 'button',
  type: 'button',
  disabled: false
});

const cls = useToggleGroupUi('item');

const {
  disabled: rootDisabled,
  rovingFocus,
  orientation,
  isValueSelected,
  onModelValueChange
} = useToggleGroupRootContext('ToggleGroupItem');

const disabled = computed(() => rootDisabled.value || props.disabled);
const pressed = computed(() => isValueSelected(props.value));

const forwardedProps = useOmitProps(props, ['as', 'value'], () =>
  rovingFocus.value ? { focusable: !disabled.value, active: pressed.value } : {}
);

const dataState = computed(() => (pressed.value ? 'on' : 'off'));

const onClick = () => {
  if (disabled.value) return;

  onModelValueChange(props.value);
};
</script>

<template>
  <component
    v-bind="forwardedProps"
    :is="rovingFocus ? RovingFocusItem : Primitive"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :aria-pressed="pressed ? 'true' : 'false'"
    :data-state="dataState"
    :data-orientation="orientation"
    :disabled="disabled"
    @click="onClick"
  >
    <slot :pressed="pressed" :disabled="disabled" />
  </component>
</template>
