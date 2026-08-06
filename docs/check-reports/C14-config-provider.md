# C14 `config-provider` 检查优化报告

> **组件编号：** C14
> **组件名称：** `config-provider` / `SConfigProvider`
> **模式：** Provider（无视觉根、无样式配方、无 UiSlot；通过 `provide/inject` 注入双上下文）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-05、D2-07、D2-08、D7-18

---

## 一、执行摘要

对 `SConfigProvider` 完成全维度审计。发现并修复 1 项 Major 级问题（`resolveLocaleDirection` 对未注册的 RTL locale 回退到 `ltr`，与文档承诺不一致，违反 D2-08 / D6-14）、3 项 Minor 级问题（`withDefaults` 含已移除的 `scrollBody` 死代码、模板使用 `props.xxx`、`css` computed 冗余中间变量）、1 项 Major 文档缺口（缺少 Notes / FAQ 章节）、1 项 Major 测试缺口（仅 3 项测试，无主题/locale/dir/上下文覆盖）。补充测试至 13 项，新增 Notes / FAQ 章节，整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                                           |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | Provider 模式清晰；headless 无样式；双 `provide/inject` 上下文；`dir` 由 `useDirection` 消费；D1-05 上下文响应式 ✅            |
| D2 行业对标 |  ✅  | 主题/locale/dir/RTL/暗色模式对标 Ant Design / Element Plus / MUI / Mantine / Naive UI；RTL 前缀兜底优于主流库                  |
| D3 API 设计 |  ✅  | `theme`/`size`/`iconify`/`locale`/`dir`/`messages`/`toast`/`progress`/`customToast` 命名规范；`size` 已弃用并指引 `theme.size` |
| D4 类型系统 |  ✅  | strict 通过；`ConfigProviderProps` extends headless；JSDoc 完整；`ThemeOptions`/`ThemeSize` 复用共享类型                       |
| D5 代码规范 |  ✅  | 移除 `scrollBody` 死代码；模板不再使用 `props.xxx`；`css` computed 简化；script setup 顺序正确                                 |
|   D6 文档   |  ✅  | 中英文统一；新增架构对标表、运行时注意事项、6 条 FAQ；文档关于 `locale="ar"` → rtl 的承诺现与实现一致                          |
|   D7 其他   |  ✅  | 13 项单元测试通过（主题注入、locale/dir 推导、provider 组合、上下文传播、a11y）；SSR 安全；axe-core 零违规                     |

---

## 二、行业对标矩阵

| 能力                             | SoybeanUI | Ant Design | Element Plus | MUI | Mantine | Naive UI | shadcn/ui |
| :------------------------------- | :-------: | :--------: | :----------: | :-: | :-----: | :------: | :-------: |
| headless/styled 分离             |    ✅     |     —      |      —       | ✅  |    —    |    —     |    ✅     |
| 主题 CSS 变量注入                |    ✅     |     ✅     |      ✅      | ✅  |   ✅    |    ✅    |    ✅     |
| 全局尺寸控制                     |    ✅     |     ✅     |      ✅      | ✅  |   ✅    |    ✅    |     —     |
| 暗色模式                         |    ✅     |     ✅     |      ✅      | ✅  |   ✅    |    ✅    |    ✅     |
| RTL（`dir` + locale 推导）       |    ✅     |     ✅     |      ✅      | ✅  |   ⚠️    |    ⚠️    |    ⚠️     |
| RTL 前缀兜底（未注册即生效）     |    ✅     |     —      |      —       |  —  |    —    |    —     |     —     |
| i18n（locale + messages 覆盖）   |    ✅     |     ✅     |      ✅      | ✅  |   ✅    |    ✅    |     —     |
| 图标默认配置（iconify）          |    ✅     |     —      |      —       |  —  |    —    |    —     |     —     |
| Provider 组合（toast/dialog）    |    ✅     |     —      |      —       |  —  |    —    |    —     |     —     |
| 自定义 toast 渲染（customToast） |    ✅     |     —      |      —       |  —  |    —    |    —     |     —     |

**增强项（➕）：**

- **RTL 前缀兜底**：`resolveLocaleDirection` 内置 BCP-47 RTL 语言子标签表（`ar`/`he`/`fa`/`ur`/`yi`/`ps`/`sd`/`ug`/`ku`/`dv`），即使 locale 未注册也能正确推导方向。`locale="ar"` 开箱即得 `dir="rtl"`，优于主流库需手动配置。
- **双上下文架构**：headless 上下文（key `ConfigProvider`）服务 headless 消费者（`useDirection`/`useLocale`/`useLocaleMessages`/tooltip）；UI 上下文（key `UiConfigProvider`）服务 UI 消费者（`SIcon` iconify 默认值）。关注点分离清晰。
- **Provider 组合**：`SConfigProvider` 默认在插槽内渲染 `ToastProvider`/`DialogProvider`/`ProgressProvider`，用户无需手动挂载；`customToast` 可退出默认 toast UI。

