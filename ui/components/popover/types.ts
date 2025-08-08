import type {
  ClassValue,
  Placement,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentEmits,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
  PopperThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';

export type PopoverUi = Partial<Record<PopperThemeSlot, ClassValue>>;

export interface PopoverProps extends PopoverRootProps {
  size?: ThemeSize;
  ui?: PopoverUi;
  placement?: Placement;
  showArrow?: boolean;
  contentProps?: PopoverContentProps;
  triggerProps?: PopoverTriggerProps;
  closeProps?: PopoverCloseProps;
  portalProps?: PopoverPortalProps;
  arrowProps?: PopoverArrowProps;
}

export type PopoverEmits = PopoverRootEmits & PopoverContentEmits;
