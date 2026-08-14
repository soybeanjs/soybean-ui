# SoybeanUI 生态架构落地任务清单

> 本文档是 [ecosystem.md](./ecosystem.md)（生态架构方案）的执行任务追踪表。每个任务对应方案中的一个可落地工作项，标注优先级、负责人、时间窗与实时状态。
> 更新规则：每当完成、卡住或重启任一任务，立即更新对应行（状态 + 进度），并在「最近更新」追加一条记录。
> 基线生成日期：2026-08-14。当前基线分支：`main`（ui-x / admin / chart 临时分支尚未合并）。

## 0. 状态图例与总览

| 状态      | 含义                             |
| --------- | -------------------------------- |
| ✅ 已完成 | 交付物落地并通过对应验证         |
| 🔵 进行中 | 正在实施，附进度百分比           |
| ⚠️ 受阻   | 存在阻塞项，需先解除依赖         |
| ⬜ 未开始 | 尚未启动                         |
| 📋 待排期 | 已列入计划，暂不实施（如未来包） |

优先级：**P0** = 阻塞主线（必须先做）｜**P1** = 高优先（近期里程碑）｜**P2** = 中优先（容量允许时）｜**P3** = 低优先（择机）。

负责人约定：架构决策 / 发布由 **Soybean** 负责；编码与文档由 **AI Agent** 实施、Soybean 审核（验收后置为 ✅）。

### 总进度

| 阶段                    | 任务数 | 已完成 | 进行中 | 未开始 | 阶段进度  |
| ----------------------- | :----: | :----: | :----: | :----: | :-------: |
| A 架构与命名契约        |   8    |   5    |   1    |   2    |    68%    |
| B 分包骨架与依赖        |   8    |   7    |   1    |   0    |    94%    |
| C 功能组件实现          |   12   |   0    |   0    |   12   |    0%     |
| D 文档站                |   7    |   0    |   3    |   4    |    24%    |
| E sbean registry 与 CLI |   5    |   1    |   0    |   4    |    20%    |
| F 生成与 playground     |   7    |   1    |   0    |   6    |    14%    |
| G 迁移与发布            |   7    |   0    |   3    |   4    |    18%    |
| **合计**                | **54** | **14** | **8**  | **32** | **≈ 34%** |

> 当前处于「结构骨架已落地、业务功能与文档内容未填充」阶段——即方案 §10 checklist 的前置工作已大部分完成，§3/§6/§7/§8 的功能与分发部分待推进。

## 1. 阶段 A — 架构与命名契约（ecosystem.md §2/§3/§4）

| ID     | 任务描述                                                                                                                                                                                                    | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-A01 | 确定外围包分层模型（单包自治、核心 headless 唯一逻辑层）并输出 [ADR-0001](./adr/0001-peripheral-package-layering.md)                                                                                        |   P0   | Soybean  | 2026-08-13 | 2026-08-13 | ✅ 已完成 | 100% |
| EC-A02 | 更新 [CONTEXT.md](../CONTEXT.md) 术语表：外围包 / 原子原语 / 包装型组件 / 组件前缀 / 命名空间 registry item / 跨包依赖白名单 / lockstep 版本                                                                |   P0   | Soybean  | 2026-08-13 | 2026-08-14 | 🔵 进行中 | 70%  |
| EC-A03 | 删除 `packages/headless-x/` 包（`ui-x` 分支上的历史产物）                                                                                                                                                   |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-A04 | `headless-x` composables 迁入 `packages/ui-x/src/composables/`（use-chat / use-send / use-think / use-typing / use-x-stream / use-bubble-list-scroll / use-conversations / use-sender / use-thought-chain） |   P0   | AI Agent | 2026-08-14 | 2026-08-25 | ⬜ 未开始 |  0%  |
| EC-A05 | `headless-x` types 迁入 `packages/ui-x/src/types/`                                                                                                                                                          |   P0   | AI Agent | 2026-08-14 | 2026-08-25 | ⬜ 未开始 |  0%  |
| EC-A06 | `headless-x` test/specs 迁入 `packages/ui-x/test/specs/`                                                                                                                                                    |   P1   | AI Agent | 2026-08-14 | 2026-08-25 | ⬜ 未开始 |  0%  |
| EC-A07 | `packages/ui-x/package.json` 移除 `@soybeanjs/headless-x` 依赖；exports 增补 `./composables`、`./types` 子路径                                                                                              |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-A08 | 评估 `use-x-stream` 是否上浮核心 `@soybeanjs/headless`（§3.1「原子原语」判据）；单域独享则留 ui-x                                                                                                           |   P1   | Soybean  | 2026-08-14 | 2026-08-25 | ⬜ 未开始 |  0%  |

