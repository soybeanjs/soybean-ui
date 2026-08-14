# SoybeanUI 任务分析与细化（Task Breakdown）

> 本文档是 [roadmap.md](./roadmap.md) 全部任务的**深度拆解**：每个任务拆为可执行子任务，标注**目标 / 负责人 / 预计工时 / 依赖条件**。
>
> 实时状态与进度**不在本文档维护**，见 [task-tracking.md](./task-tracking.md)（每次任务状态变化时更新跟踪表，本文档仅在任务范围变化时修订）。
>
> 基线日期：2026-08-14；基线分支：`main`。

## 0. 约定

### ID 体系

| 前缀    | 工作流            | 对应路线图板块                                  |
| :------ | :---------------- | :---------------------------------------------- |
| `EC-*`  | W1 生态基础与合并 | 生态扩展路线（沿用 ecosystem 分支任务清单编号） |
| `UX-*`  | W2 ui-x           | [ecosystem/ui-x.md](./ecosystem/ui-x.md)        |
| `AD-*`  | W3 admin          | [ecosystem/admin.md](./ecosystem/admin.md)      |
| `CH-*`  | W4 chart          | [ecosystem/chart.md](./ecosystem/chart.md)      |
| `PRO-*` | W5 ui-pro         | [ecosystem/ui-pro.md](./ecosystem/ui-pro.md)    |
| `OPT-*` | W6 工程优化       | [optimize.md](./optimize.md) F1–F11             |
| `CMP-*` | W7 核心组件       | 核心组件路线（45 个活跃组件）                   |

### 负责人约定（与 ecosystem 分支任务清单一致）

- **Soybean**（核心维护者）：架构决策、分支合并 / 发布、验收审核。
- **AI Agent**：编码与文档实施，Soybean 验收后才置为完成。

### 工时单位

`d` = 人日（按 AI Agent 实施、Soybean 抽查审核的节奏折算）；`h` = 人时。估算含测试与自验，不含文档站文案撰写（另有任务覆盖）。

---

## W1 生态基础与合并（EC）

### EC-M1 分支合并与 headless-x 拆解

**目标**：三条临时分支（`ecosystem` / `ui-x` / `admin`）按序合入 main，headless-x 包拆解迁入 ui-x，删除临时分支。**负责人**：Soybean（合并决策）+ AI Agent（冲突处理与验证）。**预计工时**：6d。**依赖条件**：无（主线第一步）；合并顺序固定（ecosystem → ui-x → admin），每步合并后全量验证。

| 子任务                       | 目标                                                                                                                              |       负责人       | 工时 | 依赖         |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :----------------: | :--: | :----------- |
| EC-M1.1 预处理包名冲突       | 将三分支中 `@soybeanjs/ui-unocss` / `packages/ui-unocss` 引用重定向为 `unocss`，重锁 pnpm-lock                                    |      AI Agent      | 0.5d | —            |
| EC-M1.2 合并 ecosystem 分支  | 三包骨架 + docs/playground 命名空间化（658 个文件迁移）+ 生成链路改造合入，冲突全消                                               | Soybean + AI Agent |  1d  | EC-M1.1      |
| EC-M1.3 headless-x 拆解迁移  | 9 composables + 7 types + specs 迁入 `packages/ui-x/src/`，删除 `packages/headless-x/`，ui-x 补 `./composables` `./types` exports |      AI Agent      |  1d  | EC-M1.2      |
| EC-M1.4 合并 ui-x 分支       | 20 组件 + 13 测试 + docs/playground 接线合入（除 headless-x 外全部内容）                                                          | Soybean + AI Agent |  1d  | EC-M1.3      |
| EC-M1.5 合并 admin 分支      | 6 壳组件 + e2e + `navigation-menu` group 命名修复合入；接通 admin→chart optional peerDep                                          | Soybean + AI Agent |  1d  | EC-M1.2      |
| EC-M1.6 合并后全量验证       | 每步合并后跑 `pnpm typecheck` + `pnpm test` + `pnpm build`；最后归档 / 删除三条临时分支                                           |      AI Agent      | 1.5d | EC-M1.2~M1.5 |
| EC-A08 use-x-stream 上浮评估 | 按原子原语判据（跨 ≥2 域、无领域语义）出结论，记录 ADR                                                                            |      Soybean       | 0.5d | EC-M1.3      |

### EC-M2 sbean registry 命名空间化与 CLI

