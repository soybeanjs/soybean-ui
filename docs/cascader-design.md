# SCascader 设计记录（ADR + 术语表）

> 产出方式：grill-with-docs 技能质询会话（两轮，7 个决策点），结合对 Element Plus / Naive UI / Ant Design Vue / PrimeVue / TDesign / Arco / Varlet 的调研。
> 状态：已确认，进入实施。

## 一、术语表（Glossary）

| 术语                          | 定义                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Cascader / 级联选择器**     | 基于层级 options 的多列联动选择组件。选中项沿祖先链形成"路径"。                                              |
| **Option / 选项**             | `options` 数组中的原始数据项，通过 `fieldKeys`（value/label/children/disabled）映射。                        |
| **Leaf / 叶子节点**           | 无子级或 `children` 为空的节点；非叶子节点可展开出下一列。                                                   |
| **Path / 路径**               | 从根到某节点的祖先链，含该节点。`pathValues`（值数组）与 `pathLabels`（标签数组）。                          |
| **pathMode**                  | 值模型开关。`false`（默认）时 v-model 为节点 value；`true` 时为路径数组（单选一维，多选二维）。              |
| **Linked columns / 联动列**   | 面板中横向并列的列，第 N 列是第 N-1 列"展开节点"的子级。展开新列时截断右侧旧列（`slice(0, level) + push`）。 |
| **Expanding node / 展开节点** | 当前正在展开（高亮）的节点，决定下一列的渲染内容。                                                           |
| **checkStrictly**             | 严格勾选模式。`false` 时仅叶子可选且父子联动；`true` 时任意层级可选、勾选互不影响。                          |
| **Indeterminate / 半选**      | 子级部分选中时父节点复选框的中间态。                                                                         |
| **showCheckedStrategy**       | 多选回填/展示策略：`'child'`（只收集/显示叶子）与 `'parent'`（子级全选时折叠为父级）。                       |
| **Loading node / 加载节点**   | 懒加载模式下 `children === true` 或尚未加载的子级节点，展开时触发 `onLoad(option)`。                         |
| **Search mode / 搜索态**      | filterable/远程搜索时，面板从多列切换为扁平搜索结果列表，命中项按路径拼接显示。                              |
| **Virtual scroll / 虚拟滚动** | 单列固定行高 + 窗口裁剪渲染，仅渲染可视区行。                                                                |
| **Highlight / 高亮项**        | 键盘/悬停当前指向的节点（pending 高亮），驱动 `aria-activedescendant` 与下一列展开。                         |

## 二、ADR-001：组件模式与分层

**状态：Accepted**

采用 **多插槽 base 组件 + Compact 聚合**（对齐 Select/Popover 现有模式）：

- headless 层（`packages/headless/src/components/cascader/`）暴露 `CascaderRoot / CascaderTrigger / CascaderValue / CascaderContent（面板）/ CascaderMenu（列）/ CascaderOption / CascaderEmpty / CascaderCompact` 与 `provideCascaderUi`（内部桥接 `providePopperUi`）。
- 数据流 `headless → ui` 单向。UI 层 `SCascader` 为薄包装：`useOmitProps` 剥离样式类 → `useForwardListeners` 转发事件 → `keysOf(slots)` 全量透传插槽 → `provideCascaderUi(ui)`。
- 样式 recipe `packages/ui/src/styles/cascader.ts`（`scv()`，首行 `// @unocss-include`，slots 键与 `CascaderUiSlot` 逐一对应）。
- 理由：面板作为一等公民（Content）暴露，可脱离触发器与任意触发器组合（借鉴 TDesign/Arco 的 CascaderPanel 独立导出）。

## 三、ADR-002：值模型（v-model）

**状态：Accepted**（用户确认：pathMode 开关）

- 默认（`pathMode: false`）：单选 v-model = `T`（叶子 value）；多选 = `T[]`。
- `pathMode: true`：单选 v-model = `T[]`（一条路径）；多选 = `T[][]`（多条路径）。
- 字段映射：`fieldKeys: { value, label, children, disabled }`，缺省值 `value/label/children`。
- 回显：由 value 反查节点（值相等或路径相等），沿祖先链展开列并勾选。借鉴 EP `getNodeByValue` 双匹配与 Arco fallback 思路——找不到节点时保持 value 原样不回显（不崩溃）。
- 理由：兼容两种主流生态（EP/AntD 路径数组派 vs Naive 节点 key 派），`emitPath`/`path-mode` 已被充分验证。

## 四、ADR-003：面板交互——多列联动

**状态：Accepted**（用户确认：多列联动面板）

- 列维护：`menus = [第0列, 第1列, ...]`；展开节点时 `menus.slice(0, level) + push(node.children)`（EP 的列截断式，天然避免幽灵列）。
- 展开触发：`expandTrigger: 'click' | 'hover'`（默认 click）。hover 模式不做三角区（v1 简化，触屏安全），仅当指针仍在展开路径上时不收起。
- 单选点击叶子 → 选中并关闭；`checkStrictly` 时点击任意节点选中并关闭。
- 多选：复选框，选中不关闭面板。

## 五、ADR-004：选择语义（多选 / 父子联动 / 回填策略）

**状态：Accepted**（用户确认：showCheckedStrategy 两者可切换）

- `multiple: boolean`。
- `checkStrictly: false`（默认）：多选时父子联动 + 半选态；单选仅叶子可选。`true`：任意层级独立勾选。
- `showCheckedStrategy: 'child' | 'parent'`（默认 'child'）：同时决定 **value 收集** 与 **tag 展示**。
  - `'child'`：收集被勾选区域的叶子集合。
  - `'parent'`：收集被勾选区域的顶层节点集合（子级全选则折叠为父级）。
