# SoybeanUI Component Development Examples

## New component

Request:

"根据现有模式新增一个 tree 组件，补齐 headless、UI、playground、docs 和 tests。"

Why it triggers:

- Explicit new SoybeanUI component work.
- Full delivery surface is implied.
- Needs pattern classification before coding.

Expected approach:

1. Decide whether `tree` is multi-slot, compact, or single-class.
2. Read `.github/copilot-instructions.md` and the relevant component instructions.
3. Implement headless first, then UI, then exports, generated files, playground, docs, and tests.

## Migration or normalization

Request:

"把另一个仓库里的 stepper 迁到 soybean-ui，并按现有规范重组。"

Why it triggers:

- This is a component migration task, not a generic refactor.
- It requires behavior preservation plus structural normalization.
- It usually spans headless, UI, exports, and delivery surfaces.

Expected approach:

1. Preserve valid behavior, state, accessibility, and public API from the source implementation.
2. Rebuild the feature into SoybeanUI's headless/UI split.
3. Finish generated surfaces and outward delivery files.

## Existing component fix or extension

Request:

"给 dialog 加一个新能力，并同步 playground 和文档；如果需要，补测试。"

Why it triggers:

- This is component-scoped feature work.
- It requires deciding whether the change belongs in headless or UI.
- It explicitly mentions downstream delivery surfaces.

Expected approach:

1. Locate the controlling layer for the new behavior.
2. Keep accessibility and interaction semantics in headless.
3. Update exports, playground, docs, tests, and generated API data when affected.
