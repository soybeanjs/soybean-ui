# @soybeanjs/ui-x — AI 组件路线图 (Roadmap)

> 本文档规划 `@soybeanjs/ui-x`：面向 AI 界面（对话、流式输出、思考链、输入编排）的 Vue 3 组件包。
> 依据对 `vuepont/ai-elements-vue`、`element-plus-x/Element-Plus-X`、`antdv-next/x` 三个参考项目的探索分析，结合本仓库 headless/styled 分层架构与 `@soybeanjs/ui` 组件族约定编制。
>
> 按 **高 / 中 / 低** 三级优先级对所有待实现 AI 组件进行分类排列，并附「延后至组件市场」「范围外」清单。
> 命名与架构决策见文末「决策记录」一节。

---

## 1. 概述

`@soybeanjs/ui-x` 是 `@soybeanjs/ui` 的 AI 扩展族，定位为**企业级 AI 交互组件库**：对话气泡、流式输出、思考链、AI 输入编排、会话管理。它复用现有 `@soybeanjs/ui` 的原子组件与 `@soybeanjs/headless` 的组合式能力，保持与主库一致的视觉与体验。

| 类别            | 数量 | 说明                                           |
| :-------------- | :--: | :--------------------------------------------- |
| v1 里程碑（P0） |  10  | 核心对话三元组 + 流式基础 + Markdown，优先实现 |
| 高优先级（P1）  |  8   | 会话管理、引用、附件、建议，下一里程碑实现     |
| 中优先级（P2）  |  6   | 思考链、反馈动作、文件卡、通知等               |
| 低优先级（P3）  |  4   | 语音、工作流画布、agent 等小众或高成本组件     |
| 延后至组件市场  |  5   | 复合型 / 小众，以源码形式分发                  |
| 范围外          |  6+  | 依赖独立生态（图表、富文本）、业务专属         |

### 优先级图例

| 等级 | 标签   | 含义                             |
| :--: | :----- | :------------------------------- |
|  P0  | Core   | 核心对话闭环，v1 里程碑必做。    |
|  P1  | High   | 强需求，下一里程碑实现。         |
|  P2  | Medium | 有用、中等需求，容量允许时安排。 |
|  P3  | Low    | 小众或高成本，择机实现。         |

### 评估维度

每个组件基于以下维度评估（沿用主库 Methodology）：

- **功能独立性 (Functional independence)** — 单一聚焦职责。
- **可复用性 (Reusability)** — 能否独立使用，无需大量组合。
- **需求度 (Demand)** — 三个参考项目中出现的数量（共识信号）。
- **契合度 (Alignment)** — 与桌面优先、headless/styled、企业级定位的契合。
- **工作量 (Effort)** — Low / Medium / High。

---

## 2. 命名与包结构（决策记录 D1）

> 对应 Round-1 Q1/Q2 的推荐结论。

### 2.1 包命名

- **npm 包名**：`@soybeanjs/ui-x`
- **目录**：`packages/ui-x/`
- **组件前缀**：**`Sx`**（如 `SxBubble`、`SxSender`、`SxThoughtChain`）

选择理由：

- 与 `@soybeanjs/ui` 命名族保持一致（`ui` → `ui-x`），明确「ui 的 AI 扩展」信号。
- `Sx` 沿袭三个参考项目「X = AI 扩展」的惯例，且不与主库 `S*` 前缀冲突，避免全局注册碰撞。
- 备选 `@soybeanjs/ai` / `Sai` 更简洁，但偏离 `ui*` 命名族，弱化「扩展」语义。

### 2.2 分层架构（复用 headless/styled 纪律）

遵循仓库硬性不变式：**`headless`（逻辑/状态/a11y，零样式）→ `ui`（UnoCSS 样式包装）**。

- **AI 逻辑层**：新增轻量 `packages/ui-x/`（`@soybeanjs/headless-x`），承载可复用的 AI 逻辑：消息模型、流式解析、打字机、Markdown 流式解析、语音识别。零样式。
- **样式层**：`packages/ui-x/`（`@soybeanjs/ui-x`），提供 `Sx*` 样式包装，复用 `@soybeanjs/ui` 的原子组件（`popover`、`tooltip`、`button`、`input`、`avatar`、`scroll-area`、`virtualizer`…）。

依赖方向保持单向：`ui-x → headless-x → headless`，`ui-x → ui`。`headless-x` 不得导入 `ui-x`。

```text
packages/
├── headless/        # @soybeanjs/headless（现有，原子逻辑）
├── headless-x/      # @soybeanjs/headless-x（新增，AI 逻辑）
├── ui/              # @soybeanjs/ui（现有，原子样式）
└── ui-x/            # @soybeanjs/ui-x（新增，AI 样式包装）
```

