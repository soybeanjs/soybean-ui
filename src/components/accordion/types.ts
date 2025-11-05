import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  ClassValue,
  DataOrientation,
  Direction,
  MaybeArray,
  PropsToContext,
  SelectionEmits,
  SelectionProps
} from '../../types';
import type {
  CollapsibleContentProps as AccordionContentProps,
  CollapsibleTriggerProps as AccordionTriggerProps,
  CollapsibleRootProps
} from '../collapsible/types';

export interface AccordionHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AccordionItemProps extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /** Value of the accordion item. All items within an accordion should use a unique value. */
  value: string;
}

export interface AccordionRootProps<M extends boolean = false>
  extends SelectionProps<M>,
    /** @vue-ignore */ HTMLAttributes {
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

export interface AccordionRootContextParams
  extends PropsToContext<AccordionRootProps, 'collapsible' | 'disabled' | 'orientation' | 'dir' | 'unmountOnHide'> {
  rootElement: ShallowRef<HTMLElement | undefined>;
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  isMultiple: ComputedRef<boolean>;
  onModelValueChange: (value: string) => void;
}

export interface AccordionItemContextParams extends PropsToContext<AccordionItemProps, 'value'> {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
}

export type AccordionThemeSlot = 'root' | 'item' | 'header' | 'trigger' | 'content';

export interface AccordionThemeContextParams {
  ui: ComputedRef<Record<AccordionThemeSlot, ClassValue>>;
}

export type { AccordionContentProps, AccordionTriggerProps };
