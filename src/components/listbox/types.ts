import type { ComputedRef, HTMLAttributes, WritableComputedRef } from 'vue';
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import type {
  ClassValue,
  DataOrientation,
  DefinedValue,
  Direction,
  FormFieldProps,
  GetSingleValue,
  PropsToContext,
  SelectEvent,
  SingleOrMultipleProps,
  SingleOrMultipleValue
} from '../../types';
import type { CollectionItemData } from '../../composables';
import type { PrimitiveProps } from '../primitive/types';

export interface ListboxRootProps<T extends SingleOrMultipleValue = SingleOrMultipleValue, M extends boolean = false>
  extends SingleOrMultipleProps<T, M>,
    FormFieldProps,
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

export type ListboxCollectionItemData<T = any> = { value: T };

export type ListboxRootEmits<T extends SingleOrMultipleValue = SingleOrMultipleValue> = {
  'update:modelValue': [value: T];
  /** Event handler when highlighted element changes. */
  highlight: [payload?: CollectionItemData<ListboxCollectionItemData<GetSingleValue<T>>>];
  /** Event handler called when container is being focused. Can be prevented. */
  entryFocus: [event: CustomEvent];
  /** Event handler called when the mouse leave the container */
  leave: [event: Event];
};

export interface ListboxItemProps<T = DefinedValue> extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}

export type ListboxItemEmits<T = DefinedValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
};

export interface ListboxItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ListboxGroupProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxFilterProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the filter. Can be bound-with with v-model. */
  modelValue?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}

export type ListboxFilterEmits = {
  'update:modelValue': [string];
};

export interface ListboxContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListboxVirtualizerProps<T extends DefinedValue = DefinedValue> {
  /** List of items */
  options: T[];
  /** Number of items rendered outside the visible area */
  overscan?: number;
  /** Estimated size (in px) of each item */
  estimateSize?: number;
  /** Text content for each item to achieve type-ahead feature */
  textContent?: (option: T) => string;
}

export type ListboxVirtualizerSlotsProps<T extends DefinedValue = DefinedValue> = {
  option: T;
  virtualizer: Virtualizer<HTMLElement, Element>;
  virtualItem: VirtualItem;
};

export type ListboxVirtualizerSlots<T extends DefinedValue = DefinedValue> = {
  default: (props: ListboxVirtualizerSlotsProps<T>) => any;
};

export interface ListboxRootContextParams
  extends PropsToContext<
    ListboxRootProps,
    'dir' | 'orientation' | 'disabled' | 'multiple' | 'highlightOnHover' | 'selectionBehavior'
  > {
  modelValue: WritableComputedRef<SingleOrMultipleValue>;
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
  | 'filter'
  | 'item'
  | 'itemIndicator'
  | 'group'
  | 'groupLabel'
  | 'virtualizer';

export interface ListboxThemeContextParams {
  ui: ComputedRef<Record<ListboxThemeSlot, ClassValue>>;
}
