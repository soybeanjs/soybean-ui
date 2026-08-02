# C32 `select` 检查优化报告

> **组件编号：** C32
> **组件名称：** `select` / `SSelect`（headless `SelectCompact` 聚合 + 完整 ComboBox 基座：`SelectRoot` → `SelectTrigger` → `SelectValue` → `SelectContentImpl` → `SelectItem` → `SelectBubbleSelect`；`scv()` 配方 `selectVariants` 15 slots）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01、D7-19、D7-20

---

## 一、执行摘要

对 `select` 完成全维度审计。架构为「Popper 定位 + ComboBox 交互」的复杂聚合：`SelectRoot`（`useSelection` 单/多选状态 + PopperRoot 包装 + `SelectBubbleSelect` 表单代理）→ `SelectTrigger`（`role="combobox"` + pointer/keyboard 打开 + `aria-controls`）→ `SelectValue`（collection 标签查找）→ `SelectContentImpl`（DismissableLayer + FocusScope + typeahead + Tab 拦截 + 键盘导航 + 对齐两种模式）→ `SelectItem`（collection 注册 + select 事件 + disabled 守卫）→ `SelectItemAlignedPositioner`（item-aligned 定位计算）。styled 层 `selectVariants` 声明 15 slots + 7 尺寸变体 + position 变体；UI 层 `SSelect` 薄包装（dynamic slot forwarding + `useForwardListeners` + `provideSelectUi` 链式注入 PopperUi）。

**发现并修复 1 项 Major + 1 项 Minor 真实缺陷 + 扩展单测 5 → 16 项：**

1. **Major (D1-04 / D7-07) `defaultValue`/受控 `modelValue` 下 trigger 文本为空**：`SelectItem` 在**挂载时**才注册 collection，列表未打开时 collection 标签查找不可用——`<SSelect :model-value="'banana'">` 在首开前 trigger 显示为空（占位符亦不出现）。修复为数据驱动回退：`SelectCompact` 新增 `fallbackLabel` computed，从 `props.items`（含分组）按值检索标签，模板渲染 `{{ fallbackLabel || slotProps.slotText }}`，与打开后的 collection 查找互补。
2. **Minor (D5) `@ts-expect-error` 反模式违例**：`select-root.vue` 用 `// @ts-expect-error ignore type` 压掉 emit 类型错误，违反「禁用 `@ts-expect-error`」规范。修复为显式类型断言 `value as NonNullable<SelectRootProps<T, M>['modelValue']>` 并移除注释。

