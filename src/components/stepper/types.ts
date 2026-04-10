import type {
  ClassValue,
  StepperDescriptionProps,
  StepperIndicatorProps,
  StepperItemProps,
  StepperRootEmits,
  StepperRootProps,
  StepperSeparatorProps,
  StepperTitleProps,
  StepperTriggerProps,
  StepperUiSlot,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface StepperOptionData extends Pick<StepperItemProps, 'disabled' | 'completed'> {
  title?: string;
  description?: string;
}

export type StepperExtraUiSlot = 'itemContent' | 'indicatorIcon';

export type StepperExtendedUi = UiClass<StepperUiSlot | StepperExtraUiSlot>;

export interface StepperProps extends StepperRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<StepperExtendedUi>;
  items: StepperOptionData[];
  itemProps?: StepperItemProps;
  triggerProps?: StepperTriggerProps;
  indicatorProps?: StepperIndicatorProps;
  separatorProps?: StepperSeparatorProps;
  titleProps?: StepperTitleProps;
  descriptionProps?: StepperDescriptionProps;
}

export type StepperEmits = StepperRootEmits;
