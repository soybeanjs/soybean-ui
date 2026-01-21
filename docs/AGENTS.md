# AGENTS - Documentation Site

## OVERVIEW

The documentation site for SoybeanUI, providing comprehensive guides and component references.

- **Tech Stack**: Vue 3, Vite, UnoCSS, and `unplugin-vue-markdown`.
- **Architecture**: Markdown files are loaded dynamically into Vue pages.

## STRUCTURE

- `src/docs/`: Main markdown content organized by language.
- `src/pages/`: Dynamic routing for documentation pages.
- `src/components/`: Docs UI elements (Header, Sider, Playgrounds).
- `../playground/`: Source code for interactive component demos.

## WHERE TO LOOK

- **English Content**: `docs/src/docs/en/`
- **Chinese Content**: `docs/src/docs/zh-CN/`
- **Component Docs**: `docs/src/docs/[lang]/components/`
- **Demo Source**: `playground/examples/[component]/`

## CONVENTIONS

- **FrontMatter**: Required for all `.md` files (e.g., `title: ComponentName`).
- **Demos**: Must be in separate `.vue` files within the `playground` package.
- **Playground Blocks**: Use ` ```playground ` to include demos by filename.
- **Language Parity**: Keep `en` and `zh-CN` structures perfectly synchronized.
- **Components**: Document props, events, slots, and types for every UI component.
