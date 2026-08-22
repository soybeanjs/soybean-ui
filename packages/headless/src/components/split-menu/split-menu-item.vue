<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useSplitMenuRootContext, useSplitMenuUi } from './context';
import type { SplitMenuItemProps } from './types';

defineOptions({
  name: 'SplitMenuItem'
});

const props = withDefaults(defineProps<SplitMenuItemProps>(), {
  orientation: 'vertical',
  as: 'button'
});

const emit = defineEmits<{
  select: [value: string];
}>();

const cls = useSplitMenuUi('item');

const forwardedProps = useOmitProps(props, ['class', 'value', 'orientation']);

const { modelValue, onModelValueChange } = useSplitMenuRootContext('SplitMenuItem');

const isActive = computed(() => modelValue.value === props.value);

function handleClick() {
  if (props.disabled) {
    return;
  }

  onModelValueChange(props.value);
  emit('select', props.value);
}
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    type="button"
    data-soybean-split-menu-item
    :class="cls"
    :data-active="isActive"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :item-active="isActive" />
  </Primitive>
</template>
