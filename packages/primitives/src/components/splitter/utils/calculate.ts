import { isNullish } from '../../../shared';
import type { DataOrientation, NavigationKeys } from '../../../types';
import type { DragState, PanelData, ResizeEvent } from '../types';
import { assert } from './assert';
import { getPanelGroupElement, getResizeHandleElement } from './dom';
import { getResizeEventCursorPosition, isKeyDown } from './events';

export function calculateDragOffsetPercentage(
  event: ResizeEvent,
  dragHandleId: string,
  direction: DataOrientation,
  initialDragState: DragState,
  panelGroupElement: HTMLElement
): number {
  const isHorizontal = direction === 'horizontal';

  const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
  assert(handleElement);

  const groupId = handleElement.getAttribute('data-panel-group-id');
  assert(groupId);

  const { initialCursorPosition } = initialDragState;

  const cursorPosition = getResizeEventCursorPosition(direction, event);

  const groupElement = getPanelGroupElement(groupId, panelGroupElement);
  assert(groupElement);

  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;

  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = (offsetPixels / groupSizeInPixels) * 100;

  return offsetPercentage;
}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
// eslint-disable-next-line max-params
export function calculateDeltaPercentage(
  event: ResizeEvent,
  dragHandleId: string,
  direction: DataOrientation,
  initialDragState: DragState | null,
  keyboardResizeBy: number | null,
  panelGroupElement: HTMLElement
): number {
  if (isKeyDown(event)) {
    const isHorizontal = direction === 'horizontal';

    let delta = 0;
    if (event.shiftKey) delta = 100;
    else delta = keyboardResizeBy ?? 10;

    let movement = 0;

    const mapValue: Partial<Record<NavigationKeys, number>> = {
      ArrowDown: isHorizontal ? 0 : delta,
      ArrowLeft: isHorizontal ? -delta : 0,
      ArrowRight: isHorizontal ? delta : 0,
      ArrowUp: isHorizontal ? 0 : -delta,
      End: 100,
      Home: -100
    };

    movement = mapValue[event.key as NavigationKeys] ?? 0;

    return movement;
  }

  if (isNullish(initialDragState)) {
    return 0;
  }

  return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
}

export function calculateAriaValues({
  layout,
  panelsArray,
  pivotIndices
}: {
  layout: number[];
  panelsArray: PanelData[];
  pivotIndices: number[];
}) {
  let currentMinSize = 0;
  let currentMaxSize = 100;
  let totalMinSize = 0;
  let totalMaxSize = 0;

  const firstIndex = pivotIndices[0];
  assert(!isNullish(firstIndex));

  // A panel's effective min/max sizes also need to account for other panel's sizes.
  panelsArray.forEach((panelData, index) => {
    const { constraints } = panelData;
    const { maxSize = 100, minSize = 0 } = constraints;

    if (index === firstIndex) {
      currentMinSize = minSize;
      currentMaxSize = maxSize;
    } else {
      totalMinSize += minSize;
      totalMaxSize += maxSize;
    }
  });

  const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
  const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);

  const valueNow = layout[firstIndex];

  return {
    valueMax,
    valueMin,
    valueNow
  };
}

export function calculateUnsafeDefaultLayout({ panelDataArray }: { panelDataArray: PanelData[] }): number[] {
  const layout = Array<number>(panelDataArray.length);

  const panelConstraintsArray = panelDataArray.map(panelData => panelData.constraints);

  let numPanelsWithSizes = 0;
  let remainingSize = 100;

  // Distribute default sizes first
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (!isNullish(defaultSize)) {
      numPanelsWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }

  // Remaining size should be distributed evenly between panels without default sizes
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (isNullish(defaultSize)) {
      const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
      const size = remainingSize / numRemainingPanels;

      numPanelsWithSizes++;
      layout[index] = size;
      remainingSize -= size;
    }
  }

  return layout;
}
