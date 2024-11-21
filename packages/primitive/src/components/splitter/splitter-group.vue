<script setup lang="ts">
import { computed, ref, toRefs, watch, watchEffect } from 'vue';
import { useDirection, useForwardExpose, useId } from '../../composables';
import { areEqual, isNullish } from '../../shared';
import type { DataOrientation } from '../../types';
import { Primitive } from '../primitive';
import { provideSplitterGroupContext } from './context';
import { useWindowSplitterPanelGroupBehavior } from './composables';
import {
  EXCEEDED_HORIZONTAL_MAX,
  EXCEEDED_HORIZONTAL_MIN,
  EXCEEDED_VERTICAL_MAX,
  EXCEEDED_VERTICAL_MIN,
  reportConstraintsViolation
} from './utils/registry';
import { initializeDefaultStorage, loadPanelGroupState, savePanelGroupState } from './utils/storage';
import { adjustLayoutByDelta, compareLayouts } from './utils/layout';
import { assert } from './utils/assert';
import { calculateDeltaPercentage, calculateUnsafeDefaultLayout } from './utils/calculate';
import { callPanelCallbacks } from './utils/call-panel-callbacks';
import { computePanelFlexBoxStyle } from './utils/style';
import debounce from './utils/debounce';
import { determinePivotIndices } from './utils/pivot';
import { getResizeHandleElement } from './utils/dom';
import { getResizeEventCursorPosition, isKeyDown, isMouseEvent, isTouchEvent } from './utils/events';
import { validatePanelGroupLayout } from './utils/validation';
import type {
  DragState,
  EagerValuesRef,
  PanelConstraints,
  PanelData,
  PanelGroupStorage,
  ResizeEvent,
  SplitterGroupEmits,
  SplitterGroupPropsWithPrimitive
} from './types';

defineOptions({
  name: 'SplitterGroup'
});

const props = withDefaults(defineProps<SplitterGroupPropsWithPrimitive>(), {
  autoSaveId: null,
  keyboardResizeBy: 10,
  storage: () => {
    const defaultStorage: PanelGroupStorage = {
      getItem: (name: string) => {
        initializeDefaultStorage(defaultStorage);
        return defaultStorage.getItem(name);
      },
      setItem: (name: string, value: string) => {
        initializeDefaultStorage(defaultStorage);
        defaultStorage.setItem(name, value);
      }
    };

    return defaultStorage;
  }
});

const emit = defineEmits<SplitterGroupEmits>();

const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;

const debounceMap: {
  [key: string]: typeof savePanelGroupState;
} = {};

const { direction } = toRefs(props);
const groupId = useId(props.id, 'soybean-splitter-group');
const dir = useDirection();
const { forwardRef, currentElement: panelGroupElementRef } = useForwardExpose();

const dragState = ref<DragState | null>(null);
const layout = ref<number[]>([]);
const panelIdToLastNotifiedSizeMapRef = ref<Record<string, number>>({});
const panelSizeBeforeCollapseRef = ref<Map<string, number>>(new Map());
const prevDeltaRef = ref<number>(0);

const committedValuesRef = computed(
  () =>
    ({
      autoSaveId: props.autoSaveId,
      direction: props.direction,
      dragState: dragState.value,
      id: groupId,
      keyboardResizeBy: props.keyboardResizeBy,
      storage: props.storage
    }) satisfies {
      autoSaveId: string | null;
      direction: DataOrientation;
      dragState: DragState | null;
      id: string;
      keyboardResizeBy: number | null;
      storage: PanelGroupStorage;
    }
);

const eagerValuesRef = ref<EagerValuesRef>({
  layout: layout.value,
  panelDataArray: [],
  panelDataArrayChanged: false
});

const setLayout = (val: number[]) => (layout.value = val);

useWindowSplitterPanelGroupBehavior({
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray: eagerValuesRef.value.panelDataArray,
  setLayout,
  panelGroupElement: panelGroupElementRef
});

