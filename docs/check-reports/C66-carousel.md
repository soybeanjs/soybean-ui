# C66 `carousel` 检查优化报告

> **组件编号：** C66（`carousel`）
> **组件名称：** `SCarousel`（headless 基座：`CarouselRoot`/`CarouselContent`/`CarouselContainer`/`CarouselItem`/`CarouselControl`/`CarouselNavigation`/`CarouselPrevious`/`CarouselNext`/`CarouselCompact`）
> **模式：** 多槽 + Compact（root/content/container/item/control/navigation/previous/next 8 个 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D7-02

---

## 一、执行摘要

对 `carousel` 完成全维度审计。核心链路：`CarouselRoot` 经 `useEmblaCarousel`（hooks.ts）初始化/重初始化/销毁 Embla 实例，监听 `select`/`reInit` 同步派生 `canScrollNext`/`canScrollPrev`/`selectedIndex`/`scrollSnaps`/`progress`；根节点渲染 `role="region"` + `aria-roledescription="carousel"`，焦点在根区域时方向键翻页（`previous`/`next` 键按 `orientation` + `dir` 推导）；`CarouselContent` 持有 Embla 根元素引用并与导航按钮共享 `id`（`aria-controls`）；`CarouselPrevious`/`CarouselNext` 基于 `Button`，默认图标经 `Icon` 渲染、默认文本经 `VisuallyHidden` 隐藏；`CarouselCompact` 以 `slides` 数据驱动迭代 `CarouselItem` 并暴露 `item`/`control`/`previous`/`next` 插槽；UI 层 `SCarousel` `carouselVariants` 8 槽注入（6 尺寸 × 2 方向 × `floatNav`）。

**发现 Major ×1 + Minor ×1**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-02 边界违规）：`carousel-previous.vue`/`carousel-next.vue` 默认插槽用 `<span class="soybean-headless-sr-only">` 承载屏幕阅读器文本——headless 层内联视觉隐藏类（依赖 `config-provider` 注入的全局样式），违反「headless 零样式（连 `hidden`/`sr-only` 都不行）」硬约束 → 改用既有 `VisuallyHidden` 原语（`feature="fully-hidden"`）。**Minor 修复**（D1-15 装饰元素）：`Icon` 默认图标缺 `aria-hidden` → 补 `:aria-hidden="true"` |
| D2 行业对标 |  ✅  | 对标 AntD/Element Plus/Mantine/Naive UI（单包配置式轮播）与 shadcn/ui（复制源码 headless 组合）：SoybeanUI 以 `options` 透传 Embla 配置而非逐个声明顶层 prop（`loop`/`align`/`autoplay` 等），保持 API 精简并接入任意 Embla 插件；方向键导航与本地化按钮/区域 `aria-label` 超出 shadcn/ui（硬编码英文、无方向键）                                                                                                                                   |
| D3 API 设计 |  ✅  | `slides` 数据驱动 + 7 个 `*Props` 通道（content/container/item/control/navigation/previous/next）+ `item`/`control`/`previous`/`next` 插槽；根插槽暴露 `carousel`/`canScrollNext`/`canScrollPrev`/`selectedIndex`/`scrollSnaps`/`progress`/`scrollNext`/`scrollPrev`/`scrollTo`；`defineExpose` 同 `scrollNext`/`scrollPrev`/`scrollTo`；命名 `orientation`/`dir` 与主流库一致                                                                      |
| D4 类型系统 |  ✅  | `CarouselCompactProps<T extends DefinedValue>` 泛型；`CarouselRootProps extends BaseProps`（含 `aria-label`/`tabindex`）；`CarouselPrevious/NextProps extends ButtonProps`；`pnpm typecheck` 全绿（见验证）                                                                                                                                                                                                                                         |
| D5 代码规范 |  ✅  | 原 `ariaLabel` computed 用 `as string` 显式断言 + `?? 'Carousel'` 硬编码回退 → 改为 `typeof label === 'string' && label.trim() ? label : messages.value.carousel.ariaLabel`（消除类型断言 + 本地化）；`pnpm lint` 全绿（见验证）                                                                                                                                                                                                                    |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 6 条 Cautions + 6 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                 |
|   D7 其他   |  ✅  | 单测 6 → 7 项全通过（渲染/方向与书写方向透传/受控与键盘导航/RTL 箭头键交换/后代输入不拦截/本地化默认标签/无障碍 axe 0 违规）；`pnpm typecheck`/`pnpm lint` 全绿；本地化改造经全量单测回归无副作用                                                                                                                                                                                                                                                   |

---

## 二、行业对标矩阵

> `carousel` 是**滚动引擎封装 + 聚合迭代**模式。shadcn/ui Carousel 区块为同源设计（Embla + headless 组合）；Ant Design/Element Plus/Mantine/Naive UI 是单包配置式轮播（`autoplay`/`loop`/`effect`/`dots` 等为顶层 prop）。

| 能力                           | SoybeanUI | shadcn/ui | Ant Design Carousel | Element Plus Carousel | Mantine Carousel | Naive UI Carousel |
| :----------------------------- | :-------: | :-------: | :-----------------: | :-------------------: | :--------------: | :---------------: |
| headless/样式拆分              |    ✅     |    ✅     |          —          |           —           |        —         |         —         |
| 水平 / 垂直方向                |    ✅     |     —     |         ✅          |          ✅           |        ✅        |        ✅         |
| 感知书写方向（RTL）            |    ✅     |    ✅     |         ✅          |           —           |        —         |         —         |
| 方向键导航                     |    ✅     |     —     |         ✅          |          ✅           |        —         |         —         |
| 本地化按钮 / 区域 `aria-label` |    ✅     |     —     |          —          |           —           |        —         |         —         |
| `autoplay` / `loop` / 对齐     |  options  |  options  |        props        |         props         |      props       |       props       |
| 复合组件 + 逐部件 props        |    ✅     |    ✅     |          —          |           —           |        —         |         —         |

