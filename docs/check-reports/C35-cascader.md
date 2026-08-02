# C35 `cascader` 检查优化报告

> **组件编号：** C35
> **组件名称：** `cascader` / `SCascader`（headless `CascaderCompact` 聚合 + 完整基座：`CascaderRoot`（泛型 `T/M/P` + `getVueBooleanCasting` 归一化）→ `useCascaderData` 自研数据引擎（树构建/多列菜单/级联选择/懒加载/远程搜索/搜索模式/键盘导航）→ `CascaderTrigger`（`role="combobox"` + `aria-haspopup="tree"`）→ `CascaderMenu`（多列 + 内建虚拟滚动）→ `CascaderOption`（`role="treeitem"` + 可取消自定义事件）；`scv()` 配方 `cascaderVariants` 16 slots + 7 尺寸变体）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-01

---

## 一、执行摘要

对 `cascader` 完成全维度审计。架构为「自研数据引擎 + 多列菜单 + Compact 聚合」的复杂级联组件：`CascaderRoot`（泛型 `T/M/P`，`useControllableState(modelValue/open)` + `getVueBooleanCasting` 归一化泛型 Boolean）→ `useCascaderData`（树构建 `buildCascaderNodes`/`flattenCascaderNodes`、多列 `menus` computed、级联选择 `setCheckedDeep`/`recomputeAncestors`/`collectCheckedNodes`、懒加载 `loadChildren`、远程搜索防抖 + `onWatcherCleanup`、搜索模式、ArrowDown/Up/Home/End + ArrowLeft/Right 跨列 + Enter 键盘导航）→ `CascaderMenu`（多列渲染 + 内建虚拟滚动）→ `CascaderOption`（`role="treeitem"` + `CASCADER_SELECT_EVENT`/`CASCADER_EXPAND_EVENT` 可取消自定义事件）。styled 层 `cascaderVariants` 16 slots + 7 尺寸变体；UI 层 `SCascader` 薄包装（dynamic slot forwarding + `provideCascaderUi` 链式注入 PopperUi）。

**发现并修复 2 类真实缺陷 + 扩展单测 10 → 21 项：**

1. **Major (D2-11/D7-05) 4 处硬编码中文文案未走 locale**：清空按钮 `aria-label="清除"`（[cascader-clear.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-clear.vue)）、空态默认插槽 `暂无数据`（[cascader-empty.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-empty.vue)）、tag 移除按钮 `aria-label="移除 ${label}"`（[cascader-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-compact.vue)）、filterable 搜索输入框无可访问名称。族系内 combobox/tags-input/autocomplete 均已走 `useLocaleMessages()`，cascader 是唯一遗漏。修复为新增 `LocaleCascaderMessages`（`clear`/`noResults`/`removeTag`（`{label}` 模板）/`search`）并同步 13 个语言包；新增 `emptyLabel`/`clearLabel` prop（对齐 combobox 的 `emptyLabel ?? messages.noResults` / `clearLabel ?? messages.clearInput` 模式）；搜索输入框注入 `aria-label` 回退。
2. **Major (D7-05) 打开态 axe `aria-allowed-attr` critical 违规**：filterable 搜索输入框（隐式 `textbox` 角色）绑定了 `aria-expanded`——该属性仅允许在 `combobox`/`dialog` 等特定角色上，`textbox` 不允许。触发元素（`role="combobox"`，含 `aria-controls`/`aria-expanded`/`aria-haspopup`/`aria-activedescendant`）已表达打开态，input 上属冗余。修复为移除 input 上的 `aria-expanded`（`aria-controls`/`aria-autocomplete` 在 textbox 上合法保留），打开态 axe 0 违规。