**目标**：registry items 全面迁移为 `package/component` 命名空间，CLI 支持多包，保留无前缀别名兼容。**负责人**：AI Agent。**预计工时**：5d。**依赖条件**：EC-M1.2（`packages` 元数据已在 ecosystem 分支落地）。

| 子任务                        | 目标                                                                                     |  负责人  | 工时 | 依赖          |
| :---------------------------- | :--------------------------------------------------------------------------------------- | :------: | :--: | :------------ |
| EC-M2.1 既有 items 命名空间化 | `accordion` → `ui/accordion` 并附 `package: "ui"` 字段（88 组）                          | AI Agent |  1d  | —             |
| EC-M2.2 新增外围包 items      | `ui-x/*`（20）、`admin/*`（6+）、`chart/*`（随组件产出）                                 | AI Agent |  1d  | W2/W3/W4 组件 |
| EC-M2.3 CLI 适配              | `getComponentSlug` / `fetchRegistryItem` 支持命名空间路径；`sbean add bubble` 别名仍可用 | AI Agent | 1.5d | EC-M2.1       |
| EC-M2.4 CLI 验证              | `sbean add <pkg>/<component>`、`sbean list --package`、`sbean docs <item>` 全命令回归    | AI Agent | 1.5d | EC-M2.3       |

### EC-M3 `pnpm sui` 多包生成

**目标**：API / changelog 生成从单包扩展为遍历 `packages` 元数据，输出 `generated/api/<pkg>/`。**负责人**：AI Agent。**预计工时**：6d。**依赖条件**：EC-M1.2。

| 子任务                     | 目标                                                                                       |  负责人  | 工时 | 依赖    |
| :------------------------- | :----------------------------------------------------------------------------------------- | :------: | :--: | :------ |
| EC-M3.1 api 命令多包化     | `scripts/cli.ts` api 命令遍历 packages 元数据，输出 `generated/api/<pkg>/<component>.json` | AI Agent |  2d  | —       |
| EC-M3.2 changelog 多包化   | `changelog` / `changelog-locales` 同步迁移 `generated/changelog/<pkg>/`                    | AI Agent | 1.5d | EC-M3.1 |
| EC-M3.3 渲染组件适配       | `<ComponentApi>` / `<PlaygroundGallery>` 按路由命名空间定位子目录                          | AI Agent | 1.5d | EC-M3.1 |
| EC-M3.4 api-translate 适配 | 翻译命令支持 `--package` 维度                                                              | AI Agent |  1d  | EC-M3.1 |

### EC-M4 文档站与 playground 多包化

**目标**：docs / playground 支持四包（ui / ui-x / admin / chart）切换浏览。**负责人**：AI Agent。**预计工时**：10d。**依赖条件**：EC-M1.2（页面骨架与 header 入口已在 ecosystem 分支落地）。

| 子任务                    | 目标                                                                                                  |  负责人  | 工时 | 依赖         |
| :------------------------ | :---------------------------------------------------------------------------------------------------- | :------: | :--: | :----------- |
| EC-M4.1 包切换器          | docs 顶部下拉（UI / UI-X / Admin / Chart）+ `shouldShowSidebar` 适配 + 侧边栏 menu data 切换          | AI Agent |  2d  | —            |
| EC-M4.2 docs 内容撰写     | 各包 index / installation / quick-start 实际文案（en/zh-CN）                                          | AI Agent |  2d  | —            |
| EC-M4.3 组件文档          | 各组件 `[name].md` + `<UsageCode>` / `<PlaygroundGallery>` / `<ComponentApi>`（随 W2/W3/W4 组件产出） | AI Agent |  3d  | EC-M3.3      |
| EC-M4.4 playground 包切换 | 顶部包切换器镜像 docs；`examples/<pkg>/` 导航                                                         | AI Agent | 1.5d | —            |
| EC-M4.5 i18n 补齐         | docs locale 与 playground 示例标题 key（en/zh-CN）                                                    | AI Agent | 1.5d | EC-M4.2~M4.4 |
| EC-M4.6 registry 页面     | `/registry` 按 package 分组展示 sbean 条目 + `sbean add` 命令                                         | AI Agent |  1d  | EC-M2.2      |

### EC-M5 lockstep 发布

**目标**：全包（含三个新包）单 tag 同版本发布。**负责人**：Soybean。**预计工时**：2d。**依赖条件**：EC-M1 全部、W2/W3/W4 至少 P0 组件就绪；时间窗 2026-09-01 ~ 09-10。

