# 项目结构与工程质量改进评估

> **评估时间：** 2026-09-06
>
> **适用版本：** `0.31.0`
>
> **详细架构：** [architecture.md](./architecture.md)
>
> **方法：** CodeGraph 1.5.0 全量代码图谱 + workspace 清单、配置、生成物与文档交叉校验
>
> **2026-09 注记：** 本评估反映 2026-09-06 基线（含 admin / chart / ui-x 共 9 个发布包、14 个子 workspace）。其后 `@soybeanjs/ui-x` 整包移除（AI 组件回归核心 headless/ui，见 [ui-ai-roadmap.md](./ui-ai-roadmap.md)），中后台壳方向亦明确为核心内领域（headless `src/shell/` + ui 复合组件，见 [ui-shell-roadmap.md](./ui-shell-roadmap.md)）；当前为 7 packages + 2 apps + skills 共 10 个子 workspace、6 个发布包（含 ui-skills）。下文中涉及外围包的包清单、构建链（`… → ui-x → …`）与生成路径均为当时事实，阅读时按此注记折算。

## 1. 结论摘要

项目的核心架构方向是成立的：

- Headless 与 Styled 两层职责清楚，编译期依赖保持为
  `@soybeanjs/ui → @soybeanjs/headless`。
- `useUiContext` 把视觉 token 注入与行为实现隔离，是高杠杆的深模块。
- `createTheme` 同时服务运行时主题和 UnoCSS 构建，避免两套 token
  生成逻辑。
- `sbean`、组件包、文档站（含示例）、生成脚本均有明确用途。
- TypeScript 严格模式、119 个 UI 单测文件、16 个 sbean 测试文件及
  browser e2e 已形成基础质量网。

当前主要风险不在组件目录是否“分得够细”，而在跨 workspace 的工程约束没有
完全机器化：

1. 若干直接依赖未在所属 workspace 声明，由 `shamefullyHoist` 掩盖。
2. PR CI 会构建全部发布包（`pnpm build`），但仍不构建文档站，也不校验生成物
   是否为同一批次。
3. docs 示例目录仍使用全量 eager glob（playground 已并入 docs，双向环已消除）。
4. 两个高影响接口缺少直接契约测试。
5. 文档、聚合索引和逐组件生成文件仍可能部分同步。
6. 仅 Nuxt 缺独立 typecheck，双语 Markdown 文件树也未保持同构。

建议先解决依赖闭包、CI 构建/生成一致性和发布包 smoke test，再进行目录拆分或
引入新的构建编排工具。

## 2. 评估基线

### 2.1 CodeGraph 覆盖

- 索引状态：最新。
- 文件：2,053。
- 节点：19,293。
- 边：55,503。
- 语言分布：1,121 Vue、926 TypeScript、4 YAML、1 JavaScript、1 TSX。
- Git 跟踪文件总数：2,730。未进入代码图谱的 Markdown、JSON、CSS、资源文件
  通过直接读取和内容检索校验。

### 2.2 当前规模

- pnpm 识别 15 个 workspace project：私有根项目、14 个子 workspace。
- 可发布包：9 个（admin、chart、headless、sbean、theme、ui、ui-uno、ui-x、ui-skills）。
- 私有包：2 个（scripts、shared）。
- 私有应用：2 个（docs、nuxt）。
- Headless：96 个目录、94 个公共组件入口、28 个 composable。
- UI：96 个公共组件组、144 个 `S` 前缀导出。
- Docs 示例：582 个示例 SFC（`apps/docs/src/examples`）。
- Browser e2e：11 个组件级 spec。

### 2.3 证据边界

以下结论区分为：

- **事实：** 由源码、manifest、配置、测试或 CodeGraph 关系直接证明。
- **推断：** 由事实导出的风险判断，需通过构建耗时、bundle 或独立安装实验量化。
- **未知：** 本次静态分析无法确定的运行时/生产数据。

本报告不会把“没有仓库内测试”写成“功能一定有 bug”，也不会在没有基准数据时
承诺某种构建工具能显著提速。

## 3. 已验证的架构优势

### 3.1 分层接口有深度

**事实：** CodeGraph 显示 `useUiContext` 被 67 个组件 context 调用，变更影响
68 个符号。调用方只需要学习 slot→class 接口，不需要了解样式 recipe 的实现。

