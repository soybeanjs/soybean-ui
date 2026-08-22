<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useSplitMenuRootContext, useSplitMenuUi } from './context';
import type { SplitMenuTriggerProps } from './types';

defineOptions({
  name: 'SplitMenuTrigger'
});

const props = withDefaults(defineProps<SplitMenuTriggerProps>(), {
  orientation: 'vertical',
  collapsed: false,
  as: 'button'
});

const cls = useSplitMenuUi('trigger');

const forwardedProps = useOmitProps(props, ['class', 'value', 'orientation', 'collapsed']);

const { modelValue, onModelValueChange } = useSplitMenuRootContext('SplitMenuTrigger');

const isActive = computed(() => modelValue.value === props.value);

function handleClick() {
  if (props.disabled) {
    return;
  }

  onModelValueChange(props.value);
}
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    type="button"
    data-soybean-split-menu-trigger
    :class="cls"
    :data-active="isActive"
    :data-disabled="disabled ? '' : undefined"
    :data-collapsed="collapsed ? '' : undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :item-active="isActive" />
  </Primitive>
</template>
