# SoybeanUI Process Rules

Finish-stage checklist and git commit convention. The companion [SKILL.md](SKILL.md) owns pattern classification, phase order, and guardrails; [layers.md](layers.md) owns implementation layer rules; [surfaces.md](surfaces.md) owns delivery surface rules.

## Finish checklist

Apply only at the finish stage, after implementation is complete. If still classifying, finding references, splitting layers, or building the body, this checklist is for preview only — not the current execution order.

Check in reverse: validate first, then delivery surfaces, then exports, then layer boundaries. Do not proceed to the next group until the previous one passes.

### Validation

- `pnpm typecheck` has run.
- `pnpm lint` has run.
- `pnpm fmt` has run.
- Relevant `pnpm test` or targeted component test has run.
- Any unrun item has a clearly stated reason.

### Delivery surfaces

- Playground examples demonstrate major public capabilities.
- Chinese and English docs are structurally synced.
- `apps/docs/src/constants/menus.ts` is updated.
- If public API changed, `pnpm sui api` has run.
- Non-English API descriptions synced via `pnpm sui api-translate -- --locale <locale>`, or the untranslated reason is stated.
- If changelog mapping, version log display, or release page was touched, `pnpm sui changelog` has run.
- Non-English changelog copy synced via `pnpm sui changelog-translate -- --locale <locale>`, or the untranslated reason is stated.
- Component tests cover rendering, state, disabled, and accessibility core scenarios.

### Exports and generated files

- `packages/headless/src/index.ts` and `packages/ui/src/index.ts` are updated.
- `pnpm sui headless` has run (updates `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts`).
- `pnpm sui ui` has run (updates `packages/ui/src/constants/components.ts`).
- Component name data, namespaced data, and API generation outputs all come from scripts; no generated files were hand-edited.

### Headless

- `types.ts`, `context.ts`, SFCs, and `index.ts` follow the layer rules.
- New or migrated families pass [Headless admission](layers.md#headless-admission). Anatomy shells are not used as templates.
- Context values stay reactive.
- No visual token styles, no `@soybeanjs/ui` imports. Geometric layout-contract inline styles follow admission R8.
- Stable aggregation structure has been correctly sunk into `{Name}Compact`.
- Slot root elements carry the correct `data-soybean-{name}` attributes.

### UI

- The matching `packages/ui/src/styles/*.ts` first line is `// @unocss-include`.
- `slots` keys match headless `UiSlot`.
- Wrapper merges `props.ui` and `props.class` directly through the recipe.
- `useOmitProps` / `usePickProps` usage has a clear reason.
- No ARIA logic, no business semantics leaked into the UI layer.

### A11y and RTL

- ARIA, role, and keyboard interaction all live in headless.
- State reflects correctly to both `aria-*` and `data-state`.
- Directional components have `dir` propagation and RTL style flipping.

### Result reporting

- If a new composable, shared helper, or type was added instead of reusing repository utilities or `@vueuse/core`, the reason is explicitly stated.

Any unfinished item must be listed explicitly in the delivery notes.

## Git commit convention

Applies when writing commit messages, changelogs, or release summaries.

Use Conventional Commits. Format must be:

`<type>(<scope>): <subject>`

Example: `fix(dialog): prevent nested popup from closing on outside click`

### Core rules

- `type`, `scope`, and `subject` are all required.
- `type` and `scope` use lowercase kebab-case.
- `subject` is concise, specific, and outcome-oriented.
- `subject` does not end with a period.
- Prefer one commit per component or per clear domain.
- If a change spans headless, UI, docs, examples, and tests but centers on one component, keep a single component scope.

### Recommended types

- `feat`: user-visible new capability, new prop, new slot, new event
- `fix`: bug fix or behavior correction
- `perf`: performance optimization
- `refactor`: internal refactor with no intended behavior change
- `docs`: documentation changes
- `chore`: dependency, tooling, config, workflow, maintenance changes

### Scope rules

**1. Prefer exact component name**

If the change centers on a single component, use the component name as scope, even if docs, examples, and tests are also touched.

Examples:

- `feat(button): add loading slot`
- `fix(dialog): restore focus after nested close`
- `docs(table): document remote pagination`

**2. Use a domain scope only when a single-component scope would mislead**

Suitable for shared infrastructure or truly cross-domain changes:

- `ui`, `headless`, `composables`, `shared`, `types`, `theme`, `styles`, `docs`, `examples`, `playground`, `resolver`, `nuxt`, `deps`, `projects`, `workflow`, `build`, `test`, `config`

**3. Avoid vague scopes**

- Write `dialog`, not `components`.
- For a single component's docs, prefer `docs(button)` over `docs(docs)`.
- Do not degrade to `ui` or `headless` when a precise component applies.

### Subject rules

The subject answers "what did this scope actually change?"

Prefer:

- Imperative verbs
- Clear object or API surface
- Real result or effect

Recommended verbs: `add`, `fix`, `remove`, `rename`, `support`, `prevent`, `simplify`, `refactor`, `optimize`, `document`, `update`

Good subjects:

- `add loading slot and loading prop`
- `prevent outside click from closing nested popup`
- `document async validation example`
- `update deps`

Avoid:

- `update code`
- `fix issues`
- `improve component`
- `misc changes`

### Granularity

- Prefer one commit per component.
- Changes spanning headless and UI for the same component stay in one component-scope commit.
- If the same change also includes that component's docs or examples, still keep one component-scope commit.
- If two unrelated components changed, split into two commits.
- For repo-wide refactors that cannot be split, use shared scopes like `ui`, `headless`, `projects`.

### Decision check

- Is the format strictly `<type>(<scope>): <subject>`?
- Does `type` use a recommended type?
- Is `scope` precise to a single component?
- Should this work be split into multiple component-level commits?
- Does `subject` describe the change concretely, not vaguely?
- Will this commit still make sense when it appears alone in the changelog?
