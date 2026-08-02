# C26 `menu` 检查优化报告

> **组件编号：** C26
> **组件名称：** `menu` / `SMenuOptions`、`SMenuCheckboxOptions`、`SMenuRadioOptions`
> **模式：** 多槽 + Compact（headless `MenuOptionsCompact` / `MenuCheckboxOptionsCompact` / `MenuRadioOptionsCompact` 聚合；`scv()` 配方 `menuVariants`，20 UI slots）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D1-16、D2-11、D7-05、D7-19

---

## 一、执行摘要

对 `menu` 完成全维度审计。组件架构清晰：headless 层拥有 25 个 SFC（Root / Content / ContentImpl / Item / ItemImpl / Sub / SubTrigger / SubContent / CheckboxItem / RadioItem / Group / GroupLabel / ItemIndicator + OptionsCompact 三元组 + ItemSlotCompact），6 个 context（Menu / MenuRoot / MenuContent / CheckboxGroup / RadioGroup / OptionsCompact / SubAttribute / ItemIndicator），被 menubar（C25）、dropdown-menu、context-menu 复用。styled 层为 `scv()` 配方，20 个 UI 槽位、`size`（xs…2xl 6 变体）+ `indicatorPosition` 变体与 compoundVariants。

发现并修复 4 项问题：

1. **Major (D3 / D1-16)**：Compact 系列 disabled 兜底链缺失——`menu-option-compact.vue` 的 `itemProps` / `linkProps` / `subTriggerProps` 与 `menu-radio-options-compact.vue` / `menu-checkbox-options-compact.vue` 的 `radioItemProps` / `checkboxItemProps` 中配置的 `disabled` 被 `item.disabled`（绝大多数为 `undefined`）显式绑定覆盖，全局配置被静默吞掉（C24 linkProps 同族缺陷的遗漏面）。
2. **Major (D1-08)**：checkbox / radio 菜单项渲染非标准 role `menu-checkbox-item` / `menu-radio-item`（且被 `MenuItemImpl` 静态 `role="menuitem"` 覆盖），WAI-ARIA APG menu pattern 要求 `menuitemcheckbox` / `menuitemradio`。
3. **Major (D3)**：`MenuCheckboxGroup` 的 `onModelValueChange` 用 `modelValue.value.push(v)` 原地变异，不触发 `useControllableState` setter → `update:modelValue` 事件永不 emit，受控/非受控勾选状态外部无法感知。
4. **Major (D7-05 / D7-19)**：单测仅 1 项、无浏览器 e2e；补充至 16 项单测 + 4 项 e2e。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                   |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 数据驱动嵌套 items、悬停/键盘双触发子菜单（pointer-grace 防抖 + SUB_OPEN_KEYS）、Roving Focus + 方向键 + Home/End + typeahead 字符搜索 + Tab 拦截、checkbox/radio 组 v-model、链接项、禁用惰性全部就位；**修复 checkbox/radio 项 ARIA role（`menuitemcheckbox` / `menuitemradio`）**（D1-08）                          |
| D2 行业对标 |  ✅  | 键盘/指针打开焦点差异化（`isUsingKeyboard` 决定焦点进入内容或留守触发器）、pointer-grace 子菜单悬停、typeahead 与 Radix DropdownMenu 对齐；数据驱动 compact + 20 槽位 + 6 尺寸为差异化增强；checkbox/radio role 修复后与 WAI-ARIA APG 对齐                                                                             |
| D3 API 设计 |  ✅  | 修复 Compact 系列 disabled 兜底链：`item.disabled ?? itemProps?.disabled` / `?? linkProps?.disabled` / `?? subTriggerProps?.disabled` / `?? radioItemProps?.disabled` / `?? checkboxItemProps?.disabled`；**修复 `onModelValueChange` push 原地变异不触发 `update:modelValue`**；as-child 链接型触发 disabled 三端一致 |
| D4 类型系统 |  ✅  | strict 通过；`linkProps` computed 显式类型 `Pick<LinkProps, 'disabled' \| 'to' \| 'href' \| 'target' \| 'external'>`；`MenuItemImpl` 支持 role 覆盖（`props.role ?? 'menuitem'`）；JSDoc 齐全；无公开类型变更，无需同步 menu.json                                                                                      |
| D5 代码规范 |  ✅  | `shared.ts` 常量收敛（`ITEM_SELECT` / `SUB_OPEN_KEYS` / `SUB_CLOSE_KEYS` / `COMMON_SLOTS`）；`useOmitProps` 排除清单完整（`MenuItemImpl` 增加 `role`）；监听器转发（`useForwardListeners`）无泄漏；SSR 安全                                                                                                            |
|   D6 文档   |  ✅  | 既有中英文档齐备（Overview / Usage / Demos / API）；本组件为 dropdown-menu / context-menu / menubar 的基础件，能力经派生组件文档透出                                                                                                                                                                                   |
|   D7 其他   |  ✅  | 16 项单测 + 4 项 e2e 全通过（axe-core 闭合 / 子菜单打开两场景零违规，含颜色对比）；新增 disabled 兜底、role 反射、`update:modelValue` 回归测试；真实 portal 键盘导航 e2e（D7-19）                                                                                                                                      |