| 子任务           | 目标                                                     |       负责人       | 工时 | 依赖    |
| :--------------- | :------------------------------------------------------- | :----------------: | :--: | :------ |
| EC-M5.1 发布演练 | `pnpm publish -r`（dry-run）+ `release.yml` 全包产物核对 | Soybean + AI Agent |  1d  | —       |
| EC-M5.2 正式发布 | 打 tag、changelog 生成、skills 同步、npm 发布与验证      |      Soybean       |  1d  | EC-M5.1 |

---

## W2 ui-x（UX）

> 20 组件 + 9 composables 已在分支实现，W2 主要是迁移收尾、验收与 P3 迭代。详见 [ecosystem/ui-x.md](./ecosystem/ui-x.md)。

### UX-1 迁移收尾与验收

**目标**：分支内容合并后达到可发布质量。**负责人**：AI Agent 实施、Soybean 验收。**预计工时**：4d。**依赖条件**：EC-M1.3 / EC-M1.4。

| 子任务                      | 目标                                                                     |  负责人  | 工时 | 依赖                       |
| :-------------------------- | :----------------------------------------------------------------------- | :------: | :--: | :------------------------- |
| UX-1.1 composables 单测补齐 | 9 个 composables 至少各 1 个 spec（当前仅 use-sender 有）                | AI Agent |  2d  | —                          |
| UX-1.2 examples 迁移        | 分支扁平 examples 迁入 `examples/ui-x/<component>/` 并接 playground 导航 | AI Agent |  1d  | —                          |
| UX-1.3 验收清单核对         | 每组件全交付面（源码 / 测试 / 文档 / 示例 / API JSON / registry）核对    | Soybean  |  1d  | UX-1.1/1.2、EC-M3、EC-M4.3 |

### UX-2 P3 组件迭代

**目标**：补齐 `useRecord`、`SxAudioPlayer`、`SxStackTrace`、`SxAgent`。**负责人**：AI Agent。**预计工时**：8d。**依赖条件**：UX-1 完成；容量允许时排期（生态首发之后）。

| 子任务                           | 目标                                           |  负责人  | 工时 | 依赖 |
| :------------------------------- | :--------------------------------------------- | :------: | :--: | :--- |
| UX-2.1 useRecord + SxAudioPlayer | 语音录制与播放组件（浏览器 MediaRecorder API） | AI Agent |  3d  | —    |
| UX-2.2 SxStackTrace              | 错误堆栈可视化渲染                             | AI Agent |  2d  | —    |
| UX-2.3 SxAgent                   | 会话 Agent 状态编排组件                        | AI Agent |  3d  | —    |

---

## W3 admin（AD）

> 6 壳组件已在分支实现（M1 完成、M2 待验收）。详见 [ecosystem/admin.md](./ecosystem/admin.md)。

### AD-1 M2 验收

**目标**：解除 M2 遗留阻塞，完成交付清单。**负责人**：AI Agent 实施、Soybean 验收。**预计工时**：3d。**依赖条件**：可与 EC-M1 并行启动（在 admin 分支上），合并前完成。

| 子任务                | 目标                                                         |  负责人  | 工时 | 依赖       |
| :-------------------- | :----------------------------------------------------------- | :------: | :--: | :--------- |
| AD-1.1 e2e 修复       | 解决 Vue 3.5 重渲染 bug 导致的断言拆分，app-shell e2e 通过   | AI Agent | 1.5d | —          |
| AD-1.2 typecheck 解阻 | 配合 OPT-F8 统一 TS 版本；必要时临时 package 级 vue-tsc 门禁 | AI Agent |  1d  | OPT-F8     |
| AD-1.3 M2 交付核对    | playground 后台壳 6 种模式逐一手验 + 交付清单勾选            | Soybean  | 0.5d | AD-1.1/1.2 |

### AD-2 M3 实用组件（P0）

**目标**：`SAppProTable` + `SAppProForm`。**负责人**：AI Agent。**预计工时**：10d。**依赖条件**：EC-M1.5（admin 合并）；schema 模型（`AppTableColumn` / `AppFormSchema`）已在 types.ts 预留。

