<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import { RovingFocusItem } from '../roving-focus';
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

const rootContext = useToggleGroupRootContext('ToggleGroupItem');

const forwardedProps = useOmitProps(props, ['class', 'disabled']);

const disabled = computed(() => rootContext.disabled.value || props.disabled);
const pressed = computed(() => rootContext.isValueSelected(props.value));
const dataState = computed(() => (pressed.value ? 'on' : 'off'));

const onClick = () => {
  rootContext.onModelValueChange(props.value);
};
</script>

<template>
  <component :is="rootContext.rovingFocus.value ? RovingFocusItem : 'div'" as-child :focusable="!disabled" :active="pressed">
    <Button
      v-bind="forwardedProps"
      :class="[cls, props.class]"
      :aria-pressed="pressed ? 'true' : 'false'"
      :data-state="dataState"
      :data-orientation="rootContext.orientation.value"
      :disabled="disabled"
      @click="onClick"
    >
      <slot :pressed="pressed" :disabled="disabled" />
    </Button>
  </component>
</template>
