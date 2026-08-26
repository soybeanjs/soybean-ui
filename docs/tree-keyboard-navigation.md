# 树形组件键盘导航设计方案（TreeMenu + TreeNav 共享能力）

> 状态：待评审
> 作者：AI Assistant
> 日期：2026-08-27
> 关联文档：[tree-nav-design.md](./tree-nav-design.md)

## 1. 背景与调研结论

### 1.1 主流基线（WAI-ARIA APG Tree View Pattern）

MUI X 完整实现该标准；Ant Design（rc-tree）有 ↑↓+Enter 但边缘情况仍在修补；Element Plus 弱实现（Tab 难以进入，需鼠标先聚焦）；Radix/Reka 未提供 TreeView。

| 按键            | 标准行为                                                              |
| --------------- | --------------------------------------------------------------------- |
| ↓ / ↑           | 焦点移到下/上一个**可见**节点，不改变展开状态、不移动到隐藏节点       |
| →               | 折叠分支：展开（焦点不动）；已展开分支：进第一个子节点；叶子：无操作  |
| ←               | 展开分支：折叠；叶子或已折叠分支：回父节点；根级无操作：不动          |
| Home / End      | 首个可见节点 / 最后一个无需展开即可见的可见节点                       |
| Enter / Space   | 显式激活当前聚焦节点（分支=切换展开 或 默认动作；叶子=默认动作/选中） |
| Tab / Shift+Tab | 进入/离开整棵树——**树是单一 Tab 停留点**                              |

Type-ahead（打字定位）与 `*`（展开同级）为可选增强，v1 不做。

### 1.2 本库现状

- `TreeMenu` 无任何键盘导航：所有 SFC 仅点击驱动（`tree-menu-button.vue` 只监听 `@click`），且无 `role="tree"/"treeitem"`、`aria-expanded`、tabindex 管理；
- 条目为原生 button/a，靠 Tab 逐个穿越（disclosure 形态，本就是 W3C 对导航树的推荐替代，但其键盘效率低于树模型）；
- [`use-arrow-navigation`](../packages/headless/src/composables/use-arrow-navigation.ts) 已支持六键解析、循环/越界、disabled 跳过、RTL 映射，但为**平面遍历模型**：只有"集合中前后移"，无树的父子升降与展开/折叠语义；
- `use-collection` 提供 DOM 节点注册与顺序收集，可作为条目数据源。

## 2. 设计原则

| #   | 原则                                           | 理由                                                                                                                |
| --- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| P1  | **方向键只漫游焦点，不改选中值**               | TreeMenu 的 `modelValue` 通常驱动路由跳转；方向键扫过列表不应产生连环导航。"selection follows focus" 不作为默认行为 |
| P2  | **Enter/Space 才显式激活**                     | 与既有 click 路径复用同一激活函数，行为一致性天然成立                                                               |
| P3  | **↔ 承担树的差异化价值**（展开/折叠/父子升降） | 若 ↔ 也做平面左右移，↑↓+↔ 退化为 listbox，失去 tree 模式的意义                                                      |
| P4  | **键盘漫游焦点 ≠ 视觉高亮 ≠ 选中态三者解耦**   | focus 样式跟随 roving tabindex；`data-active`/`data-child-active` 继续由 selection 派生，互不干扰                   |
| P5  | **能力做成可插拔**                             | 键盘增强是 opt-in 的，不开启时组件保持现有 disclosure 形态，对存量消费者零破坏                                      |

## 3. 共享基础设施

### 3.1 新增 composable：`packages/headless/src/composables/use-roving-tabindex.ts`

职责：把一组注册条目收敛成"单一 Tab 停留点"。

```ts
interface RovingTabindexOptions {
  /** 当前应获得 tabindex='0' 的节点 value；undefined 时回落到第一个条目 */
  current?: () => string | undefined;
}
// 返回:
// - getTabIndex(item): 0 | -1        —— 模板绑定
// - setFocused(value) / onItemFocus
// - collectItems(): 从 use-collection 读取有序条目
```

- 初始落点遵循 APG：树首次获得焦点时，若有已选中项 → 聚焦选中项；否则 → 第一个条目；
- 条目卸载后若恰好持有焦点，收敛到相邻可见条目。

### 3.2 树形导航解析：扩展而非改写 `use-arrow-navigation`

现有函数签名返回的是"下一个 DOM 元素"，沿用其按键解析与 disabled 跳过；在其上新增纯函数模块 `shared/tree-navigation.ts`：

```ts
interface TreeNavNode {
  value: string;
  level: number; // 深度
  hasChildren: boolean;
  expanded: boolean;
  index: number; // 可见序
}

/** 解析一棵可见树上的四向导航结果 */
export function resolveTreeNavigation(
  current: TreeNavNode,
  visibleNodes: TreeNavNode[],
  key: 'up' | 'down' | 'left' | 'right',
  dir: Direction
): { targetValue?: string; toggleExpand?: boolean } | null;
```

规则映射 §1.1 表格：

- ↓/↑ → 在 `visibleNodes` 内找相邻 enabled 节点（底层直接复用 `use-arrow-navigation` 的 `findNextFocusableElement`）；
- → → closed 分支返回 `{ toggleExpand: true }`；open 分支返回 `{ targetValue: 第一个子节点 }`；
- ← → open 分支 `{ toggleExpand: true }`；closed/叶子且有父 → `{ targetValue: 父节点 }`（父链信息由现成 `getTreePaths` 提供）。

放在 shared（非 composable）：它是无状态的纯计算，输入输出均为显式类型 —— 符合 typescript-functional-style 的提取准则。