- 节点选中状态：checked / unchecked / indeterminate 三态，存储于节点模型，由勾选动作向上（祖先）向下（子孙）传导。
- 理由：借鉴 Naive `check-strategy` 双轴与 TDesign `value-mode`，但收敛为单开关，避免 API 膨胀。

## 六、ADR-005：异步懒加载

**状态：Accepted**（用户确认：Promise 风格）

- `lazy: boolean` + `onLoad(option: CascaderNode) => Promise<CascaderOptionData<T>[]>`。
- 约定：`children === true` 或 `isLeaf === false` 且未加载的节点为可加载节点；展开时触发加载，loading 态在节点行尾展示。
- 加载完成：写回 `node.children` 与 `loaded`，重建列。失败：复位 `loading` 允许重试（拒绝时由调用方 catch）。
- 回显：外部 value 指向未加载路径时，先沿路径逐级触发 `onLoad` 再展开（EP `syncCheckedValue` 逐级补齐思路的简化版——v1 仅同步加载，不阻塞交互）。

## 七、ADR-006：过滤与远程搜索

**状态：Accepted**（用户确认：本地 + 远程）

- `filterable: boolean`：触发框变为输入框；`filter(pattern, option, path)` 可自定义，默认对 path 各级 label 做大小写不敏感 `includes`。
- 本地过滤：扁平化全部节点（含路径标签），命中后进入搜索态（扁平结果列表），展示路径拼接 + 关键词高亮（内置，规避 EP"无高亮"短板）。选中后关闭（单选）并回显。
- 远程搜索：`remote: boolean` + `onSearch(keyword) => Promise<CascaderOptionData<T>[]>`；`keyword` 变化时防抖（`searchDelay`，默认 300ms）触发，返回的扁平结果直接渲染为搜索列表；`loading` 态展示。单选选中后回显：若结果项带完整祖先链（由 `onSearch` 返回嵌套结构或 `_path` 标记）则按路径回显。
- 搜索态与多列面板互斥：有 `pattern` 时渲染搜索列表，无时渲染联动列。

## 八、ADR-007：性能策略

**状态：Accepted**

- 虚拟滚动：`virtualScroll: boolean`（默认 `false`，大数据按需开启）+ `itemSize`（默认 34）+ `height`（默认 204），仅作用于多列面板的每列与搜索列表。固定行高窗口裁剪（EP `FixedSizeList` 简化版）。
- 防抖：过滤与远程搜索 `searchDelay` 默认 300ms。
- 节点模型自包含：构造时缓存 `pathValues / pathLabels / level / isLeaf`，运行时 O(1) 取路径，不反复递归（EP Node 模型思路）。
- 懒加载按需展开（ADR-005）。
- 理由：Naive 默认开虚拟滚动但本组件体积与心智负担平衡，默认关 + 显式开更符合"完整版但不过度"的取舍。

## 九、ADR-008：无障碍（A11y）

**状态：Accepted**

采用 PrimeVue/APG Combobox + Tree 组合模式（headless 层实现，UI 层不重复）：

- 触发器：`role="combobox"` + `aria-expanded` + `aria-haspopup="tree"` + `aria-controls` + `aria-activedescendant`。
- 面板容器：`role="tree"`（`aria-orientation="horizontal"`，多列面板）；每列 `role="group"`；节点 `role="treeitem"` + `aria-selected` / `aria-expanded` / `aria-disabled` / `aria-level` / `aria-setsize` / `aria-posinset`。
- 键盘（面板打开态）：`↑/↓` 同列移动（跳过 disabled，Home/End 首尾）；`←/→` 切列（RTL 反转）；`Enter` 选中/展开；`Esc` 关闭回焦点；关闭态 `Enter/↓` 打开，`Tab` 正常离场。
- 焦点管理：pending 高亮 + `aria-activedescendant`（Naive 模式），不移动真实 DOM 焦点，虚拟滚动下也稳定。

## 十、ADR-009：UI 层样式与主题

**状态：Accepted**

- `packages/ui/src/styles/cascader.ts`：`scv()` recipe，`slots` 键与 `CascaderUiSlot` 完全一致（trigger/triggerIcon/value/positioner/popup/panel/menu/option/optionIcon/optionIndicator/empty/arrow/tag…）。
- 尺寸轴：`ThemeSize`（xs…2xl），默认 md；弹层类使用语义色 `bg-popover text-popover-foreground border-input`；popup slot 带开合动画 class（`data-[state=open]:animate-in …`），与 Select/Popover 一致。
- 复选框图标与展开箭头图标复用 `Icon`（lucide）。

## 十一、交付面清单

- `packages/headless/src/components/cascader/`（8 个 SFC + types/context/shared/hooks/index）
- `packages/ui/src/components/cascader/`（wrapper + types + index）
- `packages/ui/src/styles/cascader.ts`
- barrel 导出：`packages/headless/src/index.ts`、`packages/ui/src/index.ts`
- 生成：`pnpm sui headless`、`pnpm sui ui`、`pnpm sui api`、`pnpm sui api-translate -- --locale zh-CN`
- 交付面：`apps/playground/src/examples/cascader/`、`apps/docs/src/docs/{en,zh-CN}/components/cascader.md`、`apps/docs/src/constants/menus.ts`、`packages/ui/test/specs/components/cascader.spec.ts`
- 验证：`pnpm typecheck`、`pnpm lint`、`pnpm fmt`、`pnpm vitest packages/ui/test/specs/components/cascader.spec.ts`