| 子任务                | 目标                                                               |  负责人  | 工时 | 依赖       |
| :-------------------- | :----------------------------------------------------------------- | :------: | :--: | :--------- |
| AD-2.1 SAppProForm    | AppFormSchema 驱动表单（复用核心 form 家族），含校验 / 联动 / 分组 | AI Agent |  4d  | —          |
| AD-2.2 SAppProTable   | AppTableColumn 驱动表格 + 搜索表单 + 分页 + 工具栏                 | AI Agent |  4d  | AD-2.1     |
| AD-2.3 sparkline 集成 | 表格内嵌 `SChartSparkline`（chart 就绪后）                         | AI Agent |  1d  | CH-1       |
| AD-2.4 测试与示例     | 单测 + browser e2e + playground 示例（含真实数据场景）             | AI Agent |  1d  | AD-2.1/2.2 |

### AD-3 M4+ 组件（P1/P2）

**目标**：多页签、命令面板、主题抽屉、分栏、反馈类。**负责人**：AI Agent。**预计工时**：14d。**依赖条件**：AD-2 完成；按 P1 → P2 顺序。

| 子任务                    | 目标                                                                 |  负责人  | 工时 | 依赖       |
| :------------------------ | :------------------------------------------------------------------- | :------: | :--: | :--------- |
| AD-3.1 SAppMultiTab       | 复用 `SPageTabs` + `useMultiTab`，`AppTab` 模型（pinned / fullPath） | AI Agent |  3d  | —          |
| AD-3.2 SAppCommandPalette | `AppMenuData` 驱动命令面板（复用 combobox）                          | AI Agent |  3d  | —          |
| AD-3.3 SAppThemeDrawer    | 复用 `SThemeCustomizer` 封装                                         | AI Agent |  1d  | —          |
| AD-3.4 SAppSplitPanel     | 分栏面板                                                             | AI Agent |  2d  | —          |
| AD-3.5 反馈类             | `SAppEmptyState` / `SAppResult` / `SAppPermissionButton`             | AI Agent |  3d  | —          |
| AD-3.6 测试与示例         | 同 AD-2.4 标准                                                       | AI Agent |  2d  | AD-3.1~3.5 |

---

## W4 chart（CH）

> 功能 0%，核心是选型决策 + P0 图元。详见 [ecosystem/chart.md](./ecosystem/chart.md)。

### CH-0 渲染引擎选型

**目标**：输出选型 ADR（建议 unovis 首选，见方案 §5）。**负责人**：Soybean。**预计工时**：1d（限时 2026-08-14 ~ 08-18）。**依赖条件**：无。

| 子任务          | 目标                                                    |  负责人  | 工时 | 依赖   |
| :-------------- | :------------------------------------------------------ | :------: | :--: | :----- |
| CH-0.1 原型对比 | unovis / ECharts 最小原型各 1 个（主题联动 + SSR 表现） | AI Agent | 0.5d | —      |
| CH-0.2 决策 ADR | 记录选型、peer 策略、降级方案                           | Soybean  | 0.5d | CH-0.1 |

### CH-1 P0 图元

**目标**：`SChart` 容器 + `SChartBar` + `SChartLine` 可用。**负责人**：AI Agent。**预计工时**：8d。**依赖条件**：CH-0、EC-M1.2（包骨架）。

| 子任务                        | 目标                                                                                  |  负责人  | 工时 | 依赖   |
| :---------------------------- | :------------------------------------------------------------------------------------ | :------: | :--: | :----- |
| CH-1.1 数据模型与容器         | `ChartSeries` / `ChartDatum` 类型 + `SChart` 容器（resize / 主题注入 / tooltip 宿主） | AI Agent |  3d  | —      |
| CH-1.2 SChartBar / SChartLine | 柱状 + 折线，堆叠 / 分组模式，色板走 theme token                                      | AI Agent |  3d  | CH-1.1 |
| CH-1.3 a11y 与测试            | 数据表格降级 + `aria-label`；单测 + axe 颜色对比 e2e                                  | AI Agent |  2d  | CH-1.2 |

### CH-2 其余图元（P1/P2）

**目标**：Area / Pie / Donut / Sparkline / Heatmap / 子件。**负责人**：AI Agent。**预计工时**：10d。**依赖条件**：CH-1。

| 子任务                 | 目标                                                           |  负责人  | 工时 | 依赖 |
| :--------------------- | :------------------------------------------------------------- | :------: | :--: | :--- |
| CH-2.1 常见图元        | Area / Pie / Donut                                             | AI Agent |  3d  | —    |
| CH-2.2 SChartSparkline | 自研 SVG 极简图元（供 Statistic / ProTable 内嵌）              | AI Agent | 1.5d | —    |
| CH-2.3 子件            | SChartTooltip（复用 STooltip 定位）/ SChartLegend / SChartAxis | AI Agent | 2.5d | —    |
| CH-2.4 SChartHeatmap   | 日历热力图（P2，若 unovis 覆盖不足则评估自研或裁剪）           | AI Agent |  3d  | —    |

