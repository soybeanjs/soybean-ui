# AI Assistant Bridge

Before making changes in this repository, read `.github/assistant-rules.md` and obey the `.github` rule files it routes you to.

- The assistant-neutral entrypoint is `.github/assistant-rules.md`.
- Read the root `AGENTS.md` first for the repository map and scoped bridge locations.
- The repository also keeps `.github/copilot-instructions.md` as a GitHub Copilot compatibility entrypoint, and you should read it when `.github/assistant-rules.md` routes you there.
- The normative rule source remains under `.github/`.
- If a nearer `AGENTS.md` exists for your target path, use it only to narrow which `.github` rules apply.
- If this file conflicts with anything under `.github`, `.github` wins.

For SoybeanUI component work, also read the component overview plus the relevant layer, docs, playground, testing, and checklist instruction files.

When public exports or API surfaces change, sync generated files through `pnpm sui headless`, `pnpm sui ui`, `pnpm sui api`, optional `pnpm sui api-locales`, and `pnpm sui api-translate -- --locale <locale>` instead of hand-editing generated outputs.
