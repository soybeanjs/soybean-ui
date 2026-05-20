import { describe, expect, it } from 'vitest';
import {
  getNavigationMenuIndicatorPosition,
  getNavigationMenuViewportPosition
} from '../../../headless/src/components/navigation-menu/shared';

interface MockElementRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

function createMockElementRect(params: MockElementRect) {
  const { left, top, width, height } = params;

  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({})
  } satisfies DOMRect;
}

function createMockElement(params: MockElementRect) {
  return {
    getBoundingClientRect: () => createMockElementRect(params)
  } as HTMLElement;
}

function setViewportSize(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width
  });

  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height
  });
}

describe('NavigationMenu viewport positioning', () => {
  it('anchors a horizontal viewport to the whole root menu instead of the active trigger', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      contentSize: {
        width: 240,
        height: 180
      },
      orientation: 'horizontal',
      dir: 'ltr',
      align: 'start'
    });

    expect(position).toEqual({
      left: 80,
      top: 96
    });
  });

  it('centers a vertical viewport against the whole root menu and clamps it within the viewport', () => {
    setViewportSize(360, 220);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 220,
        top: 140,
        width: 72,
        height: 120
      }),
      contentSize: {
        width: 180,
        height: 160
      },
      orientation: 'vertical',
      dir: 'ltr',
      align: 'center'
    });

    expect(position).toEqual({
      left: 170,
      top: 50
    });
  });

  it('uses inline-start alignment for horizontal RTL viewports', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      contentSize: {
        width: 240,
        height: 180
      },
      orientation: 'horizontal',
      dir: 'rtl',
      align: 'start'
    });

    expect(position).toEqual({
      left: 560,
      top: 96
    });
  });

  it('uses logical inline-start coordinates for vertical RTL viewports', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 220,
        top: 140,
        width: 72,
        height: 120
      }),
      contentSize: {
        width: 180,
        height: 160
      },
      orientation: 'vertical',
      dir: 'rtl',
      align: 'center'
    });

    expect(position).toEqual({
      left: 1060,
      top: 120
    });
  });
});

describe('NavigationMenu indicator positioning', () => {
  it('returns fixed coordinates for a horizontal indicator using the active trigger rect', () => {
    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      activeTriggerElement: createMockElement({
        left: 320,
        top: 44,
        width: 100,
        height: 40
      }),
      orientation: 'horizontal',
      dir: 'ltr'
    });

    expect(position).toEqual({
      size: 100,
      left: 320,
      top: 96
    });
  });

  it('returns logical inline-start coordinates for a horizontal RTL indicator', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      activeTriggerElement: createMockElement({
        left: 320,
        top: 44,
        width: 100,
        height: 40
      }),
      orientation: 'horizontal',
      dir: 'rtl'
    });

    expect(position).toEqual({
      size: 100,
      left: 860,
      top: 96
    });
  });

  it('returns fixed coordinates for a vertical indicator using the track edge and trigger center', () => {
    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 32,
        top: 48,
        width: 72,
        height: 240
      }),
      activeTriggerElement: createMockElement({
        left: 36,
        top: 160,
        width: 64,
        height: 40
      }),
      orientation: 'vertical',
      dir: 'ltr'
    });

    expect(position).toEqual({
      size: 40,
      left: 104,
      top: 180
    });
  });

  it('returns logical inline-start coordinates for a vertical RTL indicator', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 48,
        width: 72,
        height: 240
      }),
      activeTriggerElement: createMockElement({
        left: 84,
        top: 160,
        width: 64,
        height: 40
      }),
      orientation: 'vertical',
      dir: 'rtl'
    });

    expect(position).toEqual({
      size: 40,
      left: 1200,
      top: 180
    });
  });
});