`—` = 不支持或非同一交互模型。SoybeanUI 以 `options`/`plugins` 透传 Embla 配置而非逐个声明顶层 prop，是刻意 API 偏离：`autoplay` 依赖 Embla `Autoplay` 插件，`loop`/`align`/`containScroll` 等均可经 `options` 覆盖，无需在组件层重造开关。

---

## 三、发现的问题与处理

### 3.1 Major — D1-02 headless 层内联视觉隐藏类

**现象：** [carousel-previous.vue](../../packages/headless/src/components/carousel/carousel-previous.vue) 与 [carousel-next.vue](../../packages/headless/src/components/carousel/carousel-next.vue) 默认插槽使用 `<span class="soybean-headless-sr-only">` 承载按钮的屏幕阅读器文本。该 class 由 [config-provider.vue](../../packages/headless/src/components/config-provider/config-provider.vue) 的 `useStyleTag` 全局注入——headless 层本应「零样式（连 `hidden`/`sr-only` 都不行）」，此处内联视觉隐藏类违反硬约束，且与项目既有 `VisuallyHidden` 原语（无 class 依赖的 DOM 隐藏实现）重复。

**修复：** 改用 `VisuallyHidden` 原语（`feature="fully-hidden"`）渲染默认文本，同时为默认 `Icon` 补 `:aria-hidden="true"`（D1-15 装饰元素）：

```vue
<slot>
  <Icon icon="lucide:arrow-right" :aria-hidden="true" />
  <VisuallyHidden feature="fully-hidden">{{ messages.carousel.next }}</VisuallyHidden>
</slot>
```

### 3.2 Major — D2-11 默认文案硬编码英文且未本地化

**现象：** 三处默认可访问文案硬编码英文：`carousel-root.vue` 区域 `aria-label` 回退 `'Carousel'`（且用 `(attrs['aria-label'] ?? 'Carousel') as string` 显式断言）；`carousel-previous.vue` 回退 `'Previous slide'`；`carousel-next.vue` 回退 `'Next slide'`。对标 stepper/calendar/date-picker 等族系已全面走 `useLocaleMessages`，carousel 为遗漏项。

**修复：** 新增 `LocaleCarouselMessages { previous, next, ariaLabel }` 到 [locale/types.ts](../../packages/headless/src/locale/types.ts) 并注册进 `LocaleMessages`，13 个语言包同步补齐（en/zh-CN/zh-TW/ar/de/es/fr/id/ja/ko/pt-BR/ru/tr）。`carousel-root.vue` 与两个按钮组件经 `useLocaleMessages` 本地化回退，并移除 `as string` 显式断言：

```ts
const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) return undefined;

  const label = attrs['aria-label'];
  return typeof label === 'string' && label.trim() ? label : messages.value.carousel.ariaLabel;
});
```

### 3.3 核查结论（非缺陷）

- **D1-08 键盘导航**：`onKeydown` 以 `event.target === event.currentTarget` 守卫避免劫持后代输入的箭头键（`does not intercept arrow keys from descendant inputs` 测试已覆盖），`previous`/`next` 键按 `orientation` + `dir` 推导，RTL 下 `ArrowLeft`/`ArrowRight` 语义正确交换。
- **D1-12 Compact 聚合**：`CarouselCompact` 拥有 `slides` 迭代与默认内容装配，UI 层 `SCarousel` 无 `v-for`/无结构编排（仅样式注入 + 插槽/事件转发），聚合下沉完整。
- **D7-02 滚动性能**：滚动由 Embla 引擎接管（`requestAnimationFrame` + `transform`），组件层无 scroll 监听器；`useEmblaCarousel` 的 `select`/`reInit` 监听在 `onWatcherCleanup` 中解绑、`onBeforeUnmount` 中销毁实例，无泄漏。
- **D7-09 SSR**：`CarouselRoot` 仅在 `watch(carousel)` 中访问 Embla 实例（`useEmblaCarousel` 经 `watch(element, { immediate: true })` 挂载后初始化），`element` 为空时安全跳过，无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui test`（全量 1680 项）+ 定向 `carousel`（7 项）全部通过，含新增「falls back to localized default labels」断言（`aria-label="Carousel"`、`Previous slide`/`Next slide`、2 个 `data-soybean-visually-hidden`）。
- `pnpm typecheck` / `pnpm lint` 全绿（见交付说明）。
- 本地化改造仅新增语言包键与三处回退逻辑，无 public API 变更，`pnpm sui api` 无需重跑（`aria-label`/`tabindex` 继承自 `BaseProps`，不生成组件级 prop 行）。

## 五、遗留增强项（非阻塞，排期）

| 增强项                 | 对标依据                  | 说明                                                                                                                     |
| :--------------------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `autoplay` 顶层封装    | AntD/Element Plus/Mantine | 当前经 `options` + Embla `Autoplay` 插件接入，未提供开箱即用的 `autoplay`/`interval` prop（符合 API 精简取向，暂不引入） |
| `dots`/指示器内置组件  | AntD/Element Plus         | 指示点经 `control` 插槽自定义（`07-dot` 示例），未内置 `CarouselDot` 子组件                                              |
| `effect`（fade/slide） | AntD/Element Plus         | 依赖 Embla 插件体系，可经 `plugins` 接入，未顶层声明                                                                     |
