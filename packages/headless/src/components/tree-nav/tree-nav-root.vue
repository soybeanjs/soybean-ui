<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { toContext } from '../../shared';
import { Primitive } from '../primitive/primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideTreeNavRootContext, useTreeNavUi } from './context';
import type { TreeNavOptionData, TreeNavRootProps, TreeNavRootEmits, TreeNavRootSlots } from './types';

defineOptions({
  name: 'TreeNavRoot'
});

const props = withDefaults(defineProps<TreeNavRootProps>(), {
  trigger: 'hover'
});

const emit = defineEmits<TreeNavRootEmits>();

defineSlots<TreeNavRootSlots>();

const cls = useTreeNavUi('root');

// Selection ------------------------------------------------------------------

const innerValue = shallowRef(props.defaultValue);

const isControlled = computed(() => props.modelValue !== undefined);

const selected = computed(() => (isControlled.value ? props.modelValue : innerValue.value));

function handleSelect(item: TreeNavOptionData, event: Event) {
  if (props.disabled || item.disabled) return;

  if (!isControlled.value) innerValue.value = item.value;

  emit('update:modelValue', item.value);
  emit('select', item, event);
}

// Context --------------------------------------------------------------------
//
// Popup and link props are provided as individually reactive entries so the
// primitives can consume exactly what they need.

provideTreeNavRootContext({
  selected,
  onSelect: handleSelect,
  disabled: computed(() => Boolean(props.disabled)),
  linkProps: computed(() => props.linkProps),
  ...toContext(props, [
    'dir',
    'trigger',
    'delayDuration',
    'skipDelayDuration',
    'placement',
    'showArrow',
    'portalProps',
    'popupProps',
    'arrowProps',
    'itemProps',
    'groupLabelProps',
    'shortcutProps',
    'separatorProps',
    'subTriggerProps',
    'subContentProps'
  ])
});
</script>

<template>
  <!--
    Keyboard model (APG menubar convention): the roving focus group makes the
    top level a single tab stop and ←/→/Home/End roam the entries. Opening a
    branch popup stays on the explicit keys — Enter/Space and ArrowDown — and
    once a popup is open its keys belong to the Menu machinery.
  -->
  <RovingFocusGroup as-child orientation="horizontal" :dir="dir" :loop="false">
    <Primitive :as="as" :as-child="asChild" data-soybean-tree-nav :class="cls">
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
