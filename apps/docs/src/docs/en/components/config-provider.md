# ConfigProvider

## Overview

The `SConfigProvider` component is the root configuration provider for the SoybeanUI library. It manages global themes, localization, icon settings, and other context-aware features. It should wrap your entire application or specific sections that require isolated configuration.

## Features

- 🎨 **Theme System**: Configure global colors and radius via `theme` prop.
- 📏 **Size Control**: Manage global component sizing (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- 🖼️ **Icon Configuration**: Set default width and height for all `SIcon` components.
- ⏳ **Loading Bar Integration**: Configure the global top loading bar.
- 🍞 **Toast Integration**: Configure global toast settings.
- 🌐 **Direction**: Support for LTR/RTL layouts.
- 🌍 **Locale**: Drive built-in component messages via `locale` and `messages` props.

## Basic Usage

Wrap your application root with `SConfigProvider`.

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    size="md"
    :theme="{
      base: 'gray',
      primary: 'violet',
      radius: '0.625rem'
    }"
    :iconify="{ width: '1.25em', height: '1.25em' }"
    dir="ltr"
  >
    <App />
  </SConfigProvider>
</template>
```

## Advanced Theme Configuration

You can fully customize the theme using the `theme` prop. more details can be found in the [theming documentation](/overview/theming).

## Direction / RTL

Use the `dir` prop to switch the supported components between left-to-right and right-to-left layouts.

```vue
<template>
  <SConfigProvider dir="rtl">
    <App />
  </SConfigProvider>
</template>
```

Set `dir="ltr"` explicitly if you want to force left-to-right behavior inside a subtree.

## Locale / Internationalization

SoybeanUI ships with built-in component message sets for the following locales. These messages drive component-level text such as aria-labels and empty-state copy.

| Code    | Language            |
| ------- | ------------------- |
| `zh-CN` | Simplified Chinese  |
| `zh-TW` | Traditional Chinese |
| `en`    | English             |
| `ar`    | Arabic              |
| `ja`    | Japanese            |
| `ko`    | Korean              |
| `de`    | German              |
| `fr`    | French              |
| `es`    | Spanish             |
| `pt-BR` | Portuguese (Brazil) |
| `ru`    | Russian             |
| `tr`    | Turkish             |
| `id`    | Indonesian          |

Only `en` and `zh-CN` are pre-registered by default. Other supported locale files can be imported from `@soybeanjs/headless/locale/{code}` and registered manually.

When `dir` is omitted, `ConfigProvider` automatically follows the direction implied by `locale`. For example, `locale="ar"` resolves to `dir="rtl"`, while `locale="en"` resolves to `dir="ltr"`. Pass `dir` explicitly if you need to override that mapping.

### Switching to a pre-registered locale

Pass the locale code directly to `SConfigProvider`:

```vue
<SConfigProvider locale="zh-CN">
  <!-- Built-in component copy now displays in Simplified Chinese -->
</SConfigProvider>
```

### Loading another supported locale

`registerLocale` accepts two forms:

- `registerLocale(localeRegistry)` for built-in locale files or any custom registry object when you need explicit `name` and `dir` metadata.
- `registerLocale(key, messages)` for a lightweight custom locale keyed only by its message table.

Import the locale file as a default export, register it once during app setup, and then pass the same locale code to `SConfigProvider`:

```ts
import { registerLocale } from '@soybeanjs/headless/locale';
import ar from '@soybeanjs/headless/locale/ar';

registerLocale(ar);
```

```vue
<SConfigProvider locale="ar">
  <!-- Component copy now displays in Arabic and dir defaults to rtl -->
</SConfigProvider>
```

Supported locale files are also available at `@soybeanjs/headless/locale/{code}` if you want to extend one as the base for your own custom locale.

### Overriding individual messages

Use the `messages` prop to replace only the keys you need. Keys not listed fall back to the selected built-in locale.

```vue
<script setup lang="ts">
import type { LocaleMessagesOverrides } from '@soybeanjs/headless';

const messages: LocaleMessagesOverrides = {
  table: {
    emptyTitle: 'Nothing here yet',
    emptyDescription: 'Add your first item to get started.'
  }
};
</script>

<template>
  <SConfigProvider locale="en" :messages="messages">
    <!-- Table empty state now shows custom copy -->
  </SConfigProvider>
</template>
```

### Using a custom locale from scratch

Import `en` as a base registry, override any keys from `en.messages`, then register under a custom locale key with the shorthand form:

```ts
import { registerLocale, en } from '@soybeanjs/headless/locale';
import type { LocaleMessages } from '@soybeanjs/headless/locale';

const myLocale: LocaleMessages = {
  ...en.messages,
  pagination: {
    ...en.messages.pagination,
    nextPage: 'Next →',
    prevPage: '← Prev'
  }
};

