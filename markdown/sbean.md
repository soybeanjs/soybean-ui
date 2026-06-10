# SBean CLI — shadcn 能力复刻方案（v5）

## 概述

在 `packages/sbean` 创建命令行工具，复刻 shadcn 的全套能力。

**核心目标：**

- CLI 命令：`init`（含 `create` 别名）/ `add` / `build` / `diff` / `search` / `view` / `info`
- Copy-paste 组件分发模式
- Registry 系统 + Preset 预设系统

## 技术栈映射

| shadcn                     | SBean                                       |
| -------------------------- | ------------------------------------------- |
| `shadcn` CLI               | `sbean` CLI                                 |
| `components.json`          | `sbean.json`                                |
| `radix-ui` / `base-ui`     | `@soybeanjs/headless`                       |
| `tailwindcss`              | UnoCSS（`@soybeanjs/unocss-shadcn` preset） |
| `class-variance-authority` | `@soybeanjs/cva`                            |
| `tailwind-merge` + `clsx`  | UnoCSS 原生处理（无需 merge）               |
| `zod`                      | **valibot**（更轻量，tree-shakable）        |
| `tsup`                     | **vite-plus pack**（复用项目现有构建链）    |
| React / Next.js            | Vue 3 / Nuxt                                |

## 目录结构

```
packages/sbean/
├── src/
│   ├── index.ts                    # CLI 入口 (#!/usr/bin/env node + commander)
│   ├── commands/
│   │   ├── init.ts                 # init（含 create 别名）
│   │   ├── add.ts                  # 添加组件到用户项目
│   │   ├── build.ts                # 构建 registry JSON
│   │   ├── diff.ts                 # 组件差异对比
│   │   ├── search.ts               # 搜索组件
│   │   ├── view.ts                 # 查看组件源码
│   │   └── info.ts                 # 项目信息
│   ├── registry/
│   │   ├── schema.ts               # valibot schema
│   │   ├── loader.ts               # 本地 registry 加载 + include 解析
│   │   ├── resolver.ts             # 组件依赖树解析
│   │   ├── api.ts                  # 远程 registry 获取
│   │   └── constants.ts            # 内置 registry 地址
│   ├── utils/
│   │   ├── add-components.ts       # copy-paste 核心引擎
│   │   ├── get-config.ts           # sbean.json 配置读取（cosmiconfig）
│   │   ├── get-project-info.ts     # 项目信息检测
│   │   ├── transformers/
│   │   │   ├── transform-import.ts # 导入路径重写
│   │   │   ├── transform-icons.ts  # 图标前缀替换（按 iconLibrary）
│   │   │   └── index.ts
│   │   └── updaters/
│   │       ├── update-files.ts     # 组件文件复制
│   │       ├── update-dependencies.ts # 依赖安装
│   │       └── update-uno-config.ts   # UnoCSS 配置注入
│   ├── preset/
│   │   ├── preset.ts               # encode/decode preset（base62）
│   │   ├── presets.ts              # 预设交互 + URL 生成
│   │   └── defaults.ts             # 默认预设值
│   └── template/
│       └── vue-vite.ts             # Vue + Vite 项目模板
├── package.json
├── tsconfig.json
├── vite.config.ts                  # vite-plus pack 配置
└── README.md
```

## CLI 命令清单

| 命令                          | 说明                            |
| ----------------------------- | ------------------------------- |
| `sbean init`                  | 初始化项目（检测新/旧项目）     |
| `sbean create`                | `init` 的别名，用于新项目脚手架 |
| `sbean add <components>`      | 从 registry 添加组件            |
| `sbean build [registry.json]` | 从 UI 层源码构建 registry       |
| `sbean diff <component>`      | 对比本地与 registry 差异        |
| `sbean search <query>`        | 搜索组件                        |
| `sbean view <component>`      | 查看组件源码                    |
| `sbean info`                  | 显示项目配置和 registry 信息    |

## 配置文件 sbean.json