> 备注：EC-A04/A05/A06 的目录骨架已创建（见 `packages/ui-x/src/composables/index.ts` 占位），实际内容迁移待 `ui-x` 分支合并（EC-G01）或手工搬移后完成。

## 2. 阶段 B — 分包骨架与依赖（ecosystem.md §2.2/§5/§10.1-10.3）

| ID     | 任务描述                                                                                                                                                         | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-B01 | `@soybeanjs/ui-x` 包骨架：package.json（exports/peerDeps/scripts）+ src/{components,composables,types,styles,index.ts,resolver,nuxt} + tsconfig/vite.config/test |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B02 | `@soybeanjs/admin` 包骨架（同上，单包自治）                                                                                                                      |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B03 | `@soybeanjs/chart` 包骨架（新增包，对标 shadcn charts）                                                                                                          |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B04 | 根 [package.json](../package.json) 增补 `build:ui-x` / `build:admin` / `build:chart` 脚本并接入 `build` 依赖序（核心包之后）                                     |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B05 | 跨包白名单首条：`@soybeanjs/admin` → `@soybeanjs/chart`（`peerDependencies`，optional）                                                                          |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B06 | playground dependencies 补齐 `@soybeanjs/ui-x` / `@soybeanjs/admin` / `@soybeanjs/chart`                                                                         |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-B07 | CONTEXT.md「跨包依赖方向白名单」写入并维护（新增有向边须同步更新）                                                                                               |   P1   | Soybean  | 2026-08-14 | 2026-08-14 | 🔵 进行中 | 60%  |
| EC-B08 | [AGENTS.md](../AGENTS.md) + [architecture.md](./architecture.md) 补充 ui-x / admin / chart 到 WHERE TO LOOK 表与依赖图                                           |   P1   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |

> 前置依赖：EC-B01~B03 均为 EC-C（功能实现）的前置；EC-B05 为 EC-G03 的前置。

## 3. 阶段 C — 功能组件实现（ecosystem.md §1 包目标；核心剩余工作）

> 本阶段是当前主线。所有组件遵循组件开发规范（headless 包装型、UnoCSS 样式、前缀规则）。每组件交付含：源码 + playground examples + 文档条目（联动 D/E/F 阶段）。

### C1 · @soybeanjs/ui-x（AI 组件，前缀 `Sx`）

| ID     | 任务描述                                                                                         | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ------------------------------------------------------------------------------------------------ | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-C01 | 实现 ui-x composables（EC-A04 内容落地 + 补齐 use-x-stream 等）并通过单测                        |   P0   | AI Agent | 2026-08-14 | 2026-08-25 | ⬜ 未开始 |  0%  |
| EC-C02 | 实现 `SxBubble`（气泡，含 content/style/renderer/loading 等子件）                                |   P1   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C03 | 实现 `SxSender`（输入发送器）                                                                    |   P1   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C04 | 实现 `SxThoughtChain`（思考链）                                                                  |   P1   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C05 | 实现 ui-x 其余组件（Attachments / Actions / useConversations 配套等），完整导出至 `src/index.ts` |   P2   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |

### C2 · @soybeanjs/admin（后台应用壳，前缀 `S` + `App*`）

| ID     | 任务描述                        | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-C06 | 实现 `SAppLayout`（应用壳布局） |   P0   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C07 | 实现 `SAppMenu`（侧边菜单）     |   P1   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C08 | 实现 `SAppBreadcrumb`（面包屑） |   P1   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-C09 | 实现 admin 其余壳组件并完整导出 |   P2   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |

### C3 · @soybeanjs/chart（图表，前缀 `S` + `Chart*`）

