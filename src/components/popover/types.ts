import type {
  Placement,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerEmits,
  PopoverPositionerProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
  PopperUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface PopoverProps extends PopoverRootProps {
  size?: ThemeSize;
  ui?: Partial<PopperUi>;
  placement?: Placement;
  showArrow?: boolean;
  positionerProps?: PopoverPositionerProps;
  popupProps?: PopoverPopupProps;
  triggerProps?: PopoverTriggerProps;
  closeProps?: PopoverCloseProps;
  portalProps?: PopoverPortalProps;
  arrowProps?: PopoverArrowProps;
}

export type PopoverEmits = PopoverRootEmits & PopoverPositionerEmits;
