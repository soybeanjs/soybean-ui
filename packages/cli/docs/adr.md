# Architecture Decision Records — vean

> Produced via a `grill-with-docs` session (3 grilling rounds, 11 decisions).
> Companion to [comparison-with-shadcn-vue.md](./comparison-with-shadcn-vue.md) and [GLOSSARY.md](./GLOSSARY.md).

**Status legend:** `Accepted` (locked, ready to implement) · `Deferred` (decided, awaiting trigger) · `Open` (needs further grilling)

---

## ADR-001 — Parity scope: stack-relevant, not full CLI parity

**Status:** Accepted

**Context.** shadcn-vue CLI assumes Tailwind + multi-framework (Nuxt/Vite/Laravel/Astro) + zod + `ts-morph`/`vue-metamorph` AST transforms. vean is UnoCSS-first + Vean-stack-bound + valibot. Treating every shadcn capability as a "gap" would misclassify correct divergences as deficiencies.

**Decision.** Only gaps relevant to the Vean/UnoCSS/`@soybeanjs/cva` stack count as "missing." Tailwind v3→v4 migration, postcss handling, `ts-morph`/`vue-metamorph` AST transforms, and non-Vue framework scaffolds (Laravel/Astro) are **intentionally out-of-scope** — peer paths, not targets.

**Consequences.**

- (+) Focuses effort on genuine Vean-stack gaps.
- (+) Avoids diluting UnoCSS alignment with Tailwind-specific machinery.
- (−) vean will not be a drop-in replacement for shadcn-vue users on Tailwind/non-Vue stacks — by design.

**Alternatives considered.**

- Full CLI parity (every shadcn capability replicated) — rejected: risks Tailwind assumptions leaking into UnoCSS path; large effort for capabilities the Vean stack doesn't need.
- Parity + Vean-native extensions — deferred: the "native extensions" (component-pattern taxonomy, `UiSlot`/`UiClass` metadata) are future enhancements, not current-scope blockers.

---

## ADR-002 — Registry taxonomy: adopt shadcn's 6 missing item types verbatim

**Status:** Accepted

**Context.** vean's `registryItemTypeSchema` ([schema.ts:27-37](../src/registry/schema.ts#L27-L37)) defines 9 types. shadcn-vue defines 15 ([schema.ts:85-103](https://github.com/unovue/shadcn-vue/blob/main/packages/cli/src/registry/schema.ts#L85-L103)). The 6 missing types are `registry:composable`, `registry:page`, `registry:file`, `registry:item`, `registry:example`, `registry:internal`.

