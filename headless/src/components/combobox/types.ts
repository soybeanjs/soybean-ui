import type { EventHookOn } from '@vueuse/core';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  MaybeArray,
  PropsToContext,
  TrapFocusProps,
  UiClass
} from '../../types';
import type {
  ListboxFilterEmits,
  ListboxFilterProps,
  ListboxRootEmits,
  ListboxRootProps,
  ListboxItemProps,
  ListboxItemEmits,
  ListboxGroupProps as ComboboxGroupProps,
  ListboxGroupLabelProps as ComboboxGroupLabelProps,
  ListboxItemIndicatorProps as ComboboxItemIndicatorProps,
  ListboxVirtualizerProps
} from '../listbox/types';
import type { PrimitiveProps } from '../primitive/types';
import type {
  PopperAnchorProps as ComboboxAnchorProps,
  PopperArrowProps as ComboboxArrowProps,
  PopperPopupProps,
  PopperPositionerEmits,
  PopperPositionerProps,
  PopperUiSlot
} from '../popper/types';
import type { IconValue } from '../_icon/types';
import type { PortalProps } from '../portal/types';

export interface ComboboxRootProps<M extends boolean = false> extends Omit<
  ListboxRootProps<M>,
  'orientation' | 'selectionBehavior'
> {
  /** The controlled open state of the Combobox. Can be bound with `v-model:open`. */
  open?: boolean;
  /** The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   * @defaultValue `true`
   */
  resetSearchTermOnBlur?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox value is selected
   * @defaultValue `true`
   */
  resetSearchTermOnSelect?: boolean;
  /**
   * Whether to open the combobox when the input is focused
   * @defaultValue `false`
   */
  openOnFocus?: boolean;
  /**
   * Whether to open the combobox when the input is clicked
   * @defaultValue `false`
   */
  openOnClick?: boolean;
  /**
   * When `true`, disable the default filters
   */
  ignoreFilter?: boolean;
  /**
   * When `true` the `modelValue` will be reset to `null` (or `[]` if `multiple`)
   */
  resetModelValueOnClear?: boolean;
}

export type ComboboxRootEmits<M extends boolean = false> = Pick<
  ListboxRootEmits<M>,
  'update:modelValue' | 'highlight'
> & {
  'update:open': [value: boolean];
};

export interface ComboboxTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface ComboboxContentImplProps
  extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps, ForceMountProps {
  position?: 'inline' | 'popper';
  bodyLock?: boolean;
  hideWhenEmpty?: boolean;
  popupProps?: PopperPopupProps;
}

export type ComboboxContentImplEmits = DismissableLayerEmits & FocusScopeEmits & PopperPositionerEmits;

export interface ComboboxContentProps extends ComboboxContentImplProps {}

export type ComboboxContentEmits = ComboboxContentImplEmits;

export interface ComboboxInputProps extends ListboxFilterProps {
  displayValue?: (value: MaybeArray<string> | undefined) => string;
}

export type ComboboxInputEmits = ListboxFilterEmits;

export interface ComboboxViewportProps extends /** @vue-ignore */ HTMLAttributes {
  nonce?: string;
}

export interface ComboboxItemProps extends ListboxItemProps {
  textValue?: string;
}

export type ComboboxItemEmits = ListboxItemEmits;

export interface ComboboxEmptyProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxSeparatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxCancelProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface ComboboxVirtualizerProps extends ListboxVirtualizerProps {}

export interface ComboboxSingleOptionData extends Pick<ComboboxItemProps, 'disabled' | 'textValue'> {
  value: string;
  icon?: IconValue;
  label: string;
  separator?: boolean;
}

export interface ComboboxGroupOptionData extends Pick<ComboboxSingleOptionData, 'label' | 'separator'> {
  items: ComboboxSingleOptionData[];
}

export type ComboboxOptionData = ComboboxSingleOptionData | ComboboxGroupOptionData;

