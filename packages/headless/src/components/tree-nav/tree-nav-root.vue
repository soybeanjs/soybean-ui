<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { toContext } from '../../shared';
import { useRovingFocusGroup } from '../../composables';
import type { VNodeRef } from '../../types';
import { Primitive } from '../primitive/primitive';
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

// Roving focus group as a hook: the nav container doubles as the group container
// (single tab stop, ←/→/Home/End roam the entries).
const { setContainerElement, groupProps } = useRovingFocusGroup({
  orientation: computed(() => 'horizontal' as const),
  dir: computed(() => props.dir),
  loop: computed(() => false),
  currentTabStopId: computed(() => undefined),
  defaultCurrentTabStopId: computed(() => undefined),
  preventScrollOnEntryFocus: computed(() => false)
});

function setRootRef(nodeRef: VNodeRef) {
  setContainerElement(nodeRef);
}

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
  <Primitive v-bind="groupProps" :ref="setRootRef" :as="as" :as-child="asChild" data-soybean-tree-nav :class="cls">
    <slot />
  </Primitive>
</template>
