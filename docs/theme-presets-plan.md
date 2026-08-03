# @soybeanjs/theme-presets 实现方案

> 版本：v1.0（评审稿）
> 范围：新增数据包 `packages/theme-presets`（发布名 `@soybeanjs/theme-presets`）
> 前置：P0 引擎 `@soybeanjs/theme`（[theme-refactor-plan.md](theme-refactor-plan.md) §5）已落地
> 决策记录：[ADR-7（数据包定位）](adr/0007-theme-presets-positioning.md)
> 术语表：[CONTEXT.md](../CONTEXT.md)

---

## 1. 定位

`@soybeanjs/theme-presets` 是一组**外部预设**，供 `createTheme({ preset })` **覆盖内置**：

- 引擎（`@soybeanjs/theme`）保留内置基线（core-template + 派生规则），不迁移、不消费数据包；
- 数据包每个预设是引擎 `CustomThemeColorPreset` 的实例（light/dark 各一份、字段全可选），导入后**零转换直传** `createTheme({ preset })`；
- 数据包与引擎解耦：**运行时零依赖**，仅 devDep `@soybeanjs/theme`（复用类型与官方复刻导出）。

> 本方案推翻原计划 §6 的"引擎改从数据包取数（任务 8）"，见 [ADR-7](adr/0007-theme-presets-positioning.md) 与 §6 差异清单。

## 2. 分类模型（四维度）

预设按**维度**组织，维度仅是分类标识（元数据字段 `dimension`），**不约束键集**。

| 维度       | 语义         | 首批内容                                                                        |
| ---------- | ------------ | ------------------------------------------------------------------------------- |
| `base`     | 中性底色方案 | 官方复刻 ×9（slate/mist/gray/zinc/neutral/stone/taupe/olive/mauve，与内置等值） |
| `feedback` | 反馈色方案   | 官方复刻 ×1（classic）                                                          |
| `chart`    | 图表色方案   | 官方复刻 ×1（固定模板）                                                         |
| `theme`    | 任意字段组合 | 示例 ×1（soybean）                                                              |

- **primary 不设维度**：仅 2 键（primary/ring），独立预设意义不大；其覆盖经 `theme` 维度表达（`{ light: { primary: '…', ring: '…' } }`）。
- **feedback/chart 与内置的关系**：引擎内置仍为固定模板（D7/D9），数据包作为覆盖面额外提供覆盖方案，二者不冲突。
- 所有维度产物形态统一（§3），消费方式统一（`createTheme({ preset })`）。

## 3. 数据形态

- **JSON 单一数据源**（数据包内部）：每个预设一个 JSON 文件，含元数据（`name` / `version` / `dimension`）+ 完整 token 结构（`light` / `dark` 全可选键）；
- **生成 TS 产物**：生成器读 JSON → 产出类型安全的纯 token 常量（`as const satisfies CustomThemeColorPreset`），元数据仅存 JSON 源与文档，不进入产物；
- **JSON Schema 校验**：校验全部 JSON 源（§4）。

```jsonc
// presets/base.zinc.json
{
  "name": "base.zinc",
  "version": "1.0.0",
  "dimension": "base",
  "light": { "background": "white", "foreground": "zinc.950" /* 10 核心键，其余省略 */ },
  "dark": { "background": "zinc.950", "foreground": "zinc.50" /* … */ }
}
```

## 4. 包结构

```
packages/theme-presets/
├── schema/theme-preset.schema.json   # JSON Schema（元数据必填 + 全可选 token 键）
├── presets/
│   ├── base.slate.json …             # 9 个官方复刻（bootstrap 预生成，git 提交为源）
│   ├── base.mist.json
│   ├── …（zinc/neutral/stone/taupe/olive/mauve/gray）
│   ├── feedback.classic.json
│   ├── chart.default.json
│   └── theme.soybean.json            # 示例：任意字段组合
├── generated/                        # 生成器产物（勿手改，CI drift 检查）
│   ├── index.ts                      # 聚合导出
│   └── base/{index,zinc}.ts …        # 子路径文件
├── src/
│   └── types.ts                      # 复用 @soybeanjs/theme 类型（仅 devDep）
├── scripts/
│   ├── bootstrap.ts                  # 一次性：从引擎 core-template 导出官方复刻 JSON 源
│   └── generate.ts                   # JSON → generated/（幂等）
├── test/
│   ├── equivalence.spec.ts           # 基线等值：复刻 preset + createTheme 输出与内置一致
│   ├── schema.spec.ts                # schema 合法/非法样本
│   └── generate.spec.ts              # 生成器幂等
├── package.json
├── tsconfig.json
└── vite.config.ts                    # vp pack，platform: neutral
```

