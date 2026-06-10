import { computed } from 'vue';
import type { Align, DataOrientation, Direction, Size } from '../../types';
import type { NavigationMenuViewportPosition } from './types';

const COMMON_SLOTS = ['item', 'item-leading', 'item-trailing'];

export const EVENT_ROOT_CONTENT_DISMISS = 'navigationMenu.rootContentDismiss';
export const LINK_SELECT = 'navigationMenu.linkSelect';

export const navigationMenuViewportCssVars = {
  width: '--soybean-navigation-menu-viewport-width',
  height: '--soybean-navigation-menu-viewport-height',
  left: '--soybean-navigation-menu-viewport-left',
  top: '--soybean-navigation-menu-viewport-top'
};

export const navigationMenuIndicatorCssVars = {
  size: '--soybean-navigation-menu-indicator-size',
  left: '--soybean-navigation-menu-indicator-left',
  top: '--soybean-navigation-menu-indicator-top'
};

export function useCommonSlotNames<T extends Record<string, any>>(slots: T) {
  return computed(() => Object.keys(slots).filter(key => COMMON_SLOTS.includes(key)) as (keyof T)[]);
}

export function createTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

export function createContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

interface GetNavigationMenuViewportPositionParams {
  rootElement: HTMLElement;
  activeTriggerElement?: HTMLElement | null;
  contentSize: Size;
  orientation: DataOrientation;
  dir: Direction;
  align: Align;
}

interface GetNavigationMenuIndicatorPositionParams {
  indicatorTrackElement: HTMLElement;
  activeTriggerElement: HTMLElement;
  orientation: DataOrientation;
  dir: Direction;
}

function getViewportSize() {
  const visualViewport = globalThis.window?.visualViewport;

  return {
    width: visualViewport?.width ?? globalThis.window?.innerWidth ?? document.documentElement.clientWidth,
    height: visualViewport?.height ?? globalThis.window?.innerHeight ?? document.documentElement.clientHeight
  };
}

function clampViewportPosition(position: number, contentSize: number, viewportSize: number, screenOffset: number) {
  const minPosition = screenOffset;
  const maxPosition = viewportSize - screenOffset - contentSize;

  if (maxPosition <= minPosition) {
    return minPosition;
  }

  if (position < minPosition) {
    return minPosition;
  }

  if (position > maxPosition) {
    return maxPosition;
  }

  return position;
}

function getLogicalStartPosition(left: number, width: number, dir: Direction) {
  if (dir !== 'rtl') {
    return left;
  }

  const { width: viewportWidth } = getViewportSize();

  return viewportWidth - left - width;
}

export function getNavigationMenuViewportPosition(params: GetNavigationMenuViewportPositionParams) {
  const { rootElement, activeTriggerElement, contentSize, orientation, dir, align } = params;

  const rootRect = rootElement.getBoundingClientRect();
  const { width: viewportWidth, height: viewportHeight } = getViewportSize();
  const { width: contentWidth, height: contentHeight } = contentSize;

  const isRtl = dir === 'rtl';

  // Position viewport relative to the active trigger when available,
  // otherwise fall back to the root element.
  const referenceRect = activeTriggerElement ? activeTriggerElement.getBoundingClientRect() : rootRect;

  const horizontalAlignPositionMap: Record<Align, NavigationMenuViewportPosition> = {
    start: {
      left: isRtl ? referenceRect.right - contentWidth : referenceRect.left,
      top: rootRect.bottom
    },
    center: {
      left: referenceRect.left + referenceRect.width / 2 - contentWidth / 2,
      top: rootRect.bottom
    },
    end: {
      left: isRtl ? referenceRect.left : referenceRect.right - contentWidth,
      top: rootRect.bottom
    }
  };

  const verticalAlignPositionMap: Record<Align, NavigationMenuViewportPosition> = {
    start: {
      left: isRtl ? rootRect.left - contentWidth : rootRect.right,
      top: referenceRect.top
    },
    center: {
      left: isRtl ? rootRect.left - contentWidth : rootRect.right,
      top: referenceRect.top + referenceRect.height / 2 - contentHeight / 2
    },
    end: {
      left: isRtl ? rootRect.left - contentWidth : rootRect.right,
      top: referenceRect.bottom - contentHeight
    }
  };

  const alignPositionMap = orientation === 'vertical' ? verticalAlignPositionMap : horizontalAlignPositionMap;

  let { left: posLeft, top: posTop } = alignPositionMap[align];

  const screenOffset = 10;

  posLeft = clampViewportPosition(posLeft, contentWidth, viewportWidth, screenOffset);
  posTop = clampViewportPosition(posTop, contentHeight, viewportHeight, screenOffset);

  const position: NavigationMenuViewportPosition = {
    left: getLogicalStartPosition(posLeft, contentWidth, dir),
    top: posTop
  };

  return {
    left: Math.round(position.left),
    top: Math.round(position.top)
  };
}

export function getNavigationMenuIndicatorPosition(params: GetNavigationMenuIndicatorPositionParams) {
  const { indicatorTrackElement, activeTriggerElement, orientation, dir } = params;

  const trackRect = indicatorTrackElement.getBoundingClientRect();
  const triggerRect = activeTriggerElement.getBoundingClientRect();

  const isHorizontal = orientation === 'horizontal';
  const isRtl = dir === 'rtl';
  const size = isHorizontal ? triggerRect.width : triggerRect.height;
  const physicalLeft = isHorizontal ? triggerRect.left : isRtl ? trackRect.left - size : trackRect.right;

  const position = {
    size,
    left: getLogicalStartPosition(physicalLeft, size, dir),
    top: isHorizontal ? trackRect.bottom : triggerRect.top + triggerRect.height / 2
  };

  return {
    size: Math.round(position.size),
    left: Math.round(position.left),
    top: Math.round(position.top)
  };
}