registerLocale('custom', myLocale);
```

Then pass `locale="custom"` to `SConfigProvider`. If you also need a custom display name or explicit `dir`, pass a full `LocaleRegistry` object to `registerLocale(...)` instead.

### Locale key reference

#### `pagination`

| Key         | Default (en)    | Description                                                   |
| ----------- | --------------- | ------------------------------------------------------------- |
| `firstPage` | `First page`    | Aria-label and default slot text for the first-page button    |
| `prevPage`  | `Previous page` | Aria-label and default slot text for the previous-page button |
| `nextPage`  | `Next page`     | Aria-label and default slot text for the next-page button     |
| `lastPage`  | `Last page`     | Aria-label and default slot text for the last-page button     |

#### `table`

| Key                | Default (en)                             | Placeholders | Description                                     |
| ------------------ | ---------------------------------------- | ------------ | ----------------------------------------------- |
| `emptyTitle`       | `No data`                                | —            | Title in the default empty slot                 |
| `emptyDescription` | `There is no data to display.`           | —            | Description in the default empty slot           |
| `selectAllRows`    | `Select all rows`                        | —            | Aria-label for the header "select all" checkbox |
| `sortByColumn`     | `Sort by {column}`                       | `{column}`   | Sort button label with no active sort           |
| `sortByColumnAsc`  | `Sort by {column}, currently ascending`  | `{column}`   | Sort button label when ascending                |
| `sortByColumnDesc` | `Sort by {column}, currently descending` | `{column}`   | Sort button label when descending               |
| `resizeColumn`     | `Resize {column} column`                 | `{column}`   | Aria-label for the column resize handle         |
| `expandRow`        | `Expand row {row}`                       | `{row}`      | Aria-label for expanding a row                  |
| `collapseRow`      | `Collapse row {row}`                     | `{row}`      | Aria-label for collapsing a row                 |
| `selectRow`        | `Select row {row}`                       | `{row}`      | Aria-label for the row selection checkbox       |

### Fallback rules

1. A key from user-supplied `messages` is used first.
2. If absent, the built-in messages for `locale` are used.
3. If `locale` is unknown or unset, `en` is the final fallback.

### First-batch supported components

The following components respect `ConfigProvider.locale` and `ConfigProvider.messages` in this release:

- **Pagination** — navigation button labels
- **Table** — empty state, sort/resize/expand/select aria-labels

Additional components will be added in future releases following the same pattern.

## API

<ComponentApi component="config-provider" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits `ConfigProvider` into a headless layer (`@soybeanjs/headless/config-provider`) that owns locale, direction, tooltip, and message context, and a styled layer (`@soybeanjs/ui`) that owns theme CSS injection, icon rendering, and provider composition (toast / dialog / progress). This mirrors `shadcn/ui`'s headless/styled separation and differs from single-package providers such as Ant Design, Element Plus, MUI, Mantine, and Naive UI.

| Aspect               | SoybeanUI                                                                                   | Ant Design / Element Plus / MUI / Mantine / Naive UI  |
| :------------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------- |
| Architecture         | headless + styled split, dual `provide/inject` contexts                                     | single package, single ConfigProvider                 |
| Theme injection      | `createTheme()` from `@soybeanjs/theme` inlined into a `<style id="__SoybeanUI_theme">` tag | CSS variables / theme object / `ConfigProvider.theme` |
| Dark mode            | `theme.darkSelector` (`'class'` → `.dark`, `'media'` → OS, custom); toggle `.dark` class    | `theme.dark`, `dark-mode` class, `colorScheme`        |
| RTL                  | `dir` prop + `useDirection`; auto-derived from `locale` with RTL prefix fallback            | `direction` prop, `dir` attribute, theme direction    |
| i18n                 | `locale` + `messages` overrides; `registerLocale` for additional locales                    | `locale` prop / `LocalizationProvider`                |
| Provider composition | renders `ToastProvider`, `DialogProvider`, `ProgressProvider` inside the default slot       | separate providers mounted by the user                |

### Runtime cautions

- **SSR**: theme CSS is computed at render time via `createTheme()` from `@soybeanjs/theme` and inlined into the SSR HTML as a `<style id="__SoybeanUI_theme">` tag (no client-only style injection), so the first paint already carries the correct theme. `SIcon` receives `ssr: import.meta.env.SSR` so icon rendering is SSR-safe.
- **Style tag lifecycle**: the `<style id="__SoybeanUI_theme">` and `<style id="__SoybeanHeadless_Styles">` tags persist in `<head>` for the lifetime of the page. They are reactive — changing the `theme` prop updates the CSS content in place. Unmounting the provider does not remove them (they are global by design).
- **Locale registration**: only `en` and `zh-CN` are pre-registered. For any other locale (e.g. `ar`, `ja`, `fr`), import the locale file from `@soybeanjs/headless/locale/{code}` and call `registerLocale(...)` once during app setup. Direction (`dir`) falls back to a built-in RTL prefix map (`ar`, `he`, `fa`, `ur`, …) even before a locale is registered, so `locale="ar"` resolves to `dir="rtl"` out of the box.
- **Nesting**: `SConfigProvider` can be nested. An inner provider overrides the outer context for its subtree. The headless and UI contexts are independent injection keys, so headless-only consumers (e.g. `useDirection`) read the headless context while UI consumers (e.g. `SIcon` iconify defaults) read the UI context.

### SSR theme consistency (no flash on refresh)

When the theme is persisted in `localStorage`, a client-only style injection would apply the saved theme only after hydration, flashing the default theme on refresh. `@soybeanjs/theme` ships SSR-safe helpers (under the `@soybeanjs/theme/ssr` subpath) that make the server render the exact saved theme:

- **`createThemeInitScript()`** — returns a small IIFE to inline in `<head>`. Before first paint it reads the stored config from `localStorage`, sets `data-theme="<base>-<primary>"` and the dark-mode class on `<html>`, and mirrors the config into a cookie (`soybean-ui-theme` by default) so the next SSR request can resolve it.
- **`getThemeConfigFromCookie(cookieHeader)`** — parses that cookie into a `ThemeConfigState` on the server (works with `useRequestHeaders(['cookie']).cookie` in Nuxt).
- **`setThemeCookie(config)` / `getStoredThemeConfig()` / `setStoredThemeConfig()` / `removeStoredThemeConfig()`** — explicit persistence helpers (under the `@soybeanjs/theme/storage` subpath) for client and server.

In Nuxt the wiring is minimal — pass the environment params to `SConfigProvider` and let it resolve the persisted config itself:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      // apply the saved theme before first paint and sync it into a cookie
      script: [{ innerHTML: createThemeInitScript(), tagPosition: 'head' }]
    }
  }
});
```