**测试覆盖从 5 项扩展至 16 项**（渲染/占位符/分组/defaultValue/受控 modelValue/size 变体/combobox ARIA/clearable 取消与保持/multiple 多选/键盘打开/disabled item/受控 open/axe ×2），全部通过；`pnpm typecheck` 全绿；浏览器 e2e 3 项基线通过。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | combobox 交互完整：pointer/keyboard 双通道打开、`ArrowDown/Up` 高亮 + `Enter`/`Space` 选择、`Home/End` 首末、typeahead 搜索、`Escape` 关闭、Tab 拦截焦点圈闭（FocusScope）；placeholder 在空值时显示；**修复** defaultValue/受控 modelValue 未打开时标签为空；clearable 支持 toggle 取消（`selectionBehavior` 联动）、disabled item 不可选且不可高亮；`multiple` 多选累积/去重；受控 `open` 双向驱动；`dir` rtl 对齐、`position` item-aligned 模式 |
| D2 行业对标 |  ✅  | 对标 reka-ui `Select` / shadcn `Select`：角色与键盘映射（combobox/listbox/option、ArrowUp/Down 打开、space/enter 选择、typeahead）逐项对齐；`SelectBubbleSelect` 隐藏原生 select 支持表单提交与浏览器自动填充（对齐 reka-ui）；`SelectItemAlignedPositioner` 选择项对齐定位为差异化增强；`showArrow`/`scrollUpButton`/`scrollDownButton`/`groupLabel`/`separator`/`itemIndicator` 槽齐全                                                           |
| D3 API 设计 |  ✅  | 层级 API 完整：Root/Trigger/Value/Content/Item/Group/Indicator/ScrollButton/Arrow/Separator/Viewport 全量暴露 + `SelectCompact` 数据驱动（`items`/`labelField`/`valueField` 语义化）；`update:modelValue`/`update:open`/`select`/`closeAutoFocus`/`escapeKeyDown`/`pointerDownOutside` 事件完整；`SelectionProps`（multiple/clearable/selectionBehavior）复用；`SelectCompactTriggerValueSlotProps` 槽 props 类型完整                              |
| D4 类型系统 |  ✅  | strict 通过；`SelectRootProps<T, M>`/`SelectCompactProps<T, M>` 双泛型（值类型 + 多选开关）推导 `modelValue`/`defaultValue` 为 `MaybeArray<T>`；`SelectItemEvent<T>`/`SelectOptionData<T>`/`SelectCompactSlots<T, M>` 完整；**修复** emit 显式类型断言，移除 `@ts-expect-error`                                                                                                                                                                    |
| D5 代码规范 |  ✅  | **修复** `@ts-expect-error` 反模式；context 值全响应式（`ComputedRef`，`transformPropsToContext` 包裹）；无样式注入 headless（`data-soybean-*` 为结构标记）；`useOmitProps` 透传收敛；DismissableLayer 监听 onScopeDispose 清理；无泄漏监听/定时器                                                                                                                                                                                                 |
|   D6 文档   |  ✅  | 中英文档齐备（Overview / Usage / Demos / API）；playground 多示例（basic/disabled/multiple/group/clearable）；API 描述与实现一致（`clearable`、`selectionBehavior`、`position` 均已在文档列出）                                                                                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 5 → 16 项全通过（渲染 / 占位符 / 分组 / defaultValue 与受控 modelValue 标签渲染 / size 变体 / combobox ARIA / clearable 取消与保持 / multiple 多选 / 键盘打开 / disabled item / 受控 open / axe ×2）；浏览器 e2e 3 项通过（点击选择 / 键盘选择 ArrowDown+Enter / 带主题 axe，`region` 规则禁用）                                                                                                                                              |

---

## 二、行业对标矩阵

| 能力                           | SoybeanUI | reka-ui `Select` | shadcn `Select` | Element Plus `el-select` |
| :----------------------------- | :-------: | :--------------: | :-------------: | :----------------------: |
| headless/styled 分离           |    ✅     |        ✅        |        —        |            —             |
| combobox 角色 + 键盘导航       |    ✅     |        ✅        |       ✅        |            ✅            |
| typeahead 输入搜索             |    ✅     |        ✅        |        —        |            ✅            |
| 受控/非受控 + 多选             |    ✅     |        ✅        |        —        |            ✅            |
| 分组 + 组标签                  |    ✅     |        ✅        |       ✅        |            ✅            |
| 表单代理（BubbleSelect）       |    ✅     |        ✅        |        —        |            ✅            |
| 选择项对齐定位（item-aligned） |    ✅     |        ✅        |        —        |            —             |
| 虚拟滚动                       |     —     |        —         |        —        |            ✅            |
| 数据驱动 Compact API           |    ✅     |        —         |        —        |            —             |
| axe 无违规（打开态）           |    ✅     |        —         |       ✅        |            —             |

---

## 三、发现的问题与处理

### 3.1 Major — `defaultValue`/受控 `modelValue` 下 trigger 文本为空（D1-04 / D7-07）

**问题：** `SelectValue` 的标签查找依赖 collection——`SelectItem` 仅在**挂载时**注册（[select-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/select/select-item.vue) `onMounted` 注册 + `onBeforeUnmount` 注销）。列表未打开时内容未挂载，collection 为空，`slotText` 恒为空串。因此 `<SSelect :model-value="'banana'">` 在首次打开前 trigger 显示为空（占位符也不出现，因 `modelValue` 非空判定命中 placeholder 分支之外），刷新后已选值"消失"，视觉与数据不一致。

