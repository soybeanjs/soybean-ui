# SoybeanUI 任务跟踪系统（Task Tracking）

> 本文档是全部路线任务的**唯一状态跟踪表**，与 [tasks.md](./tasks.md)（任务拆解）配合使用：tasks.md 定义任务与子任务，本文档记录其**状态、进度、负责人与时间节点**。
>
> **更新规则**：每当任务完成、卡住或重启，立即更新对应行（状态 + 进度 + 备注），并在「最近更新」追加一条记录。子任务级进度见 [tasks.md](./tasks.md)，本表只维护任务级状态。
>
> 基线生成：2026-08-14（基线分支 `main`；`ui-x` / `admin` / `ecosystem` 临时分支尚未合并）。

## 0. 图例与约定

|     状态      | 含义                                    |
| :-----------: | :-------------------------------------- |
|   ✅ 已完成   | 交付物落地并通过对应验证                |
|   🔵 进行中   | 正在实施，附进度百分比                  |
| Ⓜ️ 分支待合并 | 已在临时分支实现，待按合并计划进入 main |
|    ⚠️ 受阻    | 存在阻塞项，备注中说明                  |
|   ⬜ 未开始   | 尚未启动                                |
|   📋 待排期   | 已列入计划，暂不实施                    |

优先级三级映射：**高** = P0/P1（阻塞主线或近期里程碑）｜**中** = P2（容量允许时）｜**低** = P3（择机）。

负责人约定：**Soybean**（架构决策 / 合并发布 / 验收）、**AI Agent**（编码与文档实施，Soybean 验收后置 ✅）。

## 1. 总览

| 工作流                        | 任务数 | ✅  | Ⓜ️  | 🔵  | ⬜/📋 | 完成度 |
| :---------------------------- | :----: | :-: | :-: | :-: | :---: | :----: |
| W1 生态基础与合并（EC-M1~M5） |   5    |  0  |  0  |  3  |   2   | ≈ 20%  |
| W2 ui-x（UX-1~2）             |   2    |  0  |  1  |  0  |   1   | ≈ 35%  |
| W3 admin（AD-1~3）            |   3    |  0  |  1  |  0  |   2   | ≈ 30%  |
| W4 chart（CH-0~2）            |   3    |  0  |  0  |  0  |   3   |   0%   |
| W5 ui-pro（PRO-1）            |   1    |  0  |  0  |  0  |   1   |   0%   |
| W6 editor（ED-1~4）           |   4    |  0  |  0  |  0  |   4   |   0%   |
| W7 工程优化（OPT-F1~F11）     |   11   |  0  |  0  |  1  |  10   |  ≈ 3%  |
| W8 核心组件（CMP-1~6）        |   6    |  0  |  0  |  1  |   5   |  ≈ 2%  |

## 2. 高优先级（High）

### 生态主线

| ID    | 任务                            |       负责人       | 目标完成 | 状态 | 进度 | 备注                                                     |
| :---- | :------------------------------ | :----------------: | :------: | :--: | :--: | :------------------------------------------------------- |
| EC-M1 | 分支合并与 headless-x 拆解      | Soybean + AI Agent |  08-31   |  🔵  | 15%  | 骨架已备；包名冲突预处理（EC-M1.1）为当前动作            |
| EC-M2 | sbean registry 命名空间化与 CLI |      AI Agent      |  08-31   |  🔵  | 20%  | `packages` 元数据已在 ecosystem 分支落地（EC-E01）       |
| EC-M3 | `pnpm sui` 多包生成             |      AI Agent      |  08-30   |  ⬜  |  0%  | 依赖 EC-M1.2                                             |
| EC-M4 | 文档站与 playground 多包化      |      AI Agent      |  08-31   |  🔵  | 35%  | 页面骨架 / header 入口 / examples 迁移（80%）在分支落地  |
| EC-M5 | lockstep 发布                   |      Soybean       |  09-10   |  ⬜  |  0%  | 依赖 EC-M1 + 各包 P0 组件                                |
| UX-1  | ui-x 迁移收尾与验收             |      AI Agent      |  08-25   |  Ⓜ️  | 70%  | 20 组件 + 9 composables 已实现；单测补齐与交付面核对待做 |
| AD-1  | admin M2 验收                   |      AI Agent      |  08-25   |  Ⓜ️  | 80%  | T6–T8 已勾；e2e 断言拆分 + typecheck 解阻（联动 F8）遗留 |
| CH-0  | chart 渲染引擎选型              |      Soybean       |  08-18   |  ⬜  |  0%  | 建议 unovis 首选，限时出 ADR                             |
| CH-1  | chart P0 图元（Bar/Line/容器）  |      AI Agent      |  08-28   |  ⬜  |  0%  | 依赖 CH-0 + EC-M1.2                                      |