**判断：** 这是高杠杆接口，不应拆散到各组件，也不应让 UI 层复制行为逻辑。
优化重点应是契约测试和类型收紧，而不是重写该 seam。

### 3.2 主题只有一个生成核心

**事实：** `createTheme` 同时被 UI `ConfigProvider` 与
`presetUi` 使用；CodeGraph 影响范围为 10 个符号，覆盖四份 UnoCSS 配置。

**判断：** 运行时与构建时共享生成器能降低 token 漂移。应补测试而非建立第二套
主题适配层。

### 3.3 组件交付面已有统一入口

**事实：** `packages/scripts/src/index.ts` 通过 `pnpm sui` 统一暴露 headless/UI 元数据、API、
changelog、locale、schema 和 skills 生成命令。

**判断：** 后续一致性检查应建立在该入口上，不需要再创建一套平行生成 CLI。

### 3.4 sbean 的模块边界较清晰

**事实：** sbean 将 commands、registry、schema、preset、templates、MCP 和
utils 分开，并有 16 个测试文件及 ADR。

**判断：** sbean 已经接近“较小接口 + 较深实现”的结构。当前优先项是依赖声明、
打包验证和 ADR/manifest 对齐，而不是继续拆目录。

## 4. 发现与建议

## P0：优先处理

### F1. Workspace 依赖闭包不完整

**严重度：Major · 置信度：高**

**事实：**

- `pnpm-workspace.yaml` 设置了 `shamefullyHoist: true`。
- `packages/ui` 的运行时代码直接导入 `@vueuse/core`，但 UI manifest 未声明。
- `packages/cli/src/registry/config.ts` 运行时导入
  `@soybeanjs/theme`，但 sbean manifest 未声明。
- `apps/docs` 直接使用 `@soybeanjs/colord`、
  `@vueuse/core`、`unocss`、`unocss-preset-animations`、
  `@soybeanjs/unocss-preset` 和 `@soybeanjs/ui-uno`，其中多项未在
  docs manifest 声明。
- `apps/nuxt` 的 UnoCSS 配置直接使用三项未声明 preset 依赖。

**推断：**

完整 monorepo 安装会因 hoist 和其他 workspace 的依赖而成功，但 filtered
install、隔离构建、发布 tarball 或不同包管理器消费时，可能出现模块解析失败。
这也让“删除一个看似无关依赖”产生跨 workspace 回归。

**建议：**

1. 为每个直接 import 补充所属 workspace 的 `dependencies` 或
   `devDependencies`；运行时 external 必须是 production dependency 或明确的
   peer dependency。
2. 对九个发布包（admin、chart、headless、sbean、theme、ui、ui-uno、ui-x、
   ui-skills）执行 `pnpm pack` 后在临时空项目中安装并 import 每个公共入口。
3. 为 docs、nuxt 分别执行 filtered install/build smoke test。
4. 完成闭包后再尝试关闭 `shamefullyHoist`；若暂时不能关闭，记录仍依赖 hoist
   的工具和原因。

**验收条件：**

- 直接依赖扫描无未声明项。
- 九个 tarball 在空目录中可安装并导入。
- 三个 app 可在仅安装其声明依赖的条件下构建。
- `shamefullyHoist` 不再是隐式依赖正确性的必要条件，或保留项有明确清单。

### F2. PR CI 未覆盖“可发布/可部署”

**严重度：Major · 置信度：高**

**事实：**

- PR CI 运行 typecheck、`pnpm lint`、unit test 和 browser e2e（browser tests
  为独立 `e2e` job），并在两个 job 中先执行
  `pnpm install --frozen-lockfile && pnpm build` 构建全部发布包。
- PR CI 仍不运行 `pnpm build:docs` 或发布包 smoke test。
- 根 `lint` 脚本包含 `--fix`，CI 后没有 `git diff --exit-code`。
- `v*` tag workflow 中会再次执行构建并发布。
- Tag release workflow 不重新运行 unit/browser tests，并使用
  `pnpm install --no-frozen-lockfile`。

**推断：**

- 类型和测试通过并不能证明 pack entry、CSS 产物、publishConfig、SSG 或 registry
  构建可用。
- lint 在 CI 中修复文件但未检查差异时，可能让未提交的格式修复通过。
- 构建问题可能到打 tag 后才暴露。

**建议：**

