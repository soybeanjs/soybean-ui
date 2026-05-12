# Headless vs Styled

Use this reference when the user is deciding between `@soybeanjs/ui` and `@soybeanjs/headless`, or when they want to mix both.

## Choose `@soybeanjs/ui` when

- you want ready-to-use `S*` components such as `SButton`, `SDialog`, and `SInput`
- you want SoybeanUI's default visual system, UnoCSS styling, and built-in variants
- you want `SConfigProvider` for theme, locale, RTL, and global UI configuration without writing wrapper components first

## Choose `@soybeanjs/headless` when

- you want SoybeanUI's accessibility, state, and keyboard behavior without bundled styles
- you are building your own design system or styling primitives with Tailwind, UnoCSS, CSS modules, or another styling approach
- you want direct access to primitive parts such as `AccordionRoot`, `AccordionItem`, and `AccordionTrigger`

## Architecture boundary

- `@soybeanjs/ui`: styled wrappers, `S*` exports, variants, and class injection
- `@soybeanjs/headless`: logic, state, accessibility, keyboard interactions, and Compact aggregations

The two layers are designed to fit together, but the styled package is optional for consumers.

## Component patterns

- Multi-slot base components: primitives such as `DialogRoot`, `DialogTrigger`, `DialogContent`, or `AccordionRoot` and `AccordionContent`
- Compact components: data-driven aggregations such as `AccordionCompact` and `TableCompact`
- Single-class styled components: simpler styled exports such as `SButton`, `SBadge`, and `SLink`

## Mixing both packages

You can use both packages in one app:

- use `@soybeanjs/ui` for common screens that can keep the default style system
- use `@soybeanjs/headless` for parts that need a custom visual language or deeper structural control

## Where to go next

- Load [theming.md](theming.md) for `SConfigProvider`, tokens, and global UI configuration.
- Load [components.md](components.md) to browse the available component families.