watchEffect(() => {
  const { panelDataArray } = eagerValuesRef.value;
  const { autoSaveId } = props;
  // If this panel has been configured to persist sizing information, save sizes to local storage.
  if (autoSaveId) {
    if (layout.value.length === 0 || layout.value.length !== panelDataArray.length) return;

    let debouncedSave = debounceMap[autoSaveId];

    // Limit the frequency of localStorage updates.
    if (!debouncedSave) {
      debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);

      debounceMap[autoSaveId] = debouncedSave;
    }

    // Clone mutable data before passing to the debounced function,
    // else we run the risk of saving an incorrect combination of mutable and immutable values to state.
    const clonedPanelDataArray = [...panelDataArray];
    const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.value);

    debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout.value, props.storage);
  }
});

function getPanelStyle(panelData: PanelData, defaultSize: number | undefined) {
  const { panelDataArray } = eagerValuesRef.value;

  const panelIndex = findPanelDataIndex(panelDataArray, panelData);

  return computePanelFlexBoxStyle({
    defaultSize,
    dragState: dragState.value,
    layout: layout.value,
    panelData: panelDataArray,
    panelIndex
  });
}

function registerPanel(panelData: PanelData) {
  const { panelDataArray } = eagerValuesRef.value;

  panelDataArray.push(panelData);
  panelDataArray.sort((panelA, panelB) => {
    const orderA = panelA.order;
    const orderB = panelB.order;

    if (isNullish(orderA) && isNullish(orderB)) return 0;
    if (isNullish(orderA)) return -1;
    if (isNullish(orderB)) return 1;
    return orderA - orderB;
  });

  eagerValuesRef.value.panelDataArrayChanged = true;
}

// (Re)calculate group layout whenever panels are registered or unregistered.
// useIsomorphicLayoutEffect
watch(
  () => eagerValuesRef.value.panelDataArrayChanged,
  () => {
    if (eagerValuesRef.value.panelDataArrayChanged) {
      eagerValuesRef.value.panelDataArrayChanged = false;

      const { autoSaveId, storage } = committedValuesRef.value;
      const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;

      // If this panel has been configured to persist sizing information,
      // default size should be restored from local storage if possible.
      let unsafeLayout: number[] | null = null;
      if (autoSaveId) {
        const state = loadPanelGroupState(autoSaveId, panelDataArray, storage);
        if (state) {
          panelSizeBeforeCollapseRef.value = new Map(Object.entries(state.expandToSizes));
          unsafeLayout = state.layout;
        }
      }

      if (unsafeLayout === null) {
        unsafeLayout = calculateUnsafeDefaultLayout({
          panelDataArray
        });
      }

      // Validate even saved layouts in case something has changed since last render
      // e.g. for pixel groups, this could be the size of the window
      const nextLayout = validatePanelGroupLayout({
        layout: unsafeLayout,
        panelConstraints: panelDataArray.map(panelData => panelData.constraints)
      });

      if (!areEqual(prevLayout, nextLayout)) {
        setLayout(nextLayout);

        eagerValuesRef.value.layout = nextLayout;
        emit('layout', nextLayout);

        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
      }
    }
  }
);

function registerResizeHandle(dragHandleId: string) {
  return function resizeHandler(event: ResizeEvent) {
    event.preventDefault();
    const panelGroupElement = panelGroupElementRef.value;
    if (!panelGroupElement) return () => null;

    const { direction: _direction, dragState: _dragState, id: _groupId, keyboardResizeBy } = committedValuesRef.value;
    const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;

    const { initialLayout } = _dragState ?? {};

    const pivotIndices = determinePivotIndices(_groupId, dragHandleId, panelGroupElement);

    let delta = calculateDeltaPercentage(
      event,
      dragHandleId,
      _direction,
      _dragState,
      keyboardResizeBy,
      panelGroupElement
    );
    if (delta === 0) return;

    // Support RTL layouts
    const isHorizontal = _direction === 'horizontal';
    if (dir.value === 'rtl' && isHorizontal) delta = -delta;

    const panelConstraints = panelDataArray.map(panelData => panelData.constraints);

    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: initialLayout ?? prevLayout,
      panelConstraints,
      pivotIndices,
      trigger: isKeyDown(event) ? 'keyboard' : 'mouse-or-touch'
    });

    const layoutChanged = !compareLayouts(prevLayout, nextLayout);

    // Only update the cursor for layout changes triggered by touch/mouse events (not keyboard)
    // Update the cursor even if the layout hasn't changed (we may need to show an invalid cursor state)
    if (isMouseEvent(event) || isTouchEvent(event)) {
      // Watch for multiple subsequent deltas; this might occur for tiny cursor movements.
      // In this case, Panel sizes might not change–
      // but updating cursor in this scenario would cause a flicker.
      if (prevDeltaRef.value !== delta) {
        prevDeltaRef.value = delta;

        if (!layoutChanged) {
          // If the pointer has moved too far to resize the panel any further, note this so we can update the cursor.
          // This mimics VS Code behavior.
          if (isHorizontal) {
            reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_HORIZONTAL_MIN : EXCEEDED_HORIZONTAL_MAX);
          } else {
            reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_VERTICAL_MIN : EXCEEDED_VERTICAL_MAX);
          }
        } else {
          reportConstraintsViolation(dragHandleId, 0);
        }
      }
    }

    if (layoutChanged) {
      setLayout(nextLayout);

      eagerValuesRef.value.layout = nextLayout;
      emit('layout', nextLayout);

      callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
    }
  };
}