1. CI 使用非修改模式 lint；若工具只提供 fix 模式，则之后运行
   `git diff --exit-code`。
2. 保持 package build job 覆盖所有实际发布包（root `pnpm build` 已覆盖
   build:libs 与 headless/ui/ui-x/admin/chart/sbean 六个目标，CI 已运行），
   关注其耗时与缓存。
3. 新增 docs SSG build smoke job。
4. 新增 tarball import smoke job，至少验证根入口、headless 子路径、UI CSS、
   Nuxt module、resolver 和 sbean MCP/schema 入口。
5. Release publish 必须依赖已通过的 commit 检查，或在 publish 前重跑必要 tests；
   默认使用 frozen lockfile，确需可变安装时记录原因。
6. 对耗时 job 使用路径过滤和 pnpm store cache；先测量，再决定是否需要远程构建
   缓存。

**验收条件：**

- PR 上能发现 pack、CSS、SSG、exports 和缺失 runtime dependency 错误。
- CI 检查后工作树必须保持干净。
- tag workflow 只重复已在 PR 验证的构建，不首次发现构建错误。
- 发布使用的依赖图与已验证 lockfile 一致。

### F3. 生成物不是原子批次，已有可复现漂移

**严重度：Major · 置信度：高**

**事实：**

- `rating` 已从 headless/UI 根 barrel 导出，并有 docs 示例、单测、API JSON、
  changelog JSON 和 locale 文案。
- **已解决：** 此前 rating 在 API/changelog 聚合 index、docs 菜单、docs
  locale 与中英文组件 Markdown 的缺口均已补齐；生成输出现按包命名空间化
  （`generated/api/ui/rating.json`、`generated/api/ui-x/…` 等），不再使用扁平
  的 `generated/api/rating.json` 路径。
- 英文 Markdown 有 134 个、中文有 140 个，存在 6 个路径级差异：中文仅有
  `month-picker`、`month-range-picker`、`time-picker`、`time-range-picker`、
  `year-picker`、`year-range-picker`；此前 `input-number`/`number-input`
  命名分歧已解决。`DocMd` 按相同 path 切换 locale，剩余差异仍可能导致语言
  切换 404。
- **已解决：** `docs/roadmap.md` 与 `docs/components.md` 曾以不同 shipped
  计数为基线（87/88），现已统一；rating 的应用生成面缺口已消除。（`components.md`
  已于 2026-09 并入 `roadmap.md`，两文档手工双维护的根因随之消除。）
- **已解决：** API/changelog 生成器曾把当前时间写入 `generatedAt`，使“重新生成后 git
  diff”不是确定性检查；现在写盘时会先与已提交内容比较，内容未变则保留原 `generatedAt`
  且不重写，生成因此完全确定性，可直接用 git diff 判定漂移。
- **已解决：** `release-execute` 曾只刷新 skills/changelog，不运行 `pnpm sui gen api`；
  现在发版链改用 `pnpm sui translate all`，它在翻译前会先刷新 api/changelog 生成数据
  （`gen api` 指纹命中时约 0.15s），API 新鲜度不再依赖人工记忆。

**推断：**

当前流程允许“逐组件文件更新、聚合 index/文档入口未更新”的半完成状态。时间戳
已不再是噪声来源（见事实），漂移判定可直接依赖 git diff。

**建议：**

1. **已提供：** `pnpm sui check generated` 重新生成全部生成面并与 git 对比，失败时
   列出漂移文件；`ci.yml` 已把它作为独立步骤（依赖上面的 `generatedAt` 与写盘确定性）。
2. 原子批次：生成器曾建议先写临时目录再整体替换。**未采纳：** 逐文件“内容未变则
   不重写”已能达到同样效果，且不需要临时目录。
3. **已解决：** 一致性比较中忽略 `generatedAt`，内容未变时保留原值（见 F3 事实）。
4. **已满足：** 确定性生成检查已进 PR CI；翻译不在 CI 中，`gen` 完全离线，
   不需要翻译服务凭据。
5. 增加 en/zh-CN 文件树集合差检查；先判定中文 picker 文件是兼容别名还是应删除，
   再统一 canonical path。
6. **已解决：** 见上方 `release-execute` 说明；发版前的 API 生成状态由
   `pnpm sui translate all` 的 prepare 阶段保证。
7. 组件完成清单中把“所有交付面集合相等”作为验收项，而不是若干独立人工步骤。
