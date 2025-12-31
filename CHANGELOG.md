# Changelog


## [v0.0.8](https://github.com/soybeanjs/soybean-ui/compare/v0.0.7...v0.0.8) (2026-01-01)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **logo**:
  - replace favicon with new logo SVG and update references in documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(61e0a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/61e0a8e1)
- **navigation-menu**:
  - add support for horizontal and vertical orientations, update examples and documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(30ba7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/30ba7787)
- **packages**:
  - support docs to use tsx. &nbsp;-&nbsp; by **Azir-11** [<samp>(7cac3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7cac311c)
  - optimize the overall style of the document table section. &nbsp;-&nbsp; by **Azir-11** [<samp>(3dda1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3dda1f33)
- **popup**:
  - add usePopupEvents composable for managing popup interactions and focus behavior &nbsp;-&nbsp; by @soybeanjs [<samp>(af4ec)</samp>](https://github.com/soybeanjs/soybean-ui/commit/af4ecfe3)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dropdown-menu**:
  - add popupProps to dropdown menu components for enhanced functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(ab340)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ab340b41)
- **event**:
  - add null check for event target in handleAndDispatchCustomEvent function &nbsp;-&nbsp; by @soybeanjs [<samp>(3401f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3401f038)
- **layout**:
  - replace drawerContentVariants with drawerPopupVariants for improved layout handling &nbsp;-&nbsp; by @soybeanjs [<samp>(6ba89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6ba89a89)
- **layout-mobile**:
  - replace DialogContent with DialogPopup &nbsp;-&nbsp; by @soybeanjs [<samp>(c7699)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c7699573)
- **logo**:
  - update logo references in README and documentation files &nbsp;-&nbsp; by @soybeanjs [<samp>(296bc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/296bc67a)
  - update color stops in logo SVG and app-logo component for improved visual consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(67fc6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/67fc6a16)
- **playground**:
  - update links in breadcrumb and tree menu examples to point to the new SoybeanUI URL and rename route demo to route about &nbsp;-&nbsp; by @soybeanjs [<samp>(e1c39)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e1c399e9)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **components**:
  - update type definitions to use Partial<Record> for improved flexibility and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(7bb4a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7bb4a520)
- **context-menu**:
  - introduce popupProps to context menu components for enhanced functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(e7289)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e7289cc1)
- **docs**:
  - optimize docs &nbsp;-&nbsp; by @soybeanjs [<samp>(2ca7f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2ca7f6fd)
- **header-nav**:
  - simplify navigation menu component by directly passing orientation prop &nbsp;-&nbsp; by @soybeanjs [<samp>(56c08)</samp>](https://github.com/soybeanjs/soybean-ui/commit/56c089db)
- **logo**:
  - adjust path data in logo SVG and app-logo component for consistency in rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(e2c4f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e2c4f176)
  - streamline path data in logo SVG and app-logo component for improved rendering consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(dae92)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dae928b3)
- **menu**:
  - enhance type definitions &nbsp;-&nbsp; by @soybeanjs [<samp>(e2fb8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e2fb89cb)
- **playground**:
  - optimize playground examples &nbsp;-&nbsp; by @soybeanjs [<samp>(37d96)</samp>](https://github.com/soybeanjs/soybean-ui/commit/37d96a36)
- **popover**:
  - remove PopoverPositioner context and update related components for improved clarity and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(de4b4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/de4b4528)
- **popper**:
  - copy z-index from popup to positioner &nbsp;-&nbsp; by @soybeanjs [<samp>(ffa35)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ffa35f3d)
- **select**:
  - update CSS variable names in select popper for consistency and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(13132)</samp>](https://github.com/soybeanjs/soybean-ui/commit/13132f4a)
- **tooltip**:
  - remove TooltipPositioner context and update related components for improved clarity and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(4d8da)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4d8da100)
- **useGraceArea**:
  - rename contentElement to areaElement for improved clarity and update related references &nbsp;-&nbsp; by @soybeanjs [<samp>(8f822)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8f82262c)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **arrow**:
  - simplify Arrow component by removing unused context and props, and directly using SVG markup &nbsp;-&nbsp; by @soybeanjs [<samp>(9fc80)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9fc807ad)
- **dialog**:
  - replace DialogContent with DialogPopup, and update related types and context management for improved structure and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(4d82e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4d82e8ec)
  - rename DialogPopup to DialogContent &nbsp;-&nbsp; by @soybeanjs [<samp>(e0796)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e079656c)
- **dismissable-layer**:
  - rename layerElementRef to layerElement and simplify computed properties for clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(217ef)</samp>](https://github.com/soybeanjs/soybean-ui/commit/217ef7d9)
- **dropdown-menu**:
  - streamline context management by removing unused elements and updating references for improved clarity and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(73ac1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/73ac1d11)
- **focus-scope**:
  - remove unused focusScopeProps and simplify return structure &nbsp;-&nbsp; by @soybeanjs [<samp>(ff7f8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff7f86f9)
- **headless**:
  - refactor floating UI integration by replacing '@floating-ui/vue' &nbsp;-&nbsp; by @soybeanjs [<samp>(ab324)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ab324cf5)
- **menu**:
  - restructure menu components by introducing popup and positioner elements, updating context management, and enhancing type definitions for improved clarity and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(f4143)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f4143b48)
- **popover**:
  - remove PopoverContent, introduce PopoverPositioner and PopoverPopup components, and enhance context management for improved structure and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(2eb9c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2eb9c09d)
- **popper**:
  - restructure popper components by removing PopperContent, adding PopperPositioner and PopperPopup, and updating context usage for improved clarity and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(e7b76)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e7b76e6f)
- **select**:
  - restructure select components by introducing SelectPopup and SelectItemAlignedPopup, updating context management, and enhancing type definitions for improved functionality and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(2e56e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2e56e15b)
- **tooltip**:
  - remove TooltipContent, introduce TooltipPopup and TooltipPositioner components, and enhance context management for improved structure and functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(41a2d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/41a2d630)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **components**:
  - add md tooltips syntax and modify According docs &nbsp;-&nbsp; by **skyfeiz** [<samp>(d0b14)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d0b1496a)
  - modify AlertDialog docs &nbsp;-&nbsp; by **skyfeiz** [<samp>(629a3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/629a3dd5)
  - modify Avatar docs. &nbsp;-&nbsp; by **skyfeiz** [<samp>(28773)</samp>](https://github.com/soybeanjs/soybean-ui/commit/28773563)
  - modify Card docs. &nbsp;-&nbsp; by **skyfeiz** [<samp>(8133b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8133b246)
  - modify Breadcrumb docs. &nbsp;-&nbsp; by **skyfeiz** [<samp>(ff39e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff39eb19)
- **packages**:
  - update the way API tables are written in docs &nbsp;-&nbsp; by **skyfeiz** [<samp>(6edc1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6edc1c3f)
  - set color for required &nbsp;-&nbsp; by **skyfeiz** [<samp>(d3b1a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d3b1adb6)
- **utils**:
  - optimize the type anchor. &nbsp;-&nbsp; by **skyfeiz** [<samp>(a3cea)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a3cead02)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(a13a2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a13a22cf)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(79297)</samp>](https://github.com/soybeanjs/soybean-ui/commit/79297613)
- **eslint**:
  - update ESLint configuration to disable additional rules for TypeScript and Vue &nbsp;-&nbsp; by @soybeanjs [<samp>(efd93)</samp>](https://github.com/soybeanjs/soybean-ui/commit/efd9325b)
- **projects**:
  - update deps & update headless package.json &nbsp;-&nbsp; by @soybeanjs [<samp>(fd788)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fd7885c1)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **navigation-menu**: add margin reset to item and subItem styles for consistent layout &nbsp;-&nbsp; by @soybeanjs [<samp>(a27cd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a27cd045)
- **tree-menu**: add margin reset to root style for improved layout consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(5ff20)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ff2060e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[skyfeiz](mailto:webzhangfei@163.com),&nbsp;[Azir-11](mailto:2075125282@qq.com)

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
