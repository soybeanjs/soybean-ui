# REPO SERVICE CLI — @soybeanjs/scripts (`sui`)

## AI ASSISTANT BRIDGE

For any AI assistant editing files under `packages/scripts/`:

1. For `**/*.{ts,tsx,js,jsx}` edits, load the global `typescript-functional-style` skill.
2. Before changing a command's surface (name, argument, option), read `test/cli.spec.ts` — it asserts the declaration itself and will fail on any rename or drop.

**Package:** `packages/scripts/` → private, **never published**. Bin `sui`, run in-repo as `pnpm sui <command>`.
**NOT to be confused with `sbean`** (`packages/cli/`), the published consumer CLI. Do not merge them or import across.

## COMMAND MODEL

Declared with **cac** in `src/cli.ts` — not hand-dispatched. Every action receives parsed options, so no command re-parses `process.argv`, and `--help` / `--version` / unknown-option / missing-argument handling lives in exactly one place. `src/index.ts` only parses and awaits.

`createCli()` returns the `CAC` instance so `test/cli.spec.ts` can inspect `commands.map(c => c.name)` and each command's `args` / `options` arrays. Adding a command means: add the declaration in `cli.ts`, add a `src/commands/<name>.ts`, and pin the new surface in `cli.spec.ts`.

Three groups plus one-off workspace commands:

| Group                                               | Nature                                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `gen`                                               | **Deterministic, offline.** Never touches the network.                         |
| `translate`                                         | **The only networked group** (DeepL) and the only one needing `DEEPL_API_KEY`. |
| `check`                                             | Verification gates; exit 1 on drift.                                           |
| `stub`, `reorder-imports`, `sync-template-versions` | One-off workspace helpers.                                                     |

## DETERMINISM IS A CONTRACT, NOT A NICETY

`check generated` regenerates every surface (`--force`) and compares **content hashes of the on-disk files before and after**, instead of diffing against a git revision. That makes the verdict independent of what happens to be committed or staged, so the same command is meaningful locally and in CI.

Two mechanisms make it work, and both must be preserved when you touch generation:

- **Stable `generatedAt`** — generators compare the produced payload against the committed file and skip the write when only `generatedAt` would differ, so a no-op regeneration produces no diff and the field keeps meaning "when the data last changed". Never hand-edit a generated timestamp.
- **Content-aware writes** — otherwise a no-op `gen` run would always touch mtimes and every gate would report drift.

**Register every new output.** `generatedDataPaths` in `src/commands/gen.ts` is the declared drift set (`packages/{headless,ui}/src/constants/components.ts`, `packages/headless/src/namespaced/index.ts`, `apps/docs/src/generated`, `apps/docs/public/schema`, `skills`). A generator that writes somewhere else is invisible to the CI gate — add the path.

## FINGERPRINT CACHE

`gen api` hashes its inputs (ui/headless/theme/scripts sources, tsconfigs, lockfile) plus the on-disk output, and skips the TypeDoc pass (**~40s → ~0.15s**) only when both match the recorded entry. The entry lives in `node_modules/.cache/sui/` and is never committed. `--force` bypasses the check — which is exactly what `check generated` passes.

Consequence: if you change what `gen api` _consumes_ without changing those hashed inputs, a stale cache entry can serve old output. Add the new input to the fingerprint rather than relying on `--force`.

## SCHEMA GENERATION IS NOT HERE

`gen schema` imports the generator from `packages/cli/scripts/schema.ts` (ADR-008) so it reuses the exact same code path as `pnpm --filter sbean build:schema`. Schema logic lives next to the valibot schemas it converts; do not reimplement it in this package.

## ANTI-PATTERNS

- **NO network in `gen`.** Translation lives only in `translate`.
- **NO `process.argv` parsing** in a command file — add the option to the `cli.ts` declaration.
- **NO hand-edited generated output.** The gates exist precisely because those files have one author.
- **NO unregistered output paths** (see above).
- **NO printing secrets.** `translate` reads `DEEPL_API_KEY` from the env; never log it.
