# C61 `table` 检查优化报告

> **组件编号：** C61（`table`）
> **组件名称：** `STable`（headless 基座：`TableCompact` 聚合 15 个原语：`TableRoot`/`TableScroll`/`TableContent`/`TableHeader`/`TableBody`/`TableRow`/`TableCell`/`TableFooter`/`TableCompactHead`/`TableCompactRow`/`TableVirtualSpacerRow` + `useSelection` 等 4 个 composable）
> **模式：** 多槽 + Compact（root/scroll/content/header/body/row/head/cell/footer/selection/header-selection/expand/header-sort/header-filter/header-resize/tree-toggle/empty/bottom 18 个 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01、D7-02

---

## 一、执行摘要

对 `table` 完成全维度审计。核心链路：`TableCompact` 以泛型 `T extends TableBaseData, R extends string | number, M extends boolean` 聚合 15 个 headless 原语，`useTableCompactState` 经 `useSelection`（`getVueBooleanCasting` 归一化 `multiple`）统一选择状态，`useControllableState` 处理 `expanded`/`sortState`/`filterState`/`columnWidths` 四组受控/非受控通道；`useTableCompactData` 派生列/行/树/筛选/排序展示数据；`useTableCompactResize` + `useTableCompactVirtual` 支撑列宽拖拽与虚拟滚动；UI 层 `STable` `tableVariants` 18 槽注入（7 尺寸 × 2 变体 + bordered/rounded/striped），默认筛选浮层/排序按钮/选择控件/空态经插槽回退渲染，`data-soybean-table-*` 数据属性齐备。