---

## W5 ui-pro（PRO）

> 探索性，全部待排期（2026 Q4 立项评估）。详见 [ecosystem/ui-pro.md](./ecosystem/ui-pro.md)。

### PRO-1 立项评估

**目标**：完成 M-PRO 里程碑——收录判据评审、分发模式决策、与 ui-lowcode 合并决策。**负责人**：Soybean。**预计工时**：3d。**依赖条件**：EC-M5（生态首发完成）；组件市场需求信号数据。

| 子任务               | 目标                                                                            |  负责人  | 工时 | 依赖        |
| :------------------- | :------------------------------------------------------------------------------ | :------: | :--: | :---------- |
| PRO-1.1 契约演练     | EC-G07：按接入契约清单（骨架模板 / 前缀 / registry / sui / docs）走一遍新包接入 | AI Agent |  1d  | —           |
| PRO-1.2 需求信号收集 | 组件市场 RichTextEditor 等候选项的下载 / 引用数据                               | AI Agent | 0.5d | —           |
| PRO-1.3 立项 ADR     | 收录判据定案、分发模式（同仓 lockstep / 独立商业 / 混合）决策、lowcode 合并决策 | Soybean  | 1.5d | PRO-1.1/1.2 |

---

## W6 工程优化（OPT）

> 来源 [optimize.md](./optimize.md) F1–F11。阶段 A（08-14 ~ 08-28）→ B（08-28 ~ 09-11）→ C（09-11 ~ 10-09）→ D（10-09 后）。负责人默认 AI Agent 实施、Soybean 验收。

### OPT-F1 Workspace 依赖闭包补齐（阶段 A，高）

**目标**：每个 workspace manifest 构成真实依赖闭包，摆脱 `shamefullyHoist` 隐式依赖。**预计工时**：5d。**依赖条件**：无。

| 子任务                     | 目标                                                                                                                                                                   |  负责人  | 工时 | 依赖      |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :--: | :-------- |
| F1.1 直接依赖审计          | 扫描全部 workspace 直接 import，补齐 manifest 声明（ui 的 @vueuse/core、sbean 的 @soybeanjs/theme、unocss 的 lightningcss、docs/nuxt 的多项 preset、scripts 的 execa） | AI Agent |  2d  | —         |
| F1.2 tarball smoke         | 六个发布包 `pnpm pack` 后在临时空项目安装并 import 每个公共入口                                                                                                        | AI Agent | 1.5d | F1.1      |
| F1.3 filtered install 验证 | docs / playground / nuxt 仅安装声明依赖可构建                                                                                                                          | AI Agent |  1d  | F1.1      |
| F1.4 shamefullyHoist 评估  | 尝试关闭；不能关闭则记录依赖 hoist 的工具清单与原因                                                                                                                    | Soybean  | 0.5d | F1.1~F1.3 |

### OPT-F2 PR CI 覆盖可发布 / 可部署（阶段 A，高）

**目标**：PR 上能发现 pack、CSS、SSG、exports 和缺失 runtime dependency 错误。**预计工时**：4d。**依赖条件**：无。

| 子任务                                   | 目标                                                                  |  负责人  | 工时 | 依赖 |
| :--------------------------------------- | :-------------------------------------------------------------------- | :------: | :--: | :--- |
| F2.1 lint 非修改模式                     | CI 去掉 `--fix` 或 fix 后 `git diff --exit-code`                      | AI Agent | 0.5d | —    |
| F2.2 package build job                   | CI 构建全部实际发布包（含生态新包）                                   | AI Agent |  1d  | —    |
| F2.3 docs SSG smoke + tarball import job | docs SSG 构建 + 发布包入口导入冒烟                                    | AI Agent | 1.5d | —    |
| F2.4 release 门禁收紧                    | tag workflow 依赖已通过 commit 检查或重跑 tests；默认 frozen lockfile | Soybean  |  1d  | —    |

### OPT-F3 生成物原子批次（阶段 B，高）

**目标**：任何公共组件不可能只出现在部分生成面；生成可确定性重放。**预计工时**：6d。**依赖条件**：无。

