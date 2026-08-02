# 代码与文档改进评估报告

> 基于 codegraph 分析与文档校验工作生成的系统性评估与改进建议。
>
> **生成时间：** 2026-08-02
> **适用版本：** 0.29.3
> **分析范围：** 组件关系、模块依赖、系统层级、文档与代码对齐

---

## 一、代码实现层面

### 1.1 架构一致性 ✅ 良好

**优点：**

- Headless/Styled 分层清晰，数据流单向（`headless` → `ui`），无逆向依赖
- 三种组件模式（Multi-slot / Compact / Single-class）边界明确
- `useContext` + `useUiContext` 桥接设计解耦了逻辑与样式

**潜在风险：**

| 风险点                                              | 位置                                                         | 建议                                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Compact 组件清单仅以散文形式列举                    | `packages/headless/AGENTS.md` L30, `AGENTS.md` L120          | 改用常量数组 + 自动校验脚本，避免新增 Compact 时遗漏文档同步                                   |
| `useUiContext` 是唯一允许 `@ts-expect-error` 的文件 | `packages/headless/AGENTS.md` L27                            | 建议添加专项单测或类型守卫，防止后续误删该豁免或扩散到其他文件                                 |
| Barrel 文件手工维护（`index.ts`）                   | `packages/headless/src/index.ts`, `packages/ui/src/index.ts` | 已有 `pnpm sui headless/ui` 生成 constants，但 barrel 本身仍手写；可考虑生成 barrel 以杜绝遗漏 |

### 1.2 类型系统 ✅ 良好

**优点：** 严格模式 + `extends /** @vue-ignore */ HTMLAttributes` 抑制 IDE 噪声的做法统一。

**改进建议：**

- `UiClass<UiSlot>` 已统一，但 `PropsToContext<T,K>` 的使用散落在各组件 context.ts 中，可在 `packages/headless/src/types/` 增加一份「类型使用索引」说明各类型的适用场景，降低新成员上手成本。
- 建议在 CI 中增加 `pnpm typecheck` 之外的「未使用类型导出」检测（如 `ts-prune`），防止类型层死代码累积。

### 1.3 测试覆盖 ⚠️ 待加强

**现状：**

- 单测基于 happy-dom + @vue/test-utils
- e2e 基于 Vitest Browser Mode + Playwright + axe-core（color-contrast on）

**建议：**

1. **Compact 组件缺测试基线**：`AccordionCompact`、`TableCompact` 等 12 个 Compact 聚合目前依赖手工 playground 验证，应补充组件级 e2e（参考 `.agents/skills/soybean-ui-component-development/e2e.md` Tier 1）。
2. **a11y 仅 axe-core 自动扫描**：缺少键盘导航的人工/脚本化断言矩阵。建议在 `e2e.md` 中补充「键盘流断言清单」作为 Tier 1 必跑项。
3. **覆盖率阈值未强制**：`vitest.config` 未设置 `coverage.thresholds`，建议设下限（如 statements 80%）作为 CI 门禁。

### 1.4 依赖与构建 ⚠️ 可优化

- `pnpm stub` 用于本地 src→dist 链接，但无文档说明何时该重新 stub；建议在 `process.md` 的 finish checklist 中加一项「修改了 headless 包导出后执行 `pnpm stub`」。
- `tsdown` 构建链 `headless → ui → css` 串行执行，未利用 turbo 缓存；若引入 `turbo.json` 的 `dependsOn` + 远端缓存，CI 增量构建可显著提速。

---

## 二、文档实践层面

### 2.1 文档结构 ✅ 良好

**优点：**

- 三层 AGENTS.md（根 / headless / ui）+ 自包含 skill（SKILL/layers/surfaces/e2e/process/audit/EXAMPLES），职责清晰。
- `docs/check.md` 作为「项目快照」与 `audit.md`「方法论」分离，避免方法论漂移。

**改进建议：**

| 问题                                                                                                   | 建议                                                                                                  |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 组件计数散落在 4+ 处（根 AGENTS.md、headless AGENTS.md、ui AGENTS.md、docs/check.md、docs/roadmap.md） | 抽取 `docs/stats.json` 作为单一数据源，各文档通过脚本注入或链接引用，杜绝本次出现的「88 vs 87」类漂移 |
| `docs/roadmap.md` 与 `docs/check.md` 的优先级（P0–P3）定义可能不同步                                   | 在 `roadmap.md` 顶部增加「同步规则」说明：每次 `check.md` 调整优先级后，须同步更新 roadmap 的活跃清单 |
| skill 内部交叉引用靠相对路径（`audit.md`、`e2e.md`）                                                   | 已较规范，但建议在 `SKILL.md` 顶部增加「文档地图」可视化各文件关系，降低首次阅读成本                  |