```json
{
  "$schema": "https://ui.soybeanjs.cn/schema.json",
  "style": "soybean",
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "chart": "blue",
    "radius": "md",
    "cssVariables": true
  },
  "font": {
    "sans": "inter",
    "heading": "inherit"
  },
  "menu": {
    "accent": "subtle",
    "color": "default"
  },
  "rtl": false,
  "pointer": true,
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@soybean": "https://ui.soybeanjs.cn/r/{name}.json"
  }
}
```

## valibot Schema 定义

```ts
import * as v from 'valibot'

const RADIUS_VALUES = ['none','2xs','xs','sm','md','lg','xl','2xl'] as const

const ICON_LIBRARIES = [
  'lucide','material-symbols','ph','tabler','solar','radix-icons'
] as const

export const sbeanConfigSchema = v.object({
  $schema: v.optional(v.string()),
  style: v.picklist(['soybean','clean','dense']),
  iconLibrary: v.picklist(ICON_LIBRARIES),
  uno: v.object({
    base: v.picklist(['zinc','neutral','stone','slate','gray']),
    primary: v.picklist(['indigo','blue','green','red','amber','violet',...]),
    chart: v.optional(v.picklist([...])),
    radius: v.picklist(RADIUS_VALUES),
    cssVariables: v.boolean(),
  }),
  font: v.object({
    sans: v.optional(v.string()),
    heading: v.optional(v.string()),
  }),
  menu: v.object({
    accent: v.picklist(['subtle','bold']),
    color: v.picklist(['default','inverted','default-translucent','inverted-translucent']),
  }),
  rtl: v.optional(v.boolean()),
  pointer: v.optional(v.boolean()),
  aliases: v.object({
    components: v.string(),
    ui: v.optional(v.string()),
    utils: v.string(),
    lib: v.optional(v.string()),
  }),
  registries: v.optional(v.record(v.string(), registryConfigItemSchema)),
})
```

## UnoCSS 集成

shadcn 通过 CSS 文件注入变量：`@layer base { :root { --background: ... } }`

SBean 通过 UnoCSS preset 的 `getCSS()` 钩子在运行时注入：

```ts
// uno.config.ts
presetShadcn({
  base: 'zinc',
  primary: 'indigo',
  radius: '0.625rem',
  darkSelector: 'class',
  generated: true // ← 关键！在构建时生成完整 CSS 变量
});
```

`generated: true` 使 `@soybeanjs/unocss-shadcn` 通过 `@soybeanjs/shadcn-theme` 的 `createShadcnTheme()` 输出：

1. CSS reset（preflight）
2. 全部颜色 CSS 变量（40+ 个：--background, --foreground, --primary, ...）
3. 圆角变量（--radius）

**对比差异：**

- tailwind：`sbean add` 可能需要往 CSS 文件追加新变量
- UnoCSS：`sbean add` 不需要更新 CSS，preset 已包含全量变量

## iconLibrary 与 SIcon 联动

`SIcon` 组件封装 `@iconify/vue`，通过 Iconify 字符串引用图标：

```vue
<!-- 组件中使用 -->
<SIcon icon="lucide:chevron-left" />
```

不同 `iconLibrary` 预设映射不同的 Iconify 前缀：

| iconLibrary        | Iconify 前缀        | 示例                            |
| ------------------ | ------------------- | ------------------------------- |
| `lucide`           | `lucide:`           | `lucide:chevron-left`           |
| `material-symbols` | `material-symbols:` | `material-symbols:chevron-left` |
| `ph`               | `ph:`               | `ph:caret-left`                 |
| `solar`            | `solar:`            | `solar:alt-arrow-left-linear`   |
| `tabler`           | `tabler:`           | `tabler:chevron-left`           |
| `radix-icons`      | `radix-icons:`      | `radix-icons:chevron-left`      |

`sbean init` 时根据 `iconLibrary` 预设生成 `transformIcons` 转换器，在 `sbean add` 复制组件文件时自动替换组件源码中的图标前缀。

## Registry 构建系统（从 UI 层生成）

核心思路：不单独维护 registry 组件代码，通过 `sbean build` 从 `packages/ui/src` 自动生成。

