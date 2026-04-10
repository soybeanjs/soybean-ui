import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { CollectionItemData } from '../../composables';
import type { Direction, ForceMountProps, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { InputControlProps, InputRootEmits, InputRootProps } from '../input/types';
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

export interface AutocompleteRootContext
  extends PropsToContext<AutocompleteRootProps, 'dir' | 'disabled' | 'highlightOnHover' | 'openOnClick' | 'openOnFocus'> {
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

export type AutocompleteUiSlot =
  | 'root'
  | 'anchor'
  | 'inputRoot'
  | 'inputControl'
  | 'trigger'
  | 'content'
  | 'viewport'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemIndicator'
  | 'separator';

export type AutocompleteUi = UiClass<AutocompleteUiSlot>;

export type {
  PortalProps as AutocompletePortalProps
};
