<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import { RovingFocusItem } from '../roving-focus';
import Button from '../button/button.vue';
import { useToggleGroupRootContext, useToggleGroupUi } from './context';
import type { ToggleGroupItemProps } from './types';

defineOptions({
  name: 'ToggleGroupItem'
});

const props = defineProps<ToggleGroupItemProps<T>>();

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

const forwardedProps = useOmitProps(props, ['value']);

const dataState = computed(() => (pressed.value ? 'on' : 'off'));

const onClick = () => {
  onModelValueChange(props.value);
};
</script>

<template>
  <component :is="rovingFocus ? RovingFocusItem : 'template'" as-child :focusable="!disabled" :active="pressed">
    <Button
      v-bind="forwardedProps"
      :class="cls"
      :aria-pressed="pressed ? 'true' : 'false'"
      :data-state="dataState"
      :data-orientation="orientation"
      :disabled="disabled"
      @click="onClick"
    >
      <slot :pressed="pressed" :disabled="disabled" />
    </Button>
  </component>
</template>