```
sbean build 流程:

packages/ui/src/components/button/
  ├── button.vue          ──读取──→  AST 解析 imports
  ├── types.ts
  └── index.ts

packages/ui/src/styles/button.ts   →  根据 style 注入对应 variant

          ↓ transformer 管道 ↓

  transformImport:   @/styles/button → ~/styles/button
  transformIcons:    lucide:xxx → {iconLibrary}:xxx
  transformStyle:    根据 style preset 选择 variant 集合

          ↓ 输出 ↓

packages/sbean/registry/soybean/ui/
  └── button.vue          ← 可直接 copy-paste 到用户项目的独立组件
```

### transformer-import 核心逻辑

```ts
// 替换组件中的关键导入路径
export const transformImport: Transformer = async ({ sourceFile, config }) => {
  for (const specifier of sourceFile.getImportStringLiterals()) {
    let val = specifier.getLiteralValue();

    // @soybeanjs/headless/button → 保持（npm 依赖）
    // @/styles/button → ~/styles/button（相对化）
    // @/theme → ~/theme

    if (val.startsWith('@/')) {
      val = val.replace(/^@\//, '~/');
    }

    specifier.setLiteralValue(val);
  }
  return sourceFile;
};
```

### style 系统

不同 style 对应不同的 variant 默认值和 CSS 类名组合：

```json
// presets/soybean.json（默认）
{
  "name": "soybean",
  "title": "Soybean",
  "base": "zinc",
  "primary": "indigo",
  "radius": "md",
  "iconLibrary": "lucide",
  "font": "inter",
  "fontHeading": "inherit",
  "menuAccent": "subtle",
  "menuColor": "default",
  "stylesMapping": {
    "button": "@/styles/button",
    "dialog": "@/styles/dialog"
  }
}
```

- **soybean**：完整的 variant 矩阵（solid/outline/soft/ghost + 8 色）
- **clean**：精简 variant（solid/outline/ghost），扁平圆角
- **dense**：同 soybean，但默认 size 更小

## Preset 编码系统

使用 bit-packing + base62 将所有设计参数编码为短码：

```ts
// 半径 8 级语义 → rem 值映射
const RADIUS_MAP: Record<string, string> = {
  none: '0',
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',   // 默认
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem',
}

// preset.ts
const PRESET_FIELDS = [
  { key: 'menuColor',     values: ['default','inverted','default-translucent','inverted-translucent'] },
  { key: 'menuAccent',    values: ['subtle','bold'] },
  { key: 'radius',        values: ['md','none','2xs','xs','sm','lg','xl','2xl'] },
  // radius 语义 → rem 映射: none→0, 2xs→0.25, xs→0.375, sm→0.5, md→0.625, lg→0.75, xl→0.875, 2xl→1
  { key: 'fontSans',      values: ['inter','noto-sans','roboto',...] },
  { key: 'iconLibrary',   values: ['lucide','material-symbols','ph','tabler','solar','radix-icons'] },
  { key: 'primary',       values: ['indigo','blue','green','red',...] },
  { key: 'base',          values: ['zinc','neutral','stone','slate','gray'] },
  { key: 'style',         values: ['soybean','clean','dense'] },
]

export function encodePreset(config: Partial<SbeanConfig>): string { /* ... */ }
export function decodePreset(code: string): SbeanConfig | null { /* ... */ }
export function isPresetCode(value: string): boolean { /* ... */ }
```

### Preset 字段完整映射

| shadcn preset 字段 | SBean 字段     | 可选值                                                                                                                              |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `style`            | `style`        | `soybean` / `clean` / `dense`                                                                                                       |
| `baseColor`        | `uno.base`     | `zinc` / `neutral` / `stone` / `slate` / `gray`                                                                                     |
| `theme`            | `uno.primary`  | `indigo` / `blue` / `green` / `red` / `amber` ... (25色)                                                                            |
| `chartColor`       | `uno.chart`    | 同 primary                                                                                                                          |
| `radius`           | `uno.radius`   | 8级语义：`none`(0) / `2xs`(0.25rem) / `xs`(0.375rem) / `sm`(0.5rem) / `md`(0.625rem) / `lg`(0.75rem) / `xl`(0.875rem) / `2xl`(1rem) |
| `font`             | `font.sans`    | `inter` / `noto-sans` / `roboto` / ... (26字体)                                                                                     |
| `fontHeading`      | `font.heading` | `inherit` 或同上                                                                                                                    |
| `iconLibrary`      | `iconLibrary`  | `lucide` / `material-symbols` / `ph` / `tabler` / `solar` / `radix-icons`                                                           |
| `menuAccent`       | `menu.accent`  | `subtle` / `bold`                                                                                                                   |
| `menuColor`        | `menu.color`   | `default` / `inverted` / `default-translucent` / `inverted-translucent`                                                             |
| `rtl`              | `rtl`          | `true` / `false`                                                                                                                    |
| `pointer`          | `pointer`      | `true` / `false`                                                                                                                    |

