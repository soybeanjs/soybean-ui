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
  - Start with `.github/instructions/coding-standards.instructions.md`
- Commit message, changelog, or release summary:
  - `.github/instructions/git-commit-convention.instructions.md`
- SoybeanUI component work:
  - Start with `.github/instructions/soybean-ui-component-overview.instructions.md`
  - Then read the relevant layer or delivery-surface files only when they are touched
  - Use `.github/instructions/soybean-ui-checklist.instructions.md` only at finish

## Non-negotiable Interpretation

- `.github` remains the single home for concrete rule content.
- `assistant-rules.md` is the neutral entrypoint; `copilot-instructions.md` is a compatibility bridge, not the assistant-neutral root.
- External assistant bridge files must stay thin and should point back to `.github` instead of duplicating detailed rules.

## Instruction Maintenance Contract

- `assistant-rules.md` only defines source of truth, reading order, and top-level routing.
- `copilot-instructions.md` only carries GitHub Copilot compatibility and repository-specific routing notes.
- `coding-standards.instructions.md` is the common-code routing file for ordinary TypeScript, JavaScript, and Vue edits.
- `soybean-ui-component-overview.instructions.md` only decides component pattern, scenario, phase order, and delivery scope.
- Layer files such as headless, UI, and a11y/RTL only contain rules that are unique to that layer.
- Delivery files such as docs, playground, and testing only contain rules for that delivery surface.
- `soybean-ui-checklist.instructions.md` only contains finish-stage checks and must not restate implementation flow.
- When a rule has one clear owner, other files should reference that owner instead of re-explaining the same rule.
