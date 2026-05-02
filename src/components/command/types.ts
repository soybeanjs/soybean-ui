import type {
  CommandCompactEmits,
  CommandCompactProps,
  CommandCompactSlots,
  CommandSingleOptionData,
  CommandUi
} from '@soybeanjs/headless/command';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the command component.
 */
export interface CommandProps<
  T extends CommandSingleOptionData = CommandSingleOptionData
> extends CommandCompactProps<T> {
  /** Root class. */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CommandUi>;
}

/**
 * Emits for the command component.
 */
export type CommandEmits = CommandCompactEmits;

/**
 * Slots for the command component.
 */
export type CommandSlots<T extends CommandSingleOptionData = CommandSingleOptionData> = CommandCompactSlots<T>;