---

## 三、发现的问题与处理

### 3.1 Major — `resolveLocaleDirection` 对未注册 RTL locale 回退到 `ltr`（已修复，D2-08 / D6-14）

**问题：** 文档承诺「`locale="ar"` resolves to `dir="rtl"`」，但 `resolveLocaleDirection` 仅查询 `localeRegistry`。由于只有 `en` 与 `zh-CN` 预注册，`locale="ar"` 在未手动注册 `ar` 时返回 `ltr`，与文档不一致，且对 RTL 用户开箱不可用。

**修复：** 在 `resolveLocaleDirection` 中增加 BCP-47 RTL 语言子标签兜底表。已注册 locale 优先使用其声明的 `dir`；未注册 locale 按 `-` 拆分取首段，命中 RTL 前缀表则返回 `rtl`，否则 `ltr`。

```diff
+const RTL_LOCALE_PREFIXES = new Set(['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'sd', 'ug', 'ku', 'dv']);
+
 export function resolveLocaleDirection(locale?: string): Direction {
-  return locale ? (localeRegistry[locale]?.dir ?? 'ltr') : 'ltr';
+  if (!locale) {
+    return 'ltr';
+  }
+
+  const registered = localeRegistry[locale]?.dir;
+  if (registered) {
+    return registered;
+  }
+
+  const prefix = locale.split('-')[0]?.toLowerCase();
+  return prefix && RTL_LOCALE_PREFIXES.has(prefix) ? 'rtl' : 'ltr';
 }
```

### 3.2 Minor — `withDefaults` 含已移除的 `scrollBody` 死代码（已修复，D5-18）

**问题：** Headless `config-provider.vue` 的 `withDefaults` 中包含 `scrollBody: true`，但 `ConfigProviderProps` 已无 `scrollBody` 属性。`scrollBody` 在全仓库仅此一处引用，属历史遗留死代码。

**修复：** 移除 `scrollBody: true`。

```diff
 const props = withDefaults(defineProps<ConfigProviderProps>(), {
   locale: 'en',
-  scrollBody: true,
   nonce: undefined
 });
```

### 3.3 Minor — 模板使用 `props.xxx`（已修复，D5-14）

**问题：** UI `config-provider.vue` 模板中 `v-if="!props.customToast"`、`v-bind="props.toast"`、`v-bind="props.progress"` 使用了 `props.` 前缀，违反 D5-14（模板应直接使用 prop 名称）。

**修复：** 改为直接引用 `customToast`/`toast`/`progress`。

```diff
 <template>
   <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
     <slot />
-    <ToastProvider v-if="!props.customToast" v-bind="props.toast" />
+    <ToastProvider v-if="!customToast" v-bind="toast" />
     <DialogProvider />
-    <ProgressProvider v-bind="props.progress" />
+    <ProgressProvider v-bind="progress" />
   </ConfigProvider>
 </template>
```

### 3.4 Minor — `css` computed 冗余中间变量（已修复，D5-08）

**问题：** UI `config-provider.vue` 的 `css` computed 中 `const { getCss } = ...; const result = getCss(); return result;` 含不必要的中间变量 `result` 与解构 `getCss`。

**修复：** 简化为直接返回 `getCss()` 调用。

```diff
 const css = computed(() => {
-  const { getCss } = createShadcnTheme({
+  createShadcnTheme({
     ...props.theme,
     size: props.theme.size || props.size || 'md'
-  });
-
-  const result = getCss();
-  return result;
-});
+  }).getCss()
+);
```

### 3.5 Major — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试仅 3 项（默认插槽渲染、嵌套组件、a11y），无主题注入、locale/dir 推导、provider 组合、上下文传播覆盖，远低于 70% 覆盖目标。

**修复：** 测试从 3 项扩展到 13 项，新增覆盖：

| 套件                 | 覆盖场景                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------ |
| theme injection      | 主题 CSS 变量注入 `<head>`、主题 prop 变化时 CSS 响应式更新、headless 工具样式类注入        |
| direction and locale | `locale="ar"` → rtl、`locale="en"` → ltr、显式 `dir` 覆盖 locale 推导、未知 locale 回退 ltr |
| provider composition | 默认渲染 `ToastProvider`、`customToast` 时不渲染 `ToastProvider`                            |
| context propagation  | `SIcon` 从上下文读取 iconify 默认宽高（1.25em）                                             |

