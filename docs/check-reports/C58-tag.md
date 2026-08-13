# C58 `tag` 检查优化报告

> **组件编号：** C58（`tag`）
> **组件名称：** `STag`（headless 基座：`Tag`）
> **模式：** 多槽 + 单类样式（leading/default/trailing/close 4 槽；`cv()` 无 UiContext）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01

---

## 一、执行摘要

对 `tag` 完成全维度审计。核心链路：headless `Tag` 经 `useControllableState` 维护 `open`（默认 `true`），`close()` 置 `open=false`，经插槽 props 暴露 `open`/`close`；UI 层 `STag` 以 `tagVariants` 注入类（8 颜色 × 6 尺寸 × 5 变体 × 2 形状），并提供 `leading`/`trailing`/`close` 槽，默认关闭控件经 `close` 插槽渲染。

**发现 Major ×2 + Minor ×1**（均已修复），**Enhancement ×1**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                     |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Minor 修复**（D1-07 硬约束）：headless `Tag` 根节点冗余 `data-open` 属性（非 `data-soybean-*` 且与 `v-if` 显隐重复）→ 已移除；其余 `data-soybean-tag` 保留；`cv()` recipe 首行 `// @unocss-include`，槽与变体齐全                                                                                                      |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Naive UI（`closable`/`onClose`）：SoybeanUI 关闭按钮为真实可聚焦 `<button>` + 本地化 `aria-label`，优于纯 `×` 字形；`tag-group`/`checkable` 列为增强项（见 3.4）                                                                                                     |
| D3 API 设计 |  ✅  | `content`/`closable`/`open`/`color`/`size`/`variant`/`shape` 命名与主流库一致；`v-model:open` 受控/非受控统一；`leading`/`trailing`/`close` 插槽语义完整；`close` 插槽暴露 `close` 动作供自定义                                                                                                                          |
| D4 类型系统 |  ✅  | `TagProps`/`TagEmits` 导出完整；`TagVariant`/`TagShape` 字面量联合精确；JSDoc 覆盖 `open`/`content`/`closable`；`pnpm sui api` 重新生成 locale 覆盖键（见验证）                                                                                                                                                          |
| D5 代码规范 |  ✅  | `eslint` 0 errors；**Major 修复**（Anti-pattern）：关闭 Icon 内联 `style="flex-shrink: 0; cursor: pointer"`（违反「UnoCSS utility classes only」）→ 改为 `shrink-0 cursor-pointer border-0 bg-transparent p-0 text-inherit` 工具类（见验证）                                                                             |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（9 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐                                                      |
|   D7 其他   |  ✅  | **Major 修复**（D1-16/D7-05 a11y）：可关闭标签的关闭控件原先为 `aria-hidden` 的纯 `<svg>` + `@click`，不可聚焦、无键盘操作、无可访问名称 → 改为真实 `<button type="button">` + 本地化 `aria-label`（新增 `LocaleTagMessages.remove`，13 语言包同步）；单测 9 → 11 项全通过（含可关闭态 axe 0 违规 + 关闭按钮可访问断言） |

---

## 二、行业对标矩阵

> `tag` 是 **headless 状态基础组件 + 单类样式包装** 模式。shadcn/ui 为纯样式标签（headless 分离）；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化 `Tag`（`closable`/`onClose`）。

| 能力                       | SoybeanUI | shadcn/ui | Ant Design Tag | Element Plus Tag | Mantine Badge | Naive UI Tag |
| :------------------------- | :-------: | :-------: | :------------: | :--------------: | :-----------: | :----------: |
| Headless/样式分离          |    ✅     |    ✅     |       —        |        —         |       —       |      —       |
| 颜色变体（8）              |    ✅     |    ✅     |       ✅       |        ✅        |      ✅       |      ✅      |
| 变体（solid/outline/soft） |    ✅     |    ✅     |       ✅       |        ✅        |      ✅       |      ✅      |
| 尺寸变体（6）              |    ✅     |     —     |       ✅       |        ✅        |      ✅       |      ✅      |
| 形状（auto / 胶囊）        |    ✅     |    ✅     |       ✅       |        ✅        |      ✅       |      ✅      |
| 可关闭标签                 |    ✅     |     —     |       ✅       |        ✅        |       —       |      ✅      |
| 本地化关闭 `aria-label`    |    ✅     |     —     |       —        |        ✅        |       —       |      —       |
| 受控显隐（`open`）         |    ✅     |     —     |       —        |        —         |       —       |      —       |
| RTL 就绪                   |    ✅     |    ✅     |       ✅       |        —         |       —       |      ✅      |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D1-16/D7-05 关闭控件不可访问

