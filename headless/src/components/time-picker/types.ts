import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateStep, Formatter, HourCycle, TimeGranularity, TimeMatcher, TimeValue } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { TimePickerOption } from '../../shared/time-picker';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the time picker root component.
 */
export interface TimePickerRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: TimeValue;
  /**
   * Default placeholder.
   */
  defaultPlaceholder?: TimeValue;
  /**
   * Placeholder.
   */
  placeholder?: TimeValue;
  /**
   * Current model value.
   */
  modelValue?: TimeValue;
  /**
   * Hour cycle.
   */
  hourCycle?: HourCycle;
  /**
   * Step.
   */
  step?: DateStep;
  /**
   * Granularity.
   */
  granularity?: TimeGranularity;
  /**
   * Whether hide time zone.
   */
  hideTimeZone?: boolean;
  /**
   * Max value.
   */
  maxValue?: TimeValue;
  /**
   * Min value.
   */
  minValue?: TimeValue;
  /**
   * Locale.
   */
  locale?: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the component is readonly.
   */
  readonly?: boolean;
  /**
   * Whether the time is unavailable.
   */
  isTimeUnavailable?: TimeMatcher;
  /**
   * Id.
   */
  id?: string;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /**
   * Whether the component is open by default.
   */
  defaultOpen?: boolean;
  /**
   * Whether the component is open.
   */
  open?: boolean;
  /**
   * Whether the popup is modal.
   */
  modal?: boolean;
}

/**
 * Emits for the time picker root component.
 */
export type TimePickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [time: TimeValue | undefined];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [time: TimeValue];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Props for the time picker trigger component.
 */
export interface TimePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
/**
 * Props for the time picker popup component.
 */
export interface TimePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the time picker root component.
 */
export interface TimePickerRootContext extends PropsToContext<TimePickerRootProps, 'disabled' | 'readonly'> {
  /**
   * Locale used by the component context.
   */
  locale: ComputedRef<string>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<TimeValue | undefined>;
  /**
   * Placeholder used by the component context.
   */
  placeholder: ShallowRef<TimeValue>;
  /**
   * Whether the time is unavailable.
   */
  isTimeUnavailable?: TimeMatcher;
  /**
   * Whether the current value is invalid.
   */
  isInvalid: ComputedRef<boolean>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Granularity used by the component context.
   */
  granularity: ComputedRef<TimeGranularity>;
  /**
   * Hour cycle used by the component context.
   */
  hourCycle: HourCycle;
  /**
   * Whether hide time zone.
   */
  hideTimeZone: ComputedRef<boolean>;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Popup id used by the component context.
   */
  popupId: string;
  /**
   * Display value used by the component context.
   */
  displayValue: ComputedRef<string>;
  /**
   * Focused time used by the component context.
   */
  focusedTime: ShallowRef<TimeValue>;
  /**
   * Options used by the component context.
   */
  options: ComputedRef<TimePickerOption[]>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<TimeValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<TimeValue | undefined>;
  /**
   * Callback invoked when the time changes.
   */
  onTimeChange: (time: TimeValue) => void;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (time: TimeValue) => void;
  /**
   * Whether the time is disabled.
   */
  isTimeDisabled: (time: TimeValue) => boolean;
  /**
   * Whether the time is selected.
   */
  isTimeSelected: (time: TimeValue) => boolean;
  /**
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
  /**
   * Set focused time used by the component context.
   */
  setFocusedTime: (time: TimeValue) => void;
}

/**
 * Available UI slots for the time picker component.
 */
export type TimePickerUiSlot = 'root' | 'trigger' | 'popup' | 'list' | 'cellTrigger';
/**
 * UI class overrides for the time picker component.
 */
export type TimePickerUi = UiClass<TimePickerUiSlot>;
