export { default as TooltipCompact } from './tooltip-compact.vue';
export { default as TooltipProvider } from './tooltip-provider.vue';
export { default as TooltipRoot } from './tooltip-root.vue';
export { default as TooltipTrigger } from './tooltip-trigger.vue';
export { PopperV2Portal as TooltipPortal } from '../popper-v2';
export { default as TooltipPositioner } from './tooltip-positioner.vue';
export { default as TooltipPopup } from './tooltip-popup.vue';
export { PopperV2Arrow as TooltipArrow } from '../popper-v2';

export { provideTooltipUi } from './context';

export type {
  TooltipCompactProps,
  TooltipCompactEmits,
  TooltipCompactSlots,
  TooltipProviderContext,
  TooltipProviderProps,
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipPopupProps,
  TooltipPositionerProps,
  TooltipPositionerEmits,
  TooltipDataState
} from './types';

export type {
  PopperV2ArrowProps as TooltipArrowProps,
  PopperV2UiSlot as TooltipUiSlot,
  PopperV2Ui as TooltipUi
} from '../popper-v2/types';
export type { PopperV2PortalProps as TooltipPortalProps } from '../popper-v2/types';
