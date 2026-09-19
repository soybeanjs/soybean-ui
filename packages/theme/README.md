# @vean/theme

> 完整设计规格、token 契约、护栏机制与 AI Agent 接入手册见 [docs/theme.md](../../docs/theme.md)（本文只覆盖包级用法）。

Vean 主题引擎：**静态调色板层 + 语义别名层**，配两项机制 —— 保序的阶梯位移与引擎级对比度护栏。

> 状态：✅ 已实施（第一代引擎已退役，本包是唯一实现；设计以 [docs/theme.md](../../docs/theme.md) 为准）。
> 适配器与运行时（UnoCSS 预设、`SConfigProvider`、首帧脚本、持久化、定制面板）分别在 `@vean/unocss` 与 `@vean/ui`，不在本包内。

## 三层模型

| 层           | 内容                                                    | 产物                                                                          |
| :----------- | :------------------------------------------------------ | :---------------------------------------------------------------------------- |
| **Palette**  | `@soybeanjs/colord` 的 26 色 × 11 级 + `white`/`black`  | `generatePaletteCss()` / `dist/palette.css`（静态、可永久缓存）               |
| **Semantic** | 51 个语义 token + 5 条角色 ramp，值是**调色板级别引用** | `resolveThemeMap()` → `emitThemeCss()`（222 条声明 ≈9 KB raw / gzip ≈1.7 KB） |
| **Literal**  | 尺寸 / 圆角 / 阴影 / 动效 / 层次 / 字体                 | 随语义层一并产出                                                              |

颜色变量一律是**裸通道**（`--zinc-100: 240 4.8% 95.9%`）；语义 token 只做引用（`--vean-background: var(--zinc-100)`），因此：

- 调色板层可以做成静态产物（切主题不重算它）；
- 语义层极小，切主题只是替换引用；
- 需要完整色时用 `resolveTokenColor()`（纯函数，SSR / worker / canvas 均可用），与 CSS 走**同一个映射表**，不会分叉；
- 消费端统一用函数包裹：`hsl(var(--vean-primary) / 0.5)`（裸 `var()` 会静默丢掉透明度）。

## 两项机制

- **阶梯位移**：`lightLevel` / `darkLevel` 移动的是**整条表面阶梯**，所以 `background < surface ≤ elevated` 这一顺序按构造保持（旧实现会出现三面同值）。
- **对比度护栏**：生成期对每个声明的配对测量 WCAG 对比度，用两个杠杆修正 —— ① 在 `{base}.50` / `{base}.950` 之间选 on-solid 文字；② 沿色阶走档（文字 ≤4 步、填充 ≤2 步）。修正写入 `ContrastReport`；用户显式 `overrides` 不会被改写，但会被**报告**为不可读。

## 快速开始

```ts
import { resolveThemeMap, emitThemeCss, generatePaletteCss } from '@vean/theme';

// 1) Layer 1（静态，构建期产出一次）
const paletteCss = generatePaletteCss({ format: 'hsl' });

// 2) Layer 2（随主题配置重算）
const map = resolveThemeMap({ base: 'zinc', primary: 'indigo', lightLevel: 0, surfaceStyle: 'layered' });
const themeCss = emitThemeCss(map, { prefix: 'vean' });

// 3) 需要完整色时（canvas / 图表 / 颜色计算）
import { resolveTokenColor } from '@vean/theme';
const primary = resolveTokenColor({ primary: 'indigo' }, 'primary', 'dark');
```

UnoCSS 侧的颜色映射（通道 + `<alpha-value>`，这是 alpha 能生效的唯一形态）：

```ts
const ref = (name: string, format: 'hsl' | 'oklch') => `${format}(var(${name}) / <alpha-value>)`;

theme.colors = {
  background: ref('--vean-background', 'hsl'),
  'muted-foreground': ref('--vean-muted-foreground', 'hsl'),
  'primary-500': ref('--vean-primary-500', 'hsl'), // 角色 ramp（50–950，随主色板/方案换）
  indigo: { 500: ref('--indigo-500', 'hsl') }
};
```

## 选项

| 选项                           | 默认                | 说明                                                                              |
| :----------------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| `base` / `primary`             | `zinc` / `indigo`   | 26 个内置色板中任选（`primary` 取中性色板时切换为"亮色近黑 / 暗色近白"）          |
| `feedback` / `chart`           | `classic` / `vivid` | 状态色与图表色方案（见 `FEEDBACK_SCHEMES` / `CHART_SCHEMES`）                     |
| `overrides`                    | —                   | `{ light, dark }` 按 token 覆盖（`palette.level` 引用或完整色），最高优先级       |
| `lightLevel` / `darkLevel`     | `0`                 | 阶梯位移档位（亮 0–2、暗 0–3）                                                    |
| `surfaceStyle`                 | `layered`           | `flat` 回到"页面与容器同色、靠边框与阴影分层"的形态                               |
| `contrast`                     | `aa`                | `off` / `aa` / `aaa`（正文 4.5 / 7，UI 边界 3；primary 的 on-solid 配对固定 3:1） |
| `prefix`                       | `vean`              | 语义变量前缀；`false` 用裸名                                                      |
| `solidVars`                    | `none`              | 逃生舱：`chart` / `all` 额外产出完整色变量 `--vean-{token}-solid`                 |
| `size` / `radius`              | `md` / `md`         | 根字号（密度缩放）/ 圆角种子                                                      |
| `borderOpacity`                | `1`                 | 装饰性边框 alpha 的倍数                                                           |
| `format`                       | `hsl`               | 调色板层格式（`oklch` 体积更小）                                                  |
| `styleTarget` / `darkSelector` | `:root` / `class`   | 亮色块选择器 / 暗色表达（`media` → `@media (prefers-color-scheme: dark)`）        |

## 命令

```bash
pnpm --filter @vean/theme test        # 61 个测试：护栏矩阵、层级不变量、发射契约、JS↔CSS 同源、家族划分、预算
pnpm --filter @vean/theme typecheck
pnpm --filter @vean/theme build       # vp pack + dist/palette.css
```

## 尚未包含

自定义色板注册（非内置 26 色）留待后续——目前用 `overrides` 覆盖单个 token。升级指南与文档站内容见 `apps/docs/src/content/{en,zh}/ui/migration/`。