**Decision.** Add all 6 missing types to `registryItemTypeSchema` verbatim. Enforce mandatory `target` for `registry:file` and `registry:page` (parity with shadcn's discriminated file schema). `registry:example` and `registry:internal` remain internal-only.

**Consequences.**

- (+) Maximizes `registry.json` cross-compatibility with the shadcn ecosystem and existing tooling.
- (+) Lowest surprise for users migrating from shadcn-vue.
- (−) Adds types that Vean may not immediately populate (`registry:page`, `registry:example`) — acceptable as forward-compatible schema.

**Alternatives considered.**

- Vean-native taxonomy (`registry:aria`, `registry:ui-styled`, `registry:compact`, `registry:style-recipe`, `registry:composable`) — rejected: breaks cross-compat; the monorepo's layer split is better expressed in `meta` than in the type tag.
- Hybrid (shadcn types + Vean metadata fields) — deferred: `meta.componentPattern` is a future tooling enhancement, not a current blocker.

---

## ADR-003 — Responsibility split: vean = delivery system; `@vean/theme` = token owner

**Status:** Accepted

**Context.** shadcn-vue's registry schema carries rich token modeling: recursive `css` object, `theme`-scoped `cssVars`, `envVars`, Google-font `provider/import/variable/subsets`. vean's `css` is a plain `string`, `cssVars` has only `light`/`dark`, no `envVars`, lean font schema. The Vean stack has a dedicated theme package (`@vean/theme`) already imported by vean ([registry/config.ts:7](../src/registry/config.ts#L7)).

**Decision.** vean stays a **delivery system** — `css` stays `string`, `cssVars` stays `{light, dark}`, no `envVars`, lean `registry:font` schema. All rich token modeling (recursive css, Google-font provider, theme-scoped cssVars, envVars) lives in `@vean/theme`. vean references the theme package; it does not replicate its responsibilities.

**Consequences.**

- (+) Clear single-responsibility: vean moves files; theme pkg owns tokens.
- (+) No schema duplication between vean and the theme package.
- (−) registry items cannot self-contain rich theme fragments — they depend on the theme package being installed. Acceptable given `vean init` wires `@vean/theme` by default.

**Alternatives considered.**

- vean adopts shadcn's full theme schema — rejected: duplicates `@vean/theme` responsibilities; risk of drift.
- Split (font+cssVars in vean, recursive css in theme pkg) — rejected: font provider modeling is genuinely theme-package territory; partial adoption creates two sources of truth for fonts.

---

## ADR-004 — `migrate` command + AST: deferred until a real breaking change

**Status:** Deferred

**Context.** shadcn-vue ships a `migrate` command (`icons`, `rtl` migrations, [migrate.ts:12-114](https://github.com/unovue/shadcn-vue/blob/main/packages/cli/src/commands/migrate.ts)) and uses `ts-morph`/`vue-metamorph` for AST-based transforms. vean has no `migrate` command and uses regex-based import extraction ([add-components.ts:479-484](../src/utils/add-components.ts#L479-L484)).

**Decision.** **No `migrate` command now** — there is no concrete Vean migration to ship (`@soybeanjs/cva` and aria APIs are stable). Add `ts-morph`/`vue-metamorph` AST capability **only** when a real breaking change (e.g., `@soybeanjs/cva` v0→v1 recipe API, aria context API evolution) demands it. Avoids speculative infrastructure.

**Consequences.**

- (+) No premature dependency on `ts-morph`/`vue-metamorph` (heavy deps).
- (+) No empty `migrate` command that signals false maturity.
- (−) When a breaking change lands, the migration will be built under time pressure. Mitigation: monitor `@soybeanjs/cva` and `@vean/aria` release notes; trigger this ADR's revival proactively.

**Alternatives considered.**

- Add `migrate` + AST now for parity — rejected: speculative; no concrete migration to ship.
- Skip both permanently — rejected: Vean will eventually have breaking changes; "rely on `vean add --overwrite`" is insufficient for automated migrations.

---

## ADR-005 — Registry-item `uno` field: structured, mirroring UnoCSS `UserConfig`

**Status:** Accepted

**Context.** The registry-item `uno` field is **opaque** `{config: v.optional(v.object({}))}` ([schema.ts:72-76](../src/registry/schema.ts#L72-L76)), while the project-config `uno` (in `vean.json` / `registry/config.ts:61`) is **structured** (`base/primary/size/radius`). This split-identity means `registry:base`/`registry:style` items cannot declaratively ship UnoCSS config fragments. shadcn's `tailwind` field is structured `{content, theme, plugins}`.

**Decision.** Replace the opaque `uno` field with a typed shape mirroring UnoCSS's `UserConfig`: `{presets, rules, shortcuts, theme, safelist}`. Enables registry items to ship real UnoCSS config fragments that merge deterministically during `vean add`.

**Consequences.**

- (+) `registry:base`/`registry:style` items can carry UnoCSS rules/shortcuts, not just CSS.
- (+) Aligns the registry-item `uno` with the structured project-config `uno` (one concept, one shape).
- (−) Existing `registry.json` items with opaque `uno` need migration — they're currently empty, so the migration is a no-op in practice.

**Alternatives considered.**

- Drop the field; let CSS + init own UnoCSS — rejected: registry items lose the ability to ship UnoCSS rules/shortcuts.
- Keep opaque as escape hatch — rejected: unstructured fields invite drift; the structured shape is strictly more expressive.

---

## ADR-006 — Resolver: keep BFS+regex; add topological sort for write ordering only

**Status:** Accepted

**Context.** vean resolves deps via a BFS-queue + file-level source expansion (auto-pulling co-located files from `SOURCE_ROOT`) + regex import extraction + dedup ([add-components.ts:90-146](../src/utils/add-components.ts#L90-L146)). shadcn uses topological sort + recursive dep-tree + metadata merge. vean's file-level expansion (`expandRegistryItemFiles`, `includeBarrelFiles`) is arguably **more advanced** than shadcn's resolver in one dimension — it auto-includes co-located source files and barrel exports.

**Decision.** Keep the BFS-queue + file-level expansion + regex extraction as the core. Add a topological-sort pass **only** for deterministic file-write ordering — so identical `vean add` runs produce identical diffs. No AST, no recursive metadata merge.

**Consequences.**

- (+) Preserves vean's file-level expansion advantage (auto-pulls co-located source).
- (+) Deterministic diffs improve `--diff`/`--dry-run` reproducibility and reviewability.
- (−) Non-topological resolution means dependency metadata isn't merged transitively — acceptable given vean's `uno`/`cssVars` fields are intentionally lean (ADR-003).

**Alternatives considered.**

- Adopt shadcn's `resolver.ts` architecture (recursive dep-tree + topo sort + metadata merge) — rejected: large rewrite; vean's file-level expansion is a genuine advantage worth keeping.
- Keep current model verbatim — rejected: non-deterministic write ordering harms `--diff` reproducibility.

---

## ADR-007 — Icons: out-of-scope; Vean's Icon is Iconify-component-based

**Status:** Accepted

**Context.** vean has no `icons/` subsystem; shadcn-vue has `lucide`/`tabler` fetching via `src/icons/`. However, Vean's `Icon` component (`packages/aria/src/components/_icon/`) uses `@iconify/vue` directly — supporting **arbitrary Iconify collections** as component props, not CSS class-based icons. The `Icon` registry entry declares `["@iconify/vue", "@vean/aria"]` ([registry.json:863](../registry.json#L863)).

**Decision.** Icons are **out-of-scope** for vean. UnoCSS's `@iconify-json/*` collections via `presetIcons` + `@vean/ui`'s Iconify-component-based `Icon` are the idiomatic Vean path. No `icons` command, no icon fetching, no `registry:icon` type. Document this as an intentional architectural choice — shadcn's class-icon model is structurally inapplicable to Vean.

**Consequences.**

- (+) No redundant icon-fetching infrastructure.
- (+) Aligns with Vean's component-based icon architecture.
- (−) Users coming from shadcn expecting an `icons` command will need documentation pointing them to `presetIcons` + `@iconify-json/*`.

**Alternatives considered.**

- Add `icons` command + `registry:icon` type — rejected: duplicates UnoCSS's `presetIcons`; class-icon model doesn't fit.
- `registry:icon` metadata-only type (no fetch) — rejected: adds schema surface for no functional gain.

---

## ADR-008 — Schema library: keep valibot; emit + publish JSON schemas

**Status:** Accepted

**Context.** vean uses valibot; shadcn uses zod AND publishes JSON schemas (`registry-item.json`, `schema.json`) for IDE autocompletion/validation. vean has `scripts/schema.ts` but publishes no public schema. Switching to zod would enable sharing schema packages with shadcn but is a large migration touching every schema file + tests.

**Decision.** Keep valibot. Add a valibot→JSON-Schema emitter (via `@valibot/to-json-schema`). Publish `vean.json` + `registry-item.json` JSON schemas via a new `pnpm sui gen schema` task, integrated with the monorepo's existing `pnpm sui` generation flow.

**Consequences.**

- (+) IDE-validation parity with shadcn without a library migration.
- (+) Valibot's smaller bundle size preserved.
- (−) valibot→JSON-Schema emission is less mature than zod-to-json-schema; may require manual schema annotations for edge cases.
- (−) No shared schema package with shadcn ecosystem (acceptable — schemas diverge on `uno` vs `tailwind` anyway).

**Alternatives considered.**

- Migrate valibot → zod — rejected: large migration; the `uno`/`tailwind` divergence means schemas wouldn't be shared regardless.
- Keep valibot, no public schema — rejected: leaves a DX gap (no `registry.json` autocompletion in editors).

---

## ADR-009 — `registry:base` config: typed Vean-native shape

**Status:** Accepted

**Context.** shadcn's `registry:base` carries `rawConfigSchema.deepPartial()` (full project config: style, font, tailwind, iconLibrary, rtl, aliases, registries). vean's `registry:base` has opaque `config: v.optional(v.object({}))` ([schema.ts:123-128](../src/registry/schema.ts#L123-L128)). The opaque shape means base items cannot declaratively represent project variants.

**Decision.** Define a typed `veanBaseConfigSchema` mirroring Vean's actual project shape: `uno` (base/primary/size/radius), `aliases` (ui/theme/styles/components/composables), `themePackage` (`@vean/theme`), `resolver`, `iconLibrary`, `rtl`, `pointer`. `registry:base` items carry `.deepPartial()` of this schema — enabling full project bootstrapping via a base item.

**Consequences.**

- (+) `registry:base` items can declaratively represent Vean project variants.
- (+) Aligns the base item with `vean init`/`templates.ts` (one config shape across init/template/base).
- (−) Schema is Vean-specific (won't round-trip with shadcn base items) — acceptable per ADR-001 (stack-relevant parity, not full parity).

**Alternatives considered.**

- Keep opaque; `init` owns config — rejected: base items can't represent variants declaratively.
- Adopt shadcn `rawConfigSchema` verbatim (rename `tailwind`→`uno`) — rejected: carries shadcn assumptions (`style`, `fontHeading`, `menuColor`, `menuAccent`) that don't map to Vean.

---

## ADR-010 — Templates: Vite + Nuxt scaffolds

**Status:** Accepted

**Context.** Round 1 (ADR-001) ruled non-Vue frameworks (Laravel/Astro) out-of-scope. But Nuxt IS Vue-ecosystem and Vean ships a `@vean/ui/nuxt` module. shadcn ships nuxt/vite/laravel/astro templates. vean `template` currently generates UnoCSS+Vite config only.

**Decision.** vean ships two first-class templates: **Vite + Nuxt**. Nuxt template wires `@vean/ui/nuxt` module + `uno.config.ts`. Skip Laravel/Astro (out-of-scope, ADR-001). `template` command gains a `--framework nuxt|vite` flag.

**Consequences.**

- (+) Nuxt users get first-class scaffold parity with Vite users.
- (+) Leverages the existing `@vean/ui/nuxt` module.
- (−) Two templates to maintain in sync. Mitigation: share `uno.config.ts` + dependency snippets between templates (already done in `templates.ts` via shared `UNO_CONFIG_CONTENT`).

**Alternatives considered.**

- Vite-only; defer Nuxt — rejected: Nuxt is in-scope (Vue-ecosystem) and Vean already ships the Nuxt module.
- Vite + Nuxt + adapter extension point — deferred: adds an adapter contract to maintain; revisit if community demand surfaces for Laravel/Astro adapters.

---

## ADR-011 — MCP surface: lock the 7 existing tools + add `explain_gap`; adopt SDK transport

**Status:** Accepted

**Context.** vean MCP exposes 7 tools (`get_project_registries`, `list_items_in_registries`, `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`, `get_audit_checklist`) — **identical to shadcn-vue's 7-tool surface**. But vean **hand-rolls the JSON-RPC transport** ([mcp/index.ts:307-413](../src/mcp/index.ts#L307-L413)) while shadcn uses the official `@modelcontextprotocol/sdk` Server + `zodToJsonSchema`.

**Decision.** Mandate the 7 existing tools as the parity minimum. Add an 8th tool `explain_gap` — compares a project's installed components against the registry and suggests missing ones. **Migrate the transport** from hand-rolled JSON-RPC to `@modelcontextprotocol/sdk` `Server` to inherit protocol evolution and reduce maintenance burden. Tool surface stays; transport changes.

**Consequences.**

- (+) Tool surface locked at parity (7) + one vean-only extension (`explain_gap`).
- (+) SDK transport inherits protocol upgrades (e.g., streaming, resources) for free.
- (−) Transport migration is a localized rewrite of `mcp/index.ts` — tool handlers stay, framing/dispatch is replaced.
- (−) `explain_gap` requires a "project installed components" scanner — small new utility.

**Alternatives considered.**

- Mirror shadcn's MCP surface exactly (no `explain_gap`) — rejected: `explain_gap` is a high-value vean-specific tool; the 7-tool lock already achieves parity.
- Keep 6 existing, no additions — rejected: undercounts; vean already has 7. `explain_gap` is worth the small added surface.
- Keep hand-rolled transport — rejected: fragile to protocol evolution; SDK is the standard.

---

## Decision index

| ADR     | Title                                    | Status   |
| ------- | ---------------------------------------- | -------- |
| ADR-001 | Parity scope: stack-relevant             | Accepted |
| ADR-002 | Registry taxonomy: adopt 6 missing types | Accepted |
| ADR-003 | vean/theme responsibility split          | Accepted |
| ADR-004 | `migrate` + AST: deferred                | Deferred |
| ADR-005 | `uno` field: structured                  | Accepted |
| ADR-006 | Resolver: BFS+regex + topo ordering      | Accepted |
| ADR-007 | Icons: out-of-scope (Iconify-component)  | Accepted |
| ADR-008 | Schema: valibot + JSON-Schema emission   | Accepted |
| ADR-009 | `registry:base`: typed Vean config       | Accepted |
| ADR-010 | Templates: Vite + Nuxt                   | Accepted |
| ADR-011 | MCP: lock 7 + `explain_gap` + SDK        | Accepted |