**导出面（package.json exports）**：子路径 + 聚合 index。

```jsonc
{
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./base/zinc": { "types": "./dist/base/zinc.d.ts", "import": "./dist/base/zinc.js" },
    "./feedback/classic": { "types": "./dist/feedback/classic.d.ts", "import": "./dist/feedback/classic.js" },
    "./chart/default": { "types": "./dist/chart/default.d.ts", "import": "./dist/chart/default.js" },
    "./theme/soybean": { "types": "./dist/theme/soybean.d.ts", "import": "./dist/theme/soybean.js" }
    // 其余预设同理
  }
}
```

## 5. schema 设计（要点）

- 必填：`name`（string）、`version`（string）、`dimension`（enum: base | feedback | chart | theme）；
- 可选：`light` / `dark`，键枚举 `ThemeColorKey`（防拼写错误）、值 `string`、`minProperties: 1`；
- **不按维度约束键集**（用户定案：维度仅分类标识）。

## 6. 生成器与工具链

1. **bootstrap**（一次性）：读引擎 core-template 的官方复刻值 → 生成 `presets/*.json`（git 提交为源）；此后用户可手改 JSON 即得自定义预设；
2. **generate**（每次 build 前）：读 `presets/*.json` → 产出 `generated/**`（子路径文件 + 聚合 index），幂等；
3. **validate**：JSON Schema 校验全部 `presets/*.json`；
4. **CI 接入**（扩展现有 `ci.yml`）：`validate` + `generate` 后 `git diff --exit-code generated/`（drift 检查），防产物与 JSON 脱节。

## 7. 测试策略

| 测试         | 断言                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 基线等值     | 每个官方复刻 preset 作为 `preset` 传入 `createTheme({ base, primary })`，CSS 输出与不加 preset 完全一致（theme 维度除外） |
| theme 可消费 | `theme.soybean` 通过 schema、可被 createTheme 消费、输出含示例指定键                                                      |
| schema       | 合法样本通过、非法样本（缺 name、坏 dimension、非枚举键）报错                                                             |
| 生成器幂等   | generate 连续两次产物一致                                                                                                 |

## 8. 与原计划 §6 的差异

| 项         | 原 §6 规划                                       | 本方案                                                  |
| ---------- | ------------------------------------------------ | ------------------------------------------------------- |
| 数据所有权 | 引擎改从数据包取数（任务 8），数据包为唯一真相源 | 数据包为外部覆盖面，引擎保留内置（ADR-7）               |
| kind 枚举  | `base \| primary \| theme`                       | 维度 `base \| feedback \| chart \| theme`（无 primary） |
| 键约束     | schema 只约束核心键                              | 维度仅分类标识，token 键全可选（不按维度约束）          |
| theme 结构 | `compose: { base, primary }` 引用 + overrides    | 扁平 `CustomThemeColorPreset`（任意字段组合）           |
| 引擎接线   | 任务 8 引擎数据源切换                            | 引擎零改动（仅文档示例）                                |
| 运行时     | loader + valibot 校验                            | 无运行时 loader（编译期类型安全）                       |

## 9. 任务分解

1. 脚手架 `packages/theme-presets`（package.json / tsconfig / vite.config / exports 映射）；
2. `schema/theme-preset.schema.json` + `src/types.ts`；
3. `scripts/bootstrap.ts` 生成官方复刻 JSON 源（9 base + 1 feedback + 1 chart + 手写 1 theme 示例）；
4. `scripts/generate.ts` + `generated/` 产物；
5. 测试（等值 / schema / 幂等）+ CI 接入（validate + drift）；
6. 文档（README 使用示例：`createTheme({ preset: baseZinc })`）。

## 10. 开放问题

- `theme.soybean` 示例的具体字段组合（实现时定，建议选任意子集展示覆盖能力）；
- 生成器产物文件粒度（每预设一文件 vs 每维度一文件聚合）——倾向每预设一文件，配合 exports 子路径。
