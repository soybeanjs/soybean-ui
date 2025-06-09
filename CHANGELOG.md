# Changelog


## [v0.0.1-alpha.5](https://github.com/soybean-ui/soybean-headless/compare/v0.0.1-alpha.4...v0.0.1-alpha.5) (2025-06-10)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **accordion**:
  - add theme context for customizable styles across accordion components &nbsp;-&nbsp; by @soybeanjs [<samp>(e7600)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e7600f3)
  - implement Accordion component with props management, customizable slots, and theme context integration &nbsp;-&nbsp; by @soybeanjs [<samp>(a0fcd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a0fcd51)
  - add multiple accordion examples with custom icons and styling options, and integrate Card component examples &nbsp;-&nbsp; by @soybeanjs [<samp>(c6128)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c61289b)
- **card**:
  - introduce card component structure with header, footer, content, title, and description components along with context management &nbsp;-&nbsp; by @soybeanjs [<samp>(396aa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/396aa37)
  - implement Card component with customizable slots, props management, and enhanced styling variants &nbsp;-&nbsp; by @soybeanjs [<samp>(c92bd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c92bd15)
- **composables**:
  - add useIsUsingKeyboard composable to track keyboard usage state &nbsp;-&nbsp; by @soybeanjs [<samp>(b9a25)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b9a2566)
  - add useTypeahead composable for enhanced search functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(bdf4a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/bdf4af7)
- **config**:
  - add path aliases for UI, theme, and variants in TypeScript and Vite configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(a91ad)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a91adf2)
- **dialog, popover**:
  - integrate useHideOthers composable for improved focus management in dialog and popover components &nbsp;-&nbsp; by @soybeanjs [<samp>(f42f6)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f42f64e)
- **dropdown-menu**:
  - implement dropdown menu components with context management and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(96bcd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/96bcd6b)
  - add DropdownMenuExample component and integrate it into App.vue &nbsp;-&nbsp; by @soybeanjs [<samp>(4a190)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4a190d4)
  - enhance dropdown functionality with new submenus, checkbox, and radio groups &nbsp;-&nbsp; by @soybeanjs [<samp>(2a8e7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2a8e702)
- **menu**:
  - implement menu component structure with context management, navigation, and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(e27d7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e27d735)
  - add MenuSubTrigger component and update MenuRoot props for improved functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(c3b85)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c3b85d6)
  - add menu component names &nbsp;-&nbsp; by @soybeanjs [<samp>(58293)</samp>](https://github.com/soybean-ui/soybean-headless/commit/582930e)
- **popper**:
  - introduce PopperContentWrapper component and enhance context management for content styling and element handling &nbsp;-&nbsp; by @soybeanjs [<samp>(7ab01)</samp>](https://github.com/soybean-ui/soybean-headless/commit/7ab0100)
- **separator**:
  - add Separator component with customizable orientation and decorative options &nbsp;-&nbsp; by @soybeanjs [<samp>(753e3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/753e3fc)
- **shared**:
  - add utility functions for mouse event detection and pointer area validation &nbsp;-&nbsp; by @soybeanjs [<samp>(c4986)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c49865f)
- **theme**:
  - add theme management utilities with merge function and type definitions for colors and sizes &nbsp;-&nbsp; by @soybeanjs [<samp>(a6b6f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a6b6f73)
- **tooltip**:
  - add scroll event handling to close tooltip on scroll and enhance cleanup management &nbsp;-&nbsp; by @soybeanjs [<samp>(9b6de)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9b6de0f)
- **use-exposed-element, use-forward-element**:
  - add callback support for element reference updates &nbsp;-&nbsp; by @soybeanjs [<samp>(d33fa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d33fa6a)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **collapsible-content**: enhance animation handling and improve style management during mount &nbsp;-&nbsp; by @soybeanjs [<samp>(59256)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5925655)
- **dropdown-menu**: update MenuAnchor syntax for improved template compatibility &nbsp;-&nbsp; by @soybeanjs [<samp>(6d96c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6d96cb6)
- **menu**: update dismissable layer to use contentElement and improve focus handling with new utility functions &nbsp;-&nbsp; by @soybeanjs [<samp>(9cbc7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9cbc73a)
- **menu-item**: update ref binding syntax for improved Vue compatibility &nbsp;-&nbsp; by @soybeanjs [<samp>(cc2cc)</samp>](https://github.com/soybean-ui/soybean-headless/commit/cc2ccc5)
- **use-exposed-element**: update exposed property reference for correct element binding &nbsp;-&nbsp; by @soybeanjs [<samp>(2f89a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2f89a24)
- **use-focus-scope**: update watch function to include onCleanup for better resource management &nbsp;-&nbsp; by @soybeanjs [<samp>(e5da3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e5da3ae)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **accordion, tooltip**:
  - replace constant attribute bindings with data attributes for improved clarity and consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(350d7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/350d756)
- **alert-dialog, menu**:
  - streamline event handling by removing redundant emits and utilizing shorthand syntax for listeners &nbsp;-&nbsp; by @soybeanjs [<samp>(c1bb2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c1bb2d0)
- **avatar**:
  - simplify loading status change function by removing console log &nbsp;-&nbsp; by @soybeanjs [<samp>(325c4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/325c434)
- **card**:
  - remove size examples from Card component to streamline template and enhance clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(d573d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d573dec)
- **collection**:
  - rename collection item props for clarity and update useCollectionItem to accept MaybeRefOrGetter for improved flexibility &nbsp;-&nbsp; by @soybeanjs [<samp>(ef474)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ef47483)
  - improve element management by integrating callback handlers for item and container elements &nbsp;-&nbsp; by @soybeanjs [<samp>(413aa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/413aaa6)
- **components**:
  - replace ref with shallowRef for improved reactivity in context files &nbsp;-&nbsp; by @soybeanjs [<samp>(49a50)</samp>](https://github.com/soybean-ui/soybean-headless/commit/49a50e4)
  - streamline prop management by integrating useOmitProps for cleaner component interfaces &nbsp;-&nbsp; by @soybeanjs [<samp>(f3eb9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f3eb9f9)
- **composables**:
  - replace isClient() function calls with isClient variable for improved performance and readability &nbsp;-&nbsp; by @soybeanjs [<samp>(d8b77)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d8b77b5)
  - define ArrowNavigationConfig interface for improved type safety in useArrowNavigation &nbsp;-&nbsp; by @soybeanjs [<samp>(e90fb)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e90fb9c)
  - remove useGlobalState composable to streamline codebase &nbsp;-&nbsp; by @soybeanjs [<samp>(4f0fa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4f0fab2)
  - return computed value for isUsingKeyboardRef in useIsUsingKeyboard for better reactivity &nbsp;-&nbsp; by @soybeanjs [<samp>(02de3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/02de34b)
  - update CollectionItemData interface to provide a default type for ItemData &nbsp;-&nbsp; by @soybeanjs [<samp>(4bb9b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4bb9b68)
  - update useHideOthers and useEscapeKeyDown for improved functionality and cleanup management &nbsp;-&nbsp; by @soybeanjs [<samp>(c209d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c209dbb)
- **composables, components**:
  - rename useForwardEmits to useForwardListeners and update related components for consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(273b9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/273b9d3)
  - replace onCleanup with onWatcherCleanup for improved cleanup management in various components &nbsp;-&nbsp; by @soybeanjs [<samp>(1ec35)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1ec35ab)
- **dialog**:
  - simplify dialog component structure by removing unused imports and enhancing focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(5072c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5072c80)
- **dialog, popover**:
  - enhance event handling by replacing listeners with shorthand syntax and consolidating event management &nbsp;-&nbsp; by @soybeanjs [<samp>(b58d5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b58d50a)
- **dialog, popover, composables**:
  - rename auto-focus event handlers for clarity and consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(50475)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5047539)
- **dropdown-menu**:
  - enhance content element management by introducing shallowRef and el-ref binding &nbsp;-&nbsp; by @soybeanjs [<samp>(2c9ed)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2c9ed71)
  - implement hover functionality with delay management for improved user experience &nbsp;-&nbsp; by @soybeanjs [<samp>(e24ef)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e24eff6)
- **dropdown-menu, popover, tooltip**:
  - update imports to use named exports from respective modules for improved consistency and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(f979c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f979cf8)
- **examples**:
  - update component imports to use alias paths for improved readability and maintainability &nbsp;-&nbsp; by @soybeanjs [<samp>(5a8a2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5a8a22c)
- **grace-area**:
  - simplify pointer tracking and remove debounce utility; enhance state management with refAutoReset &nbsp;-&nbsp; by @soybeanjs [<samp>(c12ba)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c12ba38)
- **menu**:
  - remove unused useCollection composable and integrate useHideOthers for better focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(6a02b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6a02b54)
  - streamline context management and enhance element handling across menu components &nbsp;-&nbsp; by @soybeanjs [<samp>(976cf)</samp>](https://github.com/soybean-ui/soybean-headless/commit/976cf2a)
  - enhance element management by integrating PopperContentWrapper and callback handlers for improved structure and focus handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d1596)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d15969a)
  - update MenuContent to use MenuContentPrivateProps and enhance element forwarding with elRef &nbsp;-&nbsp; by @soybeanjs [<samp>(2e946)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2e94657)
- **menu-sub-trigger**:
  - simplify pointer event handling by consolidating condition checks &nbsp;-&nbsp; by @soybeanjs [<samp>(46380)</samp>](https://github.com/soybean-ui/soybean-headless/commit/463804c)
- **popover**:
  - integrate useBodyScrollLock for improved modal behavior and enhance focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(2c757)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2c7573a)
  - streamline component imports and enhance cleanup management with onWatcherCleanup &nbsp;-&nbsp; by @soybeanjs [<samp>(78af9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/78af92d)
  - streamline element handling in popover context and components by replacing setElement functions with callback support &nbsp;-&nbsp; by @soybeanjs [<samp>(4bba4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4bba45d)
- **popover, tooltip**:
  - simplify PopoverContentProps and update TooltipContentImplEmits for better type management &nbsp;-&nbsp; by @soybeanjs [<samp>(d8722)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d87227a)
- **popper**:
  - simplify Arrow component usage by consolidating style binding in popper-arrow.vue &nbsp;-&nbsp; by @soybeanjs [<samp>(c7d2f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c7d2f34)
  - remove PopperContentWrapper component and simplify context management; update PopperContent to enhance structure and style handling &nbsp;-&nbsp; by @soybeanjs [<samp>(36021)</samp>](https://github.com/soybean-ui/soybean-headless/commit/36021be)
  - eliminate PopperContentWrapper across menu, popover, and tooltip components; streamline element management and enhance structure for improved clarity and performance &nbsp;-&nbsp; by @soybeanjs [<samp>(aa6e8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/aa6e8bd)
- **popper-content**:
  - replace useForwardElement with useExposedElement for improved element reference handling &nbsp;-&nbsp; by @soybeanjs [<samp>(19d1d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/19d1dd4)
- **projects**:
  - rename project from Soybean Primitives to SoybeanHeadless &nbsp;-&nbsp; by @soybeanjs [<samp>(97a09)</samp>](https://github.com/soybean-ui/soybean-headless/commit/97a0985)
- **props**:
  - streamline useOmitProps calls across multiple components to accept multiple extraProps directly, enhancing code clarity and consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(ca8bc)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ca8bcd7)
- **roving-focus**:
  - enhance context management by adding getOrderedItems to improve item retrieval &nbsp;-&nbsp; by @soybeanjs [<samp>(988c1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/988c16a)
  - update event handling by replacing 'events' with 'listeners' for improved clarity and consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(fefb5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/fefb5f6)
  - improve element management by integrating callback handlers for container and item elements &nbsp;-&nbsp; by @soybeanjs [<samp>(9e8e5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9e8e5f2)
- **shared**:
  - translate comments to English for improved code readability &nbsp;-&nbsp; by @soybeanjs [<samp>(45e4e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/45e4ebf)
- **tooltip**:
  - enhance element management by replacing setElement functions with callback handlers and introducing PopperContentWrapper for improved structure &nbsp;-&nbsp; by @soybeanjs [<samp>(13afb)</samp>](https://github.com/soybean-ui/soybean-headless/commit/13afb9b)
  - reduce delayDuration from 700 to 150 for improved tooltip responsiveness &nbsp;-&nbsp; by @soybeanjs [<samp>(51bbd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/51bbd6c)
- **use-collection**:
  - simplify container element management by replacing setElement functions with callback handlers and removing unused interfaces &nbsp;-&nbsp; by @soybeanjs [<samp>(6e15a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6e15a3b)
- **use-collection, use-dismissable-layer**:
  - replace boolean attributes with empty strings for improved consistency &nbsp;-&nbsp; by @soybeanjs [<samp>(c631d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c631d2e)
- **use-dismissable-layer**:
  - replace DismissableLayerManager with layerContext for improved state management and encapsulation &nbsp;-&nbsp; by @soybeanjs [<samp>(2fecd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2fecd54)
- **use-props**:
  - enhance usePickProps and useOmitProps to accept multiple extraProps and streamline prop merging with a new mergeExtraProps function &nbsp;-&nbsp; by @soybeanjs [<samp>(d6b61)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d6b61ed)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: update CHANGELOG repository name &nbsp;-&nbsp; by @soybeanjs [<samp>(4ddfa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4ddfaa3)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **config**:
  - update TypeScript and Vite configurations to include test and playground directories, enhancing project structure &nbsp;-&nbsp; by @soybeanjs [<samp>(40b8a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/40b8a6a)
  - update Vite configuration to include path aliasing for improved module resolution &nbsp;-&nbsp; by @soybeanjs [<samp>(881b2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/881b2b2)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(3a751)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3a7519e)
  - add @vitest/coverage-v8 dependency &nbsp;-&nbsp; by @soybeanjs [<samp>(c0004)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c000416)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(c55f8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c55f805)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(54fc7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/54fc792)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(d877e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d877e2a)
- **package**:
  - add 'rei' script for cleanup and installation &nbsp;-&nbsp; by @soybeanjs [<samp>(cb5a2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/cb5a25f)
  - add vue3-simple-icons &nbsp;-&nbsp; by @soybeanjs [<samp>(b5492)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b549259)

### &nbsp;&nbsp;&nbsp;✅ Tests

- **projects**: add test files &nbsp;-&nbsp; by @soybeanjs [<samp>(d3791)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d37914d)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.1-alpha.4](https://github.com/soybean-ui/soybean-headless/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2025-06-01)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **checkbox, radio-group**:
  - add control and label components to checkbox and radio group &nbsp;-&nbsp; by **Soybean** [<samp>(c5abf)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c5abf97)
- **debounce**:
  - add createDebounce function for efficient callback debouncing and cancellation &nbsp;-&nbsp; by **Soybean** [<samp>(f0924)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f0924ef)
- **dialog**:
  - expose closeModal function in dialog slot for improved control &nbsp;-&nbsp; by **Soybean** [<samp>(2f005)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2f00562)
- **dom**:
  - add getAriaLabelByVNode and getAriaLabelByVNodeList functions for improved accessibility text extraction from VNodes &nbsp;-&nbsp; by **Soybean** [<samp>(3c7f1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3c7f179)
- **geometry**:
  - implement geometric functions for point-in-polygon checks, distance calculations, and convex hull generation &nbsp;-&nbsp; by **Soybean** [<samp>(da31c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/da31c62)
- **grace-area**:
  - implement useGraceArea composable for enhanced pointer tracking and grace area detection &nbsp;-&nbsp; by **Soybean** [<samp>(c3b29)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c3b2948)
- **popover**:
  - add Popover component with trigger, content, and context management for enhanced UI interactions &nbsp;-&nbsp; by **Soybean** [<samp>(b14c6)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b14c6bd)
- **popper**:
  - introduce Popper components for enhanced positioning and dynamic content management &nbsp;-&nbsp; by **Soybean** [<samp>(a5c20)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a5c20dd)
- **props**:
  - add pickProps and omitProps functions for selective property management in components &nbsp;-&nbsp; by **Soybean** [<samp>(db56f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/db56f79)
- **radio-group**:
  - enhance radio group components with control and label features &nbsp;-&nbsp; by **Soybean** [<samp>(ea93e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ea93e7a)
- **scripts**:
  - add build:play script for Vite build process to enhance development workflow &nbsp;-&nbsp; by **Soybean** [<samp>(0b6a2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/0b6a270)
- **tooltip**:
  - add tooltip component with provider, trigger, and content implementations for enhanced UI interactions &nbsp;-&nbsp; by **Soybean** [<samp>(a132b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a132ba0)
- **types**:
  - introduce new Side and Align types, and add Size interface for improved layout management &nbsp;-&nbsp; by **Soybean** [<samp>(0417b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/0417b2f)
  - add Point and Polygon types to enhance geometric data representation &nbsp;-&nbsp; by **Soybean** [<samp>(19749)</samp>](https://github.com/soybean-ui/soybean-headless/commit/197494c)
- **use-dismissable-layer**:
  - add enable parameter to useOutsidePointerDown for conditional event handling &nbsp;-&nbsp; by **Soybean** [<samp>(b6b58)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b6b58c8)
- **use-element-size**:
  - implement composable for dynamic element size tracking using ResizeObserver &nbsp;-&nbsp; by **Soybean** [<samp>(01b17)</samp>](https://github.com/soybean-ui/soybean-headless/commit/01b1705)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **avatar-fallback**:
  - prevent rendering delay when not in client environment &nbsp;-&nbsp; by **Soybean** [<samp>(71eed)</samp>](https://github.com/soybean-ui/soybean-headless/commit/71eedf2)
- **dialog, popover**:
  - standardize escape key event naming to 'escapeKeyDown' for consistency across components &nbsp;-&nbsp; by **Soybean** [<samp>(bcdea)</samp>](https://github.com/soybean-ui/soybean-headless/commit/bcdeaf3)
- **dom**:
  - update getAriaLabel function to handle null element parameter &nbsp;-&nbsp; by **Soybean** [<samp>(f2027)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f20278d)
- **popover, popper**:
  - update CSS variable definitions to ensure consistency in transform origin and remove duplicate entries &nbsp;-&nbsp; by **Soybean** [<samp>(108fd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/108fd18)
- **popper**:
  - correct floatingStyles reference in popper-content component for proper styling application &nbsp;-&nbsp; by **Soybean** [<samp>(86bd2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/86bd2ec)
  - handle undefined arrow position values to prevent CSS errors &nbsp;-&nbsp; by **Soybean** [<samp>(1c337)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1c33790)
- **vite.config**:
  - specify root option for tsconfigPaths plugin &nbsp;-&nbsp; by **Soybean** [<samp>(bcc22)</samp>](https://github.com/soybean-ui/soybean-headless/commit/bcc22b3)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **checkbox, radio-group**:
  - implement useControllableState for modelValue management &nbsp;-&nbsp; by **Soybean** [<samp>(2d9b9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2d9b9fd)
- **components**:
  - remove unused 'as' prop from various components for cleaner code &nbsp;-&nbsp; by **Soybean** [<samp>(07969)</samp>](https://github.com/soybean-ui/soybean-headless/commit/07969e4)
  - dialog, popover: extract event handling logic into shared composable for better code reuse and maintainability &nbsp;-&nbsp; by **Soybean** [<samp>(03369)</samp>](https://github.com/soybean-ui/soybean-headless/commit/03369fb)
- **dialog**:
  - replace closeModal with onOpenChange for improved dialog state management &nbsp;-&nbsp; by **Soybean** [<samp>(430be)</samp>](https://github.com/soybean-ui/soybean-headless/commit/430be2f)
- **popper**:
  - rename element variable to anchorElement for clarity in popper-anchor component &nbsp;-&nbsp; by **Soybean** [<samp>(6fcea)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6fceadc)
- **projects**:
  - add HTMLAttributes to components props &nbsp;-&nbsp; by **Soybean** [<samp>(bd6aa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/bd6aa54)
- **types**:
  - remove style type definitions and update exports for cleaner type management &nbsp;-&nbsp; by **Soybean** [<samp>(eb926)</samp>](https://github.com/soybean-ui/soybean-headless/commit/eb92633)
  - update export for VisuallyHiddenInputProps to enhance type clarity &nbsp;-&nbsp; by **Soybean** [<samp>(d6e2a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d6e2a0b)
  - update ComponentRootProps to extend HTMLAttributes and improve type definitions &nbsp;-&nbsp; by **Soybean** [<samp>(a4c34)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a4c34d7)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **Soybean** [<samp>(358d7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/358d787)
- **types**: remove global type declaration for __DEV__ as it is no longer needed &nbsp;-&nbsp; by **Soybean** [<samp>(acbe5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/acbe518)

### &nbsp;&nbsp;&nbsp;❤️ Contributors


[Soybean](mailto:soybeanjs@outlook.com)

## [v0.0.1-alpha.3](https://github.com/soybean-ui/soybean-headless/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2025-05-29)

### &nbsp;&nbsp;&nbsp;🚀 Features

- integrate vite-tsconfig-paths for improved path resolution and update TypeScript types &nbsp;-&nbsp; by @soybeanjs [<samp>(24c0d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/24c0d80)
- implement presence management with state machine and enhance slot component for development checks &nbsp;-&nbsp; by @soybeanjs [<samp>(79be3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/79be362)
- **App**:
  - add CollapsibleExample component and enhance layout styling &nbsp;-&nbsp; by @soybeanjs [<samp>(2875d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2875d86)
  - integrate DialogExample component into main layout alongside AccordionExample &nbsp;-&nbsp; by @soybeanjs [<samp>(010b9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/010b9f3)
  - add AlertDialogExample component to showcase alert dialog functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(44816)</samp>](https://github.com/soybean-ui/soybean-headless/commit/44816a7)
- **accordion**:
  - implement accordion component structure with root, item, header, content, trigger, and context management &nbsp;-&nbsp; by @soybeanjs [<samp>(183c5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/183c566)
- **accordion, collapsible, dialog**:
  - add default props and improve type safety for open state management &nbsp;-&nbsp; by @soybeanjs [<samp>(f988e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f988e20)
- **alert-dialog**:
  - implement alert dialog components including root, content, cancel, and context management &nbsp;-&nbsp; by @soybeanjs [<samp>(9307b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9307be0)
- **arrow**:
  - introduce Arrow component and example for enhanced UI elements &nbsp;-&nbsp; by @soybeanjs [<samp>(4e70d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4e70df3)
- **aspect-ratio**:
  - add AspectRatio component and example to manage aspect ratios in UI &nbsp;-&nbsp; by @soybeanjs [<samp>(9ead7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9ead7c4)
- **avatar**:
  - introduce Avatar component with fallback and image loading features &nbsp;-&nbsp; by @soybeanjs [<samp>(31a55)</samp>](https://github.com/soybean-ui/soybean-headless/commit/31a55ca)
- **checkbox**:
  - add Checkbox component with various states and group functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(3dfcb)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3dfcbee)
- **collapse**:
  - implement collapsible component with root, content, and trigger &nbsp;-&nbsp; by @soybeanjs [<samp>(5cddf)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5cddfe6)
- **collection**:
  - implement collection component with context management and item visibility controls &nbsp;-&nbsp; by @soybeanjs [<samp>(16d48)</samp>](https://github.com/soybean-ui/soybean-headless/commit/16d4843)
- **common**:
  - export isEqual function for value comparison &nbsp;-&nbsp; by @soybeanjs [<samp>(77571)</samp>](https://github.com/soybean-ui/soybean-headless/commit/7757146)
  - add pick and omit utility functions for object manipulation &nbsp;-&nbsp; by @soybeanjs [<samp>(397a1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/397a188)
  - add utility functions to convert strings to PascalCase and CamelCase &nbsp;-&nbsp; by @soybeanjs [<samp>(c1c6d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c1c6d5f)
- **components**:
  - add dialog components to constants for enhanced dialog functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(2e2c0)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2e2c00f)
  - add name options to various components for better identification in Vue devtools &nbsp;-&nbsp; by @soybeanjs [<samp>(c168c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c168c57)
  - introduce visually hidden components and types for improved accessibility &nbsp;-&nbsp; by @soybeanjs [<samp>(f4b32)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f4b321a)
- **composables**:
  - add useContext composable for context management &nbsp;-&nbsp; by @soybeanjs [<samp>(abec9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/abec9c1)
  - add useVModel composable &nbsp;-&nbsp; by @soybeanjs [<samp>(d965b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d965b05)
  - add useForwardElement composable for element reference management &nbsp;-&nbsp; by @soybeanjs [<samp>(f1775)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f17753b)
  - add composables of dismissable-layer &nbsp;-&nbsp; by @soybeanjs in https://github.com/soybean-ui/soybean-headless/issues/1 [<samp>(35a95)</samp>](https://github.com/soybean-ui/soybean-headless/commit/35a9567)
  - introduce useGlobalState for managing global state across Vue instances &nbsp;-&nbsp; by @soybeanjs [<samp>(ed89b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ed89b1c)
  - add useFocusScope for managing focus within a defined scope &nbsp;-&nbsp; by @soybeanjs [<samp>(ccf59)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ccf598c)
  - add useFocusGuards for managing focus elements in the DOM &nbsp;-&nbsp; by @soybeanjs [<samp>(23fa4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/23fa45e)
  - implement useSingleOrMultipleValue for handling single and multiple value selection &nbsp;-&nbsp; by @soybeanjs [<samp>(1a1c3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1a1c3cc)
  - add useArrowNavigation for keyboard navigation through collection items &nbsp;-&nbsp; by @soybeanjs [<samp>(a46a3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a46a368)
  - add transformPropsToContext function for prop management in Vue components &nbsp;-&nbsp; by @soybeanjs [<samp>(9524d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9524d93)
  - add useSharedComposable for shared state management across Vue instances &nbsp;-&nbsp; by @soybeanjs [<samp>(cf121)</samp>](https://github.com/soybean-ui/soybean-headless/commit/cf12139)
  - introduce useExposedElement for exposing element refs to parent components &nbsp;-&nbsp; by @soybeanjs [<samp>(8dee7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8dee7cc)
  - add useBodyScrollLock composable for managing body scroll behavior &nbsp;-&nbsp; by @soybeanjs [<samp>(d6ce5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d6ce5ed)
  - add useForwardListeners composable for event emission handling &nbsp;-&nbsp; by @soybeanjs [<samp>(c98a7)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c98a71b)
- **config-provider**:
  - introduce ConfigProvider component with context and types for global configuration management &nbsp;-&nbsp; by @soybeanjs [<samp>(1e50e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1e50e81)
- **constants**:
  - add COLLECTION_ITEM_ATTRIBUTE constant and export from index &nbsp;-&nbsp; by @soybeanjs [<samp>(6ae79)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6ae79ff)
  - add new component entries for accordion, collapsible, configProvider, and portal &nbsp;-&nbsp; by @soybeanjs [<samp>(30398)</samp>](https://github.com/soybean-ui/soybean-headless/commit/30398cd)
- **dialog**:
  - implement dialog component with context management and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(adfcc)</samp>](https://github.com/soybean-ui/soybean-headless/commit/adfcc72)
  - introduce DialogContentImpl component for improved focus management and dismissable layer functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(8861f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8861fa5)
  - integrate useHideOthers composable for improved accessibility and focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(1139a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1139a38)
  - add dialog example component showcasing usage of DialogRoot, DialogTrigger, and related elements &nbsp;-&nbsp; by @soybeanjs [<samp>(e08d4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e08d4d4)
- **dismissable-layer**:
  - enhance type safety and extend options interface with event handlers &nbsp;-&nbsp; by @soybeanjs [<samp>(98249)</samp>](https://github.com/soybean-ui/soybean-headless/commit/982499f)
- **dom**:
  - add new types for HTML attributes and image loading status &nbsp;-&nbsp; by @soybeanjs [<samp>(645af)</samp>](https://github.com/soybean-ui/soybean-headless/commit/645af01)
  - add utility functions to check for disabled elements and retrieve collection item elements &nbsp;-&nbsp; by @soybeanjs [<samp>(c51af)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c51af11)
- **examples**:
  - integrate CheckboxExample component into main application view &nbsp;-&nbsp; by @soybeanjs [<samp>(10544)</samp>](https://github.com/soybean-ui/soybean-headless/commit/10544da)
- **focus-scope**:
  - extend UseFocusScopeOptions interface with EmitsToHookProps and add tabindex property &nbsp;-&nbsp; by @soybeanjs [<samp>(56084)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5608428)
- **form**:
  - implement form utility functions for field name creation and value parsing &nbsp;-&nbsp; by @soybeanjs [<samp>(373f1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/373f106)
- **guide**:
  - add comprehensive development guide for Soybean Headless component library &nbsp;-&nbsp; by @soybeanjs [<samp>(8596d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8596d56)
  - update development guide with new components and best practices for context management &nbsp;-&nbsp; by @soybeanjs [<samp>(b9315)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b931593)
- **hide-others**:
  - add useHideOthers composable to manage ARIA visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(562a4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/562a4d9)
- **image-loading**:
  - add useImageLoadingStatus composable to track image loading status &nbsp;-&nbsp; by @soybeanjs [<samp>(ea9a9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ea9a900)
- **label**:
  - add Label component with props and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(67c61)</samp>](https://github.com/soybean-ui/soybean-headless/commit/67c615f)
- **lifecycle**:
  - add utility functions for component lifecycle management with onBeforeUnmount and onScopeDispose &nbsp;-&nbsp; by @soybeanjs [<samp>(d1480)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d1480a6)
- **packages**:
  - add primitive presence &nbsp;-&nbsp; by @soybeanjs [<samp>(4546d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4546dbd)
  - add collapsible &nbsp;-&nbsp; by @soybeanjs [<samp>(bd4d8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/bd4d899)
- **playground**:
  - add PresentExample component and enhance App layout &nbsp;-&nbsp; by @soybeanjs [<samp>(4783a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4783af4)
- **portal**:
  - add Portal component with teleport functionality and associated types &nbsp;-&nbsp; by @soybeanjs [<samp>(9aea3)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9aea3f6)
  - add default 'to' prop for improved flexibility in portal component &nbsp;-&nbsp; by @soybeanjs [<samp>(d0a02)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d0a0254)
- **radio-group**:
  - introduce RadioGroup component with context management and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(937ee)</samp>](https://github.com/soybean-ui/soybean-headless/commit/937eecf)
- **roving-focus**:
  - implement useRovingFocus composable for managing focus navigation in groups and items &nbsp;-&nbsp; by @soybeanjs [<samp>(8c3c9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8c3c9f9)
  - enhance useRovingFocus composable with lifecycle hooks for item addition and removal &nbsp;-&nbsp; by @soybeanjs [<samp>(5ddc8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5ddc807)
  - add Roving Focus examples with button group and button components &nbsp;-&nbsp; by @soybeanjs [<samp>(35866)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3586632)
  - refactor `useRovingFocus` to component RovingFocusGroup and RovingFocusItem for improved focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(1c34c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1c34ce9)
- **section-wrapper**:
  - add SectionWrapper component for consistent layout and title handling in accordion and collapsible examples &nbsp;-&nbsp; by @soybeanjs [<samp>(c44f5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c44f563)
- **shared**:
  - add utility functions for array manipulation, DOM handling, and focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(d7958)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d7958e0)
  - add wrapArray utility function to enable array wrapping at a specified start index &nbsp;-&nbsp; by @soybeanjs [<samp>(913df)</samp>](https://github.com/soybean-ui/soybean-headless/commit/913df84)
- **tests**:
  - enhance testing setup with additional commands and configuration for coverage and UI &nbsp;-&nbsp; by @soybeanjs [<samp>(1cba2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1cba28d)
- **tsdown**:
  - add entry for types in tsdown configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(9b5f8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9b5f8c7)
- **types**:
  - define new types for class values, props context, and open state management &nbsp;-&nbsp; by @soybeanjs [<samp>(dd3d0)</samp>](https://github.com/soybean-ui/soybean-headless/commit/dd3d0c5)
  - add new types for data orientation, scroll options, and single/multiple selection handling &nbsp;-&nbsp; by @soybeanjs [<samp>(49d4a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/49d4a25)
  - introduce common types and event interfaces for improved type safety and component interaction &nbsp;-&nbsp; by @soybeanjs [<samp>(65d10)</samp>](https://github.com/soybean-ui/soybean-headless/commit/65d108e)
  - add FormFieldProps interface to define form field properties for better form handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d3a78)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d3a78e5)
- **vite**:
  - configure server to open automatically on start &nbsp;-&nbsp; by @soybeanjs [<samp>(2dd76)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2dd7676)
  - add vite-plugin-vue-devtools to enhance Vue development experience &nbsp;-&nbsp; by @soybeanjs [<samp>(329ac)</samp>](https://github.com/soybean-ui/soybean-headless/commit/329ac34)
- **vue**:
  - enhance element reference handling with unrefElement utility and improve type imports &nbsp;-&nbsp; by @soybeanjs [<samp>(88012)</samp>](https://github.com/soybean-ui/soybean-headless/commit/880124f)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **accordion, collapsible**:
  - update trigger and content ID initialization to include component-specific prefixes for better uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(637f1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/637f1c5)
- **composables**:
  - improve error handling in useInject to ensure consumerName is validated only when provided &nbsp;-&nbsp; by @soybeanjs [<samp>(c6657)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c665796)
  - update elRef type in usePresence to allow null values &nbsp;-&nbsp; by @soybeanjs [<samp>(d3f5a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d3f5a58)
- **context**:
  - rename element reference variables for consistency in useForwardElement &nbsp;-&nbsp; by @soybeanjs [<samp>(b76c2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b76c20c)
- **hooks**:
  - enhance useForwardElement to support generic HTMLElement types and ensure node assignment is conditional &nbsp;-&nbsp; by @soybeanjs [<samp>(1b7dd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1b7dd11)
- **shared**:
  - update transformPropsToContext to handle function props correctly &nbsp;-&nbsp; by @soybeanjs [<samp>(e005e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e005e53)
- **slot**:
  - update import path for getRawChildren to maintain correct module resolution &nbsp;-&nbsp; by @soybeanjs [<samp>(8aacd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8aacdeb)
- **tsdown**:
  - update external dependencies in tsdown configuration and export additional types in index &nbsp;-&nbsp; by @soybeanjs [<samp>(fe766)</samp>](https://github.com/soybean-ui/soybean-headless/commit/fe76624)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **accordion**:
  - rename root element reference for clarity and update trigger ID prefix for uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(19086)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1908641)
  - replace direct collection item attribute usage with utility function to improve keydown handling &nbsp;-&nbsp; by @soybeanjs [<samp>(5e894)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5e89463)
- **alert-dialog, roving-focus**:
  - update context usage in alert-dialog-cancel and roving-focus-item to include specific component names &nbsp;-&nbsp; by @soybeanjs [<samp>(0ad27)</samp>](https://github.com/soybean-ui/soybean-headless/commit/0ad27cd)
- **body-scroll-lock**:
  - simplify scroll lock logic and improve iOS touch handling &nbsp;-&nbsp; by @soybeanjs [<samp>(31201)</samp>](https://github.com/soybean-ui/soybean-headless/commit/31201b4)
- **checkbox**:
  - remove unused constants and CSS variables from shared checkbox file &nbsp;-&nbsp; by @soybeanjs [<samp>(494f4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/494f4c3)
  - consolidate CheckedState type definition and update related functions for clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(fac63)</samp>](https://github.com/soybean-ui/soybean-headless/commit/fac63ac)
  - simplify checkbox component structure and enhance group functionality with improved state management &nbsp;-&nbsp; by @soybeanjs [<samp>(4d4ec)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4d4ecf5)
  - enhance accessibility and state management by introducing getAriaLabel function and updating element references &nbsp;-&nbsp; by @soybeanjs [<samp>(472ba)</samp>](https://github.com/soybean-ui/soybean-headless/commit/472ba7e)
  - improve type safety by ensuring modelValue updates only with non-nullable values &nbsp;-&nbsp; by @soybeanjs [<samp>(1c300)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1c30015)
- **collapsible**:
  - rename context functions and update data handling for collapsible components &nbsp;-&nbsp; by @soybeanjs [<samp>(ef610)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ef610e9)
  - update element reference handling and enhance content ID uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(e2673)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e267331)
- **common, env**:
  - move isBrowser and isClient functions to a new env.ts file and clean up common.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(95ea1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/95ea14b)
- **component-item**:
  - initialize trigger ID with a unique value to ensure proper context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(da55f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/da55f7f)
- **components**:
  - rename getOpenState to getDisclosureState and update related types for consistency across accordion, collapsible, dialog, and guide components &nbsp;-&nbsp; by @soybeanjs [<samp>(a1f95)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a1f9553)
  - update collection item and list components to use v-bind for props and improve context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(df643)</samp>](https://github.com/soybean-ui/soybean-headless/commit/df6436f)
- **composables**:
  - simplify useContext API by removing options parameter and enhancing error handling &nbsp;-&nbsp; by @soybeanjs [<samp>(73da4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/73da47d)
  - remove useSharedComposable for code simplification and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(dbe4c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/dbe4cae)
  - update useForwardElement to return array destructuring for improved clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(2e134)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2e1343f)
- **context**:
  - replace inline open state logic with getOpenState utility for consistency across components &nbsp;-&nbsp; by @soybeanjs [<samp>(c1c43)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c1c43b2)
- **dialog**:
  - update dialog component to use v-bind for dismissable layer and focus scope props &nbsp;-&nbsp; by @soybeanjs [<samp>(ceba2)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ceba21d)
- **examples**:
  - update import paths for alert-dialog, collapsible, and dialog components to streamline module resolution &nbsp;-&nbsp; by @soybeanjs [<samp>(01dec)</samp>](https://github.com/soybean-ui/soybean-headless/commit/01dec7b)
- **hooks**:
  - use `useControllableState` replace `useVModel` &nbsp;-&nbsp; by @soybeanjs [<samp>(aa2de)</samp>](https://github.com/soybean-ui/soybean-headless/commit/aa2deef)
- **index**:
  - reorganize exports to include accordion, config-provider, and maintain existing components &nbsp;-&nbsp; by @soybeanjs [<samp>(8c19d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8c19d5a)
- **isFormControl**:
  - update parameter type to allow null values for better type safety &nbsp;-&nbsp; by @soybeanjs [<samp>(7056d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/7056d50)
- **package**:
  - remove klona dependency and update clone function implementation &nbsp;-&nbsp; by @soybeanjs [<samp>(27801)</samp>](https://github.com/soybean-ui/soybean-headless/commit/278019e)
- **portal**:
  - extend PortalProps interface to include ForceMountProps for enhanced functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(ba480)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ba480da)
- **projects**:
  - refactor presence &nbsp;-&nbsp; by @soybeanjs [<samp>(b833c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b833caa)
  - use local variants replace `@soybean-ui/variants` &nbsp;-&nbsp; by @soybeanjs [<samp>(fa746)</samp>](https://github.com/soybean-ui/soybean-headless/commit/fa74617)
  - refactor checkbox, radio &nbsp;-&nbsp; by @soybeanjs [<samp>(3c2a8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3c2a8a5)
- **roving-focus, use-collection**:
  - update context and function names for clarity, enhancing element management and focus handling &nbsp;-&nbsp; by @soybeanjs [<samp>(0025a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/0025a02)
- **shared**:
  - reorganize utility functions into dedicated files and remove deprecated functions &nbsp;-&nbsp; by @soybeanjs [<samp>(2b568)</samp>](https://github.com/soybean-ui/soybean-headless/commit/2b568e8)
  - rename isDisabledElement to isElementHasAttribute and generalize functionality to check for any attribute &nbsp;-&nbsp; by @soybeanjs [<samp>(74c68)</samp>](https://github.com/soybean-ui/soybean-headless/commit/74c68f3)
- **tsdown.config**:
  - update entry points to dynamically include component indices using fast-glob &nbsp;-&nbsp; by @soybeanjs [<samp>(00fb8)</samp>](https://github.com/soybean-ui/soybean-headless/commit/00fb806)
- **use-arrow-navigation**:
  - enhance navigation logic with improved key mapping, configuration options, and performance optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(90156)</samp>](https://github.com/soybean-ui/soybean-headless/commit/9015664)
- **use-body-scroll-lock**:
  - enhance scroll locking mechanism by utilizing CSS classes for improved performance and maintainability &nbsp;-&nbsp; by @soybeanjs [<samp>(1f6be)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1f6beb2)
  - optimize scroll lock implementation with enhanced CSS class management and improved performance &nbsp;-&nbsp; by @soybeanjs [<samp>(714b4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/714b4c0)
- **use-context**:
  - enhance useInject function to handle nullish consumer names and return null for undefined values &nbsp;-&nbsp; by @soybeanjs [<samp>(d1210)</samp>](https://github.com/soybean-ui/soybean-headless/commit/d12102d)
- **use-dismissable-layer**:
  - improve type definitions and enhance client checks &nbsp;-&nbsp; by @soybeanjs [<samp>(5d80c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5d80c94)
  - improve layer management and event handling with enhanced encapsulation and performance optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(f9c69)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f9c6960)
  - extract DismissableLayerManager to a separate file for improved organization and maintainability &nbsp;-&nbsp; by @soybeanjs [<samp>(f8bfd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f8bfd59)
- **useHideOthers**:
  - update target parameter type to Ref and simplify watch logic &nbsp;-&nbsp; by @soybeanjs [<samp>(a56c9)</samp>](https://github.com/soybean-ui/soybean-headless/commit/a56c911)
- **visually-hidden**:
  - replace FormFieldProps with FormNameValueProps and update related parsing functions &nbsp;-&nbsp; by @soybeanjs [<samp>(e4eea)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e4eea54)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **use-context**: add JSDoc comments for useInject function to clarify parameters and return value &nbsp;-&nbsp; by @soybeanjs [<samp>(83a58)</samp>](https://github.com/soybean-ui/soybean-headless/commit/83a585d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **.gitignore**:
  - add .temp to ignore list for temporary files &nbsp;-&nbsp; by @soybeanjs [<samp>(77d23)</samp>](https://github.com/soybean-ui/soybean-headless/commit/77d23cd)
- **dependencies**:
  - add klona &nbsp;-&nbsp; by @soybeanjs [<samp>(c6e70)</samp>](https://github.com/soybean-ui/soybean-headless/commit/c6e7030)
  - update package.json and pnpm-lock.yaml to include new Unocss presets and dependencies, and remove unused style.css file &nbsp;-&nbsp; by @soybeanjs [<samp>(f510c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f510cc5)
  - update package.json and pnpm-lock.yaml with new dependencies and versions, add accordion example to playground &nbsp;-&nbsp; by @soybeanjs [<samp>(ec46b)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ec46be3)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(5f8fa)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5f8fa59)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(08b43)</samp>](https://github.com/soybean-ui/soybean-headless/commit/08b43a1)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(b6ac4)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b6ac43c)
  - add clsx, tailwind-merge, and tailwind-variants packages to dependencies &nbsp;-&nbsp; by @soybeanjs [<samp>(1de20)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1de2005)
- **eslint**:
  - update ESLint rules to disable max-params and no-empty-object-type &nbsp;-&nbsp; by @soybeanjs [<samp>(3b81e)</samp>](https://github.com/soybean-ui/soybean-headless/commit/3b81eea)
  - disable 'vue/multi-word-component-names' rule in ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(86051)</samp>](https://github.com/soybean-ui/soybean-headless/commit/86051b2)
  - disable vue/no-static-inline-styles rule in ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(5ee0a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/5ee0ad7)
  - add 'vue/no-reserved-component-names' rule to ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(f41dd)</samp>](https://github.com/soybean-ui/soybean-headless/commit/f41dd3b)
- **index**:
  - update document title from "Template Vue TSDown" to "Soybean Headless" &nbsp;-&nbsp; by @soybeanjs [<samp>(1a389)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1a38919)
- **package**:
  - rename project from Soybean Headless to Vexa UI and update descriptions, homepage, and repository links &nbsp;-&nbsp; by @soybeanjs [<samp>(8dee0)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8dee09f)
  - rename project from Vexa UI to Soybean Headless and update related metadata in package.json and README.md &nbsp;-&nbsp; by @soybeanjs [<samp>(033e1)</samp>](https://github.com/soybean-ui/soybean-headless/commit/033e17c)
- **projects**:
  - optimize build &nbsp;-&nbsp; by @soybeanjs [<samp>(e1593)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e159310)
  - use tsdown unbundle mode &nbsp;-&nbsp; by @soybeanjs [<samp>(8a25f)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8a25f60)
- **rules**:
  - add project standards, structure guidelines, and TypeScript best practices documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(e6ea5)</samp>](https://github.com/soybean-ui/soybean-headless/commit/e6ea533)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **present**: enhance button styling and update layout for usePresence example &nbsp;-&nbsp; by @soybeanjs [<samp>(b2cac)</samp>](https://github.com/soybean-ui/soybean-headless/commit/b2cac72)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.1-alpha.2](https://github.com/soybean-ui/soybean-headless/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2025-05-16)

### &nbsp;&nbsp;&nbsp;🚀 Features

- enhance ESLint and TypeScript configurations, add new components, and remove demo package &nbsp;-&nbsp; by @soybeanjs [<samp>(6c34d)</samp>](https://github.com/soybean-ui/soybean-headless/commit/6c34dba)
- **projects**: add playground & vitest & update build config &nbsp;-&nbsp; by @soybeanjs [<samp>(ff2cb)</samp>](https://github.com/soybean-ui/soybean-headless/commit/ff2cbf6)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- add initial changelog for v0.0.1-alpha.1 &nbsp;-&nbsp; by @soybeanjs [<samp>(4bab6)</samp>](https://github.com/soybean-ui/soybean-headless/commit/4bab6ba)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.1-alpha.1](https://github.com/soybean-ui/soybean-headless/releases/tag/v0.0.1-alpha.1) (2025-05-13)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **pkg**:
  - add package placeholder &nbsp;-&nbsp; by @soybeanjs [<samp>(17f78)</samp>](https://github.com/soybean-ui/soybean-headless/commit/17f7829)
  - add publishConfig for npm registry &nbsp;-&nbsp; by @soybeanjs [<samp>(8ac49)</samp>](https://github.com/soybean-ui/soybean-headless/commit/8ac4960)
- **projects**:
  - init projects &nbsp;-&nbsp; by @soybeanjs [<samp>(1961a)</samp>](https://github.com/soybean-ui/soybean-headless/commit/1961a53)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: add README &nbsp;-&nbsp; by @soybeanjs [<samp>(14d5c)</samp>](https://github.com/soybean-ui/soybean-headless/commit/14d5ca4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