### 2.3 与主库的边界

- `headless-x` 只导入 `@soybeanjs/headless` 公共入口，不导入 `@soybeanjs/ui`。
- `ui-x` 导入 `@soybeanjs/ui`（原子）与 `@soybeanjs/headless-x`（AI 逻辑）。
- 复用 `useUiContext` / `provide{Name}Ui` 注入模式实现运行时类注入。

---

## 3. 流式传输与数据模型（决策记录 D2）

> 对应 Round-1 Q4 的推荐结论。

### 3.1 通用消息数据模型

`ChatMessage` 是贯穿全包的一等模型（参考 `antdv-next/x` 的 `BubbleItemType` / `XModelMessage`）：

```ts
interface ChatMessage {
  /** 唯一标识 */
  id: string;
  /** 角色：ai / user / system / divider，或任意自定义字符串 */
  role: 'ai' | 'user' | 'system' | 'divider' | (string & {});
  /** 文本内容；AI 消息在流式过程中持续更新 */
  content: string;
  /** 消息状态（见下） */
  status?: MessageStatus;
  /** 附加元信息（token 用量、推理内容、引用来源等） */
  extraInfo?: Record<string, unknown>;
}

type MessageStatus = 'local' | 'loading' | 'updating' | 'success' | 'error' | 'abort';
```

### 3.2 传输无关的流式组合式函数

不捆绑任何厂商 SDK（参考 `element-plus-x` 的 `useXStream`）：

- **`useXStream`** — 消费任意 `ReadableStream`，按分隔符解析 SSE 分块，暴露 `data / error / loading / cancel`。
  - 默认分隔符对齐 `ant-design-x`：`\n\n`（流分隔）、`\n`（part 分隔）、`:`（key-value 分隔），可配置。
  - 基于浏览器 `fetch` Streaming API + `TransformStream`，协议无关。
- **`useSend`** — 前端「发送中」状态控制（`send / abort / finish / loading`），供按钮 / 语音开关使用。
- **可选厂商适配器** — 提供轻量 OpenAI / DeepSeek 适配器（把厂商流转换为统一格式），但**不随包捆绑**；消费者自带请求层。

### 3.3 打字机与流式 UI

- **`useTyping`** — 打字机效果组合式函数（`effect: 'typing' | 'fade-in'`、`step`、`interval`、`keepPrefix`），供 `SxBubble` 的 `typing` prop 使用。
- **`useChat`** — 高层组合式函数：管理 `messages` 数组、`isRequesting`、`onRequest` 回调，封装「发送 → 追加 user 消息 → 请求 → 流式填充 AI 消息」。

---

## 4. Markdown 渲染（决策记录 D3）

> 对应 Round-1 Q5 的推荐结论 + markstream-vue 集成评估。

流式 Markdown 是核心体验。**推荐集成 `markstream-vue`**（`Simon-He95/markstream-vue`）作为 `SxMarkdown` 的流式渲染底座，而非自研解析器。

### 4.1 为何集成 markstream-vue

- 专为 LLM 流式输出设计（Vue 3 / Nuxt / VitePress），MIT，非常活跃（3189 commits，2026-08 仍在更新）。
- 已完整解决流式 Markdown 最难的工程问题：**未完成代码围栏**（保持 `<pre>` loading 态、不跳变）、**内联数学**（`\(` 开启器等待闭合，避免闪烁）、**流式表格**（等待 `</table>`）、**自定义标签**（如 `<thinking>` 声明为自定义节点）。
- **双输入路径**：`content`（原始字符串）或 `nodes`（预解析 AST）——非常适合被 `SxMarkdown` 薄包装；可在 worker / 服务端解析后把 AST 传给客户端，天然 SSR-safe。
- **安全默认**：`htmlPolicy`（`safe`/`escape`/`trusted`）、默认禁 iframe/embed、mermaid strict，符合可访问性与安全纪律。

### 4.2 集成方式

