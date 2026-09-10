/**
 * shadcn 风格的图表主题配置，仅供文档图表示例使用。
 *
 * 文档中的图表直接基于 TanStack Charts 渲染（没有 @soybeanjs/chart 之类的
 * 封装包）。shadcn 的 "chart config" 模式把每个系列 key 映射到一个文案标签与
 * 主题色，`ChartContainer` 再将其转换为 `--color-<key>` CSS 自定义属性，
 * 图元通过 `var(--color-<key>)` 引用颜色，从而自动跟随明/暗主题
 * （颜色来自主题 token `--chart-1..5`）。
 */

/**
 * 主题图表面板色，值包裹为合法 CSS 颜色。
 *
 * 主题引擎把 `--chart-N` 存为原始 HSL 通道三元组（如 `20.5 90.2% 48.2%`），
 * 因此这里用 `hsl()` 包裹；引用时用本数组而不是直接写 `var(--chart-N)`。
 */
export const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
] as const;

/** 声明式系列配置：key 为系列/数据字段名，值为文案标签与颜色。 */
export type ChartConfig = Record<string, { label?: string; color?: string }>;
