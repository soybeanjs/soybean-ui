import type { Component, VNode } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type {
  AcceptableValue,
  ClassValue,
  ClassValueProp,
  DialogContentEmits,
  DialogContentProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  ListboxContentProps,
  ListboxFilterEmits,
  ListboxFilterProps,
  ListboxGroupProps,
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps,
  ListboxRootEmits,
  ListboxRootProps,
  SelectEvent
} from '@soybean-ui/primitive';
import type { InputProps } from '../input';

// CommandRoot
export type CommandRootProps<T extends AcceptableValue = AcceptableValue> = ListboxRootProps<T>;
export type CommandRootEmits<T extends AcceptableValue = AcceptableValue> = ListboxRootEmits<T>;

// CommandInput
export interface CommandInputWrapperProps extends ClassValueProp {}
export interface CommandInputProps extends InputProps, ListboxFilterProps {}
export type CommandInputEmits = ListboxFilterEmits;
export interface CommandInputIconProps extends ClassValueProp {}

// CommandEmpty
export interface CommandEmptyProps extends ClassValueProp {}

// CommandList
export interface CommandListProps extends ListboxContentProps {}

// CommandGroup
export interface CommandGroupProps extends ListboxGroupProps {}
export interface CommandGroupHeadingProps extends ClassValueProp {}

// CommandItem
export interface CommandItemProps<T extends AcceptableValue = AcceptableValue> extends ListboxItemProps<T> {}
export type CommandItemEmits<T extends AcceptableValue = AcceptableValue> = ListboxItemEmits<T>;

// CommandItemIndicator
export interface CommandItemIndicatorProps extends ListboxItemIndicatorProps {}

// CommandSeparator
export interface CommandSeparatorProps extends ClassValueProp {}

// CommandDialog
export interface CommandDialogProps extends DialogRootProps, DialogContentProps, Pick<DialogPortalProps, 'to'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  overlayClass?: ClassValue;
  forceMountOverlay?: boolean;
  showClose?: boolean;
  closeClass?: ClassValue;
}
export type CommandDialogEmits = DialogRootEmits & DialogContentEmits;

// CommandShortcut
export interface CommandShortcutProps extends ClassValueProp {}

// CommandItemOption
export interface CommandItemSingleOption<T extends AcceptableValue = AcceptableValue>
  extends Omit<CommandItemProps<T>, 'class'> {
  label: string;
  icon?: Component | VNode;
  shortcut?: string;
  separator?: boolean;
}

export interface CommandItemGroupOption<T extends AcceptableValue = AcceptableValue>
  extends Pick<CommandItemSingleOption<T>, 'label' | 'separator'> {
  groupId: string;
  items: CommandItemSingleOption<T>[];
}

export interface CommandItemSearchOption<T extends AcceptableValue = AcceptableValue>
  extends CommandItemSingleOption<T> {
  isGroup?: boolean;
  groupId: string;
  groupLabel?: string;
  groupSeparator?: boolean;
}

export interface CommandItemHighlightSearchOption<T extends AcceptableValue = AcceptableValue>
  extends CommandItemSearchOption<T> {
  labelHtml?: string;
}

export type CommandItemOption<T extends AcceptableValue = AcceptableValue> =
  | CommandItemSingleOption<T>
  | CommandItemGroupOption<T>;

// Command
export interface CommandProps<
  T extends AcceptableValue = AcceptableValue,
  S extends CommandItemOption<T> = CommandItemOption<T>
> extends CommandRootProps<T> {
  items: S[];
  fuseOptions?: UseFuseOptions<CommandItemSearchOption<T>>;
  searchTerm?: string;
  inputWrapperClass?: ClassValue;
  inputClass?: ClassValue;
  inputProps?: Omit<CommandInputProps, 'class' | 'modelValue'>;
  inputIconClass?: ClassValue;
  emptyClass?: ClassValue;
  emptyLabel?: string;
  listClass?: ClassValue;
  groupClass?: ClassValue;
  groupHeadingClass?: ClassValue;
  itemClass?: ClassValue;
  itemIconClass?: ClassValue;
  separatorClass?: ClassValue;
  shortcutClass?: ClassValue;
}
export type CommandItemOptionEmits<T extends AcceptableValue = AcceptableValue> = {
  select: [item: CommandItemSingleOption<T>, event: SelectEvent<T>];
};
export type SearchTermEmit = {
  'update:searchTerm': [value: string];
};
export type CommandEmits<T extends AcceptableValue = AcceptableValue> = CommandRootEmits<T> &
  CommandItemOptionEmits<T> &
  SearchTermEmit;