- **`SxMarkdown`** 组件薄包装 markstream-vue 的 `MarkdownRender`（`ui-x` 提供样式与 `provideMarkdownUi(ui)` 注入）。
- **可选**：在 `@soybeanjs/headless-x` 暴露 `useSmoothMarkdownStream` 等价包装（把 bursty token 流稳定化为 `visible`/`final`/`pendingChars`），供 `SxBubble` 的 `isMarkdown` + `typing` 组合使用。
- **依赖策略**：`markstream-vue` 为**直接依赖**（保证开箱可用）；其重 peer（`mermaid`、`katex`、代码运行时/`stream-diffs`）保持**可选**，缺失时优雅回退。不再直接依赖 `marked` / `shiki`。
- **版本锁定**：锁定 **1.x** 稳定线（npm `latest` 1.x）；2.0.0-beta 为破坏性发布（移除 Monaco/`stream-markdown`），除非明确需要 `stream-diffs` 增强，暂不跟随。
- **性能**：长响应时「每 chunk 重解析」成本线性增长，启用其节点虚拟化（`maxLiveNodes`/`liveNodeBuffer`）与批量渲染（rAF/idle 分片）缓解。
- **体积权衡**：基础主 chunk ≈ 277KB、完整 dist ≈ 980KB（重 peer 不计入基础包）。流式 Markdown 是核心体验里真正难啃的部分，自研重造的正确性风险远超包体积成本；重特性由用户按需启用，保持核心可控。
- **浅色 / 深色**：`isDark` prop 或 `.dark` 祖先类，跟随 `SConfigProvider`。

---

## 5. 高优先级（High — P0 Core + P1 High）

### 概要

#### P0 — Core（10 个）

| 序号 | 组件            | 需求度 | 工作量 | 状态      |
| :--: | :-------------- | :----: | :----: | :-------- |
|  1   | `SxBubble`      |  3/3   | Medium | ✅ 已实现 |
|  2   | `SxBubbleList`  |  3/3   |  High  | ✅ 已实现 |
|  3   | `SxSender`      |  3/3   |  High  | ✅ 已实现 |
|  4   | `SxMarkdown`    |  3/3   | Medium | ✅ 已实现 |
|  5   | `useChat`       |  3/3   | Medium | ✅ 已实现 |
|  6   | `useXStream`    |  3/3   |  Low   | ✅ 已实现 |
|  7   | `useTyping`     |  3/3   |  Low   | ✅ 已实现 |
|  8   | `SxAttachments` |  3/3   | Medium | ✅ 已实现 |
|  9   | `SxFileCard`    |  3/3   |  Low   | ✅ 已实现 |
|  10  | `SxCodeBlock`   |  2/3   | Medium | ✅ 已实现 |

#### P1 — High（8 个）

| 序号 | 组件              | 需求度 | 工作量 | 状态      |
| :--: | :---------------- | :----: | :----: | :-------- |
|  11  | `SxConversations` |  3/3   | Medium | ✅ 已实现 |
|  12  | `SxWelcome`       |  2/3   |  Low   | ✅ 已实现 |
|  13  | `SxPrompts`       |  2/3   |  Low   | ✅ 已实现 |
|  14  | `SxSources`       |  2/3   |  Low   | ✅ 已实现 |
|  15  | `SxSuggestion`    |  2/3   |  Low   | ✅ 已实现 |
|  16  | `SxThink`         |  2/3   | Medium | ✅ 已实现 |
|  17  | `SxThoughtChain`  |  3/3   | Medium | ✅ 已实现 |
|  18  | `useSend`         |  2/3   |  Low   | ✅ 已实现 |

### 详细条目

---

#### 1. `SxBubble` — P0 Core | Demand: 3/3 | Effort: Medium

**Purpose:** 单条对话气泡（user / ai），核心原子消息单元。

**Functionality:**

- `content` / `placement`（`start`/`end`）/ `avatar` / `avatarSize`。
- `variant`（`filled`/`borderless`/`outlined`/`shadow`）、`shape`（`round`/`corner`）。
- `loading`、`typing`（打字机效果，`boolean | TypingOption`）。
- `isMarkdown`（内容按 Markdown 渲染，集成 `SxMarkdown`）。
- `header` / `footer` / `content` / `avatar` / `loading` 插槽。

**Implementation considerations:**

- **Headless-x:** `BubbleRoot` 管理 typing/loading 状态、`useTyping`；消息角色驱动样式上下文。
- **UI-x:** `scv()` recipe，slot 映射 `root`/`content`/`header`/`footer`/`avatar`。`provideBubbleUi(ui)`。
- **Dependencies:** `avatar`、`SxMarkdown`、`useTyping`。

**Cross-library:** Ant Design X, Element Plus X, AI Elements Vue.

---

#### 2. `SxBubbleList` — P0 Core | Demand: 3/3 | Effort: High | ✅ 已实现（基础版）

**Purpose:** 数据驱动的消息列表（自动滚动 + 流式跟随）。

**Functionality:**

- 数据驱动（`items: ChatMessage[]`）+ `role` → 默认样式映射（user 右对齐 / ai 左对齐）。
- 自动滚动 + 流式跟随（新消息到达时若处于底部则跟随）。
- 回到底部按钮（`showBackToBottom`，阈值可配 `scrollThreshold`）。
- `scrollable` 开关：可滚动容器（`role="log"`）或自适应高度。

**Implementation considerations:**

