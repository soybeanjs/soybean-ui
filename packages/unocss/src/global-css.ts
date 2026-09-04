import { COLOR_VARIABLES, EXTENDED_THEME_VARIABLES, SIZE_VARIABLE } from '@soybeanjs/theme';
import type { ColorFormat } from '@soybeanjs/theme';
import { alphaColorRef, colorRef } from './colors';

/** 全局基础样式：border 默认色、根字号、body 前景/背景、按钮背景重置 */
export function buildGlobalCss(format: ColorFormat): string {
  const border = alphaColorRef(COLOR_VARIABLES.border, `var(${EXTENDED_THEME_VARIABLES.borderAlpha}, 1)`, format);

  return [
    `*,::before,::after{border-color:${border}}`,
    `html{font-size:var(${SIZE_VARIABLE})}`,
    `body{color:${colorRef(COLOR_VARIABLES.foreground, format)};background-color:${colorRef(COLOR_VARIABLES.background, format)}}`,
    `button{background-color:transparent}`
  ].join('\n');
}
