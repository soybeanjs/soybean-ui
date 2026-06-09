import type { TooltipProviderProps } from './types';

/** Custom event name for tooltip open state */
export const TOOLTIP_OPEN = 'tooltip.open';

export const tooltipCssVars = {
  transformOrigin: '--soybean-tooltip-transform-origin',
  availableWidth: '--soybean-tooltip-available-width',
  availableHeight: '--soybean-tooltip-available-height',
  anchorWidth: '--soybean-tooltip-anchor-width',
  anchorHeight: '--soybean-tooltip-anchor-height'
};

export const createDefaultTooltipConfig = (config?: Partial<TooltipProviderProps> | null) => {
  return {
    delayDuration: 150,
    skipDelayDuration: 300,
    disableHoverableContent: false,
    disableClosingTrigger: false,
    disabled: false,
    ignoreNonKeyboardFocus: false,
    ...config
  };
};