- **Headless-x:** `useBubbleListScroll` 组合式（见 [use-bubble-list-scroll.ts](../packages/ui-x/src/composables/use-bubble-list-scroll.ts)）管理滚动位置、底部判定、滚到底；SSR-safe。
- **UI-x:** 薄包装（见 [bubble-list.vue](../packages/ui-x/src/components/bubble-list/bubble-list.vue)），组合 `SxBubble`，slot 透传 `items`/`content`/`back-to-bottom-icon`。`bubbleListVariants`。
- **Dependencies:** `SxBubble`、`useBubbleListScroll`。
- **待完善：** 双向分页加载、虚拟滚动（复用 `virtualizer`）、边缘雾化。

**Cross-library:** Ant Design X, Element Plus X.

---

#### 3. `SxSender` — P0 Core | Demand: 3/3 | Effort: High | ✅ 已实现

**Purpose:** 富 AI 输入编排器（智能输入框）。

**Functionality:**

- 多行 `textarea` 基础输入。
- 提及 `@` 与斜杠 `/` 触发弹层（命令 / 提示词选择，`useSender`）。
- 附件展示与移除（集成 `SxAttachments`）。
- 提交状态：`loading` / `disabled`；`submitType`（enter / shiftEnter）。
- 语音按钮（集成 `useRecord`，P3）——待完善。

**Implementation considerations:**

- **Headless-x:** `useSender` 组合式（见 [use-sender.ts](../packages/ui-x/src/composables/use-sender.ts)）管理输入值、`/` 与 `@` 触发检测（仅识别词首/空白后）、查询提取、建议过滤与选择。纯逻辑可单测。
- **UI-x:** `scv()` recipe（见 [sender.vue](../packages/ui-x/src/components/sender/sender.vue)），组合 `SxAttachments`，slot 透传 `actions`/`submit-icon`/`suggestion`。`senderVariants`。
- **Dependencies:** `useSender`、`SxAttachments`。
- **待完善：** 实例方法（`setInput`/`clear`/`getValue`）、`popover` 定位、`command` 键盘导航、语音。

**Cross-library:** Ant Design X (Sender), Element Plus X (XSender), AI Elements Vue (PromptInput).

---

#### 4. `SxMarkdown` — P0 Core | Demand: 3/3 | Effort: Medium | ✅ 已实现

**Purpose:** 流式 Markdown 渲染组件（薄包装 markstream-vue 的 `MarkdownRender`）。

**Functionality:**

- GFM（表格、任务列表、删除线）。
- 流式增量渲染：未完成代码围栏、内联数学、流式表格、自定义标签（如 `<thinking>`）的占位处理。
- 语法高亮 / `mermaid` / `katex`（可选 peer，缺失时优雅回退纯文本）。
- `htmlPolicy`（`safe`/`escape`/`trusted`）安全渲染。
- 浅色 / 深色跟随 ConfigProvider（`isDark` prop 或 `.dark` 祖先类）。

**Implementation considerations:**

- **UI-x:** 薄包装 `MarkdownRender`（见 [markdown.vue](../packages/ui-x/src/components/markdown/markdown.vue)），转发 `content`/`final`/`mode`/`htmlPolicy`/`isDark`/`typewriter`/`smoothStreaming`/`codeRenderer`/`parseOptions` + `rendererProps` 透传，并引入 `markstream-vue/index.css`。含 slot 透传。映射语义 token（`markdownVariants`）。
- **Dependencies:** `markstream-vue`（直接依赖，锁定 1.x）；`mermaid`/`katex`/代码运行时（可选 peer）。已随包构建 + 单元测试。

**Cross-library:** markstream-vue（底座）, x-markdown-vue, @antdv-next/x-markdown.

---

#### 5. `useChat` — P0 Core | Demand: 3/3 | Effort: Medium

**Purpose:** 高层对话状态组合式函数。

**Functionality:**

- 管理 `messages`、`isRequesting`、`onRequest`。
- 发送流程：追加 user 消息 → 请求 → 流式填充 AI 消息。
- 支持 abort / 重试。

**Implementation considerations:**

- **Headless-x:** 纯逻辑组合式，无 DOM 依赖，可单测。内部组合 `useXStream`。
- **Patterns:** 组合式优先。

---

#### 6. `useXStream` — P0 Core | Demand: 3/3 | Effort: Low

**Purpose:** 传输无关的流式解析组合式函数。

**Functionality:**

- 消费 `ReadableStream`，按分隔符解析 SSE 分块。
- 暴露 `data / error / loading / cancel`。
- 基于 Fetch Streaming API + `TransformStream`。

**Implementation considerations:**

