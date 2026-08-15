# @soybeanjs/ui-x — AI 对话组件技术方案

> 定位：`@soybeanjs/ui` 的 **AI 扩展族**，提供企业级 AI 对话交互组件（对话气泡、流式输出、思考链、AI 输入编排、会话管理），对标 [Ant Design X](https://x.ant.design/) / Element Plus X / ai-elements-vue。
>
> 状态：`ui-x` 分支（2026-08-14）已完成 **20 个组件 + 9 个 composables 的 `headless-x` 拆解迁入**——9 个 composables、7 个 types 迁入 `packages/ui-x/src/{composables,types}/`，`packages/headless-x/` 已删除，ui-x 增补 `./composables`、`./types` exports；组件内部引用切换为 `@/composables`、`@/types`；playground/docs 消费者使用 `@soybeanjs/ui-x/types`；ui-x typecheck/test/build、playground/docs typecheck 全部通过。主线待办为分支合并。

## 1. 现状盘点（基于 `origin/ui-x` 分支）

### 1.1 分支内容

- `packages/ui-x/` — 带样式 AI 组件层：20 个组件目录（每组件 `xxx.vue + index.ts + types.ts` 三件套）、20 个 `scv()` 样式 recipe、9 个 composables、7 个类型文件、resolver、14 个测试（含迁入的 `use-sender.spec`）。（`packages/headless-x/` 已按 §4.1 拆解删除。）
- `docs/ui-x-roadmap.md`（738 行）— 分支独有的完整路线图 + ADR 决策记录（D1–D5）。
- docs / playground 接线：中英文组件文档页 20 × 2、页面路由、菜单、locales、`component-libraries.ts` 注册表、每组件 1–4 个示例。

### 1.2 组件与 composables 清单

| 优先级 | 组件（`Sx` 前缀）                                                                                     | composables                                                    |   状态    |
| :----: | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :-------: |
|   P0   | `SxBubble`、`SxBubbleList`、`SxSender`、`SxMarkdown`、`SxAttachments`、`SxFileCard`、`SxCodeBlock`    | useChat、useXStream、useTyping、useSender、useBubbleListScroll | ✅ 已实现 |
|   P1   | `SxConversations`、`SxWelcome`、`SxPrompts`、`SxSources`、`SxSuggestion`、`SxThink`、`SxThoughtChain` | useSend                                                        | ✅ 已实现 |
|   P2   | `SxActions`、`SxActionsCopy`、`SxActionsFeedback`、`SxFolder`、`SxNotification`、`SxMermaid`          | —                                                              | ✅ 已实现 |
|   P3   | —                                                                                                     | useRecord、`SxAudioPlayer`、`SxStackTrace`、`SxAgent`          |  ⬜ 未做  |

另有 5 个候选项延后至组件市场（sbean registry 模式），6+ 个列入范围外。

### 1.3 核心数据模型（`headless-x` types，待迁入）

- `ChatMessage`：`id / role / content / status / extraInfo`；`MessageStatus = local | loading | updating | success | error | abort`。
- 其余类型：`attachment.ts`、`conversation.ts`、`prompt.ts`、`source.ts`、`thought-chain.ts`。

## 2. 架构设计

### 2.1 分层与依赖方向（决策 D1）

```
ui-x ──► headless-x（拆解后：ui-x 包内 composables/）
  │
  ├──► @soybeanjs/headless（复用 useUiContext / provide{Name}Ui 注入模式）
  └──► @soybeanjs/ui（复用 popover / tooltip / button / avatar / scroll-area 等原子组件）
```

禁止：headless 层导入 ui-x / `@soybeanjs/ui`（与核心库铁律一致）。

### 2.2 包结构（合并后的目标形态）

```
packages/ui-x/
├── src/
│   ├── components/         # 20 个组件（Sx 前缀）
│   ├── composables/        # ← headless-x 迁入：use-chat / use-send / use-think / use-typing /
│   │                       #    use-x-stream / use-bubble-list-scroll / use-conversations /
│   │                       #    use-sender / use-thought-chain
│   ├── types/              # ← headless-x 迁入：ChatMessage 等 7 个类型文件
│   ├── styles/             # 与组件一一对应的 scv() recipe + index.css
│   ├── constants/components.ts   # Sx* 名称注册表（resolver 消费）
│   ├── resolver/index.ts   # unplugin-vue-components resolver
│   └── nuxt/index.ts       # Nuxt module
└── test/                   # 单测（vitest + happy-dom）
```

### 2.3 exports 设计

`.`（组件 barrel）、`./composables`、`./types`、`./resolver`、`./styles.css`、`./*`（组件子路径）。ui-x 是外围包中唯一带 `./composables` / `./types` 子路径的包（拆解自 headless-x 的历史原因）。

## 3. 核心功能

1. **流式对话**：`useXStream` 解析 SSE / ReadableStream；`useChat` 管理消息列表与发送生命周期（loading → updating → success/error/abort）。
2. **对话展示**：`SxBubble`（气泡，含 content/style/renderer/loading 子件）+ `SxBubbleList`（虚拟滚动 + `useBubbleListScroll` 自动吸底）。
3. **AI 输入编排**：`SxSender`（输入发送器，`useSender` 管控发送态）+ `SxAttachments` / `SxFileCard`（附件）+ `SxSuggestion` / `SxPrompts`（建议词）。
4. **推理可视化**：`SxThink` / `SxThoughtChain`（思考链）+ `SxMarkdown`（流式 Markdown，基于 markstream-vue）+ `SxMermaid` + `SxCodeBlock`（shiki 高亮）。
5. **会话管理**：`SxConversations` + `useConversations`。
6. **操作与反馈**：`SxActions` 系列（复制 / 反馈）+ `SxNotification` + `SxWelcome` + `SxSources`（引用来源）。

## 4. 实现路径

### 4.1 headless-x 拆解（已完成，EC-A04~A07 落地）

| 步骤 | 内容                                                                                                       | 状态 |
| :--: | :--------------------------------------------------------------------------------------------------------- | :--: |
|  1   | `headless-x/src/composables/*`（9 个）迁入 `packages/ui-x/src/composables/`                                |  ✅  |
|  2   | `headless-x/src/types/*`（7 个）迁入 `packages/ui-x/src/types/`                                            |  ✅  |
|  3   | `headless-x/test/specs/*` 迁入 `packages/ui-x/test/specs/`                                                 |  ✅  |
|  4   | 删除 `packages/headless-x/`，ui-x 移除 `@soybeanjs/headless-x` 依赖，补 `./composables`、`./types` exports |  ✅  |
|  5   | 评估 `use-x-stream` 是否上浮核心 headless（原子原语判据；当前单域独享则留 ui-x）                           |  ⬜  |

### 4.2 分支合并（任务 EC-G01，目标 2026-08-25）

- 已知冲突：main 已将 `ui-unocss` 重命名为 `unocss`，分支文档 / devDeps 中 `@soybeanjs/ui-uno` 引用需先重定向；pnpm-lock 需重新对齐。
- playground 扁平 examples（bubble / attachments / actions…）迁入 `examples/ui-x/`（任务 EC-F06）。

### 4.3 后续迭代（合并后）

1. P3 组件（`useRecord`、`SxAudioPlayer`、`SxStackTrace`、`SxAgent`）择机实现。
2. 文档内容填充：`[name].md` 组件文档 + menus 填充 + i18n（任务 EC-D02/D03/D05/D07）。
3. sbean registry `ui-x/*` 命名空间 items（任务 EC-E03）。

## 5. 技术选型

| 选型          | 决策                                                                                                           | 理由                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| 命名前缀      | `Sx`（区别于主库 `S`）                                                                                         | 区分核心与 AI 扩展族，参考 ant-design-x / Element Plus X 命名惯例（决策见分支 roadmap） |
| 流式 Markdown | `markstream-vue ^1.0.9`（**硬依赖**，锁 1.x）                                                                  | 流式分片渲染是 AI 对话核心体验；基础 chunk ≈277KB 已在分支 roadmap §4.2 论证            |
| 代码高亮      | `shiki >=1.0.0`（optional peer）                                                                               | 重特性按需启用，缺失时优雅回退                                                          |
| 图表 / 图形   | `mermaid ^11`（optional peer）                                                                                 | 同上                                                                                    |
| Nuxt 集成     | `nuxt >=4.0.0`、`@nuxt/kit`（optional peer）                                                                   | 对齐核心包的 Nuxt module 模式                                                           |
| 构建          | vite-plus `vp pack`（unbundle、dts.vue、neverBundle 聚合 workspace 依赖）+ `unocss` CLI 产出 `dist/styles.css` | 与 `packages/ui` 完全一致                                                               |
| 样式          | `scv()`（@soybeanjs/cva）+ UnoCSS                                                                              | 禁原始 CSS，对齐组件开发规范                                                            |

## 6. 兼容性考虑

- **体积**：markstream-vue 硬依赖 + shiki/mermaid 可选 peer——基础 chunk 控制在 ≈277KB（分支已验证）；重特性通过 peer 缺失回退保证不阻塞安装。
- **Nuxt**：提供 `./nuxt` module 与 resolver，peer 全部 optional，非 Nuxt 项目零额外成本。
- **版本**：lockstep 与核心包同版本（0.29.3）；单主干 main 发布。
- **UnoCSS**：用户侧需配置 `@soybeanjs/ui-uno` preset（注意 main 已改名，旧名 `@soybeanjs/ui-unocss` 引用需在文档中统一为 `@soybeanjs/ui-uno`）。
- **桌面优先**：与核心库范围一致，移动端 AI 场景（语音输入 UI 等）暂在范围外。

## 7. 风险

| 风险                                            | 缓解                                                           |
| :---------------------------------------------- | :------------------------------------------------------------- |
| headless-x 拆解迁移期间与 ui-x 分支后续提交冲突 | 合并窗口内冻结分支改动（2026-08-20 ~ 08-25）                   |
| markstream-vue 1.x 上游破坏性变更               | 锁定 `^1.0.9`，升级前跑 13 个单测 + playground 全量示例        |
| `use-x-stream` 上浮决策悬而未决                 | EC-A08 在 2026-08-25 前出结论；上浮则同步核心包 minor 版本说明 |