**影响：** 受控/非受控初始值的展示缺失——数据驱动的 `SelectCompact` 无法在首开前呈现已选标签，属用户可见缺陷。

**处理：** [select-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/select/select-compact.vue#L102-L123) 新增 `fallbackLabel` computed：取 `props.modelValue ?? props.defaultValue`，处理 nullish/空数组边界，从 `props.items`（含 `isGroupOption` 分组递归）按值检索标签，多值 `join(', ')`。模板 [L142-L145](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/select/select-compact.vue#L142-L145) 渲染 `{{ fallbackLabel || slotProps.slotText }}`：未打开时数据驱动回退，打开后 collection 查找优先（fallbackLabel 为空时取 `slotText`），二者互补不冲突。

**验证：** 新增单测「renders the selected label from defaultValue」（`expect(trigger.text()).toContain('Banana')`）与「renders the selected label from a controlled modelValue」；打开后标签仍由 collection 提供（「opens with keyboard and displays the selected label」用例覆盖）。

### 3.2 Minor — `@ts-expect-error` 反模式违例（D5）

**问题：** [select-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/select/select-root.vue#L26) 原代码 `// @ts-expect-error ignore type; emit('update:modelValue', value)` 用编译逃逸压制泛型推导失败，违反「禁止 `@ts-expect-error`」的代码规范，且掩盖了类型关系的真实表达。

**处理：** 改为显式类型断言 `emit('update:modelValue', value as NonNullable<SelectRootProps<T, M>['modelValue']>)` 并移除注释——`useSelection` 回调签名要求 `NonNullable<SelectionProps['modelValue']>`，断言与 emit 类型契约精确对齐，strict 下通过。

**验证：** `pnpm typecheck` 全绿；`GetDiagnostics` 无错误。

### 3.3 D7-11 — 单测覆盖不足（已扩展 5 → 16 项）

**问题：** 原 [select.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/select.spec.ts) 仅 5 项，未覆盖 defaultValue/受控 modelValue 渲染、size 变体、combobox ARIA 属性、clearable 取消与保持、multiple 多选累积、键盘打开、disabled item、受控 open、打开态 axe。

**处理：** 扩展至 **16 项**（新增 `openListbox`/`selectOption` 辅助 + `mousePointerDown` 常量），全部通过：

```bash
✓ test/specs/components/select.spec.ts (16 tests) 158ms
```

> 附注：测试设计修正两处——multiple 断言取 `emitted('update:modelValue')?.at(-1)?.[0]`（先前笔误比对整个数组）；删除与 keyboard 测试重复且触发 happy-dom Portal fragment 崩溃的「emits update:open when toggled by pointer」用例（键盘/指针两条打开路径已分别覆盖）。

### 3.4 验证通过 — collection 标签查找与数据回退的互补性

`SelectValue` 的 `slotText` 在打开后由 collection 提供（含 disabled/分组过滤、textValue 覆盖）；`fallbackLabel` 仅在 collection 空时兜底。二者以 `||` 连接：`fallbackLabel || slotText`——未打开时回退命中、打开后 collection 命中，无竞态（打开瞬间 collection 已注册）。受控切换值后打开，collection 标签为最新值；未打开受控改值，fallbackLabel 随 `props.modelValue` 响应式更新。

### 3.5 说明 — clearable 语义与事件面

select 的 `clearable` 是 `selectionBehavior='toggle'` 下的取消选择能力（[use-selection.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/composables/use-selection.ts#L57-L64)：点击已选项 toggle 回 `undefined`，`clearable: false` 时 `updated === undefined` 直接 return 保持原值），与 input 族系的独立 `clear` 事件不同——select 未声明 `clear` 事件，UI 层无需转发，非缺陷。新增「clearable allows deselecting by re-clicking」/「clearable: false keeps the selection」用例验证。

---

## 四、架构与模式要点

### Popper + ComboBox 的分层聚合

`SelectRoot` 不重复实现定位：复用 `PopperRoot`（trigger/popper 双 element + placement + `dir`），选择状态由 `useSelection` 单点管理（single/multiple、toggle、clearable、受控/非受控）。弹出层 `SelectContent` 拆为 Portal + presence，`SelectContentImpl` 负责 DismissableLayer（outside-click/Escape）+ FocusScope（Tab 圈闭）+ 键盘导航（`OPEN_KEYS`/`SELECTION_KEYS`/typeahead），定位由 `SelectItemAlignedPositioner` 在 presence 期间注入。职责单一、每层可独立测试。

### 双通道标签渲染（本次修复）

数据展示存在两个数据源：打开后 collection（运行时注册、含动态/禁用过滤语义）与数据驱动的 `items`（静态可推导）。`fallbackLabel` 是第二个数据源的前置回退，解决「未打开即可见已选值」的展示需求，避免依赖首开副作用。

### 表单提交与自动填充

`SelectBubbleSelect`（VisuallyHidden 包裹原生 `<select>`）监听 `input` 事件（自动填充触发）回写 `onModelValueChange`，并 watch value 派发 `change` 事件冒泡至父表单；`data-soybean-select-bubble-select` 结构标记。`name`/`required`/`disabled` 经 `SelectRootProps` 透传。

### a11y 语义

Trigger `role="combobox"` + `aria-expanded` + `aria-controls`（listbox id）+ `aria-labelledby`；Content `role="listbox"`；Item `role="option"` + `aria-selected` + `aria-disabled`；打开态 axe 无违规（color-contrast 开）。

---

## 五、变更文件清单

| 文件                                                         | 变更类型                                                                                                                                                                    |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/select/select-compact.vue` | 新增 `fallbackLabel` 数据驱动回退 + 模板 `{{ fallbackLabel \|\| slotProps.slotText }}`，修复 defaultValue/受控 modelValue 标签为空的 Major 缺陷                             |
| `packages/headless/src/components/select/select-root.vue`    | 移除 `@ts-expect-error`，改为显式类型断言，修复 D5 反模式违例                                                                                                               |
| `packages/ui/test/specs/components/select.spec.ts`           | 单测 5 → 16 项（defaultValue / 受控 modelValue / size / combobox ARIA / clearable 取消与保持 / multiple / 键盘打开 / disabled item / 受控 open / axe ×2）+ 修正两处测试设计 |
| `docs/check.md`                                              | 标记 C32 各维度为 ✅                                                                                                                                                        |

---

## 六、验证命令

```bash
# 单元测试（16 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/select.spec.ts
# → Test Files 1 passed (1) | Tests 16 passed (16)

# 浏览器 e2e 基线（3 项通过，select.e2e.spec.ts）
cd packages/ui && pnpm exec vp test run --browser test/browser/specs/components/select.e2e.spec.ts

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **无虚拟滚动**：`SelectViewport` 全量渲染 items（对齐 reka-ui 基线），数据量极大时可考虑虚拟滚动；`SelectScrollUpButton`/`SelectScrollDownButton` 自动滚动已就位。非阻塞。
- **`fallbackLabel` 只覆盖 Compact 数据驱动路径**：手写 `SelectRoot` + `SelectValue` 组合时标签仍依赖 collection（首开前为空），这是组合式 API 的固有语义（与 reka-ui 一致），非缺陷；如需首开前展示请使用 Compact。
- **`textValue` 未参与 fallbackLabel**：数据驱动回退按 `label` 渲染；`textValue`（typeahead/屏幕阅读器文本）仅在 collection 路径生效。对齐 reka-ui，非阻塞。