- **Headless-x:** 纯逻辑组合式，`useXStream(options)`。协议无关。
- **Patterns:** 组合式优先。

---

#### 7. `useTyping` — P0 Core | Demand: 3/3 | Effort: Low

**Purpose:** 打字机 / 淡入文字效果组合式函数。

**Functionality:**

- `effect: 'typing' | 'fade-in'`、`step`、`interval`、`keepPrefix`。
- `onTyping` / `onTypingComplete` 回调。

**Implementation considerations:**

- **Headless-x:** 纯逻辑组合式，rAF / interval 驱动。无 DOM 依赖。

---

#### 8. `SxAttachments` — P0 Core | Demand: 3/3 | Effort: Medium | ✅ 已实现

**Purpose:** 附件展示与移除（供 Sender 使用或独立使用）。

**Functionality:**

- 附件列表：名称、大小、类型（File/Video/Link/Database/Unknown）。
- 移除（emit `remove`）与选择（emit `select`）。
- slot 透传 `prepend`/`item`/`actions`/`remove-icon`。

**Implementation considerations:**

- **UI-x:** `scv()` recipe（见 [attachments.vue](../packages/ui-x/src/components/attachments/attachments.vue)），组合 `SxFileCard`。`attachmentsVariants`。
- **Dependencies:** `SxFileCard`。
- **待完善：** 文件上传 UI、校验。

**Cross-library:** Ant Design X, Element Plus X, AI Elements Vue.

---

#### 9. `SxFileCard` — P0 Core | Demand: 3/3 | Effort: Low | ✅ 已实现

**Purpose:** 文件元数据卡片。

**Functionality:**

- 显示名称、大小、MIME 类型。
- 依据文件类型显示对应图标（slot `icon` 可覆盖）。
- 可选点击（`onClick`）。

**Implementation considerations:**

- **Headless-x:** `Attachment` 类型（见 [attachment.ts](../packages/ui-x/src/types/attachment.ts)）。
- **UI-x:** `scv()` recipe（见 [file-card.vue](../packages/ui-x/src/components/file-card/file-card.vue)）。`fileCardVariants`。

---

#### 10. `SxCodeBlock` — P0 Core | Demand: 2/3 | Effort: Medium | ✅ 已实现

**Purpose:** 语法高亮代码块（含复制 / 语言标签）。

**Functionality:**

- 可选 `shiki` 高亮（动态导入，缺失时优雅回退纯文本）。
- 复制按钮（`navigator.clipboard` + 复制反馈）。
- 语言标签、代码头部工具栏。

**Implementation considerations:**

- **UI-x:** `scv()` recipe（见 [code-block.vue](../packages/ui-x/src/components/code-block/code-block.vue)）。`shiki` 为可选 peer 依赖，`highlight` prop 开启时动态导入。
- **Dependencies:** `shiki`（可选 peer）。
- **待完善：** 行号、语言选择器。

**Cross-library:** Ant Design X (CodeHighlighter), AI Elements Vue (CodeBlock).

---

#### 11. `SxConversations` — P1 High | Demand: 3/3 | Effort: Medium | ✅ 已实现

**Purpose:** 会话 / 对话列表（侧栏）。

**Functionality:**

- 分组显示（`group` 字段）、吸顶组标题、时间分组。
- 新建会话、选中高亮（`v-model:active`）、`@change`。
- 下拉菜单、懒加载 / 滚动加载、tooltip。
- 泛型 `ConversationItem<T>`。

**Implementation considerations:**

- **Headless-x:** `ConversationsRoot` 管理会话集合与选中状态（见 [use-conversations.ts](../packages/ui-x/src/composables/use-conversations.ts)）。
- **UI-x:** `scv()` recipe（见 [conversations.vue](../packages/ui-x/src/components/conversations/conversations.vue)），slot 映射 `root`/`item`/`groupTitle`。`conversationsVariants`。
- **Dependencies:** `dropdown-menu`、`button`、`tooltip`。
- **待完善：** 下拉菜单、懒加载 / 滚动加载、tooltip、泛型 `ConversationItem<T>`。

**Cross-library:** Ant Design X, Element Plus X.

---

#### 12. `SxWelcome` — P1 High | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** AI 对话的欢迎 / 引导面板。

**Functionality:**

- 介绍 + 上下文建议问题（可集成 `SxPrompts`）。

**Implementation considerations:**

- **UI-x:** `scv()` recipe。复合 `SxPrompts`。

**Cross-library:** Ant Design X, Element Plus X.

---

#### 13. `SxPrompts` — P1 High | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 推荐提示词集合。

**Functionality:**

- 网格 / 列表展示推荐提示。
- 点击触发回调。

**Implementation considerations:**

