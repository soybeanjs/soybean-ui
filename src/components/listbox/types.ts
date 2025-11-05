import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import type {
  ClassValue,
  DataOrientation,
  Direction,
  FormFieldCommonProps,
  MaybeArray,
  PropsToContext,
  SelectEvent,
  SelectionEmits,
  SelectionProps
} from '../../types';
import type { CollectionItemData } from '../../composables';
import type { PrimitiveProps } from '../primitive/types';
import type { InputControlProps, InputRootEmits, InputRootProps } from '../input/types';

export interface ListboxRootProps<M extends boolean = false>
  extends SelectionProps<M>,
    FormFieldCommonProps,
    /** @vue-ignore */ HTMLAttributes {
  /** The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /**
   * The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with listbox */
  disabled?: boolean;
  /**
   * How multiple selection should behave in the collection.
   *
   * @defaultValue 'toggle'
   */
  selectionBehavior?: 'toggle' | 'replace';
  /** When `true`, hover over item will trigger highlight */
  highlightOnHover?: boolean;
}

export type ListboxCollectionItemData = { value: string };

export type ListboxRootEmits<M extends boolean = false> = SelectionEmits<M> & {
  /** Event handler when highlighted element changes. */
  highlight: [payload?: CollectionItemData<ListboxCollectionItemData>];
  /** Event handler called when container is being focused. Can be prevented. */
  entryFocus: [event: CustomEvent];
  /** Event handler called when the mouse leave the container */
  leave: [event: Event];
};

export interface ListboxItemProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /** The value given as data when submitted with a `name`. */
  value: string;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}

export type ListboxItemEmits = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<string>];
};

export interface ListboxItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ListboxGroupProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxFilterProps extends InputRootProps {
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  /**
   * The props of the input extra props.
   */
  controlProps?: InputControlProps;
}

export type ListboxFilterEmits = InputRootEmits;

export interface ListboxContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxVirtualizerProps {
  /** List of items */
  options: string[];
  /** Number of items rendered outside the visible area */
  overscan?: number;
  /** Estimated size (in px) of each item */
  estimateSize?: number;
  /** Text content for each item to achieve type-ahead feature */
  textContent?: (option: string) => string;
}

export type ListboxVirtualizerSlotsProps = {
  option: string;
  virtualizer: Virtualizer<HTMLElement, Element>;
  virtualItem: VirtualItem;
};

export type ListboxVirtualizerSlots = {
  default: (props: ListboxVirtualizerSlotsProps) => any;
};

export interface ListboxRootContextParams
  extends PropsToContext<
    ListboxRootProps,
    'dir' | 'orientation' | 'disabled' | 'highlightOnHover' | 'selectionBehavior'
  > {
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  isMultiple: ComputedRef<boolean>;
  onHighlight: (item: CollectionItemData<ListboxCollectionItemData> | undefined) => void;
  onEntryFocus: (event: CustomEvent<unknown>) => void;
  onLeave: (event: Event) => void;
}

export interface ListboxGroupContextParams {
  id: string;
}

export interface ListboxItemContextParams {
  isSelected: ComputedRef<boolean>;
}

export type ListboxThemeSlot =
  | 'root'
  | 'content'
  | 'filterRoot'
  | 'filterControl'
  | 'item'
  | 'itemIndicator'
  | 'group'
  | 'groupLabel'
  | 'virtualizer';

export interface ListboxThemeContextParams {
  ui: ComputedRef<Partial<Record<ListboxThemeSlot, ClassValue>>>;
}