| 子任务                    | 目标                                                                                                            |  负责人  | 工时 | 依赖      |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------- | :------: | :--: | :-------- |
| F3.1 修复 Rating 缺口     | API / changelog 聚合 index、docs 菜单、双语文档补齐 rating                                                      | AI Agent |  1d  | —         |
| F3.2 check:generated 命令 | 一次校验：公共组件集合 / API+changelog 文件 / 聚合 index / docs 菜单+locale+双语 Markdown / playground 示例入口 | AI Agent |  2d  | F3.1      |
| F3.3 确定性生成           | `generatedAt` 支持 `SOURCE_DATE_EPOCH` 或比较时忽略；生成先写临时目录再原子替换                                 | AI Agent | 1.5d | —         |
| F3.4 en/zh-CN 文件树对齐  | 判定中文 picker 文件为兼容别名还是删除，统一 canonical path；CI 加集合差检查                                    | AI Agent |  1d  | —         |
| F3.5 CI 接入              | `check:generated` 进 PR CI；release 前显式验证 API 生成状态                                                     | AI Agent | 0.5d | F3.2/F3.3 |

### OPT-F6 高影响 seam 契约测试（阶段 C，高）

**目标**：`createTheme` / `presetUiUnocss` / `useUiContext` 的行为由直接测试锁定。**预计工时**：5d。**依赖条件**：无（建议阶段 C 窗口执行）。

| 子任务                   | 目标                                                              |  负责人  |  工时   | 依赖 |
| :----------------------- | :---------------------------------------------------------------- | :------: | :-----: | :--- |
| F6.1 createTheme 测试    | light/dark selector、size/radius、preset override、token 输出格式 | AI Agent |  1.5d   | —    |
| F6.2 presetUiUnocss 测试 | preflight / preset 组合、resetCSS / globalCSS / uiCSS 开关        | AI Agent |   1d    | —    |
| F6.3 useUiContext 测试   | slot / full-map、响应式更新、默认空值、provider 缺失              | AI Agent |   1d    | —    |
| F6.4 独立 typecheck      | headless 加 vue-tsc 门禁、nuxt 加 typecheck 集成检查              | AI Agent |   1d    | —    |
| F6.5 e2e 扩展            | 按浮层 / focus / keyboard 风险清单补 browser e2e                  | AI Agent | 0.5d 起 | —    |

### OPT-F7 构建图对齐（阶段 C，中）

**目标**：clean checkout 一个根 build 命令产出全部发布产物。**预计工时**：3d。**依赖条件**：OPT-F1。

| 子任务            | 目标                                                                                                      |  负责人  | 工时 | 依赖 |
| :---------------- | :-------------------------------------------------------------------------------------------------------- | :------: | :--: | :--- |
| F7.1 单一编排入口 | 选定 pnpm 拓扑递归或 Vite Plus task graph 为单一事实源                                                    | Soybean  | 0.5d | —    |
| F7.2 build 全覆盖 | 根 `build` 覆盖全部发布包（含生态新包）并按依赖图排序                                                     | AI Agent | 1.5d | F7.1 |
| F7.3 app 构建依赖 | `build:docs` / `build:playground` / nuxt smoke 依赖同一 package build 任务；清理 `shared/**` 预留 pattern | AI Agent |  1d  | F7.2 |

### OPT-F8 TypeScript 版本统一（阶段 C，中）

**目标**：manifest / catalog / override / lockfile 对 TS 主版本表达一致。**预计工时**：2d。**依赖条件**：无；**阻塞 AD-1.2**。

| 子任务                | 目标                                                                    |  负责人  | 工时 | 依赖 |
| :-------------------- | :---------------------------------------------------------------------- | :------: | :--: | :--- |
| F8.1 兼容验证         | 验证 7.0.2 与 Vue / TypeDoc / Vite Plus / Vitest 兼容                   | AI Agent |  1d  | —    |
| F8.2 版本收敛         | 目标 7.0.2 则删 override；锁定 6.0.3 则统一 manifest 并记录解除条件     | Soybean  | 0.5d | F8.1 |
| F8.3 toolchain report | 输出 Node / pnpm / TS / vue-tsc / Vite Plus / Vitest 实际版本的检查命令 | AI Agent | 0.5d | —    |

### OPT-F4/F5 Docs 依赖与构建图（阶段 D，中）

**目标**：消除 docs ↔ playground 反向边；demo / raw TS 按需加载。**预计工时**：8d。**依赖条件**：docs build 基线数据（构建时间 / 峰值内存 / chunk 尺寸）。

