import type { ThemeSize } from '@/theme';

/**
 * Properties for the ThemeModeSelect component.
 *
 * A context-bound dropdown bound to the active `SConfigProvider` theme. It
 * offers the three `ThemeModePreference` options — `auto` (follows the OS
 * `prefers-color-scheme`), `light`, and `dark`.
 */
export interface ThemeModeSelectProps {
  /**
   * Visual size of the select trigger.
   *
   * @default 'md'
   */
  size?: ThemeSize;
  /**
   * Whether to render a scheme icon (monitor / sun / moon) in the trigger and
   * each option.
   *
   * @default true
   */
  showIcon?: boolean;
}
