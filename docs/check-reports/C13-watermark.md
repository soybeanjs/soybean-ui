# C13 `watermark` 检查优化报告

> **组件编号：** C13
> **组件名称：** `watermark` / `SWatermark`
> **模式：** 多槽 + Compact（`scv()` 配方 `watermarkVariants`，slots: root + overlay；headless `WatermarkCompact` 聚合 Root + Overlay）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01

---

## 一、执行摘要

对 `SWatermark` 完成全维度审计。组件实现质量高：headless 层拥有 canvas 生成、overlay 状态管理、`MutationObserver` 防篡改（删除 + 属性篡改检测）；styled 层用 `scv()` 多槽配方（root + overlay）+ `fullscreen` 变体。测试覆盖全面（14 项，含 canvas mock + 防篡改修复验证）。发现 1 项 Major 文档缺口（缺少 Features / Notes / FAQ）。补充完整文档章节。无代码层面缺陷。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-watermark-root/overlay`      |
| D2 行业对标 |  ✅  | headless/styled 分离 + `cross` 交叉图案 + headless 导出（Root/Overlay/Compact），功能优于 Ant Design / Element Plus |
| D3 API 设计 |  ✅  | `content`/`image`/`fontSize`/`rotate`/`gap`/`offset`/`cross`/`defense`/`fullscreen` 命名规范；JSDoc 完整            |
| D4 类型系统 |  ✅  | strict 通过；`WatermarkRootProps extends BaseProps`；`WatermarkCompactProps extends WatermarkRootProps`             |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardElement`；`useMutationObserver` 防篡改；`onBeforeUnmount` 清理 Image 监听               |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（9 条）+ Notes（架构对标表 + 运行时注意事项 5 条）+ FAQ（5 条）                           |
|   D7 其他   |  ✅  | 14 项单元测试通过（canvas mock + 防篡改修复 + 全屏 + 交叉）；SSR 安全；axe-core 零违规                              |

---

## 二、行业对标矩阵

| 能力                                  | SoybeanUI | Ant Design `Watermark` | Element Plus `Watermark` | MUI Watermark |
| :------------------------------------ | :-------: | :--------------------: | :----------------------: | :-----------: |
| headless/styled 分离                  |    ✅     |           —            |            —             |       —       |
| 文字水印                              |    ✅     |           ✅           |            ✅            |      ✅       |
| 图片水印（`crossOrigin`）             |    ✅     |           ✅           |            ✅            |       —       |
| 交叉图案（`cross`）                   |    ✅     |           —            |            —             |       —       |
| 防篡改（`MutationObserver`）          |    ✅     |           ✅           |            ✅            |       —       |
| 全屏模式（`fullscreen`）              |    ✅     |           ✅           |            ✅            |       —       |
| Headless 导出（Root/Overlay/Compact） |    ✅     |           —            |            —             |       —       |
| gap/offset 控制                       |    ✅     |           ✅           |            ✅            |      ✅       |

---

## 三、发现的问题与处理

### 3.1 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档有 Overview、Usage、Demos、API、Headless Composition，但缺少 Features、Notes（架构对标 + 运行时注意事项）、FAQ。未说明 canvas 生成机制、CORS 要求、防篡改范围、`fullscreen` 定位行为、`cross` 图案。

**修复：** 在中英文文档中新增：

- **Features**：9 条（文字水印 / 图片水印 / 旋转 / 间距偏移 / 交叉图案 / 防篡改 / 全屏 / Headless 组合 / SSR 安全）
- **Notes → 架构与对标差异**：8 维度对比表（含 MUI Watermark）
- **Notes → 运行时注意事项**：5 条（Canvas 依赖 / 图片 CORS / 防篡改默认关闭 / 防篡改范围 / `fullscreen` 定位）
- **FAQ**：5 条（全页水印 / 防篡改 / 图片水印 / `cross` 图案 / 平铺间距）

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                             |
| :----------------- | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方 |  ✅  | `scv()` 多槽配方 `watermarkVariants`，`// @unocss-include`；slots: root（`relative`）+ overlay（`absolute inset-0 pointer-events-none bg-repeat`）；`fullscreen` 变体切换 overlay 到 `fixed inset-0 z-9999`                                      |
| **D2-11** 防篡改   |  ✅  | 双 `MutationObserver`：root 观测 `childList`（overlay 删除），overlay 观测 `attributes`（`aria-hidden`/`class`/`style`/`hidden`/`data-soybean-watermark-overlay` 篡改）；`repairOverlay` 递增 `:key` 强制重渲染；测试验证删除修复 + 属性篡改修复 |
| **D3-01** API 命名 |  ✅  | `content`/`image`/`fontSize`/`fontFamily`/`fontColor`/`fontWeight`/`rotate`/`gap`/`offset`/`width`/`height`/`cross`/`defense`/`fullscreen` 命名规范，与 Ant Design / Element Plus 一致                                                           |

---

## 五、架构亮点

### 防篡改机制

`SWatermark` 的防篡改是双层级设计：

1. **Root 层（`WatermarkRoot`）**：`useMutationObserver(rootElement, ..., { childList: true })` 监听 overlay 被删除。当检测到 `data-soybean-watermark-overlay` 节点被移除时，调用 `compactContext?.repairOverlay()`。
2. **Overlay 层（`WatermarkOverlay`）**：`useMutationObserver(overlayElement, ..., { attributes: true, attributeFilter: ['aria-hidden', 'class', 'data-soybean-watermark-overlay', 'hidden', 'style'] })` 监听属性篡改。`isOverlayCompromised()` 检查 6 项：data 属性存在、`aria-hidden="true"`、无 `hidden`、className 匹配、`backgroundImage` 匹配、`style.length` 匹配。任一不符即调用 `repairOverlay()`。
3. **修复机制**：`WatermarkCompact` 提供 `overlayRenderKey`（`shallowRef(0)`）和 `repairOverlay`（递增 key）。`<WatermarkOverlay :key="overlayRenderKey" />` 通过 key 变化强制销毁并重建 overlay。

### Canvas 生成

`shared.ts` 的 `generateWatermarkDataUrl` 使用 `<canvas>` 生成平铺图案：

- 文字水印：`measureTextWidth` 测量文本宽度 → 计算 canvas 尺寸（考虑旋转 + gap）→ `fillText` 绘制
- 图片水印：`new Image()` + `crossOrigin = 'anonymous'` 加载 → `drawImage` 绘制
- 交叉图案：`drawCrossPattern` 沿主对角线 + 反对角线（反向旋转）绘制两次
- SSR 守护：`typeof window === 'undefined'` 返回 `undefined`

---

## 六、变更文件清单

| 文件                                               | 变更类型                                                                               |
| :------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `apps/docs/src/docs/en/components/watermark.md`    | 文档：新增 Features（9 条）+ Notes（架构对标表 + 运行时注意事项 5 条）+ FAQ（5 条）    |
| `apps/docs/src/docs/zh-CN/components/watermark.md` | 文档：新增功能（9 条）+ 注意事项（架构对标表 + 运行时注意事项 5 条）+ 常见问题（5 条） |
| `docs/check.md`                                    | 标记 C13 各维度为 ✅                                                                   |

---

## 七、验证命令

```bash
# 单元测试（14 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/watermark.spec.ts
# → Test Files 1 passed (1) | Tests 14 passed (14)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C13，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