### CLI Preset 流程

```
sbean create                 (无参数)
  → 交互式 prompt（可选）或打开浏览器到 sbean.soybeanjs.cn/create
  → 选择：style / base / primary / iconLibrary / font / radius / menu
  → 生成 preset 码

sbean init -p <preset-code>  (有 preset 码)
  → decodePreset(code)
  → 生成 sbean.json
  → 修改 uno.config.ts 注入 presetShadcn 配置
  → 安装依赖

sbean init --style clean --base zinc --primary indigo (明确参数)
  → 直接生成配置
```

## 打包（vite-plus pack）

```ts
// packages/sbean/vite.config.ts
import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    platform: 'node',
    target: 'esnext',
    unbundle: true,
    clean: true,
    dts: true,
    deps: {
      neverBundle: ['commander','cosmiconfig','valibot','fs-extra',...],
    },
    define: {
      'import.meta.env.DEV': 'undefined',
    },
    addBinHashbang: true,
  },
})
```

## `init` 的 uno.config.ts 生成

```ts
// sbean init 生成/修改的 uno.config.ts 模板

// radius 语义 → rem 值映射表
const RADIUS_MAP: Record<string, string> = {
  none: '0',
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem'
};

function generateUnoConfigTemplate(config: SbeanConfig): string {
  return `
import { defineConfig, presetWind3 } from 'unocss'
import { presetShadcn } from '@soybeanjs/unocss-shadcn'
import { presetAnimations } from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetWind3({ dark: 'class' }),
    presetAnimations(),
    presetShadcn({
      base: '${config.uno.base}',
      primary: '${config.uno.primary}',
      radius: RADIUS_MAP[config.uno.radius],
      darkSelector: 'class',
      generated: true,
    }),
  ],
})
`.trim();
}
```

## shadcn 命令对应关系

| shadcn 命令       | SBean 命令                      | 优先级  |
| ----------------- | ------------------------------- | ------- |
| `init` / `create` | `init`（含 `.alias("create")`） | Phase 1 |
| `add`             | `add`                           | Phase 1 |
| `build`           | `build`                         | Phase 1 |
| `diff`            | `diff`                          | Phase 2 |
| `search`          | `search`                        | Phase 2 |
| `view`            | `view`                          | Phase 2 |
| `info`            | `info`                          | Phase 2 |
| `migrate`         | 暂不需要                        | Phase 3 |
| `eject`           | 暂不需要                        | Phase 3 |
| `apply`           | 暂不需要                        | Phase 3 |
| `docs`            | 暂不需要                        | Phase 3 |
| `mcp`             | 暂不需要                        | Phase 3 |
| `preset`          | 暂不需要                        | Phase 3 |
| `registry`        | 暂不需要                        | Phase 3 |

## 分阶段实施

### Phase 1：基础骨架（本次实施）

1. 创建 `packages/sbean` 目录结构
2. `package.json` — 包元数据 + 依赖（commander, cosmiconfig, valibot, fs-extra, prompts, kleur）
3. `vite.config.ts` — vite-plus pack 配置
4. `tsconfig.json`
5. `src/index.ts` — CLI 入口
6. `src/registry/schema.ts` — valibot schema
7. `src/registry/loader.ts` — 本地 registry 加载
8. `src/registry/constants.ts` — 内置 registry URL
9. `src/utils/get-config.ts` — cosmiconfig 读取 sbean.json
10. `src/commands/init.ts` — init 命令（含 create 别名）
11. `src/commands/build.ts` — build 命令（从 UI 层生成 registry）
12. `src/commands/add.ts` — add 命令骨架
13. `src/preset/preset.ts` — encode/decode preset
14. `src/preset/defaults.ts` — 默认预设
15. 安装依赖 + 验证 `pnpm typecheck`