### 工程优化（阶段 A/B/C 高优项）

| ID     | 任务                    |  负责人  | 目标完成 | 状态 | 进度 | 备注                                        |
| :----- | :---------------------- | :------: | :------: | :--: | :--: | :------------------------------------------ |
| OPT-F1 | Workspace 依赖闭包补齐  | AI Agent |  08-28   |  ⬜  |  0%  | 审计清单已就绪（optimize.md F1 事实列表）   |
| OPT-F2 | PR CI 覆盖可发布/可部署 | AI Agent |  08-28   |  ⬜  |  0%  | —                                           |
| OPT-F3 | 生成物原子批次          | AI Agent |  09-11   |  ⬜  |  0%  | Rating 缺口（F3.1）可先行                   |
| OPT-F6 | 高影响 seam 契约测试    | AI Agent |  10-09   |  ⬜  |  0%  | createTheme / presetUiUnocss / useUiContext |

### 核心组件

| ID    | 任务                                                |  负责人  | 目标完成 | 状态 | 进度 | 备注                             |
| :---- | :-------------------------------------------------- | :------: | :------: | :--: | :--: | :------------------------------- |
| CMP-1 | P0 组件 9 个（Upload/Timeline/Typography 等，≈25d） | AI Agent | 2026 Q4  |  ⬜  |  0%  | 依赖 EC-M5；组件级状态随开工细化 |
| CMP-2 | P1 组件 13 个（≈30d）                               | AI Agent | 2027 Q1  |  ⬜  |  0%  | 依赖 CMP-1                       |

## 3. 中优先级（Medium）

| ID     | 任务                                                   |       负责人       | 目标完成 | 状态 | 进度 | 备注                                                                                                                        |
| :----- | :----------------------------------------------------- | :----------------: | :------: | :--: | :--: | :-------------------------------------------------------------------------------------------------------------------------- |
| UX-2   | ui-x P3 组件（useRecord/AudioPlayer/StackTrace/Agent） |      AI Agent      |   择机   |  ⬜  |  0%  | 依赖 UX-1                                                                                                                   |
| AD-2   | admin M3：SAppProTable + SAppProForm（≈10d）           |      AI Agent      | 2026-09  |  ⬜  |  0%  | 依赖 EC-M1.5；schema 模型已预留                                                                                             |
| CH-2   | chart 其余图元（Area/Pie/Sparkline/Heatmap，≈10d）     |      AI Agent      |  08-31   |  ⬜  |  0%  | 依赖 CH-1                                                                                                                   |
| ED-1   | editor 立项确认与包骨架（Tiptap peer 接线，≈3d）       | Soybean + AI Agent | 2026-09  |  ⬜  |  0%  | 依赖 EC-M5；方案见 [editor.md](./ecosystem/editor.md)，Collaboration 扩展许可待验证                                         |
| ED-2   | editor P0 组件（容器/内容/工具栏/气泡，≈12d）          |      AI Agent      | 2026-10  |  ⬜  |  0%  | 依赖 ED-1                                                                                                                   |
| OPT-F4 | docs↔playground 依赖单向化                             |      AI Agent      |  阶段 D  |  ⬜  |  0%  | 需 docs build 基线                                                                                                          |
| OPT-F5 | docs 构建图按需加载                                    |      AI Agent      |  阶段 D  |  ⬜  |  0%  | 同上                                                                                                                        |
| OPT-F7 | 构建图与依赖图对齐                                     |      AI Agent      |  10-09   |  ⬜  |  0%  | 依赖 OPT-F1                                                                                                                 |
| OPT-F8 | TypeScript 版本统一                                    |      Soybean       |  10-09   |  ⬜  |  0%  | **阻塞 AD-1.2**，建议提前                                                                                                   |
| CMP-3  | P2 组件 11 个（≈26d）                                  |      AI Agent      |   2027   |  ⬜  |  0%  | 容量穿插                                                                                                                    |
| CMP-5  | 组件市场 11 项（RichTextEditor 已转 editor 包）        | AI Agent + Soybean |   按需   |  ⬜  |  0%  | 依赖 EC-M2 + 需求信号                                                                                                       |
| CMP-6  | Headless 准入整改（解剖壳冻结 / Alert role / 装饰槽）  |      AI Agent      |   穿插   |  🔵  | 20%  | 清单已落盘；CMP-6.1 规范侧完成；代码整改未开工。见 [headless-admission-remediation.md](./headless-admission-remediation.md) |