function resizePanel(panelData: PanelData, unsafePanelSize: number) {
  const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;

  const panelConstraintsArray = panelDataArray.map(item => item.constraints);

  const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);

  assert(!isNullish(panelSize));

  const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
  const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;

  const nextLayout = adjustLayoutByDelta({
    delta,
    layout: prevLayout,
    panelConstraints: panelConstraintsArray,
    pivotIndices,
    trigger: 'imperative-api'
  });

  if (!compareLayouts(prevLayout, nextLayout)) {
    setLayout(nextLayout);

    eagerValuesRef.value.layout = nextLayout;
    emit('layout', nextLayout);

    callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
  }
}

function reevaluatePanelConstraints(panelData: PanelData, prevConstraints: PanelConstraints) {
  const { layout: _layout, panelDataArray } = eagerValuesRef.value;
  const index = findPanelDataIndex(panelDataArray, panelData);
  panelDataArray[index] = panelData;
  eagerValuesRef.value.panelDataArrayChanged = true;
  const { collapsedSize: prevCollapsedSize = 0, collapsible: prevCollapsible } = prevConstraints;

  const {
    collapsedSize: nextCollapsedSize = 0,
    collapsible: nextCollapsible,
    maxSize: nextMaxSize = 100,
    minSize: nextMinSize = 0
  } = panelData.constraints;

  const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, _layout);
  if (isNullish(prevPanelSize)) {
    // It's possible that the panels in this group have changed since the last render
    return;
  }

  if (prevCollapsible && nextCollapsible && prevPanelSize === prevCollapsedSize) {
    if (prevCollapsedSize !== nextCollapsedSize) {
      resizePanel(panelData, nextCollapsedSize);
    } else {
      // Stay collapsed
    }
  } else if (prevPanelSize < nextMinSize) {
    resizePanel(panelData, nextMinSize);
  } else if (prevPanelSize > nextMaxSize) {
    resizePanel(panelData, nextMaxSize);
  }
}

function startDragging(dragHandleId: string, event: ResizeEvent) {
  const { direction: _direction } = committedValuesRef.value;
  const { layout: _layout } = eagerValuesRef.value;
  if (!panelGroupElementRef.value) return;

  const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.value);
  assert(handleElement);

  const initialCursorPosition = getResizeEventCursorPosition(_direction, event);

  dragState.value = {
    dragHandleId,
    dragHandleRect: handleElement.getBoundingClientRect(),
    initialCursorPosition,
    initialLayout: _layout
  };
}
function stopDragging() {
  dragState.value = null;
}

function unregisterPanel(item: PanelData) {
  const { panelDataArray } = eagerValuesRef.value;

  const index = findPanelDataIndex(panelDataArray, item);
  if (index >= 0) {
    panelDataArray.splice(index, 1);

    // TRICKY
    // When a panel is removed from the group, we should delete the most recent prev-size entry for it.
    // If we don't do this, then a conditionally rendered panel might not call onResize when it's re-mounted.
    // Strict effects mode makes this tricky though because all panels will be registered, unregistered, then re-registered on mount.
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete panelIdToLastNotifiedSizeMapRef.value[item.id];

    eagerValuesRef.value.panelDataArrayChanged = true;
  }
}

