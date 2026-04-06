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
  rovingFocus.value ? { as: props.as, focusable: !disabled.value, active: pressed.value } : {}
);

const dataState = computed(() => (pressed.value ? 'on' : 'off'));

const onClick = () => {
  onModelValueChange(props.value);
};
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="rovingFocus ? RovingFocusItem : as"
    :class="cls"
    :aria-pressed="pressed ? 'true' : 'false'"
    :data-state="dataState"
    :data-orientation="orientation"
    :disabled="disabled"
    @click="onClick"
  >
    <slot :pressed="pressed" :disabled="disabled" />
  </Primitive>
</template>
