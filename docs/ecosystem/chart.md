# @soybeanjs/chart — 图表组件技术方案

> **⚠️ 已取消（v0.40.0）：本提案未继续，`packages/chart` 已删除。** 图表不进入 SoybeanUI 核心/外围包体系，改为在文档站直接基于 [TanStack Charts](https://tanstack.com/charts) 提供 shadcn 风格示例（`apps/docs/src/examples/chart/` + 文档内 `components/chart/` 主题壳）。以下内容仅为历史技术方案，保留备查。

> 定位：图表组件包（对标 [shadcn charts](https://ui.shadcn.com/charts)），为 SoybeanUI 生态提供与主题 token 深度集成的声明式图表。核心库路线图曾把 `Chart` / `Heatmap` / `Sparkline` 划为「独立包范围」（见 [roadmap.md 范围外](../roadmap.md#范围外组件out-of-scope)）。
>
> 状态：包已作为 workspace 包落地（`packages/chart`）并随核心版本发布。已实现 `chart-container` / `chart-tooltip-content` / `chart-legend-content` / `chart-style` 四个基础组件及 `chartColors` / `chartThemes` 工具；其余图表族（EC-C10/C11/C12）仍在扩展。

## 1. 现状盘点（基于 `origin/ecosystem` 分支）

- 包骨架与 ui-x / admin 一致：`src/{components,styles,constants,resolver,nuxt}` + `test/`；入口已导出四个基础组件（chart-container / chart-tooltip-content / chart-legend-content / chart-style）与 `chartColors` / `chartThemes`。
- 依赖：`@soybeanjs/{headless,theme,ui}` workspace + `@soybeanjs/cva` + `@iconify/vue`；peer 全部 optional（vue / nuxt / vue-router / unplugin-vue-components）。
- exports：`.`、`./nuxt`、`./resolver`、`./styles.css`（**无** `./composables` / `./types` 子路径——chart 领域逻辑随包自治，无历史拆包负担）。
- `admin` 已声明对 chart 的 optional peerDep（白名单唯一跨外围包边），供 `SAppProTable` / 仪表盘场景嵌入。
- 任务基线：EC-C10（`SChartBar`）、EC-C11（`SChartLine`）为 P0，EC-C12（其余图表）为 P2，时间窗 2026-08-14 ~ 08-31。

## 2. 架构设计

### 2.1 分层

```
@soybeanjs/admin ──(optional peerDep)──► @soybeanjs/chart ──► @soybeanjs/{ui, headless, theme}
```

chart 作为「单包自治」外围包：图表的领域逻辑（数据归一、坐标映射、tooltip 状态机）与样式同居包内，**不建 headless-chart 中间层**（ADR-0001：核心 headless 是唯一逻辑层，且图表逻辑具有强领域性，不满足「原子原语」上浮判据）。

### 2.2 包结构（目标形态）

```
packages/chart/
├── src/
│   ├── components/
│   │   ├── chart/            # SChart 容器（坐标系统/图例/tooltip 宿主）
│   │   ├── chart-bar/ · chart-line/ · chart-area/ · chart-pie/ · chart-donut/
│   │   ├── chart-sparkline/ · chart-heatmap/
│   │   └── chart-tooltip/ · chart-legend/ · chart-axis/   # 子件（复用 STooltip/SBreadcrumb 级原子）
│   ├── styles/               # scv() recipe，主题色序列由 @soybeanjs/theme token 派生
│   ├── constants/components.ts   # SChart* 名称注册表
│   ├── resolver/ · nuxt/
│   └── types.ts              # ChartDatum / ChartSeries / ChartAxisConfig 等数据模型
└── test/                     # 单测 + browser e2e（含 axe 颜色对比）
```

### 2.3 数据模型（草案）

```ts
interface ChartSeries {
  key: string;
  label: string;
  color?: ThemeColor;
  data: ChartDatum[];
}
interface ChartDatum {
  x: string | number;
  y: number;
  group?: string;
}
// 声明式 props：series + xField/yField + 坐标/图例/tooltip 配置；受控选中态
```

设计原则与 shadcn charts 一致：**组合式图表语法**（容器 + 图元子件）而非配置大对象，便于 UnoCSS 样式与 a11y 属性逐层注入。

## 3. 核心功能

| 优先级 | 组件                                                           | 说明                                                                  |
| :----: | :------------------------------------------------------------- | :-------------------------------------------------------------------- |
|   P0   | `SChart`                                                       | 容器：坐标系统、响应式 resize、主题 token 注入、tooltip 宿主          |
|   P0   | `SChartBar` / `SChartLine`                                     | 最常用两图元；堆叠 / 分组模式                                         |
|   P1   | `SChartArea` / `SChartPie` / `SChartDonut` / `SChartSparkline` | 常见图元；sparkline 供 Statistic / ProTable 内嵌                      |
|   P1   | `SChartTooltip` / `SChartLegend` / `SChartAxis`                | 子件，tooltip 复用 `STooltip` 定位                                    |
|   P2   | `SChartHeatmap`                                                | 日历热力图                                                            |
|   P2   | 无障碍层                                                       | 图表数据表格降级（`role="img"` + `aria-label` + screen-reader table） |

## 4. 实现路径

| 阶段 | 内容                                                         | 时间窗             |
| :--: | :----------------------------------------------------------- | :----------------- |
|  0   | **渲染引擎选型决策**（见 §5，输出决策 ADR）                  | 2026-08-14 ~ 08-18 |
|  1   | `SChart` 容器 + `SChartBar` + `SChartLine`（P0，EC-C10/C11） | 08-14 ~ 08-28      |
|  2   | 其余图元与子件（EC-C12）                                     | 08-18 ~ 08-31      |
|  3   | admin 集成验证（`SAppProTable` sparkline、仪表盘嵌入）       | 09 月              |
|  4   | e2e（axe 颜色对比）+ 文档 + registry items（`chart/*`）      | 随阶段 2–3         |

## 5. 技术选型（核心待决策项）

候选渲染引擎对比：

| 候选                          | 优势                                                                | 劣势                                                                                    | 建议                                         |
| :---------------------------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------- |
| **unovis**（shadcn-vue 同款） | 声明式、框架无关、SVG、tree-shakable、与 shadcn charts 范式直接对齐 | 生态较新、复杂图型少于 ECharts                                                          | **首选**：与「对标 shadcn charts」定位最契合 |
| ECharts                       | 图型最全、成熟度最高、大数据量优化                                  | 体积大（按需引入仍重）、canvas 为主（SSR / a11y 弱）、命令式 API 与声明式组件模型有阻抗 | 备选：作为企业级增强（可选 peer 按需引入）   |
| Chart.js                      | 轻、生态成熟                                                        | 命令式、Vue 绑定需自维护、图型中等                                                      | 不推荐                                       |
| 纯自研 SVG                    | 零依赖、完全可控                                                    | 成本高，图型覆盖慢                                                                      | 仅 sparkline 等极简图元可自研                |

**建议决策**：核心图元基于 **unovis**（peer dependency，不硬捆），`SChartSparkline` 等极简图元自研 SVG；若企业用户需要 ECharts 独有图型，未来以可选 peer 扩展。最终以 ADR 记录（阶段 0 输出）。

其余选型：样式走 `scv()` + `@soybeanjs/theme`（图表色板由 `ThemeColor` 8 色 token 派生，自动亮暗适配）；构建 `vp pack` + unocss CLI 产 `styles.css`；测试 vitest + Playwright + axe-core——全部对齐 `packages/ui` 模式。

## 6. 兼容性考虑

- **主题**：色板必须由 `createTheme` token 派生（禁止图表库默认配色），保证与 `SConfigProvider` 亮暗切换实时联动。
- **SSR**：unovis 渲染依赖 DOM 测量，SSG 首帧输出占位（固定尺寸骨架）并在客户端 hydrate 后绘制；文档站 vite-ssg 构建需加 smoke。
- **体积**：unovis 作为 peer dependency，未安装时 `SChart*` 组件给出明确报错与安装指引（对齐 ui-x 的 optional peer 模式）。
- **admin 集成**：保持 chart 不反向依赖 admin；admin 通过 optional peerDep 消费，缺失时降级为数字展示。
- **a11y**：图表为视觉信息密集组件，必须提供数据表格降级与 `aria-label`；颜色对比纳入 axe e2e（现有 browser e2e 已开 color-contrast）。
- **版本**：lockstep 同版本；registry 命名空间 `chart/*`。

## 7. 风险

| 风险                              | 缓解                                                      |
| :-------------------------------- | :-------------------------------------------------------- |
| 选型决策拖延阻塞 EC-C10/C11       | 阶段 0 限时 4 天；默认按「unovis 首选」推进，ADR 后置补记 |
| unovis 图型覆盖不足（如 heatmap） | P2 图型允许降级自研 SVG 或明确裁剪范围                    |
| admin 等 chart 反向耦合           | 依赖方向 CI 检查（联动优化项 F1 依赖闭包审计）            |
