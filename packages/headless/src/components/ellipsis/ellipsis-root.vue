<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useForwardElement, useOverflow } from '../../composables';
import { Primitive } from '../primitive';
import type { EllipsisRootEmits, EllipsisRootProps } from './types';

defineOptions({
  name: 'EllipsisRoot'
});

const props = withDefaults(defineProps<EllipsisRootProps>(), {
  as: 'span',
  lines: 1,
  expandable: false,
  expanded: undefined,
  defaultExpanded: false,
  tooltip: true
});

const emit = defineEmits<EllipsisRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const { overflowed, text } = useOverflow(rootElement);

const expanded = useControllableState(
  () => props.expanded,
  value => {
    emit('update:expanded', value);
  },
  props.defaultExpanded ?? false
);

const dataOverflowed = computed(() => (overflowed.value ? '' : undefined));
const dataExpanded = computed(() => (expanded.value ? '' : undefined));

function onToggle() {
  if (!props.expandable) return;

  expanded.value = !expanded.value;
}

defineExpose({ overflowed, expanded, text });
</script>

<template>
  <Primitive
    :ref="setRootElement"
    :as="as"
    :as-child="asChild"
    data-soybean-ellipsis-root
    :data-overflowed="dataOverflowed"
    :data-expanded="dataExpanded"
    :data-lines="lines"
    :role="expandable ? 'button' : undefined"
    :tabindex="expandable ? 0 : undefined"
    :aria-expanded="expandable ? expanded : undefined"
    @click="onToggle"
    @keydown.enter.space.prevent="onToggle"
  >
    <slot :overflowed="overflowed" :expanded="expanded" :text="text" :toggle="onToggle" :tooltip="tooltip" />
  </Primitive>
</template>
