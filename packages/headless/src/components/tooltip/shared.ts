import type { TooltipProviderProps } from './types';

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

/** Keeps only explicitly provided entries so an `undefined` prop never overrides a base config. */
export const pickDefinedConfig = (config?: Partial<TooltipProviderProps> | null) => {
  return Object.fromEntries(Object.entries(config ?? {}).filter(([, value]) => value !== undefined));
};