### Phase 2：高级命令

1. `src/commands/diff.ts`
2. `src/commands/search.ts`
3. `src/commands/view.ts`
4. `src/commands/info.ts`
5. `src/utils/transformers/` — 完整的 transformer 管道
6. `src/utils/updaters/` — 文件写入器

### Phase 3：完善

1. 多框架模板（nuxt）
2. 测试覆盖
3. 文档
4. Web UI 预设构建器（sbean.soybeanjs.cn/create）

## 当前待办清单（2026-06-10）

下面的清单用于记录当前版本相对 shadcn 仍需补齐的必要能力；已完成的组件分发、registry 依赖展开、docs / mcp / preset / registry 基础命令不再重复列入。

### 必要实现能力

- [ ] `add` 支持 `--all`，可一次性安装全部非废弃组件
- [ ] `add` 支持 `--dry-run`，在不落盘的前提下预览文件与依赖变更
- [ ] `add` 将 `--diff` / `--view` 合并为工作流内能力，而不是依赖独立命令手动串联
- [ ] `add` 在无参数时提供交互式组件选择，而不是直接退出
- [ ] `add` 支持 URL / 本地路径 / registry item address 输入，而不只是不带上下文的组件名
- [ ] `add` 在缺失 `sbean.json` 时自动引导初始化并继续安装，而不是要求用户手动二次执行
- [ ] `add` 在空目录或无项目骨架时自动创建项目并继续安装组件
- [ ] `init` / `create` 支持把组件参数直接带入初始化流程，形成一次性 scaffold + init + add
- [ ] `init` / `create` 增加 template 选择与解析，而不只生成最小 Vue + Vite 模板
- [ ] `init` / `create` 增加 monorepo 初始化路径与 workspace 目标选择
- [ ] `init` / `create` 支持 preset URL / remote init URL，而不只支持本地 preset 名称或 preset code
- [ ] `info` 输出已安装组件、preset 解析结果、项目链接与更完整的项目检测结果
- [ ] `registry add` 支持公共 registry 索引发现与交互选择，而不只接受 `@namespace=url`
- [ ] `mcp init` 合并已有配置并处理依赖安装，而不是仅写入静态配置文件
- [ ] 增加 `migrate` 命令，用于批量迁移 icon library / RTL / 结构变更
- [ ] 增加 `eject` 命令，提供对等的一次性样式或依赖脱钩能力

### 专项：对标 `shadcn create`

目标：补齐一个真正的一站式 `sbean create` 体验，而不是当前 `init` 的别名。

- [ ] `sbean create [components...]` 支持把项目创建、配置初始化、组件安装合并为一次命令
- [ ] `create` 支持在新项目场景下选择 template，例如 `vue-vite`、`nuxt`、后续可扩展模板
- [ ] `create` 支持项目名、目标目录、是否 monorepo 的交互式或命令行配置
- [ ] `create` 能在新项目初始化时联动 preset 选择，包括 style / base / primary / iconLibrary / rtl / pointer
- [ ] `create` 支持 remote preset / preset code / 本地 preset 三种入口统一落到同一初始化管道
- [ ] `create` 在完成 scaffold 后自动写入 `sbean.json`、`uno.config.ts`、`tsconfig.json`、`vite-env.d.ts`
- [ ] `create` 可选自动安装 starter 组件，而不是要求用户初始化后再单独执行 `add`
- [ ] `create` 对现有非空目录、已存在 `package.json`、已存在 `sbean.json` 的场景有明确 preflight 与回退策略
- [ ] `create` 输出最终项目摘要，包括模板、preset、已安装组件、registry 与后续启动命令
- [ ] `create` 后续对齐 Web 端预设构建器，允许命令行与 `sbean.soybeanjs.cn/create` 使用同一份 preset 协议