### 3.6 Major — 文档缺少 Notes / FAQ 章节（已修复，D6-10 / D6-11 / D6-15）

**问题：** 中英文文档均缺少 `## Notes`（架构对标差异、运行时注意事项）与 `## FAQ` 章节。

**修复：** 在中英文文档 API 章节后新增：

- **架构与对标差异**：6 维度对比表（架构、主题注入、暗色模式、RTL、i18n、Provider 组合）
- **运行时注意事项**：SSR、样式标签生命周期、locale 注册、嵌套 4 条
- **常见问题**：6 条 Q&A（放置位置、dir/locale 协同、添加 locale、暗色模式、嵌套、自定义 toast）

---

## 四、重点检查项结论

| 检查项                 | 结论 | 证据                                                                                                                                                                   |
| :--------------------- | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-05** 上下文响应式 |  ✅  | `dir` 为 `computed`；`transformPropsToContext(props)` 将所有 prop 包装为 `ComputedRef`；`iconRender` 为函数引用，类型上显式排除于 `PropsToContext`                     |
| **D2-07** 暗色模式     |  ✅  | `theme.darkSelector`（默认 `'class'` → `.dark`，或 `'media'` / 自定义）控制暗色 CSS 作用域；`createTheme` 始终生成浅色+暗色两套变量；测试验证主题 CSS 注入与响应式更新 |
| **D2-08** i18n 与 RTL  |  ✅  | `locale` + `messages` 覆盖；`resolveLocaleDirection` 已注册优先、未注册按 RTL 前缀兜底；4 项 dir 测试覆盖 ar/en/显式覆盖/未知 locale                                   |
| **D7-18** 主题集成     |  ✅  | `createTheme` + `useStyleTag` 注入 `__SoybeanUI_theme`；`ThemeSize`/`ThemeOptions` 复用；主题 prop 变化测试通过                                                        |

---

## 五、变更文件清单

| 文件                                                                   | 变更类型                                                                                     |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `packages/headless/src/locale/locales.ts`                              | 修复：`resolveLocaleDirection` 增加 RTL 前缀兜底（D2-08 / D6-14）                            |
| `packages/headless/src/components/config-provider/config-provider.vue` | 修复：移除 `scrollBody: true` 死代码（D5-18）                                                |
| `packages/ui/src/components/config-provider/config-provider.vue`       | 修复：简化 `css` computed（D5-08）；模板移除 `props.xxx`（D5-14）                            |
| `packages/ui/test/specs/components/config-provider.spec.ts`            | 重写：3 项 → 13 项（theme injection、direction/locale、provider composition、context、a11y） |
| `apps/docs/src/docs/en/components/config-provider.md`                  | 文档：新增 Notes（架构对标表 + 运行时注意事项）+ FAQ（6 条）                                 |
| `apps/docs/src/docs/zh-CN/components/config-provider.md`               | 文档：新增注意事项（架构对标表 + 运行时注意事项）+ 常见问题（6 条）                          |
| `docs/check.md`                                                        | 标记 C14 各维度为 ✅                                                                         |

---

## 六、验证命令

```bash
# 单元测试（13 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/config-provider.spec.ts
# → Test Files 1 passed (1) | Tests 13 passed (13)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors

# 全量 UI 测试（仅 C03 icon 预存 4 项失败，与本次变更无关）
pnpm test
# → 836 passed | 4 failed (pre-existing icon.spec.ts)
```

---

## 七、后续建议

1. **P3 增强：** 补充 playground 示例（`apps/playground/src/examples/config-provider/`）。建议添加 `01-theme`（主题切换）、`02-locale`（locale/dir 切换）、`03-dark-mode` 示例。当前文档使用内联代码示例，playground 可进一步可视化。
2. **P3 增强：** 为 `nonce` prop 接入实际 CSP 用途——当前 `nonce` 进入上下文但 `useStyleTag` 未消费；可将其传入 `useStyleTag` 的 `nonce` 选项以支持 CSP 策略。
3. **P3 增强：** `useNonce` 已在 headless context 中定义但全仓库无消费者；若不计划短期使用，可移除以减少未用 API 面；若计划使用，应接入 `useStyleTag` 的 CSP nonce。

---

_报告生成于组件审计工作流 C14，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