**测试覆盖从 10 项扩展至 21 项**（渲染/多列展开/pathMode/泛型 Boolean 归一化 ×2/单选叶子关面板/键盘 ArrowDown+Enter 选择/multiple 级联 + 裸 `multiple`/tag 移除按钮 locale aria-label/tag 移除更新 modelValue/清空按钮发 `[]` + `clear` 事件/filterable 过滤 + 搜索框可访问名称 + locale 空态 + `emptyLabel` 覆盖/清空单选 + `clearLabel` 覆盖/disabled/axe ×2（关闭态 + 打开态 filterable）），全部通过；`pnpm typecheck` 全绿；族系回归（combobox/select/autocomplete/tags-input/password/input-number）116 项通过。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 级联闭环完整：多列菜单（`menus[0]` 根级 + 展开链）、级联选择（`setCheckedDeep` 深级联 + `recomputeAncestors` 祖先回溯 + `collectCheckedNodes` 按 `showCheckedStrategy`）、懒加载（`loadChildren` try/finally + `onLoaded`）、远程搜索（`searchDelay` 防抖 + `onWatcherCleanup` 清理）、filterable 扁平过滤（`filter` 自定义或默认路径标签 `includes`）、单选叶子自动关面板、hover/click 双展开触发、键盘全导航；disabled item/disabled root 守卫完整 |
| D2 行业对标 |  ✅  | 对标 Ant Design Cascader + reka-ui `Cascader`：多列面板/级联复选/懒加载/远程搜索/`showCheckedStrategy`（child/parent）对齐 AntD；可取消自定义事件（select/expand）与 `getVueBooleanCasting` 泛型 Boolean 归一化对齐 reka-ui 陷阱规避；**修复** 4 处硬编码中文 → locale 消息（对齐族系 combobox/tags-input 模式）；虚拟滚动/多列/路径模式（`pathMode` 返回完整路径）为差异化增强                                                                      |
| D3 API 设计 |  ✅  | 层级 API 完整：Root/Compact 全量暴露 + 6 子组件（Trigger/Value/SearchInput/Content/Menu/Option/Tags/Clear/Empty）；泛型 `T/M/P` 推导 `modelValue`（`CascaderValue<T,M,P>`）；`update:modelValue`/`update:open`/`change`/`clear`/`loaded` 事件完整；槽 props 类型完整（trigger-value/tag/option/empty/search-input/trigger-icon）；**新增** `emptyLabel`/`clearLabel` prop（对齐 combobox）                                                           |
| D4 类型系统 |  ✅  | strict 通过；`LocaleCascaderMessages` 新增 4 键 + `LocaleMessages` 挂载，13 个语言包类型同步；`getVueBooleanCasting` 正确规避 C33「withDefaults Boolean 隐式默认化」族系陷阱（泛型 `M/P` 裸属性 `''` → `true`）；`CascaderCompactProps` omit 列表同步新增 `emptyLabel`/`clearLabel`                                                                                                                                                                  |
| D5 代码规范 |  ✅  | context 值全响应式（`ComputedRef`/`ShallowRef`）；无样式注入 headless；`shallowReactive` 节点避免泛型值 ref 解包；异步路径 try/finally + `onWatcherCleanup` 清理定时器；自定义事件 `defaultPrevented` 守卫 + disabled 守卫；`useOmitProps` 透传收敛；无泄漏监听                                                                                                                                                                                      |
|   D6 文档   |  ✅  | 中英文档齐备；playground 示例覆盖基本/多选/懒加载/远程搜索/搜索/路径模式/自定义样式；API 描述与实现一致（`fieldKeys`/`showCheckedStrategy`/`pathMode`/`virtualScroll` 均在文档列出）                                                                                                                                                                                                                                                                 |
|   D7 其他   |  ✅  | 单测 10 → 21 项全通过（新增键盘选择/单选关面板/多选 tag 移除 + 清空 + locale aria-label/filterable 空态 + 搜索框命名/清空 + `clearLabel`/打开态 axe）；**修复** 打开态 axe `aria-allowed-attr` critical 违规（input 上非法 `aria-expanded`）与 4 处硬编码中文；无独立浏览器 e2e 文件，D7-19/20 以 happy-dom 单测覆盖（打开态 axe + 交互断言 + 键盘导航），portal/tree 角色的浏览器行为由 popper 族系 e2e 间接覆盖                                    |

---

## 二、行业对标矩阵

