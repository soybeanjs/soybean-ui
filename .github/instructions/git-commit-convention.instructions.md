---
applyTo: '**/*.{md}'
---

# Git Commit 规范

编写 commit message、准备 changelog 或 release summary 时，使用 Conventional Commits，格式必须为：

`<type>(<scope>): <subject>`

示例：

`fix(dialog): prevent nested popup from closing on outside click`

## 核心规则

- `type`、`scope`、`subject` 都必填。
- `type` 与 `scope` 使用小写 kebab-case。
- `subject` 要简洁、具体、面向结果。
- `subject` 不要以句号结尾。
- 优先一个组件或一个明确领域对应一个 commit。
- 如果一个改动跨 headless、UI、docs、examples、tests，但都围绕同一组件，仍保持单一组件 scope。

## 推荐类型

- `feat`: 用户可见的新能力、新 prop、新 slot、新事件
- `fix`: bug 修复或行为纠正
- `perf`: 性能优化
- `refactor`: 无意图行为变化的内部重构
- `docs`: 文档改动
- `chore`: 依赖、工具、配置、工作流、维护类改动

## Scope 规则

### 1. 优先精确组件名

如果改动主要围绕单个组件，scope 直接用组件名，即使同时改了 docs、examples、tests。

示例：

- `feat(button): add loading slot`
- `fix(dialog): restore focus after nested close`
- `docs(table): document remote pagination`

### 2. 只有在单组件 scope 误导时才用领域 scope

适合共享基础设施或真正跨领域的改动：

- `ui`
- `headless`
- `composables`
- `shared`
- `types`
- `theme`
- `styles`
- `docs`
- `examples`
- `playground`
- `resolver`
- `nuxt`
- `deps`
- `projects`
- `workflow`
- `build`
- `test`
- `config`

### 3. 避免模糊 scope

- 能写 `dialog` 时，不要写 `components`。
- 只改某个组件文档时，优先 `docs(button)` 而不是 `docs(docs)`。
- 能准确落到某个组件时，不要退化成 `ui` 或 `headless`。

## Subject 规则

subject 要回答“这个 scope 具体改了什么”。

优先写成：

- 祈使动词
- 明确对象或 API 面
- 真实结果或效果

推荐动词：

- `add`
- `fix`
- `remove`
- `rename`
- `support`
- `prevent`
- `simplify`
- `refactor`
- `optimize`
- `document`
- `update`

好的 subject：

- `add loading slot and loading prop`
- `prevent outside click from closing nested popup`
- `document async validation example`
- `update deps`

避免：

- `update code`
- `fix issues`
- `improve component`
- `misc changes`

## 粒度建议

- 优先一个组件一个 commit。
- 同一组件跨 headless 与 UI 的改动，放在一个组件 scope 的 commit 里。
- 若同一改动还包含该组件的 docs 或 examples，仍放在同一个组件 scope commit 里。
- 如果改了两个无关组件，尽量拆成两个 commit。
- 仓库级统一改造且难以拆分时，再使用 `ui`、`headless`、`projects` 之类的共享 scope。

## 决策检查

- 格式是否严格为 `<type>(<scope>): <subject>`？
- `type` 是否使用推荐类型？
- `scope` 是否已经精确到单组件？
- 这次工作是否应该拆成多个组件级 commit？
- `subject` 是否具体描述了变化，而不是空泛措辞？
- 这条 commit 单独出现在 changelog 中时，是否依然容易理解？
