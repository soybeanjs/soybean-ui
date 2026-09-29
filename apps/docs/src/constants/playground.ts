// @unocss-include

/**
 * Preview devices of the playground gallery.
 *
 * Kept outside the components so the gallery (switcher, state) and the viewport
 * frame (simulated viewport, frame chrome) read one description instead of
 * mirroring class strings and the breakpoint decision twice.
 */
export const playgroundDevices = ['desktop', 'mobile', 'ipad', 'fullscreen'] as const;

export type PlaygroundDevice = (typeof playgroundDevices)[number];

/**
 * Views of one example card.
 *
 * `preview` renders the demo inside the device frame, `code` renders its source.
 * Kept beside the devices so the gallery (per-example state) and the control
 * strip (switcher) read one description instead of mirroring the values twice.
 */
export const playgroundTabs = ['preview', 'code'] as const;

export type PlaygroundTab = (typeof playgroundTabs)[number];

export interface PlaygroundDeviceMeta {
  /** Iconify name rendered by the switcher item. */
  icon: string;
  /** Static viewport hint shown by the control strip. */
  hint: string;
  /** Classes sizing the preview frame for this device. */
  frame: string;
  /**
   * Viewport opinion the frame broadcasts to the example it renders.
   *
   * Only `mobile` has one. Its frame is narrower than the library breakpoint, so
   * `isMobile`-aware components (layout, app shell) have to switch to their
   * mobile structure even though the browser window is wide. The other modes stay
   * silent: `desktop` and `fullscreen` are as wide as the page, and `ipad`
   * (768px) sits on the desktop side of the same breakpoint — so a phone-sized
   * visitor still gets the honest viewport answer instead of being pinned to a
   * desktop mode its own CSS would not honour.
   */
  viewport: boolean | undefined;
}

/** Chrome shared by every device frame; the device meta only sizes it. */
export const playgroundPreviewFrame = 'rounded-md border border-dashed p-4 sm:p-5';

export const defaultPlaygroundDevice: PlaygroundDevice = 'desktop';

export const playgroundDeviceMetas: Record<PlaygroundDevice, PlaygroundDeviceMeta> = {
  desktop: {
    icon: 'lucide:monitor',
    hint: '100%',
    frame: 'min-h-36 w-full',
    viewport: undefined
  },
  mobile: {
    icon: 'lucide:smartphone',
    hint: '390 × 844',
    frame: 'min-h-100 w-full max-w-[390px] mx-auto overflow-auto overscroll-contain',
    viewport: true
  },
  ipad: {
    icon: 'lucide:tablet',
    hint: '768 × 1024',
    frame: 'min-h-125 w-full max-w-[768px] mx-auto overflow-auto overscroll-contain',
    viewport: undefined
  },
  fullscreen: {
    icon: 'lucide:maximize',
    hint: '100vw × 100vh',
    frame: 'min-h-0 grow w-full overflow-auto overscroll-contain',
    viewport: undefined
  }
};
