# Changelog


## [v0.0.7](https://github.com/soybeanjs/soybean-ui/compare/v0.0.6...v0.0.7) (2025-12-09)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **avatar**: add image source and delay properties to AvatarProps for enhanced image handling &nbsp;-&nbsp; by @soybeanjs [<samp>(f55e1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f55e1e9d)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - show playground examples in docs and update related docs &nbsp;-&nbsp; by @soybeanjs [<samp>(d439a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d439a14b)
  - introduce theme customizer component and update theme context for dynamic styling &nbsp;-&nbsp; by @soybeanjs [<samp>(f0ce2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f0ce2c3c)
- **playground**:
  - add About route and create about.vue component &nbsp;-&nbsp; by @soybeanjs [<samp>(33948)</samp>](https://github.com/soybeanjs/soybean-ui/commit/33948361)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **alert-dialog**: add 'as-child' prop to AlertDialogTrigger for improved slot handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d18ac)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d18ac6d1)
- **layout**: add z-index to mobile drawer for improved visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(43a1c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43a1c135)
- **pagination**: update border styles for selected button states in pagination variants &nbsp;-&nbsp; by @soybeanjs [<samp>(e817f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e817ff24)
- **selection**: update boolean handling for multiple selection logic &nbsp;-&nbsp; by @soybeanjs [<samp>(2dda1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2dda10d5)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **docs**:
  - correct not-found page and simplify 404 layout &nbsp;-&nbsp; by @soybeanjs [<samp>(e84da)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e84da949)
- **playground**:
  - optimize playground examples &nbsp;-&nbsp; by @soybeanjs [<samp>(ea6d4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ea6d44d9)
  - optimize style and introduce themeSizeRatioMap for consistent size ratios and update related components &nbsp;-&nbsp; by @soybeanjs [<samp>(d8ed8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d8ed82f5)
- **projects**:
  - replace `ui` with `@soybeanjs/ui` in playground &nbsp;-&nbsp; by @soybeanjs [<samp>(3a7b1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3a7b1285)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(6d10b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6d10b1a6)
- **docs**: unocss config: add shortcuts for playground title styling &nbsp;-&nbsp; by @soybeanjs [<samp>(ccb14)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ccb140a2)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **breadcrumb**: adjust padding in list variant for improved layout &nbsp;-&nbsp; by @soybeanjs [<samp>(88be2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/88be2285)
- **playground**: update style for improved mobile layout &nbsp;-&nbsp; by @soybeanjs [<samp>(ab6c8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ab6c884c)
- **variants**: update description and title styles across multiple components to include margin reset &nbsp;-&nbsp; by @soybeanjs [<samp>(a9344)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9344e0d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.6](https://github.com/soybeanjs/soybean-ui/compare/v0.0.5...v0.0.6) (2025-12-09)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - enhance header navigation and search functionality with new components &nbsp;-&nbsp; by @soybeanjs [<samp>(ec936)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec936708)
  - update Vite server configuration and enhance background decoration with fade-in animation &nbsp;-&nbsp; by @soybeanjs [<samp>(e35bb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e35bbc7c)
  - add introduction and quick start documentation, implement sider menu component, and update app header styles &nbsp;-&nbsp; by @soybeanjs [<samp>(fb2e0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb2e0e55)
- **header**:
  - replace mobile drawer with popover and adjust layout for improved responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(efb08)</samp>](https://github.com/soybeanjs/soybean-ui/commit/efb08c24)
- **link**:
  - enhance slot functionality in link components to pass isHref prop for better context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d5c7a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d5c7a202)
- **packages**:
  - modify the width of the page center within the document. &nbsp;-&nbsp; by **Azir-11** [<samp>(a9fa3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9fa32b8)
- **projects**:
  - implement navbar for the header section. &nbsp;-&nbsp; by **Azir-11** [<samp>(293bd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/293bdce0)
- **styles**:
  - add custom scrollbar styles for light and dark themes &nbsp;-&nbsp; by @soybeanjs [<samp>(b46c6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b46c6df8)
- **tree-menu**:
  - enhance dropdown selection handling and update type definitions for better integration &nbsp;-&nbsp; by @soybeanjs [<samp>(350ed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/350edcb4)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **command**: remove searchTerm condition from empty state display logic &nbsp;-&nbsp; by @soybeanjs [<samp>(199bc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/199bc04e)
- **layout**: adjust header and layout styles for improved consistency and overflow handling &nbsp;-&nbsp; by @soybeanjs [<samp>(6996b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6996b132)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **styles**: optimize the responsive design of the homepage logo. &nbsp;-&nbsp; by **Azir-11** [<samp>(12b6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/12b6d365)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **docs**: remove motion-v dependency and enhance background decoration with particle effects &nbsp;-&nbsp; by @soybeanjs [<samp>(71796)</samp>](https://github.com/soybeanjs/soybean-ui/commit/71796ebd)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **README**: add logo to README files for better branding &nbsp;-&nbsp; by @soybeanjs [<samp>(943d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/943d7c55)
- **components**: fix input with icon &nbsp;-&nbsp; by @paynezhuang [<samp>(1f2aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1f2aaaee)
- **projects**: add docs home page &nbsp;-&nbsp; by @soybeanjs [<samp>(8d380)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d380557)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(4511f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4511f0d1)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(c1182)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c1182272)
- **package.json**:
  - add 'unstub' script for resetting stubs &nbsp;-&nbsp; by @soybeanjs [<samp>(2bbd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2bbd4779)
- **projects**:
  - remove npm registry url && update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(24126)</samp>](https://github.com/soybeanjs/soybean-ui/commit/24126c5c)
- **tsconfig**:
  - update TypeScript configuration with new compiler options and exclude settings &nbsp;-&nbsp; by @soybeanjs [<samp>(e4fcc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e4fcc2fb)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **docs**: update border color for improved UI consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(5fbc9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5fbc939f)
- **projects**: format code &nbsp;-&nbsp; by @soybeanjs [<samp>(82c4f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/82c4f390)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![paynezhuang](https://github.com/paynezhuang.png?size=48)](https://github.com/paynezhuang)&nbsp;&nbsp;
[Azir-11](mailto:2075125282@qq.com)

## [v0.0.6-beta.2](https://github.com/soybeanjs/soybean-ui/compare/v0.0.6-beta.1...v0.0.6-beta.2) (2025-12-07)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **header**: replace mobile drawer with popover and adjust layout for improved responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(efb08)</samp>](https://github.com/soybeanjs/soybean-ui/commit/efb08c24)
- **packages**: modify the width of the page center within the document. &nbsp;-&nbsp; by **Azir-11** [<samp>(a9fa3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9fa32b8)
- **tree-menu**: enhance dropdown selection handling and update type definitions for better integration &nbsp;-&nbsp; by @soybeanjs [<samp>(350ed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/350edcb4)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **components**: fix input with icon &nbsp;-&nbsp; by @paynezhuang [<samp>(1f2aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1f2aaaee)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(4511f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4511f0d1)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(c1182)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c1182272)
- **package.json**:
  - add 'unstub' script for resetting stubs &nbsp;-&nbsp; by @soybeanjs [<samp>(2bbd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2bbd4779)
- **tsconfig**:
  - update TypeScript configuration with new compiler options and exclude settings &nbsp;-&nbsp; by @soybeanjs [<samp>(e4fcc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e4fcc2fb)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **projects**: format code &nbsp;-&nbsp; by @soybeanjs [<samp>(82c4f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/82c4f390)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![paynezhuang](https://github.com/paynezhuang.png?size=48)](https://github.com/paynezhuang)&nbsp;&nbsp;
[Azir-11](mailto:2075125282@qq.com)

## [v0.0.6-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.0.5...v0.0.6-beta.1) (2025-11-23)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - enhance header navigation and search functionality with new components &nbsp;-&nbsp; by @soybeanjs [<samp>(ec936)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec936708)
  - update Vite server configuration and enhance background decoration with fade-in animation &nbsp;-&nbsp; by @soybeanjs [<samp>(e35bb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e35bbc7c)
  - add introduction and quick start documentation, implement sider menu component, and update app header styles &nbsp;-&nbsp; by @soybeanjs [<samp>(fb2e0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb2e0e55)
- **link**:
  - enhance slot functionality in link components to pass isHref prop for better context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d5c7a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d5c7a202)
- **projects**:
  - implement navbar for the header section. &nbsp;-&nbsp; by **Azir-11** [<samp>(293bd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/293bdce0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **command**: remove searchTerm condition from empty state display logic &nbsp;-&nbsp; by @soybeanjs [<samp>(199bc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/199bc04e)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **styles**: optimize the responsive design of the homepage logo. &nbsp;-&nbsp; by **Azir-11** [<samp>(12b6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/12b6d365)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **docs**: remove motion-v dependency and enhance background decoration with particle effects &nbsp;-&nbsp; by @soybeanjs [<samp>(71796)</samp>](https://github.com/soybeanjs/soybean-ui/commit/71796ebd)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **README**: add logo to README files for better branding &nbsp;-&nbsp; by @soybeanjs [<samp>(943d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/943d7c55)
- **projects**: add docs home page &nbsp;-&nbsp; by @soybeanjs [<samp>(8d380)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d380557)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**: remove npm registry url && update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(24126)</samp>](https://github.com/soybeanjs/soybean-ui/commit/24126c5c)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **docs**: update border color for improved UI consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(5fbc9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5fbc939f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[Azir-11](mailto:2075125282@qq.com)

## [v0.0.5](https://github.com/soybeanjs/soybean-ui/compare/v0.0.4...v0.0.5) (2025-11-19)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **valibot**: dynamically import safeParseAsync for improved performance &nbsp;-&nbsp; by @soybeanjs [<samp>(4ccc6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4ccc64d3)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(53001)</samp>](https://github.com/soybeanjs/soybean-ui/commit/530018c5)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.5-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.0.4...v0.0.5-beta.1) (2025-11-19)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **valibot**: dynamically import safeParseAsync for improved performance &nbsp;-&nbsp; by @soybeanjs [<samp>(4ccc6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4ccc64d3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.4](https://github.com/soybeanjs/soybean-ui/compare/v0.0.3...v0.0.4) (2025-11-19)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **CHANGELOG**: update to reflect SoybeanUI v0.0.2 release, summarizing new features, enhancements, and bug fixes &nbsp;-&nbsp; by **Soybean** [<samp>(a592a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a592a27f)
- **llm**: update developer guide &nbsp;-&nbsp; by **Soybean** [<samp>(c9a55)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c9a559c3)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **package**: update exports and publishConfig for better module resolution &nbsp;-&nbsp; by **Soybean** [<samp>(5fcc5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5fcc557b)

### &nbsp;&nbsp;&nbsp;❤️ Contributors


[Soybean](mailto:soybeanjs@outlook.com)

## [v0.0.3](https://github.com/soybeanjs/soybean-ui/compare/v0.0.2...v0.0.3) (2025-11-19)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **focus-scope**: simplify focus management by removing unnecessary event dispatching and timeout logic &nbsp;-&nbsp; by @soybeanjs [<samp>(630c3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/630c3ff1)
- **tree-menu**: improve item action positioning and tooltip logic for better usability &nbsp;-&nbsp; by @soybeanjs [<samp>(8fd11)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8fd11d1b)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **README**:
  - enhance documentation for SoybeanUI and SoybeanHeadless &nbsp;-&nbsp; by @soybeanjs [<samp>(b109f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b109f541)
  - update descriptions and add credits section for SoybeanUI and SoybeanHeadless &nbsp;-&nbsp; by @soybeanjs [<samp>(641b4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/641b40e4)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **docs**: remove outdated markdown guides and migration documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(b41a9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b41a90b7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.3-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.0.2...v0.0.3-beta.1) (2025-11-19)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **focus-scope**: simplify focus management by removing unnecessary event dispatching and timeout logic &nbsp;-&nbsp; by @soybeanjs [<samp>(630c3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/630c3ff1)
- **tree-menu**: improve item action positioning and tooltip logic for better usability &nbsp;-&nbsp; by @soybeanjs [<samp>(8fd11)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8fd11d1b)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.2](https://github.com/soybeanjs/soybean-ui/compare/v0.0.1...v0.0.2) (2025-11-18)

SoybeanUI v0.0.2 is a significant milestone release, marking the initial formation of the component library system. This release introduces a large number of high-quality UI components and establishes a modern technical architecture based on Headless principles.

## 🌟 Core Features

### 🏗️ Headless + UI Layered Architecture

Adopts an advanced **Headless (Logic Layer)** + **UI (Presentation Layer)** separation architecture:

- **@soybeanjs/headless**: Focuses on component state, interaction logic, and accessibility (A11y), containing no styles, providing a solid foundation for building custom design systems.
- **@soybeanjs/ui**: Built on the Headless layer, combined with **UnoCSS** and `tailwind-variants`, providing a set of beautiful, modern, and easily customizable default styles.

### 🛠️ Modern Tech Stack

- **Vue 3**: Deeply leverages the Composition API, offering flexible component reusability.
- **TypeScript**: Written entirely in TypeScript, providing excellent type safety and development experience.
- **UnoCSS / Tailwind**: Utilizes an atomic CSS engine for high-performance style generation.

## 📦 New Components Overview

This version releases over 40+ basic components, covering the vast majority of Web development scenarios:

- **Basic Components**: `Button`, `Icon`, `Layout`, `Link`
- **Form Components**: `Form`, `Input`, `Checkbox`, `RadioGroup`, `Select`, `Switch`, `Textarea`, `NumberInput`
- **Navigation Components**: `Menu`, `DropdownMenu`, `Breadcrumb`, `Pagination`, `Tabs`, `NavigationMenu`
- **Feedback Components**: `Dialog`, `Drawer`, `Alert`, `Toast`, `Popover`, `Tooltip`, `AlertDialog`
- **Data Display**: `Card`, `Avatar`, `Badge`, `Accordion`, `Collapsible`, `List`
- **Others**: `ConfigProvider`, `VisuallyHidden`

## 🎨 Design Philosophy

- **Accessibility First**: Follows WAI-ARIA standards, ensuring good support for keyboard navigation and screen readers.
- **Highly Customizable**: Developers can easily override and extend component styles via the `ui` prop and `tailwind-variants`.

---

Welcome to experience SoybeanUI v0.0.2. We are dedicated to providing you with the ultimate Vue 3 component development experience!
