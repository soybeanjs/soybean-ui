import type {
  CommandCompactEmits,
  CommandCompactProps,
  CommandCompactSlots,
  CommandEmptyProps,
  CommandGroupLabelProps,
  CommandGroupOptionData,
  CommandGroupProps,
  CommandInputProps,
  CommandItemEmits,
  CommandItemLabelProps,
  CommandItemProps,
  CommandListProps,
  CommandOptionData,
  CommandRootEmits,
  CommandRootProps,
  CommandSearchOptionData,
  CommandSeparatorProps,
  CommandShortcutProps,
  CommandSingleOptionData,
  CommandUi as HeadlessCommandUi
} from '@soybeanjs/headless/command';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
export type CommandUi = HeadlessCommandUi;

export interface CommandProps<T extends CommandSingleOptionData = CommandSingleOptionData> extends CommandCompactProps<T> {
  /** Root class. */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<CommandUi>;
}

export type CommandEmits = CommandCompactEmits;

export type CommandSlots<T extends CommandSingleOptionData = CommandSingleOptionData> = CommandCompactSlots<T>;

export type {
  CommandRootProps,
  CommandRootEmits,
  CommandListProps,
  CommandInputProps,
  CommandGroupLabelProps,
  CommandGroupProps,
  CommandItemProps,
  CommandItemEmits,
  CommandItemLabelProps,
  CommandShortcutProps,
  CommandSeparatorProps,
  CommandEmptyProps,
  HeadlessCommandUi
};

export type {
  CommandSingleOptionData,
  CommandGroupOptionData,
  CommandOptionData,
  CommandSearchOptionData
} from '@soybeanjs/headless/command';
