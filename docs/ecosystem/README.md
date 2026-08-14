# SoybeanUI 生态扩展技术方案

> 本目录存放各外围包（peripheral package）的技术方案文档，是 [roadmap.md](../roadmap.md)「生态扩展路线」的展开。基线日期：2026-08-14；基线分支：`main`（`ui-x` / `admin` / `ecosystem` 临时分支尚未合并）。
>
> 导航：docs 总入口见 [../README.md](../README.md)；生态任务的落地跟踪见 [../ecosystem-tasks.md](../ecosystem-tasks.md)；调研依据见 [../research/README.md](../research/README.md)；文档治理规范见 [../GOVERNANCE.md](../GOVERNANCE.md)。

## 文档索引

| 文档                                           | 包                       | 状态                         | 说明                             |
| :--------------------------------------------- | :----------------------- | :--------------------------- | :------------------------------- |
| [ui-x.md](./ui-x.md)                           | `@soybeanjs/ui-x`        | 分支已实现，待合并           | AI 对话交互组件                  |
| [admin.md](./admin.md)                         | `@soybeanjs/admin`       | 分支已实现 M1/M2，M3+ 未开始 | 中后台复合 / 布局层              |
| [chart.md](./chart.md)                         | `@soybeanjs/chart`       | 仅骨架，选型待定             | 图表组件                         |
| [editor.md](./editor.md)                       | `@soybeanjs/editor`      | 立项提案（调研已完成）       | 富文本编辑器（Tiptap，MIT 边界） |
| [table.md](./table.md)                         | `@soybeanjs/table`       | 立项提案（调研已完成）       | 高级数据网格 / ProTable          |
| [form.md](./form.md)                           | `@soybeanjs/form`        | 立项提案（调研已完成）       | Schema 驱动高级表单              |
| [ui-pro.md](./ui-pro.md)                       | `@soybeanjs/ui-pro`      | 探索性预留                   | 增值 / 高级组件                  |
| [commercialization.md](./commercialization.md) | editor/table/form 三生态 | 策略建议（调研已完成）       | 商业化方向与执行建议             |

> 包骨架接入契约见 [../ecosystem.md](../ecosystem.md) §10「新包接入清单」；每个新包立项时按 [../GOVERNANCE.md](../GOVERNANCE.md) 登记到本文档索引。

## 分层模型（ADR-0001 摘要）

> 完整决策记录见 `ecosystem` 分支 `docs/adr/0001-peripheral-package-layering.md`；该 ADR 随分支合并进入 main。

```
Layer 4  外围包（单包自治）     @soybeanjs/ui-x · @soybeanjs/admin ──(peerDep)──► @soybeanjs/chart
                                 @soybeanjs/editor（提案）· @soybeanjs/ui-pro（预留）
Layer 3  样式组件层             @soybeanjs/ui
Layer 2  无头逻辑层             @soybeanjs/headless（唯一逻辑层）
Layer 1  主题与样式引擎         @soybeanjs/theme · @soybeanjs/unocss
横切     源码分发与文档生成     @soybeanjs/sbean
```

核心决策：

1. **核心 headless 是唯一逻辑层。** 外围包不建独立逻辑包（`headless-x` 已在方案中判死，其 composables / types 迁入 `ui-x` 包内）。
2. **单包自治。** 外围包的领域逻辑与样式同居于一个包内（区别于核心的 headless/styled 两层拆分），避免包数量爆炸。
3. **原子原语上浮判据。** 仅当某能力被 ≥2 个域共享且无领域语义时，才可上浮核心 headless（当前待评估：`use-x-stream`）。
4. **跨包依赖白名单。** 外围包之间默认禁止依赖；唯一允许的有向边是 `admin → chart`（peerDependencies，optional，供仪表盘嵌图表）。新增边须更新 CONTEXT.md 白名单。
5. **Lockstep 版本。** 全包同版本（当前 0.29.3），单主干 main，单 tag 发布。

## 术语

| 术语                            | 含义                                                                                                                                                                        |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 外围包（peripheral package）    | Layer 4 的领域扩展包（ui-x / admin / chart / editor / table / form / ui-pro）                                                                                               |
| 原子原语（atomic primitive）    | 无领域语义、可跨域复用的最小组合式能力（如 `use-x-stream` 的 SSE 解析）                                                                                                     |
| 包装型组件（wrapper component） | 基于核心 `@soybeanjs/ui` 原子组件组合出的复合组件（如 `SAppBreadcrumb` = `SBreadcrumb` + `SDropdownMenu`）                                                                  |
| 组件前缀                        | 导出命名空间：ui=`S`、ui-x=`Sx`、admin=`S`+`App*`、chart=`S`+`Chart*`、editor=`S`+`Editor*`、table=`S`+`Table*`（旗舰 `STablePro`）、form=`S`+`Form*`（旗舰 `SFormSchema`） |
| 命名空间 registry item          | sbean registry 条目的 `package/component` 形式（如 `ui/accordion`）                                                                                                         |
