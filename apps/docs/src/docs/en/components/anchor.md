# Anchor

## Overview

Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling.

When the active item changes while scrolling, the hash in the address bar is also synchronized. Scroll-driven updates always use `history.replaceState` to avoid creating excessive history entries.

If the current URL already contains a hash on initial render, Anchor will scroll to the matching section after mount. When a custom scroll container becomes available later, Anchor will re-sync once that container is ready.

> `SAnchor` now delegates recursive item rendering to headless `AnchorCompact`. The same six `ui` slots are available from both `SAnchor` and `@soybeanjs/headless/anchor`.

## Usage

<UsageCode component="anchor" />

## Demos

<PlaygroundGallery component="anchor" />

## API

<ComponentApi component="anchor" />
