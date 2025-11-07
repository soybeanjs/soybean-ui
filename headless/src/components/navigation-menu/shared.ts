import type { Align } from '../../types';
import type { NavigationMenuViewportPosition } from './types';

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
  position: '--soybean-navigation-menu-indicator-position'
};

export function createTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

export function createContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

interface GetNavigationMenuViewportPositionParams {
  rootElement: HTMLElement;
  contentElement: HTMLElement;
  activeTriggerElement: HTMLElement;
  align: Align;
}

export function getNavigationMenuViewportPosition(params: GetNavigationMenuViewportPositionParams) {
  const { rootElement, contentElement, activeTriggerElement, align } = params;

  const bodyWidth = document.documentElement.offsetWidth;
  const bodyHeight = document.documentElement.offsetHeight;
  const rootRect = rootElement.getBoundingClientRect();
  const rect = activeTriggerElement.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = contentElement;

  // Find the beginning of the position of the menu item
  const startPositionLeft = rect.left - rootRect.left;
  const startPositionTop = rect.top - rootRect.top;

  const alignPositionMap: Record<Align, NavigationMenuViewportPosition> = {
    start: {
      left: startPositionLeft,
      top: startPositionTop + rect.height
    },
    center: {
      left: startPositionLeft - offsetWidth / 2 + rect.width / 2,
      top: startPositionTop - offsetHeight / 2 + rect.height / 2
    },
    end: {
      left: startPositionLeft - offsetWidth + rect.width,
      top: startPositionTop - offsetHeight + rect.height
    }
  };

  let { left: posLeft, top: posTop } = alignPositionMap[align];

  const screenOffset = 10;

  // Do not let go of the left side of the screen
  if (posLeft + rootRect.left < screenOffset) {
    posLeft = screenOffset - rootRect.left;
  }

  // Now also check the right side of the screen
  const rightOffset = posLeft + rootRect.left + offsetWidth;
  if (rightOffset > bodyWidth - screenOffset) {
    posLeft -= rightOffset - bodyWidth + screenOffset;

    // Recheck the left side of the screen
    if (posLeft < screenOffset - rootRect.left) {
      // Just set the menu to the full width of the screen
      posLeft = screenOffset - rootRect.left;
    }
  }

  // Do not let go of the top side of the screen
  if (posTop + rootRect.top < screenOffset) {
    posTop = screenOffset - rootRect.top;
  }

  // Now also check the bottom side of the screen
  const bottomOffset = posTop + rootRect.top + offsetHeight;
  if (bottomOffset > bodyHeight - screenOffset) {
    posTop -= bottomOffset - bodyHeight + screenOffset;

    // Recheck the top side of the screen
    if (posTop < screenOffset - rootRect.top) {
      // Just set the menu to the full height of the screen
      posTop = screenOffset - rootRect.top;
    }
  }

  // Possible blurring font with decimal values
  posLeft = Math.round(posLeft);
  posTop = Math.round(posTop);

  const position: NavigationMenuViewportPosition = {
    left: posLeft,
    top: posTop
  };

  return position;
}