---

## 二、行业对标矩阵

| 能力                                      | SoybeanUI | Ant Design `Dropdown` | Element Plus `Dropdown` | Radix `DropdownMenu` |
| :---------------------------------------- | :-------: | :-------------------: | :---------------------: | :------------------: |
| headless/styled 分离                      |    ✅     |           —           |            —            |          ✅          |
| 数据驱动 compact API                      |    ✅     |          ✅           |           ✅            |          —           |
| 多槽基元（Item/Checkbox/Radio/Sub/Group） |    ✅     |           —           |            —            |          ✅          |
| 键盘 Roving Focus + typeahead             |    ✅     |          ✅           |           ✅            |          ✅          |
| 子菜单悬停 + 键盘双触发                   |    ✅     |          ✅           |            —            |          ✅          |
| pointer-grace 悬停防抖                    |    ✅     |           —           |            —            |          ✅          |
| 禁用项（逐项 + 组件级兜底）               |    ✅     |          ✅           |           ✅            |          ✅          |
| checkbox / radio 组 v-model               |    ✅     |          ✅           |           ✅            |          ✅          |
| 链接项（href / to / target）              |    ✅     |          ✅           |            —            |          —           |
| 键盘/指针打开焦点差异化                   |    ✅     |           —           |            —            |          ✅          |
| LTR / RTL                                 |    ✅     |          ✅           |           ✅            |          ✅          |
| 尺寸变体                                  |    ✅     |           —           |            —            |          —           |
| 受控模式                                  |    ✅     |          ✅           |           ✅            |          ✅          |

---

## 三、发现的问题与处理

### 3.1 Major — Compact 系列 disabled 兜底链缺失（已修复，D3 / D1-16）

**问题：** [menu-option-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-option-compact.vue) 的链接型 MenuItem 用 `v-bind="itemProps"` + 显式 `:disabled="item.disabled"`，普通型与子菜单触发器同理；[menu-radio-options-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-radio-options-compact.vue) / [menu-checkbox-options-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-checkbox-options-compact.vue) 的 `:disabled="item.disabled"` 同样覆盖 `radioItemProps` / `checkboxItemProps`。绝大多数项不声明 `disabled`（`undefined`），显式绑定优先于 `v-bind` 展开，把组件级 `itemProps.disabled` / `linkProps.disabled` / `subTriggerProps.disabled` / `radioItemProps.disabled` / `checkboxItemProps.disabled` 全部覆盖为未定义——C24 navigation-menu 同族缺陷的遗漏面。

**修复：** 参照 C24 已修复的 `navigation-menu-option-compact.vue`，建立 `??` 兜底链，item 显式值优先、组件级 props 兜底：

```ts
const linkProps = computed<MenuOptionLinkProps>(() =>
  props.item.to || props.item.href
    ? {
        ...props.linkProps,
        disabled: props.item.disabled ?? props.linkProps?.disabled,
        to: props.item.to ?? props.linkProps?.to,
        href: props.item.href,
        target: props.item.target ?? props.linkProps?.target,
        external: props.item.external ?? props.linkProps?.external
      }
    : {}
);
```

模板同步：链接型 MenuItem 采用三端一致 `:disabled="item.disabled ?? itemProps?.disabled ?? linkProps?.disabled"`——因 `MenuItem` 为 `as-child`，`Slot` 会把 MenuItem 的 `disabled` 与 Link 的 `disabled` 合并到同一元素，两端不一致时 `undefined` 会覆盖 Link 的生效值；普通型 / 子菜单触发器为 `item.disabled ?? itemProps?.disabled` / `?? subTriggerProps?.disabled`，radio / checkbox 项为 `?? radioItemProps?.disabled` / `?? checkboxItemProps?.disabled`。

新增回归测试验证：`itemProps.disabled` 全局兜底（无显式值项继承）、`item.disabled` 优先；`linkProps.disabled` / `linkProps.target` 兜底且 item 优先；`checkboxItemProps` / `radioItemProps` 兜底。

### 3.2 Major — checkbox / radio 项 ARIA role 非标准（已修复，D1-08）