- **UI-x:** `scv()` recipe。`providePromptsUi(ui)`。

**Cross-library:** Ant Design X, Element Plus X.

---

#### 14. `SxSources` — P1 High | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 引用来源地址列表（溯源）。

**Functionality:**

- 展示引用的来源地址 / 数据。
- 可跳转、可折叠。

**Implementation considerations:**

- **UI-x:** `scv()` recipe。`provideSourcesUi(ui)`。

**Cross-library:** Ant Design X, AI Elements Vue.

---

#### 15. `SxSuggestion` — P1 High | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 快捷操作建议（输入场景）。

**Functionality:**

- 展示快捷命令 / 建议动作。

**Implementation considerations:**

- **UI-x:** `cv()` recipe。

**Cross-library:** Ant Design X, AI Elements Vue.

---

#### 16. `SxThink` — P1 High | Demand: 2/3 | Effort: Medium | ✅ 已实现

**Purpose:** AI「深度思考」可折叠面板。

**Functionality:**

- 展示思考过程，可折叠 / 展开。

**Implementation considerations:**

- **Headless-x:** `ThinkRoot` 管理展开状态。
- **UI-x:** `scv()` recipe，slot 映射 `root`/`header`/`content`。

**Cross-library:** Ant Design X (Think).

---

#### 17. `SxThoughtChain` — P1 High | Demand: 3/3 | Effort: Medium | ✅ 已实现

**Purpose:** 推理步骤时间线（agent 工作流反馈）。

**Functionality:**

- 每步 `status`（`success`/`loading`/`error`）。
- 每项可展开 / 折叠（`isCanExpand` / `isDefaultExpand`）。
- 泛型 `ThoughtChainItemProps<T>`。

**Implementation considerations:**

- **Headless-x:** `ThoughtChainRoot` + `ThoughtChainItem`，管理步骤状态上下文。
- **UI-x:** `scv()` recipe，slot 映射 `root`/`item`/`icon`/`content`。`provideThoughtChainUi(ui)`。
- **Dependencies:** `icon`、`collapsible`。

**Cross-library:** Ant Design X, Element Plus X.

---

#### 18. `useSend` — P1 High | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 前端「发送中」状态控制组合式函数。

**Functionality:**

- `send / abort / finish / loading`。
- 供按钮 / 语音开关使用。

**Implementation considerations:**

- **Headless-x:** 纯逻辑组合式。

---

## 6. 中优先级（Medium — P2）

| 序号 | 组件                | 需求度 | 工作量 | 状态      |
| :--: | :------------------ | :----: | :----: | :-------- |
|  19  | `SxActions`         |  2/3   |  Low   | ✅ 已实现 |
|  20  | `SxActionsCopy`     |  2/3   |  Low   | ✅ 已实现 |
|  21  | `SxActionsFeedback` |  2/3   |  Low   | ✅ 已实现 |
|  22  | `SxFolder`          |  1/3   |  Low   | ✅ 已实现 |
|  23  | `SxNotification`    |  2/3   |  Low   | ✅ 已实现 |
|  24  | `SxMermaid`         |  2/3   | Medium | ✅ 已实现 |

### 详细条目

---

#### 19. `SxActions` — P2 | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** AI 输出动作工具栏（复制 / 反馈 / 自定义）。

**Functionality:** `ActionsCopy`（复制）、`ActionsFeedback`（点赞 / 点踩）、`ActionsAudio`（朗读）、`ActionsItem`（自定义）。

**Implementation considerations:** `scv()` recipe，slot 映射 `root`/`item`。**Dependencies:** `clipboard`、`icon`、`button`。`provideActionsUi(ui)`。

**Cross-library:** Ant Design X.

---

#### 20. `SxActionsCopy` — P2 | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 复制动作按钮。

**Implementation considerations:** `cv()` recipe。**Dependencies:** `clipboard`。

---

#### 21. `SxActionsFeedback` — P2 | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 反馈动作按钮（点赞 / 点踩）。

**Implementation considerations:** `cv()` recipe。**Dependencies:** `icon`。

---

#### 22. `SxFolder` — P2 | Demand: 1/3 | Effort: Low | ✅ 已实现

**Purpose:** 文件夹式展示，用于分组文件 / 文档。

**Implementation considerations:** `scv()` recipe。**Dependencies:** `icon`。

**Cross-library:** Ant Design X.

---

#### 23. `SxNotification` — P2 | Demand: 2/3 | Effort: Low | ✅ 已实现

**Purpose:** 通知展示。

**Implementation considerations:** 复用 `toast` 模式。**Dependencies:** `toast`。

**Cross-library:** Ant Design X.

---

#### 24. `SxMermaid` — P2 | Demand: 2/3 | Effort: Medium | ✅ 已实现