| ID     | 任务描述                                                 | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | -------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-C10 | 实现 `SChartBar`（柱状图）                               |   P0   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C11 | 实现 `SChartLine`（折线图）                              |   P0   | AI Agent | 2026-08-14 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-C12 | 实现 chart 其余图表（对标 shadcn charts 清单）并完整导出 |   P2   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |

## 4. 阶段 D — 文档站（ecosystem.md §7）

| ID     | 任务描述                                                                                                            | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ------------------------------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-D01 | 文档站路由命名空间化：`/ui-x` `/admin` `/chart` 页面骨架（index / installation / quick-start / [name]）             |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | 🔵 进行中 | 50%  |
| EC-D02 | docs 内容撰写（en/zh-CN）：各包 index / installation / quick-start 实际文案（含包切换落地页分层共享 §7.4）          |   P1   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-D03 | 各组件 `[name].md` 文档 + `<UsageCode>` / `<PlaygroundGallery>` / `<ComponentApi>` 引用（联动 C/E/F 阶段）          |   P1   | AI Agent | 2026-08-20 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-D04 | 顶部包切换器：header 下拉（UI/UI-X/Admin/Chart）+ `shouldShowSidebar` 适配 + 侧边栏 menu data 切换                  |   P0   | AI Agent | 2026-08-14 | 2026-08-18 | 🔵 进行中 | 40%  |
| EC-D05 | [menus.ts](../apps/docs/src/constants/menus.ts) 的 `uiXMenuData` / `adminMenuData` / `chartMenuData` 随组件落地填充 |   P1   | AI Agent | 2026-08-18 | 2026-08-31 | 🔵 进行中 | 10%  |
| EC-D06 | `/registry`（或各包命名空间 registry 子页）：按 `package` 分组展示 sbean 条目 + `sbean add` 命令 + 源码链接（§7.5） |   P2   | AI Agent | 2026-08-20 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-D07 | i18n 文案：docs locale（en/zh-CN）与 playground example 标题 key 补齐                                               |   P1   | AI Agent | 2026-08-20 | 2026-08-31 | ⬜ 未开始 |  0%  |

> 前置：EC-D01 已完成骨架；EC-D04 的 header-nav 入口已存在（见 [header-nav.vue](../apps/docs/src/components/header-nav.vue)），下拉交互与侧边栏联动待完成。

## 5. 阶段 E — sbean registry 与 CLI（ecosystem.md §6）

| ID     | 任务描述                                                                                                              | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | --------------------------------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-E01 | [registry.json](../packages/sbean/registry.json) 顶层增补 `packages` 元数据（ui / ui-x / admin / chart）              |   P0   | AI Agent | 2026-08-14 | 2026-08-14 | ✅ 已完成 | 100% |
| EC-E02 | 既有 items 命名空间化：`accordion` → `ui/accordion` 并附 `package: "ui"` 字段（§11.4）                                |   P0   | AI Agent | 2026-08-18 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-E03 | 新增 `ui-x/*`、`admin/*`、`chart/*` 命名空间 items（随 C 阶段组件产出）                                               |   P1   | AI Agent | 2026-08-20 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-E04 | sbean CLI：`getComponentSlug` / `fetchRegistryItem` 适配命名空间路径，保留无前缀别名兼容（`sbean add bubble` 仍可用） |   P0   | AI Agent | 2026-08-18 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-E05 | CLI 命令验证：`sbean add <pkg>/<component>`、`sbean list --package`、`sbean docs <item>` 命名空间文档链接             |   P1   | AI Agent | 2026-08-20 | 2026-08-31 | ⬜ 未开始 |  0%  |

## 6. 阶段 F — 生成链路与 playground（ecosystem.md §7.3/§8）