## 4. 低优先级（Low）

| ID      | 任务                                               |  负责人  | 目标完成 | 状态 | 进度 | 备注                                                         |
| :------ | :------------------------------------------------- | :------: | :------: | :--: | :--: | :----------------------------------------------------------- |
| PRO-1   | ui-pro 立项评估（含 ui-lowcode 合并决策）          | Soybean  | 2026 Q4  |  📋  |  0%  | 依赖 EC-M5 + 市场需求数据；RichTextEditor 候选已转 editor 包 |
| AD-3    | admin M4+（MultiTab/CommandPalette 等，≈14d）      | AI Agent | 2026 Q4  |  ⬜  |  0%  | 依赖 AD-2                                                    |
| ED-3    | editor P1（slash 命令/图片上传/Markdown，≈10d）    | AI Agent |   择机   |  ⬜  |  0%  | 依赖 ED-2；图片上传另依赖 CMP-1.9（核心库 `Upload`）         |
| ED-4    | editor P2（表格增强/DragHandle/数学/目录，≈8d 起） | AI Agent |   择机   |  ⬜  |  0%  | 依赖 ED-3；数学依赖 CMP-4 `Equation`                         |
| OPT-F9  | 类型逃逸治理                                       | AI Agent |   持续   |  ⬜  |  0%  | 先建例外清单 + 禁止新增基线                                  |
| OPT-F10 | 文档单一事实源                                     | AI Agent |   持续   |  🔵  | 30%  | 2026-08-02 评估轮已修正部分计数漂移                          |
| OPT-F11 | 覆盖率量化                                         | AI Agent |   持续   |  ⬜  |  0%  | 依赖 OPT-F6 基线                                             |
| CMP-4   | P3 组件 12 个（≈22d）                              | AI Agent |   择机   |  ⬜  |  0%  | 可转组件市场                                                 |

## 5. 阻塞与风险登记

| 事项                                                  | 影响                           | 关联任务         | 缓解                                       |
| :---------------------------------------------------- | :----------------------------- | :--------------- | :----------------------------------------- |
| main 已将 `ui-unocss` 改名 `unocss`，三分支仍引用旧名 | 合并冲突（依赖 + lock + 文档） | EC-M1            | EC-M1.1 预处理重定向，合并窗口 08-14~08-31 |
| TS 6.0.3 锁定 vs 7.0.2 声明分裂 + vue-tsc 工具链 bug  | admin 包 typecheck 阻塞        | AD-1.2、OPT-F8   | F8 提前执行；短期 package 级门禁           |
| Vue 3.5 重渲染 bug 导致 e2e 断言拆分                  | admin M2 验收                  | AD-1.1           | e2e 修复任务单列（1.5d）                   |
| chart 渲染引擎未选型                                  | 阻塞 CH-1/CH-2 与 AD-2.3       | CH-0             | 限时 08-18 出 ADR，默认按 unovis 推进      |
| 生态合并与优化阶段 A 时间窗重叠（08-14~08-28）        | 资源抢占                       | EC-M*、OPT-F1/F2 | 合并主线优先；F1/F2 可穿插在合并等待期执行 |

## 6. 最近更新

- **2026-08-28（增量）**：新增 CMP-6 Headless 准入整改。规范落入 skill `layers.md`；组件级清单见 [headless-admission-remediation.md](./headless-admission-remediation.md)。清单已建（进度 20%），Alert role / 装饰槽 / NavMenu 合并尚未开工。
- **2026-08-14（增量）**：新增生态包 `@soybeanjs/editor`（富文本编辑器，Tiptap 内核）——市场调研与 Tiptap 收费边界核实完成，方案见 [ecosystem/editor.md](./ecosystem/editor.md)；新增工作流 W6（ED-1~4），原 W6/W7 顺延为 W7/W8；`RichTextEditor` 从组件市场候选与 ui-pro 候选中移除（CMP-5 12 项 → 11 项）。
- **2026-08-14（基线）**：建立本跟踪系统。汇总自：ecosystem 分支任务清单（54 项，阶段 A/B 骨架已落地）、ui-x 分支（20 组件已实现待合并）、admin 分支（M1 完成、M2 待验收）、optimize.md（F1–F11）、核心组件路线图（45 个活跃组件）。任务级编号与拆解见 [tasks.md](./tasks.md)。
