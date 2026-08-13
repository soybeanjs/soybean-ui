# C31 `password` 检查优化报告

> **组件编号：** C31（`password`）
> **组件名称：** `SPassword`（headless 基座：`PasswordCompact` 聚合 Input 族系 + 可见性切换）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `password` 完成全维度审计。组件为「多槽 + Compact」模式：headless `PasswordCompact` 复用 Input 族系（`InputRoot`/`InputControl`/`InputClear`）并管理可见性状态（`useControllableState`），可见切换按钮带完整 ARIA。UI 层 `SPassword` 在 input 配方上扩展 `visible` 槽。

**发现 P1 ×2（均已修复）**——`defaultVisible` 契约缺失 + `autocomplete` 类型过窄：

|    维度     | 状态 |                                                                                                                        说明                                                                                                                         |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                   多槽 + Compact 正确：headless 复用 Input 族系 + 可见性状态；受控/非受控 `modelValue`/`visible`、可见性切换按钮、`disabled`/`readonly` 三元素全守卫、清除按钮、`leading`/`trailing`/`clear`/`visible` 四插槽完整                   |
| D2 行业对标 |  ✅  |                                      对标 reka-ui `PasswordInput`/shadcn/AntD/Element Plus：受控可见性、图标切换、i18n 标签、`aria-pressed`、可清除、disabled/readonly 守卫、尺寸变体、表单代理均达成（D2-11）                                      |
| D3 API 设计 |  ✅  |                   `modelValue`/`defaultValue`、**`visible`/`defaultVisible`**（受控/非受控可见性）、`autocomplete`、`clearable`、`visibleProps`/`controlProps`/`clearProps` 命名与主流库一致；`update:visible` 事件清晰（D3-01）                    |
| D4 类型系统 |  ✅  |       **P1 修复**：新增 `PasswordCompactProps.defaultVisible?: boolean`（受控/非受控契约完整）；**`autocomplete` 拓宽**为 HTML 自动填充 token 联合（含 `current-password`/`new-password`/`one-time-code` 等），支持密码管理器；JSDoc 覆盖完整       |
| D5 代码规范 |  ✅  |                            `eslint` 0 errors；`useOmitProps` 含 `class`；`useControllableState` + `shallowRef`；context 正确级联 input 的类注入（`providePasswordUi` 内 `provideInputUi`）；模板无 `props.xxx`/内联箭头                             |
|   D6 文档   |  ✅  |                                                                en/zh 文档结构对齐（7 必选节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ；`defaultVisible` 契约已与实现一致                                                                 |
|   D7 其他   |  ✅  | data 属性遵循 D1-07（`data-soybean-password`/`-visible` + input 族系继承）；SSR 安全（setup 无浏览器 API）；ARIA（可见切换钮 `aria-label`+`aria-pressed`/清除钮 i18n 标签）axe 零违规；**28 项单测通过**（含新增 defaultVisible/autocomplete 测试） |

---

## 二、行业对标矩阵

> `password` 是**密码输入**模式。reka-ui `PasswordInput`/shadcn 与 AntD/Element Plus `Input.Password` 为对标对象。

| 能力                 | SoybeanUI | reka-ui/shadcn | AntD `Input.Password` | Element Plus |
| :------------------- | :-------: | :------------: | :-------------------: | :----------: |
| headless/styled 分离 |    ✅     |       ✅       |          ❌           |      ❌      |
| 受控/非受控可见性    |    ✅     |       ✅       |          ✅           |     部分     |
| 图标切换             |    ✅     |       ✅       |          ✅           |      ✅      |
| `autocomplete` 密码  |    ✅     |       ✅       |          ✅           |      ✅      |
| i18n 标签            |    ✅     |       —        |         部分          |      —       |
| `aria-pressed`       |    ✅     |       ✅       |           —           |      —       |
| 可清除               |    ✅     |       —        |          ✅           |      ✅      |
| 表单代理             |    ✅     |       —        |           —           |      —       |
| caps lock 提示       |     —     |       —        |          ✅           |      —       |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 P1 — `defaultVisible` 契约缺失（D3/D6）

**现象：** 文档宣称支持非受控 `defaultVisible`，但 `PasswordCompactProps` 无该属性，`useControllableState` 默认硬编码 `false`，用户无法让密码默认显示。

**修复：** 在 `PasswordCompactProps` 新增 `defaultVisible?: boolean`（`@defaultValue false`），`password-compact.vue` 的 `useControllableState` 默认值改为 `props.defaultVisible`。新增测试断言 `defaultVisible: true` 时 input `type="text"` 且 `aria-pressed="true"`。

### 3.2 P1 — `autocomplete` 类型过窄（D4/D7）

**现象：** `InputBaseProps.autocomplete?: 'on' | 'off'` 无法传入 `current-password`/`new-password`（TS 报错），密码管理器提示缺失。

**修复：** 拓宽 `InputBaseProps.autocomplete` 为 HTML 自动填充 token 联合（含 `username`/`current-password`/`new-password`/`one-time-code`/`email`/`tel` 等）。新增测试断言 `current-password`/`new-password` 透传到 input。

### 3.3 核查结论（非缺陷）

- **D2 对标**：caps lock 提示未实现，列为遗留增强项。
- **D7**：无 browser e2e spec，可见性切换 + 颜色对比可后续补 e2e（可选增强）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/password.spec.ts`：**28 项全部通过**（新增 3 项）。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`password/types.ts`（+defaultVisible）、`password-compact.vue`（默认值）、`input/types.ts`（autocomplete 拓宽）、`password.spec.ts`（+3 测试）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据 | 说明                                                               |
| :-------------- | :------- | :----------------------------------------------------------------- |
| caps lock 提示  | D2-11    | 对标 AntD CapsLock 提示（监听键盘检测并在可见时提示），排期评估    |
| 浏览器 e2e      | D7-19    | 可见性切换 + axe 颜色对比可补 Tier 1 e2e，排期评估                 |
| playground 补充 | D6-05    | 补受控/非受控 visible、自定义 visible 插槽、尺寸变体示例，排期评估 |
