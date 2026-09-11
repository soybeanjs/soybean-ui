---
head:
  title: Playground
  description: 'Run the component examples in the browser and switch between the UI and Chart libraries.'
---

# Playground

> Every shipped example, rendered live in the browser.

The playground lists the example SFCs bundled with the docs site and runs the selected one for real — no static snapshots.

## How it works

- **Library** — the select in the card header switches between `Headless`, `UI`, `Admin` and `Chart`. Examples currently exist for `UI` and `Chart`; the remaining libraries show an empty state until their examples land.
- **Tabs** — one tab per example folder (`apps/docs/src/examples/<library>/<component>/index.vue`).
- **Deep links** — the active tab is mirrored to the `?tab=` query parameter, so a specific example can be shared by URL.

## Where examples come from

Examples are plain SFCs under `apps/docs/src/examples/`. The same files back the `## Demos` section of every component page, so a change in the playground is a change in the documentation.