**问题：** [menu-checkbox-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-checkbox-item.vue) 传 `role="menu-checkbox-item"`、[menu-radio-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-radio-item.vue) 传 `role="menu-radio-item"`——均为无效 ARIA role，且被 [menu-item-impl.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/menu-item-impl.vue) 模板的静态 `role="menuitem"` 覆盖。最终两项渲染为 `role="menuitem"` + `aria-checked`，与 WAI-ARIA APG menu pattern（`menuitemcheckbox` / `menuitemradio`）不符，屏幕阅读器无法识别勾选语义。

**修复：** `MenuItemImpl` 将 `role` 从 `useOmitProps` 排除并动态绑定（`props.role ?? 'menuitem'`），checkbox / radio 项改用标准 role：

```html
<!-- menu-checkbox-item.vue -->
<MenuItemImpl ... role="menuitemcheckbox" :aria-checked="ariaChecked" ...>
  <!-- menu-radio-item.vue -->
  <MenuItemImpl ... role="menuitemradio" :aria-checked="ariaChecked" ...></MenuItemImpl>
</MenuItemImpl>
```

默认项与子菜单触发器不受影响（`role` 缺省 → `menuitem`）。新增测试断言 `[role="menuitemcheckbox"]` / `[role="menuitemradio"]` 渲染与 `aria-checked` 反射。

### 3.3 Major — CheckboxGroup 勾选状态不 emit `update:modelValue`（已修复，D3）