### 3.3 分层关系图

```
keydown 处理（各组件 SFC 内）
   │ e.key → 上下文（dir/disabled/collapsed）
   ▼
resolveTreeNavigation()      ← shared/tree-navigation.ts（纯函数）
   │ ↙ ↘
toggleExpand               focus target        ← 消费者各自的动作实现
   ▼                            ▼
CollapsibleRoot            roving getTabIndex()
(expanded context)         （聚焦由调用方 .focus()）
```

`use-arrow-navigation` 自身保持不变（其余 Menu/Combobox 族消费方不受影响）。

## 4. 两个组件的接入

### 4.1 TreeMenu（竖向）

改动点集中在 root 与 option 两层：

| 接入点     | 内容                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Prop       | `keyboardNav?: boolean`（默认 `true`？见 §7 开放问题 O1）                                                            |
| Root SFC   | 挂载 keydown 捕获层：解析事件 → `resolveTreeNavigation` → 展开/折叠走现有 `expanded` 通道、焦点转移 `target.focus()` |
| Option SFC | 条目渲染接入 roving tabindex（每个 item 一个 collection 注册已有基础）                                               |
| 语义补全   | 容器 `role="tree"`、条目 `role="treeitem"`、分支 `aria-expanded`、分组容器 `role="group"`——仅在开启树模式时附加      |
| 边界       | collapsed 态的 hover 弹层分支（DropdownMenuCompact 承载）不参与树漫游——弹层内部方向键由 Menu 自身实现，两套体系隔离  |
| 链接节点   | 保持原生 `<a>` 可聚焦；Enter 走链接默认行为，不触发自定义激活                                                        |

### 4.2 TreeNav（水平，设计文档 [tree-nav-design.md](./tree-nav-design.md) 组件）

水平形态做以下适配（覆盖竖向表格的对应单元格）：

| 竖向（APG 默认） | TreeNav 水平化映射                                                               |
| ---------------- | -------------------------------------------------------------------------------- |
| ↓/↑ 顺序漫游     | →/← 在顶层条目间漫游（透传给 DropdownMenu 内部时尊重 RTL）                       |
| → 展开           | ✓ 同样适用：顶层分支展开弹层，但**焦点是否进弹层交由 Menu 机制**，不在本组件劫持 |
| ↓ 进子级         | 顶层按 Enter 打开弹层后，焦点自然落入弹层首项（DropdownMenu 现有能力）           |

关键约束：**弹层打开期间的键盘由 Menu 全权接管**，树漫游只在弹层关闭状态下生效。因此 TreeNav 的"键盘导航"本质是"顶层的 roving + ↔ 展开"，比竖向 TreeMenu 浅一层。逐项汇总：

- 顶层 → 关闭态中相邻条目漫游（含 more 触发器）；
- → → 分支 `open=true`（受控经 DropdownMenu 通道），叶子无操作；
- ← → 已展开分支收起，否则回到前一条目；
- Home/End → 首尾条目。
- v1 决策（原 tree-nav-design.md §10 的对应行随之撤销）：此前搁置的"键盘 ArrowLeft/Right 顶层漫游"由本方案承接。

### 4.3 共同的实现红线

- **不在 headless 引入任何样式类**（roving/tabindex 属逻辑层，合法；focus 视觉样式归 UI 配方的 `focus-visible:` 变体）；
- **不在 UI 层写 ARIA/keydown**；
- 展开折叠状态读写必须经由组件现有 context（`onExpandedToggle` 等），不允许旁路；

## 5. 测试规划增量

在两组件各自 spec 上追加：

1. roving：初始 tab 序只暴露一个条目；树获焦时落在选中项；删除持有焦点的条目后焦点收敛；
2. ↑↓：跳过 disabled、不可循环穿越根（visually hidden 分支下的后代不被命中）；
3. ↔（TreeMenu）：closed→toggleExpand 且焦点不动；open→进首个子节点；← 回父；根级 no-op；
4. ↔（TreeNav）：关闭态顶层相邻漫游；→ 展开分支后 Enter 关闭路径回归；
5. Enter/Space：叶子触发 select/update:modelValue（一次，仅一次）；分支切换 expanded；
6. axe：`role="tree"` 结构校验。

## 6. 交付与排序

| 步骤 | 内容                                                                   | 所属 PR                                   |
| ---- | ---------------------------------------------------------------------- | ----------------------------------------- |
| ①    | `use-roving-tabindex` + `shared/tree-navigation.ts` + 单测             | TreeMenu 键盘导航 PR-A                    |
| ②    | TreeMenu 接入（P2/P3 全量 + 语义补全 + spec/e2e）                      | PR-A                                      |
| ③    | TreeNav 按 §4.2 接入（随 tree-nav-design.md 附录 D 执行序列插入 P2.5） | TreeNav 组件 PR（未开始前合并为此处一步） |
| ④    | browser e2e Tier1 补充键盘断言                                         | 各自 PR 内                                |

执行命令面与本库常规一致（typecheck/lint/vitest），不新增构建流程。

## 7. 开放问题

- **O1 默认开关**：`keyboardNav` 默认 `true` 会改变存量 TreeMenu 的 Tab 行为（多停留点 → 单停留点）。倾向默认 `true`（a11y 正收益 & APG 合规），但因属行为破坏性变更，最终定稿需确认版本策略（minor 带 warning 还是 opt-in 两版过渡）。
- **O2 type-ahead 时机**：`use-typeahead` 已存在；若本次顺手接入成本低则纳入，否则挂后续。
