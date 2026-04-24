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

export type AccordionRootEmits<M extends boolean = false> = SelectionEmits<M>;

export interface AccordionItemProps extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /** Value of the accordion item. All items within an accordion should use a unique value. */
  value: string;
}

export interface AccordionHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

export interface AccordionContentProps extends CollapsibleContentProps {}

export interface AccordionDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

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

export interface AccordionCompactProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> extends AccordionRootProps<M> {
  items: T[];
  itemProps?: AccordionItemProps;
  headerProps?: AccordionHeaderProps;
  triggerProps?: AccordionTriggerProps;
  contentProps?: AccordionContentProps;
  descriptionProps?: AccordionDescriptionProps;
}

export type AccordionCompactEmits<M extends boolean = false> = AccordionRootEmits<M>;

export interface AccordionCompactSlotProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> {
  item: T;
  index: number;
  modelValue: (M extends true ? string[] : string) | undefined;
  open: boolean;
}

export type AccordionCompactSlots<T extends AccordionOptionData = AccordionOptionData, M extends boolean = false> = {
  item?: (props: AccordionCompactSlotProps<T, M>) => any;
  leading?: (props: AccordionCompactSlotProps<T, M>) => any;
  title?: (props: AccordionCompactSlotProps<T, M>) => any;
  'trigger-icon'?: (props: AccordionCompactSlotProps<T, M>) => any;
  content?: (props: AccordionCompactSlotProps<T, M>) => any;
};

export interface AccordionRootContext extends PropsToContext<
  AccordionRootProps,
  'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'
> {
  dir: ComputedRef<Direction>;
  rootElement: ShallowRef<HTMLElement | undefined>;
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  isMultiple: ComputedRef<boolean>;
  onModelValueChange: (value: string) => void;
}

export interface AccordionItemContextParams extends PropsToContext<AccordionItemProps, 'value'> {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
}

export type AccordionUiSlot =
  | 'root'
  | 'item'
  | 'header'
  | 'trigger'
  | 'content'
  | 'description'
  | 'triggerLeadingIcon'
  | 'triggerIcon';

export type AccordionUi = UiClass<AccordionUiSlot>;