### 2.2 文档准确性 ✅ 已修正

本次已修正的问题：

- 组件计数（87 → 88 shipped；95 → 94 headless 目录；25 → 27 composables）
- CI 描述（"No PR check" → `ci.yml` 在 PR 触发）
- Pre-commit hook（`pnpm typecheck && pnpm lint-staged` → `vp staged`）
- Roadmap 中 `Rating` 已发布但未移除

**长效机制建议：**

在 `process.md` 的 finish checklist 中新增一项：

> 「若本次改动涉及：组件新增/删除、包导出变更、CI 配置变更、hook 变更 → 必须同步检查根 AGENTS.md、docs/check.md、docs/roadmap.md 的计数与描述」

### 2.3 文档可读性 ⚠️ 可改进

- **中英混排**：根 AGENTS.md 以英文为主，但 `docs/check.md`、`docs/roadmap.md` 以中文为主。建议明确：技术规范类（AGENTS.md、skill/\*）保持英文；项目快照类（docs/\*）可中文，但术语统一（如 "Compact aggregation" 不译）。
- **长表格**：`docs/check.md` 的 C01–C90 任务表行数多，建议增加按类别的折叠分组锚点（如 `#forms`、`#feedback`），便于跳转。
- **版本号硬编码**：`AGENTS.md` 中 `**Version:** 0.29.3` 与 `package.json` 双源，建议改为从 `package.json` 读取或在 release 流程中自动更新。

---

## 三、代码 ↔ 文档对齐

### 3.1 已识别的对齐缺口（本次已修复）

| 缺口                 | 根因                                 |
| -------------------- | ------------------------------------ |
| 计数漂移             | 多处手写，无单一数据源               |
| CI 描述过时          | 文档未跟随 `.github/workflows/` 演进 |
| Roadmap 含已发布组件 | 发布流程未触发 roadmap 清理          |

### 3.2 建议的自动化对齐机制

1. **文档一致性 CI 检查**：新增脚本 `scripts/check-docs-consistency.ts`，在 CI 中校验：
   - `AGENTS.md` 中的组件计数 == `packages/ui/src/index.ts` 实际导出数
   - `headless` 目录计数 == `ls packages/headless/src/components` 实际数
   - `roadmap.md` 活跃清单不含已发布组件
   - `AGENTS.md` 版本号 == `package.json` version

2. **发布流程钩子**：在 `pnpm release` 前自动运行上述校验 + `pnpm sui headless/ui/api/changelog`，失败则阻断发布。

3. **AGENTS.md lint**：将 AGENTS.md 的关键约束（如"Compact 清单"、"anti-patterns"）抽取为可机器校验的规则（如 `agents-lint` 自定义工具），在 pre-commit 中运行。

---

## 四、优先级建议（按投入产出排序）

| 优先级 | 建议                                            | 预期收益           |
| ------ | ----------------------------------------------- | ------------------ |
| P0     | 实现「文档一致性 CI 检查」脚本                  | 杜绝本次类漂移复发 |
| P0     | 在 `process.md` finish checklist 增加计数同步项 | 流程兜底           |
| P1     | Compact 组件 e2e 基线补齐                       | 覆盖核心聚合组件   |
| P1     | 抽取 `docs/stats.json` 单一数据源               | 长期维护成本下降   |
| P2     | 覆盖率阈值门禁                                  | 防止回归           |
| P2     | turbo 远端缓存                                  | CI 提速            |
| P3     | AGENTS.md 版本号自动同步                        | 减少手工操作       |
| P3     | 文档中英混排规范成文                            | 可读性提升         |

---

## 五、总结

本次 codegraph 分析验证了项目架构的健壮性：分层清晰、模式统一、anti-patterns 有明确约束。主要改进空间集中在**文档与代码的自动化对齐**——本次发现的所有问题（计数、CI、roadmap）均可通过 CI 脚本和 finish checklist 兜底避免。建议优先落地 P0 的两项机制性改进，从根因上消除漂移。
