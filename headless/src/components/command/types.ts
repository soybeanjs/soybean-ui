import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../icon/types';
import type { KbdProps, KbdValue } from '../kbd/types';
import type {
  ListboxContentProps as CommandListProps,
  ListboxGroupLabelProps as CommandGroupLabelProps,
  ListboxGroupProps as CommandGroupProps,
  ListboxItemEmits as CommandItemEmits,
  ListboxItemProps as CommandItemProps,
  ListboxFilterProps as CommandInputProps,
  ListboxRootEmits as CommandRootEmits,
  ListboxRootProps as CommandRootProps,
  ListboxUiSlot
} from '../listbox/types';
import type { SeparatorRootProps } from '../separator/types';

export interface CommandSingleOptionData extends Pick<CommandItemProps, 'value' | 'disabled'> {
  icon?: IconValue;
  label: string;
  separator?: boolean;
  shortcut?: KbdValue | KbdValue[];
}

export interface CommandGroupOptionData<T extends CommandSingleOptionData = CommandSingleOptionData>
  extends Pick<CommandSingleOptionData, 'value' | 'label' | 'separator'> {
  items: T[];
}

export type CommandOptionData<T extends CommandSingleOptionData = CommandSingleOptionData> =
  | T
  | CommandGroupOptionData<T>;

export interface CommandItemLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CommandShortcutProps extends Omit<KbdProps, 'value'> {}

export interface CommandSeparatorProps extends SeparatorRootProps {}

export type CommandSearchOptionData<T extends CommandSingleOptionData = CommandSingleOptionData> = T & {
  groupValue?: string;
  groupLabel?: string;
  groupSeparator?: boolean;
};

export interface CommandEmptyProps extends /** @vue-ignore */ HTMLAttributes {}

export type CommandUiSlot =
  | Extract<ListboxUiSlot, 'root' | 'item' | 'group' | 'groupLabel'>
  | 'list'
  | 'inputRoot'
  | 'inputControl'
  | 'inputClearable'
  | 'itemLabel'
  | 'shortcut'
  | 'separator'
  | 'empty';

export type CommandUi = UiClass<CommandUiSlot>;

export interface CommandCompactProps<T extends CommandSingleOptionData = CommandSingleOptionData>
  extends Omit<CommandRootProps, 'onSelect'> {
  items: CommandOptionData<T>[];
  placeholder?: string;
  searchTerm?: string;
  clearable?: boolean;
  fuseOptions?: UseFuseOptions<CommandSearchOptionData<T>>;
  listProps?: CommandListProps;
  itemProps?: CommandItemProps;
  itemLabelProps?: CommandItemLabelProps;
  groupProps?: CommandGroupProps;
  groupLabelProps?: CommandGroupLabelProps;
  shortcutProps?: CommandShortcutProps;
  separatorProps?: CommandSeparatorProps;
  inputProps?: CommandInputProps;
  emptyProps?: CommandEmptyProps;
  emptyLabel?: string;
}

export type CommandSearchTermEmits = {
  'update:searchTerm': [value: string];
};

export type CommandCompactEmits = CommandRootEmits & CommandItemEmits & CommandSearchTermEmits;

export interface CommandCompactInputSlotProps {
  clear: () => void;
}

export interface CommandCompactItemSlotProps<T extends CommandSingleOptionData = CommandSingleOptionData> {
  item: T;
}

export type CommandCompactSlots<T extends CommandSingleOptionData = CommandSingleOptionData> = {
  'input-leading'?: (props: CommandCompactInputSlotProps) => any;
  'input-trailing'?: (props: CommandCompactInputSlotProps) => any;
  empty?: () => any;
  'item-leading'?: (props: CommandCompactItemSlotProps<T>) => any;
  'item-trailing'?: (props: CommandCompactItemSlotProps<T>) => any;
  'item-label'?: (props: CommandCompactItemSlotProps<T>) => any;
  bottom?: () => any;
};

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