export interface ComboboxCompactProps<M extends boolean = false> extends ComboboxRootProps<M> {
  items: ComboboxOptionData[];
  placeholder?: string;
  searchPlaceholder?: string;
  clearLabel?: string;
  emptyLabel?: string;
  anchorProps?: ComboboxAnchorProps;
  triggerProps?: ComboboxTriggerProps;
  cancelProps?: ComboboxCancelProps;
  portalProps?: PortalProps;
  contentProps?: ComboboxContentProps;
  viewportProps?: ComboboxViewportProps;
  inputProps?: ComboboxInputProps;
  emptyProps?: ComboboxEmptyProps;
  groupProps?: ComboboxGroupProps;
  groupLabelProps?: ComboboxGroupLabelProps;
  itemProps?: ComboboxItemProps;
  itemIndicatorProps?: ComboboxItemIndicatorProps;
  separatorProps?: ComboboxSeparatorProps;
}

export type ComboboxCompactEmits<M extends boolean = false> = ComboboxRootEmits<M> &
  ComboboxContentEmits &
  ComboboxItemEmits;

type ComboboxCompactModelValue<M extends boolean = false> = (M extends true ? string[] : string) | undefined;

export interface ComboboxCompactTriggerValueSlotProps<M extends boolean = false> {
  modelValue: ComboboxCompactModelValue<M>;
  selectedLabels: string[];
  slotText: string | undefined;
}

export interface ComboboxCompactInputSlotProps {
  clear: () => void;
}

export interface ComboboxCompactGroupLabelSlotProps {
  item: ComboboxGroupOptionData;
}

export interface ComboboxCompactItemSlotProps {
  item: ComboboxSingleOptionData;
}

export type ComboboxCompactSlots<M extends boolean = false> = {
  'trigger-leading'?: () => any;
  'trigger-value'?: (props: ComboboxCompactTriggerValueSlotProps<M>) => any;
  'trigger-trailing'?: () => any;
  'trigger-icon'?: () => any;
  'input-leading'?: (props: ComboboxCompactInputSlotProps) => any;
  'input-trailing'?: (props: ComboboxCompactInputSlotProps) => any;
  empty?: () => any;
  'group-label'?: (props: ComboboxCompactGroupLabelSlotProps) => any;
  'item-leading'?: (props: ComboboxCompactItemSlotProps) => any;
  'item-text'?: (props: ComboboxCompactItemSlotProps) => any;
  'item-trailing'?: (props: ComboboxCompactItemSlotProps) => any;
  'item-indicator'?: (props: ComboboxCompactItemSlotProps) => any;
};

export interface ComboboxRootContext extends PropsToContext<
  ComboboxRootProps,
  | 'dir'
  | 'disabled'
  | 'ignoreFilter'
  | 'resetSearchTermOnBlur'
  | 'resetSearchTermOnSelect'
  | 'openOnFocus'
  | 'openOnClick'
  | 'resetModelValueOnClear'
> {
  isMultiple: ComputedRef<boolean | undefined>;
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  onModelValueChange: (value: string) => void;
  resetModelValue: () => void;
  open: ShallowRef<boolean | undefined>;
  onOpenChange: (value: boolean) => Promise<void> | void;
  isUserInputted: ShallowRef<boolean>;
  isVirtual: ShallowRef<boolean>;
  parentElement: ComputedRef<HTMLElement | undefined>;
  contentId: ShallowRef<string>;
  initContentId: () => void;
  inputElement: ShallowRef<HTMLInputElement | undefined>;
  onInputElementChange: (node: HTMLInputElement) => void;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  onTriggerElementChange: (node: HTMLElement) => void;
  popupElement: ShallowRef<HTMLElement | undefined>;
  onPopupElementChange: (node: HTMLElement) => void;
  highlightedElement: ComputedRef<HTMLElement | null | undefined>;
  onResetSearchTerm: EventHookOn<undefined>;
  filterSearch: ShallowRef<string>;
  allItems: ShallowRef<Map<string, string>>;
  allGroups: ShallowRef<Map<string, Set<string>>>;
  filterState: ComputedRef<{
    count: number;
    items: Map<string, number>;
    groups: Set<string>;
  }>;
}

export type ComboboxUiSlot =
  | PopperUiSlot
  | 'root'
  | 'trigger'
  | 'triggerIcon'
  | 'cancel'
  | 'viewport'
  | 'inputRoot'
  | 'inputControl'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemIndicator'
  | 'empty'
  | 'separator'
  | 'virtualizer';

export type ComboboxUi = UiClass<ComboboxUiSlot>;

export type {
  ComboboxAnchorProps,
  ComboboxArrowProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxItemIndicatorProps
};