```vue
// app.vue — pass only the environment params (isServer + cookieHeader)
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';

const isServer = import.meta.server;
const cookieHeader = isServer ? useRequestHeaders(['cookie']).cookie : undefined;
</script>

<template>
  <SConfigProvider :is-server="isServer" :cookie-header="cookieHeader" persist-theme>
    <slot />
  </SConfigProvider>
</template>
```

`SConfigProvider` resolves the persisted config from the cookie on the server, and from `localStorage` on the client, so the app no longer needs a `useThemeStore` or a manual `createThemeStore`. Theme state (base / primary / radius / size / mode) and custom presets are managed inside the provider and exposed to descendants via `useTheme()` from `@soybeanjs/ui` — no prop drilling, no app-level store.

Because `SConfigProvider` inlines the theme CSS into the SSR HTML and resolves the persisted config from `cookieHeader` on the server, the first paint already carries the saved theme — no flash, no inconsistency.

### FAQ

**Where should I place `SConfigProvider`?**
Wrap your application root once, typically in `App.vue` or the root layout. It must be an ancestor of every component that relies on theme, locale, direction, toast, dialog, or progress context.

**How do `dir` and `locale` interact?**
`dir` takes precedence when provided explicitly. When omitted, `ConfigProvider` derives direction from `locale`: registered locales use their declared `dir`; unregistered locales fall back to a built-in RTL prefix map (e.g. `ar` → `rtl`, `en` → `ltr`). If `locale` is also unknown, the final fallback is `ltr`.

**How do I add a locale that is not pre-registered?**
Import the locale file and register it once: `registerLocale(ar)` (full registry form) or `registerLocale('custom', messages)` (shorthand form). Then pass `locale="ar"` (or your custom key) to `SConfigProvider`. See the "Loading another supported locale" section above.

**How does dark mode work?**
`createTheme` always generates both light and dark CSS variable sets. The `theme.darkSelector` option controls how the dark set is scoped: `'class'` (default) emits the dark variables under a `.dark` selector, `'media'` emits them under `@media (prefers-color-scheme: dark)`, and any custom string is used verbatim as the selector. With the default `'class'` selector, toggle a `.dark` class on `<html>` (or any ancestor) to switch to dark mode; with `'media'`, the theme follows the user's OS preference automatically.

**Can I nest `SConfigProvider` instances?**
Yes. Nesting is supported — the inner provider's context overrides the outer for its subtree. This is useful for embedding an RTL section inside an LTR app, or a differently-themed micro-frontend.

**How do I render my own toast UI?**
Pass `customToast` to opt out of the default `ToastProvider`: `<SConfigProvider customToast>`. Then import `SToastProvider` (or the headless `ToastProvider`) yourself and render custom toast content. The `toast()` imperative API still works because the headless toast state is independent of the rendered UI.
