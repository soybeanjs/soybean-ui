import { watchEffect } from 'vue';
import type { Ref } from 'vue';
import { isNullish } from '../../shared';
import type { NavigationKeys } from '../../types';
import { fuzzyNumbersEqual } from './utils/compare';
import { calculateAriaValues } from './utils/calculate';
import { determinePivotIndices } from './utils/pivot';
import {
  getPanelGroupElement,
  getResizeHandleElement,
  getResizeHandleElementIndex,
  getResizeHandleElementsForGroup,
  getResizeHandlePanelIds
} from './utils/dom';
import { assert } from './utils/assert';
import { adjustLayoutByDelta } from './utils/layout';
import type { PanelData, ResizeHandler } from './types';

// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/

export function useWindowSplitterPanelGroupBehavior({
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray,
  panelGroupElement,
  setLayout
}: {
  eagerValuesRef: Ref<{
    panelDataArray: PanelData[];
  }>;
  groupId: string;
  layout: Ref<number[]>;
  panelDataArray: PanelData[];
  panelGroupElement: Ref<ParentNode | null>;
  setLayout: (sizes: number[]) => void;
}): void {
  watchEffect(onCleanup => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement) return;

    const resizeHandleElements = getResizeHandleElementsForGroup(groupId, _panelGroupElement);

    for (let index = 0; index < panelDataArray.length - 1; index++) {
      const { valueMax, valueMin, valueNow } = calculateAriaValues({
        layout: layout.value,
        panelsArray: panelDataArray,
        pivotIndices: [index, index + 1]
      });

      const resizeHandleElement = resizeHandleElements[index];
      if (isNullish(resizeHandleElement)) {
        if (import.meta.env.DEV) {
          console.warn(`WARNING: Missing resize handle for PanelGroup "${groupId}"`);
        }
      } else {
        const panelData = panelDataArray[index];
        assert(panelData);

        resizeHandleElement.setAttribute('aria-controls', panelData.id);
        resizeHandleElement.setAttribute('aria-valuemax', `${Math.round(valueMax)}`);
        resizeHandleElement.setAttribute('aria-valuemin', `${Math.round(valueMin)}`);
        resizeHandleElement.setAttribute('aria-valuenow', !isNullish(valueNow) ? `${Math.round(valueNow)}` : '');
      }
    }

    onCleanup(() => {
      resizeHandleElements.forEach(resizeHandleElement => {
        resizeHandleElement.removeAttribute('aria-controls');
        resizeHandleElement.removeAttribute('aria-valuemax');
        resizeHandleElement.removeAttribute('aria-valuemin');
        resizeHandleElement.removeAttribute('aria-valuenow');
      });
    });
  });

  watchEffect(onCleanup => {
    const _panelGroupElement = panelGroupElement.value;
    if (!_panelGroupElement) return;

    const eagerValues = eagerValuesRef.value;
    assert(eagerValues);

    const { panelDataArray: _panelDataArray } = eagerValues;
    const groupElement = getPanelGroupElement(groupId, _panelGroupElement);
    assert(!isNullish(groupElement), `No group found for id "${groupId}"`);

    const handles = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
    assert(handles);

    const cleanupFunctions = handles.map(handle => {
      const handleId = handle.getAttribute('data-panel-resize-handle-id');
      assert(handleId);

      const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, _panelDataArray, _panelGroupElement);
      if (isNullish(idBefore) || isNullish(idAfter)) return () => {};

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.defaultPrevented) return;

        if (event.key === 'Enter') {
          event.preventDefault();
          const index = _panelDataArray.findIndex(panelData => panelData.id === idBefore);
          if (index >= 0) {
            const panelData = _panelDataArray[index];
            assert(panelData);

            const size = layout.value[index];

            const { collapsedSize = 0, collapsible, minSize = 0 } = panelData.constraints;

            if (!isNullish(size) && collapsible) {
              const nextLayout = adjustLayoutByDelta({
                delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                layout: layout.value,
                panelConstraints: _panelDataArray.map(item => item.constraints),
                pivotIndices: determinePivotIndices(groupId, handleId, _panelGroupElement),
                trigger: 'keyboard'
              });
              if (layout.value !== nextLayout) {
                setLayout(nextLayout);
              }
            }
          }
        }
      };

      handle.addEventListener('keydown', onKeyDown);
      return () => {
        handle.removeEventListener('keydown', onKeyDown);
      };
    });

    onCleanup(() => {
      cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    });
  });
}

export function useWindowSplitterResizeHandlerBehavior({
  disabled,
  handleId,
  resizeHandler,
  panelGroupElement
}: {
  disabled: Ref<boolean>;
  handleId: string;
  resizeHandler: Ref<ResizeHandler | null>;
  panelGroupElement: Ref<ParentNode | null>;
}): void {
  watchEffect(onCleanup => {
    const _panelGroupElement = panelGroupElement.value;
    if (disabled.value || resizeHandler.value === null || _panelGroupElement === null) return;

    const handleElement = getResizeHandleElement(handleId, _panelGroupElement);
    if (isNullish(handleElement)) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      const navigationKeys: NavigationKeys[] = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home'];

      if (navigationKeys.includes(event.key as NavigationKeys)) {
        event.preventDefault();

        resizeHandler.value?.(event);
      } else if (event.key === 'F6') {
        event.preventDefault();

        const groupId = handleElement.getAttribute('data-panel-group-id');
        assert(groupId);

        const handles = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
        const index = getResizeHandleElementIndex(groupId, handleId, _panelGroupElement);

        assert(!isNullish(index));

        let nextIndex: number;
        if (event.shiftKey) {
          nextIndex = index > 0 ? index - 1 : handles.length - 1;
        } else {
          nextIndex = index + 1 < handles.length ? index + 1 : 0;
        }

        const nextHandle = handles[nextIndex] as HTMLElement;
        nextHandle.focus();
      }
    };

    handleElement.addEventListener('keydown', onKeyDown);
    onCleanup(() => {
      handleElement.removeEventListener('keydown', onKeyDown);
    });
  });
}
