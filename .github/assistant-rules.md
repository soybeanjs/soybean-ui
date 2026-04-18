# AI Assistant Rules

This is the assistant-neutral entrypoint for any AI coding assistant working in this repository.

## Source Of Truth

- The only normative rule source is under `.github/`.
- The assistant-neutral top-level entrypoint is `.github/assistant-rules.md`.
- `.github/copilot-instructions.md` is the GitHub Copilot compatibility entrypoint. Other assistants should still read it when routed here, because it contains repository-specific task routing that is still authoritative.
- Task- and path-specific rules live in `.github/instructions/*.instructions.md`.
- Bridge files such as `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`, and `OPENCODE.md` only route assistants to these `.github` files. They are not independent rule sources.
- If any bridge file conflicts with `.github`, `.github` wins.

## Required Reading Order

1. Read the root `AGENTS.md` for repository map and scoped AGENTS locations.
2. Read `.github/copilot-instructions.md` for repository-specific routing and compatibility.
3. Read the relevant files in `.github/instructions/` for the current task and target paths.
4. If the target path has a nearer `AGENTS.md`, use it only to narrow which `.github` files apply.

## Task Routing

- Common TypeScript / JavaScript / Vue editing:
  - `.github/instructions/import-order.instructions.md`
  - `.github/instructions/typescript-functional-style.instructions.md`
  - `.github/instructions/vue-sfc.instructions.md` for `.vue`
- Commit message, changelog, or release summary:
  - `.github/instructions/git-commit-convention.instructions.md`
- SoybeanUI component work:
  - Start with `.github/instructions/soybean-ui-component-overview.instructions.md`
  - Then read the relevant layer files such as headless, UI, and a11y/RTL
  - When delivery surfaces change, also read playground, docs, and testing instructions
  - Use `.github/instructions/soybean-ui-checklist.instructions.md` only at finish

## Non-negotiable Interpretation

- `.github` remains the single home for concrete rule content.
- `assistant-rules.md` is the neutral entrypoint; `copilot-instructions.md` is a compatibility bridge, not the assistant-neutral root.
- External assistant bridge files must stay thin and should point back to `.github` instead of duplicating detailed rules.
