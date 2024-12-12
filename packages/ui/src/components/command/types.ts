import type {
  AcceptableValue,
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
  DialogRootEmits,
  DialogRootProps
} from '@soybean-ui/primitive';

export interface CommandRootProps<T extends AcceptableValue> extends ComboboxRootProps<T> {}

export type CommandRootEmits<T extends AcceptableValue> = ComboboxRootEmits<T>;

export interface CommandInputWrapperProps extends ClassValueProp {}

export interface CommandInputProps extends ComboboxInputProps {}

export interface CommandInputIconProps extends ClassValueProp {}

export interface CommandEmptyProps extends ComboboxEmptyProps {}

export interface CommandListProps extends ComboboxContentProps {}

export type CommandListEmits = ComboboxContentEmits;

export interface CommandGroupProps extends ComboboxGroupProps {}

export interface CommandGroupHeadingProps extends ClassValueProp {}

export interface CommandItemProps<T extends AcceptableValue> extends ComboboxItemProps<T> {}

export type CommandItemEmits = ComboboxItemEmits;

export interface CommandSeparatorProps extends ComboboxSeparatorProps {}

export interface CommandDialogProps extends DialogRootProps, ClassValueProp {}

export type CommandDialogEmits = DialogRootEmits;

export interface CommandShortcutProps extends ClassValueProp {}

export interface CommandProps<T extends AcceptableValue, S extends CommandItemProps<T>> extends CommandRootProps<T> {
  items: S[];
}
