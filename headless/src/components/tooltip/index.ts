export { default as TooltipPortal } from '../portal/portal.vue';
export { default as TooltipArrow } from '../popper/popper-arrow.vue';
export { default as TooltipRoot } from './tooltip-root.vue';
export { default as TooltipTrigger } from './tooltip-trigger.vue';
export { default as TooltipContent } from './tooltip-content.vue';

export { providePopperThemeContext as provideTooltipThemeContext } from '../popper/context';

export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentEmits,
  TooltipDataState
} from './types';

export type {
  PopperArrowProps as TooltipArrowProps,
  PopperThemeSlot as TooltipThemeSlot,
  PopperUi as TooltipUi
} from '../popper/types';
export type { PortalProps as TooltipPortalProps } from '../portal/types';
