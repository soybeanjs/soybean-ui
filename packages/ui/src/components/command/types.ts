import type {
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

export interface CommandRootProps extends ComboboxRootProps {}

export type CommandRootEmits = ComboboxRootEmits;

export interface CommandInputWrapperProps extends ClassValueProp {}

export interface CommandInputProps extends ComboboxInputProps {}

export interface CommandInputIconProps extends ClassValueProp {}

export interface CommandEmptyProps extends ComboboxEmptyProps {}

export interface CommandListProps extends ComboboxContentProps {}

export type CommandListEmits = ComboboxContentEmits;

export interface CommandGroupProps extends ComboboxGroupProps {}

export interface CommandGroupHeadingProps extends ClassValueProp {}

export interface CommandItemProps extends ComboboxItemProps {}

export type CommandItemEmits = ComboboxItemEmits;

export interface CommandSeparatorProps extends ComboboxSeparatorProps {}

export interface CommandDialogProps extends DialogRootProps, ClassValueProp {}

export type CommandDialogEmits = DialogRootEmits;

export interface CommandShortcutProps extends ClassValueProp {}
