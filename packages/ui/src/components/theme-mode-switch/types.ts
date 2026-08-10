import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the ThemeModeSwitch component.
 *
 * A context-bound toggle bound to the active `SConfigProvider` theme. It shows
 * the current *effective* scheme (so an `auto` preference is reflected as the
 * OS-resolved light/dark) and pins an explicit `light` / `dark` preference when
 * toggled. To restore `auto`, use `SThemeModeSelect`.
 */
export interface ThemeModeSwitchProps {
  /**
   * Visual size of the switch.
   *
   * @default 'md'
   */
  size?: ThemeSize;
  /**
   * Theme color of the switch track.
   *
   * @default 'accent'
   */
  color?: ThemeColor;
  /**
   * Whether to render a sun/moon icon inside the switch thumb.
   *
   * @default true
   */
  showIcon?: boolean;
  /**
   * Accessible label for the switch control.
   *
   * @default 'Toggle color scheme'
   */
  'aria-label'?: string;
}