| 能力                    | SoybeanUI | Ant Design `Cascader` | reka-ui `Cascader` | Element Plus `Cascader` |
| :---------------------- | :-------: | :-------------------: | :----------------: | :---------------------: |
| headless/styled 分离    |    ✅     |           —           |         ✅         |            —            |
| 多列面板                |    ✅     |          ✅           |         ✅         |           ✅            |
| 级联复选 + 半选状态     |    ✅     |          ✅           |         —          |           ✅            |
| 懒加载 / 远程搜索       |    ✅     |          ✅           |         ✅         |           ✅            |
| showCheckedStrategy     |    ✅     |          ✅           |         —          |            —            |
| pathMode（路径值）      |    ✅     |          ✅           |         —          |            —            |
| 虚拟滚动                |    ✅     |           —           |         —          |            —            |
| 可取消自定义事件        |    ✅     |           —           |         ✅         |            —            |
| locale 文案（非硬编码） |    ✅     |           —           |         —          |           ✅            |
| axe 无违规（打开态）    |    ✅     |           —           |         —          |            —            |

---

## 三、发现的问题与处理

### 3.1 Major — 4 处硬编码中文文案未走 locale（D2-11 / D7-05）

**问题：** cascader 是族系中唯一未接入 `useLocaleMessages()` 的组件，4 处硬编码中文：

