import type { ComputedRef, HTMLAttributes } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type {
  ClassValue,
  ListboxGroupLabelProps as CommandGroupLabelProps,
  ListboxGroupProps as CommandGroupProps,
  ListboxFilterProps as CommandInputProps,
  ListboxItemEmits as CommandItemEmits,
  ListboxItemProps as CommandItemProps,
  ListboxContentProps as CommandListProps,
  ListboxRootEmits as CommandRootEmits,
  ListboxRootProps as CommandRootProps,
  DividerRootProps,
  KbdProps,
  KbdValue,
  ListboxThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';
import type { IconValue } from '../icon/types';

export interface CommandSingleOptionData extends Pick<CommandItemProps, 'value' | 'disabled'> {
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

export interface CommandGroupOptionData extends Pick<CommandSingleOptionData, 'separator' | 'label'> {
  items: CommandSingleOptionData[];
}

export type CommandOptionData = CommandSingleOptionData | CommandGroupOptionData;

export interface CommandItemLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CommandShortcutProps extends Omit<KbdProps, 'value'> {}

export interface CommandSeparatorProps extends DividerRootProps {}

export interface CommandSingleOptionProps extends Omit<CommandItemProps, 'value' | 'disabled'> {
  item: CommandSingleOptionData;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandSingleOptionEmits = CommandItemEmits;

export interface CommandGroupOptionProps extends Omit<CommandGroupProps, 'onSelect'> {
  item: CommandGroupOptionData;
  groupLabelProps?: CommandGroupLabelProps;
  itemProps?: CommandItemProps;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandGroupOptionEmits = CommandItemEmits;

export interface CommandOptionProps {
  item: CommandOptionData;
  groupProps?: CommandGroupProps;
  groupLabelProps?: CommandGroupLabelProps;
  itemProps?: CommandItemProps;
  itemLabelProps?: CommandItemLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
}

export type CommandOptionEmits = CommandItemEmits;

export interface CommandSearchOptionData extends CommandSingleOptionData {
  groupLabel?: string;
  groupSeparator?: boolean;
}

export interface CommandHighlightSearchOptionData extends CommandSearchOptionData {
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

export interface CommandProps<T extends CommandOptionData = CommandOptionData>
  extends Omit<CommandRootProps, 'onSelect'> {
  size?: ThemeSize;
  ui?: CommandUi;
  items: T[];
  listProps?: CommandListProps;
  itemProps?: CommandItemProps;
  itemLabelProps?: CommandItemLabelProps;
  groupProps?: CommandGroupProps;
  groupLabelProps?: CommandGroupLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
  inputProps?: CommandInputProps;
  searchTerm?: string;
  clearable?: boolean;
  fuseOptions?: UseFuseOptions<CommandSearchOptionData>;
  emptyProps?: CommandEmptyProps;
  emptyLabel?: string;
}

export type CommandSearchTermEmits = {
  'update:searchTerm': [value: string];
};

export type CommandEmits = CommandRootEmits & CommandOptionEmits & CommandSearchTermEmits;

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
