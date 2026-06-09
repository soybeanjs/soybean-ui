export { default as TooltipCompact } from './tooltip-compact.vue';
export { default as TooltipRoot } from './tooltip-root.vue';
export { default as TooltipTrigger } from './tooltip-trigger.vue';
export { default as TooltipPortal } from '../portal/portal.vue';
export { default as TooltipPositioner } from './tooltip-positioner.vue';
export { default as TooltipPopup } from './tooltip-popup.vue';
export { default as TooltipArrow } from '../popper/popper-arrow.vue';

export { providePopperUi as provideTooltipUi } from '../popper/context.js';

export type {
  TooltipCompactProps,
  TooltipCompactEmits,
  TooltipCompactSlots,
  TooltipProviderProps,
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipPopupProps,
  TooltipPositionerProps,
  TooltipPositionerEmits,
  TooltipDataState
} from './types.js';

export type {
  PopperArrowProps as TooltipArrowProps,
  PopperUiSlot as TooltipUiSlot,
  PopperUi as TooltipUi
} from '../popper/types.js';
export type { PortalProps as TooltipPortalProps } from '../portal/types.js';