1. [cascader-clear.vue#L32](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-clear.vue) 清空按钮 `:aria-label="ariaLabel || '清除'"`——其他 locale 下仍显示中文。
2. [cascader-empty.vue#L16](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-empty.vue) 空态默认插槽 `暂无数据`——同族 combobox 为 `emptyLabel ?? messages.combobox.noResults`。
3. [cascader-compact.vue#L130](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-compact.vue) tag 移除按钮 `:aria-label="\`移除 ${label}\`"`——含用户数据的拼接标签不可本地化。
4. [cascader-search-input.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-search-input.vue) 搜索输入框无可访问名称——axe 对裸 input 要求可访问名称（combobox 的 input 已有 `aria-label` 注入）。

**影响：** 切换非中文 locale（`ConfigProvider.locale`）后清空/空态/tag 移除仍显示中文，i18n 不一致；屏幕阅读器无法获知搜索框用途（WCAG 1.3.1）。对照 audit.md D2-11（对标增强）与 D7-05（可访问性）验收项均失败。

**处理：** 按族系既有模式修复：

1. [locale/types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/locale/types.ts#L35-L44) 新增 `LocaleCascaderMessages`（`clear`/`noResults`/`removeTag`（`{label}` 占位符）/`search`），`LocaleMessages` 挂载 `cascader` 键；13 个语言包同步翻译。
2. [cascader-clear.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-clear.vue#L24-L26)：`attrs['aria-label'] ?? (props.ariaLabel || messages.cascader.clear)`（对齐 tags-input-clear 的 attrs 优先模式）。
3. [cascader-empty.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-empty.vue)：默认插槽改为空 `<slot />`（对齐 combobox-empty），文案由 compact 注入。
4. [cascader-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-compact.vue)：新增 `emptyLabel`/`clearLabel` prop（`@defaultValue` locale 消息）；empty 插槽 `{{ emptyLabel ?? messages.cascader.noResults }}`；tag 移除按钮 `messages.cascader.removeTag.replace('{label}', label)`（占位符模式对齐 table.selectRow/rating.starN）。
5. [cascader-search-input.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-search-input.vue#L24)：`attrs['aria-label'] ?? messages.cascader.search`。

**验证：** 新增单测断言默认 locale（en）下 aria-label 与文案：tag 移除按钮 `Remove 浙江`、清空按钮 `Clear value`、搜索框 `Search`、空态 `No data`；`emptyLabel`/`clearLabel` 覆盖生效。

### 3.2 Major — 打开态 axe `aria-allowed-attr` critical 违规（D7-05）

**问题：** 新增打开态 axe 测试（filterable 模式）报 1 项 critical 违规 `aria-allowed-attr`：search input（隐式 `role="textbox"`）绑定了 `aria-expanded="true"`。WAI-ARIA 中 `aria-expanded` 仅允许在 `combobox`/`dialog`/`menu` 等角色上，`textbox` 不允许——axe 判定为非法属性。

**影响：** 屏幕阅读器行为未定义，WCAG 4.1.2 合规失败；axe 自动扫描不通过。

**处理：** [cascader-search-input.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/cascader-search-input.vue#L40-L56) 移除 input 上的 `:aria-expanded` 绑定——打开态已由 trigger（`role="combobox"`，含 `aria-controls`/`aria-expanded`/`aria-haspopup="tree"`/`aria-activedescendant`）完整表达；input 保留合法的 `aria-label`/`aria-controls`/`aria-autocomplete="list"`。修复后打开态 axe 0 违规（`region` 禁用，portal 使用）。

**验证：** 新增单测「has no a11y violations when open (filterable mode)」（修复前失败：`aria-allowed-attr` 1 项）→ 0 违规通过；既有「when paired with a label」回归通过。

### 3.3 D7-11 — 单测覆盖不足（已扩展 10 → 21 项）

**问题：** 原 [cascader.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/cascader.spec.ts) 仅 10 项，未覆盖键盘选择、单选叶子关面板、多选 tag 移除/清空、filterable 空态/搜索框命名、locale aria-label、打开态 axe。

**处理：** 扩展至 **21 项**，全部通过：

```bash
✓ test/specs/components/cascader.spec.ts (21 tests) 152ms
```

> 覆盖要点：ArrowDown+Enter 键盘选择（checkStrictly）；单选叶子选择后面板关闭；多选 tag 移除按钮 aria-label（`Remove 浙江`）+ 移除后 modelValue 更新 + 清空按钮发 `[]` + `clear` 事件；filterable 搜索框 aria-label（`Search`）/无匹配空态（`No data`）/`emptyLabel` 覆盖；单选清空发 `undefined` + `clear` 事件 + `clearLabel` 覆盖；打开态 axe。

### 3.4 验证通过 — 泛型 Boolean 归一化（D3-04 族系陷阱规避）

`multiple`/`pathMode` 是泛型 Boolean prop（`M`/`P`），Vue 无法从泛型推断运行时 Boolean 类型——裸属性会变为 `''` 而非 `true`。[hooks.ts#L75-L79](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/cascader/hooks.ts#L75-L79) 用 `getVueBooleanCasting` 归一化两种形态，正确规避了 C33「withDefaults Boolean 隐式默认化」族系陷阱；既有单测「treats a bare `path-mode`/`multiple` attribute as enabled」覆盖。非缺陷。

### 3.5 说明 — 无独立浏览器 e2e

cascader 无 `cascader.e2e.spec.ts`。D7-19/20 由 happy-dom 单测覆盖（打开态 axe、交互断言、键盘导航、tag 移除），多列/portal/tree 角色的真实浏览器行为由 popper 族系 e2e 间接覆盖。非阻塞，可在后续补 e2e 文件。

---

## 四、架构与模式要点

### 自研数据引擎 vs 复用 selection/collection

cascader 不复用 combobox/select 的 `useSelection`/`useCollection`（其单选值 + 扁平列表模型不适合树形级联），而是自研 `useCascaderData`：`shallowReactive` 节点树（缓存 `pathValues`/`pathLabels`/`level` 使运行时查找 O(1)）+ 多列 `menus` computed（`expandingPath` 驱动）+ 级联复选（`setCheckedDeep` 深级联 + `recomputeAncestors` 祖先回溯 + `collectCheckedNodes` 按策略收集）+ 懒加载/远程搜索。这是「数据形状决定引擎归属」的合理拆分——`buildCascaderNodes`/`findCascaderNodeByPath` 等纯函数在 shared.ts 可独立单测。

### 可取消自定义事件（对齐 reka-ui）

`CascaderOption` 通过 `handleAndDispatchCustomEvent` + `CASCADER_SELECT_EVENT`/`CASCADER_EXPAND_EVENT` 派发可取消事件：`await nextTick()` → emit → `defaultPrevented` 守卫 → disabled 守卫 → 实际选择/展开。消费方可在 `select`/`expand` 事件中 `preventDefault` 拦截交互（对齐 reka-ui 的事件派发风格）。

### 焦点与 aria 语义（本次修复）

trigger `role="combobox"` + `aria-haspopup="tree"` + `aria-controls` + `aria-expanded` + `aria-activedescendant`（跟随高亮节点 id）；panel `role="tree"`；option `role="treeitem"` + `aria-selected`/`aria-disabled`/`aria-expanded`/`data-state`（checked/indeterminate/unchecked）；filterable 模式 trigger `tabindex=-1`（焦点在搜索框）、搜索框注入 `aria-label`（`attrs['aria-label'] ?? messages.cascader.search`）；tag 移除按钮/清空按钮/空态文案全部走 locale（本次修复）。

### 虚拟滚动（D7-01）

`CascaderMenu` 内建虚拟滚动（`startIndex`/`visibleCount`/paddingTop/Bottom + scrollTop 跟踪），非依赖外部 virtualizer；每列独立滚动，`itemSize`/`height` 可配。多列场景下每列渲染 `viewportHeight/itemSize + 2` 行，超大树（数千节点）内存与渲染开销可控。非缺陷。

---

## 五、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                                                                               |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/locale/types.ts`                                                   | 新增 `LocaleCascaderMessages`（`clear`/`noResults`/`removeTag`/`search`）+ `LocaleMessages` 挂载 `cascader` 键                                                                                         |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,id,ru,fr,tr,es,ar,pt-BR,de}.ts` | 13 个语言包同步补充 `cascader` 4 键翻译（`removeTag` 含 `{label}` 占位符）                                                                                                                             |
| `packages/headless/src/components/cascader/cascader-clear.vue`                            | `aria-label` 硬编码 `'清除'` → `attrs['aria-label'] ?? (props.ariaLabel \|\| messages.cascader.clear)`                                                                                                 |
| `packages/headless/src/components/cascader/cascader-empty.vue`                            | 默认插槽硬编码 `暂无数据` → 空 `<slot />`（文案由 compact 注入）                                                                                                                                       |
| `packages/headless/src/components/cascader/cascader-compact.vue`                          | 新增 `emptyLabel`/`clearLabel` computed（locale 回退）；empty 插槽注入 locale 文案；tag 移除按钮 `aria-label` 硬编码中文 → `removeTag` 模板替换；`useOmitProps` omit 列表同步新增两 prop               |
| `packages/headless/src/components/cascader/cascader-search-input.vue`                     | 新增 `aria-label`（`attrs['aria-label'] ?? messages.cascader.search`）；移除 input 上非法 `aria-expanded`（textbox 不允许，trigger combobox 已表达）——修复打开态 axe `aria-allowed-attr` critical 违规 |
| `packages/headless/src/components/cascader/types.ts`                                      | `CascaderCompactProps` 新增 `emptyLabel`/`clearLabel` prop（`@defaultValue` locale 消息）                                                                                                              |
| `packages/ui/test/specs/components/cascader.spec.ts`                                      | 单测 10 → 21 项（键盘选择/单选关面板/多选 tag 移除 + 清空 + locale aria-label/filterable 空态 + 搜索框命名/清空 + `clearLabel` 覆盖/打开态 axe）                                                       |

---

## 六、验证命令

```bash
# 单元测试（21 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/cascader.spec.ts
# → Test Files 1 passed (1) | Tests 21 passed (21)

# 族系回归（combobox 23 + autocomplete 21 + select 16 + tags-input 10 + password 25 + input-number 21 = 116 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components/combobox.spec.ts test/specs/components/autocomplete.spec.ts test/specs/components/select.spec.ts test/specs/components/tags-input.spec.ts test/specs/components/password.spec.ts test/specs/components/input-number.spec.ts

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **无独立浏览器 e2e 文件**：cascader 交互（多列展开/级联复选/tag 移除/虚拟滚动滚动行为）仅在 happy-dom 单测覆盖；可补 `cascader.e2e.spec.ts` 做真实浏览器验证（真实 focus/scroll/portal）。非阻塞。
- **搜索模式下多列展开**：filterable 搜索结果点击非叶子节点时仅高亮（`onOptionSelect` 的 search 分支不展开多列），与 AntD 的「搜索结果直接切换为多列路径」存在交互差异；当前行为已提供 `highlight` 反馈，是否增强留待消费方反馈。非阻塞，报告记录备查。
- **`select`/`expand` 事件对 disabled item 仍会触发**：`CascaderOption.onSelect` 先 emit 后守卫（对齐 reka-ui 上游语义），disabled item 点击会发出事件但不会改 modelValue/展开；族系共享行为。非阻塞，报告记录备查。
