// @unocss-include

/** Floating surface chrome. Width, padding, and overflow stay per component. */
export const overlaySurface = 'rounded-md border bg-popover text-popover-foreground';

export const overlayShadow = 'shadow-md';

/** Stacking and transform hints used by floating popups. */
export const overlayLayer = 'z-50 outline-none will-change-transform';

export const overlayEnter = 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95';

export const overlayLeave = `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`;

export const overlaySide = `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`;

/** Enter, leave, and side-aware slide used by most floating popups. */
export const overlayMotion = [overlayEnter, overlayLeave, overlaySide];

/** Default floating popup chrome. Compose extra layout classes around this pack. */
export const overlayPopup = [overlaySurface, overlayShadow, overlayLayer, ...overlayMotion];

export const overlayArrow = 'w-1em h-0.5em fill-popover stroke-border';