| 子任务                 | 目标                                                                                               |  负责人  | 工时 | 依赖 |
| :--------------------- | :------------------------------------------------------------------------------------------------- | :------: | :--: | :--- |
| F4.1 catalog 所有权    | demo catalog / 排序规则 / 共享类型移入 playground；docs 单向消费；playground 移除 `@docs/*` import | AI Agent |  2d  | —    |
| F4.2 Nuxt fixture 定界 | 明确 source-coupled smoke 或独立示例；补 locale 文件与 build smoke                                 | AI Agent | 1.5d | —    |
| F5.1 基线采集          | docs build time / 峰值内存 / route chunk 基线与预算                                                | AI Agent |  1d  | —    |
| F5.2 demo 按需加载     | demo manifest 化，组件页只载对应示例；raw code 独立 lazy chunk                                     | AI Agent |  2d  | F5.1 |
| F5.3 类型解析前移      | raw TS 解析移到 `pnpm sui api`，docs 消费 normalized preview model；1466 行模块收敛为三个深模块    | AI Agent | 1.5d | F5.1 |

### OPT-F9/F10/F11 持续改进（低）

| 任务               | 目标                                                                                                                                     |  负责人  | 工时 | 依赖 |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :------: | :--: | :--- |
| F9 类型逃逸治理    | 28 行例外清单化（原因 + 移除条件）；CI「禁止新增」基线；三类可复用问题（公共泛型默认值 / DOM style 索引 / schema JSON）typed helper 收敛 | AI Agent |  3d  | 无   |
| F10 文档单一事实源 | 计数 / 版本由 generated constants 产出，README 只引用；Markdown link check；禁 `file:///Users/`                                          | AI Agent |  2d  | 无   |
| F11 覆盖率量化     | 保存 package / 目录级基线；新增代码 diff coverage；高影响纯函数更高目标                                                                  | AI Agent |  2d  | F6   |

---

## W7 核心组件路线（CMP）

> 45 个活跃路线图组件（高 22 / 中 11 / 低 12），详见 [roadmap.md](./roadmap.md) 各详细条目。每个组件交付含：headless + UI 源码、单测、playground 示例、双语文档、API/changelog 生成、registry 条目（全交付面验收，联动 OPT-F3.2 的 `check:generated`）。负责人默认 AI Agent 实施、Soybean 验收。

工时折算：Effort Low ≈ 1–2d、Medium ≈ 2–4d、High ≈ 5–8d（含测试与交付面）。

### CMP-1 P0 组件（高优先级第一批，9 个，共约 25d）

**目标**：补齐关键缺口。**时间窗建议**：2026 Q4（生态首发后）。**依赖条件**：EC-M5 完成（避免与生态主线抢占）；组件间内部依赖见下表「依赖」列。

| 子任务  | 组件           | Effort  | 工时 | 依赖（核心库内部）                                        |
| :------ | :------------- | :-----: | :--: | :-------------------------------------------------------- |
| CMP-1.1 | `Statistic`    |   Low   | 1.5d | 无                                                        |
| CMP-1.2 | `Ellipsis`     | Low-Med |  2d  | `tooltip`                                                 |
| CMP-1.3 | `Typography`   | Medium  |  3d  | `clipboard`、CMP-1.2（Ellipsis）、`editable`              |
| CMP-1.4 | `Descriptions` | Medium  | 2.5d | 无                                                        |
| CMP-1.5 | `Timeline`     | Medium  |  3d  | `icon`                                                    |
| CMP-1.6 | `Image`        | Medium  |  3d  | `spinner`/`skeleton`、overlay 原语                        |
| CMP-1.7 | `TreeSelect`   | Medium  | 3.5d | `tree`、`popover`、`virtualizer`                          |
| CMP-1.8 | `Code`         | Medium  |  3d  | `clipboard`；shiki 为 peer                                |
| CMP-1.9 | `Upload`       |  High   |  6d  | `progress`、`button`、`tag`；建议后置于 Dropzone 模式验证 |

### CMP-2 P1 组件（高优先级第二批，13 个，共约 30d）

**时间窗建议**：2027 Q1。**依赖条件**：CMP-1 完成（`Statistic` 供 `NumberAnimation` 集成；`Ellipsis` 供 Typography 收尾）。