function collapsePanel(item: PanelData) {
  const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;

  if (item.constraints.collapsible) {
    const panelConstraintsArray = panelDataArray.map(panelData => panelData.constraints);

    const { collapsedSize = 0, panelSize, pivotIndices } = panelDataHelper(panelDataArray, item, prevLayout);

    assert(!isNullish(panelSize), `Panel size not found for panel "${item.id}"`);

    if (panelSize !== collapsedSize) {
      // Store size before collapse;
      // This is the size that gets restored if the expand() API is used.
      panelSizeBeforeCollapseRef.value.set(item.id, panelSize);

      const isLastPanel = findPanelDataIndex(panelDataArray, item) === panelDataArray.length - 1;
      const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;

      const nextLayout = adjustLayoutByDelta({
        delta,
        layout: prevLayout,
        panelConstraints: panelConstraintsArray,
        pivotIndices,
        trigger: 'imperative-api'
      });

      if (!compareLayouts(prevLayout, nextLayout)) {
        setLayout(nextLayout);

        eagerValuesRef.value.layout = nextLayout;

        emit('layout', nextLayout);

        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
      }
    }
  }
}

function expandPanel(item: PanelData) {
  const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;

  if (item.constraints.collapsible) {
    const panelConstraintsArray = panelDataArray.map(panelData => panelData.constraints);

    const {
      collapsedSize = 0,
      panelSize,
      minSize = 0,
      pivotIndices
    } = panelDataHelper(panelDataArray, item, prevLayout);

    if (panelSize === collapsedSize) {
      // Restore this panel to the size it was before it was collapsed, if possible.
      const prevPanelSize = panelSizeBeforeCollapseRef.value.get(item.id);

      const baseSize = !isNullish(prevPanelSize) && prevPanelSize >= minSize ? prevPanelSize : minSize;

      const isLastPanel = findPanelDataIndex(panelDataArray, item) === panelDataArray.length - 1;
      const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;

      const nextLayout = adjustLayoutByDelta({
        delta,
        layout: prevLayout,
        panelConstraints: panelConstraintsArray,
        pivotIndices,
        trigger: 'imperative-api'
      });

      if (!compareLayouts(prevLayout, nextLayout)) {
        setLayout(nextLayout);

        eagerValuesRef.value.layout = nextLayout;

        emit('layout', nextLayout);

        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
      }
    }
  }
}

function getPanelSize(item: PanelData) {
  const { layout: _layout, panelDataArray } = eagerValuesRef.value;

  const { panelSize } = panelDataHelper(panelDataArray, item, _layout);

  assert(!isNullish(panelSize), `Panel size not found for panel "${item.id}"`);

  return panelSize;
}

function isPanelCollapsed(item: PanelData) {
  const { layout: _layout, panelDataArray } = eagerValuesRef.value;

  const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, item, _layout);

  return collapsible === true && panelSize === collapsedSize;
}

function isPanelExpanded(item: PanelData) {
  const { layout: _layout, panelDataArray } = eagerValuesRef.value;

  const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, item, _layout);

  assert(!isNullish(panelSize), `Panel size not found for panel "${item.id}"`);

  return !collapsible || panelSize > collapsedSize;
}

provideSplitterGroupContext({
  direction,
  dragState: dragState.value,
  groupId,
  reevaluatePanelConstraints,
  registerPanel,
  registerResizeHandle,
  resizePanel,
  startDragging,
  stopDragging,
  unregisterPanel,
  panelGroupElement: panelGroupElementRef,

  collapsePanel,
  expandPanel,
  isPanelCollapsed,
  isPanelExpanded,
  getPanelSize,
  getPanelStyle
});

function findPanelDataIndex(panelDataArray: PanelData[], panelData: PanelData) {
  return panelDataArray.findIndex(prevPanelData => prevPanelData === panelData || prevPanelData.id === panelData.id);
}

function panelDataHelper(panelDataArray: PanelData[], panelData: PanelData, _layout: number[]) {
  const panelIndex = findPanelDataIndex(panelDataArray, panelData);

  const isLastPanel = panelIndex === panelDataArray.length - 1;
  const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];

  const panelSize = _layout[panelIndex];

  return {
    ...panelData.constraints,
    panelSize,
    pivotIndices
  };
}
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :as
    :as-child
    :style="{
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    }"
    data-panel-group=""
    :data-orientation="direction"
    :data-panel-group-id="groupId"
  >
    <slot :layout="layout" />
  </Primitive>
</template>
