import type {
  Placement,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentEmits,
  PopoverContentProps,
  PopoverPortalProps,
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
  contentProps?: PopoverContentProps;
  triggerProps?: PopoverTriggerProps;
  closeProps?: PopoverCloseProps;
  portalProps?: PopoverPortalProps;
  arrowProps?: PopoverArrowProps;
}

export type PopoverEmits = PopoverRootEmits & PopoverContentEmits;
