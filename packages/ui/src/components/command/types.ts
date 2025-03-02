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
} from '@soybean-ui/primitives';
import type { CommandSlots, ThemeSize } from '@soybean-ui/variants';
import type { InputProps } from '../input';

// CommandRoot
export interface CommandRootProps<T extends AcceptableValue = AcceptableValue> extends ListboxRootProps<T> {
  size?: ThemeSize;
}
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
export interface CommandGroupLabelProps extends ClassValueProp {}

// CommandItem
export interface CommandItemProps<T extends AcceptableValue = AcceptableValue> extends ListboxItemProps<T> {}
export type CommandItemEmits<T extends AcceptableValue = AcceptableValue> = ListboxItemEmits<T>;

// CommandItemIndicator
export interface CommandItemIndicatorProps extends ListboxItemIndicatorProps {}

// CommandSeparator
export interface CommandSeparatorProps extends ClassValueProp {}

// CommandDialog
export interface CommandDialogProps
  extends DialogRootProps,
    DialogContentProps,
    Pick<DialogPortalProps, 'to' | 'defer'> {
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

export interface CommandOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<CommandItemProps<T>, 'value' | 'disabled'> {
  /** The label to display in the command. */
  label: string;
  /** The icon to display in the command. */
  icon?: Component | VNode;
  /** The shortcut to display in the command. */
  shortcut?: string;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface CommandGroupOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<CommandOptionData, 'separator' | 'label'> {
  items: CommandOptionData<T>[];
}

export type CommandSingleOptionSlots = Extract<CommandSlots, 'item' | 'itemIcon' | 'shortcut' | 'separator'>;

export interface CommandSingleOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: CommandOptionData<T>;
  ui?: Partial<Record<CommandSingleOptionSlots, ClassValue>>;
}
export type CommandSingleOptionEmits<T extends AcceptableValue = AcceptableValue> = {
  select: [event: SelectEvent<T>];
};

export type CommandOptionSlots = Extract<
  CommandSlots,
  'group' | 'groupLabel' | 'item' | 'itemIcon' | 'shortcut' | 'separator'
>;

export interface CommandOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: CommandOptionData<T> | CommandGroupOptionData<T>;
  ui?: Partial<Record<CommandOptionSlots, ClassValue>>;
}

export type CommandOptionEmits<T extends AcceptableValue = AcceptableValue> = {
  select: [item: CommandOptionData<T>, event: SelectEvent<T>];
};

export interface CommandSearchOptionData<T extends AcceptableValue = AcceptableValue> extends CommandOptionData<T> {
  groupLabel?: string;
  groupSeparator?: boolean;
}

export interface CommandHighlightSearchOptionData<T extends AcceptableValue = AcceptableValue>
  extends CommandSearchOptionData<T> {
  labelHtml?: string;
}

export type CommandUi = Partial<Record<CommandSlots, ClassValue>>;

// Command
export interface CommandProps<T extends AcceptableValue = AcceptableValue> extends CommandRootProps<T> {
  items: (CommandOptionData<T> | CommandGroupOptionData<T>)[];
  ui?: CommandUi;
  fuseOptions?: UseFuseOptions<CommandSearchOptionData<T>>;
  searchTerm?: string;
  inputProps?: Omit<CommandInputProps, 'class' | 'modelValue'>;
  emptyLabel?: string;
}

export type CommandSearchTermEmit = {
  'update:searchTerm': [value: string];
};
export type CommandEmits<T extends AcceptableValue = AcceptableValue> = CommandRootEmits<T> &
  CommandOptionEmits<T> &
  CommandSearchTermEmit;
