import type { DeepPartial } from '@unocss/core';

export type HslColorString = `${number} ${number}% ${number}%`;

export type FeedbackColorCssVars = {
  success: HslColorString;
  'success-foreground': HslColorString;
  warning: HslColorString;
  'warning-foreground': HslColorString;
  info: HslColorString;
  'info-foreground': HslColorString;
};

export type ThemeCSSVars = {
  background: HslColorString;
  foreground: HslColorString;
  card: HslColorString;
  'card-foreground': HslColorString;
  popover: HslColorString;
  'popover-foreground': HslColorString;
  primary: HslColorString;
  'primary-foreground': HslColorString;
  secondary: HslColorString;
  'secondary-foreground': HslColorString;
  muted: HslColorString;
  'muted-foreground': HslColorString;
  accent: HslColorString;
  'accent-foreground': HslColorString;
  destructive: HslColorString;
  'destructive-foreground': HslColorString;
  border: HslColorString;
  input: HslColorString;
  ring: HslColorString;
};

export type ThemeCSSVarKey = keyof ThemeCSSVars;

export interface ThemeCSSVarsVariant {
  name: string;
  light: ThemeCSSVars;
  dark: ThemeCSSVars;
}

export type ThemeColor =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet';

export type ThemeConfig<T extends ThemeColor = ThemeColor> = {
  name: T;
  label: string;
  activeColor: {
    light: string;
    dark: string;
  };
  cssVars: {
    light: ThemeCSSVars;
    dark: ThemeCSSVars;
  };
};

export type ColorOptions = ThemeColor | ThemeCSSVarsVariant | ({ base: ThemeColor } & DeepPartial<ThemeCSSVarsVariant>);

export interface ThemeOptions {
  /** @default 'zinc' */
  color?: ColorOptions | false;
  /** @default 0.5 */
  radius?: number | false;
  /** @default '.dark' */
  darkSelector?: string;
}

export type PresetShadcnOptions = ThemeOptions | ThemeOptions[];
