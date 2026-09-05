/**
 * `@soybeanjs/ui-uno` — UnoCSS preset for SoybeanUI.
 *
 * Token 单一权威是 `@soybeanjs/theme`；本包只做适配：
 * - `preset.ts` 组装推荐 preset 栈（wind3 + animations + scrollbar + fonts + theme preflight）
 * - `animations.ts` 本地动画 preset（替代 `unocss-preset-animations`）
 * - `scrollbar.ts` 本地滚动条样式 preset（替代 `unocss-preset-scrollbar`）
 * - `colors.ts` 从 `COLOR_VARIABLES` 派生 theme.colors
 * - `global-css.ts` 生成全局基础样式
 * - `sbean-preset.ts` 读取 `sbean.json` 的桥接 preset
 *
 * 按功能拆分文件，这里统一汇总导出。
 */
export { presetUiUnocss, resolveWind3Dark } from './preset';
export { presetAnimations } from './animations';
export type { PresetAnimationsOptions } from './animations';
export { presetScrollbar } from './scrollbar';
export type { PresetScrollbarOptions } from './scrollbar';
export { buildThemeColors } from './colors';
export { buildGlobalCss } from './global-css';
export { presetSbean } from './sbean-preset';
export type { SbeanPresetOptions } from './sbean-preset';
export type { UiUnocssOptions } from './options';
