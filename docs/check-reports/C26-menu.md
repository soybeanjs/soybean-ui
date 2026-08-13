# C26 `menu` 检查优化报告

> **组件编号：** C26（`menu`）
> **组件名称：** `SMenuOptions`/`SMenuCheckboxOptions`/`SMenuRadioOptions`（headless 基座：`MenuRoot`/`MenuContent`/`MenuItem`/`MenuCheckboxItem`/`MenuRadioItem`/`MenuSub`/`MenuGroup` + `MenuOptionsCompact`/`CheckboxOptionsCompact`/`RadioOptionsCompact` 聚合）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `menu` 组件家族完成全维度审计。组件为「多槽 + Compact」模式：headless 持有全部状态（roving focus、typeahead、dismissable layer、Presence、focus scope/trap、body scroll lock、hide-others、子菜单 pointer-grace）与定位（`@floating-ui/dom` + 中间件）；`MenuOptionsCompact`/`CheckboxOptionsCompact`/`RadioOptionsCompact` 下沉至 headless 完成 `items` 迭代、默认装配与子菜单递归。UI 层仅做配方注入与插槽转发。

**发现 Blocker ×1 + Major ×2（均已修复）**——类型逃逸、非法 ARIA 角色、文档结构不完整：

|    维度     | 状态 |                                                                                                                                                                                                      说明                                                                                                                                                                                                       |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                                多槽 + Compact 正确：Compact 聚合下沉至 headless；roving focus（dir 感知）、typeahead（过滤禁用）、Home/End/PageUp/PageDown、Enter/Space 选中、Esc 关闭归还焦点、Tab 循环、子菜单方向键、浮层定位、item/checkbox/radio/submenu/group 语义、禁用项、focus 管理完整（D1-08/D1-16）                                                                 |
| D2 行业对标 |  ✅  |                                                                   对标 Radix UI Menu（几乎忠实移植）、Ant Design Menu/Dropdown、Element Plus Dropdown：SoybeanUI 具备完整 roving-focus + typeahead + 子菜单方向键键盘模型（AntD/Element 键盘较弱）；三形态数据驱动 Compact API；`'mixed'` 半选；floating-ui 定位；分隔线/快捷键/分组（D2-11）                                                                   |
| D3 API 设计 |  ✅  |                                                                                        `MenuOptionData`/`MenuCheckboxOptionData`/`MenuRadioOptionData` 判别式结构清晰；`select(item, event)` 载荷语义明确；`SMenuOptions`/`SMenuCheckboxOptions`/`SMenuRadioOptions` 前缀一致；`modelValue`/`defaultValue` 符合 Vue 惯例                                                                                        |
| D4 类型系统 |  ✅  |                                                                                                                 **Blocker 修复**：移除 [menu-radio-group.vue](../../packages/headless/src/components/menu/menu-radio-group.vue) 的 `// @ts-expect-error` 类型逃逸，改用 `useControllableState<T                                                                                                                 | null>`（对齐 `radio-group` 组件），`MenuRadioGroupProps.modelValue`/`Emits`载荷/Context modelValue 均放宽为`T \| null`；Props/Emits/Slots JSDoc 覆盖完整 |
| D5 代码规范 |  ✅  |                  `eslint` 0 errors；`useOmitProps` 含 `class`；headless 用 `shallowRef` + `computed`；`useForwardElement`/`useForwardListeners`/`transformPropsToContext` 复用；**删除** [menu-radio-item.vue](../../packages/headless/src/components/menu/menu-radio-item.vue) 遗留注释死代码；**barrel 收敛**：`index.ts` 移除多余 `useMenuUi` 导出（仅保留 `provideMenuUi`，符合项目约定）                   |
|   D6 文档   |  ✅  |                                                                             **Major 修复**：en/zh 文档由 4 节（Overview/Components/Usage/API）重构为完整 Recommended structure（Overview/Features/**Component family**/Usage/Demos/API/Notes/FAQ），含架构对标表（9 关注点 × 4 库）+ 7 条运行时注意 + FAQ 5 组；中英文结构完全对齐                                                                              |
|   D7 其他   |  ✅  | 16 项单测通过（渲染/键盘子菜单/禁用回退/link 回退/select 事件/active 状态/a11y 扫描/复选单选 v-model）+ 浏览器 e2e 4 项（真实 Teleport/键盘打开与 roving focus/ArrowRight 开子菜单/Esc 归还焦点/颜色对比）；**Major 修复**：`role="menu-checkbox-group"`/`role="menu-radio-group"` 非法 ARIA 角色改为 `role="group"`（与 `MenuGroup` 一致）；data 属性遵循 D1-07（`data-soybean-menu-*`）；SSR 安全；axe 无违规 |

---

## 二、行业对标矩阵