**现象：** [tag.vue（UI）](../../packages/ui/src/components/tag/tag.vue) 的默认关闭控件为 `<Icon icon="lucide:x" @click="close" />`。`Icon` 默认 `aria-hidden: true`，且该 `svg` 不是 `<button>`、无 `tabindex`/`role`/键盘处理——屏幕阅读器无法获知可关闭标签的关闭动作，键盘用户无法关闭标签。既有 a11y 单测仅覆盖不可关闭标签（`content='Accessible'`，无 `closable`），故未暴露该问题。

**修复：** 将默认关闭控件改为真实 `<button type="button">`，并新增本地化 `aria-label`：

- [locale/types.ts](../../packages/headless/src/locale/types.ts) 新增 `LocaleTagMessages { remove: string }`（`{label}` 占位符），注册进 `LocaleMessages`；13 个语言包同步补齐（en `Remove {label}` / zh-CN `移除 {label}` / …）。
- UI 层经 `useLocaleMessages` 生成 `closeLabel`（基于 `content` 派生，`close` 插槽可覆盖）。

```vue
<slot v-if="closable" name="close" :close="close">
  <button
    type="button"
    class="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-inherit"
    :aria-label="closeLabel"
    @click="close"
  >
    <Icon icon="lucide:x" />
  </button>
</slot>
```

### 3.2 Major — Anti-pattern 内联样式

**现象：** [tag.vue（UI）](../../packages/ui/src/components/tag/tag.vue) 关闭 Icon 使用 `style="flex-shrink: 0; cursor: pointer"` 内联样式，违反「NO raw CSS/SCSS — UnoCSS utility classes only」硬约束。

**修复：** 随 3.1 一并改为 UnoCSS 工具类 `shrink-0 cursor-pointer border-0 bg-transparent p-0 text-inherit`（按钮承载 cursor，`Icon` 自带 `shrink-0`）。

### 3.3 Minor — D1-07 冗余 data 属性

**现象：** [tag.vue（headless）](../../packages/headless/src/components/tag/tag.vue) 根节点 `data-soybean-tag` 之外还渲染 `:data-open="open ? '' : undefined"`。该 `data-open` 非 `data-soybean-*` 命名，且与 `v-if="open"` 的 DOM 显隐语义重复，违反「Data attributes must follow D1-07 standard, only using data-soybean-{name} without redundant attributes」硬约束。

**修复：** 移除 `:data-open` 属性。

### 3.4 Enhancement — D2-11 `tag-group` / `checkable` 特性

**现象：** 对标 AntD/Element Plus，tag 未提供多选可勾选（`checkable`）标签或独立的分组（`tag-group`）组件。

**处理：** 非阻塞，记录于报告「遗留增强项」并在文档 Notes/Roadmap 说明，排期评估。

### 3.5 核查结论（非缺陷）

- **D1-09 recipe**：`tagVariants` 首行 `// @unocss-include`，8 色 × 6 尺寸 × 5 变体 × 2 形状完整，compoundVariants 处理 solid/soft/ghost 组合。
- **D3-04 受控/非受控**：`open` 经 `useControllableState(..., true)` 统一，`v-model:open` 可用。
- **D7-09 SSR**：tag 无顶层 `window`/`document` 访问。
- **D7-11 测试**：单测覆盖渲染/槽/class/可关闭/显隐/关闭事件/无障碍，本次新增可关闭态 axe 扫描与关闭按钮可访问断言。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/tag.spec.ts`：**11 项全部通过**（原 9 项 + 新增「renders the close control as an accessible button」`aria-label='Remove Closable'`/`type='button'`、「has no a11y violations in the closable state」axe 0 违规）。
- `pnpm exec eslint packages/headless/src/components/tag/ packages/ui/src/components/tag/`：**0 errors**（locale 文件由工程 eslint 配置忽略，属正常）。
- `pnpm sui api` + `pnpm sui api-translate -- --locale zh-CN`：`LocaleMessagesOverrides` 新增 `tag` 覆盖键（en/zh 同步），合法再生成。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；tag 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项             | 对标依据          | 说明                                                                                    |
| :----------------- | :---------------- | :-------------------------------------------------------------------------------------- |
| `checkable` 标签   | AntD/Element Plus | 可勾选/可选中标签（`checkable` + `v-model`），需 headless 侧新增选中状态，排期评估      |
| `tag-group` 组件   | AntD/Element Plus | 独立标签分组/间距排列聚合，超出当前 `tag` 检查单元范围，建议列入 roadmap P2             |
| 颜色对比浏览器 e2e | D7-19             | 与 `link`/`badge`/`alert` 统一补齐颜色对比 e2e spec（axe color-contrast），非当前阻塞项 |
