import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { CollectionItemData } from '../../composables';
import type { Direction, ForceMountProps, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { InputControlProps, InputRootEmits, InputRootProps } from '../input/types';
import type { IconValue } from '../_icon/types';
import type {
  ListboxCollectionItemData,
  ListboxContentProps,
  ListboxGroupLabelProps,
  ListboxGroupProps,
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps
} from '../listbox/types';
import type { PopperAnchorProps, PopperPositionerProps } from '../popper/types';
import type { PrimitiveProps } from '../primitive/types';
import type { PortalProps } from '../portal/types';
import type { SeparatorRootProps } from '../separator/types';

export interface AutocompleteRootProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the autocomplete input. */
  modelValue?: string;
  /** The value of the autocomplete input when initially rendered. */
  defaultValue?: string;
  /** The controlled open state of the autocomplete popup. */
  open?: boolean;
  /** The open state of the autocomplete popup when initially rendered. */
  defaultOpen?: boolean;
  /** The reading direction of the autocomplete when applicable. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with autocomplete. */
  disabled?: boolean;
  /** When `true`, hover over item will trigger highlight. */
  highlightOnHover?: boolean;
  /** Whether to open the autocomplete when the input is focused. */
  openOnFocus?: boolean;
  /** Whether to open the autocomplete when the input is clicked. */
  openOnClick?: boolean;
}

export type AutocompleteHighlightPayload = CollectionItemData<ListboxCollectionItemData>;

export type AutocompleteRootEmits = {
  'update:modelValue': [value: string];
  'update:open': [value: boolean];
  highlight: [payload?: AutocompleteHighlightPayload];
};

export interface AutocompleteRootContext extends PropsToContext<
  AutocompleteRootProps,
  'dir' | 'disabled' | 'highlightOnHover' | 'openOnClick' | 'openOnFocus'
> {
  modelValue: ShallowRef<string | undefined>;
  open: ShallowRef<boolean | undefined>;
  inputElement: ShallowRef<HTMLInputElement | undefined>;
  setInputElement: (element?: HTMLInputElement) => void;
  inputId: ShallowRef<string>;
  initInputId: () => void;
  contentId: ShallowRef<string>;
  initContentId: () => void;
  onOpenChange: (value: boolean) => void;
  onModelValueChange: (value: string) => void;
}

export interface AutocompleteAnchorProps extends PopperAnchorProps {}

export interface AutocompleteInputProps extends Omit<InputRootProps, 'defaultValue' | 'modelValue'> {
  inputRef?: (el: HTMLInputElement) => void;
  controlProps?: InputControlProps;
}

export type AutocompleteInputEmits = InputRootEmits;

export interface AutocompleteTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface AutocompleteContentProps extends PopperPositionerProps, ForceMountProps {}

export interface AutocompleteViewportProps extends ListboxContentProps {}

export interface AutocompleteGroupProps extends ListboxGroupProps {}

export interface AutocompleteGroupLabelProps extends ListboxGroupLabelProps {}

export interface AutocompleteItemProps extends ListboxItemProps {}

export type AutocompleteItemEmits = ListboxItemEmits;

export interface AutocompleteItemIndicatorProps extends ListboxItemIndicatorProps {}

export interface AutocompleteSeparatorProps extends SeparatorRootProps {}

export interface AutocompleteSingleOptionData extends Pick<AutocompleteItemProps, 'disabled' | 'value'> {
  /** Display label in the option list. */
  label?: string;
  /** Icon displayed before the option text. */
  icon?: IconValue;
  /** Additional keywords used for filtering. */
  keywords?: string[];
  /** Whether to show a separator after this option. */
  separator?: boolean;
}

export interface AutocompleteGroupOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> {
  /** Group label in the option list. */
  label: string;
  /** Whether to show a separator after this group. */
  separator?: boolean;
  items: T[];
}

export type AutocompleteOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  | T
  | AutocompleteGroupOptionData<T>;

export interface AutocompleteSearchOptionData extends AutocompleteSingleOptionData {
  groupLabel?: string;
  groupValue?: string;
  groupSeparator?: boolean;
}

export interface AutocompleteCompactProps<
  T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData
> extends Omit<AutocompleteRootProps, 'defaultValue' | 'modelValue' | 'onSelect'> {
  /** The controlled value of the autocomplete input. */
  modelValue?: string;
  /** The initial value of the autocomplete input. */
  defaultValue?: string;
  items: AutocompleteOptionData<T>[];
  placeholder?: string;
  clearable?: boolean;
  clearLabel?: string;
  emptyLabel?: string;
  fuseOptions?: UseFuseOptions<AutocompleteSearchOptionData>;
  anchorProps?: AutocompleteAnchorProps;
  inputProps?: AutocompleteInputProps;
  triggerProps?: AutocompleteTriggerProps;
  portalProps?: PortalProps;
  contentProps?: AutocompleteContentProps;
  viewportProps?: AutocompleteViewportProps;
  groupProps?: AutocompleteGroupProps;
  groupLabelProps?: AutocompleteGroupLabelProps;
  itemProps?: Omit<AutocompleteItemProps, 'disabled' | 'value'>;
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  separatorProps?: AutocompleteSeparatorProps;
}

export type AutocompleteCompactEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteRootEmits & {
    select: [item: T];
  };

export type AutocompleteCompactSlots<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  'input-leading'?: () => any;
  'input-trailing'?: () => any;
  'trigger-icon'?: () => any;
  empty?: () => any;
  'group-label'?: (props: { item: Extract<AutocompleteOptionData<T>, { items: T[] }> }) => any;
  'item-leading'?: (props: { item: T }) => any;
  'item-label'?: (props: { item: T }) => any;
  'item-trailing'?: (props: { item: T }) => any;
  'item-indicator'?: (props: { item: T }) => any;
};

export type AutocompleteUiSlot =
  | 'root'
  | 'anchor'
  | 'inputRoot'
  | 'inputControl'
  | 'inputIcon'
  | 'inputClearable'
  | 'trigger'
  | 'triggerIcon'
  | 'content'
  | 'viewport'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemText'
  | 'itemIcon'
  | 'itemIndicator'
  | 'separator'
  | 'empty';

export type AutocompleteUi = UiClass<AutocompleteUiSlot>;

export type { PortalProps as AutocompletePortalProps };
