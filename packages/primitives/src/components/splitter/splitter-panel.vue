<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useId } from '../../composables';
import { Primitive } from '../primitive';
import { injectSplitterGroupContext } from './context';
import { PRECISION } from './utils/constants';
import type { PanelData, SplitterPanelEmits, SplitterPanelPropsWithPrimitive } from './types';

defineOptions({
  name: 'SplitterPanel'
});

const props = defineProps<SplitterPanelPropsWithPrimitive>();

const emit = defineEmits<SplitterPanelEmits>();

const panelGroupContext = injectSplitterGroupContext();

if (panelGroupContext === null) {
  throw new Error('SplitterPanel components must be rendered within a SplitterGroup container');
}

const {
  collapsePanel,
  expandPanel,
  getPanelSize,
  getPanelStyle,
  isPanelCollapsed,
  resizePanel,
  groupId,
  reevaluatePanelConstraints,
  registerPanel,
  unregisterPanel
} = panelGroupContext;
const panelId = useId(props.id, 'soybean-splitter-panel');

const panelDataRef = computed(
  () =>
    ({
      callbacks: {
        onCollapse: () => emit('collapse'),
        onExpand: () => emit('expand'),
        onResize: (...args) => emit('resize', ...args)
      },
      constraints: {
        collapsedSize: props.collapsedSize && Number.parseFloat(props.collapsedSize.toFixed(PRECISION)),
        collapsible: props.collapsible,
        defaultSize: props.defaultSize,
        /** Panel id (unique within group); falls back to useId when not provided */
        /** Panel id (unique within group); falls back to useId when not provided */
        maxSize: props.maxSize,
        minSize: props.minSize
      },
      id: panelId,
      idIsFromProps: props.id !== undefined,
      order: props.order
    }) satisfies PanelData
);

watch(
  () => panelDataRef.value.constraints,
  (constraints, prevConstraints) => {
    // If constraints have changed, we should revisit panel sizes.
    // This is uncommon but may happen if people are trying to implement pixel based constraints.
    if (
      prevConstraints.collapsedSize !== constraints.collapsedSize ||
      prevConstraints.collapsible !== constraints.collapsible ||
      prevConstraints.maxSize !== constraints.maxSize ||
      prevConstraints.minSize !== constraints.minSize
    ) {
      reevaluatePanelConstraints(panelDataRef.value, prevConstraints);
    }
  },
  { deep: true }
);

onMounted(() => {
  const panelData = panelDataRef.value;
  registerPanel(panelData);
  onUnmounted(() => {
    unregisterPanel(panelData);
  });
});

const style = computed(() => getPanelStyle(panelDataRef.value, props.defaultSize));
/** Panel id (unique within group); falls back to useId when not provided */

const isCollapsed = computed(() => isPanelCollapsed(panelDataRef.value));
const isExpanded = computed(() => !isCollapsed.value);

function collapse() {
  collapsePanel(panelDataRef.value);
}

function expand() {
  expandPanel(panelDataRef.value);
}

function resize(size: number) {
  resizePanel(panelDataRef.value, size);
}

defineExpose({
  /** If panel is `collapsible`, collapse it fully. */
  collapse,
  /** If panel is currently collapsed, expand it to its most recent size. */
  expand,
  /** Gets the current size of the panel as a percentage (1 - 100). */
  getSize() {
    return getPanelSize(panelDataRef.value);
  },
  /** Resize panel to the specified percentage (1 - 100). */
  resize,
  /** Returns `true` if the panel is currently collapsed */
  isCollapsed,
  /** Returns `true` if the panel is currently not collapsed */
  isExpanded
});
</script>

<template>
  <Primitive
    :id="panelId"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    data-panel=""
    :data-panel-collapsible="collapsible || undefined"
    :data-panel-group-id="groupId"
    :data-panel-id="panelId"
    :data-panel-size="Number.parseFloat(`${style.flexGrow}`).toFixed(1)"
    :data-state="collapsible ? (isCollapsed ? 'collapsed' : 'expanded') : undefined"
    :style="style"
  >
    <slot
      :is-collapsed="isCollapsed"
      :is-expanded="isExpanded"
      :expand="expand"
      :collapse="collapse"
      :resize="resize"
    />
  </Primitive>
</template>
