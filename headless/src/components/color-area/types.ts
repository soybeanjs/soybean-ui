import type { ComputedRef, CSSProperties, HTMLAttributes, ShallowRef } from 'vue';
import type {
  ColorChannel,
  ColorChannelRange,
  ColorFormat,
  ColorSpace,
  ColorValue,
  NormalizedColor
} from '../../shared';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for the color area axis channel component.
 */
export type ColorAreaAxisChannel = Extract<ColorChannel, 'hue' | 'saturation' | 'lightness' | 'brightness' | 'chroma'>;

/**
 * Props for the color area root component.
 */
export interface ColorAreaRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
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
   * Format.
   */
  format?: ColorFormat;
  /**
   * X channel.
   */
  xChannel?: ColorAreaAxisChannel;
  /**
   * Y channel.
   */
  yChannel?: ColorAreaAxisChannel;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * X name.
   */
  xName?: string;
  /**
   * Y name.
   */
  yName?: string;
}

/**
 * Emits for the color area root component.
 */
export type ColorAreaRootEmits = {
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
 * Props for the color area area component.
 */
export interface ColorAreaAreaProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the color area thumb component.
 */
export interface ColorAreaThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the color area root component.
 */
export interface ColorAreaRootContext extends PropsToContext<
  ColorAreaRootProps,
  'colorSpace' | 'format' | 'xChannel' | 'yChannel' | 'disabled'
> {
  /**
   * Theme color of the component.
   */
  color: ComputedRef<NormalizedColor>;
  /**
   * X value used by the component context.
   */
  xValue: ShallowRef<number>;
  /**
   * Y value used by the component context.
   */
  yValue: ShallowRef<number>;
  /**
   * X range used by the component context.
   */
  xRange: ComputedRef<ColorChannelRange>;
  /**
   * Y range used by the component context.
   */
  yRange: ComputedRef<ColorChannelRange>;
  /**
   * Area style used by the component context.
   */
  areaStyle: ComputedRef<CSSProperties>;
  /**
   * Thumb element used by the component context.
   */
  thumbElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Set thumb element used by the component context.
   */
  setThumbElement: (element: HTMLElement) => void;
  /**
   * Update values used by the component context.
   */
  updateValues: (x: number, y: number) => void;
  /**
   * Commit values used by the component context.
   */
  commitValues: () => void;
}

/**
 * Available UI slots for the color area component.
 */
export type ColorAreaUiSlot = 'root' | 'area' | 'thumb';

/**
 * UI class overrides for the color area component.
 */
export type ColorAreaUi = UiClass<ColorAreaUiSlot>;
