# C56 `avatar` 检查优化报告

> **组件编号：** C56（`avatar`）
> **组件名称：** `SAvatar`（headless 基座：`AvatarRoot`/`AvatarImage`/`AvatarFallback`/`AvatarCompact`）
> **模式：** 多槽 + Compact（root/image/fallback 3 个 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-02、D3-01

---

## 一、执行摘要

对 `avatar` 完成全维度审计。核心链路：`AvatarRoot` 提供共享图片加载状态上下文；`AvatarImage` 经 `useImageLoadingStatus` 追踪 `<img>` 的加载状态（SSR 下 `isClient` 守卫安全跳过），加载完成前 `v-show` 隐藏，并在状态变化时 `emit('loadingStatusChange')` 同步到根上下文；`AvatarFallback` 在图片未加载时渲染回退内容，`delayMs` 通过 `watchEffect` + `onWatcherCleanup` 延迟并清理定时器；`AvatarCompact` 组合 root/image/fallback，`src` 与 `delayMs` 顶层收敛；UI 层 `SAvatar` `avatarVariants` 3 槽注入（6 尺寸），`useOmitProps` 含 `class` 防重复绑定。

**发现 Major ×1 + Minor ×2**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                    |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`AvatarCompact` 持有聚合编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-avatar-root/image/fallback` 完整；`useOmitProps` 含 `class`；`avatarVariants` 槽键与 `AvatarUiSlot` 完全一致   |
| D2 行业对标 |  ✅  | 对标 shadcn/ui/Radix（headless 三件套）与 AntD/Element Plus/Mantine/Naive UI（单一样式化组件）：SoybeanUI 以 `fallback-label` 收敛回退文本与图片 `alt`，使加载后图片自动拥有可访问名称；`delay-ms` 回退延迟为差异化优势（详见矩阵）                     |
| D3 API 设计 |  ✅  | `src`/`fallbackLabel`/`delayMs`/`imageProps`/`fallbackProps` 命名合理；**Minor 修复**（D3-06 扩展点）：新增 `alt` prop（`AvatarImageProps`），聚合层默认回退到 `fallback-label`，可设为 `''` 标记纯装饰性头像；`loadingStatusChange` 事件命名与同类一致 |
| D4 类型系统 |  ✅  | `AvatarImageProps.alt?: string` JSDoc 完整（含 `@defaultValue` 与装饰性说明）；`AvatarCompactProps`/`AvatarProps` 泛型与导出完整；`pnpm sui api` 重新生成含 `alt` 成员（见验证）                                                                        |
| D5 代码规范 |  ✅  | `eslint` 0 errors（avatar 源文件）；无类型断言逃逸；`avatar-image.vue` 使用 `v-show` + `watch` 组合、`avatar-fallback.vue` 使用 `shallowRef` + `watchEffect` + `onWatcherCleanup` 无泄漏（见验证）                                                      |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + 5 组 FAQ；中英文结构完全对齐    |
|   D7 其他   |  ✅  | 单测 7 → 8 项全通过（渲染/自定义 class/自定义回退插槽/加载状态/失败保持回退/延迟回退/无障碍 0 违规/**加载态图片可访问名称**）；SSR 安全（`isClient` 守卫）；定时器与图片监听在 `onWatcherCleanup` 清理无泄漏（见验证）                                  |

---

## 二、行业对标矩阵

> `avatar` 是 **headless 聚合 + 加载状态编排** 模式。shadcn/ui 与 Radix 为同源设计（`Avatar`/`AvatarImage`/`AvatarFallback` headless 组合）；Ant Design/Element Plus/Mantine/Naive UI 是单一样式化组件（`alt`/`src` prop）。

| 能力                    | SoybeanUI | shadcn/ui | Ant Design Avatar | Element Plus Avatar | Mantine Avatar | Naive UI Avatar |
| :---------------------- | :-------: | :-------: | :---------------: | :-----------------: | :------------: | :-------------: |
| Headless/样式分离       |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 图片 + 回退文本/插槽    |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 回退延迟（`delay-ms`）  |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 可访问名称自动派生      |    ✅     |     —     |         —         |          —          |       —        |        —        |
| 复合组件 + 逐部件 props |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 可配置尺寸（ThemeSize） |    ✅     |   class   |        ✅         |         ✅          |       ✅       |       ✅        |

`—` = 不支持或采用不同交互模型（AntD/Element Plus/Mantine/Naive UI 为单一样式化组件；shadcn/ui 将图片 `alt` 交由使用者处理且无回退延迟）。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [avatar.md（en）](../../apps/docs/src/docs/en/components/avatar.md) 与 [avatar.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/avatar.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意）与 `FAQ` 章节。对标 C66 carousel 等已完成组件均重构为 9 节 Recommended structure，avatar 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：8 条能力（headless 分离/优雅加载/回退插槽/延迟控制/6 尺寸/无障碍/可定制）。
- `Component family`：`SAvatar`/`AvatarRoot`/`AvatarImage`/`AvatarFallback`/`AvatarCompact` 职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（加载时序/失败事件/`alt` 装饰性/`delay-ms` 语义/根节点不可交互）。
- `FAQ`：5 组问答（首字母/延迟回退/图标回退/失败响应/纯装饰头像）。

### 3.2 Minor — D7-05 加载态图片无可访问名称

**现象：** [avatar-image.vue](../../packages/headless/src/components/avatar/avatar-image.vue) 渲染 `<img role="img">` 且无 `alt`/`aria-label`。图片加载后（`v-show` 显示），该图片缺少可访问名称，`axe-core` 的 `image-alt` 规则会命中；且既有 a11y 单测仅覆盖回退（错误）状态，图片隐藏故未暴露该问题。

**修复：** 新增 `alt` prop 到 [types.ts](../../packages/headless/src/components/avatar/types.ts)（`AvatarImageProps.alt?: string`），并在 [avatar-compact.vue](../../packages/headless/src/components/avatar/avatar-compact.vue) 的 `imageProps` 中默认回退到 `fallbackLabel`：

```ts
const imageProps = computed(() => ({
  ...props.imageProps,
  src: props.src ?? props.imageProps?.src,
  alt: props.imageProps?.alt ?? props.fallbackLabel
}));
```

`avatar-image.vue` 绑定 `:alt="alt"`。`alt` 设为 `''` 时（非空串，`??` 不覆盖）标记为纯装饰性头像，由辅助技术跳过。

### 3.3 Minor — D7-11 加载态 a11y 测试缺失

**现象：** 既有测试只覆盖回退态（图片错误 → `v-show` 隐藏）的无障碍扫描，未覆盖图片成功加载后的状态。

**修复：** 在 [avatar.spec.ts](../../packages/ui/test/specs/components/avatar.spec.ts) 的 accessibility 分组新增用例，断言加载后 `<img>` 的 `alt` 等于 `fallback-label`，并对加载态执行 `getA11yViolations` 扫描（axe 0 违规）。

### 3.4 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`AvatarCompact` 持有 root/image/fallback 的默认装配与加载状态编排，UI 层 `SAvatar` 无 `v-for`、无结构编排（仅样式注入 + 插槽/事件转发）。
- **D1-05 上下文响应式**：`context.ts` 用 `shallowRef` 承载 `imageLoadingStatus`，`updateImageLoadingStatus` 显式赋值，无裸非响应式值进入上下文。
- **D7-04 内存泄漏**：`avatar-fallback.vue` 的 `delayMs` 定时器在 `onWatcherCleanup` 中 `clearTimeout`；`useImageLoadingStatus` 在 `onWatcherCleanup` 中移除 `load`/`error` 监听并置 `isMounted=false`，无残留引用。
- **D7-09 SSR**：`useImageLoadingStatus` 在 `!isClient` 时提前返回 `loadingStatus`，`avatar-fallback.vue` 的 `watchEffect` 也以 `!isClient` 守卫，无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/avatar.spec.ts`：**8 项全部通过**（含新增「gives the loaded image an accessible name via the fallback label」断言，`alt='JD'` + axe 0 违规）。
- `pnpm exec eslint packages/headless/src/components/avatar/`：**0 errors**（avatar 源文件；`avatar.spec.ts` 由测试工程 eslint 配置忽略，属正常）。
- `pnpm sui api` + `pnpm sui api-translate -- --locale zh-CN`：生成 `avatar.json` 新增 `alt` 成员（3 处引用点），api-locales 补齐 en/zh 描述；同时顺带把 C66 carousel 遗漏的 locale 键补入 `config-provider.json`/`index.json`（合法再生成，非手改）。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `packages/ui/src/components/theme-customizer/theme-customizer.vue(17,74)` 对 `@soybeanjs/ui` 的模块自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 脚本在本环境因调用 IDE-only 的 `oxfmt` 而中断），属**既有环境问题**，与本次 avatar 改动无关；avatar 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                     | 对标依据                     | 说明                                                                                     |
| :------------------------- | :--------------------------- | :--------------------------------------------------------------------------------------- |
| `shape`（方形/圆形）变体   | AntD/Element Plus            | 当前固定 `rounded-full`；可考虑增加 `shape` prop 或 `ui` 覆盖即可达成，暂不引入          |
| 分组头像（`avatar-group`） | AntD `Avatar.Group`、Mantine | 多个头像叠加/间距排列需独立聚合组件，超出当前 `avatar` 检查单元范围，建议列入 roadmap P3 |
