import type { HTMLAttributes } from 'vue';
import type {
  ClassValue,
  ComboboxContentEmits,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemEmits,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxPortalProps,
  ComboboxRootEmits,
  ComboboxRootProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxUi,
  ComboboxViewportProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';

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

export interface ComboboxSingleOptionProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  item: ComboboxSingleOptionData;
  itemIndicatorProps?: ComboboxItemIndicatorProps;
  separatorProps?: ComboboxSeparatorProps;
}

export type ComboboxSingleOptionEmits = {
  itemSelect: [event: ComboboxItemEmits['select'][0]];
};

export interface ComboboxGroupOptionProps extends ComboboxGroupProps {
  item: ComboboxGroupOptionData;
  groupLabelProps?: ComboboxGroupLabelProps;
  itemProps?: ComboboxItemProps;
  itemIndicatorProps?: ComboboxItemIndicatorProps;
  separatorProps?: ComboboxSeparatorProps;
}

export type ComboboxGroupOptionEmits = {
  itemSelect: [event: ComboboxItemEmits['select'][0]];
};

export interface ComboboxOptionProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  item: ComboboxOptionData;
  groupProps?: ComboboxGroupProps;
  groupLabelProps?: ComboboxGroupLabelProps;
  itemProps?: ComboboxItemProps;
  itemIndicatorProps?: ComboboxItemIndicatorProps;
  separatorProps?: ComboboxSeparatorProps;
}

export type ComboboxOptionEmits = {
  itemSelect: [event: ComboboxItemEmits['select'][0]];
};

export interface ComboboxProps<M extends boolean = false> extends ComboboxRootProps<M> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ComboboxUi>;
  items: ComboboxOptionData[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  triggerProps?: ComboboxTriggerProps;
  portalProps?: ComboboxPortalProps;
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

export type ComboboxEmits<M extends boolean = false> = ComboboxRootEmits<M> & ComboboxContentEmits & ComboboxItemEmits;
