import type { ComputedRef, Ref, VNodeRef } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  DisclosureState,
  PrimitiveProps,
  SingleOrMultipleProps,
  SingleOrMultipleType
} from '../../types';
import type { CollapsibleContentProps, CollapsibleRootProps } from '../collapsible';

// AccordionRoot
export interface AccordionRootProps<T extends string | string[]>
  extends SingleOrMultipleProps<T>,
    ClassValueProp,
    PrimitiveProps {
  /**
   * When type is "single", allows closing content when clicking trigger for an open item. When type is "multiple", this
   * prop has no effect.
   *
   * @defaultValue false
   */
  collapsible?: boolean;

  /**
   * When `true`, prevents the user from interacting with the accordion and all its items
   *
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @defaultValue 'ltr'
   */
  dir?: Direction;

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

export type AccordionRootEmits<T extends SingleOrMultipleType = SingleOrMultipleType> = {
  /** Event handler called when the expanded state of an item changes */
  'update:modelValue': [value: (T extends 'single' ? string : string[]) | undefined];
};

// AccordionRootContext
export interface AccordionRootContext {
  disabled: Ref<boolean>;
  direction: Ref<Direction>;
  orientation: Ref<DataOrientation>;
  parentElement: Ref<HTMLElement | undefined>;
  changeModelValue: (value: string) => void;
  isSingle: ComputedRef<boolean>;
  modelValue: Ref<AcceptableValue | AcceptableValue[] | undefined>;
  collapsible: Ref<boolean>;
  unmountOnHide: Ref<boolean>;
}

// AccordionItem
export interface AccordionItemProps
  extends Pick<CollapsibleRootProps, 'unmountOnHide'>,
    ClassValueProp,
    PrimitiveProps {
  /**
   * Whether or not an accordion item is disabled from user interaction. When `true`, prevents the user from interacting
   * with the item.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /** A string value for the accordion item. All items within an accordion should use a unique value. */
  value: string;
}

// AccordionItemContext
export interface AccordionItemContextParams {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  currentRef: VNodeRef;
  currentElement: ComputedRef<HTMLElement | undefined>;
  value: ComputedRef<string>;
}

export interface AccordionItemContext extends AccordionItemContextParams {
  triggerId: Ref<string>;
  initTriggerId: () => void;
  dataState: ComputedRef<DisclosureState>;
  dataDisabled: ComputedRef<'' | undefined>;
}

// AccordionHeader
export interface AccordionHeaderProps extends ClassValueProp, PrimitiveProps {}

// AccordionContent
export interface AccordionContentProps
  extends Pick<CollapsibleContentProps, 'forceMount'>,
    ClassValueProp,
    PrimitiveProps {}

// AccordionTrigger
export interface AccordionTriggerProps extends ClassValueProp, PrimitiveProps {}

// Accordion
export interface AccordionItemData extends Pick<AccordionItemProps, 'value' | 'disabled'> {
  /** The title of the accordion item. */
  title?: string;
  /** The content of the accordion item. */
  content?: string;
}
