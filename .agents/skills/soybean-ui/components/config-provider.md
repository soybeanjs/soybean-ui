# ConfigProvider

Source URL: https://ui.soybeanjs.cn/components/config-provider
Markdown URL: https://ui.soybeanjs.cn/components/config-provider.md
Category: General
Description: The `SConfigProvider` component is the root configuration provider for the SoybeanUI library. It manages global themes, localization, icon settings, and other context-aware features. It should wrap your entire application or specific sections that require isolated configuration.

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
      feedback: 'modern',
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

Structured API summary generated from build-time component metadata.
- Exported symbols (1): ConfigProvider.

### ConfigProvider

#### Props
Properties for the ConfigProvider component.
- `theme`: The theme options. (type `ThemeOptions`; optional)
- `size`: The size options. (type `ThemeSize`; optional)
- `iconify`: The iconify options. (type `IconifyOptions`; optional)
- `progress`: The global top progress configuration of your application. (type `Partial<ProgressProviderProps>`; optional)
- `toast`: The global toast configuration of your application. This will be inherited by the related components. (type `Partial<ToastProviderProps>`; optional)
- `customToast`: Whether to use custom toast rendering. If set to `true`, the `ToastProvider` will not render the default toast UI, and you can import `ToastProvider` component to render custom toast UI. (type `boolean`; default `false`; optional)
- `dir`: The global reading direction of your application. This will be inherited by all components. When omitted, the direction follows the current locale and falls back to `'ltr'`. (type `Direction`; optional)
- `locale`: The global locale of your application. This will be inherited by all components. (type `string`; default `'en'`; optional)
- `nonce`: The global `nonce` value of your application. This will be inherited by the related components. (type `string`; optional)
- `tooltip`: The global tooltip configuration of your application. This will be inherited by the related components. (type `Partial<TooltipProviderProps>`; optional)
- `nuxt`: Whether the application is running in Nuxt. (type `boolean`; optional)
- `iconRender`: A function to render the icon. This is useful when you want to use a custom icon library or want to wrap the icon with a custom component. (type `((icon: IconValue) => VNode)`; optional)
- `messages`: Overrides for built-in component locale messages. Merged on top of the locale selected by the `locale` prop, so you only need to supply the keys you want to change. (type `LocaleMessagesOverrides`; optional)