| 子任务   | 组件              | Effort | 工时 | 依赖                                    |
| :------- | :---------------- | :----: | :--: | :-------------------------------------- |
| CMP-2.1  | `NumberAnimation` |  Low   | 1.5d | 无（composable 优先）                   |
| CMP-2.2  | `Countdown`       |  Low   | 1.5d | 无                                      |
| CMP-2.3  | `QRCode`          |  Low   | 1.5d | `qrcode` peer                           |
| CMP-2.4  | `Result`          |  Low   | 1.5d | `icon`                                  |
| CMP-2.5  | `Space`           |  Low   |  1d  | 无                                      |
| CMP-2.6  | `Fieldset`        |  Low   | 1.5d | 无                                      |
| CMP-2.7  | `AvatarGroup`     |  Low   | 1.5d | `avatar`                                |
| CMP-2.8  | `InputMask`       | Medium | 2.5d | `input`                                 |
| CMP-2.9  | `InfiniteScroll`  | Medium | 2.5d | `spinner`                               |
| CMP-2.10 | `RangeSlider`     | Medium |  3d  | `slider`（共享 useSliderThumb）         |
| CMP-2.11 | `SplitButton`     | Medium | 2.5d | `button`、`dropdown-menu`               |
| CMP-2.12 | `Transfer`        |  High  |  6d  | `input`、`button`、`checkbox`、`tag`    |
| CMP-2.13 | `Mention`         |  High  |  5d  | `popover`、`input`/`textarea`、`avatar` |

### CMP-3 P2 组件（中优先级，11 个，共约 26d）

**时间窗建议**：2027 全年视容量穿插。**依赖条件**：容量允许；部分依赖 CMP-1.9（`Dropzone` 供 `Upload` 复用）。

| 子任务   | 组件                   | 工时 | 依赖                                 |
| :------- | :--------------------- | :--: | :----------------------------------- |
| CMP-3.1  | `VisuallyHidden`       | 0.5d | 无                                   |
| CMP-3.2  | `TriStateCheckbox`     |  1d  | `checkbox`                           |
| CMP-3.3  | `NativeSelect`         | 1.5d | `icon`                               |
| CMP-3.4  | `Backdrop`             | 1.5d | overlay 模式                         |
| CMP-3.5  | `Banner`               |  2d  | `icon`、`button`                     |
| CMP-3.6  | `LoadingBar`           | 2.5d | toast provider 模式                  |
| CMP-3.7  | `CurrencyInput`        | 2.5d | `input-number`                       |
| CMP-3.8  | `InputGroup`           | 2.5d | `input`、`button`、`icon`            |
| CMP-3.9  | `Dropzone`             |  3d  | 供 `Upload` 复用                     |
| CMP-3.10 | `FloatingActionButton` |  3d  | `button`、`tooltip`、`dropdown-menu` |
| CMP-3.11 | `Masonry`              | 3.5d | ResizeObserver                       |

### CMP-4 P3 组件（低优先级，12 个，共约 22d）

**时间窗建议**：择机；可按需求信号转入组件市场。**依赖条件**：无硬依赖。

清单（工时）：`NumberFormatter` 0.5d、`Indicator` 1d、`GradientText` 1d、`Highlight` 1d、`Spoiler` 1d、`Blockquote` 1d、`Marquee` 1.5d、`Equation` 2.5d（KaTeX peer）、`Knob` 3d、`OverflowList` 3d、`Signature` 3.5d、`Terminal` 3.5d。

### CMP-5 组件市场（12 个延后项）

**目标**：以 sbean registry 源码分发模式落地（Tour / TreeTable / PageHeader / Navbar / Comment / Sidebar / AppShell / Galleria / OrganizationChart / RichTextEditor / Dock / DynamicInput）。**负责人**：AI Agent + Soybean 评审。**预计工时**：每项 2–5d，视需求信号排期。**依赖条件**：EC-M2（registry 命名空间化）+ 所需原子组件就绪。

---

## 附：工作流依赖总图

```
EC-M1（合并） ──► UX-1 ──► UX-2
   │      └────► AD-1 ──► EC-M1.5 ──► AD-2 ──► AD-3
   ├─► EC-M2 ─┐
   ├─► EC-M3 ─┼──► EC-M4 ──► EC-M5（发布）
   └─► CH-0 ──► CH-1 ──► CH-2 ──► AD-2.3
EC-M5 ──► PRO-1（Q4）
OPT-F1 ──► OPT-F7        OPT-F8 ──► AD-1.2
OPT-F3（独立）  OPT-F6 ──► OPT-F11  OPT-F9/F10（独立）
EC-M5 ──► CMP-1 ──► CMP-2 ──► CMP-3 / CMP-4（容量穿插）
EC-M2 ──► CMP-5
```