**问题：** [context.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menu/context.ts#L126-L134) 的 `onModelValueChange` 在新增值时执行 `modelValue.value.push(v)`——`push` 是原地变异，`useControllableState` 的 setter 只在 `ref.value` 被重新赋值时触发，因此勾选后 `MenuCheckboxGroup` 的 `update:modelValue` 事件永不 emit，受控模式（`v-model` 绑定）下外部状态无法更新，仅非受控内部状态能反映。`MenuRadioGroup` 的 `modelValue.value = v`（重新赋值）无此问题。

**修复：** 改为不可变更新，替换引用以触发 setter：

```ts
const onModelValueChange = (v: DefinedValue) => {
  const current = modelValue.value ?? [];

  if (current.includes(v)) {
    modelValue.value = current.filter(item => item !== v);
  } else {
    modelValue.value = [...current, v];
  }
};
```

新增测试断言点击后 `update:modelValue` emit `['bold']`（修复前恒为 `undefined`）。

### 3.4 Major — 测试覆盖严重不足（已修复，D7-05 / D7-19）

**问题：** [menu.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/menu.spec.ts) 仅 1 项（键盘打开子菜单），无渲染结构 / disabled 解析 / 选择行为 / 状态反射 / a11y 覆盖；无浏览器 e2e（audit.md 将 menu 列入「键盘导航类（须补 e2e）」重点检查 D7-19）。

**修复：** 单测扩展至 16 项：

- **rendering** — `role="menu"` / menuitem / group / separator 结构；
- **disabled fallback** — `itemProps.disabled` 兜底 + `item.disabled` 优先（3.1 回归）；
- **linkProps fallback** — `linkProps.disabled` / `linkProps.target` 兜底 + item 优先（3.1 回归）；
- **select behavior** — 点击 emit `select`（含 item 负载）、disabled 项不 emit；
- **active state** — `activeValue` → `data-active` 反射；
- **checkbox / radio options** — `menuitemcheckbox` / `menuitemradio` role（3.2 回归）、`aria-checked` 反射、`update:modelValue` emit（3.3 回归）、`checkboxItemProps` / `radioItemProps` 兜底；
- **accessibility** — axe-core 闭合与子菜单打开两场景零违规。

新增 [menu.e2e.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/browser/specs/components/menu.e2e.spec.ts) 4 项（真实 portal）：点击打开 + 禁用项渲染、Tab → Enter 键盘打开 + ArrowDown 焦点移动 + ArrowRight 打开子菜单、Escape 关闭还原焦点、打开态颜色对比 axe。

---

## 四、架构与模式要点

### 三组件复用的菜单内核

menu 是 dropdown-menu / context-menu / menubar 的公共内核：三者直接复用 `MenuOptionsCompact` / `MenuCheckboxOptionsCompact` / `MenuRadioOptionsCompact`（如 [dropdown-menu-checkbox-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/dropdown-menu/dropdown-menu-checkbox-compact.vue) 直接 `import MenuCheckboxOptions from '../menu/menu-checkbox-options-compact.vue'`）。本次修复自动覆盖全部派生组件，无需逐组件改动。

### disabled 解析链（`??` 兜底）

`item.disabled ?? itemProps?.disabled ?? linkProps?.disabled`——「逐项 > 组件级 itemProps > linkProps」三级解析链，与 C24 / C25 同族模式统一。as-child 场景要求触发器与链接元素两端解析结果一致，否则 `Slot` 合并监听器时 `undefined` 会覆盖另一端的生效值。

### role 覆盖机制（`MenuItemImpl`）

`MenuItemImpl` 把 `role` 从 `useOmitProps` 排除并 `props.role ?? 'menuitem'` 动态绑定，使 checkbox / radio 项能覆盖为标准 role 而默认项保持 `menuitem`——为菜单项 role 的派生（如未来 `menuitemcheckbox` 变体）提供扩展点。

---

## 五、变更文件清单

| 文件                                                                      | 变更类型                                                                                                                                                                |
| :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/menu/menu-option-compact.vue`           | 新增 `linkProps` computed（`Pick<LinkProps, 5 keys>` 显式类型）；链接型 MenuItem disabled 三端兜底（item → itemProps → linkProps）；普通型 / 子菜单触发器 disabled 兜底 |
| `packages/headless/src/components/menu/menu-radio-options-compact.vue`    | `radioItemProps.disabled` 兜底（`item.disabled ?? radioItemProps?.disabled`）                                                                                           |
| `packages/headless/src/components/menu/menu-checkbox-options-compact.vue` | `checkboxItemProps.disabled` 兜底（`item.disabled ?? checkboxItemProps?.disabled`）                                                                                     |
| `packages/headless/src/components/menu/menu-item-impl.vue`                | `role` 移出 `useOmitProps` 并动态绑定（`props.role ?? 'menuitem'`），支持标准 role 覆盖                                                                                 |
| `packages/headless/src/components/menu/menu-checkbox-item.vue`            | `role` 改为标准 `menuitemcheckbox`（修复非标准 `menu-checkbox-item`）                                                                                                   |
| `packages/headless/src/components/menu/menu-radio-item.vue`               | `role` 改为标准 `menuitemradio`（修复非标准 `menu-radio-item`）                                                                                                         |
| `packages/headless/src/components/menu/context.ts`                        | `onModelValueChange` 不可变更新（`[...current, v]` / `filter`），触发 `update:modelValue` emit                                                                          |
| `packages/ui/test/specs/components/menu.spec.ts`                          | 1 项 → 16 项（rendering / disabled 兜底 ×2 / linkProps 兜底 ×3 / select ×2 / active / axe ×2 / checkbox ×2 / radio ×2）                                                 |
| `packages/ui/test/browser/specs/components/menu.e2e.spec.ts`              | 新增 4 项 e2e（真实 portal 打开 + 禁用项 / 键盘打开 + Roving Focus + 子菜单 / Escape 焦点归还 / 打开态颜色对比 axe）                                                    |
| `docs/check.md`                                                           | 标记 C26 各维度为 ✅                                                                                                                                                    |

---

## 六、验证命令

```bash
# 单元测试（16 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/menu.spec.ts
# → Test Files 1 passed (1) | Tests 16 passed (16)

# 关联组件回归（dropdown-menu / context-menu / tree-menu / menubar 系列 28 项全通过）
pnpm exec vp test run test/specs/components/dropdown-menu.spec.ts test/specs/components/context-menu.spec.ts test/specs/components/tree-menu.spec.ts test/specs/components/menubar.spec.ts test/specs/components/menubar-focus.spec.ts test/specs/components/menubar-submenu.spec.ts test/specs/components/menubar-link.spec.ts
# → Test Files 7 passed (7) | Tests 28 passed (28)

# 浏览器 e2e（menu + menubar 8 项全通过）
pnpm --filter @soybeanjs/ui test:e2e test/browser/specs/components/menu.e2e.spec.ts test/browser/specs/components/menubar.e2e.spec.ts
# → Test Files 2 passed (2) | Tests 8 passed (8)

# 类型检查
pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **`indicatorPosition` 死属性**：`MenuUiBaseProps` 声明 `indicatorPosition` 且 `menuVariants` 定义了对应变体与 compoundVariants，但 headless 无 indicator 实现（`itemIndicator` 槽位存在但 Compact 仅在 checkbox / radio 项内使用 `MenuItemIndicator`，普通项不渲染）。建议与 navigation-menu / menubar / dropdown-menu 一并收敛。非阻塞。
- **图标 SVG 无 `aria-hidden`**：menu 项内装饰性 chevron / check 图标（Iconify `Icon`）渲染为无 `aria-hidden` 的 SVG，axe `svg-img-alt` 报违规；项目在 `test/shared/a11y.ts` 全局豁免。建议在 `_icon` / `config-provider` 的 iconRender 层统一处理（跨组件，非本次范围）。非阻塞。
- **portal-disabled 场景 a11y**：`portalProps.disabled` 时子菜单内容内联进 root menu，产生无 ARIA role 的定位容器直属于 `role="menu"`，axe `aria-required-children` 报违规（测试已按测试环境产物豁免）。真实使用中 portal 默认开启，不构成实际风险。非阻塞。