**发现 Minor ×3**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Minor 修复**（D1-08/D2-11）：`table-filter-popover.vue` 筛选浮层 8 处硬编码英文文案（筛选摘要/关键字生效/选项计数/无筛选项/触发 aria-label/搜索 aria-label/无匹配/清除）→ 新增 `LocaleTableMessages` 11 键 + 13 语言包 + `interpolate` 插值（zh-CN 验证：`筛选「Name」`/`搜索「Name」的筛选选项`/`已选 1 项`/`无匹配选项`/`清除`）。选择/排序/展开/树切换/空态既有本地化通道核验通过                 |
| D2 行业对标 |  ✅  | 配置式 `columns` + 分组表头、排序（`aria-sort`）、筛选（关键字 + 选项多选）、选择（多选/单选 + 全选）、展开行/树形行、固定列/固定表头、列宽拖拽 + 键盘调整、虚拟滚动 9 能力对齐 AntD/Element Plus/Naive UI/Mantine；本地化筛选浮层超出主流库（AntD 硬编码英文/Element Plus 仅关键字）                                                                                                                  |
| D3 API 设计 |  ✅  | `columns` 类型 `TableColumn<T>[]`（`dataIndex`/`key`/`title`/`children`/`sorter`/`filter`/`fixed`/`resizable`/`width`/`minWidth`/`align`/`type` 12 字段）；`rowKey`；`selected`/`sortState`/`filterState`/`expanded`/`columnWidths` 五组受控通道 + 非受控默认；根插槽暴露行事件 payload（`rowData`/`rowKey`/`index`/`level`/`hasChildren`）；`TableCompact` 6 个 `*Props` 通道 + 13 槽 slot props 透传 |
| D4 类型系统 |  ✅  | **Minor 修复**（D4-01）：`withDefaults` 泛型布尔默认值 `multiple: true as unknown as M` 双重断言违反「无 `as unknown as`」约束 → 函数式默认 `multiple: () => true as M`（`InferDefault` 对泛型 `M                                                                                                                                                                                                      | undefined` 仅接受函数形式，见 3.1）。`pnpm typecheck` 全绿 |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`（本轮消灭最后一处 `as unknown as` 双重断言）；headless 无样式（D5-14）；context 全部经 `transformPropsToContext` 响应式注入；**Minor 修复**（D5-01 死键）：`styles/table.ts` 6 个 size 变体 `caption: 'py-*'` 槽位无对应模板渲染 → 删除                                                                                                               |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（概述/用法/特性/**组件家族**/演示/API/说明/常见问题），含架构对标矩阵（9 能力 × 4 对标库）+ 7 条 Cautions + 7 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                            |
|   D7 其他   |  ✅  | 单测 29 → 36 项全通过（渲染/分组表头/空态/选择/排序/筛选/列宽调整/虚拟滚动/固定列/本地化/数据属性/axe 0 违规）；`pnpm typecheck`/`pnpm lint` 全绿；全量回归 109 文件 1586 项通过（D7-09）；`data-soybean-table-*` 8 属性无冗余、root 无 `aschild`/`as` 泄漏（D1-07）                                                                                                                                   |

---

## 二、行业对标矩阵

> `table` 是**配置式列 + 数据驱动状态机**模式（选择/排序/筛选/展开/列宽/虚拟六态）。Ant Design Table 与 Element Plus Table 为同源设计（配置式 columns + 受控状态）；Naive UI DataTable 覆盖虚拟滚动与树形；Mantine Table 仅声明式基础表（无状态机）。

| 能力                            | SoybeanUI | Ant Design | Element Plus | Naive UI | Mantine Table |
| :------------------------------ | :-------: | :--------: | :----------: | :------: | :-----------: |
| headless/样式分离               |    ✅     |     —      |      —       |    —     |       —       |
| 配置式 columns + 分组表头       |    ✅     |     ✅     |      ✅      |    ✅    |      ✅       |
| 排序（aria-sort + 受控/非受控） |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 筛选（关键字 + 选项多选）       |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 选择（多选/单选 + 全选）        |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 展开行 + 树形行                 |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 固定列 / 固定表头               |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 列宽拖拽 + 键盘调整             |    ✅     |     ✅     |      ⚠️      |    ✅    |       —       |
| 虚拟滚动                        |    ✅     |     ✅     |      ⚠️      |    ✅    |      ⚠️       |

`⚠️` = 部分支持（Element Plus 列宽拖拽由 `border` + `resizable` 部分支持、虚拟滚动为内置优化非 `v-virtual` 组件；Mantine Table 为基础渲染表，无选择/排序/筛选状态机；SoybeanUI 用 `useLocaleMessages` 本地化全部 a11y 文案）。

---

## 三、发现的问题与处理

### 3.1 Minor — D4-01 `withDefaults` 泛型布尔默认值双重断言

**现象：** [table-compact.vue](../../packages/headless/src/components/table/table-compact.vue) 与 [table.vue](../../packages/ui/src/components/table/table.vue) 的 `withDefaults(defineProps<TableProps<T, R, M>>(), { multiple: true as unknown as M })`——为让字面量 `true` 匹配泛型 `M extends boolean` 使用 `as unknown as M` 双重断言，违反 D4-01「禁止 `as unknown as` 强转」（仓库已有 C39 先例：`trueValue` 改为 `as unknown as NonNullable<T>` 后同步消除全部双重断言）。且 vue-tsc 实际报错：

```text
error TS2322: Type 'M' is not assignable to type 'InferDefault<LooseRequired<__VLS_Props>, M | undefined>'.
```

**根因：** Vue 的默认值约束（`@vue/runtime-core`）为：

```ts
type NativeType = null | undefined | number | string | boolean | symbol | Function;
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);
```

泛型 `M | undefined` 不能静态判定 `extends NativeType`（类型参数），第二分支恒为 `never`——**`InferDefault` 对泛型布尔 prop 仅接受函数形式**。字面量默认值 `true as unknown as M` 既不满足函数分支、也不满足（never 化的）值分支，报错。

**修复：** 函数式默认（运行时语义不变——Vue 按实例调用函数取回 `true`，与字面量默认等价；`useSelection` 的 `getVueBooleanCasting` 对 `true` 原样返回）：

```ts
// table-compact.vue（headless 层，泛型 M 默认保留）
multiple: () => true as M,

