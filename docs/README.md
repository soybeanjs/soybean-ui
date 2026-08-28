# docs — 项目文档中心

> 本文档是 `docs/` 目录的**唯一导航入口**：说明目录分层、各类文档的定位与索引，并指向维护规范。
> 文档更新规范、命名约定与版本控制机制见 [GOVERNANCE.md](./GOVERNANCE.md)。
>
> 基线：2026-08-14（`ecosystem` 分支）。`apps/docs/` 是**用户文档站**（组件 API/示例/多语言内容，独立于本目录），不在本索引范围。

## 目录分层

```
docs/
├── README.md            # 本文档：导航入口
├── GOVERNANCE.md        # 文档治理：更新规范 / 命名 / 版本控制
├── architecture.md      # 工作区架构（唯一架构真相源）
├── optimize.md          # 工程质量评估（F1–F11 改进项与验收）
├── roadmap.md           # 总路线图（组件 / 生态 / 优化三板块汇总）
├── components.md        # 组件路线图源材料（45 活跃组件评估明细）
├── tasks.md             # 任务深度拆解（可执行子任务）
├── task-tracking.md     # 任务状态跟踪（唯一状态表）
├── ecosystem.md         # 生态架构方案（跨包依赖 / 命名 / registry 契约）
├── ecosystem-tasks.md   # 生态架构落地任务清单
├── adr/                 # 架构决策记录（ADR）
│   ├── README.md        # ADR 索引与模板
│   └── NNNN-*.md
├── ecosystem/           # 生态扩展包（各包技术方案 + 商业化）
│   └── README.md        # 生态方案索引（主入口）
├── research/            # 市场/竞品调研报告
│   └── README.md        # 调研报告索引
└── info/                # 一次性 / 周期审计与报告
    └── README.md        # 报告索引与归档规则
```

## 文档分类速查

| 分类           | 文件                                                                                                                                                         | 定位                          | 典型读者       |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :------------- |
| **架构与质量** | [architecture.md](./architecture.md) · [optimize.md](./optimize.md)                                                                                          | 仓库现状真相源 + 工程质量评估 | 架构师、新成员 |
| **路线与规划** | [roadmap.md](./roadmap.md) · [components.md](./components.md)                                                                                                | 总路线图 + 组件评估           | 规划者、贡献者 |
| **任务执行**   | [tasks.md](./tasks.md) · [task-tracking.md](./task-tracking.md)                                                                                              | 任务拆解 + 实时状态跟踪       | 执行者、管理者 |
| **决策记录**   | [adr/](./adr/README.md)                                                                                                                                      | 已接受的架构决策（ADR）       | 架构师         |
| **生态扩展**   | [ecosystem.md](./ecosystem.md)（架构契约）· [ecosystem-tasks.md](./ecosystem-tasks.md)（任务清单）· [ecosystem/](./ecosystem/README.md)（各包方案 + 商业化） | 生态架构 / 落地任务 / 包方案  | 生态开发者     |
| **调研报告**   | [research/](./research/README.md)                                                                                                                            | 市场/竞品调研原始结论         | 规划者         |
| **一次性报告** | [info/](./info/README.md)                                                                                                                                    | 周期审计、同步/适配报告       | 维护者         |

## 核心文档关系图

```
components.md ──► roadmap.md ◄── optimize.md
      │                │              ▲
      └── 评估明细      │              └── 改进项 F1–F11
                        ▼
                   tasks.md ──► task-tracking.md（状态）
                        │
                        ▼
        ecosystem/（各包方案）◄── research/（调研依据）
                        │
                        └── adr/（决策固化）
```

> 依赖方向：**调研/评估（源）→ 方案/路线（规划）→ 任务（执行）→ 状态（跟踪）→ 决策（固化）**。新增文档时按此链路落位，避免「多份手工副本」漂移（对应 optimize.md F10）。

## 常用查询路径

- **「某组件要不要做 / 排期如何」** → [roadmap.md](./roadmap.md)（高/中/低优先级）→ [components.md](./components.md)（评估明细）
- **「当前做到哪了」** → [task-tracking.md](./task-tracking.md)
- **「某个任务怎么拆」** → [tasks.md](./tasks.md)
- **「为什么这样分层」** → [adr/](./adr/README.md)
- **「生态包怎么规划」** → [ecosystem/](./ecosystem/README.md)
- **「竞品/市场依据」** → [research/](./research/README.md)
- **「质量改进项」** → [optimize.md](./optimize.md)

## 命名规范（摘要）

完整规范见 [GOVERNANCE.md](./GOVERNANCE.md)：

- **根目录**：仅保留跨领域、被全局引用的核心文档（架构 / 路线 / 任务）。
- **子目录**：按领域归类（adr / ecosystem / research / info），每子目录必带 `README.md` 索引。
- **文件名**：`kebab-case`；带序号的（ADR `NNNN-`、检查报告 `CXX-`）必须左对齐补零。
- **迁移**：移动/重命名文档必须同步更新全部交叉引用（见 GOVERNANCE §3）。
