import { COLOR_VARIABLES, EXTENDED_THEME_VARIABLES, SIZE_VARIABLE } from '@vean/theme';
import type { ColorFormat } from '@vean/theme';
import { alphaColorRef, colorRef } from './colors';

/** 全局基础样式：border 默认色、根字号、body 前景/背景、按钮背景重置、iOS 输入框字号下限 */
export function buildGlobalCss(format: ColorFormat): string {
  const border = alphaColorRef(COLOR_VARIABLES.border, `var(${EXTENDED_THEME_VARIABLES.borderAlpha}, 1)`, format);

  return [
    `*,::before,::after{border-color:${border}}`,
    `html{font-size:var(${SIZE_VARIABLE})}`,
    `body{color:${colorRef(COLOR_VARIABLES.foreground, format)};background-color:${colorRef(COLOR_VARIABLES.background, format)}}`,
    `button{background-color:transparent}`,
    // iOS Safari zooms the page when a text field smaller than 16px takes focus,
    // and never zooms back out once the keyboard closes. Coarse pointers get a
    // 16px floor instead; `1em` resolves against the parent, so fields that
    // already render larger (the `lg`/`xl` sizes) keep their size.
    //
    // Every selector carries a `:not(…)` list on purpose: it is what outranks
    // the preflight's `font-size: inherit`, which is emitted after this file and
    // otherwise wins the tie on source order. A bare `textarea`/`select` would
    // silently keep losing that tie. `[disabled]` is excluded because a disabled
    // control cannot be focused, so it can never trigger the zoom; the type list
    // skips controls that have no text caret.
    `@media(hover:none) and (pointer:coarse){input:not([type=button],[type=submit],[type=reset],[type=checkbox],[type=radio],[type=range],[type=file],[type=color],[disabled]),textarea:not([disabled]),select:not([disabled]){font-size:max(16px,1em)}}`
  ].join('\n');
}
