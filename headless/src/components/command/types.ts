import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
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

/**
 * Option data for the command single component.
 */
export interface CommandSingleOptionData extends Pick<CommandItemProps, 'value' | 'disabled'> {
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Whether separator.
   */
  separator?: boolean;
  /**
   * Shortcut.
   */
  shortcut?: KbdValue | KbdValue[];
}

/**
 * Option data for the command group component.
 */
export interface CommandGroupOptionData<T extends CommandSingleOptionData = CommandSingleOptionData> extends Pick<
  CommandSingleOptionData,
  'value' | 'label' | 'separator'
> {
  /**
   * Items rendered by the component.
   */
  items: T[];
}

/**
 * Option data for the command component.
 */
export type CommandOptionData<T extends CommandSingleOptionData = CommandSingleOptionData> =
  | T
  | CommandGroupOptionData<T>;

/**
 * Props for the command item label component.
 */
export interface CommandItemLabelProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the command shortcut component.
 */
export interface CommandShortcutProps extends Omit<KbdProps, 'value'> {}

/**
 * Props for the command separator component.
 */
export interface CommandSeparatorProps extends SeparatorRootProps {}

/**
 * Option data for the command search component.
 */
export type CommandSearchOptionData<T extends CommandSingleOptionData = CommandSingleOptionData> = T & {
  /**
   * Group value.
   */
  groupValue?: string;
  /**
   * Group label.
   */
  groupLabel?: string;
  /**
   * Whether group separator.
   */
  groupSeparator?: boolean;
};

/**
 * Props for the command empty component.
 */
export interface CommandEmptyProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Available UI slots for the command component.
 */
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

/**
 * UI class overrides for the command component.
 */
export type CommandUi = UiClass<CommandUiSlot>;

/**
 * Props for the command compact component.
 */
export interface CommandCompactProps<T extends CommandSingleOptionData = CommandSingleOptionData> extends Omit<
  CommandRootProps,
  'onSelect'
> {
  /**
   * Items rendered by the component.
   */
  items: CommandOptionData<T>[];
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Search term.
   */
  searchTerm?: string;
  /**
   * Whether clearable.
   */
  clearable?: boolean;
  /**
   * Fuse options.
   */
  fuseOptions?: UseFuseOptions<CommandSearchOptionData<T>>;
  /**
   * Props forwarded to the list element.
   */
  listProps?: CommandListProps;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: CommandItemProps;
  /**
   * Props forwarded to the item label element.
   */
  itemLabelProps?: CommandItemLabelProps;
  /**
   * Props forwarded to the group element.
   */
  groupProps?: CommandGroupProps;
  /**
   * Props forwarded to the group label element.
   */
  groupLabelProps?: CommandGroupLabelProps;
  /**
   * Props forwarded to the shortcut element.
   */
  shortcutProps?: CommandShortcutProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: CommandSeparatorProps;
  /**
   * Props forwarded to the input element.
   */
  inputProps?: CommandInputProps;
  /**
   * Props forwarded to the empty element.
   */
  emptyProps?: CommandEmptyProps;
  /**
   * Empty label.
   */
  emptyLabel?: string;
}

/**
 * Emits for the command search term component.
 */
export type CommandSearchTermEmits = {
  /**
   * Emitted when the search term value changes.
   */
  'update:searchTerm': [value: string];
};

/**
 * Emits for the command compact component.
 */
export type CommandCompactEmits = CommandRootEmits & CommandItemEmits & CommandSearchTermEmits;

/**
 * Slot props for the command compact input component.
 */
export interface CommandCompactInputSlotProps {
  /**
   * Clear exposed in the slot scope.
   */
  clear: () => void;
}

/**
 * Slot props for the command compact item component.
 */
export interface CommandCompactItemSlotProps<T extends CommandSingleOptionData = CommandSingleOptionData> {
  /**
   * Current item data.
   */
  item: T;
}

/**
 * Slots for the command compact component.
 */
export type CommandCompactSlots<T extends CommandSingleOptionData = CommandSingleOptionData> = {
  /**
   * Custom content for the input leading slot.
   */
  'input-leading'?: (props: CommandCompactInputSlotProps) => any;
  /**
   * Custom content for the input trailing slot.
   */
  'input-trailing'?: (props: CommandCompactInputSlotProps) => any;
  /**
   * Custom content for the empty slot.
   */
  empty?: () => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: CommandCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: CommandCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item label slot.
   */
  'item-label'?: (props: CommandCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the bottom slot.
   */
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