| ID     | 任务描述                                                                                                                           | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-F01 | [scripts/cli.ts](../scripts/cli.ts) `api` 命令改为遍历 `packages` 元数据；输出迁至 `generated/api/<pkg>/<component>.json`（§11.5） |   P0   | AI Agent | 2026-08-20 | 2026-08-30 | ⬜ 未开始 |  0%  |
| EC-F02 | `changelog` / `changelog-locales` 命令同步多包化（`generated/changelog/<pkg>/`）                                                   |   P1   | AI Agent | 2026-08-20 | 2026-08-30 | ⬜ 未开始 |  0%  |
| EC-F03 | `<ComponentApi>` / `<PlaygroundGallery>` 渲染按当前路由命名空间定位子目录                                                          |   P0   | AI Agent | 2026-08-20 | 2026-08-30 | ⬜ 未开始 |  0%  |
| EC-F04 | playground 顶部包切换器（镜像 docs，切到 `examples/<pkg>/` 入口与导航，§8.2）                                                      |   P1   | AI Agent | 2026-08-18 | 2026-08-28 | ⬜ 未开始 |  0%  |
| EC-F05 | core examples 迁移收尾：`examples/ui/` 迁移后 docs 引用 / playground 导航 / `AGENTS.md` Demo source 路径终验                       |   P0   | AI Agent | 2026-08-14 | 2026-08-18 | 🔵 进行中 | 80%  |
| EC-F06 | `ui-x` 分支扁平 examples（bubble / attachments / actions …）迁入 `examples/ui-x/`（§11.3 step 3）                                  |   P2   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |
| EC-F07 | 各外围包组件 examples 撰写（`examples/{ui-x,admin,chart}/<component>/`，随 C 阶段产出）                                            |   P1   | AI Agent | 2026-08-18 | 2026-08-31 | ⬜ 未开始 |  0%  |

## 7. 阶段 G — 迁移、版本与发布（ecosystem.md §9/§11）

| ID     | 任务描述                                                                                      | 优先级 | 负责人   | 开始       | 目标完成   | 状态      | 进度 |
| ------ | --------------------------------------------------------------------------------------------- | :----: | -------- | ---------- | ---------- | --------- | :--: |
| EC-G01 | 合并 `ui-x` 分支到 `main`（含 §11.2 headless-x 拆解收尾，即 EC-A04~A06 内容落地）             |   P0   | Soybean  | 2026-08-14 | 2026-08-31 | 🔵 进行中 | 20%  |
| EC-G02 | 合并 `chart` 分支到 `main`（新建包；骨架已入 main，功能待 C3 完成）                           |   P0   | Soybean  | 2026-08-14 | 2026-08-31 | 🔵 进行中 | 15%  |
| EC-G03 | 合并 `admin` 分支到 `main`（接入 admin→chart peerDep，即 EC-B05）                             |   P0   | Soybean  | 2026-08-14 | 2026-08-31 | 🔵 进行中 | 15%  |
| EC-G04 | 每步合并后验证：`pnpm typecheck` + `pnpm test` + `pnpm build`                                 |   P0   | AI Agent | 2026-08-14 | 2026-09-01 | ⬜ 未开始 |  0%  |
| EC-G05 | 合并完成后归档/删除 `ui-x` / `admin` / `chart` 临时分支；后续走短生命周期 feature branch      |   P1   | Soybean  | 2026-09-01 | 2026-09-05 | ⬜ 未开始 |  0%  |
| EC-G06 | lockstep 版本（当前 0.29.3）与单 tag 发布流程验证：`pnpm publish -r` + `release.yml` 全包同发 |   P1   | Soybean  | 2026-09-01 | 2026-09-10 | ⬜ 未开始 |  0%  |
| EC-G07 | 未来包预留：`@soybeanjs/ui-pro` / `@soybeanjs/ui-lowcode` 接入契约清单（§10）演练             |   P3   | Soybean  | —          | —          | 📋 待排期 |  0%  |

## 8. 依赖与阻塞关系

```
EC-B01~B03 (骨架) ──► EC-C (功能实现) ──► EC-D03 / EC-E03 / EC-F07 (文档与分发条目)
        │                                  │
        └──► EC-A04~A06 ◄── ui-x 分支内容（EC-G01 合并）
EC-E02/E04 ──► EC-F01~F03 (生成链路依赖命名空间)
EC-G01/G02/G03 ──► EC-G04 (验证) ──► EC-G05 (归档分支) ──► EC-G06 (发布)
```

## 9. 最近更新

- **2026-08-14（基线）**：生成本文档。核对仓库实际状态：包骨架、根脚本、registry `packages` 元数据、core examples 迁移、header 入口均已完成；功能组件、docs 内容、registry 命名空间化、sui 多包生成、分支合并均未完成或进行中。