**Purpose:** 渲染 Mermaid 图（图片 / 代码模式切换）。

**Implementation considerations:** 包装 `mermaid`（可选 peer）。**Cross-library:** Ant Design X.

---

## 7. 低优先级（Low — P3）

| 序号 | 组件            | 需求度 | 工作量 |
| :--: | :-------------- | :----: | :----: |
|  25  | `useRecord`     |  2/3   | Medium |
|  26  | `SxAudioPlayer` |  1/3   | Medium |
|  27  | `SxStackTrace`  |  1/3   | Medium |
|  28  | `SxAgent`       |  1/3   |  High  |

### 详细条目

---

#### 25. `useRecord` — P3 | Demand: 2/3 | Effort: Medium

**Purpose:** 浏览器内置语音识别组合式函数。

**Functionality:** `start / stop / loading / value`（实时转写）、`onEnd`。

**Implementation considerations:** 包装 Web Speech API。**Headless-x:** 组合式。供 `SxSender` 语音按钮使用。

---

#### 26. `SxAudioPlayer` — P3 | Demand: 1/3 | Effort: Medium

**Purpose:** 音频播放器。

**Implementation considerations:** 包装媒体能力。**Cross-library:** AI Elements Vue.

---

#### 27. `SxStackTrace` — P3 | Demand: 1/3 | Effort: Medium

**Purpose:** 终端 / 堆栈追踪输出（ANSI 渲染）。

**Implementation considerations:** `ansi-to-vue3` 渲染。**Cross-library:** AI Elements Vue.

---

#### 28. `SxAgent` — P3 | Demand: 1/3 | Effort: High

**Purpose:** Agent 风格包装（工作流 / 多步执行展示）。

**Implementation considerations:** 复合 `SxThoughtChain` + 工具调用展示。**Cross-library:** AI Elements Vue.

---

## 8. 延后至组件市场（Deferred to Marketplace）

需要**大量原子组件组合**且**用例较为小众**的 AI 组件，不进入核心包，延后至未来的源码分发组件市场（`sbean` registry 模式）。

| 组件                | 延后原因                                      | 基于原子组件                          | 需求度 |
| :------------------ | :-------------------------------------------- | :------------------------------------ | :----: |
| `SxCanvas`          | 工作流画布 — VueFlow 集成，体量大，独立生态。 | `@vue-flow/*` + `SxNode`/`SxEdge`     |  2/3   |
| `SxNode` / `SxEdge` | 画布节点 / 连线，依赖 VueFlow。               | `@vue-flow/*`                         |  2/3   |
| `SxArtifact`        | 代码 / 文档 artifact 展示，复合。             | `SxCodeBlock` + `SxMarkdown` + `tabs` |  1/3   |
| `SxWebPreview`      | 内嵌网页预览（iframe）。                      | `dialog` + iframe                     |  1/3   |
| `SxTerminal`        | 终端输出（命令历史）。                        | `SxStackTrace` + `input`              |  1/3   |

### 市场设计说明

- **分发模式：** 源码（`.vue` + `.ts`）复制进用户项目，而非 npm 依赖。
- **Registry：** 复用 `sbean` CLI / registry 列出市场组件及元数据。
- **组合方式：** 每个市场组件从 `@soybeanjs/ui-x`（原子）与 `@soybeanjs/ui`（基础原子）导入。
- **版本控制：** 市场组件标注所兼容的核心库版本。

---

## 9. 范围外组件（Out of Scope）

经评估后**明确拒绝**进入活跃路线图与组件市场的候选项。

### 依赖独立生态（独立包范围）

- **图表 / 数据可视化**（`Chart`、`Sparkline`）— 独立领域，属 `@soybeanjs/charts` 而非 AI 库。
- **富文本编辑器**（`RichTextEditor`）— 体量大，通常独立成包（Tiptap / ProseMirror）。

### 已有组件覆盖

- `Avatar`（= `avatar`）、`Tooltip`（= `tooltip`）、`Button`（= `button`）、`Tag`（= `tag`）— 复用主库，不重复实现。
- `CodeBlock` 与 `SxCodeBlock` 的复制按钮复用 `clipboard`。

### 业务专属（过于狭窄）

- 特定厂商收费看板、知识库后台专属组件。

### 移动端 / 平台特性

- 原生语音输入、iOS 专属交互、PWA 专属组件。

---

## 10. 交付面与工程接线

### 10.1 工程接线

新包需要完成以下工作（对齐 `packages/ui` 模板）：

