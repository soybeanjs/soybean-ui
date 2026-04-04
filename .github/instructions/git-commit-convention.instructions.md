---
description: 'Use when writing git commit messages, preparing releases, or summarizing changes for changelogs. Enforces Conventional Commits with repo-specific type, scope, and subject rules so component changes can be traced in release notes and component docs. Keywords: git commit, commit message, conventional commits, changelog, release note, scope, subject.'
name: 'Git Commit Convention'
---

# Git Commit Convention

Use Conventional Commits with this required subject-line format:

`<type>(<scope>): <subject>`

Example:

`fix(dialog): prevent nested popup from closing on outside click`

## Core Rules

- `type`, `scope`, and `subject` are all required.
- Use lowercase kebab-case for `type` and `scope`.
- Keep the subject concise, specific, and outcome-oriented.
- Do not end the subject with a period.
- Prefer one component or one domain per commit.
- If a change affects one component across headless, UI, docs, examples, and tests, keep a single component scope for the whole commit.
- If unrelated components are changed, split them into separate commits whenever possible so release notes can trace each component independently.

## Preferred Types

Use these types by default so generated changelogs stay stable and easy to scan:

- `feat`: user-visible feature, new prop, new slot, new event, new component capability
- `fix`: bug fix or behavior correction
- `perf`: performance improvement
- `refactor`: internal restructuring without intended behavior change
- `docs`: documentation-only change
- `chore`: dependency, tooling, configuration, workflow, maintenance, or non-product housekeeping

Type guidance for this repo:

- Prefer `feat`, `fix`, `perf`, `refactor`, `docs`, `chore` over introducing many extra commit types.
- Use `docs(<component>)` when the change is only documentation for a specific component.
- Use `chore(deps)` for dependency updates.
- Use `chore(projects)` for repository-wide maintenance that does not belong to one component.

## Scope Rules

The scope should make it obvious which component, package area, or project area changed, so release notes can be grouped and the docs site can later query updates for a single component.

### 1. Prefer exact component scope

If the change is primarily about one component, use that exact component name as the scope, even when the commit also updates its docs, examples, tests, headless logic, and UI wrapper.

Examples:

- `feat(button): add loading slot`
- `fix(dialog): restore focus after nested close`
- `docs(table): document remote pagination`

Current component scopes in this repo include:

- `accordion`, `alert`, `alert-dialog`, `arrow`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `collapsible`, `command`, `config-provider`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `icon`, `input`, `input-number`, `kbd`, `label`, `layout`, `link`, `list`, `menu`, `navigation-menu`, `page-tabs`, `pagination`, `password`, `popconfirm`, `popover`, `radio-group`, `segment`, `select`, `separator`, `switch`, `table`, `tabs`, `tag`, `textarea`, `toast`, `tooltip`, `tree`, `tree-menu`, `virtualizer`

Headless-only or shared primitive scopes that already exist in this repo include:

- `listbox`, `popper`, `portal`, `primitive`, `roving-focus`, `slot`, `visually-hidden`

### 2. Use domain scope only when a single component scope would be misleading

Use a domain scope for shared infrastructure or genuinely cross-cutting changes that are not attributable to one component.

Preferred domain scopes:

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

### 3. Avoid vague scopes when a precise one exists

- Avoid `components` if the change is actually about one component such as `dialog` or `table`.
- Avoid `docs` if the docs change is specifically for one component; prefer `docs(button)` over `docs(docs)`.
- Avoid `ui` or `headless` if one component can still represent the main change.

## Subject Rules

The subject should answer: what changed for this scope?

Write the subject as:

- an imperative verb
- a concrete artifact or API surface
- the actual change or effect

Preferred verbs:

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

Good subjects:

- `add loading slot and loading prop`
- `prevent outside click from closing nested popup`
- `document async validation example`
- `update deps`

Avoid subjects like:

- `update code`
- `fix issues`
- `improve component`
- `misc changes`

## Commit Granularity

- Prefer one commit per component change.
- If a feature touches both headless and UI for the same component, keep one commit with the component scope.
- If a component change also needs docs or examples, keep them in the same component-scoped commit when they describe the same feature or fix.
- If two unrelated components changed, split the commits so release notes can attribute them independently.
- If a repo-wide refactor touches many components in the same way and splitting is not practical, use a shared domain scope such as `ui`, `headless`, `styles`, or `projects`.

## Recommended Patterns

- Component feature: `feat(select): add single clearable placeholder state`
- Component fix: `fix(table): preserve checked columns after data refresh`
- Component docs: `docs(dialog): document controlled open example`
- Shared logic refactor: `refactor(composables): simplify useUi type inference`
- Repository maintenance: `chore(projects): align release and lint workflow`
- Dependency update: `chore(deps): update vue and vite`

## Decision Checklist

- Is the commit format exactly `<type>(<scope>): <subject>`?
- Is the `type` one of the preferred repo types?
- Does the `scope` point to the exact component when one component is primarily affected?
- Should this work be split into multiple component-level commits?
- Does the `subject` describe the concrete change instead of using vague wording?
- Will this commit still be understandable when it appears alone in a changelog?
