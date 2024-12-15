import type { Component, VNode } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  ClassValueProp,
  ComboboxContentEmits,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemEmits,
  ComboboxItemProps,
  ComboboxRootEmits,
  ComboboxRootProps,
  ComboboxSeparatorProps,
  DialogContentEmits,
  DialogContentProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  SelectEvent
} from '@soybean-ui/primitive';
import type { InputProps } from '../input';

export interface CommandRootProps<T extends AcceptableValue> extends ComboboxRootProps<T> {}

export type CommandRootEmits<T extends AcceptableValue> = ComboboxRootEmits<T>;

export interface CommandInputWrapperProps extends ClassValueProp {}

export interface CommandInputProps extends ComboboxInputProps, InputProps {}

export interface CommandInputIconProps extends ClassValueProp {}

export interface CommandEmptyProps extends ComboboxEmptyProps {}

export interface CommandListProps extends ComboboxContentProps {}

export type CommandListEmits = ComboboxContentEmits;

export interface CommandGroupProps extends ComboboxGroupProps {}

export interface CommandGroupHeadingProps extends ClassValueProp {}

export interface CommandItemProps<T extends AcceptableValue> extends ComboboxItemProps<T> {}

export type CommandItemEmits<T extends AcceptableValue> = ComboboxItemEmits<T>;

export interface CommandSeparatorProps extends ComboboxSeparatorProps {}

export interface CommandDialogProps extends DialogRootProps, DialogContentProps, Pick<DialogPortalProps, 'to'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  overlayClass?: ClassValue;
  forceMountOverlay?: boolean;
  showClose?: boolean;
  closeClass?: ClassValue;
}

export type CommandDialogEmits = DialogRootEmits & DialogContentEmits;

export interface CommandShortcutProps extends ClassValueProp {}

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

export type CommandItemOption<T extends AcceptableValue = AcceptableValue> =
  | CommandItemSingleOption<T>
  | CommandItemGroupOption<T>;

export interface CommandProps<T extends AcceptableValue, S extends CommandItemOption<T>> extends CommandRootProps<T> {
  items: S[];
  inputWrapperClass?: ClassValue;
  inputClass?: ClassValue;
  inputProps?: Omit<CommandInputProps, 'class'>;
  inputIconClass?: ClassValue;
  emptyClass?: ClassValue;
  emptyLabel?: string;
  listClass?: ClassValue;
  listProps?: Omit<ComboboxContentProps, 'class'>;
  groupClass?: ClassValue;
  groupHeadingClass?: ClassValue;
  itemClass?: ClassValue;
  itemIconClass?: ClassValue;
  separatorClass?: ClassValue;
  shortcutClass?: ClassValue;
}

export type CommandItemOptionEmits<T extends AcceptableValue> = {
  select: [item: CommandItemSingleOption<T>, event: SelectEvent<T>];
};

export type CommandEmits<T extends AcceptableValue> = ComboboxRootEmits<T> &
  CommandListEmits &
  CommandItemOptionEmits<T>;
