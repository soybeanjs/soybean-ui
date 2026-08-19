# TreeSelect

## Overview

A select-style control for picking nodes from a hierarchical tree. `STreeSelect` composes the headless `TreeSelectRoot`/`TreeSelectTrigger`/`TreeSelectContent` (a `PopperRoot`-based floating trigger) with the existing `TreeRoot`/`TreeItem` tree primitives, and applies the `treeSelectVariants` recipe (6 sizes, 8 colors). Use it whenever a flat `select` cannot express hierarchy — e.g. choosing a category, an org unit, or a file path. Prefer `select` for flat option lists, `tree` when the hierarchy itself is the primary content, and `cascader` for multi-level path selection with a column layout.

## Usage

<UsageCode component="tree-select" />

## Features

- 🧩 Headless/styled split — `TreeSelectRoot` owns the value/open state and selected-label resolution; the tree reuses the existing `TreeRoot`/`TreeItem` primitives
- 🏗 `items` accepts a recursive `{ value, label, disabled, children }` structure
- ☑️ `multiple` switches to checkbox selection with `propagate-select` (parent selects descendants) and `bubble-select` (children update the parent) support
- 🔍 The trigger shows resolved labels of the selected values (comma-joined), or the `placeholder`
- 🧩 `#node` slot receives the flattened item + tree slot props for custom node rendering (icons, badges)
- ⌨️ Full tree keyboard navigation — arrows to traverse, Enter/Space to select, type-to-focus — from the headless `TreeRoot`
- 🧭 `v-model` for the value, `v-model:open` for the popup; `dir` resolved from `SConfigProvider`
- 🎨 `treeSelectVariants` — 6 sizes × 8 colors on the trigger; `scv()` slots cover trigger/value/placeholder/popup/panel/node

## Demos

<PlaygroundGallery component="tree-select" />

## API

<ComponentApi component="tree-select" />

## Notes

### Architecture and benchmark differences

SoybeanUI builds tree-select by composing the existing headless `TreeRoot`/`TreeItem` (selection, expansion, keyboard navigation, RTL) inside a `PopperRoot`-based trigger/content pair, so there is no duplicated tree logic. Compared with Ant Design `TreeSelect`, Element Plus `el-tree-select`, and Naive UI `n-tree-select`, SoybeanUI is the only benchmarked library with a headless/styled split, per-slot `ui` class overrides, and full reuse of the standalone tree component; search/filter and async lazy loading are not yet bundled — use the tree primitives directly when those are required.

| Capability             | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :--------------------- | :-------: | :--------: | :----------: | :------: |
| headless/styled split  |    ✅     |     —      |      —       |    —     |
| Single/multiple        |    ✅     |     ✅     |      ✅      |    ✅    |
| Checkable cascade      |    ✅     |     ✅     |      ✅      |    ✅    |
| Keyboard navigation    |    ✅     |     ✅     |      —       |    ✅    |
| Custom node rendering  |    ✅     |     ✅     |      ✅      |    ✅    |
| Search/filter          |     —     |     ✅     |      ✅      |    ✅    |
| Async lazy loading     |     —     |     ✅     |      ✅      |    ✅    |
| RTL support            |    ✅     |     —      |      —       |    —     |
| Per-slot `ui` override |    ✅     |     —      |      —       |    —     |

### Cautions

- The popup is teleported and uses the dismissable-layer stack; it closes on outside click and Escape.
- Parent nodes are selectable only when `allow-parent-select` is set; by default parents with children act as expanders.
- `multiple` value is an array; with `propagate-select`, checking a parent also selects all its descendants.

## FAQ

### How do I enable multi-selection?

Set `multiple`. The value becomes a `string[]`; combine with `propagate-select`/`bubble-select` for parent–child cascade.

### How do I customize the node rendering?

Use the `#node` slot. It receives the flattened `item` (`{ data, level, hasChildren, ... }`) plus the tree item's slot props (`isSelected`, `isExpanded`, ...).

### How do I show the hierarchy expanded by default?

Pass `default-expanded` with an array of node values to expand initially.

### How do I control the popup?

Bind `v-model:open` for a controlled popup, or leave it uncontrolled. The trigger also toggles on click and keyboard activation.