- `packages/ui-x/package.json` + `packages/ui-x/package.json`（`@soybeanjs/*` 命名、`workspace:*` 依赖、`vp pack` 构建、`vue-tsc` typecheck）。
- `pnpm-workspace.yaml` 自动覆盖 `packages/**`，无需改动。
- `packages/ui-x/src/index.ts` 桶导出 + `packages/ui-x/src/index.ts` 桶导出。
- 生成清单 `src/constants/components.ts`，接入 `pnpm sui` 生成管线（若扩展 `sui` 脚本）。

### 10.2 交付面

| 交付面          | 方式                                                                  |
| :-------------- | :-------------------------------------------------------------------- |
| Playground      | 新增 `apps/playground/src/examples/[ai-*]/` 示例，供手动验证。        |
| Docs            | 新增 `apps/docs/src/docs/[en\|zh-CN]/` 的 AI 组件文档页。             |
| API 数据        | 接入 `pnpm sui gen api` 生成 AI 组件 API JSON。                       |
| Nuxt / Resolver | `ui-x` 提供 `/nuxt` 与 `/resolver` 子路径导出。                       |
| 测试            | `packages/ui-x/test/specs/` 单元测试 + Browser 模式 e2e（axe-core）。 |

### 10.3 测试拓扑

- **单元测试**：`headless-x` 的组合式函数（`useXStream`、`useChat`、`useTyping`）为纯逻辑，易单测。
- **组件测试**：`ui-x/test/specs/`。
- **浏览器 e2e**：核心对话场景（BubbleList 流式跟随、Sender 提及、ThoughtChain 展开），axe-core 可访问性检查。

---

## 11. 决策记录（ADR）

| 编号 | 决策                                                                                                        | 依据                                                                                         |
| :--: | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
|  D1  | 包命名 `@soybeanjs/ui-x` + 组件前缀 `Sx`                                                                    | 与 `ui` 命名族一致；`Sx` 沿袭「X = AI 扩展」，不与 `S*` 冲突。                               |
|  D2  | 复用 headless/styled 分层，新增 `headless-x`（AI 逻辑）+ `ui-x`（样式）                                     | 遵守仓库硬性不变式；最大化复用现有原子组件，避免第二套设计语言。                             |
|  D3  | 流式传输无关：`useXStream` + 通用 `ChatMessage` 模型，不捆绑 SDK                                            | 对齐 element-plus-x 务实路线；保持核心精简。                                                 |
|  D4  | `SxMarkdown` 集成 `markstream-vue`（直接依赖，锁定 1.x）作流式底座；`mermaid`/`katex`/代码运行时为可选 peer | 成熟解决流式难点（围栏/内联数学/表格），安全默认、SSR-safe；自研重造正确性风险大于体积成本。 |
|  D5  | v1 只做核心对话三元组 + 流式 + Markdown；画布 / agent / 语音延后                                            | 聚焦高共识、高价值场景，先闭环核心体验。                                                     |

---

## 12. 实现模式速查

| 模式                          | 组件                                                                                                                        |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| 组合式优先                    | `useChat`, `useXStream`, `useTyping`, `useSender`, `useBubbleListScroll`, `useSend`, `useRecord`, `useSmoothMarkdownStream` |
| 多槽 (`scv()` + `provide*Ui`) | `SxBubble`, `SxBubbleList`, `SxSender`, `SxConversations`, `SxThoughtChain`, `SxMarkdown`, `SxAttachments`, `SxActions`     |
| 单类 (`cv()`)                 | `SxFileCard`, `SxCodeBlock`, `SxSuggestion`, `SxWelcome`, `SxPrompts`, `SxSources`, `SxActionsCopy`, `SxActionsFeedback`    |
| 第三方底座集成                | `SxMarkdown`（markstream-vue）、`SxCodeBlock`（shiki）、`SxMermaid`（mermaid）                                              |

---

_本路线图基于对 `vuepont/ai-elements-vue`、`element-plus-x/Element-Plus-X`、`antdv-next/x`、`Simon-He95/markstream-vue` 的探索分析编制。命名与架构决策见 §2 与 §11。**P0 里程碑 10/10 已完成**（`SxBubble`、`SxBubbleList`、`SxSender`、`SxMarkdown`、`SxAttachments`、`SxFileCard`、`SxCodeBlock` + `useChat`/`useXStream`/`useTyping`/`useSender`/`useBubbleListScroll`）；**P1 里程碑 8/8 已完成**（`SxConversations`、`SxWelcome`、`SxPrompts`、`SxSources`、`SxSuggestion`、`SxThink`、`SxThoughtChain` + `useSend`）；**P2 里程碑 6/6 已完成**（`SxActions`、`SxActionsCopy`、`SxActionsFeedback`、`SxFolder`、`SxNotification`、`SxMermaid`）；P3 4 个；延后至组件市场 5 个。_
