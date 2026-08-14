# 调研报告索引（research）

> 本目录存放市场 / 竞品调研的**原始结论**，作为生态方案与商业化策略的事实依据。每份调研应基于一手来源（官方文档 / 许可页 / 定价页 / GitHub），并内联引用来源 URL；无法核实的事实须标注「未验证」。
>
> 治理规则见 [../GOVERNANCE.md](../GOVERNANCE.md)；导航入口见 [../README.md](../README.md)。

## 索引

| 报告                                                               | 领域                     | 日期       | 结论摘要                                                                                      |
| :----------------------------------------------------------------- | :----------------------- | :--------- | :-------------------------------------------------------------------------------------------- |
| [table-ecosystem.md](./table-ecosystem.md)                         | 高级表格 / 数据网格      | 2026-08-14 | Vue 生态缺「Headless 高级网格 + 服务端数据源抽象」；ProTable `request`+`valueType` 是黄金标准 |
| [form-ecosystem.md](./form-ecosystem.md)                           | Schema 驱动高级表单      | 2026-08-14 | Vue 生态「schema 驱动 + 自动渲染」空白；Standard Schema v1 已是事实标准                       |
| [commercialization-ecosystem.md](./commercialization-ecosystem.md) | editor/table/form 商业化 | 2026-08-14 | 「免费核心 + 付费高级层/托管/服务」是验证过的模型；分生态各 5 个方向                          |

## 调研 → 落地的链路

```
research/（原始调研）──► ecosystem/（包技术方案）──► commercialization.md（变现策略）
        ▲                                                  │
        └──────────────────────────────────────────────────┘
        （方案与策略须回链到调研出处，保证事实可溯源）
```

## 编写约定

1. 命名：`<领域>-ecosystem.md`（如 `table-ecosystem.md`）。
2. 结构：结论摘要 → 逐库/逐先例分析 → 能力对比表 → 共性与差距 → 参考来源。
3. 每条事实内联 `[来源](URL)`；定价/许可类信息标注核实状态与日期。
4. 完成调研后：登记本索引，并在 [ecosystem/README.md](../ecosystem/README.md) 关联对应方案文档。
