# Changelog

## [v0.29.0-beta.10](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.9...v0.29.0-beta.10) (2026-06-17)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **sbean**: correct build script for headless component &nbsp;-&nbsp; by **soybeanfe** [<samp>(00b07)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00b07cc4a)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **sbean**:
  - add Nuxt 3 support flag and config option &nbsp;-&nbsp; by **soybeanfe** [<samp>(e2cff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e2cffbb39)
  - streamline configuration handling and remove deprecated options &nbsp;-&nbsp; by **soybeanfe** [<samp>(c4c42)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c4c4200f7)
  - optimize registry &nbsp;-&nbsp; by @soybeanjs [<samp>(22362)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2236236b7)
  - optimize ui resolver for sbean &nbsp;-&nbsp; by **soybeanfe** [<samp>(63a3d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/63a3d055b)
  - enhance template scaffolding with variable interpolation and improved project structure &nbsp;-&nbsp; by **soybeanfe** [<samp>(0bca6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0bca60e4e)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **sbean**:
  - remove style option from various components and configurations &nbsp;-&nbsp; by **soybeanfe** [<samp>(fb1e3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb1e3414e)
  - remove preset styles for clean, dense, and soybean &nbsp;-&nbsp; by **soybeanfe** [<samp>(a0bf7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a0bf753c9)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(0c4c5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0c4c505fa)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.29.0-beta.9](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.8...v0.29.0-beta.9) (2026-06-15)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **config-provider**: import updateUiAttribute from shadcn-theme &nbsp;-&nbsp; by @soybeanjs [<samp>(6679f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6679f337)
- **registry**: update sbean registry &nbsp;-&nbsp; by @soybeanjs [<samp>(fb31b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb31bdff)
- **sbean**: add Nuxt 3 project initialization support &nbsp;-&nbsp; by @soybeanjs [<samp>(5ac6c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ac6c6d6)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **icon**: correct import path for useConfigProvider &nbsp;-&nbsp; by @soybeanjs [<samp>(7ad9c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7ad9ca87)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **docs**: update import paths to use tilde prefix &nbsp;-&nbsp; by @soybeanjs [<samp>(fd373)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fd373d87)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **sbean**: remove private flag from package.json &nbsp;-&nbsp; by @soybeanjs [<samp>(ce88d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce88d34a)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **docs**:
  - remove unused CSS import and format presets in uno.config &nbsp;-&nbsp; by @soybeanjs [<samp>(e28d0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e28d0362)
  - add UI attributes to the HTML tag for improved styling &nbsp;-&nbsp; by @soybeanjs [<samp>(d7e71)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d7e71961)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.29.0-beta.8](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.7...v0.29.0-beta.8) (2026-06-14)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**: add installation and CLI documentation in English and Chinese &nbsp;-&nbsp; by **soybeanfe** [<samp>(8e1d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8e1d29e0)
- **registry**: update sbean registry &nbsp;-&nbsp; by @soybeanjs [<samp>(ca250)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca2509aa)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **css**:
  - handle fallback for radius value in generateRadiusCSSVariable &nbsp;-&nbsp; by **soybeanfe** [<samp>(e723a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e723a75d)
  - update generateSizeCss to accept styleTarget and size parameters &nbsp;-&nbsp; by @soybeanjs [<samp>(5ac32)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ac3260b)
- **styles**:
  - update dialog and drawer styles for responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(098e7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/098e76ea)
- **tests**:
  - update component names in fetcher integration tests &nbsp;-&nbsp; by @soybeanjs [<samp>(2ba39)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2ba39592)
- **theme**:
  - move size property to theme object in configProviderProps &nbsp;-&nbsp; by @soybeanjs [<samp>(c0b7c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c0b7c1a1)
- **vite.config**:
  - disable minification for better debugging &nbsp;-&nbsp; by **soybeanfe** [<samp>(ee455)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ee455262)
  - add formatting step to build:docs command &nbsp;-&nbsp; by **soybeanfe** [<samp>(d7e62)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d7e62907)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **docs**:
  - remove table of contents and update import statements &nbsp;-&nbsp; by @soybeanjs [<samp>(5f954)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5f9544d5)
  - enhance build:registry script for formatting &nbsp;-&nbsp; by @soybeanjs [<samp>(b9c2f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b9c2fd56)
- **scripts**:
  - update scripts for consistency and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(6de36)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6de36cd1)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **build**:
  - streamline build tasks and add prepare script &nbsp;-&nbsp; by @soybeanjs [<samp>(da282)</samp>](https://github.com/soybeanjs/soybean-ui/commit/da28233f)
- **config-provider**:
  - simplify theme handling and improve CSS generation &nbsp;-&nbsp; by @soybeanjs [<samp>(11aff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/11afffe4)
- **theme**:
  - refactor ui theme configurator &nbsp;-&nbsp; by **soybeanfe** [<samp>(979e9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/979e9398)
  - remove unused radius values from theme radius definitions &nbsp;-&nbsp; by **soybeanfe** [<samp>(54181)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5418133f)

### &nbsp;&nbsp;&nbsp;📦 Build

- **unocss-shadcn**: add lightningcss as a dev dependency &nbsp;-&nbsp; by @soybeanjs [<samp>(4f4d4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4f4d41d2)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(bde98)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bde9842d)
- **vscode**: update unocss root path &nbsp;-&nbsp; by @soybeanjs [<samp>(047b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/047b3c81)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.7](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.6...v0.29.0-beta.7) (2026-06-12)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **packages**:
  - add shadcn-theme and unocss-shadcn packages &nbsp;-&nbsp; by **soybeanfe** [<samp>(46b75)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46b751d6c)
- **sbean**:
  - enhance search command with pagination and type filtering &nbsp;-&nbsp; by **soybeanfe** [<samp>(b4096)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b4096583c)
  - enhance font configuration with additional font options and update preset handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(5edb9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5edb99cf8)
  - update init config and add registry scripts &nbsp;-&nbsp; by @soybeanjs [<samp>(7419c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7419ca590)
  - support monorepo &nbsp;-&nbsp; by @soybeanjs [<samp>(4f1b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4f1b990a7)
  - update preset sizes to use themeSizeKeys &nbsp;-&nbsp; by @soybeanjs [<samp>(c67f6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c67f6f2f4)
  - add monorepo support and customizable UI output directory &nbsp;-&nbsp; by **soybeanfe** [<samp>(396a9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/396a9c37e)
  - add monorepo and uiDir options to init command &nbsp;-&nbsp; by **soybeanfe** [<samp>(6d688)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6d688fec3)
  - update registry with new components and styles &nbsp;-&nbsp; by **soybeanfe** [<samp>(168d1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/168d1ee22)
  - update template configurations and paths for improved structure &nbsp;-&nbsp; by **soybeanfe** [<samp>(655b5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/655b5e4a9)
- **theme**:
  - add size to theme options &nbsp;-&nbsp; by @soybeanjs [<samp>(46a81)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46a817b14)
  - add theme size and radius options with corresponding CSS variable generation &nbsp;-&nbsp; by @soybeanjs [<samp>(46d3a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46d3a9627)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **theme**:
  - remove unused sidebar from color preset cache key &nbsp;-&nbsp; by @soybeanjs [<samp>(a736e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a736e6b89)
  - simplify CSS generation by removing radius parameter &nbsp;-&nbsp; by @soybeanjs [<samp>(e5175)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e51756569)
- **vite**:
  - update build dependencies to include init:lib for ui and playground &nbsp;-&nbsp; by **soybeanfe** [<samp>(e4611)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e4611ba48)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **sbean**: update sbean &nbsp;-&nbsp; by **soybeanfe** [<samp>(cdd18)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cdd188f5d)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **template**: simplify templates and update dependencies &nbsp;-&nbsp; by @soybeanjs [<samp>(c2b4f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c2b4fa10f)
- **theme**: simplify preset handling and cache logic &nbsp;-&nbsp; by @soybeanjs [<samp>(db519)</samp>](https://github.com/soybeanjs/soybean-ui/commit/db5191842)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **config**: update typecheck command and add type-check task &nbsp;-&nbsp; by @soybeanjs [<samp>(0ad22)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0ad226b80)
- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(31a20)</samp>](https://github.com/soybeanjs/soybean-ui/commit/31a20e6bf)
- **ui**: remove unused cssRawPlugin function and clean up imports &nbsp;-&nbsp; by **soybeanfe** [<samp>(927d9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/927d91e60)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.29.0-beta.6](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.5...v0.29.0-beta.6) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **sbean**: add current todo list for shadcn parity &nbsp;-&nbsp; by **soybeanfe** [<samp>(dd11b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dd11bbe1d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **init**: correct JSON syntax in TypeScript configuration generation &nbsp;-&nbsp; by **soybeanfe** [<samp>(68994)</samp>](https://github.com/soybeanjs/soybean-ui/commit/689945196)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.5](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.4...v0.29.0-beta.5) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **sbean**: add registry fetching capabilities and enhance configuration &nbsp;-&nbsp; by **soybeanfe** [<samp>(06c40)</samp>](https://github.com/soybeanjs/soybean-ui/commit/06c40eb26)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.4](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.3...v0.29.0-beta.4) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **build**: add sbean build script to the build process &nbsp;-&nbsp; by **soybeanfe** [<samp>(7864f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7864f410f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.3](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.2...v0.29.0-beta.3) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **sbean**: add sbean CLI tool for component copy-paste &nbsp;-&nbsp; by **soybeanfe** [<samp>(faeb1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/faeb1b1c2)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.2](https://github.com/soybeanjs/soybean-ui/compare/v0.29.0-beta.1...v0.29.0-beta.2) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **imports**: update type imports to remove .js extension across components &nbsp;-&nbsp; by **soybeanfe** [<samp>(c43e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c43e87f6a)
- **navigation-menu**: enhance viewport positioning with active trigger element and add transition effects &nbsp;-&nbsp; by **soybeanfe** [<samp>(02dfc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/02dfc0fe3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.29.0-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.28.2...v0.29.0-beta.1) (2026-06-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - add contribution guidelines and link to CONTRIBUTING.md in README files &nbsp;-&nbsp; by **soybeanfe** [<samp>(5f571)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5f5711aff)
  - add README files for documentation and playground apps in English and Chinese &nbsp;-&nbsp; by **soybeanfe** [<samp>(4a41c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4a41c8c49)
- **pre-commit**:
  - add pre-commit hook to stage changes &nbsp;-&nbsp; by **soybeanfe** [<samp>(8e99b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8e99b3c80)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **config-provider**: clean up imports and remove unused default preset options check &nbsp;-&nbsp; by **soybeanfe** [<samp>(2b18c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2b18c5ec7)
- **deps**: update markdown-exit to version 1.1.0-beta.2 &nbsp;-&nbsp; by @soybeanjs [<samp>(b7603)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b76038612)
- **docs**: update installation instructions and links for skills &nbsp;-&nbsp; by **soybeanfe** [<samp>(a5e1f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a5e1fb7d8)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **projects**: refactor code structure &nbsp;-&nbsp; by @soybeanjs [<samp>(3dd67)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3dd679f66)
- **skills**: move skill source to top-level `skills` directory &nbsp;-&nbsp; by **soybeanfe** [<samp>(cbe33)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cbe33c20b)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(94835)</samp>](https://github.com/soybeanjs/soybean-ui/commit/94835dab3)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **components**: simplify object property shorthand in form-field and tags-input components &nbsp;-&nbsp; by @soybeanjs [<samp>(8b585)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8b585a940)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.28.2](https://github.com/soybeanjs/soybean-ui/compare/v0.28.1...v0.28.2) (2026-05-30)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **playground**: add internationalization setup and locale management &nbsp;-&nbsp; by **soybeanfe** [<samp>(ce7d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce7d7626f)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **i18n**: update locale file extensions from .yml to .json in translation scripts &nbsp;-&nbsp; by **soybeanfe** [<samp>(3b054)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3b054f1ad)
- **styles**: adjust layout for dialog, drawer, and popconfirm components &nbsp;-&nbsp; by **soybeanfe** [<samp>(f8a09)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f8a09efd9)
- **types**: update TypesConfig and add pathParamNames to route definitions &nbsp;-&nbsp; by **soybeanfe** [<samp>(9d18c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9d18c4845)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **affix**: remove function type from AffixTarget definition &nbsp;-&nbsp; by **soybeanfe** [<samp>(b33e9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b33e9d960)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **icon**: simplify icon handling and remove Nuxt-specific logic &nbsp;-&nbsp; by **soybeanfe** [<samp>(63725)</samp>](https://github.com/soybeanjs/soybean-ui/commit/637257084)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(fe5bf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fe5bf240d)
- **docs**: use json for locales &nbsp;-&nbsp; by **soybeanfe** [<samp>(06cad)</samp>](https://github.com/soybeanjs/soybean-ui/commit/06cada75d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.28.1](https://github.com/soybeanjs/soybean-ui/compare/v0.28.0...v0.28.1) (2026-05-29)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **nuxt**: support playground in nuxt &nbsp;-&nbsp; by **soybeanfe** [<samp>(2822e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2822ed6b2)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **headless**: unify ID generation logic avoid hydration mismatch &nbsp;-&nbsp; by **soybeanfe** [<samp>(be9c0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/be9c02157)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(ffb45)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ffb455441)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.28.0](https://github.com/soybeanjs/soybean-ui/compare/v0.27.2...v0.28.0) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **theme**: enhance theme handling in ConfigProvider &nbsp;-&nbsp; by **soybeanfe** [<samp>(3af93)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3af93fe6c)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **link**: simplify link component logic and remove unused Nuxt integration &nbsp;-&nbsp; by **soybeanfe** [<samp>(68630)</samp>](https://github.com/soybeanjs/soybean-ui/commit/686304a32)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.27.2](https://github.com/soybeanjs/soybean-ui/compare/v0.27.1...v0.27.2) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **nuxt**: add SLink and SIcon components to app.vue &nbsp;-&nbsp; by **soybeanfe** [<samp>(445f3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/445f3b845)
- **stub**: add stub script for handling headless package exports &nbsp;-&nbsp; by **soybeanfe** [<samp>(7232e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7232e1c0a)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **date-range-picker**: add DateRange type export to types &nbsp;-&nbsp; by **soybeanfe** [<samp>(3bcca)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3bccae751)
- **headless**: update import paths avoid circular dependencies &nbsp;-&nbsp; by **soybeanfe** [<samp>(8d649)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d649ae05)
- **link**: refactor LinkComponent to use shallowRef and improve NuxtLink handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(90090)</samp>](https://github.com/soybeanjs/soybean-ui/commit/900906c2a)
- **time-field**: export TimeValue type in index and types &nbsp;-&nbsp; by **soybeanfe** [<samp>(82a23)</samp>](https://github.com/soybeanjs/soybean-ui/commit/82a23cbe7)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **headless**: update package.json and tsdown.config.ts to manage dependencies correctly &nbsp;-&nbsp; by **soybeanfe** [<samp>(c2df1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c2df152a6)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.27.1](https://github.com/soybeanjs/soybean-ui/compare/v0.27.0...v0.27.1) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **config-provider**: simplify theme watch logic and ensure immediate execution &nbsp;-&nbsp; by **soybeanfe** [<samp>(8ac58)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ac5808e2)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update docs api &nbsp;-&nbsp; by **soybeanfe** [<samp>(ce637)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce637eb1a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.27.0](https://github.com/soybeanjs/soybean-ui/compare/v0.26.5...v0.27.0) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **table**: add row interaction events with metadata and update related types &nbsp;-&nbsp; by **soybeanfe** [<samp>(93440)</samp>](https://github.com/soybeanjs/soybean-ui/commit/93440f5e9)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.5](https://github.com/soybeanjs/soybean-ui/compare/v0.26.4...v0.26.5) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **docs**: update installation command for skills to use correct package path &nbsp;-&nbsp; by **soybeanfe** [<samp>(9284c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9284cfe42)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.4](https://github.com/soybeanjs/soybean-ui/compare/v0.26.3...v0.26.4) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **docs**: update installation commands for skills to use correct package path &nbsp;-&nbsp; by **soybeanfe** [<samp>(d7f54)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d7f54d76a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.3](https://github.com/soybeanjs/soybean-ui/compare/v0.26.2...v0.26.3) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **skills**: enhance Claude plugin manifest with additional fields &nbsp;-&nbsp; by **soybeanfe** [<samp>(e2004)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e2004ff7a)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(cb8cc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cb8cce019)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.2](https://github.com/soybeanjs/soybean-ui/compare/v0.26.1...v0.26.2) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **color-picker**: replace miniButtonVariants with buttonVariants for trigger &nbsp;-&nbsp; by **soybeanfe** [<samp>(88444)</samp>](https://github.com/soybeanjs/soybean-ui/commit/88444f379)
- **tag**: adjust size properties for tag variants &nbsp;-&nbsp; by **soybeanfe** [<samp>(e5874)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e58744b99)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **playground**:
  - update avatar image sources and fallback labels &nbsp;-&nbsp; by **soybeanfe** [<samp>(24520)</samp>](https://github.com/soybeanjs/soybean-ui/commit/245206b31)
  - update button label to 'Default' &nbsp;-&nbsp; by **soybeanfe** [<samp>(3350e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3350e4337)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **deps**: simplify bundle deps configuration &nbsp;-&nbsp; by **soybeanfe** [<samp>(a488b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a488bbea7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.1](https://github.com/soybeanjs/soybean-ui/compare/v0.26.0...v0.26.1) (2026-05-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **playground**: remove BottomSheet unused snap points and related logic in playground &nbsp;-&nbsp; by **soybeanfe** [<samp>(52095)</samp>](https://github.com/soybeanjs/soybean-ui/commit/52095ba0b)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **card**: enhance Card component with header and footer visibility props and optimize style &nbsp;-&nbsp; by **soybeanfe** [<samp>(0de1e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0de1e57f8)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.26.0](https://github.com/soybeanjs/soybean-ui/compare/v0.25.4...v0.26.0) (2026-05-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **components**: add direction prop to Popper components &nbsp;-&nbsp; by **soybeanfe** [<samp>(90584)</samp>](https://github.com/soybeanjs/soybean-ui/commit/905843856)
- **config-provider**: integrate Nuxt detection and remove nuxt prop &nbsp;-&nbsp; by **soybeanfe** [<samp>(1cd2f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1cd2f3b77)
- **nuxt**: initialize Nuxt project structure with essential files and configurations &nbsp;-&nbsp; by **soybeanfe** [<samp>(36fb8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/36fb8f652)
- **typings**: add SWatermark component to global typings &nbsp;-&nbsp; by **soybeanfe** [<samp>(cfb01)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cfb01f625)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **icon**:
  - update icon prop type to IconValue and enhance Nuxt support &nbsp;-&nbsp; by **soybeanfe** [<samp>(b372a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b372a8c47)
  - improve Nuxt icon handling and condition checks &nbsp;-&nbsp; by **soybeanfe** [<samp>(8002e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8002e2c83)
- **package**:
  - remove unnecessary postinstall script from package.json &nbsp;-&nbsp; by **soybeanfe** [<samp>(b8bb1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b8bb1a115)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **css**: remove unused reset CSS import &nbsp;-&nbsp; by **soybeanfe** [<samp>(18677)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1867763d4)
- **tree-menu**: enhance tooltip and badge integration in tree menu styles and components &nbsp;-&nbsp; by **soybeanfe** [<samp>(07bc0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/07bc02ca7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.25.4](https://github.com/soybeanjs/soybean-ui/compare/v0.25.3...v0.25.4) (2026-05-26)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tsdown**: add environment variable definitions for DEV and MODE &nbsp;-&nbsp; by **soybeanfe** [<samp>(f6a8d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f6a8dc1ae)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.25.3](https://github.com/soybeanjs/soybean-ui/compare/v0.25.2...v0.25.3) (2026-05-26)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **nuxt**: add Vite config hooks for environment variables in module setup &nbsp;-&nbsp; by **soybeanfe** [<samp>(e5a1e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e5a1e39d0)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.25.2](https://github.com/soybeanjs/soybean-ui/compare/v0.25.1...v0.25.2) (2026-05-26)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **nuxt**: add Vite config hooks for environment variables &nbsp;-&nbsp; by **soybeanfe** [<samp>(6c28f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6c28f7f50)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(8a50f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8a50fc269)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.25.1](https://github.com/soybeanjs/soybean-ui/compare/v0.25.0...v0.25.1) (2026-05-23)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **link**: get config provider can be null &nbsp;-&nbsp; by @soybeanjs [<samp>(866e4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/866e42fb)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.25.0](https://github.com/soybeanjs/soybean-ui/compare/v0.24.2...v0.25.0) (2026-05-23)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**: add markdown directory with why-choose.md &nbsp;-&nbsp; by **soybeanfe** [<samp>(31aab)</samp>](https://github.com/soybeanjs/soybean-ui/commit/31aabec7)
- **typings**: add typedoc declaration for Vue components &nbsp;-&nbsp; by **soybeanfe** [<samp>(f2420)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f242041a)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tests**: add test configuration to vite.config.ts and update types in tsconfig.json &nbsp;-&nbsp; by **soybeanfe** [<samp>(96d40)</samp>](https://github.com/soybeanjs/soybean-ui/commit/96d40192)
- **theme**: optimize theme config &nbsp;-&nbsp; by @soybeanjs [<samp>(db7c1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/db7c13a9)
- **tsconfig**: simplify configuration by removing unused compiler options &nbsp;-&nbsp; by **soybeanfe** [<samp>(a8d87)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a8d87ede)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update docs api &nbsp;-&nbsp; by **soybeanfe** [<samp>(5d072)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5d07286a)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(3f23c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3f23cfd4)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(95c14)</samp>](https://github.com/soybeanjs/soybean-ui/commit/95c14aa4)
- **projects**:
  - remove unneeded Vue JSX and Vue Devtools plugins from configuration files &nbsp;-&nbsp; by **soybeanfe** [<samp>(ba893)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ba8934ef)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.24.2](https://github.com/soybeanjs/soybean-ui/compare/v0.24.1...v0.24.2) (2026-05-22)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tests**: add the missing test cases. closed #136 &nbsp;-&nbsp; by **soybeanfe** in https://github.com/soybeanjs/soybean-ui/issues/136 [<samp>(6a74b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6a74b0f20)
- **watermark**: add defense feature to restore tampered overlays &nbsp;-&nbsp; by **soybeanfe** [<samp>(ef6e2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ef6e26327)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(6c68e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6c68ed258)
- **docs**:
  - add npm version and download badges to README files &nbsp;-&nbsp; by **soybeanfe** [<samp>(ff3d9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff3d9b4ae)
  - update virtual-core version in API documentation &nbsp;-&nbsp; by **soybeanfe** [<samp>(19f3f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/19f3f6e1c)
- **license**:
  - add MIT License file &nbsp;-&nbsp; by **soybeanfe** [<samp>(3cfed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3cfed3cd6)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.24.1](https://github.com/soybeanjs/soybean-ui/compare/v0.24.0...v0.24.1) (2026-05-20)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **docs**: remove unused date/time picker component docs and references &nbsp;-&nbsp; by **soybeanfe** [<samp>(655c0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/655c0fa88)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.24.0](https://github.com/soybeanjs/soybean-ui/compare/v0.23.1...v0.24.0) (2026-05-20)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **watermark**: Implement watermark component &nbsp;-&nbsp; by @soybeanjs [<samp>(a79a9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a79a9e5d9)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **docs**: update coding standards and remove import-order instructions &nbsp;-&nbsp; by @soybeanjs [<samp>(5e041)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e0417fe2)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(79ec5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/79ec50032)
  - update @soybeanjs/oxc-config &nbsp;-&nbsp; by @soybeanjs [<samp>(5ad2a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ad2a8bfa)
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(00e0c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00e0cb122)
- **oxc**:
  - use `@soybeanjs/oxc-config` &nbsp;-&nbsp; by @soybeanjs [<samp>(45f12)</samp>](https://github.com/soybeanjs/soybean-ui/commit/45f128415)
- **pnpm**:
  - remove minimumReleaseAgeExclude entries &nbsp;-&nbsp; by @soybeanjs [<samp>(dbc70)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dbc70de35)
- **scripts**:
  - remove cleanup command, use builtin pnpm clean instead &nbsp;-&nbsp; by **soybeanfe** [<samp>(ae20e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ae20e750d)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **projects**:
  - format import statements &nbsp;-&nbsp; by @soybeanjs [<samp>(28883)</samp>](https://github.com/soybeanjs/soybean-ui/commit/28883293f)
  - format import statements &nbsp;-&nbsp; by @soybeanjs [<samp>(53f29)</samp>](https://github.com/soybeanjs/soybean-ui/commit/53f29ffaf)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.23.1](https://github.com/soybeanjs/soybean-ui/compare/v0.23.0...v0.23.1) (2026-05-19)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **types**: export IconifyOptions interface and update type exports in config-provider &nbsp;-&nbsp; by **soybeanfe** [<samp>(46659)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46659b71f)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **pnpm**: add minimumReleaseAgeExclude entries for various packages &nbsp;-&nbsp; by **soybeanfe** [<samp>(009d4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/009d4c770)
- **toggle**: fix class binding &nbsp;-&nbsp; by @soybeanjs [<samp>(7b9c4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7b9c4b1f0)
- **types**: correct import path for ProgressProviderProps &nbsp;-&nbsp; by **soybeanfe** [<samp>(13a61)</samp>](https://github.com/soybeanjs/soybean-ui/commit/13a61962f)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **scripts**: update build:css command to enable minify flag &nbsp;-&nbsp; by **soybeanfe** [<samp>(3e9da)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3e9da9820)
- **theme**: simplify CSS generation and improve theme handling &nbsp;-&nbsp; by @soybeanjs [<samp>(9870f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9870f1d1e)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **changelog**:
  - update changelog for v0.23.0 release &nbsp;-&nbsp; by @soybeanjs [<samp>(0779c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0779cda9e)
  - update docs changelog &nbsp;-&nbsp; by @soybeanjs [<samp>(604d0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/604d0a576)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(767d6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/767d6ac20)
- **scripts**: update release-execute command to include changelog generation &nbsp;-&nbsp; by @soybeanjs [<samp>(30446)</samp>](https://github.com/soybeanjs/soybean-ui/commit/304469e04)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.23.1-beta.4](https://github.com/soybeanjs/soybean-ui/compare/v0.23.1-beta.3...v0.23.1-beta.4) (2026-05-19)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **pnpm**: add minimumReleaseAgeExclude entries for various packages &nbsp;-&nbsp; by **soybeanfe** [<samp>(009d4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/009d4c770)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.23.1-beta.3](https://github.com/soybeanjs/soybean-ui/compare/v0.23.1-beta.2...v0.23.1-beta.3) (2026-05-19)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **types**: export IconifyOptions interface and update type exports in config-provider &nbsp;-&nbsp; by **soybeanfe** [<samp>(46659)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46659b71f)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **types**: correct import path for ProgressProviderProps &nbsp;-&nbsp; by **soybeanfe** [<samp>(13a61)</samp>](https://github.com/soybeanjs/soybean-ui/commit/13a61962f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.23.1-beta.2](https://github.com/soybeanjs/soybean-ui/compare/v0.23.1-beta.1...v0.23.1-beta.2) (2026-05-19)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **scripts**: update build:css command to enable minify flag &nbsp;-&nbsp; by **soybeanfe** [<samp>(3e9da)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3e9da9820)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(767d6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/767d6ac20)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.23.1-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.23.0...v0.23.1-beta.1) (2026-05-19)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **toggle**: fix class binding &nbsp;-&nbsp; by @soybeanjs [<samp>(7b9c4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7b9c4b1f)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **theme**: simplify CSS generation and improve theme handling &nbsp;-&nbsp; by @soybeanjs [<samp>(9870f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9870f1d1)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **changelog**:
  - update changelog for v0.23.0 release &nbsp;-&nbsp; by @soybeanjs [<samp>(0779c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0779cda9)
  - update docs changelog &nbsp;-&nbsp; by @soybeanjs [<samp>(604d0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/604d0a57)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **scripts**: update release-execute command to include changelog generation &nbsp;-&nbsp; by @soybeanjs [<samp>(30446)</samp>](https://github.com/soybeanjs/soybean-ui/commit/304469e0)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.23.0](https://github.com/soybeanjs/soybean-ui/compare/v0.22.4...v0.23.0) (2026-05-18)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **button**: add data-normal attribute and update styles &nbsp;-&nbsp; by **soybeanfe** [<samp>(28d0a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/28d0a8cb6)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **variants**: use `@soybeanjs/cva` replace `tailwind-variants` &nbsp;-&nbsp; by **soybeanfe** [<samp>(be8c3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/be8c32279)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **changelog**: update docs changelog &nbsp;-&nbsp; by **soybeanfe** [<samp>(41e7f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/41e7fadd7)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(022bf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/022bf712c)
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(f0300)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f0300ff0e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.22.4](https://github.com/soybeanjs/soybean-ui/compare/v0.22.3...v0.22.4) (2026-05-17)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **input-number**: add min and max properties to input number control &nbsp;-&nbsp; by **soybeanfe** [<samp>(c7c6a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c7c6aaa52)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **changelog**: update docs changelog &nbsp;-&nbsp; by **soybeanfe** [<samp>(f16e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f16e8ac53)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.22.3](https://github.com/soybeanjs/soybean-ui/compare/v0.22.2...v0.22.3) (2026-05-17)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dialog**: adjust popup max height for better responsiveness &nbsp;-&nbsp; by **soybeanfe** [<samp>(9e115)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9e1154296)
- **layout**: replace DialogContent with DialogPopup for mobile layout &nbsp;-&nbsp; by **soybeanfe** [<samp>(1efaa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1efaaf576)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **changelog**: update docs changelog &nbsp;-&nbsp; by **soybeanfe** [<samp>(962e0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/962e0be68)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(aa08d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aa08da7b7)
- **skills**: update skills &nbsp;-&nbsp; by **soybeanfe** [<samp>(18505)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1850569e7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.22.2](https://github.com/soybeanjs/soybean-ui/compare/v0.22.1...v0.22.2) (2026-05-14)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **theme**: add isDefinedClassValue utility and enhance tests for empty string handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(f1bc7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f1bc7b49a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.22.1](https://github.com/soybeanjs/soybean-ui/compare/v0.22.0...v0.22.1) (2026-05-14)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **agents**: add soybeaner agent for component development guidance &nbsp;-&nbsp; by @soybeanjs [<samp>(5c272)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c272a456)
- **input**: enhance Input component props and context for better accessibility and usability &nbsp;-&nbsp; by **soybeanfe** [<samp>(4cf60)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4cf60f7bb)
- **input-number**: enhance InputNumber component props for better flexibility and accessibility &nbsp;-&nbsp; by **soybeanfe** [<samp>(9932d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9932d9e64)
- **password**: enhance PasswordCompact component with clear event and improved props &nbsp;-&nbsp; by **soybeanfe** [<samp>(6b9d0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6b9d09e22)
- **types**: add RouteNamedMap to TypesConfig interface in typed-router &nbsp;-&nbsp; by **soybeanfe** [<samp>(5ac72)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ac721bb3)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **composables**: update contextName type and improve error messaging for `useContext` &nbsp;-&nbsp; by **soybeanfe** [<samp>(5ff47)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ff479373)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **api**: replace typedoc configuration file with inline configuration &nbsp;-&nbsp; by **soybeanfe** [<samp>(41cfe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/41cfe4851)
- **form-field**: update slot props binding for improved accessibility &nbsp;-&nbsp; by **soybeanfe** [<samp>(7cf7e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7cf7e4874)
- **skills**: add skill documentation generation and update references &nbsp;-&nbsp; by @soybeanjs [<samp>(f656a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f656ad7a8)
- **use-context**: remove implementation and export from hooks &nbsp;-&nbsp; by **soybeanfe** [<samp>(df4ea)</samp>](https://github.com/soybeanjs/soybean-ui/commit/df4eab156)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update api docs &nbsp;-&nbsp; by **soybeanfe** [<samp>(920ea)</samp>](https://github.com/soybeanjs/soybean-ui/commit/920ea92f7)
- **changelog**: update docs changelog &nbsp;-&nbsp; by @soybeanjs [<samp>(d3ceb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d3ceb98cf)
- **components**: update auto-generation commands to use `pnpm sui` instead of `pnpm gen` &nbsp;-&nbsp; by @soybeanjs [<samp>(fb9a7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb9a75971)
- **skills**: move skills to global &nbsp;-&nbsp; by @soybeanjs [<samp>(38bde)</samp>](https://github.com/soybeanjs/soybean-ui/commit/38bde6a3a)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - remove repeated deps and update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(5769d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5769d580c)
  - update pnpm lockfile &nbsp;-&nbsp; by **soybeanfe** [<samp>(961b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/961b97451)
  - add missing deps adn fix ts error &nbsp;-&nbsp; by @soybeanjs [<samp>(8b321)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8b321d659)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.22.0](https://github.com/soybeanjs/soybean-ui/compare/v0.21.0...v0.22.0) (2026-05-13)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**: add skills support and documentation for AI tools &nbsp;-&nbsp; by @soybeanjs [<samp>(919a1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/919a1676)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **playground**: remove unused modelValue and simplify template &nbsp;-&nbsp; by @soybeanjs [<samp>(8d26b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d26b113)
- **skills**: rename plugin to soybean-ui-skills for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(700db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/700db2cf)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **accordion**: enable collapsible behavior by default and update related props &nbsp;-&nbsp; by @soybeanjs [<samp>(bec18)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bec18a46)
- **llms**: remove unnecessary warning log in handleDevRequest &nbsp;-&nbsp; by @soybeanjs [<samp>(52dd5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/52dd5033)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **scripts**: update CLI commands and improve module execution &nbsp;-&nbsp; by @soybeanjs [<samp>(c3cca)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c3ccaa41)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **skills**: update skills &nbsp;-&nbsp; by @soybeanjs [<samp>(b258b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b258b294)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.21.0](https://github.com/soybeanjs/soybean-ui/compare/v0.20.0...v0.21.0) (2026-05-12)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**: add llms.txt support and documentation for AI tools &nbsp;-&nbsp; by **soybeanfe** [<samp>(985a3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/985a32e4e)
- **projects**: support more locales &nbsp;-&nbsp; by **soybeanfe** [<samp>(70fed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70fed259d)
- **releases**: enhance release entry grouping and update component typings &nbsp;-&nbsp; by @soybeanjs [<samp>(7e671)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7e671c2e9)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **menubar**: enhance focus management for link triggers and update menu interaction logic &nbsp;-&nbsp; by **soybeanfe** [<samp>(2cddd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2cddd5d7e)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **scripts**: simplify changelog and translation scripts, remove unused code &nbsp;-&nbsp; by **soybeanfe** [<samp>(6b716)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6b716af8d)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **locale**: enhance locale registration with new API and support for custom locales &nbsp;-&nbsp; by **soybeanfe** [<samp>(d9090)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d90902bd1)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update description for 'dir' prop and change default value to null &nbsp;-&nbsp; by **soybeanfe** [<samp>(458b2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/458b2b7e0)
- **changelog**: update docs changelog &nbsp;-&nbsp; by @soybeanjs [<samp>(1bbab)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1bbab3187)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps and update pnpm to 11 &nbsp;-&nbsp; by **soybeanfe** [<samp>(2fd29)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2fd29f12e)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **toolbar**: register rtl locale for toolbar tests &nbsp;-&nbsp; by **soybeanfe** [<samp>(d9836)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d9836034c)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **projects**: format code &nbsp;-&nbsp; by **soybeanfe** [<samp>(09d9b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/09d9b0ac7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.20.0](https://github.com/soybeanjs/soybean-ui/compare/v0.19.0...v0.20.0) (2026-05-12)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - integrate theme setting on locale change &nbsp;-&nbsp; by **soybeanfe** [<samp>(f0042)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f004236b)
  - add component count to introduction section &nbsp;-&nbsp; by **soybeanfe** [<samp>(9437a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9437ac52)
  - add RTL support details and examples to documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(aa79d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aa79df1f)
- **navigation-menu**:
  - implement NavigationMenuCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(33b01)</samp>](https://github.com/soybeanjs/soybean-ui/commit/33b01bc9)
- **scripts**:
  - add script to reorder Vue props and emits imports &nbsp;-&nbsp; by **soybeanfe** [<samp>(9b64f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9b64f817)
- **stepper**:
  - simplify component structure using StepperCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(b781b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b781b350)
- **switch**:
  - add direction support for switch component &nbsp;-&nbsp; by **soybeanfe** [<samp>(f6453)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f64533a9)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **bottom-sheet**:
  - simplify variant merging logic and remove unused slot &nbsp;-&nbsp; by @soybeanjs [<samp>(e96e7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e96e7f76)
- **docs**:
  - add max height and overflow styles to the container &nbsp;-&nbsp; by **soybeanfe** [<samp>(75173)</samp>](https://github.com/soybeanjs/soybean-ui/commit/751735a1)
  - conditionally display badge based on preset type &nbsp;-&nbsp; by **soybeanfe** [<samp>(37ee8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/37ee882f)
- **drawer**:
  - simplify variant assignment in computed property &nbsp;-&nbsp; by @soybeanjs [<samp>(b55f5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b55f5032)
- **empty**:
  - correct margin classes for media in size variants &nbsp;-&nbsp; by **soybeanfe** [<samp>(bcec5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bcec5907)
- **playground**:
  - remove v-model binding from SNavigationMenu &nbsp;-&nbsp; by **soybeanfe** [<samp>(4634b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4634b12a)
- **progress**:
  - update query selectors to use data-soybean-progress-provider &nbsp;-&nbsp; by @soybeanjs [<samp>(bc952)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bc952854)
- **test**:
  - remove redundant viewport position tests for RTL &nbsp;-&nbsp; by @soybeanjs [<samp>(8c796)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8c79656b)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **components**:
  - support RTL &nbsp;-&nbsp; by **soybeanfe** [<samp>(d833a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d833a484)
- **config-provider**:
  - remove unused text direction handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(8f21f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8f21fba2)
- **docs**:
  - update docs Anchor size &nbsp;-&nbsp; by **soybeanfe** [<samp>(6025f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6025f630)
- **editable**:
  - simplify Editable component by using EditableCompact &nbsp;-&nbsp; by @soybeanjs [<samp>(41d72)</samp>](https://github.com/soybeanjs/soybean-ui/commit/41d72493)
- **hover-card**:
  - simplify HoverCard component by using HoverCardCompact &nbsp;-&nbsp; by @soybeanjs [<samp>(f23ad)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f23adcba)
  - rename forwardedRootProps to forwardedProps for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(d2545)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d2545dd5)
  - simplify slot handling and remove unused variables &nbsp;-&nbsp; by @soybeanjs [<samp>(4d747)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4d7478d4)
- **menubar**:
  - remove computed class and simplify class binding &nbsp;-&nbsp; by **soybeanfe** [<samp>(da103)</samp>](https://github.com/soybeanjs/soybean-ui/commit/da103dea)
- **pagination**:
  - simplify Pagination component by using PaginationCompact &nbsp;-&nbsp; by @soybeanjs [<samp>(fd3b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fd3b9c44)
- **toolbar**:
  - add showIcon prop to ToolbarLink and enhance toolbar variants &nbsp;-&nbsp; by **soybeanfe** [<samp>(e1d05)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e1d056e2)
- **tooltip**:
  - rename forwardedRootProps to forwardedProps for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(ae39f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ae39f7b0)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **components**: update class names for RTL support and improve positioning logic &nbsp;-&nbsp; by @soybeanjs [<samp>(073e1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/073e1824)
- **radio-group**: rename RadioCardGroup to RadioGroupCard and simplify RadioGroup component by using RadioGroupCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(de602)</samp>](https://github.com/soybeanjs/soybean-ui/commit/de6024fc)
- **types**: change interfaces to type aliases for compact slots &nbsp;-&nbsp; by @soybeanjs [<samp>(93359)</samp>](https://github.com/soybeanjs/soybean-ui/commit/93359f74)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update docs api &nbsp;-&nbsp; by **soybeanfe** [<samp>(d96a3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d96a35a9)
- **changelog**: update docs changelog &nbsp;-&nbsp; by @soybeanjs [<samp>(b5c6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b5c6d247)
- **introduction**: update component count in introduction &nbsp;-&nbsp; by @soybeanjs [<samp>(fbf17)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fbf17e91)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(6b27d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6b27dfc9)
- **lint**: add ignorePatterns to configuration &nbsp;-&nbsp; by **soybeanfe** [<samp>(810ee)</samp>](https://github.com/soybeanjs/soybean-ui/commit/810ee5f0)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **editable**: make aria-label test asynchronous &nbsp;-&nbsp; by **soybeanfe** [<samp>(106c5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/106c5e97)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **components**:
  - reorder type imports for consistency across components &nbsp;-&nbsp; by **soybeanfe** [<samp>(8d694)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d694718)
  - replace 'ml-' with 'ms-' for RTL support in various components &nbsp;-&nbsp; by **soybeanfe** [<samp>(583fc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/583fcc54)
- **docs**:
  - enhance md-code-block styling with borders and background &nbsp;-&nbsp; by **soybeanfe** [<samp>(859be)</samp>](https://github.com/soybeanjs/soybean-ui/commit/859be21a)
  - add rounded corners to preview component container &nbsp;-&nbsp; by **soybeanfe** [<samp>(b41d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b41d2edc)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.19.0](https://github.com/soybeanjs/soybean-ui/compare/v0.18.0...v0.19.0) (2026-05-11)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **app-header**:
  - improve scroll offset handling and event listeners &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(18d36)</samp>](https://github.com/soybeanjs/soybean-ui/commit/18d3681b)
- **components**:
  - Implament InputNumber and Password compact components &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(a4fbe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a4fbe512)
  - add additional Popconfirm components for enhanced functionality &nbsp;-&nbsp; by **soybeanfe** [<samp>(16c2a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/16c2ac8d)
  - Implement compact color components &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(13ed9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/13ed9625)
- **composables**:
  - add useBoolProp composable for handling boolean props &nbsp;-&nbsp; by **soybeanfe** [<samp>(29a36)</samp>](https://github.com/soybeanjs/soybean-ui/commit/29a3627a)
- **docs**:
  - expand release details on demand &nbsp;-&nbsp; by @soybeanjs [<samp>(709c6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/709c6a6b)
- **headless**:
  - add prefix "data-soybean-" to primitive components &nbsp;-&nbsp; by @soybeanjs [<samp>(b4d8e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b4d8e842)
- **locale**:
  - add internationalization support with locale messages and overrides &nbsp;-&nbsp; by @soybeanjs [<samp>(d6788)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d6788400)
  - add locale support for dialog and calendar components &nbsp;-&nbsp; by @soybeanjs [<samp>(3857a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3857a458)
- **page-tabs**:
  - Implement PageTabsCmpact &nbsp;-&nbsp; by **soybeanfe** [<samp>(93a56)</samp>](https://github.com/soybeanjs/soybean-ui/commit/93a56de9)
- **popconfirm**:
  - Implement PopconfirmCompact &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(9550a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9550aac2)
- **popover**:
  - add prioritizePosition prop for improved positioning control &nbsp;-&nbsp; by **soybeanfe** [<samp>(0bc99)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0bc99c3c)
- **progress**:
  - Implement compact progress components &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(5e53d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e53db69)
- **scroll-area**:
  - Implement ScrollAreaCompact &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(3e0e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3e0e871a)
- **separator**:
  - Implement SeparatorCompact &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(8ff3d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ff3d6ff)
- **slider**:
  - Implement SliderCompact &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(6eba7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6eba7350)
- **switch**:
  - Implement SwitchCompact &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(71ab0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/71ab06e4)
- **tags-input**:
  - Implement TagsInputCompact &nbsp;-&nbsp; by @soybeanjs and **soybeanfe** [<samp>(ec340)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec34090d)
- **textarea**:
  - Implement TextareaCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(fe6df)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fe6df2cc)
- **tooltip**:
  - add prioritizePosition prop for improved tooltip positioning &nbsp;-&nbsp; by **soybeanfe** [<samp>(85b45)</samp>](https://github.com/soybeanjs/soybean-ui/commit/85b4523b)
  - Implement TooltipCompact components &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(dbae3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dbae3f8d)
- **tree-menu**:
  - Implement TreeMenuCmpact &nbsp;-&nbsp; by **soybeanfe** [<samp>(ccecd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ccecd632)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **backtop**:
  - emit click event in onClick function &nbsp;-&nbsp; by **soybeanfe** [<samp>(af273)</samp>](https://github.com/soybeanjs/soybean-ui/commit/af2737b6)
  - fix aria-hidden warning when click &nbsp;-&nbsp; by **soybeanfe** [<samp>(437fe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/437fe0cb)
- **bottom-sheet**:
  - improve fadeFromIndex and snapPoints logic &nbsp;-&nbsp; by **soybeanfe** [<samp>(76d82)</samp>](https://github.com/soybeanjs/soybean-ui/commit/76d82408)
- **color-picker**:
  - update ColorPicker and ColorSwatch components for compact variants &nbsp;-&nbsp; by @soybeanjs [<samp>(06e60)</samp>](https://github.com/soybeanjs/soybean-ui/commit/06e60e27)
- **color-swatch-picker**:
  - remove unnecessary props from ListboxContent &nbsp;-&nbsp; by @soybeanjs [<samp>(d22eb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d22eb594)
- **form-control**:
  - ensure proper check for classList in isFormControl function &nbsp;-&nbsp; by **soybeanfe** [<samp>(24854)</samp>](https://github.com/soybeanjs/soybean-ui/commit/24854596)
- **input**:
  - include clearProps in omitted properties for InputCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(82f86)</samp>](https://github.com/soybeanjs/soybean-ui/commit/82f86783)
- **input-number**:
  - add ariaLabel for InputNumberClear &nbsp;-&nbsp; by **soybeanfe** [<samp>(07fa1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/07fa16d1)
- **popover**:
  - bind slotProps to slots in PopoverCompact template &nbsp;-&nbsp; by **soybeanfe** [<samp>(ba82c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ba82c435)
- **separator**:
  - enhance slot handling and import consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(2518f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2518f9d0)
- **slider**:
  - update thumbProps type to BaseProps for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(87994)</samp>](https://github.com/soybeanjs/soybean-ui/commit/87994880)
- **ssg**:
  - change script option from async to sync &nbsp;-&nbsp; by **soybeanfe** [<samp>(8d6dd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8d6ddbe1)
- **test**:
  - update test description and assertions for rendering &nbsp;-&nbsp; by **soybeanfe** [<samp>(70fae)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70fae753)
- **types**:
  - correct import path for ProgressProviderProps in ConfigProvider types &nbsp;-&nbsp; by **soybeanfe** [<samp>(d8d46)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d8d46273)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **attr**:
  - remove data attributes from compact components &nbsp;-&nbsp; by **soybeanfe** [<samp>(2ce5e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2ce5eb2b)
- **button**:
  - introduce buttonIconVariants for consistent button styling &nbsp;-&nbsp; by **soybeanfe** [<samp>(21b77)</samp>](https://github.com/soybeanjs/soybean-ui/commit/21b77a1b)
- **checkbox**:
  - update component structure for improved readability &nbsp;-&nbsp; by **soybeanfe** [<samp>(3a6a2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3a6a2539)
  - set default rovingFocus prop in CheckboxCardGroupCompact &nbsp;-&nbsp; by **soybeanfe** [<samp>(5930e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5930eb01)
  - set default rovingFocus prop in CheckboxCardGroup and CheckboxGroup &nbsp;-&nbsp; by **soybeanfe** [<samp>(d659e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d659ee7c)
- **collection**:
  - remove itemProps from useCollectionItem and add data attribute &nbsp;-&nbsp; by **soybeanfe** [<samp>(a8011)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a8011e06)
- **components**:
  - optimize components based on Button &nbsp;-&nbsp; by @soybeanjs [<samp>(dcced)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dccedbf7)
  - remove default 'as' prop from multiple components &nbsp;-&nbsp; by **soybeanfe** [<samp>(ece05)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ece05052)
- **context**:
  - specify import path for useContext &nbsp;-&nbsp; by **soybeanfe** [<samp>(7a7d6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7a7d6d30)
- **docs**:
  - remove unused mobile sidebar UI and enhance SDrawer properties &nbsp;-&nbsp; by **soybeanfe** [<samp>(4ffb3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4ffb3758)
- **hooks**:
  - optimize `useControllableState` types and update related files &nbsp;-&nbsp; by **soybeanfe** [<samp>(fbaf8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fbaf8ab8)
- **index**:
  - reorder exports for consistency and clarity &nbsp;-&nbsp; by **soybeanfe** [<samp>(c4aad)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c4aad6f0)
- **locale**:
  - reorganize locale message interfaces for clarity and consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(cd6aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cd6aa48f)
- **popover**:
  - simplify popover component structure and enhance close functionality &nbsp;-&nbsp; by **soybeanfe** [<samp>(f9d63)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f9d63e52)
  - simplify component structure in PopoverTrigger &nbsp;-&nbsp; by **soybeanfe** [<samp>(f1764)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f1764117)
- **toggle-group**:
  - replace SToggleGroupItem import with headless component and remove unused file &nbsp;-&nbsp; by **soybeanfe** [<samp>(45418)</samp>](https://github.com/soybeanjs/soybean-ui/commit/45418967)
- **toggle-group-item**:
  - enhance rovingFocus handling and simplify component structure &nbsp;-&nbsp; by **soybeanfe** [<samp>(11f3a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/11f3ac33)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **components**:
  - Refactor Calendar,CalendarRange,DateField,DateRangeField,DataPicker,DataRangePicker,TimeField,TimeRangeField &nbsp;-&nbsp; by @soybeanjs [<samp>(9a580)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9a580164)
- **docs**:
  - introduce new document style &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(80b24)</samp>](https://github.com/soybeanjs/soybean-ui/commit/80b24110)
- **input**:
  - rename 'clearable' to 'clear' for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(b1072)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b10722b2)
- **instructions**:
  - update props definition to extend BaseProps for multi-slot components &nbsp;-&nbsp; by @soybeanjs [<samp>(76d54)</samp>](https://github.com/soybeanjs/soybean-ui/commit/76d545bb)
- **theme**:
  - replace mergeSlotVariants with mergeVariants across components &nbsp;-&nbsp; by **soybeanfe** [<samp>(f7e00)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f7e0002f)
- **types**:
  - unify component prop types with `BaseProps` &nbsp;-&nbsp; by @soybeanjs [<samp>(97798)</samp>](https://github.com/soybeanjs/soybean-ui/commit/97798f34)
  - replace PrimitiveProps & BaseProps with PrimitiveWithBaseProps in component type definitions &nbsp;-&nbsp; by @soybeanjs [<samp>(e6c27)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e6c27a05)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**: update docs api &nbsp;-&nbsp; by @soybeanjs [<samp>(e19e3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e19e344a)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **changelog**:
  - publish v0.18.0 release data &nbsp;-&nbsp; by @soybeanjs [<samp>(70e1f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70e1f531)
- **config**:
  - add ".agents" to ignorePatterns in .oxfmtrc.json &nbsp;-&nbsp; by @soybeanjs [<samp>(35a20)</samp>](https://github.com/soybeanjs/soybean-ui/commit/35a20430)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(8e23f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8e23f507)
- **docs**:
  - remove unused mermaid &nbsp;-&nbsp; by **soybeanfe** [<samp>(5ddb6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ddb6b50)
- **typings**:
  - remove unused component types from global declarations &nbsp;-&nbsp; by **soybeanfe** [<samp>(8bd96)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8bd96708)
  - remove unused FrostedToggler component from global declarations &nbsp;-&nbsp; by **soybeanfe** [<samp>(d4d30)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d4d30a55)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[Copilot](mailto:copilot@github.com)

## [v0.18.0](https://github.com/soybeanjs/soybean-ui/compare/v0.17.0...v0.18.0) (2026-05-05)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **api**:
  - update event types from MouseEvent to PointerEvent for consistency across components &nbsp;-&nbsp; by **soybeanfe** [<samp>(3d7e4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3d7e4e63)
- **avatar**:
  - add AvatarCompact component with props and emits &nbsp;-&nbsp; by @soybeanjs [<samp>(7d59d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7d59d36a)
- **badge**:
  - add BadgeCompact component with props, emits, and slots &nbsp;-&nbsp; by @soybeanjs [<samp>(49ceb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/49ceb52f)
- **carousel**:
  - Implement compact carousel component with improved navigation and accessibility &nbsp;-&nbsp; by @soybeanjs, **soybeanfe** and **Copilot** [<samp>(b6b6c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b6b6c9eb)
- **docs**:
  - update AGENTS, instructions and README &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(2d244)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2d244313)
  - add generated changelog data &nbsp;-&nbsp; by @soybeanjs [<samp>(d6a57)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d6a57f65)
  - build releases overview page &nbsp;-&nbsp; by @soybeanjs [<samp>(0b0fd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0b0fd9e8)
- **empty**:
  - add EmptyCompact component and update empty structure &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(04cb4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/04cb4c99)
- **form**:
  - Implement Compact components &nbsp;-&nbsp; by @soybeanjs, **soybeanfe** and **Copilot** [<samp>(95c48)</samp>](https://github.com/soybeanjs/soybean-ui/commit/95c484e8)
- **input**:
  - add InputClear and InputCompact components with clear functionality &nbsp;-&nbsp; by **soybeanfe** [<samp>(9f4b2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9f4b293d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **docs**: keep home browse links in-page &nbsp;-&nbsp; by @soybeanjs [<samp>(19896)</samp>](https://github.com/soybeanjs/soybean-ui/commit/198961a2)
- **empty**: improve header visibility logic in EmptyCompact component &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(8faf3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8faf39cc)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **api-i18n**:
  - improve locale handling and add support for changed source keys &nbsp;-&nbsp; by @soybeanjs [<samp>(ff0f3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff0f3eec)
- **backtop**:
  - update size handling in backtopVariants and computed class &nbsp;-&nbsp; by @soybeanjs [<samp>(fa0df)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fa0dfa26)
  - update click event type from MouseEvent to PointerEvent for consistency &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(4666c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4666c178)
- **button**:
  - update button props and event types for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(43c2b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43c2b24c)
- **clipboard**:
  - update click event type from MouseEvent to PointerEvent for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(ca2b0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca2b0640)
- **components**:
  - reorder and organize component entries for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(d4283)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d4283522)
- **docs**:
  - update usage and playground examples in documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(294f0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/294f04a3)
- **playground**:
  - simplify size handling in date picker example &nbsp;-&nbsp; by @soybeanjs [<samp>(80f90)</samp>](https://github.com/soybeanjs/soybean-ui/commit/80f90e61)
- **projects**:
  - update comments &nbsp;-&nbsp; by @soybeanjs [<samp>(66e8f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/66e8f793)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **components**:
  - reorder export type statements for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(ec404)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec404151)
- **config**:
  - remove unused shortcuts from uno.config.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(de55a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/de55ae12)
- **docs**:
  - share new component markers &nbsp;-&nbsp; by @soybeanjs [<samp>(248c2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/248c269d)
- **playground**:
  - replace demo components with PlaygroundGallery &nbsp;-&nbsp; by @soybeanjs [<samp>(d8b56)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d8b560cb)
  - support order &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(2b99c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2b99c403)
- **projects**:
  - optimize example basic file and optimize docs usage &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(a524f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a524f55c)
- **types**:
  - update component property descriptions to use component names &nbsp;-&nbsp; by @soybeanjs [<samp>(298f8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/298f86cb)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **AGENTS**:
  - update soybean-ui guidelines for clarity and consistency &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(a1050)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a1050fbb)
- **api**:
  - update api docs &nbsp;-&nbsp; by @soybeanjs [<samp>(50e1f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50e1ffbc)
  - update docs api &nbsp;-&nbsp; by @soybeanjs [<samp>(9c6d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9c6d27e6)
  - update docs api &nbsp;-&nbsp; by @soybeanjs [<samp>(cc145)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cc145a50)
- **repo**:
  - document changelog workflow &nbsp;-&nbsp; by @soybeanjs [<samp>(b9763)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b9763f22)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **config**:
  - remove vitest configuration from vite.config.ts &nbsp;-&nbsp; by **soybeanfe** [<samp>(756ed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/756ed4dd)
- **deps**:
  - update vue and vue-jsx plugins in package.json and vite.config.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(3d56c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3d56c38f)
  - add unplugin-vue and unplugin-vue-jsx &nbsp;-&nbsp; by **soybeanfe** [<samp>(dd6e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dd6e61c3)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(7c85b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7c85b351)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **input**: update type attribute handling and clear trigger in SInput tests &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(718f6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/718f6e72)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **docs**:
  - fix docs conflict styles &nbsp;-&nbsp; by @soybeanjs [<samp>(7d885)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7d8851c0)
  - update background color variables for light and dark themes &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(7be6a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7be6a158)
  - enhance theme configurator popup styles for better visibility &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(49172)</samp>](https://github.com/soybeanjs/soybean-ui/commit/49172a39)
  - simplify color resolution for orbs and particles &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(00bfc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00bfcf64)
- **projects**:
  - format code &nbsp;-&nbsp; by @soybeanjs [<samp>(1b420)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b4201b0)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[Copilot](mailto:copilot@github.com),&nbsp;[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.17.0](https://github.com/soybeanjs/soybean-ui/compare/v0.16.0...v0.17.0) (2026-05-03)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - integrate DeepL translation API and update environment variables &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(d8463)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d84637cf)
  - add components overview to sidebar menu and update selection logic &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(0c680)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0c6805a4)
- **i18n**:
  - add internationalization support for API descriptions and actions &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(bde9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bde9fa5d)
- **types**:
  - enhance component props with additional documentation and properties &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(a177b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a177bbbd)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **api**:
  - update button type descriptions to remove redundant translations &nbsp;-&nbsp; by @soybeanjs [<samp>(750b5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/750b58ed)
- **config-provider**:
  - remove unused useStyleTag and integrate cssVars in Primitive &nbsp;-&nbsp; by @soybeanjs [<samp>(3996e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3996ea3b)
- **date-picker**:
  - add disabled prop to PopoverRoot and update test selectors &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(1cce9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1cce97ae)
- **docs**:
  - update scrollBehavior to handle hash navigation smoothly &nbsp;-&nbsp; by @soybeanjs [<samp>(8a8db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8a8dbc3b)
  - update type references from AnchorItemData to AnchorOptionData &nbsp;-&nbsp; by @soybeanjs [<samp>(d064f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d064f6b5)
  - fix ts error &nbsp;-&nbsp; by @soybeanjs [<samp>(5c27a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c27a054)
- **hover-card**:
  - add sub-area attribute for hover card positioning &nbsp;-&nbsp; by @soybeanjs [<samp>(130a3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/130a35b1)
- **types**:
  - fix vue ignore comments &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(c65a5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c65a5d0c)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **calendar**:
  - remove unused props and update readonly binding &nbsp;-&nbsp; by @soybeanjs [<samp>(aed69)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aed69d38)
- **comment**:
  - remove redundant translation comments &nbsp;-&nbsp; by @soybeanjs [<samp>(c82ee)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c82eea60)
- **date-picker**:
  - refactor date-picker components and integrate popover functionality &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(7ae41)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7ae413ff)
- **dialog**:
  - rename DialogRootProps to extend DialogBaseProps for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(7b052)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7b052f99)
- **docs**:
  - enhance locale message resolution in useApiI18n &nbsp;-&nbsp; by @soybeanjs [<samp>(aacda)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aacda41f)
  - replace nprogress with progress of ui &nbsp;-&nbsp; by @soybeanjs [<samp>(1e3b1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1e3b1644)
  - update docs api &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(66c57)</samp>](https://github.com/soybeanjs/soybean-ui/commit/66c57138)
- **popover**:
  - enhance context and props for popover components &nbsp;-&nbsp; by @soybeanjs [<samp>(f6666)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f666662e)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **anchor**:
  - rename AnchorItemCompact component and update types &nbsp;-&nbsp; by @soybeanjs [<samp>(11966)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1196658c)
- **components**:
  - simplify exports by removing redundant type definitions &nbsp;-&nbsp; by @soybeanjs [<samp>(e1c69)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e1c69ab4)
  - change export statements to export types from headless components &nbsp;-&nbsp; by @soybeanjs [<samp>(0a009)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0a0090e8)
  - update imports to use specific module paths for better clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(1adad)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1adad9b9)
- **constants**:
  - reorganize regex exports and improve import structure &nbsp;-&nbsp; by @soybeanjs [<samp>(a4045)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a4045d45)
- **docs**:
  - refactor docs with glass style &nbsp;-&nbsp; by @soybeanjs [<samp>(4f91b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4f91bad2)
- **projects**:
  - refactor docs style &nbsp;-&nbsp; by @soybeanjs [<samp>(46177)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46177a29)
- **utils**:
  - replace toKebabCase and toPascalCase with kebabCase and pascalCase &nbsp;-&nbsp; by @soybeanjs [<samp>(00acc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00acc184)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **api**:
  - add descriptions and keys for year range picker props and emits &nbsp;-&nbsp; by @soybeanjs [<samp>(ff4e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff4e8ea1)
- **components**:
  - add component catalog with descriptions and statistics &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(b02ea)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b02ea462)
- **projects**:
  - update documentation with Compact components and current architecture &nbsp;-&nbsp; by @soybeanjs [<samp>(15133)</samp>](https://github.com/soybeanjs/soybean-ui/commit/151333af)
  - replace markdown-it with markdown-exit and clean up unused dependencies &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(3a25c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3a25c53a)
- **styles**:
  - remove unused table styles from global.css &nbsp;-&nbsp; by **soybeanfe** [<samp>(f7d10)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f7d1056f)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(d6526)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d652684a)
- **headless**: add types export for types module and components &nbsp;-&nbsp; by @soybeanjs [<samp>(c9b19)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c9b1904f)
- **tsdown**: simplify entry configuration by removing unnecessary filter &nbsp;-&nbsp; by @soybeanjs [<samp>(26f1d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/26f1d447)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **components**: remove unused border opacity classes for cleaner styling &nbsp;-&nbsp; by @soybeanjs [<samp>(7f6a0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7f6a0be1)
- **docs**: update pre styles for better responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(bc382)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bc382e08)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[Copilot](mailto:copilot@github.com),&nbsp;[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.16.0](https://github.com/soybeanjs/soybean-ui/compare/v0.15.5...v0.16.0) (2026-05-01)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **components**:
  - implement Compact components for Card, Popover, Editable, HoverCard, NavigationMenu, Pagination and Stepper &nbsp;-&nbsp; by @soybeanjs [<samp>(6cbdc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6cbdcee7)
  - Implement calendar, date, month, time and year components &nbsp;-&nbsp; by @soybeanjs, @claude, @MicrosoftCopilot and **soybeanfe** [<samp>(28241)</samp>](https://github.com/soybeanjs/soybean-ui/commit/28241896)
- **scripts**:
  - add script to generate UI components file &nbsp;-&nbsp; by @soybeanjs [<samp>(5dbd0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5dbd0ef5)
- **skills**:
  - add new skills for issue tracking, TDD, and triage processes &nbsp;-&nbsp; by @soybeanjs [<samp>(9a282)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9a282174)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **shared**: handle undefined variant return values in merge functions &nbsp;-&nbsp; by **soybeanfe** [<samp>(7249b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7249bc8d)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **calendar**:
  - add compact header with month/year select and improve calendar functionality &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(2d4e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2d4e61af)
- **carousel**:
  - rename CarouselPlugins to CarouselPlugin for consistency &nbsp;-&nbsp; by **soybeanfe** [<samp>(85e45)</samp>](https://github.com/soybeanjs/soybean-ui/commit/85e454c1)
- **combobox**:
  - reorganize component imports and remove unused files &nbsp;-&nbsp; by **soybeanfe** [<samp>(d58a6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d58a6dc3)
  - add parentElement reference and integrate useHideOthers for improved accessibility &nbsp;-&nbsp; by **soybeanfe** [<samp>(b83ef)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b83ef7dd)
- **date-field**:
  - add DateFieldCompact component and integrate into SDateField &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(2633d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2633d279)
- **hover-card**:
  - add prioritizePosition prop to HoverCardPositioner &nbsp;-&nbsp; by **soybeanfe** [<samp>(e53db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e53db03c)
- **popper**:
  - add class binding for anchor element and update PopperUiSlot type &nbsp;-&nbsp; by **soybeanfe** [<samp>(21d02)</samp>](https://github.com/soybeanjs/soybean-ui/commit/21d02afb)
- **scripts**:
  - sort component groups before generating components file &nbsp;-&nbsp; by @soybeanjs [<samp>(1066a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1066abbe)
- **useHideOthers**:
  - update target parameter type to support multiple elements &nbsp;-&nbsp; by **soybeanfe** [<samp>(0d0d5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0d0d5b2f)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **autocomplete**: migrate components to use combobox structure and remove unused files &nbsp;-&nbsp; by **soybeanfe** [<samp>(b1396)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b13965cd)
- **docs**: refactor docs components api &nbsp;-&nbsp; by **soybeanfe** [<samp>(d5b89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d5b89730)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **AGENTS**: update instructions and add CLAUDE files for components and playground &nbsp;-&nbsp; by @soybeanjs [<samp>(6711d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6711da50)
- **components**: update API documentation for various components to use ComponentApi &nbsp;-&nbsp; by **soybeanfe** [<samp>(d9510)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d951003f)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(af9c9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/af9c9ea0)
- **lint**: remove duplicate rule for no-underscore-dangle &nbsp;-&nbsp; by **soybeanfe** [<samp>(ce1ba)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce1bab31)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![claude](https://github.com/claude.png?size=48)](https://github.com/claude)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[Copilot](mailto:copilot@github.com),&nbsp;

## [v0.15.5](https://github.com/soybeanjs/soybean-ui/compare/v0.15.4...v0.15.5) (2026-04-30)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **layout**: remove unused properties from LayoutClassicRootProps &nbsp;-&nbsp; by **soybeanfe** [<samp>(c9233)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c92330fb)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.15.4](https://github.com/soybeanjs/soybean-ui/compare/v0.15.3...v0.15.4) (2026-04-30)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **components**: Implement BottomSheet component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(fb274)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fb274b91)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **headless**: add global css in config-provider &nbsp;-&nbsp; by **soybeanfe** [<samp>(b2a75)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b2a75952)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **components**: simplify style handling in config-provider and toast-provider &nbsp;-&nbsp; by **soybeanfe** [<samp>(9ef67)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9ef6782a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.15.3](https://github.com/soybeanjs/soybean-ui/compare/v0.15.2...v0.15.3) (2026-04-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **table**: add empty state support and update documentation &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(38ca1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/38ca16c2)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: add missing TableScroll component exports &nbsp;-&nbsp; by **soybeanfe** [<samp>(5bbd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5bbd46c3)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **progress**: update progress documentation and improve structure &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(d86ac)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d86acef7)
- **table**: update table api &nbsp;-&nbsp; by **soybeanfe** [<samp>(a130d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a130d38c)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(c7376)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c7376b53)
- **oxfmtrc**: add CHANGELOG.md to ignore patterns &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(d96d3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d96d3b63)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **card**: update content class for improved accessibility &nbsp;-&nbsp; by **soybeanfe** [<samp>(0160d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0160d881)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[Copilot](mailto:copilot@github.com)

## [v0.15.2](https://github.com/soybeanjs/soybean-ui/compare/v0.15.1...v0.15.2) (2026-04-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **table**:
  - add last start and first end fixed column indicators &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(e390d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e390d598)
  - add table scroll component, enhance table style &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(9997c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9997c1e0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: set default value for multiple prop in STable component &nbsp;-&nbsp; by **soybeanfe** [<samp>(1964c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1964c4c5)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[Copilot](mailto:copilot@github.com)

## [v0.15.1](https://github.com/soybeanjs/soybean-ui/compare/v0.15.0...v0.15.1) (2026-04-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **kbd**: add raised prop and update API documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(d70b7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d70b7e63)
- **toast**: add ToastProvider component and refactor Toaster integration &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(e2491)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e249120d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **combobox**: fix group and item management with Maps &nbsp;-&nbsp; by @soybeanjs [<samp>(cb831)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cb831b95)
- **package**: update lint command to target specific directories &nbsp;-&nbsp; by @soybeanjs [<samp>(346d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/346d2c43)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **color-picker**: add miniSize computed property for size handling &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(34d51)</samp>](https://github.com/soybeanjs/soybean-ui/commit/34d51524)
- **components**: reorder LayoutClassicCompact in exports &nbsp;-&nbsp; by @soybeanjs [<samp>(a9acc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9acc906)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **components**: update API documentation to use ComponentApi for multiple components &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(483a4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/483a4ca7)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **package**: update gen:api script to format generated API docs &nbsp;-&nbsp; by @soybeanjs [<samp>(1faa6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1faa6da2)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **projects**: format code &nbsp;-&nbsp; by @soybeanjs [<samp>(075f5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/075f500e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[Copilot](mailto:copilot@github.com)

## [v0.15.0](https://github.com/soybeanjs/soybean-ui/compare/v0.14.0...v0.15.0) (2026-04-26)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **dialog**: Implement DialogCompact and refactor `useDialog` &nbsp;-&nbsp; by @soybeanjs [<samp>(39019)</samp>](https://github.com/soybeanjs/soybean-ui/commit/39019743)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **a11y**:
  - add axe-core for accessibility testing and implement a11y tests for components &nbsp;-&nbsp; by @soybeanjs [<samp>(c348f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c348fb6d)
- **accordion**:
  - Implement AccordionCompact component and update related types and context &nbsp;-&nbsp; by @soybeanjs [<samp>(e05b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e05b3237)
  - add AccordionDescription component and update related files &nbsp;-&nbsp; by **soybeanfe** [<samp>(6506e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6506e753)
- **api**:
  - add script to generate component API documentation &nbsp;-&nbsp; by **soybean-js** [<samp>(a76f9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a76f983b)
  - add new components and update existing API documentation &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(65037)</samp>](https://github.com/soybeanjs/soybean-ui/commit/650376bb)
- **components**:
  - Implement progress component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(df4d5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/df4d5285)
  - Implment Slider component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(e7f1d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e7f1d5ee)
  - Implement Skeleton component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(03705)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0370519b)
  - Implement Toggle component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(f3134)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f3134893)
  - Implement ToggleGroup component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(70476)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70476c4c)
  - Implement Color related components: ColorArea, ColorField, ColorSlider, ColorSwatch, ColorSwatchPicker, ColorPicker &nbsp;-&nbsp; by @soybeanjs [<samp>(66c16)</samp>](https://github.com/soybeanjs/soybean-ui/commit/66c16f3a)
  - Implement ScrollArea component &nbsp;-&nbsp; by @soybeanjs [<samp>(a500f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a500ffb1)
  - Implement HoverCard component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(87e9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/87e9fb9e)
  - Implement Spinner component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(33809)</samp>](https://github.com/soybeanjs/soybean-ui/commit/33809035)
  - Implement Affix component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(8ac9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ac9f94a)
  - Implement Empty component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(fef94)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fef945bb)
  - Implement Editable component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(2f87c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2f87c3cc)
  - Implement BottomSheet component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(03d4d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/03d4dc17)
  - Implement useLoadingBar based Progress &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(e6aef)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e6aefe5a)
  - Implement Autocomplete component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(fc269)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fc269a16)
  - Implement Stepper component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(09d81)</samp>](https://github.com/soybeanjs/soybean-ui/commit/09d8132f)
  - Implement Splitter component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(3076c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3076ce27)
  - Implement TagsInput component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(05392)</samp>](https://github.com/soybeanjs/soybean-ui/commit/05392bf8)
  - Implement Combobox component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(b9c4d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b9c4d8da)
  - Implement Toolbar component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a500b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a500b841)
  - Implement Carousel component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(6f584)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6f584f9f)
  - Implement Anchor component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(24b2e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/24b2ed3e)
  - Implement Menubar component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(341cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/341cbe39)
  - Implement InputOpt component &nbsp;-&nbsp; by @soybeanjs, **soybean-js** and @MicrosoftCopilot [<samp>(8b299)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8b299b21)
  - Implement Backtop component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a6ed9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a6ed9d81)
  - Implement Clipboard component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(96d89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/96d8929d)
  - Implement LayoutCompact component and LayoutClassic component &nbsp;-&nbsp; by @soybeanjs [<samp>(3a6cf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3a6cf5b5)
- **date**:
  - add shared headless date utilities for upcoming date components &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(15609)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1560971f)
- **dialog**:
  - enable showConfirm prop in DialogCompact component &nbsp;-&nbsp; by **soybeanfe** [<samp>(e8a13)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e8a13e04)
- **docs**:
  - add comprehensive guidelines for soybean-ui component development, testing, and documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(13935)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1393569c)
- **headless**:
  - add IconRender component with customizable icon rendering in headless &nbsp;-&nbsp; by @soybeanjs [<samp>(3e877)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3e877a9b)
  - generate components and namespaced files dynamically &nbsp;-&nbsp; by **soybean-js** [<samp>(aa563)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aa563242)
- **listbox**:
  - add clearable prop and enhance model value change handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(a686c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a686c1a0)
- **menu**:
  - add MenuSubAttributeContext and integrate into menu components &nbsp;-&nbsp; by @soybeanjs [<samp>(7bc9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7bc9ffcf)
- **progress**:
  - add imperative progress provider api and remove loading-bar wrapper. closed #129 &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/129 [<samp>(5f90a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5f90a644)
- **projects**:
  - support script to generate components api &nbsp;-&nbsp; by **soybean-js** [<samp>(93c81)</samp>](https://github.com/soybeanjs/soybean-ui/commit/93c8190f)
- **prompt**:
  - add soybean-ui-component development prompt &nbsp;-&nbsp; by @soybeanjs [<samp>(73d4e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/73d4e35c)
- **roadmap**:
  - update testing coverage and CI/CD sections with completed tasks &nbsp;-&nbsp; by @soybeanjs [<samp>(febb0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/febb0535)
- **selection**:
  - enhance selection behavior and add boolean casting utility &nbsp;-&nbsp; by **soybeanfe** [<samp>(50076)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50076d2a)
- **skill**:
  - add component development guidelines and coding standards references &nbsp;-&nbsp; by @soybeanjs [<samp>(21de4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/21de445c)
  - add Vue SFC organization guidelines and update checklist for script setup order &nbsp;-&nbsp; by @soybeanjs [<samp>(d20de)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d20de727)
  - add guidelines for headless aggregate components and icon rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(1e350)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1e3509e9)
- **table**:
  - Implementation with a new TableCompact, supports grouped headers, sorting/filtering, fixed columns, column resizing, tree rows, and virtualization. closed #97. &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/97 [<samp>(72a94)</samp>](https://github.com/soybeanjs/soybean-ui/commit/72a9425b)
  - implement logical fixed columns and text alignment for RTL support &nbsp;-&nbsp; by @soybeanjs [<samp>(c0fd5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c0fd5c5d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **checkbox**:
  - update forwardedProps to omit 'class' instead of 'label' &nbsp;-&nbsp; by **soybeanfe** [<samp>(0d537)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0d5375c8)
- **components**:
  - update component names of Toast &nbsp;-&nbsp; by @soybeanjs [<samp>(d8c6a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d8c6acda)
  - add compact implementations for anchor, checkbox, and segment components &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(477cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/477cb8a3)
- **focus-scope**:
  - add auto-focus event handling for open and close actions &nbsp;-&nbsp; by @soybeanjs [<samp>(2cd3c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2cd3c4ce)
- **form**:
  - update form input and output types for schema validation &nbsp;-&nbsp; by @soybeanjs [<samp>(3b792)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3b792d13)
- **menu**:
  - correct focus handling in PopperPositioner and RovingFocusGroup &nbsp;-&nbsp; by @soybeanjs [<samp>(68b9d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/68b9d584)
- **namespaced**:
  - simplify ColorSwatch export &nbsp;-&nbsp; by @soybeanjs [<samp>(0830a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0830acff)
- **playground**:
  - remove 'square' shape variant of skeleton &nbsp;-&nbsp; by @soybeanjs [<samp>(1b635)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b635bec)
- **select**:
  - replace singleClearable with clearable in context props &nbsp;-&nbsp; by **soybeanfe** [<samp>(ca438)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca438af5)
- **selection**:
  - replace singleClearable with clearable prop &nbsp;-&nbsp; by **soybeanfe** [<samp>(540de)</samp>](https://github.com/soybeanjs/soybean-ui/commit/540de77a)
- **spinner**:
  - update secondary and accent color variants to include opacity &nbsp;-&nbsp; by @soybeanjs [<samp>(132e9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/132e9896)
- **table**:
  - remove redundant bordered prop from table components &nbsp;-&nbsp; by @soybeanjs [<samp>(e2387)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e23872c4)
  - improve column sorting logic in getColumns function &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(4de50)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4de507e6)
- **tests**:
  - simplify format selection logic in color picker tests &nbsp;-&nbsp; by @soybeanjs [<samp>(0b4e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0b4e6b48)
- **toggle**:
  - add shape prop to ToggleProps and update forwardedProps &nbsp;-&nbsp; by @soybeanjs [<samp>(63f21)</samp>](https://github.com/soybeanjs/soybean-ui/commit/63f21829)
- **tree-menu**:
  - fix collapsible ui context in tree menu &nbsp;-&nbsp; by @soybeanjs [<samp>(fbb4b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fbb4bf38)
- **vite**:
  - update import path for UiResolver &nbsp;-&nbsp; by **soybean-js** [<samp>(80db3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/80db388e)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **accordion**:
  - optimize slot template types &nbsp;-&nbsp; by @soybeanjs [<samp>(db7a1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/db7a1348)
  - reorganize imports and update slot structure for Accordion components &nbsp;-&nbsp; by **soybean-js** [<samp>(22707)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2270794d)
- **affix**:
  - enhance target resolution to support string selectors and direct elements &nbsp;-&nbsp; by @soybeanjs [<samp>(7c212)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7c2124df)
  - reorganize type exports and clean up unused interfaces &nbsp;-&nbsp; by **soybean-js** [<samp>(7675b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7675bba7)
- **alert**:
  - reorganize AlertContent type and exports &nbsp;-&nbsp; by **soybean-js** [<samp>(09bf0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/09bf0f5e)
- **anchor**:
  - enhance anchor component with location hash sync and optimize code &nbsp;-&nbsp; by @soybeanjs [<samp>(3b126)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3b1267b1)
- **autocomplete**:
  - add prioritizePosition prop to enhance positioning logic &nbsp;-&nbsp; by @soybeanjs [<samp>(1a2ba)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1a2ba8a5)
- **carousel**:
  - add loop option to SCarousel component &nbsp;-&nbsp; by **soybeanfe** [<samp>(78d17)</samp>](https://github.com/soybeanjs/soybean-ui/commit/78d17f0e)
- **color-picker**:
  - optimize style &nbsp;-&nbsp; by @soybeanjs [<samp>(a9d4a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9d4abe8)
- **combobox**:
  - add prioritizePosition prop to enhance positioning logic &nbsp;-&nbsp; by @soybeanjs [<samp>(b7a16)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b7a16697)
- **dialog**:
  - enhance slot props binding for DialogCompact component &nbsp;-&nbsp; by **soybeanfe** [<samp>(a3c2d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a3c2d5a4)
- **skeleton**:
  - remove 'square' shape variant from Skeleton component &nbsp;-&nbsp; by @soybeanjs [<samp>(50651)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50651159)
- **skill**:
  - remove outdated references to .github/instructions &nbsp;-&nbsp; by @soybeanjs [<samp>(e1c89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e1c891ce)
- **slider**:
  - clean up props handling and improve readability &nbsp;-&nbsp; by @soybeanjs [<samp>(012f2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/012f257e)
- **table**:
  - remove unused data table components and types &nbsp;-&nbsp; by @soybeanjs [<samp>(e5683)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e5683916)
  - enhance table components with improved column width handling and additional properties &nbsp;-&nbsp; by @soybeanjs [<samp>(b31ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b31ff550)
  - simplify bordered prop and update table styles &nbsp;-&nbsp; by @soybeanjs [<samp>(6d8cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6d8cb722)
  - remove unused useSlots import and streamline slot definition &nbsp;-&nbsp; by @soybeanjs [<samp>(434ae)</samp>](https://github.com/soybeanjs/soybean-ui/commit/434aec23)
- **toast**:
  - optimize toast api and icon,button render &nbsp;-&nbsp; by @soybeanjs and **soybean-js** [<samp>(080c2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/080c2359)
- **toggle-group**:
  - update variant options and remove outline example &nbsp;-&nbsp; by @soybeanjs [<samp>(34cf7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/34cf782c)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **affix**:
  - refactor Affix component: split three headless components &nbsp;-&nbsp; by @soybeanjs [<samp>(47d99)</samp>](https://github.com/soybeanjs/soybean-ui/commit/47d994b8)
- **api**:
  - simplify type reference collection and improve symbol resolution &nbsp;-&nbsp; by **soybean-js** [<samp>(3d77e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3d77e22d)
- **combobox**:
  - refactor combobox component &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(5dec4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5dec4fd1)
- **components**:
  - Implement Toast component inspire by vue-sonner &nbsp;-&nbsp; by @soybeanjs in https://github.com/soybeanjs/soybean-ui/issues/126 [<samp>(4fdd8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4fdd8e9b)
  - Implement some compact components &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a1c14)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a1c140cc)
  - rename "IconRender" to "icon" in headless &nbsp;-&nbsp; by **soybean-js** [<samp>(6970e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6970e828)
- **menu**:
  - Implement Menu Compact components &nbsp;-&nbsp; by @soybeanjs [<samp>(a1e6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a1e6d340)
- **progress**:
  - Refactor ProgressProvider and progress api &nbsp;-&nbsp; by @soybeanjs, **soybean-js** and @MicrosoftCopilot [<samp>(c60cf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c60cf09a)
- **projects**:
  - remove bottom-sheet &nbsp;-&nbsp; by **soybeanfe** [<samp>(0a26f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0a26f3ea)
- **table**:
  - Refactor `STable` aggregation into headless `Table` &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(53678)</samp>](https://github.com/soybeanjs/soybean-ui/commit/53678f8c)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **agents**:
  - update components development skill &nbsp;-&nbsp; by @soybeanjs [<samp>(102be)</samp>](https://github.com/soybeanjs/soybean-ui/commit/102be284)
  - update generation date and enhance component descriptions &nbsp;-&nbsp; by @soybeanjs [<samp>(a5678)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a567824d)
- **checkbox**:
  - fix emit parameter syntax for consistency &nbsp;-&nbsp; by @soybeanjs and **Copilot** [<samp>(1d2d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1d2d7797)
- **checklist**:
  - update checklist for component development with unit testing guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(60cfe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/60cfe183)
- **instructions**:
  - add TypeScript functional style and import order guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(6c09a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6c09aa03)
  - add git commit convention guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(50653)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50653c89)
  - update component development guidelines and clarify task scopes &nbsp;-&nbsp; by **soybeanfe** [<samp>(942aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/942aadfd)
  - update Vue SFC guidelines for attrs handling and template structure &nbsp;-&nbsp; by **soybeanfe** [<samp>(4f5b5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4f5b545a)
- **progress**:
  - update class name descriptions and improve API documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(d1327)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d132782f)
- **projects**:
  - update AGENTS and README &nbsp;-&nbsp; by @soybeanjs [<samp>(e94d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e94d7ca0)
- **readme**:
  - add compact aggregator explanation for headless components &nbsp;-&nbsp; by @soybeanjs [<samp>(fa6e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fa6e81b8)
- **roadmap**:
  - add initial roadmap for SoybeanUI improvements &nbsp;-&nbsp; by @soybeanjs [<samp>(8ad7b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ad7babf)
- **rules**:
  - add AI assistant bridge guidelines and routing instructions &nbsp;-&nbsp; by **soybeanfe** [<samp>(b66a5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b66a5a18)
- **skill**:
  - add playground examples and documentation requirements &nbsp;-&nbsp; by @soybeanjs [<samp>(0c8b7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0c8b7f73)
  - update SKILL.md and checklist.md for barrel file and constants registration &nbsp;-&nbsp; by @soybeanjs [<samp>(944ca)</samp>](https://github.com/soybeanjs/soybean-ui/commit/944ca79d)
  - add accessibility and RTL adaptation guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(1cb41)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1cb41c66)
  - add requirement for component key insertion in sidebar menu &nbsp;-&nbsp; by @soybeanjs [<samp>(43638)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43638086)
  - add guidelines for reusing global types and defining context types &nbsp;-&nbsp; by @soybeanjs [<samp>(eaf07)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eaf07258)
  - add guidelines for CSS variable naming conventions &nbsp;-&nbsp; by @soybeanjs [<samp>(2a030)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2a030143)
  - add principles for deriving state in context callbacks &nbsp;-&nbsp; by @soybeanjs [<samp>(91222)</samp>](https://github.com/soybeanjs/soybean-ui/commit/91222e6a)
  - update component development guidelines and add props forwarding strategy &nbsp;-&nbsp; by @soybeanjs [<samp>(d4c79)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d4c7939d)
  - update context consumption guidelines and checklist for Vue SFC &nbsp;-&nbsp; by @soybeanjs [<samp>(14b3e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/14b3e994)
  - enhance component development guidelines and checklist &nbsp;-&nbsp; by @soybeanjs [<samp>(4caf1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4caf1452)
- **table**:
  - update bordered prop type to boolean &nbsp;-&nbsp; by @soybeanjs [<samp>(c2a23)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c2a23a72)
- **toast**:
  - update toast component documentation for clarity and usage examples &nbsp;-&nbsp; by @soybeanjs [<samp>(9e4f4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9e4f4580)
- **todos**:
  - add component optimization tasks to TODO list &nbsp;-&nbsp; by @soybeanjs [<samp>(46b9c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46b9c716)

### &nbsp;&nbsp;&nbsp;🌊 Types

- **components**: remove SDialogPure from global components declaration &nbsp;-&nbsp; by @soybeanjs [<samp>(68e59)</samp>](https://github.com/soybeanjs/soybean-ui/commit/68e592e1)
- **router**: add experimental param parser type import &nbsp;-&nbsp; by @soybeanjs [<samp>(6fce5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6fce5cdd)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **ci**:
  - add CI workflow for type checking, linting, and testing &nbsp;-&nbsp; by @soybeanjs [<samp>(c26b8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c26b8026)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(a6ee3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a6ee3b01)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(35549)</samp>](https://github.com/soybeanjs/soybean-ui/commit/35549aa4)
  - add pnpm overrides for vite-ssg and update jsdom version &nbsp;-&nbsp; by @soybeanjs [<samp>(46994)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46994a85)
  - add @vueuse/core dependency &nbsp;-&nbsp; by @soybeanjs [<samp>(a8d78)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a8d787bf)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(a10c1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a10c1b73)
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(5c153)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c153499)
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(c521e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c521e8bf)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(86efb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/86efb34d)
- **gitignore**:
  - add .omx to ignore list &nbsp;-&nbsp; by @soybeanjs [<samp>(97a5b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/97a5bc06)
  - update .omx entry to ignore directory &nbsp;-&nbsp; by @soybeanjs [<samp>(9ed11)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9ed11978)
- **roadmap**:
  - remove outdated roadmap document &nbsp;-&nbsp; by @soybeanjs [<samp>(94a50)</samp>](https://github.com/soybeanjs/soybean-ui/commit/94a507f9)
- **todos**:
  - remove outdated TODO list for component optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(29a30)</samp>](https://github.com/soybeanjs/soybean-ui/commit/29a30499)
- **types**:
  - update vue-router typings &nbsp;-&nbsp; by @soybeanjs [<samp>(c08dd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c08dda61)
  - update type files &nbsp;-&nbsp; by **soybean-js** and **Copilot** [<samp>(ef368)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ef368576)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **affix**: add provideAffixUi for headless affix component to fix test &nbsp;-&nbsp; by @soybeanjs [<samp>(bf9b0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bf9b0dcc)
- **menu**: add unit tests for SMenuOptions keyboard navigation &nbsp;-&nbsp; by @soybeanjs [<samp>(a4532)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a4532fef)
- **setup**: add global test setup to mock fetch requests for iconify &nbsp;-&nbsp; by @soybeanjs [<samp>(5c9e2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c9e2f4d)
- **toast**: update mount reference from Toaster to SToaster in tests &nbsp;-&nbsp; by @soybeanjs [<samp>(acbd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/acbd4920)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **clipboard**:
  - adjust SClipboard component structure in examples for better readability &nbsp;-&nbsp; by **soybeanfe** [<samp>(a36d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a36d2f51)
- **color**:
  - update component classes for consistent sizing &nbsp;-&nbsp; by **soybeanfe** [<samp>(59664)</samp>](https://github.com/soybeanjs/soybean-ui/commit/596641ef)
- **components**:
  - update 'focus-visible:outline-none' to 'outline-none' &nbsp;-&nbsp; by **soybeanfe** [<samp>(68aed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/68aed81b)
- **editable**:
  - update layout for consistent sizing in editable examples &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(c7634)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c76340c1)
- **menu**:
  - change cursor style from default to pointer for menu items &nbsp;-&nbsp; by @soybeanjs [<samp>(c47ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c47ff1d0)
- **projects**:
  - format code &nbsp;-&nbsp; by @soybeanjs [<samp>(adf72)</samp>](https://github.com/soybeanjs/soybean-ui/commit/adf7262d)
  - update unocss order &nbsp;-&nbsp; by **soybean-js** [<samp>(54031)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5403193c)
- **table**:
  - remove fixed property from column definition &nbsp;-&nbsp; by **soybeanfe** [<samp>(dd475)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dd475bd5)
- **variants**:
  - update sidebarWrapper and rail styles for responsive layout &nbsp;-&nbsp; by **soybeanfe** [<samp>(67180)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6718016f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;
[Copilot](mailto:copilot@github.com),&nbsp;[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[soybean-js](mailto:soybeanjs@163.com),&nbsp;

## [v0.15.0-beta.4](https://github.com/soybeanjs/soybean-ui/compare/v0.15.0-beta.3...v0.15.0-beta.4) (2026-04-26)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **variants**: update sidebarWrapper and rail styles for responsive layout &nbsp;-&nbsp; by **soybeanfe** [<samp>(67180)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6718016f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[soybeanfe](mailto:honghuangdc@gmail.com)

## [v0.15.0-beta.3](https://github.com/soybeanjs/soybean-ui/compare/v0.15.0-beta.2...v0.15.0-beta.3) (2026-04-26)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **dialog**: Implement DialogCompact and refactor `useDialog` &nbsp;-&nbsp; by @soybeanjs [<samp>(39019)</samp>](https://github.com/soybeanjs/soybean-ui/commit/39019743)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **accordion**:
  - add AccordionDescription component and update related files &nbsp;-&nbsp; by **soybeanfe** [<samp>(6506e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6506e753)
- **api**:
  - add script to generate component API documentation &nbsp;-&nbsp; by **soybean-js** [<samp>(a76f9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a76f983b)
  - add new components and update existing API documentation &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(65037)</samp>](https://github.com/soybeanjs/soybean-ui/commit/650376bb)
- **components**:
  - Implement InputOpt component &nbsp;-&nbsp; by @soybeanjs, **soybean-js** and @MicrosoftCopilot [<samp>(8b299)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8b299b21)
  - Implement Backtop component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a6ed9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a6ed9d81)
  - Implement Clipboard component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(96d89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/96d8929d)
- **date**:
  - add shared headless date utilities for upcoming date components &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(15609)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1560971f)
- **dialog**:
  - enable showConfirm prop in DialogCompact component &nbsp;-&nbsp; by **soybeanfe** [<samp>(e8a13)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e8a13e04)
- **headless**:
  - generate components and namespaced files dynamically &nbsp;-&nbsp; by **soybean-js** [<samp>(aa563)</samp>](https://github.com/soybeanjs/soybean-ui/commit/aa563242)
- **listbox**:
  - add clearable prop and enhance model value change handling &nbsp;-&nbsp; by **soybeanfe** [<samp>(a686c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a686c1a0)
- **progress**:
  - add imperative progress provider api and remove loading-bar wrapper. closed #129 &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/129 [<samp>(5f90a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5f90a644)
- **projects**:
  - support script to generate components api &nbsp;-&nbsp; by **soybean-js** [<samp>(93c81)</samp>](https://github.com/soybeanjs/soybean-ui/commit/93c8190f)
- **selection**:
  - enhance selection behavior and add boolean casting utility &nbsp;-&nbsp; by **soybeanfe** [<samp>(50076)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50076d2a)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **checkbox**: update forwardedProps to omit 'class' instead of 'label' &nbsp;-&nbsp; by **soybeanfe** [<samp>(0d537)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0d5375c8)
- **components**: add compact implementations for anchor, checkbox, and segment components &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(477cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/477cb8a3)
- **select**: replace singleClearable with clearable in context props &nbsp;-&nbsp; by **soybeanfe** [<samp>(ca438)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca438af5)
- **selection**: replace singleClearable with clearable prop &nbsp;-&nbsp; by **soybeanfe** [<samp>(540de)</samp>](https://github.com/soybeanjs/soybean-ui/commit/540de77a)
- **table**: improve column sorting logic in getColumns function &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(4de50)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4de507e6)
- **vite**: update import path for UiResolver &nbsp;-&nbsp; by **soybean-js** [<samp>(80db3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/80db388e)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **accordion**: reorganize imports and update slot structure for Accordion components &nbsp;-&nbsp; by **soybean-js** [<samp>(22707)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2270794d)
- **affix**: reorganize type exports and clean up unused interfaces &nbsp;-&nbsp; by **soybean-js** [<samp>(7675b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7675bba7)
- **alert**: reorganize AlertContent type and exports &nbsp;-&nbsp; by **soybean-js** [<samp>(09bf0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/09bf0f5e)
- **carousel**: add loop option to SCarousel component &nbsp;-&nbsp; by **soybeanfe** [<samp>(78d17)</samp>](https://github.com/soybeanjs/soybean-ui/commit/78d17f0e)
- **dialog**: enhance slot props binding for DialogCompact component &nbsp;-&nbsp; by **soybeanfe** [<samp>(a3c2d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a3c2d5a4)
- **toast**: optimize toast api and icon,button render &nbsp;-&nbsp; by @soybeanjs and **soybean-js** [<samp>(080c2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/080c2359)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **api**:
  - simplify type reference collection and improve symbol resolution &nbsp;-&nbsp; by **soybean-js** [<samp>(3d77e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3d77e22d)
- **combobox**:
  - refactor combobox component &nbsp;-&nbsp; by @soybeanjs, @MicrosoftCopilot and **soybeanfe** [<samp>(5dec4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5dec4fd1)
- **components**:
  - Implement some compact components &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a1c14)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a1c140cc)
  - rename "IconRender" to "icon" in headless &nbsp;-&nbsp; by **soybean-js** [<samp>(6970e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6970e828)
- **progress**:
  - Refactor ProgressProvider and progress api &nbsp;-&nbsp; by @soybeanjs, **soybean-js** and @MicrosoftCopilot [<samp>(c60cf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c60cf09a)
- **projects**:
  - remove bottom-sheet &nbsp;-&nbsp; by **soybeanfe** [<samp>(0a26f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0a26f3ea)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **instructions**: update Vue SFC guidelines for attrs handling and template structure &nbsp;-&nbsp; by **soybeanfe** [<samp>(4f5b5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4f5b545a)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(c521e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c521e8bf)
- **types**: update type files &nbsp;-&nbsp; by **soybean-js** and **Copilot** [<samp>(ef368)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ef368576)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **clipboard**: adjust SClipboard component structure in examples for better readability &nbsp;-&nbsp; by **soybeanfe** [<samp>(a36d2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a36d2f51)
- **color**: update component classes for consistent sizing &nbsp;-&nbsp; by **soybeanfe** [<samp>(59664)</samp>](https://github.com/soybeanjs/soybean-ui/commit/596641ef)
- **components**: update 'focus-visible:outline-none' to 'outline-none' &nbsp;-&nbsp; by **soybeanfe** [<samp>(68aed)</samp>](https://github.com/soybeanjs/soybean-ui/commit/68aed81b)
- **editable**: update layout for consistent sizing in editable examples &nbsp;-&nbsp; by **soybeanfe** and **Copilot** [<samp>(c7634)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c76340c1)
- **projects**: update unocss order &nbsp;-&nbsp; by **soybean-js** [<samp>(54031)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5403193c)
- **table**: remove fixed property from column definition &nbsp;-&nbsp; by **soybeanfe** [<samp>(dd475)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dd475bd5)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[soybean-js](mailto:soybeanjs@163.com),&nbsp;[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;[Copilot](mailto:copilot@github.com),&nbsp;

## [v0.15.0-beta.2](https://github.com/soybeanjs/soybean-ui/compare/v0.15.0-beta.1...v0.15.0-beta.2) (2026-04-18)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **form**: update form input and output types for schema validation &nbsp;-&nbsp; by @soybeanjs [<samp>(3b792)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3b792d13)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.15.0-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.14.0...v0.15.0-beta.1) (2026-04-18)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **a11y**:
  - add axe-core for accessibility testing and implement a11y tests for components &nbsp;-&nbsp; by @soybeanjs [<samp>(c348f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c348fb6d)
- **accordion**:
  - Implement AccordionCompact component and update related types and context &nbsp;-&nbsp; by @soybeanjs [<samp>(e05b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e05b3237)
- **components**:
  - Implement progress component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(df4d5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/df4d5285)
  - Implment Slider component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(e7f1d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e7f1d5ee)
  - Implement Skeleton component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(03705)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0370519b)
  - Implement Toggle component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(f3134)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f3134893)
  - Implement ToggleGroup component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(70476)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70476c4c)
  - Implement Color related components: ColorArea, ColorField, ColorSlider, ColorSwatch, ColorSwatchPicker, ColorPicker &nbsp;-&nbsp; by @soybeanjs [<samp>(66c16)</samp>](https://github.com/soybeanjs/soybean-ui/commit/66c16f3a)
  - Implement ScrollArea component &nbsp;-&nbsp; by @soybeanjs [<samp>(a500f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a500ffb1)
  - Implement HoverCard component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(87e9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/87e9fb9e)
  - Implement Spinner component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(33809)</samp>](https://github.com/soybeanjs/soybean-ui/commit/33809035)
  - Implement Affix component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(8ac9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ac9f94a)
  - Implement Empty component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(fef94)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fef945bb)
  - Implement Editable component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(2f87c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2f87c3cc)
  - Implement BottomSheet component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(03d4d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/03d4dc17)
  - Implement useLoadingBar based Progress &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(e6aef)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e6aefe5a)
  - Implement Autocomplete component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(fc269)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fc269a16)
  - Implement Stepper component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(09d81)</samp>](https://github.com/soybeanjs/soybean-ui/commit/09d8132f)
  - Implement Splitter component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(3076c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3076ce27)
  - Implement TagsInput component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(05392)</samp>](https://github.com/soybeanjs/soybean-ui/commit/05392bf8)
  - Implement Combobox component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(b9c4d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b9c4d8da)
  - Implement Toolbar component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(a500b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a500b841)
  - Implement Carousel component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(6f584)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6f584f9f)
  - Implement Anchor component &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(24b2e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/24b2ed3e)
  - Implement Menubar component &nbsp;-&nbsp; by @soybeanjs and @MicrosoftCopilot [<samp>(341cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/341cbe39)
- **docs**:
  - add comprehensive guidelines for soybean-ui component development, testing, and documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(13935)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1393569c)
- **headless**:
  - add IconRender component with customizable icon rendering in headless &nbsp;-&nbsp; by @soybeanjs [<samp>(3e877)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3e877a9b)
- **menu**:
  - add MenuSubAttributeContext and integrate into menu components &nbsp;-&nbsp; by @soybeanjs [<samp>(7bc9f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7bc9ffcf)
- **prompt**:
  - add soybean-ui-component development prompt &nbsp;-&nbsp; by @soybeanjs [<samp>(73d4e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/73d4e35c)
- **roadmap**:
  - update testing coverage and CI/CD sections with completed tasks &nbsp;-&nbsp; by @soybeanjs [<samp>(febb0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/febb0535)
- **skill**:
  - add component development guidelines and coding standards references &nbsp;-&nbsp; by @soybeanjs [<samp>(21de4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/21de445c)
  - add Vue SFC organization guidelines and update checklist for script setup order &nbsp;-&nbsp; by @soybeanjs [<samp>(d20de)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d20de727)
  - add guidelines for headless aggregate components and icon rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(1e350)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1e3509e9)
- **table**:
  - Implementation with a new TableCompact, supports grouped headers, sorting/filtering, fixed columns, column resizing, tree rows, and virtualization. closed #97. &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/97 [<samp>(72a94)</samp>](https://github.com/soybeanjs/soybean-ui/commit/72a9425b)
  - implement logical fixed columns and text alignment for RTL support &nbsp;-&nbsp; by @soybeanjs [<samp>(c0fd5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c0fd5c5d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **components**: update component names of Toast &nbsp;-&nbsp; by @soybeanjs [<samp>(d8c6a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d8c6acda)
- **focus-scope**: add auto-focus event handling for open and close actions &nbsp;-&nbsp; by @soybeanjs [<samp>(2cd3c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2cd3c4ce)
- **menu**: correct focus handling in PopperPositioner and RovingFocusGroup &nbsp;-&nbsp; by @soybeanjs [<samp>(68b9d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/68b9d584)
- **namespaced**: simplify ColorSwatch export &nbsp;-&nbsp; by @soybeanjs [<samp>(0830a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0830acff)
- **playground**: remove 'square' shape variant of skeleton &nbsp;-&nbsp; by @soybeanjs [<samp>(1b635)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b635bec)
- **spinner**: update secondary and accent color variants to include opacity &nbsp;-&nbsp; by @soybeanjs [<samp>(132e9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/132e9896)
- **table**: remove redundant bordered prop from table components &nbsp;-&nbsp; by @soybeanjs [<samp>(e2387)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e23872c4)
- **tests**: simplify format selection logic in color picker tests &nbsp;-&nbsp; by @soybeanjs [<samp>(0b4e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0b4e6b48)
- **toggle**: add shape prop to ToggleProps and update forwardedProps &nbsp;-&nbsp; by @soybeanjs [<samp>(63f21)</samp>](https://github.com/soybeanjs/soybean-ui/commit/63f21829)
- **tree-menu**: fix collapsible ui context in tree menu &nbsp;-&nbsp; by @soybeanjs [<samp>(fbb4b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fbb4bf38)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **accordion**:
  - optimize slot template types &nbsp;-&nbsp; by @soybeanjs [<samp>(db7a1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/db7a1348)
- **affix**:
  - enhance target resolution to support string selectors and direct elements &nbsp;-&nbsp; by @soybeanjs [<samp>(7c212)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7c2124df)
- **anchor**:
  - enhance anchor component with location hash sync and optimize code &nbsp;-&nbsp; by @soybeanjs [<samp>(3b126)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3b1267b1)
- **autocomplete**:
  - add prioritizePosition prop to enhance positioning logic &nbsp;-&nbsp; by @soybeanjs [<samp>(1a2ba)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1a2ba8a5)
- **color-picker**:
  - optimize style &nbsp;-&nbsp; by @soybeanjs [<samp>(a9d4a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a9d4abe8)
- **combobox**:
  - add prioritizePosition prop to enhance positioning logic &nbsp;-&nbsp; by @soybeanjs [<samp>(b7a16)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b7a16697)
- **skeleton**:
  - remove 'square' shape variant from Skeleton component &nbsp;-&nbsp; by @soybeanjs [<samp>(50651)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50651159)
- **skill**:
  - remove outdated references to .github/instructions &nbsp;-&nbsp; by @soybeanjs [<samp>(e1c89)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e1c891ce)
- **slider**:
  - clean up props handling and improve readability &nbsp;-&nbsp; by @soybeanjs [<samp>(012f2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/012f257e)
- **table**:
  - remove unused data table components and types &nbsp;-&nbsp; by @soybeanjs [<samp>(e5683)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e5683916)
  - enhance table components with improved column width handling and additional properties &nbsp;-&nbsp; by @soybeanjs [<samp>(b31ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b31ff550)
  - simplify bordered prop and update table styles &nbsp;-&nbsp; by @soybeanjs [<samp>(6d8cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6d8cb722)
  - remove unused useSlots import and streamline slot definition &nbsp;-&nbsp; by @soybeanjs [<samp>(434ae)</samp>](https://github.com/soybeanjs/soybean-ui/commit/434aec23)
- **toggle-group**:
  - update variant options and remove outline example &nbsp;-&nbsp; by @soybeanjs [<samp>(34cf7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/34cf782c)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **affix**: refactor Affix component: split three headless components &nbsp;-&nbsp; by @soybeanjs [<samp>(47d99)</samp>](https://github.com/soybeanjs/soybean-ui/commit/47d994b8)
- **components**: Implement Toast component inspire by vue-sonner &nbsp;-&nbsp; by @soybeanjs in https://github.com/soybeanjs/soybean-ui/issues/126 [<samp>(4fdd8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4fdd8e9b)
- **menu**: Implement Menu Compact components &nbsp;-&nbsp; by @soybeanjs [<samp>(a1e6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a1e6d340)
- **table**: Refactor `STable` aggregation into headless `Table` &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(53678)</samp>](https://github.com/soybeanjs/soybean-ui/commit/53678f8c)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **agents**:
  - update components development skill &nbsp;-&nbsp; by @soybeanjs [<samp>(102be)</samp>](https://github.com/soybeanjs/soybean-ui/commit/102be284)
  - update generation date and enhance component descriptions &nbsp;-&nbsp; by @soybeanjs [<samp>(a5678)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a567824d)
- **checklist**:
  - update checklist for component development with unit testing guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(60cfe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/60cfe183)
- **instructions**:
  - add TypeScript functional style and import order guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(6c09a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6c09aa03)
  - add git commit convention guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(50653)</samp>](https://github.com/soybeanjs/soybean-ui/commit/50653c89)
  - update component development guidelines and clarify task scopes &nbsp;-&nbsp; by **soybeanfe** [<samp>(942aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/942aadfd)
- **progress**:
  - update class name descriptions and improve API documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(d1327)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d132782f)
- **projects**:
  - update AGENTS and README &nbsp;-&nbsp; by @soybeanjs [<samp>(e94d7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e94d7ca0)
- **readme**:
  - add compact aggregator explanation for headless components &nbsp;-&nbsp; by @soybeanjs [<samp>(fa6e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fa6e81b8)
- **roadmap**:
  - add initial roadmap for SoybeanUI improvements &nbsp;-&nbsp; by @soybeanjs [<samp>(8ad7b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8ad7babf)
- **rules**:
  - add AI assistant bridge guidelines and routing instructions &nbsp;-&nbsp; by **soybeanfe** [<samp>(b66a5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b66a5a18)
- **skill**:
  - add playground examples and documentation requirements &nbsp;-&nbsp; by @soybeanjs [<samp>(0c8b7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0c8b7f73)
  - update SKILL.md and checklist.md for barrel file and constants registration &nbsp;-&nbsp; by @soybeanjs [<samp>(944ca)</samp>](https://github.com/soybeanjs/soybean-ui/commit/944ca79d)
  - add accessibility and RTL adaptation guidelines &nbsp;-&nbsp; by @soybeanjs [<samp>(1cb41)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1cb41c66)
  - add requirement for component key insertion in sidebar menu &nbsp;-&nbsp; by @soybeanjs [<samp>(43638)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43638086)
  - add guidelines for reusing global types and defining context types &nbsp;-&nbsp; by @soybeanjs [<samp>(eaf07)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eaf07258)
  - add guidelines for CSS variable naming conventions &nbsp;-&nbsp; by @soybeanjs [<samp>(2a030)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2a030143)
  - add principles for deriving state in context callbacks &nbsp;-&nbsp; by @soybeanjs [<samp>(91222)</samp>](https://github.com/soybeanjs/soybean-ui/commit/91222e6a)
  - update component development guidelines and add props forwarding strategy &nbsp;-&nbsp; by @soybeanjs [<samp>(d4c79)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d4c7939d)
  - update context consumption guidelines and checklist for Vue SFC &nbsp;-&nbsp; by @soybeanjs [<samp>(14b3e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/14b3e994)
  - enhance component development guidelines and checklist &nbsp;-&nbsp; by @soybeanjs [<samp>(4caf1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4caf1452)
- **table**:
  - update bordered prop type to boolean &nbsp;-&nbsp; by @soybeanjs [<samp>(c2a23)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c2a23a72)
- **toast**:
  - update toast component documentation for clarity and usage examples &nbsp;-&nbsp; by @soybeanjs [<samp>(9e4f4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9e4f4580)
- **todos**:
  - add component optimization tasks to TODO list &nbsp;-&nbsp; by @soybeanjs [<samp>(46b9c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46b9c716)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **ci**:
  - add CI workflow for type checking, linting, and testing &nbsp;-&nbsp; by @soybeanjs [<samp>(c26b8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c26b8026)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(a6ee3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a6ee3b01)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(35549)</samp>](https://github.com/soybeanjs/soybean-ui/commit/35549aa4)
  - add pnpm overrides for vite-ssg and update jsdom version &nbsp;-&nbsp; by @soybeanjs [<samp>(46994)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46994a85)
  - add @vueuse/core dependency &nbsp;-&nbsp; by @soybeanjs [<samp>(a8d78)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a8d787bf)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(a10c1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a10c1b73)
  - update deps &nbsp;-&nbsp; by **soybeanfe** [<samp>(5c153)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c153499)
- **gitignore**:
  - add .omx to ignore list &nbsp;-&nbsp; by @soybeanjs [<samp>(97a5b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/97a5bc06)
  - update .omx entry to ignore directory &nbsp;-&nbsp; by @soybeanjs [<samp>(9ed11)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9ed11978)
- **roadmap**:
  - remove outdated roadmap document &nbsp;-&nbsp; by @soybeanjs [<samp>(94a50)</samp>](https://github.com/soybeanjs/soybean-ui/commit/94a507f9)
- **todos**:
  - remove outdated TODO list for component optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(29a30)</samp>](https://github.com/soybeanjs/soybean-ui/commit/29a30499)
- **types**:
  - update vue-router typings &nbsp;-&nbsp; by @soybeanjs [<samp>(c08dd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c08dda61)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **affix**: add provideAffixUi for headless affix component to fix test &nbsp;-&nbsp; by @soybeanjs [<samp>(bf9b0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bf9b0dcc)
- **menu**: add unit tests for SMenuOptions keyboard navigation &nbsp;-&nbsp; by @soybeanjs [<samp>(a4532)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a4532fef)
- **setup**: add global test setup to mock fetch requests for iconify &nbsp;-&nbsp; by @soybeanjs [<samp>(5c9e2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5c9e2f4d)
- **toast**: update mount reference from Toaster to SToaster in tests &nbsp;-&nbsp; by @soybeanjs [<samp>(acbd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/acbd4920)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **menu**: change cursor style from default to pointer for menu items &nbsp;-&nbsp; by @soybeanjs [<samp>(c47ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c47ff1d0)
- **projects**: format code &nbsp;-&nbsp; by @soybeanjs [<samp>(adf72)</samp>](https://github.com/soybeanjs/soybean-ui/commit/adf7262d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;
[soybeanfe](mailto:honghuangdc@gmail.com),&nbsp;

## [v0.14.0](https://github.com/soybeanjs/soybean-ui/compare/v0.13.8...v0.14.0) (2026-04-03)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tooltip**: enhance positioner props and context integration &nbsp;-&nbsp; by @soybeanjs [<samp>(5ce78)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5ce78414)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **hide-others**:
  - add check to skip hiding elements inside closed native popovers &nbsp;-&nbsp; by @soybeanjs [<samp>(a4cf8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a4cf8226)
- **menu-item**:
  - integrate menu context for pointer event handling &nbsp;-&nbsp; by @soybeanjs [<samp>(2457e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2457ecc2)
- **toast**:
  - add feature attribute to VisuallyHidden component &nbsp;-&nbsp; by @soybeanjs [<samp>(4dc6d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4dc6d5f8)
  - remove unnecessary aria attributes from VisuallyHidden and ToastAnnounce components &nbsp;-&nbsp; by @soybeanjs [<samp>(044dc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/044dcd43)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **components**: remove props prefix in template &nbsp;-&nbsp; by @soybeanjs [<samp>(dd253)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dd253c39)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **menu**: enhance menu item radio and checkbox components &nbsp;-&nbsp; by @soybeanjs [<samp>(233ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/233ffade)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(1cebe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1cebe04a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.8](https://github.com/soybeanjs/soybean-ui/compare/v0.13.7...v0.13.8) (2026-03-24)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dialog**: update content styles for responsive design &nbsp;-&nbsp; by @soybeanjs [<samp>(77fa2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/77fa2e4e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.7](https://github.com/soybeanjs/soybean-ui/compare/v0.13.6...v0.13.7) (2026-03-23)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(6b41f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6b41f473)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.6](https://github.com/soybeanjs/soybean-ui/compare/v0.13.5...v0.13.6) (2026-03-22)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: enhance column handling in getColumns function for improved type support &nbsp;-&nbsp; by **Soybean** [<samp>(7c72b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7c72bb64)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[Soybean](mailto:soybeanjs@outlook.com)

## [v0.13.5](https://github.com/soybeanjs/soybean-ui/compare/v0.13.4...v0.13.5) (2026-03-22)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: ensure columns are checked by default and filter checks accordingly &nbsp;-&nbsp; by **Soybean** [<samp>(945b5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/945b5e5d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[Soybean](mailto:soybeanjs@outlook.com)

## [v0.13.4](https://github.com/soybeanjs/soybean-ui/compare/v0.13.3...v0.13.4) (2026-03-22)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: reorder exports for consistency and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(25840)</samp>](https://github.com/soybeanjs/soybean-ui/commit/25840a45)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.3](https://github.com/soybeanjs/soybean-ui/compare/v0.13.2...v0.13.3) (2026-03-21)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **button**: add type prop to ButtonProps interface and update default props &nbsp;-&nbsp; by @soybeanjs [<samp>(1a0b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1a0b9f41)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.2](https://github.com/soybeanjs/soybean-ui/compare/v0.13.1...v0.13.2) (2026-03-21)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **form-field**: correct order of useFormFieldUi calls in computed class &nbsp;-&nbsp; by @soybeanjs [<samp>(4cfd8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4cfd84e4)
- **selection**: remove default value comment for singleClearable property &nbsp;-&nbsp; by @soybeanjs [<samp>(338a2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/338a2a52)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(30d25)</samp>](https://github.com/soybeanjs/soybean-ui/commit/30d25841)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.1](https://github.com/soybeanjs/soybean-ui/compare/v0.13.0...v0.13.1) (2026-03-20)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **table**: add onFetched callback to usePaginatedTable for handling fetched data &nbsp;-&nbsp; by @soybeanjs [<samp>(22928)</samp>](https://github.com/soybeanjs/soybean-ui/commit/22928699)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.13.0](https://github.com/soybeanjs/soybean-ui/compare/v0.12.4...v0.13.0) (2026-03-20)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **styles**: add transition-all-150 to interactive components for smooth hover & focus animations. closed #98 &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/98 [<samp>(1de7e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1de7e511)
- **table**: implement useTable and usePaginatedTable hooks with pagination support &nbsp;-&nbsp; by @soybeanjs [<samp>(1ae61)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1ae619bd)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: update fetch method in usePaginatedTable hook &nbsp;-&nbsp; by @soybeanjs [<samp>(c54b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c54b978b)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **composables**: simplify useUi type definition and improve type safety &nbsp;-&nbsp; by @soybeanjs [<samp>(3c077)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3c077899)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **types**: remove 'justify' and 'char' options from TableAlign type &nbsp;-&nbsp; by @soybeanjs [<samp>(eaf01)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eaf014af)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: update AGENTS.md for improved clarity and structure across headless and UI layers &nbsp;-&nbsp; by @soybeanjs [<samp>(1b3db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b3db61d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(fc0f0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fc0f0288)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(29758)</samp>](https://github.com/soybeanjs/soybean-ui/commit/29758b05)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(9fb13)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9fb13ff8)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(b67fc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b67fce8b)
- **gitattributes**:
  - simplify line endings configuration for all file types &nbsp;-&nbsp; by @soybeanjs [<samp>(1261f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1261fdfb)
- **vscode**:
  - update recommended extensions &nbsp;-&nbsp; by @soybeanjs [<samp>(ce4e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce4e6821)
- **workflow**:
  - update actions and pnpm setup to latest versions &nbsp;-&nbsp; by @soybeanjs [<samp>(b4525)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b4525b96)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;

## [v0.13.0-beta.1](https://github.com/soybeanjs/soybean-ui/compare/v0.12.4...v0.13.0-beta.1) (2026-03-20)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **styles**: add transition-all-150 to interactive components for smooth hover & focus animations. closed #98 &nbsp;-&nbsp; by @MicrosoftCopilot in https://github.com/soybeanjs/soybean-ui/issues/98 [<samp>(1de7e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1de7e511)
- **table**: implement useTable and usePaginatedTable hooks with pagination support &nbsp;-&nbsp; by @soybeanjs [<samp>(1ae61)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1ae619bd)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **composables**: simplify useUi type definition and improve type safety &nbsp;-&nbsp; by @soybeanjs [<samp>(3c077)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3c077899)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **types**: remove 'justify' and 'char' options from TableAlign type &nbsp;-&nbsp; by @soybeanjs [<samp>(eaf01)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eaf014af)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: update AGENTS.md for improved clarity and structure across headless and UI layers &nbsp;-&nbsp; by @soybeanjs [<samp>(1b3db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b3db61d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(fc0f0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fc0f0288)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(29758)</samp>](https://github.com/soybeanjs/soybean-ui/commit/29758b05)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(9fb13)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9fb13ff8)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(b67fc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b67fce8b)
- **gitattributes**:
  - simplify line endings configuration for all file types &nbsp;-&nbsp; by @soybeanjs [<samp>(1261f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1261fdfb)
- **vscode**:
  - update recommended extensions &nbsp;-&nbsp; by @soybeanjs [<samp>(ce4e6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ce4e6821)
- **workflow**:
  - update actions and pnpm setup to latest versions &nbsp;-&nbsp; by @soybeanjs [<samp>(b4525)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b4525b96)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;

## [v0.12.4](https://github.com/soybeanjs/soybean-ui/compare/v0.12.3...v0.12.4) (2026-03-07)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **variants**: reduce z-index for fullContent layout variants &nbsp;-&nbsp; by @soybeanjs [<samp>(1dc2c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1dc2ca9c)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.12.3](https://github.com/soybeanjs/soybean-ui/compare/v0.12.2...v0.12.3) (2026-03-07)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tsconfig**: add 'vite/client' to types for improved type support &nbsp;-&nbsp; by @soybeanjs [<samp>(38151)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3815125d)
- **ui**: fix beforeConfirm and beforeCancel of Popconfirm and AlertDialog &nbsp;-&nbsp; by @soybeanjs [<samp>(51070)</samp>](https://github.com/soybeanjs/soybean-ui/commit/510705ae)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.12.2](https://github.com/soybeanjs/soybean-ui/compare/v0.12.1...v0.12.2) (2026-03-07)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dismissable-layer**:
  - improve DOM tree containment check and add helper function &nbsp;-&nbsp; by @soybeanjs [<samp>(ec5dd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec5dd25c)
- **select**:
  - omit 'disableOutsidePointerEvents' from popperPositionerProps &nbsp;-&nbsp; by @soybeanjs [<samp>(57e0a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/57e0a5aa)
  - prevent triggering click event when dropdown is open &nbsp;-&nbsp; by @soybeanjs [<samp>(a26f3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a26f3d25)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.12.1](https://github.com/soybeanjs/soybean-ui/compare/v0.12.0...v0.12.1) (2026-03-07)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **dialog**: update dialog content styles to use w-max for better responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(eb13c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eb13c50d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @MicrosoftCopilot [<samp>(b30b1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b30b1ba7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;[![MicrosoftCopilot](https://github.com/MicrosoftCopilot.png?size=48)](https://github.com/MicrosoftCopilot)&nbsp;&nbsp;

## [v0.12.0](https://github.com/soybeanjs/soybean-ui/compare/v0.11.4...v0.12.0) (2026-03-07)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **alert-dialog**: rename Action to Confirm, update props, update useDialog file position &nbsp;-&nbsp; by @soybeanjs [<samp>(65e59)</samp>](https://github.com/soybeanjs/soybean-ui/commit/65e59349)
- **hooks**: refactor `useContext` and update related usage &nbsp;-&nbsp; by @soybeanjs [<samp>(9e741)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9e74124b)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **popover**: add PopoverCloseEmits and beforeClose prop; update PopoverPositioner default props &nbsp;-&nbsp; by @soybeanjs [<samp>(08e1c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/08e1c498)
- **ui**: implement component Popconfirm &nbsp;-&nbsp; by @soybeanjs [<samp>(6e917)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6e917009)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tooltip**: add default prop for avoidCollisions in TooltipPositioner; bind triggerProps to TooltipTrigger &nbsp;-&nbsp; by @soybeanjs [<samp>(e024c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e024c231)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.11.4](https://github.com/soybeanjs/soybean-ui/compare/v0.11.3...v0.11.4) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **alert-dialog**: bind content class to merged slot variants &nbsp;-&nbsp; by @soybeanjs [<samp>(2ed12)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2ed12324)
- **dialog**: add min-width constraints to dialog content sizes &nbsp;-&nbsp; by @soybeanjs [<samp>(9a5e1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9a5e1989)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.11.3](https://github.com/soybeanjs/soybean-ui/compare/v0.11.2...v0.11.3) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **dialog**: update max-width for dialog size variants &nbsp;-&nbsp; by @soybeanjs [<samp>(417a0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/417a0b37)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.11.2](https://github.com/soybeanjs/soybean-ui/compare/v0.11.1...v0.11.2) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **dialog**: add class prop to bind content class &nbsp;-&nbsp; by @soybeanjs [<samp>(1e779)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1e7791bc)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.11.1](https://github.com/soybeanjs/soybean-ui/compare/v0.11.0...v0.11.1) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **pagination**: add leading and trailing slots &nbsp;-&nbsp; by @soybeanjs [<samp>(b03ba)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b03baf86)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.11.0](https://github.com/soybeanjs/soybean-ui/compare/v0.10.6...v0.11.0) (2026-03-06)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **pagination**: rename itemsPerPage to pageSize and support update pageSize by event &nbsp;-&nbsp; by @soybeanjs [<samp>(7817c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7817c828)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.6](https://github.com/soybeanjs/soybean-ui/compare/v0.10.5...v0.10.6) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **table**: adjust header z-index and set multiple default to true &nbsp;-&nbsp; by @soybeanjs [<samp>(f56cf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f56cfc90)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.5](https://github.com/soybeanjs/soybean-ui/compare/v0.10.4...v0.10.5) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **card**: update content styles &nbsp;-&nbsp; by @soybeanjs [<samp>(5a26c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5a26ced0)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.4](https://github.com/soybeanjs/soybean-ui/compare/v0.10.3...v0.10.4) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **select**: set singleClearable prop default to true &nbsp;-&nbsp; by @soybeanjs [<samp>(9ebd1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9ebd10da)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.3](https://github.com/soybeanjs/soybean-ui/compare/v0.10.2...v0.10.3) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dialog**: remove unnecessary sm: prefix from rounded-lg class &nbsp;-&nbsp; by @soybeanjs [<samp>(30fd6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/30fd60fa)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.2](https://github.com/soybeanjs/soybean-ui/compare/v0.10.1...v0.10.2) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **form**: update label style to prevent text wrapping &nbsp;-&nbsp; by @soybeanjs [<samp>(2bbce)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2bbce25e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.1](https://github.com/soybeanjs/soybean-ui/compare/v0.10.0...v0.10.1) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **card**: add default prop 'asChild' to SCardCollapsibleTrigger &nbsp;-&nbsp; by @soybeanjs [<samp>(3201c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3201cc25)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **card**: add 'SCardCollapsibleTrigger' to card components &nbsp;-&nbsp; by @soybeanjs [<samp>(d070a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d070a917)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.10.0](https://github.com/soybeanjs/soybean-ui/compare/v0.9.4...v0.10.0) (2026-03-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **card**: add collapsible functionality and update API props &nbsp;-&nbsp; by @soybeanjs [<samp>(e7891)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e78917d2)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **form**: simplify inline field styles in formVariants &nbsp;-&nbsp; by @soybeanjs [<samp>(bafd3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bafd3bc2)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(6defb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6defbac1)
- **tsdown**: update config &nbsp;-&nbsp; by @soybeanjs [<samp>(eec64)</samp>](https://github.com/soybeanjs/soybean-ui/commit/eec645a4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.9.4](https://github.com/soybeanjs/soybean-ui/compare/v0.9.3...v0.9.4) (2026-03-05)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **form**: optimize form variants &nbsp;-&nbsp; by @soybeanjs [<samp>(5e736)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e736467)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.9.3](https://github.com/soybeanjs/soybean-ui/compare/v0.9.2...v0.9.3) (2026-03-05)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **form**: add SFormFieldBase component export &nbsp;-&nbsp; by @soybeanjs [<samp>(c0ee8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c0ee8467)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **names**: add Table component and update form component exports &nbsp;-&nbsp; by @soybeanjs [<samp>(1a4f5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1a4f5fc3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.9.2](https://github.com/soybeanjs/soybean-ui/compare/v0.9.1...v0.9.2) (2026-03-05)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **form**: add FormControl component and update form structure &nbsp;-&nbsp; by **Soybean** [<samp>(58c98)</samp>](https://github.com/soybeanjs/soybean-ui/commit/58c982c1)
- **select**: add single clearable option and example &nbsp;-&nbsp; by **Soybean** [<samp>(d24b2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d24b2172)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**: add Vue Devtools plugin to Vite configuration &nbsp;-&nbsp; by **Soybean** [<samp>(6f989)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6f98942d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[Soybean](mailto:soybeanjs@outlook.com)

## [v0.9.1](https://github.com/soybeanjs/soybean-ui/compare/v0.9.0...v0.9.1) (2026-03-03)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **code-block**: remove debug log from renderCode function &nbsp;-&nbsp; by @soybeanjs [<samp>(7491f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7491f375)
- **command**: fix search options &nbsp;-&nbsp; by @soybeanjs [<samp>(2e26c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2e26c75c)
- **header-nav**: simplify menu item linkProps and update SNavigationMenu usage &nbsp;-&nbsp; by @soybeanjs [<samp>(592cb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/592cb4e2)
- **layout**: add background color to sidebar for better visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(1ce3f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1ce3f00b)
- **theme**: update default base color from gray to zinc &nbsp;-&nbsp; by @soybeanjs [<samp>(4b5fa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4b5fac5f)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **layout**: optimize layout styles &nbsp;-&nbsp; by @soybeanjs [<samp>(f5d4d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f5d4d710)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **table**: add table docs and examples &nbsp;-&nbsp; by @soybeanjs [<samp>(43882)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43882d6a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.9.0](https://github.com/soybeanjs/soybean-ui/compare/v0.8.1...v0.9.0) (2026-03-01)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **components**: rename NumberInput to InputNumber &nbsp;-&nbsp; by @soybeanjs [<samp>(6de5a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6de5a8f1)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **table**: add table component with context, variants, and example usage &nbsp;-&nbsp; by @soybeanjs [<samp>(0fdfd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0fdfdb6c)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **checkbox**: conditionally render CheckboxLabel based on slot or label presence; update root variant style &nbsp;-&nbsp; by @soybeanjs [<samp>(78f2b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/78f2bfbe)
- **docs**: fix code-block style &nbsp;-&nbsp; by @soybeanjs [<samp>(643db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/643dbce1)
- **lint**: update lint script to include eslint for code formatting &nbsp;-&nbsp; by @soybeanjs [<samp>(be24e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/be24e042)
- **lint-staged**: update lint-staged command to use oxlint and oxfmt &nbsp;-&nbsp; by @soybeanjs [<samp>(46817)</samp>](https://github.com/soybeanjs/soybean-ui/commit/46817e5f)
- **table**: remove unused TableCaptionProps from types &nbsp;-&nbsp; by @soybeanjs [<samp>(8dde2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8dde2c21)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **composables**: update useSelection to support MaybeRefOrGetter for props &nbsp;-&nbsp; by @soybeanjs [<samp>(3ded4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3ded4f75)
- **headless**: update VirtualizerContent to extend PrimitiveProps &nbsp;-&nbsp; by @soybeanjs [<samp>(3832f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3832f27c)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(f4eac)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f4eac405)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(1290d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1290de29)
- **projects**:
  - use eslint to lint vue &nbsp;-&nbsp; by @soybeanjs [<samp>(f8077)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f8077a75)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **projects**: fix eslint lint code &nbsp;-&nbsp; by @soybeanjs [<samp>(d9cbb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d9cbbe2a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.8.1](https://github.com/soybeanjs/soybean-ui/compare/v0.8.0...v0.8.1) (2026-02-11)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **config**: update entry pattern for component variants in uno.config.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(314e5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/314e5839)
- **projects**: fix import tailwindPalette from '@soybeanjs/colord/palette' in docs &nbsp;-&nbsp; by @soybeanjs [<samp>(309e7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/309e7ca0)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(1aa0b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1aa0bffe)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.8.0](https://github.com/soybeanjs/soybean-ui/compare/v0.7.1...v0.8.0) (2026-02-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **number-input**: add focusOnChange prop to enhance user experience &nbsp;-&nbsp; by @soybeanjs [<samp>(38523)</samp>](https://github.com/soybeanjs/soybean-ui/commit/38523803)
- **popper**: add hideShiftedArrow prop to control arrow visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(6ce45)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6ce45594)
- **tabs**: add registerContentId and unregisterContentId for dynamic content management &nbsp;-&nbsp; by @soybeanjs [<samp>(c58fa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c58fa207)
- **toast**: add disableSwipe prop to control swipe-to-close functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(32d53)</samp>](https://github.com/soybeanjs/soybean-ui/commit/32d53a74)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **accordion**:
  - add default value for unmountOnHide prop &nbsp;-&nbsp; by @soybeanjs [<samp>(1f86b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1f86b28f)
- **listbox**:
  - remove prevent default from keydown event handler &nbsp;-&nbsp; by @soybeanjs [<samp>(cb095)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cb09572a)
  - support dynamic estimateSize function in ListboxVirtualizerProps &nbsp;-&nbsp; by @soybeanjs [<samp>(751b6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/751b61a3)
- **navigation-menu**:
  - add event listener for root content dismiss in context &nbsp;-&nbsp; by @soybeanjs [<samp>(0e1cf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0e1cf983)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **context-menu**: remove unused triggerElement from context menu props &nbsp;-&nbsp; by @soybeanjs [<samp>(0c3c1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0c3c10a6)
- **dom**: remove unused function getAriaLabelByVNode &nbsp;-&nbsp; by @soybeanjs [<samp>(b5dfa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b5dfa4bf)
- **grace-area**: add cleanup for pointer in transit state on component dispose &nbsp;-&nbsp; by @soybeanjs [<samp>(73aa8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/73aa8fad)
- **select**: add disableOutsidePointerEvents prop to enhance interaction and simplify arrow visibility logic &nbsp;-&nbsp; by @soybeanjs [<samp>(f5048)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f5048445)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **tooltip**: simplify ariaLabel computation and remove unused slots &nbsp;-&nbsp; by @soybeanjs [<samp>(2fa29)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2fa29ef0)
- **ui**: split variants to every components &nbsp;-&nbsp; by @soybeanjs [<samp>(944db)</samp>](https://github.com/soybeanjs/soybean-ui/commit/944db498)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: update skills and README &nbsp;-&nbsp; by @soybeanjs [<samp>(a26fd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a26fdc05)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.7.1](https://github.com/soybeanjs/soybean-ui/compare/v0.7.0...v0.7.1) (2026-02-09)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **projects**: fix missing methods &nbsp;-&nbsp; by @soybeanjs [<samp>(60712)</samp>](https://github.com/soybeanjs/soybean-ui/commit/60712bb9)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.7.0](https://github.com/soybeanjs/soybean-ui/compare/v0.6.6...v0.7.0) (2026-02-09)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **tree-menu**: add TreeMenuOptions component and enhance context management &nbsp;-&nbsp; by @soybeanjs [<samp>(4878f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4878f0ba)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.6](https://github.com/soybeanjs/soybean-ui/compare/v0.6.5...v0.6.6) (2026-02-09)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **config-provider**: enhance theme variable management with useStorage &nbsp;-&nbsp; by @soybeanjs [<samp>(1a002)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1a002016)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dialog, toast**: update global window properties to use \__SoybeanUI_ prefix &nbsp;-&nbsp; by @soybeanjs [<samp>(0e3d4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0e3d49dd)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.5](https://github.com/soybeanjs/soybean-ui/compare/v0.6.4...v0.6.5) (2026-02-08)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **page-tabs**: omit beforeClose prop from forwardedProps &nbsp;-&nbsp; by @soybeanjs [<samp>(37fba)</samp>](https://github.com/soybeanjs/soybean-ui/commit/37fba8dd)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.4](https://github.com/soybeanjs/soybean-ui/compare/v0.6.3...v0.6.4) (2026-02-08)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **button-icon**: support iconClass prop &nbsp;-&nbsp; by @soybeanjs [<samp>(d96ec)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d96ece31)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(2f80e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2f80e81c)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.3](https://github.com/soybeanjs/soybean-ui/compare/v0.6.2...v0.6.3) (2026-02-08)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **layout**: add background color to tab and content variants &nbsp;-&nbsp; by @soybeanjs [<samp>(d7ab2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d7ab267e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.2](https://github.com/soybeanjs/soybean-ui/compare/v0.6.1...v0.6.2) (2026-02-08)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **page-tabs**: fix scroll centerX value &nbsp;-&nbsp; by @soybeanjs [<samp>(1dadd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1dadda7b)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.1](https://github.com/soybeanjs/soybean-ui/compare/v0.6.0...v0.6.1) (2026-02-07)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **page-tabs**: add sorting functionality for tabs based on pinned status &nbsp;-&nbsp; by @soybeanjs [<samp>(f5bac)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f5bacad3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.6.0](https://github.com/soybeanjs/soybean-ui/compare/v0.5.9...v0.6.0) (2026-02-07)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **page-tabs**: simplify context and state management, remove unused operations &nbsp;-&nbsp; by @soybeanjs [<samp>(ded83)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ded83e90)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**: update oxlint,oxfmt config &nbsp;-&nbsp; by @soybeanjs [<samp>(d7bdf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d7bdff81)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.9](https://github.com/soybeanjs/soybean-ui/compare/v0.5.8...v0.5.9) (2026-02-07)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **layout**: update main and root styles for layout variants &nbsp;-&nbsp; by @soybeanjs [<samp>(4bea2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4bea25d1)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.8](https://github.com/soybeanjs/soybean-ui/compare/v0.5.7...v0.5.8) (2026-02-07)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **layout**: add tabVisible and footerVisible props to LayoutProps &nbsp;-&nbsp; by @soybeanjs [<samp>(af2b6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/af2b6b7e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.7](https://github.com/soybeanjs/soybean-ui/compare/v0.5.6...v0.5.7) (2026-02-07)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(55aec)</samp>](https://github.com/soybeanjs/soybean-ui/commit/55aec4f4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.6](https://github.com/soybeanjs/soybean-ui/compare/v0.5.5...v0.5.6) (2026-02-07)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **projects**: optimize theme &nbsp;-&nbsp; by @soybeanjs [<samp>(5fcbb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5fcbb9cf)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.5](https://github.com/soybeanjs/soybean-ui/compare/v0.5.4...v0.5.5) (2026-02-06)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.4](https://github.com/soybeanjs/soybean-ui/compare/v0.5.3...v0.5.4) (2026-02-06)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **ui**: add localPrefix support for local icon names &nbsp;-&nbsp; by @soybeanjs [<samp>(fd6bc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fd6bc8e9)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **dependencies**: add @standard-schema/spec to dependencies and remove from devDependencies &nbsp;-&nbsp; by @soybeanjs [<samp>(2a5ec)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2a5ec2c2)
- **projects**: add external deps to fix build &nbsp;-&nbsp; by @soybeanjs [<samp>(da0ea)</samp>](https://github.com/soybeanjs/soybean-ui/commit/da0eae01)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **vite.config**: correct import casing for Vue and Unocss &nbsp;-&nbsp; by @soybeanjs [<samp>(dad63)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dad639d0)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**:
  - rename update-pkg script to upkg for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(bf815)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bf815bf4)
  - add necessary deps and update tsdown config &nbsp;-&nbsp; by @soybeanjs [<samp>(8685b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8685bf1d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.3](https://github.com/soybeanjs/soybean-ui/compare/v0.5.2...v0.5.3) (2026-02-05)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tabs**: add nextTick to watchEffect to get dom &nbsp;-&nbsp; by @soybeanjs [<samp>(00dcd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00dcd86e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.2](https://github.com/soybeanjs/soybean-ui/compare/v0.5.1...v0.5.2) (2026-02-05)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **variants**: add overflow-hidden to main layout variants &nbsp;-&nbsp; by @soybeanjs [<samp>(ff5f5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ff5f5315)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.5.1](https://github.com/soybeanjs/soybean-ui/compare/v0.5.0...v0.5.1) (2026-02-05)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **ui**: enhance pageTabsVariants for dark mode support and improve hover effects &nbsp;-&nbsp; by @soybeanjs [<samp>(a66d8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a66d8697)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **components**: add a copy button to the demo code. &nbsp;-&nbsp; by **skyfeiz** [<samp>(5b9ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5b9ffac1)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(5e6b9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e6b99a7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[skyfeiz](mailto:webzhangfei@163.com)

## [v0.5.0](https://github.com/soybeanjs/soybean-ui/compare/v0.4.6...v0.5.0) (2026-02-04)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **ui**:
  - add onClose callback to dialog state and update dialog-provider to use it &nbsp;-&nbsp; by @soybeanjs [<samp>(cab93)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cab93a37)
  - enhance useToast options with onClose callback and refactor toast handling &nbsp;-&nbsp; by @soybeanjs [<samp>(944c2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/944c28f9)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.6](https://github.com/soybeanjs/soybean-ui/compare/v0.4.5...v0.4.6) (2026-02-04)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **ui**: add return type annotations to useDialog and useToast functions &nbsp;-&nbsp; by @soybeanjs [<samp>(2cdc8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2cdc8860)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.5](https://github.com/soybeanjs/soybean-ui/compare/v0.4.4...v0.4.5) (2026-02-04)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **ui**: expose useDialog and useToast globally for external access &nbsp;-&nbsp; by @soybeanjs [<samp>(92eaf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/92eafb3d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **card**: wrap header slot content for improved structure and rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(c07bf)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c07bff3f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.4](https://github.com/soybeanjs/soybean-ui/compare/v0.4.3...v0.4.4) (2026-02-03)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **icons**: support nullish icon value and remove unnecessary v-if checks for icon rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(43f54)</samp>](https://github.com/soybeanjs/soybean-ui/commit/43f54fd4)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(b07ff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b07ffa02)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.3](https://github.com/soybeanjs/soybean-ui/compare/v0.4.2...v0.4.3) (2026-02-01)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **page-tabs**: fix tab closing functions &nbsp;-&nbsp; by @soybeanjs [<samp>(ca73e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca73e49e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.2](https://github.com/soybeanjs/soybean-ui/compare/v0.4.1...v0.4.2) (2026-02-01)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **page-tabs**: optimize page-tabs logic &nbsp;-&nbsp; by @soybeanjs [<samp>(a2a1c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a2a1c3d5)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.1](https://github.com/soybeanjs/soybean-ui/compare/v0.4.0...v0.4.1) (2026-02-01)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **page-tabs**: refactor context and operations for improved tab management &nbsp;-&nbsp; by @soybeanjs [<samp>(2b884)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2b884ccf)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.4.0](https://github.com/soybeanjs/soybean-ui/compare/v0.3.3...v0.4.0) (2026-02-01)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **components**: implement components PageTabs &nbsp;-&nbsp; by @soybeanjs [<samp>(d2c4a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d2c4a1d1)
- **docs**: update component status and add PageTabs to the README &nbsp;-&nbsp; by @soybeanjs [<samp>(02c40)</samp>](https://github.com/soybeanjs/soybean-ui/commit/02c406d3)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **typings**: clean up auto-imports and components type declarations &nbsp;-&nbsp; by @soybeanjs [<samp>(dc394)</samp>](https://github.com/soybeanjs/soybean-ui/commit/dc394713)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **projects**: update vue-router to v5, use vite-plugin-vue-meta-layouts &nbsp;-&nbsp; by @soybeanjs [<samp>(bfb6b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bfb6b66e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.3.3](https://github.com/soybeanjs/soybean-ui/compare/v0.3.2...v0.3.3) (2026-01-30)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **examples**: add demo menu data &nbsp;-&nbsp; by @soybeanjs [<samp>(ceb58)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ceb58781)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tree-menu**: add active-value binding to dropdown menu &nbsp;-&nbsp; by @soybeanjs [<samp>(18f74)</samp>](https://github.com/soybeanjs/soybean-ui/commit/18f74c15)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.3.2](https://github.com/soybeanjs/soybean-ui/compare/v0.3.1...v0.3.2) (2026-01-29)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **layout**: add LayoutContent component and update layout structure &nbsp;-&nbsp; by @soybeanjs [<samp>(f5515)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f5515498)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **ui**: optimize config-provider &nbsp;-&nbsp; by @soybeanjs [<samp>(f2eb5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f2eb5a8a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.3.1](https://github.com/soybeanjs/soybean-ui/compare/v0.3.0...v0.3.1) (2026-01-29)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **projects**: use oxlint and oxfmt replace eslint, prettier &nbsp;-&nbsp; by @soybeanjs [<samp>(9f91c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9f91c4b3)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(35363)</samp>](https://github.com/soybeanjs/soybean-ui/commit/353630a7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.3.0](https://github.com/soybeanjs/soybean-ui/compare/v0.2.8...v0.3.0) (2026-01-29)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **menu**: support active state &nbsp;-&nbsp; by @soybeanjs [<samp>(32476)</samp>](https://github.com/soybeanjs/soybean-ui/commit/32476719)
- **tree-menu**: implement active path tracking and update child active state logic &nbsp;-&nbsp; by @soybeanjs [<samp>(6d5e8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/6d5e886d)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: add getTreePaths function and update tree-menu component to use it &nbsp;-&nbsp; by @soybeanjs [<samp>(c6391)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c6391c9e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.8](https://github.com/soybeanjs/soybean-ui/compare/v0.2.7...v0.2.8) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tree-menu**:
  - update open state logic in TreeMenuCollapsible component &nbsp;-&nbsp; by @soybeanjs [<samp>(5e892)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e892eb6)
  - add select-dropdown event emission in TreeMenuOption component &nbsp;-&nbsp; by @soybeanjs [<samp>(7852c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7852cb0c)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.7](https://github.com/soybeanjs/soybean-ui/compare/v0.2.6...v0.2.7) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tree-menu**: ensure new menu objects are created in filterHiddenMenus function &nbsp;-&nbsp; by @soybeanjs [<samp>(5579b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5579b369)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.6](https://github.com/soybeanjs/soybean-ui/compare/v0.2.5...v0.2.6) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tree-menu**: enhance filtering logic for hidden menus and update child visibility checks &nbsp;-&nbsp; by @soybeanjs [<samp>(4bd8a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4bd8a2ee)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.5](https://github.com/soybeanjs/soybean-ui/compare/v0.2.4...v0.2.5) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: adjust spacing and padding for size variants in TreeMenu &nbsp;-&nbsp; by @soybeanjs [<samp>(f9249)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f924960c)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.4](https://github.com/soybeanjs/soybean-ui/compare/v0.2.3...v0.2.4) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **tree-menu**: update hasChildren computation to exclude hidden children &nbsp;-&nbsp; by @soybeanjs [<samp>(f3343)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f3343a51)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: improve children filtering logic in TreeMenuOption and TreeMenu &nbsp;-&nbsp; by @soybeanjs [<samp>(7955e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7955e36e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.3](https://github.com/soybeanjs/soybean-ui/compare/v0.2.2...v0.2.3) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **link**: update href prop description and type &nbsp;-&nbsp; by @soybeanjs [<samp>(3d935)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3d935300)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.2](https://github.com/soybeanjs/soybean-ui/compare/v0.2.1...v0.2.2) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **command**: add placeholder prop to CommandProps &nbsp;-&nbsp; by @soybeanjs [<samp>(390fd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/390fdc43)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.1](https://github.com/soybeanjs/soybean-ui/compare/v0.2.0...v0.2.1) (2026-01-28)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **command**: refactor command type definition &nbsp;-&nbsp; by @soybeanjs [<samp>(0e2ad)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0e2ad99b)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.2.0](https://github.com/soybeanjs/soybean-ui/compare/v0.1.13...v0.2.0) (2026-01-28)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **tree-menu**: refactor type definition and add hidden property &nbsp;-&nbsp; by @soybeanjs [<samp>(23110)</samp>](https://github.com/soybeanjs/soybean-ui/commit/23110eb3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.13](https://github.com/soybeanjs/soybean-ui/compare/v0.1.12...v0.1.13) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tree-menu**: add item visibility control to tree menu options &nbsp;-&nbsp; by @soybeanjs [<samp>(70ac1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/70ac1c83)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.12](https://github.com/soybeanjs/soybean-ui/compare/v0.1.11...v0.1.12) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: change TreeMenuGroupOptionData to a type and remove redundant properties &nbsp;-&nbsp; by @soybeanjs [<samp>(40685)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4068590e)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.11](https://github.com/soybeanjs/soybean-ui/compare/v0.1.10...v0.1.11) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **menu**: add focus-visible outline to popup for better accessibility &nbsp;-&nbsp; by @soybeanjs [<samp>(f5509)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f5509564)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.10](https://github.com/soybeanjs/soybean-ui/compare/v0.1.9...v0.1.10) (2026-01-28)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tree-menu**:
  - add showGroupIcon prop to control group icon visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(62193)</samp>](https://github.com/soybeanjs/soybean-ui/commit/621932d1)
  - enhance TreeMenuOption with new props for better customization &nbsp;-&nbsp; by @soybeanjs [<samp>(69033)</samp>](https://github.com/soybeanjs/soybean-ui/commit/69033371)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.9](https://github.com/soybeanjs/soybean-ui/compare/v0.1.8...v0.1.9) (2026-01-28)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **ui**: simplify linkProps handling and enhance link integration &nbsp;-&nbsp; by @soybeanjs [<samp>(ec72f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ec72f06f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.8](https://github.com/soybeanjs/soybean-ui/compare/v0.1.7...v0.1.8) (2026-01-27)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: remove unused useTreeMenuUi import and refactor styled item component &nbsp;-&nbsp; by @soybeanjs [<samp>(7e505)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7e505bb1)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.7](https://github.com/soybeanjs/soybean-ui/compare/v0.1.6...v0.1.7) (2026-01-27)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **tree-menu**: update groupRoot margin styles for better layout &nbsp;-&nbsp; by @soybeanjs [<samp>(e3fb2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e3fb2eb4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.6](https://github.com/soybeanjs/soybean-ui/compare/v0.1.5...v0.1.6) (2026-01-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **layout**: add customizable header, tab, and footer heights &nbsp;-&nbsp; by @soybeanjs [<samp>(17258)</samp>](https://github.com/soybeanjs/soybean-ui/commit/17258af0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **home**: update GitHub link in the playground component &nbsp;-&nbsp; by @soybeanjs [<samp>(64e03)</samp>](https://github.com/soybeanjs/soybean-ui/commit/64e0322e)
- **projects**: revert headless package.json exports &nbsp;-&nbsp; by @soybeanjs [<samp>(732c5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/732c5a88)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.5](https://github.com/soybeanjs/soybean-ui/compare/v0.1.4...v0.1.5) (2026-01-27)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **link**: remove unused custom prop and simplify href handling &nbsp;-&nbsp; by @soybeanjs [<samp>(98386)</samp>](https://github.com/soybeanjs/soybean-ui/commit/98386b20)
- **tree-menu**: remove unused collapsedWidth prop from TreeMenuRootProps &nbsp;-&nbsp; by @soybeanjs [<samp>(7a4fd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7a4fd36e)
- **vite**: remove vite-plugin-vue-devtools from plugins &nbsp;-&nbsp; by @soybeanjs [<samp>(9c789)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9c7891ee)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.4](https://github.com/soybeanjs/soybean-ui/compare/v0.1.3...v0.1.4) (2026-01-27)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tree-menu**: extend TreeMenuOptionData with custom properties and update type definitions &nbsp;-&nbsp; by @soybeanjs [<samp>(12721)</samp>](https://github.com/soybeanjs/soybean-ui/commit/12721d8f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.3](https://github.com/soybeanjs/soybean-ui/compare/v0.1.2...v0.1.3) (2026-01-26)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **tree-menu**: enhance TreeMenuStyledItem with computed classes and props interface &nbsp;-&nbsp; by @soybeanjs [<samp>(c6bc8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c6bc8082)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(75a7f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/75a7ffcb)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.2](https://github.com/soybeanjs/soybean-ui/compare/v0.1.1...v0.1.2) (2026-01-23)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **types**: export ThemeOptions type from config provider &nbsp;-&nbsp; by @soybeanjs [<samp>(09613)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0961309f)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.1](https://github.com/soybeanjs/soybean-ui/compare/v0.1.0...v0.1.1) (2026-01-23)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **layout**: add default props for side, variant, and collapsible &nbsp;-&nbsp; by @soybeanjs [<samp>(203e7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/203e7b0d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **types**: export ThemeOptions type from config provider &nbsp;-&nbsp; by @soybeanjs [<samp>(95f29)</samp>](https://github.com/soybeanjs/soybean-ui/commit/95f296e4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.1.0](https://github.com/soybeanjs/soybean-ui/compare/v0.0.20...v0.1.0) (2026-01-22)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**: add component development workflow documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(162c2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/162c2114)
- **link**: enhance slot binding for Link component and update styles &nbsp;-&nbsp; by @soybeanjs [<samp>(d41b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d41b39e7)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **headless**: optimize components order and add missing components &nbsp;-&nbsp; by @soybeanjs [<samp>(06f22)</samp>](https://github.com/soybeanjs/soybean-ui/commit/06f22d55)
- **variants**: remove unnecessary classes from layout and tabs content &nbsp;-&nbsp; by @soybeanjs [<samp>(57dc8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/57dc82b0)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **menus**: rename data entry to forms and reorder menu items &nbsp;-&nbsp; by @soybeanjs [<samp>(d2dcd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d2dcd8c8)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(45c3a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/45c3aeb3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.20](https://github.com/soybeanjs/soybean-ui/compare/v0.0.19...v0.0.20) (2026-01-21)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **docs**:
  - add CopyButton component to code block and integrate with markdown rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(e7153)</samp>](https://github.com/soybeanjs/soybean-ui/commit/e7153d4e)
  - playground components support preview code &nbsp;-&nbsp; by @soybeanjs [<samp>(00422)</samp>](https://github.com/soybeanjs/soybean-ui/commit/00422ca4)
  - add theming documentation and related components &nbsp;-&nbsp; by @soybeanjs [<samp>(31cbb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/31cbbc3e)
- **link**:
  - enhance slot functionality and improve forwarded props handling &nbsp;-&nbsp; by @soybeanjs [<samp>(384df)</samp>](https://github.com/soybeanjs/soybean-ui/commit/384df908)
- **locale-toggler**:
  - add locale icons and sort locales for improved display &nbsp;-&nbsp; by @soybeanjs [<samp>(0e59d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0e59d67b)
- **menu**:
  - support indicator position &nbsp;-&nbsp; by @soybeanjs [<samp>(f7da3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f7da3c39)
- **opencode**:
  - add GitHub Actions workflow for opencode functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(820fe)</samp>](https://github.com/soybeanjs/soybean-ui/commit/820fe9fe)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **deps**: move shiki to dependencies &nbsp;-&nbsp; by @soybeanjs [<samp>(ca0a7)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca0a71a7)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **docs**:
  - optimize sidebar menu data define &nbsp;-&nbsp; by @soybeanjs [<samp>(edb12)</samp>](https://github.com/soybeanjs/soybean-ui/commit/edb1249f)
  - optimize docs &nbsp;-&nbsp; by @soybeanjs [<samp>(47240)</samp>](https://github.com/soybeanjs/soybean-ui/commit/472404e8)
- **headless**:
  - optimize config-provider context &nbsp;-&nbsp; by @soybeanjs [<samp>(876d9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/876d9e95)
- **locales**:
  - standardize key naming conventions and update translations &nbsp;-&nbsp; by @soybeanjs [<samp>(553b6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/553b6e8e)
- **markdown**:
  - implement base64 encoding for code snippets in copyCodePlugin &nbsp;-&nbsp; by @soybeanjs [<samp>(8213a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8213a0ba)
- **ui**:
  - optimize config-provider context &nbsp;-&nbsp; by @soybeanjs [<samp>(d9187)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d91872c0)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **projects**: refactor i18n for pages and optimize other i18n &nbsp;-&nbsp; by @soybeanjs [<samp>(ee2ac)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ee2acba0)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **agents**: add comprehensive documentation for SoybeanUI architecture, including headless and styled UI layers, conventions, and development workflows &nbsp;-&nbsp; by @soybeanjs [<samp>(a681b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a681bf34)
- **button**: update documentation for Button component, including overview, main features, and API details &nbsp;-&nbsp; by @soybeanjs [<samp>(4d06f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4d06fc31)
- **checkbox**: fix markdown format &nbsp;-&nbsp; by @soybeanjs [<samp>(762c9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/762c96f8)
- **icon**: update type definition format for IconValue prop &nbsp;-&nbsp; by @soybeanjs [<samp>(58ec2)</samp>](https://github.com/soybeanjs/soybean-ui/commit/58ec2303)
- **projects**: update components docs &nbsp;-&nbsp; by @soybeanjs [<samp>(f577c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f577ca2c)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**:
  - optimize code &nbsp;-&nbsp; by @soybeanjs [<samp>(49645)</samp>](https://github.com/soybeanjs/soybean-ui/commit/496453c2)
  - update deps & fix ts types error &nbsp;-&nbsp; by @soybeanjs [<samp>(b6e3b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b6e3bdfd)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **header-nav**: update activeClass for navigation links to enhance styling &nbsp;-&nbsp; by @soybeanjs [<samp>(fcfd4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/fcfd4bab)
- **tables**: update heading styles for improved readability &nbsp;-&nbsp; by @soybeanjs [<samp>(3fb7d)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3fb7d490)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.19](https://github.com/soybeanjs/soybean-ui/compare/v0.0.18...v0.0.19) (2026-01-19)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **checkbox**: support enter keyboard to toggle checked state &nbsp;-&nbsp; by @soybeanjs [<samp>(75ddd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/75ddd2de)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **projects**: remove unocss presetTypography & optimize docs style &nbsp;-&nbsp; by @soybeanjs [<samp>(2dd6a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2dd6a3e9)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.18](https://github.com/soybeanjs/soybean-ui/compare/v0.0.17...v0.0.18) (2026-01-19)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **variants**: update focus ring styles for improved accessibility &nbsp;-&nbsp; by @soybeanjs [<samp>(7fe60)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7fe608eb)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.17](https://github.com/soybeanjs/soybean-ui/compare/v0.0.16...v0.0.17) (2026-01-19)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **package**: add preview:docs script for documentation preview &nbsp;-&nbsp; by @soybeanjs [<samp>(9f7b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9f7b3bfb)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **popover**: add disable-outside-pointer-events binding to PopoverPositionerImpl &nbsp;-&nbsp; by @soybeanjs [<samp>(1c945)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1c945f8b)
- **select**: bind slot names correctly in SSelectSingleOption &nbsp;-&nbsp; by @soybeanjs [<samp>(5e278)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5e278ca1)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **config-provider**: cache theme CSS variables &nbsp;-&nbsp; by @soybeanjs [<samp>(78e49)</samp>](https://github.com/soybeanjs/soybean-ui/commit/78e49459)
- **projects**: optimize docs theme configurator &nbsp;-&nbsp; by @soybeanjs [<samp>(35273)</samp>](https://github.com/soybeanjs/soybean-ui/commit/35273f19)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **config-provider**:
  - add theme styling support with Shadcn theme integration &nbsp;-&nbsp; by @soybeanjs [<samp>(cb4dd)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cb4dd886)
  - remove unused useStyleTag and bind cssVars to Primitive &nbsp;-&nbsp; by @soybeanjs [<samp>(a3ee0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a3ee007e)
  - remove unused theme options from props &nbsp;-&nbsp; by @soybeanjs [<samp>(b731c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b731c8c9)
- **select**:
  - simplify type definitions and improve variant styles &nbsp;-&nbsp; by @soybeanjs [<samp>(219c5)</samp>](https://github.com/soybeanjs/soybean-ui/commit/219c5344)
  - integrate useSelectUi in various components for improved styling &nbsp;-&nbsp; by @soybeanjs [<samp>(088f9)</samp>](https://github.com/soybeanjs/soybean-ui/commit/088f9986)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.16](https://github.com/soybeanjs/soybean-ui/compare/v0.0.15...v0.0.16) (2026-01-17)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **theme**: refactor theme &nbsp;-&nbsp; by @soybeanjs [<samp>(4b6b3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/4b6b3faa)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.15](https://github.com/soybeanjs/soybean-ui/compare/v0.0.14...v0.0.15) (2026-01-14)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**:
  - fix headless package.json exports &nbsp;-&nbsp; by @soybeanjs [<samp>(0ef4c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/0ef4cf60)
  - update @soybeanjs/unocss-shadcn and adjust imports in theme customizer components &nbsp;-&nbsp; by @soybeanjs [<samp>(76bf4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/76bf4ace)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.14](https://github.com/soybeanjs/soybean-ui/compare/v0.0.13...v0.0.14) (2026-01-14)

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **layout**: replace mobile media query with isMobile boolean for improved layout handling &nbsp;-&nbsp; by @soybeanjs [<samp>(3718f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3718f891)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **components**: modify Badge docs. &nbsp;-&nbsp; by **skyfeiz** [<samp>(bc59a)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bc59a4cd)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(78876)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7887614c)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;
[skyfeiz](mailto:webzhangfei@163.com)

## [v0.0.13](https://github.com/soybeanjs/soybean-ui/compare/v0.0.12...v0.0.13) (2026-01-09)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **layout**: adjust breadcrumb spacing and enhance content area for better layout consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(c595b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c595bba4)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **projects**: update @soybeanjs/unocss-shadcn and @soybeanjs/unocss-preset & update unocss config &nbsp;-&nbsp; by @soybeanjs [<samp>(ba5b4)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ba5b49d4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.12](https://github.com/soybeanjs/soybean-ui/compare/v0.0.11...v0.0.12) (2026-01-08)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **command**: add bottom slot to command component and refine groupLabel styles for improved layout &nbsp;-&nbsp; by @soybeanjs [<samp>(1f199)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1f199dbb)
- **docs**: search-document: add bottom slot to enhance user interaction with navigation options &nbsp;-&nbsp; by @soybeanjs [<samp>(9b550)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9b550b24)
- **search**: enhance search-document component with dynamic menu items and routing functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(2e5a8)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2e5a8a37)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **config**: integrate Vitest configuration into vite.config.ts and remove vitest.config.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(cd05f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cd05f270)
- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(5afd3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/5afd32e3)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.11](https://github.com/soybeanjs/soybean-ui/compare/v0.0.10...v0.0.11) (2026-01-08)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **app**: add smooth scroll behavior and adjust layout styles for improved user experience &nbsp;-&nbsp; by @soybeanjs [<samp>(23f05)</samp>](https://github.com/soybeanjs/soybean-ui/commit/23f050c0)
- **tree-menu**: add 'as' prop to TreeMenuOption and update related components for improved flexibility in rendering &nbsp;-&nbsp; by @soybeanjs [<samp>(18c0f)</samp>](https://github.com/soybeanjs/soybean-ui/commit/18c0f72b)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **form**: expand form component exports with additional types for improved type safety and flexibility &nbsp;-&nbsp; by @soybeanjs [<samp>(9b8e0)</samp>](https://github.com/soybeanjs/soybean-ui/commit/9b8e0ff5)
- **layout**: update max-width values in configuration and layout files for consistent styling &nbsp;-&nbsp; by @soybeanjs [<samp>(861cc)</samp>](https://github.com/soybeanjs/soybean-ui/commit/861cc3cc)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **config**: add presetSoybeanJS and presetShadcn with type errors ignored &nbsp;-&nbsp; by @soybeanjs [<samp>(3793c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/3793c71f)
- **deps**: update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(f8f90)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f8f90eb7)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.10](https://github.com/soybeanjs/soybean-ui/compare/v0.0.9...v0.0.10) (2026-01-07)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **composable**: introduce useUiContext composable for managing UI class values and context &nbsp;-&nbsp; by @soybeanjs [<samp>(bed68)</samp>](https://github.com/soybeanjs/soybean-ui/commit/bed6859b)
- **form**: add FormResetState type to form component exports for enhanced form state management &nbsp;-&nbsp; by @soybeanjs [<samp>(57e07)</samp>](https://github.com/soybeanjs/soybean-ui/commit/57e072ff)
- **input**: add name and required props to InputControl and InputRoot for enhanced form handling &nbsp;-&nbsp; by @soybeanjs [<samp>(f28c6)</samp>](https://github.com/soybeanjs/soybean-ui/commit/f28c6415)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **selection**: handle model value update correctly by ensuring onUpdateModelValue is called when value is undefined &nbsp;-&nbsp; by @soybeanjs [<samp>(01b95)</samp>](https://github.com/soybeanjs/soybean-ui/commit/01b954c5)

### &nbsp;&nbsp;&nbsp;🛠 Optimizations

- **components**: unify name prop usage across form elements for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(d3f79)</samp>](https://github.com/soybeanjs/soybean-ui/commit/d3f79121)
- **constants**: sort the component constants alphabetically. &nbsp;-&nbsp; by @soybeanjs [<samp>(14c31)</samp>](https://github.com/soybeanjs/soybean-ui/commit/14c312b3)
- **playground**: optimize NavigationMenu example style &nbsp;-&nbsp; by @soybeanjs [<samp>(ecb10)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ecb10b98)
- **variants**: optimize the class enables the class merge to take effect &nbsp;-&nbsp; by @soybeanjs [<samp>(b2fbb)</samp>](https://github.com/soybeanjs/soybean-ui/commit/b2fbbf3e)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **drawer**: update drawer component structure and styling, replacing drawerContentVariants with drawerVariants for improved UI management &nbsp;-&nbsp; by @soybeanjs [<samp>(cfb41)</samp>](https://github.com/soybeanjs/soybean-ui/commit/cfb4111d)
- **form**: restructure form components &nbsp;-&nbsp; by @soybeanjs [<samp>(1af2b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1af2b6c3)
- **layout**: replace sizeRatio with pxToRem function for improved sidebar width calculations and update mobile layout styles &nbsp;-&nbsp; by @soybeanjs [<samp>(ca234)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ca2346d1)
- **projects**: refactor components ui context managing &nbsp;-&nbsp; by @soybeanjs [<samp>(c12aa)</samp>](https://github.com/soybeanjs/soybean-ui/commit/c12aad4b)
- **theme**: update mergeSlotVariants and mergeUi functions to support multiple UI sources for improved class merging &nbsp;-&nbsp; by @soybeanjs [<samp>(8f079)</samp>](https://github.com/soybeanjs/soybean-ui/commit/8f079dd1)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: optimize docs &nbsp;-&nbsp; by @soybeanjs [<samp>(a8a5c)</samp>](https://github.com/soybeanjs/soybean-ui/commit/a8a5c47b)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(7a196)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7a19693b)
  - add valibot and zod dependencies to examples &nbsp;-&nbsp; by @soybeanjs [<samp>(324e3)</samp>](https://github.com/soybeanjs/soybean-ui/commit/324e30aa)
- **package**:
  - remove unused forms entry from package.json to streamline exports &nbsp;-&nbsp; by @soybeanjs [<samp>(2be97)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2be9750d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.9](https://github.com/soybeanjs/soybean-ui/compare/v0.0.8...v0.0.9) (2026-01-02)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **badge**: integrate useAttrs for enhanced class merging in mergeSlotVariants &nbsp;-&nbsp; by @soybeanjs [<samp>(1b456)</samp>](https://github.com/soybeanjs/soybean-ui/commit/1b456e6a)
- **collapse**: add disabledCollapsible prop to prevent toggling and update click handler &nbsp;-&nbsp; by @soybeanjs [<samp>(ac19e)</samp>](https://github.com/soybeanjs/soybean-ui/commit/ac19e8c9)
- **dropdown-menu**: add placement prop to DropdownMenuWrapper and DropdownMenu components &nbsp;-&nbsp; by @soybeanjs [<samp>(04e0b)</samp>](https://github.com/soybeanjs/soybean-ui/commit/04e0bf29)
- **link**: extend LinkProps to include LinkBaseProps and LinkExtraProps, and set default rel attribute &nbsp;-&nbsp; by @soybeanjs [<samp>(7b3f1)</samp>](https://github.com/soybeanjs/soybean-ui/commit/7b3f1596)
- **theme**: enhance mergeSlotVariants function to include root class merging &nbsp;-&nbsp; by @soybeanjs [<samp>(81dff)</samp>](https://github.com/soybeanjs/soybean-ui/commit/81dff657)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **tree-menu**: implement TreeMenu headless component with enhanced structure and styling, including new TreeMenuOption and TreeMenuGroup components &nbsp;-&nbsp; by @soybeanjs [<samp>(21708)</samp>](https://github.com/soybeanjs/soybean-ui/commit/2170869a)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

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