> `menu` 是**嵌套菜单**模式（下拉/右键菜单的基础）。Radix UI Menu 为最接近的行业实现；Ant Design/Element Plus 提供数据驱动 API。

| 能力                     | SoybeanUI | Radix UI Menu | AntD Menu/Dropdown | Element Plus Dropdown |
| :----------------------- | :-------: | :-----------: | :----------------: | :-------------------: |
| Headless/样式分离        |    ✅     |      ✅       |         ❌         |          ❌           |
| 数据驱动 Compact API     |    ✅     |      ❌       |         ✅         |          ✅           |
| roving focus + typeahead |    ✅     |      ✅       |        部分        |         部分          |
| 子菜单方向键             |    ✅     |      ✅       |        部分        |         部分          |
| 复选/单选项              |    ✅     |      ✅       |         ✅         |         部分          |
| `'mixed'` 半选           |    ✅     |      ✅       |         ✅         |           —           |
| 浮层定位                 |    ✅     |      ✅       |         ✅         |          ✅           |
| 分隔线 / 快捷键          |    ✅     |     组合      |         ✅         |         部分          |
| 分组                     |    ✅     |      ✅       |         ✅         |         部分          |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Blocker — `@ts-expect-error` 类型逃逸（D4）

**现象：** [menu-radio-group.vue](../../packages/headless/src/components/menu/menu-radio-group.vue#L24) 用 `// @ts-expect-error` 压制「默认值可为 null」的类型冲突，违反项目硬约束「DO NOT use @ts-expect-error」。根因是单选组 `modelValue` 语义上可为 `null`（无选中），但类型未放开。

**修复：** 对齐同类 `radio-group` 组件，将单选组状态类型放宽为 `T | null`：

- `MenuRadioGroupProps.modelValue`：`T` → `T | null`；
- `MenuRadioGroupEmits` 载荷：`Exclude<T, undefined>` → `Exclude<T, undefined> | null`；
- `MenuRadioGroupContextParams.modelValue`：`ShallowRef<AcceptableBooleanValue>` → `ShallowRef<AcceptableBooleanValue | null>`；
- 组件内 `useControllableState<T | null>`，defaultValue 用语义明确的定向断言。

`menu-radio-item.vue` 的 `modelValue.value === props.value` 比较与 `onModelValueChange(non-null)` 写入均兼容 null。重跑 headless typecheck 通过。

### 3.2 Major — 非法 ARIA 角色（D7）

**现象：** `role="menu-checkbox-group"`（menu-checkbox-group.vue）与 `role="menu-radio-group"`（menu-radio-group.vue）不是合法 WAI-ARIA 角色，组与成员的分组语义不成立；`MenuGroup` 已正确使用 `role="group"`。

**修复：** 两处统一改为 `role="group"`，与 `MenuGroup` 一致，恢复分组语义。

### 3.3 Major — 文档结构不完整（D6）

**现象：** en/zh `menu.md` 仅 4 节（Overview/Components/Usage/API），缺失 Features/Demos/Notes/FAQ，未达到 D6 验收。

**修复：** en/zh 同步重构为完整 Recommended structure，新增 Features（8 条）/Component family/Notes（架构对标表 9×4 + 7 条运行时注意）/FAQ（5 组）。

### 3.4 清理项

- **死代码**：删除 [menu-radio-item.vue](../../packages/headless/src/components/menu/menu-radio-item.vue) 中被注释的 `onSelect` 遗留代码。
- **多余导出**：[index.ts](../../packages/headless/src/components/menu/index.ts#L23) 移除 `useMenuUi` barrel 导出（仅保留 `provideMenuUi`，符合「headless index 只导出 provide{Name}Ui」约定；`useMenuUi` 仅内部 `./context` 使用，无外部消费者）。

---

## 四、验证

- `pnpm exec vue-tsc --noEmit --skipLibCheck -p packages/headless/tsconfig.json`：**通过**（仅剩既有 `ImportMeta.env` 基线错误，与本次改动无关）。
- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/menu.spec.ts test/specs/components/dropdown-menu.spec.ts test/specs/components/context-menu.spec.ts`：**26 项全部通过**。
- 文档重构仅改 `*.md`，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项                           | 对标依据 | 说明                                                                                                 |
| :------------------------------- | :------- | :--------------------------------------------------------------------------------------------------- |
| 子菜单延迟可配置                 | D2-11    | hover 打开 100ms / pointer-grace 300ms 硬编码；对标 Element Plus `show/hide-timeout` 建议暴露为 prop |
| `type:'divider'`/`danger` 快捷项 | D2-11    | 对标 AntD 声明式快捷项（当前用 `separator`/`isGroupLabel` 布尔 + 自定义插槽达成），可选增强          |
