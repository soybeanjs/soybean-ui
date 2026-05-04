import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DataOrientation,
  Direction,
  MaybeArray,
  PropsToContext,
  SelectionEmits,
  SelectionProps,
  UiClass
} from '../../types';
import type { CollapsibleContentProps, CollapsibleTriggerProps } from '../collapsible/types';
import type { CollapsibleRootProps } from '../collapsible/types';
import type { IconValue } from '../_icon/types';

/**
 * Properties for the accordion root component.
 */
export interface AccordionRootProps<M extends boolean = false>
  extends SelectionProps<M>, /** @vue-ignore */ HTMLAttributes {
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

/**
 * Events for the accordion root component.
 */
export type AccordionRootEmits<M extends boolean = false> = SelectionEmits<M>;

/**
 * Properties for the accordion item component.
 */
export interface AccordionItemProps extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /** Value of the accordion item. All items within an accordion should use a unique value. */
  value: string;
}

/**
 * Properties for the accordion header component.
 */
export interface AccordionHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the accordion trigger component.
 */
export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

/**
 * Properties for the accordion content component.
 */
export interface AccordionContentProps extends CollapsibleContentProps {}

/**
 * Properties for the accordion description component.
 */
export interface AccordionDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Option data for the accordion component.
 */
export interface AccordionOptionData extends Pick<AccordionItemProps, 'value' | 'disabled'> {
  /** The title of the accordion item. */
  title?: string;
  /** The description of the accordion content. */
  description?: string;
  /**
   * The icon of the accordion item.
   */
  icon?: IconValue;
}

/**
 * Properties for the accordion compact component.
 */
export interface AccordionCompactProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> extends AccordionRootProps<M> {
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * Properties forwarded to the item element.
   */
  itemProps?: AccordionItemProps;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: AccordionHeaderProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: AccordionTriggerProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: AccordionContentProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: AccordionDescriptionProps;
}

/**
 * Events for the accordion compact component.
 */
export type AccordionCompactEmits<M extends boolean = false> = AccordionRootEmits<M>;

/**
 * Slot properties for the accordion compact component.
 */
export interface AccordionCompactSlotProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> {
  /**
   * Current item data.
   */
  item: T;
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Current model value.
   */
  modelValue: (M extends true ? string[] : string) | undefined;
  /**
   * Whether the component is open.
   */
  open: boolean;
}

/**
 * Slots for the accordion compact component.
 */
export type AccordionCompactSlots<T extends AccordionOptionData = AccordionOptionData, M extends boolean = false> = {
  /**
   * Custom content for the item slot.
   */
  item?: (props: AccordionCompactSlotProps<T, M>) => any;
  /**
   * Custom content for the leading slot.
   */
  leading?: (props: AccordionCompactSlotProps<T, M>) => any;
  /**
   * Custom content for the title slot.
   */
  title?: (props: AccordionCompactSlotProps<T, M>) => any;
  /**
   * Custom content for the trigger icon slot.
   */
  'trigger-icon'?: (props: AccordionCompactSlotProps<T, M>) => any;
  /**
   * Custom content for the content slot.
   */
  content?: (props: AccordionCompactSlotProps<T, M>) => any;
};

/**
 * Context for the accordion root component.
 */
export interface AccordionRootContext extends PropsToContext<
  AccordionRootProps,
  'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'
> {
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Reference to the root element.
   */
  rootElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  /**
   * Whether multiple values are supported.
   */
  isMultiple: ComputedRef<boolean>;
  /**
   * Handler used to update the model value.
   */
  onModelValueChange: (value: string) => void;
}

/**
 * Parameters used to create the accordion item context.
 */
export interface AccordionItemContextParams extends PropsToContext<AccordionItemProps, 'value'> {
  /**
   * Whether the component is open.
   */
  open: ComputedRef<boolean>;
  /**
   * Whether the component is disabled.
   */
  disabled: ComputedRef<boolean>;
}

/**
 * Available UI slots for the accordion component.
 */
export type AccordionUiSlot =
  | 'root'
  | 'item'
  | 'header'
  | 'trigger'
  | 'content'
  | 'description'
  | 'triggerLeadingIcon'
  | 'triggerIcon';

/**
 * UI class overrides for the accordion component.
 */
export type AccordionUi = UiClass<AccordionUiSlot>;
