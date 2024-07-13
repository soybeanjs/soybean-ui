import type { DeepPartial } from '@unocss/core';

export type HslColorString = `${number} ${number}% ${number}%`;

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

export type FeedbackColorOfThemeCssVars = {
  success: HslColorString;
  'success-foreground': HslColorString;
  warning: HslColorString;
  'warning-foreground': HslColorString;
  info: HslColorString;
  'info-foreground': HslColorString;
};

export type FeedbackColorOfThemeCssVarKey = keyof FeedbackColorOfThemeCssVars;

export interface ThemeCSSVarsVariant {
  name: string;
  light: ThemeCSSVars;
  dark: ThemeCSSVars;
}

export interface FeedbackColorOfThemeCssVarsVariant {
  light: FeedbackColorOfThemeCssVars;
  dark: FeedbackColorOfThemeCssVars;
}

export type ThemeConfigColor =
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

export type ThemeConfig<T extends ThemeConfigColor = ThemeConfigColor> = {
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

export type ColorOptions =
  | ThemeConfigColor
  | ThemeCSSVarsVariant
  | ({ base: ThemeConfigColor } & DeepPartial<ThemeCSSVarsVariant>);

export interface ThemeOptions {
  /**
   * theme color options
   *
   * @default 'zinc'
   */
  color?: ColorOptions | false;
  /** feedback color */
  feedbackColor?: FeedbackColorOfThemeCssVarsVariant;
  /**
   * theme radius
   *
   * @default 0.5
   */
  radius?: number | false;
  /**
   * dark theme selector
   *
   * @default '.dark'
   */
  darkSelector?: string;
}

export type PresetShadcnOptions = ThemeOptions | ThemeOptions[];

export type ThemeColorKey =
  | Extract<ThemeCSSVarKey, 'primary' | 'secondary' | 'destructive'>
  | Extract<FeedbackColorOfThemeCssVarKey, 'success' | 'warning' | 'info'>;
