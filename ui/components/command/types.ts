import type { ComputedRef, HTMLAttributes } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type {
  AcceptableValue,
  ClassValue,
  ListboxGroupLabelProps as CommandGroupLabelProps,
  ListboxGroupProps as CommandGroupProps,
  ListboxFilterProps as CommandInputProps,
  ListboxItemEmits as CommandItemEmits,
  ListboxItemProps as CommandItemProps,
  ListboxContentProps as CommandListProps,
  ListboxRootEmits as CommandRootEmits,
  ListboxRootProps as CommandRootProps,
  DefinedValue,
  DividerRootProps,
  KbdProps,
  KbdValue,
  ListboxThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';
import type { IconValue } from '../icon/types';

export interface CommandSingleOptionData<T = DefinedValue> extends Pick<CommandItemProps<T>, 'value' | 'disabled'> {
  /**
   * The icon of the command item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: IconValue;
  /** The label to display in the command item. */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
  /** The shortcut of the command item. */
  shortcut?: KbdValue | KbdValue[];
}

export interface CommandGroupOptionData<T = DefinedValue> extends Pick<CommandSingleOptionData, 'separator' | 'label'> {
  items: CommandSingleOptionData<T>[];
}

export type CommandOptionData<T = DefinedValue> = CommandSingleOptionData<T> | CommandGroupOptionData<T>;

export interface CommandItemLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CommandShortcutProps extends Omit<KbdProps, 'value'> {}

export interface CommandSeparatorProps extends DividerRootProps {}

export interface CommandSingleOptionProps<T = DefinedValue> extends Omit<CommandItemProps<T>, 'value' | 'disabled'> {
  item: CommandSingleOptionData<T>;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandSingleOptionEmits<T = DefinedValue> = CommandItemEmits<T>;

export interface CommandGroupOptionProps<T = DefinedValue> extends Omit<CommandGroupProps, 'onSelect'> {
  item: CommandGroupOptionData<T>;
  groupLabelProps?: CommandGroupLabelProps;
  itemProps?: CommandItemProps<T>;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandGroupOptionEmits<T = DefinedValue> = CommandItemEmits<T>;

export interface CommandOptionProps<T = DefinedValue> {
  item: CommandOptionData<T>;
  groupProps?: CommandGroupProps;
  groupLabelProps?: CommandGroupLabelProps;
  itemProps?: CommandItemProps<T>;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandOptionEmits<T = DefinedValue> = CommandItemEmits<T>;

export interface CommandSearchOptionData<T extends DefinedValue = DefinedValue> extends CommandSingleOptionData<T> {
  groupLabel?: string;
  groupSeparator?: boolean;
}

export interface CommandHighlightSearchOptionData<T extends DefinedValue = DefinedValue>
  extends CommandSearchOptionData<T> {
  labelHtml?: string;
}

export interface CommandEmptyProps extends /** @vue-ignore */ HTMLAttributes {}

export type CommandThemeSlot =
  | Extract<ListboxThemeSlot, 'root' | 'item' | 'group' | 'groupLabel'>
  | 'list'
  | 'inputRoot'
  | 'inputControl';

export type CommandExtraThemeSlot = 'inputClearable' | 'itemLabel' | 'shortcut' | 'separator' | 'empty';

export type CommandUi = Partial<Record<CommandThemeSlot | CommandExtraThemeSlot, ClassValue>>;

export interface CommandProps<T extends AcceptableValue = AcceptableValue>
  extends Omit<CommandRootProps<T, false>, 'onSelect'> {
  size?: ThemeSize;
  ui?: CommandUi;
  items: CommandOptionData<NonNullable<T>>[];
  listProps?: CommandListProps;
  itemProps?: CommandItemProps<NonNullable<T>>;
  itemLabelProps?: CommandItemLabelProps;
  groupProps?: CommandGroupProps;
  groupLabelProps?: CommandGroupLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
  inputProps?: CommandInputProps;
  searchTerm?: string;
  clearable?: boolean;
  fuseOptions?: UseFuseOptions<CommandSearchOptionData<NonNullable<T>>>;
  emptyProps?: CommandEmptyProps;
  emptyLabel?: string;
}

export type CommandSearchTermEmits = {
  'update:searchTerm': [value: string];
};

export type CommandEmits<T extends AcceptableValue = AcceptableValue> = CommandRootEmits<T> &
  CommandOptionEmits<NonNullable<T>> &
  CommandSearchTermEmits;

export interface CommandExtraThemeContextParams {
  ui: ComputedRef<Record<CommandExtraThemeSlot, ClassValue>>;
}

export type {
  CommandRootProps,
  CommandRootEmits,
  CommandListProps,
  CommandInputProps,
  CommandGroupLabelProps,
  CommandGroupProps,
  CommandItemProps,
  CommandItemEmits
};
