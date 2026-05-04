import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import type {
  DataOrientation,
  Direction,
  FormFieldCommonProps,
  MaybeArray,
  PropsToContext,
  SelectEvent,
  SelectionEmits,
  SelectionProps,
  UiClass
} from '../../types';
import type { CollectionItemData } from '../../composables';
import type { PrimitiveProps } from '../primitive/types';
import type { InputControlProps, InputRootEmits, InputRootProps } from '../input/types';

/**
 * Properties for the listbox root component.
 */
export interface ListboxRootProps<M extends boolean = false>
  extends SelectionProps<M>, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /**
   * The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with listbox */
  disabled?: boolean;
  /** When `true`, hover over item will trigger highlight */
  highlightOnHover?: boolean;
}

/**
 * Value associated with the current item.
 */
/**
 * Type information for the listbox collection item data component.
 */
/**
 * Value associated with the current item.
 */
export type ListboxCollectionItemData = { value: string };

/**
 * Events for the listbox root component.
 */
export type ListboxRootEmits<M extends boolean = false> = SelectionEmits<M> & {
  /** Event handler when highlighted element changes. */
  highlight: [payload?: CollectionItemData<ListboxCollectionItemData>];
  /** Event handler called when container is being focused. Can be prevented. */
  entryFocus: [event: CustomEvent];
  /** Event handler called when the mouse leave the container */
  leave: [event: Event];
};

/**
 * Properties for the listbox item component.
 */
export interface ListboxItemProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /** The value given as data when submitted with a `name`. */
  value: string;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}

/**
 * Events for the listbox item component.
 */
export type ListboxItemEmits = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<string>];
};

/**
 * Properties for the listbox item indicator component.
 */
export interface ListboxItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the listbox group component.
 */
export interface ListboxGroupProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the listbox group label component.
 */
export interface ListboxGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the listbox filter component.
 */
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

/**
 * Events for the listbox filter component.
 */
export type ListboxFilterEmits = InputRootEmits;

/**
 * Properties for the listbox content component.
 */
export interface ListboxContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the listbox virtualizer component.
 */
export interface ListboxVirtualizerProps {
  /** List of items */
  options: string[];
  /** Number of items rendered outside the visible area */
  overscan?: number;
  /** Estimated size (in px) of each item */
  estimateSize?: number | ((index: number) => number);
  /** Text content for each item to achieve type-ahead feature */
  textContent?: (option: string) => string;
}

/**
 * Properties for the listbox virtualizer slots component.
 */
export type ListboxVirtualizerSlotsProps = {
  /**
   * Option.
   */
  option: string;
  /**
   * Virtualizer.
   */
  virtualizer: Virtualizer<HTMLElement, Element>;
  /**
   * Virtual item.
   */
  virtualItem: VirtualItem;
};

/**
 * Slots for the listbox virtualizer component.
 */
export type ListboxVirtualizerSlots = {
  /**
   * Custom content for the default slot.
   */
  default: (props: ListboxVirtualizerSlotsProps) => any;
};

/**
 * Parameters used to create the listbox root context.
 */
export interface ListboxRootContextParams extends PropsToContext<
  ListboxRootProps,
  'dir' | 'orientation' | 'disabled' | 'highlightOnHover' | 'selectionBehavior'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  /**
   * Handler used to update the model value.
   */
  onModelValueChange: (value: string) => void;
  /**
   * Whether multiple values are supported.
   */
  isMultiple: ComputedRef<boolean>;
  /**
   * Callback invoked when the highlight event fires.
   */
  onHighlight: (item: CollectionItemData<ListboxCollectionItemData> | undefined) => void;
  /**
   * Callback invoked when the entry focus event fires.
   */
  onEntryFocus: (event: CustomEvent<unknown>) => void;
  /**
   * Callback invoked when the leave event fires.
   */
  onLeave: (event: Event) => void;
}

/**
 * Parameters used to create the listbox group context.
 */
export interface ListboxGroupContextParams {
  /**
   * Id used by the component context.
   */
  id: string;
}

/**
 * Parameters used to create the listbox item context.
 */
export interface ListboxItemContextParams {
  /**
   * Whether a selected.
   */
  isSelected: ComputedRef<boolean>;
}

/**
 * Available UI slots for the listbox component.
 */
export type ListboxUiSlot =
  | 'root'
  | 'content'
  | 'filterRoot'
  | 'filterControl'
  | 'item'
  | 'itemIndicator'
  | 'group'
  | 'groupLabel'
  | 'virtualizer';

/**
 * UI class overrides for the listbox component.
 */
export type ListboxUi = UiClass<ListboxUiSlot>;
