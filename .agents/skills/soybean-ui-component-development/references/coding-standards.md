# 规范组织说明

这一组 reference 是 soybean-ui-component-development skill 的内置规范包，用来把组件开发流程和横切编码规范收敛到同一个入口。

## 推荐组织方式

- 把组件开发 skill 作为任务工作流入口，内置与该工作流强相关的规范摘要和 reference。
- 不把规范拆成多个再被其他 skill “引入”的 skill，因为当前 skill 体系没有原生的嵌套 import 机制。
- 如果某份规范本身就是一个独立工作流，例如“只做 TypeScript 重构”，可以保留一个独立 skill 作为发现入口，但内容应与这里保持一致。

## 何时看哪份规范

- [import-order.md](./import-order.md): 修改任何 TypeScript、JavaScript、Vue 文件时检查 import 分组和相邻的 type import。
- [typescript-functional-style.md](./typescript-functional-style.md): 编写或重构 TypeScript、Vue script、composable、shared 工具时使用。
- [git-commit-convention.md](./git-commit-convention.md): 准备 commit message、changelog、release summary 时使用。
- [patterns.md](./patterns.md): 对照仓库内已经验证过的组件模式实现。
- [anti-patterns.md](./anti-patterns.md): 规避 headless/UI 分层中的常见错误。
- [checklist.md](./checklist.md): 开发收尾阶段逐项验证。

## 实施建议

- 在 soybean-ui 里，“规范”更适合作为 instructions + skill references 的组合，而不是多个相互依赖的 skill。
- skill 负责提供任务上下文、流程和引用入口；reference 负责承载细则；instructions 负责自动覆盖到日常编辑场景。
- 这样可以同时满足自动生效、集中查阅、低漂移成本这三件事。
