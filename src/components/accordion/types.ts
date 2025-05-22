import type { ComputedRef, Ref } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  PropsToContext,
  SingleOrMultipleEmits,
  SingleOrMultipleProps,
  SingleOrMultipleType,
  StringOrNumber
} from '../../types';
import type { CollapsibleContentProps, CollapsibleRootProps, CollapsibleTriggerProps } from '../collapsible/types';

export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

export interface AccordionHeaderProps extends ClassValueProp {}

export interface AccordionContentProps extends CollapsibleContentProps {}

export interface AccordionItemProps extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * When `true`, prevents the user from interacting with the item.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /** A string or number value for the accordion item. All items within an accordion should use a unique value. */
  value: StringOrNumber;
}

export interface AccordionRootProps<T = AcceptableValue | AcceptableValue[], S = SingleOrMultipleType>
  extends ClassValueProp,
    SingleOrMultipleProps<T, S> {
  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   *
   * When type is "multiple", this prop has no effect.
   *
   * @defaultValue false
   */
  collapsible?: boolean;
  /**
   * The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * When `true`, prevents the user from interacting with the accordion and all its items
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The orientation of the accordion.
   *
   * @defaultValue 'vertical'
   */
  orientation?: DataOrientation;
  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}

export type AccordionRootEmits<T = AcceptableValue | AcceptableValue[]> = SingleOrMultipleEmits<T>;

export interface AccordionRootContextParams
  extends PropsToContext<AccordionRootProps, 'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'> {
  rootElement: Ref<HTMLElement | null | undefined>;
  modelValue: Ref<AcceptableValue | AcceptableValue[]>;
  isSingle: ComputedRef<boolean>;
  toggleModelValue: (value: AcceptableValue) => void;
  direction: ComputedRef<Direction>;
}

export interface AccordionItemContextParams extends PropsToContext<AccordionItemProps, 'value'> {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
}
