import type { Component } from 'vue';
import type {
  ClassValue,
  StepperRootEmits,
  StepperState,
  StepperTriggerPropsWithPrimitive,
  StepperDescriptionProps as _StepperDescriptionProps,
  StepperIndicatorProps as _StepperIndicatorProps,
  StepperItemProps as _StepperItemProps,
  StepperRootProps as _StepperRootProps,
  StepperSeparatorProps as _StepperSeparatorProps,
  StepperTitleProps as _StepperTitleProps
} from '@soybean-ui/primitives';
import type { StepperSlots, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';

export interface StepperRootProps extends _StepperRootProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface StepperDescriptionProps extends _StepperDescriptionProps {}

export interface StepperIndicatorProps extends _StepperIndicatorProps {
  size?: ThemeSize;
}

export interface StepperItemProps extends _StepperItemProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface StepperSeparatorProps extends _StepperSeparatorProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface StepperTitleProps extends _StepperTitleProps {
  size?: ThemeSize;
}

export interface StepperTriggerProps extends StepperTriggerPropsWithPrimitive {
  size?: ThemeSize;
}

export interface StepperOptionData extends Pick<StepperItemProps, 'step' | 'disabled' | 'completed'> {
  title: string;
  description: string;
  indicatorLabel?: string;
  icon?: Component;
}

export type StepperUi = Partial<Record<StepperSlots, ClassValue>>;

export interface StepperProps<T extends StepperOptionData = StepperOptionData> extends StepperRootProps {
  ui?: StepperUi;
  items: T[];
}

export type StepperEmits = StepperRootEmits;

export type { StepperRootEmits, StepperState };
