import type { ComputedRef, HTMLAttributes } from 'vue';
import type {
  ColorChannel,
  ColorChannelRange,
  ColorFormat,
  ColorSpace,
  ColorValue,
  NormalizedColor
} from '../../shared';
import type { DataOrientation, Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the color slider root component.
 */
export interface ColorSliderRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Current model value.
   */
  modelValue?: string | ColorValue;
  /**
   * Default value.
   */
  defaultValue?: string | ColorValue;
  /**
   * Color space.
   */
  colorSpace?: ColorSpace;
  /**
   * Channel.
   */
  channel: ColorChannel;
  /**
   * Format.
   */
  format?: ColorFormat;
  /**
   * Orientation of the component.
   */
  orientation?: DataOrientation;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /**
   * Whether inverted.
   */
  inverted?: boolean;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Step.
   */
  step?: number;
}

/**
 * Emits for the color slider root component.
 */
export type ColorSliderRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the color value changes.
   */
  'update:color': [value: NormalizedColor];
  /**
   * Emitted when change occurs.
   */
  change: [value: string];
  /**
   * Emitted when change end occurs.
   */
  changeEnd: [value: string];
};

/**
 * Props for the color slider track component.
 */
export interface ColorSliderTrackProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the color slider thumb component.
 */
export interface ColorSliderThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the color slider root component.
 */
export interface ColorSliderRootContext extends PropsToContext<
  ColorSliderRootProps,
  'channel' | 'colorSpace' | 'format' | 'orientation' | 'disabled' | 'inverted'
> {
  /**
   * Theme color of the component.
   */
  color: ComputedRef<NormalizedColor>;
  /**
   * Channel value used by the component context.
   */
  channelValue: ComputedRef<number>;
  /**
   * Range used by the component context.
   */
  range: ComputedRef<ColorChannelRange>;
}

/**
 * Available UI slots for the color slider component.
 */
export type ColorSliderUiSlot = 'root' | 'track' | 'thumb';

/**
 * UI class overrides for the color slider component.
 */
export type ColorSliderUi = UiClass<ColorSliderUiSlot>;