// table.vue（UI 层，同款）
multiple: () => true as M,
```

**同款风险核查：** 全仓 `withDefaults` 泛型布尔默认值仅 table 两处命中；`select-compact`/`tree-root` 等均**不声明** `multiple` 默认（`useSelection` 的 `getVueBooleanCasting` 将 `undefined` 归一化为 `false`，table 必须在 headless 层保留 `true` 默认——函数式修复后默认多选行为不变）。**验证：** `pnpm typecheck` 全绿 + spec「defaults 多选默认」断言 `multiple` 未传时复选框 + 全选控件存在（回归通过）。

### 3.2 Minor — D1-08/D2-11 筛选浮层硬编码英文未本地化

**现象：** [table-filter-popover.vue](../../packages/ui/src/components/table/table-filter-popover.vue) 筛选浮层 8 处文案硬编码英文（`Selected {count} items`/`Keyword filter is active`/`{count} options`/`No filter options`/`Edit filter for {column}`/`Filter {column}`/`Search filter options for {column}`/`No matching options`/`Clear`/`Select {label}`/`Search {column}`），与库内既有本地化机制（`useLocaleMessages` + 13 语言包）不一致——多语言环境下筛选交互与 a11y 文案全部为英文（对标：C35 cascader 的 filterable 搜索框已本地化）。

**修复：** 分三层接线：

```ts
// locale/types.ts — LocaleTableMessages 新增 11 键（均含 JSDoc 插值说明）
filterSelected: string; // 已选 {count} 项
filterKeywordActive: string; // 关键字筛选生效
filterOptionsCount: string; // {count} 个选项
filterNoOptions: string; // 无筛选项
filterEdit: string; // 编辑「{column}」筛选
filter: string; // 筛选「{column}」
filterSearch: string; // 搜索「{column}」的筛选选项
filterNoMatching: string; // 无匹配选项
filterClear: string; // 清除
filterSelect: string; // 选择 {label}
filterSearchPlaceholder: string; // 搜索 {column}
```

13 语言包（en/zh-CN/zh-TW/ja/ko/ru/de/fr/es/pt-BR/id/tr/ar）`table` 段同步补充翻译；popover 内：

```ts
const messages = useLocaleMessages();
const filterSummary = computed(() => {
  if (props.filterValues.length > 0)
    return interpolate(messages.value.table.filterSelected, { count: String(props.filterValues.length) });
  if (props.filterValue.trim().length > 0) return messages.value.table.filterKeywordActive;
  return props.filterOptions.length > 0
    ? interpolate(messages.value.table.filterOptionsCount, { count: String(props.filterOptions.length) })
    : messages.value.table.filterNoOptions;
});
const triggerLabel = computed(() =>
  interpolate(props.filtered ? messages.value.table.filterEdit : messages.value.table.filter, {
    column: columnLabel.value
  })
);
```

模板同步替换：`{{ messages.table.filterNoMatching }}`（无匹配空态）、`{{ messages.table.filterClear }}`（清除按钮）、option `control-props` 用 `interpolate(messages.table.filterSelect, { label: option.label })`。

**验证（测试驱动）：** 新增「localizes filter popover copy via the ConfigProvider locale」（zh-CN：触发按钮 `aria-label="筛选「Name」"`、搜索输入 `aria-label="搜索「Name」的筛选选项"` + `placeholder="搜索 Name"`、摘要 `2 个选项` → 勾选后 `已选 1 项` → 清除后 `update:filterState` 为 `{}`）、「localizes the empty state via the ConfigProvider locale」（`暂无数据`/`当前没有可显示的数据。`）。

### 3.3 Minor — D5-01 `styles/table.ts` 6 个 size 变体 `caption` 死键

**现象：** [styles/table.ts](../../packages/ui/src/styles/table.ts) `scv` recipe 的 `slots.caption` 声明 `'py-*'` 类，但组件模板（`TableCompact` 18 槽 + headless 原语）**没有任何 caption 渲染位**——该槽位在 6 个 size 变体（xs/sm/md/lg/xl/2xl）各注入一次但永不生效（死键），与 C53/C55 核查的「recipe 槽位全对齐无死键」标准不符。

**修复：** 删除 6 个 size 变体的 `caption: 'py-*'` 行（根槽位列表本身不含 `caption`，仅 size 变体残留）。`scv` 类型推导同步收窄，无下游类型影响。

**验证：** `pnpm typecheck` 全绿（recipe 类型自动推导剔除死槽）；UI 渲染无变化（死键本就无效果）。

### 3.4 核查结论 — C42/C52/C55 同款风险核查

- **C42 同款缺省 Boolean cast 风险：不适用。** `multiple` 是唯一依赖默认值的泛型 Boolean prop，headless 层以**函数式默认** `() => true as M` 声明（3.1 修复），`useSelection` 的 `getVueBooleanCasting` 对 `true`/`false`/`undefined` 三态归一化正确；UI 包装层同步函数式默认，无 cast 覆盖路径。
- **C52 同款 `*Props` 声明未绑定：已核验。** `TableCompact` 的 6 个 `*Props` 通道（`headProps`/`cellProps`/`rowProps`/`scrollProps`/`contentProps`/`footerProps`）全部在模板 v-bind 消费（`TableHeader v-bind="headerProps"` 等），无静默丢弃。
- **C52 同款 `aschild` 泄漏：不存在。** 15 个 headless 原语均经 `useOmitProps` 转发 + `Primitive` 消费 `as`/`asChild`（spec「data attributes」断言 root 无 `aschild`/`as=` 泄漏）。
- **D1-07 数据属性：齐备。** root/scroll/content/header/row/cell/body 等 8 处 `data-soybean-table-*` 渲染齐备，无冗余属性（spec 逐一断言）。
- **D7-05 a11y：通过。** 排序按钮 `aria-sort`（th 上 `aria-sort`/`aria-label` 双通道）、选择控件 `aria-label`/`aria-pressed`、筛选浮层 `aria-label` 注入、展开/树切换 `aria-expanded`——axe 0 违规。

### 3.5 D7-11 — 单测覆盖不足（已扩展 29 → 36 项）

**处理：** 扩展 [table.spec.ts](../../packages/ui/test/specs/components/table.spec.ts)（保留原 29 项语义）至 **36 项**，全部通过：

```bash
✓ test/specs/components/table.spec.ts (36 tests) 545ms
```

> 新增 7 项：**defaults 2 项**（`multiple` 未传 → 复选框 + 全选、无 radio；`multiple: false` → 行内 radio + 隐藏全选）；**controlled state 2 项**（受控 `sortState` 保持内部排序；受控 `selected` 点击发出 `update:selected` 但不内部变更）；**data attributes 1 项**（8 个 `data-soybean-table-*` 属性存在、root 无 `aschild`/`as` 泄漏）；**localization 2 项**（筛选浮层 zh-CN 全链路文案 + 交互、空态 zh-CN）。

> 关键测试要点：① 受控排序场景 aria-label 随排序态变化（`Sort by Age` → `Sort by Age, currently ascending`），选择器须用当前态文案；② 本地化断言经 `document.body`（浮层 teleport 到 body）而非 wrapper；③ ConfigProvider 子组件 emit 用 `wrapper.findComponent({ name: 'STable' }).emitted(...)`（`findComponent(STable)` 泛型 SFC 类型命中 `FunctionalComponent` 重载返回 `DOMWrapper`，`{ name }` 对象形式命中 `ComponentOptions` 重载返回 `VueWrapper`）。

### 3.6 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：概述（配置式 columns + headless/styled 分离 + 六态状态机）、用法、特性（9 条 bullet）、组件家族（`STable` + `TableCompact` + 15 个 headless 原语 + 3 个 composable）、演示（20 示例导览）、API、说明（架构与对标差异：**9 能力 × 4 对标库矩阵** + 7 条注意事项）、常见问题（7 组：受控状态、树形数据、虚拟滚动、固定列、列宽拖拽、筛选浮层定制、本地化）。中英文结构一一对应；Cautions 收录本轮修复要点（`multiple` 默认多选、受控状态不回写、筛选浮层插槽覆盖、`data-soybean-table-*` 约定、RTL 对齐语义、列宽拖拽 `minWidth`、虚拟滚动行高估计）。

---

## 四、架构与模式要点

### 泛型布尔默认值只能走函数式：`InferDefault` 对泛型的类型级约束

Vue `InferDefault<P, T>` 的 `T extends NativeType ? T : never` 分支依赖**静态可判定**——泛型 `M extends boolean` 无法判定 `M | undefined extends NativeType`，字面量默认值（含 `as unknown as M` 断言）被 `never` 分支拒绝。**修复模式固化：泛型布尔 prop 的 `withDefaults` 默认值一律使用函数式** `multiple: () => true as M`（返回类型 `M` 可赋给 `(M | undefined) & {}`）。运行时语义与字面量默认等价（Vue 按实例调用取回）；`as M` 单向窄断言（literal → 泛型约束内）合规，不需要 `as unknown as`。

### 筛选浮层是 table 的第三处 a11y 文本通道

触发按钮 aria-label、搜索输入 aria-label + placeholder、筛选摘要、无匹配空态、清除按钮、选项 aria-label 构成筛选浮层的完整 a11y 文案面；本轮全部接入 `useLocaleMessages` + `interpolate`（11 键 × 13 语言包），与选择/排序/展开/空态的既有本地化通道齐平——与 C35 cascader filterable、C55 stepper 实时区域的模式一致。审计弹层类子组件时，teleport 到 body 的内容必须经 `document.body` 断言（happy-dom 下 `wrapper` 不可达）。

### Compact 聚合的 18 槽 + 6 `*Props` 通道是本组件族的定制面

`TableCompact` 采用「headless 拥有迭代/默认内容/内部组合」的 Compact 模式（select/date-field/dialog 同款），UI 层仅处理变体、类注入与 prop/slot 转发；18 个槽中 13 个 slot props 透传、默认插槽经 `slotNames` 动态转发。审计 Compact 聚合组件时，`*Props` 通道的 v-bind 消费、插槽转发、`data-soybean-*` 数据属性三处必须逐项核对（C52 连锁缺陷即源于此三处）。

---

## 五、变更文件清单

| 文件                                                        | 变更类型                                                                                                                                                                                                                                            |
| :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/table/table-compact.vue`  | **Minor 修复**（D4-01）：`multiple: true as unknown as M` → `multiple: () => true as M`（函数式默认，消除双重断言 + typecheck 报错）                                                                                                                |
| `packages/ui/src/components/table/table.vue`                | 同款修复（UI 层泛型布尔默认值）                                                                                                                                                                                                                     |
| `packages/headless/src/locale/types.ts`                     | `LocaleTableMessages` 新增 11 键（`filterSelected`/`filterKeywordActive`/`filterOptionsCount`/`filterNoOptions`/`filterEdit`/`filter`/`filterSearch`/`filterNoMatching`/`filterClear`/`filterSelect`/`filterSearchPlaceholder`，含 JSDoc 插值说明） |
| `packages/headless/src/locale/langs/*.ts`（13 语言包）      | 同步补充 `table` 段 11 键翻译（en/zh-CN/zh-TW/ja/ko/ru/de/fr/es/pt-BR/id/tr/ar）                                                                                                                                                                    |
| `packages/ui/src/components/table/table-filter-popover.vue` | **Minor 修复**（D1-08/D2-11）：8 处硬编码英文 → `useLocaleMessages` + `interpolate` 本地化（摘要/触发 aria-label/搜索 aria-label+placeholder/无匹配/清除/选项 aria-label）                                                                          |
| `packages/ui/src/styles/table.ts`                           | **Minor 修复**（D5-01）：6 个 size 变体 `caption: 'py-*'` 死键删除（无对应模板渲染位）                                                                                                                                                              |
| `packages/ui/test/specs/components/table.spec.ts`           | 单测 29 → 36 项扩展（defaults 多选/单选默认、controlled state 两组、data attributes、localization 两组）；`findComponent({ name: 'STable' })` 收窄 emit 断言                                                                                        |
| `apps/docs/src/docs/en/components/table.md`                 | 文档 4 节 → 8 节 Recommended structure（Component family + 9 能力 × 4 对标库矩阵 + Cautions 7 条 + FAQ 7 组）                                                                                                                                       |
| `apps/docs/src/docs/zh-CN/components/table.md`              | 与 en 一一对应的 8 节中文化版本                                                                                                                                                                                                                     |
| `docs/check.md`                                             | C61 行 7 维度 ⏳ → ✅；4.10 批次 9 记录表追加 C61 行 + 批次合计（1 单元，单测 29 → 36 项）                                                                                                                                                          |
| `docs/check-reports/C61-table.md`                           | **新建** 本审计报告                                                                                                                                                                                                                                 |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/table.spec.ts   # 36/36 全绿
pnpm --filter @soybeanjs/ui exec vitest run   # 全量 109 文件 1586/1586 全绿（D7-09 回归）
pnpm lint                                # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                           | 对标依据    | 说明                                                                                                                                                                                                                    |
| :------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `table` 独立浏览器 e2e           | 自研标准    | 按 check.md 2.3.4 清单，`table` 属键盘导航类（D7-19）且含虚拟滚动（D7-01/D7-02），须补浏览器 e2e（真实列宽拖拽指针序列 + 虚拟滚动滚动性能 + 真实 Tab 序列 + axe），本轮以 happy-dom 单测 + axe 静态检查替代，非 Blocker |
| 1k 行虚拟滚动帧率基准            | D7-01/D7-02 | 建议纳入浏览器 e2e 性能断言（当前仅单测覆盖虚拟行渲染数量与 padding 推导逻辑，未测真实 60fps 帧率）                                                                                                                     |
| `pagination` 与 `table` 集成示例 | D2-04       | 目前 `pagination` 为独立组件，table 文档仅示例分页数据切片；可提供受控 `pagination` 组合示例（非缺陷，AntD 同款模式）                                                                                                   |
