# C09 `clipboard` 检查优化报告

> **组件编号：** C09  
> **组件名称：** `clipboard` / `SClipboard`  
> **模式：** 单类（基于 `Button` 的复合动作组件）  
> **优先级：** P2  
> **检查日期：** 2026-08-02  
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7（102 项）

---

## 一、执行摘要

对 `clipboard` 组件完成了 C09 全维度审计，重点覆盖 `docs/check.md` 指定的 **D1-15、D3-08、D7-10**。发现并修复 1 项 Major 级复制错误处理问题，补充测试与文档，整体达到可验收状态。

|    维度     | 状态 | 说明                                         |
| :---------: | :--: | :------------------------------------------- |
| D1 功能合规 |  ✅  | headless/UI 边界清晰，单类模式正确           |
| D2 行业对标 |  ✅  | 功能矩阵完整，与主流 CopyButton 对齐         |
| D3 API 设计 |  ✅  | 扩展点完整（class / as / asChild / slots）   |
| D4 类型系统 |  ✅  | JSDoc 覆盖公共 API，strict 通过              |
| D5 代码规范 |  ✅  | 复制逻辑提取为纯函数 `shared.ts`             |
|   D6 文档   |  ✅  | 中英文 Notes/FAQ 已补全，新增 icon-only 示例 |
|   D7 其他   |  ✅  | 13 项单元测试通过，axe-core 零违规           |

---

## 二、行业对标矩阵（D2）

| 能力            | SoybeanUI | Ant Design | Element Plus | MUI  | Mantine | Naive UI | shadcn/ui |
| :-------------- | :-------: | :--------: | :----------: | :--: | :-----: | :------: | :-------: |
| 一键复制文本    |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 复制成功反馈    |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 自定义图标/文案 |    ✅     |     ✅     |      ✅      |  —   |   ✅    |    —     |    ✅     |
| Legacy 降级     |    ✅     |     —      |      —       |  —   |    —    |    —     |     —     |
| 复制失败回调    |    ✅     |     —      |      —       |  —   |    —    |    —     |     —     |
| 按钮主题变体    |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| Headless 分离   |    ✅     |     —      |      —       | 部分 |    —    |    —     |    ✅     |
| 插槽自定义 UI   |    ✅     |    部分    |     部分     |  —   |   ✅    |    —     |    ✅     |

**增强项（➕，已记录）：**

- ConfigProvider 级别的 `copyText` / `copiedText` 国际化默认值（当前默认英文，需应用层传入或后续 locale 集成）
- 复制成功时的 `aria-live` polite 播报（当前依赖按钮文案变化，基本可用）

---

## 三、发现的问题与处理

### 3.1 Major — 复制失败时错误被吞掉（已修复）

**问题：** 原实现直接使用 `@vueuse/core` 的 `useClipboard().copy()`。该 API 在 Clipboard API 失败时会静默降级到 `execCommand`，且**不会抛出错误**，导致：

- `copyError` 事件几乎永远不会触发
- API 失败但 legacy 也失败时，仍可能错误进入 `copied` 状态

**修复：**

- 新增 `packages/headless/src/components/clipboard/shared.ts`，实现显式复制流程：
  1. 优先 `navigator.clipboard.writeText`
  2. 失败且 `legacy=true` 时降级 `execCommand('copy')`
  3. 任一路径失败则抛出错误，由组件 emit `copyError`
- 组件内自行管理 `copied` 状态与 `useTimeoutFn` 复位

### 3.2 Minor — `copiedDuration` / `legacy` 非响应式（已修复）

**问题：** 原先仅在 `useClipboard` 初始化时读取 props，运行时变更不生效。

**修复：** 改由组件内 `toRef(() => props.copiedDuration)` 驱动 timeout，复制逻辑直接读取 `props.legacy`。

### 3.3 Minor — 测试覆盖不足（已修复）

**补充测试：**

| 场景                               | 文件                                |
| :--------------------------------- | :---------------------------------- |
| 空字符串复制                       | `clipboard.spec.ts`                 |
| API 失败 + legacy 降级             | `clipboard.spec.ts` + `shared` 单测 |
| API 失败 + 无 legacy → `copyError` | `clipboard.spec.ts`                 |
| 不支持环境 → `unsupported` 状态    | `clipboard.spec.ts`                 |

### 3.4 Enhancement — 文档 Notes/FAQ 缺失（已修复）

- 中英文文档新增「架构与对标差异」和「FAQ」章节
- 新增 playground 示例 `07-icon-only.vue`（仅图标 + `aria-label`）
- 更新 `apps/docs/locales/{en,zh-CN}.json` 示例标题

---

## 四、重点检查项结论

| 检查项                             | 结论 | 证据                                                                                           |
| :--------------------------------- | :--: | :--------------------------------------------------------------------------------------------- |
| **D1-15** 装饰性图标 `aria-hidden` |  ✅  | headless 默认 leading 图标包裹 `aria-hidden="true"`                                            |
| **D3-08** 四类扩展点               |  ✅  | `class`、`as`/`asChild`（继承 Button）、`ui` N/A（单类）、`leading`/`default`/`trailing` slots |
| **D7-10** 异常边界                 |  ✅  | 空值、API 失败、legacy 失败、unsupported 均有测试覆盖                                          |
| **D7-05** a11y 扫描                |  ✅  | `getA11yViolations` 零违规                                                                     |
| **D7-19** 浏览器 e2e               |  —   | clipboard 不在强制 e2e 清单内（无 portal/键盘契约依赖）                                        |

---

## 五、变更文件清单

| 文件                                                       | 变更类型            |
| :--------------------------------------------------------- | :------------------ |
| `packages/headless/src/components/clipboard/shared.ts`     | 新增                |
| `packages/headless/src/components/clipboard/clipboard.vue` | 重构复制逻辑        |
| `packages/ui/test/specs/components/clipboard.spec.ts`      | 测试增强（9→13 项） |
| `apps/playground/src/examples/clipboard/07-icon-only.vue`  | 新增示例            |
| `apps/docs/src/docs/{en,zh-CN}/components/clipboard.md`    | Notes/FAQ           |
| `apps/docs/locales/{en,zh-CN}.json`                        | 示例标题            |

---

## 六、验证命令

```bash
pnpm exec vitest run packages/ui/test/specs/components/clipboard.spec.ts  # 13 passed
pnpm typecheck   # 通过（UI 包）
```

---

## 七、后续建议

1. **P3 增强：** 在 `ConfigProvider.locale` 中提供 `clipboard.copy` / `clipboard.copied` 默认文案
2. **P3 增强：** 为 icon-only 场景在文档中推广 `aria-label` 最佳实践（已在 FAQ 说明）
3. **跨组件：** `TypographyParagraph` copyable（roadmap）可复用本次 `shared.ts` 复制原语

---

_报告生成于组件审计工作流 C09，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
