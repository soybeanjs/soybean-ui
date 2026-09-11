# docs — 项目文档中心

> 本文档是 `docs/` 目录的**唯一导航入口**：说明目录分层、各类文档的定位与索引，并指向维护规范。
> 文档更新规范、命名约定与版本控制机制见 [GOVERNANCE.md](./GOVERNANCE.md)。
>
> `apps/docs/` 是**用户文档站**（组件 API/示例/多语言内容，独立于本目录），不在本索引范围。

## 目录分层

```
docs/
├── README.md            # 本文档：导航入口
├── GOVERNANCE.md        # 文档治理：更新规范 / 命名 / 版本控制
├── architecture.md      # 工作区架构（唯一架构真相源）
├── optimize.md          # 工程质量评估（F1–F11 改进项与验收，2026-09-06 基线）
├── theme.md             # 主题持久化与 FOUC 策略（SSG / SSR）
├── roadmap.md           # 总路线图（核心组件 / 核心内领域 / 未来提案 / 优化）
├── ui-ai-roadmap.md     # AI/chat 组件路线图（核心 headless/ui 内实现）
├── ui-shell-roadmap.md  # 中后台壳组件路线图（核心 headless/ui 内实现）
├── v0.50.0.md           # v0.50.0 重构方案（aria 改名 / 依赖最小化 / 准入整改 / 引擎更换）
├── components.md        # 组件路线图源材料（45 活跃组件评估明细）
├── headless-admission-remediation.md  # Headless 准入整改（组件级清单）
├── adr/                 # 架构决策记录（ADR）
│   ├── README.md        # ADR 索引与模板
│   └── NNNN-*.md
├── ecosystem/           # 未来提案（editor / table / form / ui-pro / sbean / 商业化）
│   └── README.md        # 提案索引（主入口；包形态待立项评估）
├── research/            # 市场/竞品调研报告
│   └── README.md        # 调研报告索引
└── info/                # 一次性 / 周期审计与报告
    └── README.md        # 报告索引与归档规则
```

## 文档分类速查

| 分类           | 文件                                                                                   | 定位                                                         | 典型读者           |
| :------------- | :------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----------------- |
| **架构与质量** | [architecture.md](./architecture.md) · [optimize.md](./optimize.md)                    | 仓库现状真相源 + 工程质量评估                                | 架构师、新成员     |
| **主题策略**   | [theme.md](./theme.md)                                                                 | 主题持久化 / FOUC 策略（SSG vs SSR）                         | 主题维护者、架构师 |
| **路线与规划** | [roadmap.md](./roadmap.md) · [components.md](./components.md)                          | 总路线图 + 组件评估                                          | 规划者、贡献者     |
| **核心内领域** | [ui-ai-roadmap.md](./ui-ai-roadmap.md) · [ui-shell-roadmap.md](./ui-shell-roadmap.md)  | AI/chat 与中后台壳组件的回迁规划（headless 准入）            | 组件开发者         |
| **版本重构**   | [v0.50.0.md](./v0.50.0.md)                                                             | v0.50.0 重构方案（aria 改名 / 依赖 / 准入 / 引擎）           | 维护者、执行者     |
| **准入整改**   | [headless-admission-remediation.md](./headless-admission-remediation.md)               | headless 准入违规组件级清单                                  | 组件开发者         |
| **决策记录**   | [adr/](./adr/README.md)                                                                | 架构决策（含已 superseded 的外围包分层 ADR）                 | 架构师             |
| **未来提案**   | [ecosystem/](./ecosystem/README.md)（editor / table / form / ui-pro / sbean / 商业化） | 方向调研；落地形态（核心内 / 独立包 / sbean 配方）立项时评估 | 规划者、生态开发者 |
| **调研报告**   | [research/](./research/README.md)                                                      | 市场/竞品调研原始结论                                        | 规划者             |
| **一次性报告** | [info/](./info/README.md)                                                              | 周期审计、同步/适配报告                                      | 维护者             |

## 核心文档关系图

```
components.md ──► roadmap.md ◄── optimize.md ──► v0.50.0.md（当前执行口径）
      │                ▲
      └── 评估明细      │
            ui-ai-roadmap.md / ui-shell-roadmap.md（核心内领域，遵循 headless 准入）
                        │
                        ▼
        ecosystem/（未来提案）◄── research/（调研依据）
                        │
                        └── adr/（决策固化；过期决策标记 superseded）
```

> 依赖方向：**调研/评估（源）→ 方案/路线（规划）→ 决策（固化）**。任务拆解与状态跟踪不设常驻文档，按需要使用临时计划 / issue；已完成或已取消的历史规划不在 docs 保留（可经 git 历史追溯）。新增文档时按此链路落位，避免「多份手工副本」漂移（对应 optimize.md F10）。

## 常用查询路径

- **「某组件要不要做 / 排期如何」** → [roadmap.md](./roadmap.md)（高/中/低优先级）→ [components.md](./components.md)（评估明细）
- **「AI 对话组件怎么做」** → [ui-ai-roadmap.md](./ui-ai-roadmap.md)
- **「后台壳 / 多模式布局 / 菜单 / 多页签怎么做」** → [ui-shell-roadmap.md](./ui-shell-roadmap.md)
- **「下一版本重构什么 / aria 改名怎么落地」** → [v0.50.0.md](./v0.50.0.md)
- **「这个组件该不该做 headless / 现有哪些违规」** → skill [layers.md Headless admission](../.agents/skills/soybean-ui-develop/layers.md#headless-admission) → [headless-admission-remediation.md](./headless-admission-remediation.md)
- **「为什么没有外围包了」** → [adr/0001](./adr/0001-peripheral-package-layering.md)（superseded 说明）+ 两份领域路线图
- **「editor/table/form 等提案现状」** → [ecosystem/](./ecosystem/README.md)
- **「竞品/市场依据」** → [research/](./research/README.md)
- **「质量改进项」** → [optimize.md](./optimize.md)
- **「刷新时主题闪一下怎么解决 / SSR 与 SSG 主题差异」** → [theme.md](./theme.md)

## 命名规范（摘要）

完整规范见 [GOVERNANCE.md](./GOVERNANCE.md)：

- **根目录**：仅保留跨领域、被全局引用的核心文档（架构 / 路线 / 治理）。
- **子目录**：按领域归类（adr / ecosystem / research / info），每子目录必带 `README.md` 索引。
- **文件名**：`kebab-case`；带序号的（ADR `NNNN-`、检查报告 `CXX-`）必须左对齐补零。
- **迁移**：移动/重命名文档必须同步更新全部交叉引用（见 GOVERNANCE §3）。
