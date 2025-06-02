# Changelog


## [v0.0.1-alpha.4](https://github.com/vexa-ui/vexa-ui/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2025-06-01)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **checkbox, radio-group**:
  - add control and label components to checkbox and radio group &nbsp;-&nbsp; by **Soybean** [<samp>(c5abf)</samp>](https://github.com/vexa-ui/vexa-ui/commit/c5abf97)
- **debounce**:
  - add createDebounce function for efficient callback debouncing and cancellation &nbsp;-&nbsp; by **Soybean** [<samp>(f0924)</samp>](https://github.com/vexa-ui/vexa-ui/commit/f0924ef)
- **dialog**:
  - expose closeModal function in dialog slot for improved control &nbsp;-&nbsp; by **Soybean** [<samp>(2f005)</samp>](https://github.com/vexa-ui/vexa-ui/commit/2f00562)
- **dom**:
  - add getAriaLabelByVNode and getAriaLabelByVNodeList functions for improved accessibility text extraction from VNodes &nbsp;-&nbsp; by **Soybean** [<samp>(3c7f1)</samp>](https://github.com/vexa-ui/vexa-ui/commit/3c7f179)
- **geometry**:
  - implement geometric functions for point-in-polygon checks, distance calculations, and convex hull generation &nbsp;-&nbsp; by **Soybean** [<samp>(da31c)</samp>](https://github.com/vexa-ui/vexa-ui/commit/da31c62)
- **grace-area**:
  - implement useGraceArea composable for enhanced pointer tracking and grace area detection &nbsp;-&nbsp; by **Soybean** [<samp>(c3b29)</samp>](https://github.com/vexa-ui/vexa-ui/commit/c3b2948)
- **popover**:
  - add Popover component with trigger, content, and context management for enhanced UI interactions &nbsp;-&nbsp; by **Soybean** [<samp>(b14c6)</samp>](https://github.com/vexa-ui/vexa-ui/commit/b14c6bd)
- **popper**:
  - introduce Popper components for enhanced positioning and dynamic content management &nbsp;-&nbsp; by **Soybean** [<samp>(a5c20)</samp>](https://github.com/vexa-ui/vexa-ui/commit/a5c20dd)
- **props**:
  - add pickProps and omitProps functions for selective property management in components &nbsp;-&nbsp; by **Soybean** [<samp>(db56f)</samp>](https://github.com/vexa-ui/vexa-ui/commit/db56f79)
- **radio-group**:
  - enhance radio group components with control and label features &nbsp;-&nbsp; by **Soybean** [<samp>(ea93e)</samp>](https://github.com/vexa-ui/vexa-ui/commit/ea93e7a)
- **scripts**:
  - add build:play script for Vite build process to enhance development workflow &nbsp;-&nbsp; by **Soybean** [<samp>(0b6a2)</samp>](https://github.com/vexa-ui/vexa-ui/commit/0b6a270)
- **tooltip**:
  - add tooltip component with provider, trigger, and content implementations for enhanced UI interactions &nbsp;-&nbsp; by **Soybean** [<samp>(a132b)</samp>](https://github.com/vexa-ui/vexa-ui/commit/a132ba0)
- **types**:
  - introduce new Side and Align types, and add Size interface for improved layout management &nbsp;-&nbsp; by **Soybean** [<samp>(0417b)</samp>](https://github.com/vexa-ui/vexa-ui/commit/0417b2f)
  - add Point and Polygon types to enhance geometric data representation &nbsp;-&nbsp; by **Soybean** [<samp>(19749)</samp>](https://github.com/vexa-ui/vexa-ui/commit/197494c)
- **use-dismissable-layer**:
  - add enable parameter to useOutsidePointerDown for conditional event handling &nbsp;-&nbsp; by **Soybean** [<samp>(b6b58)</samp>](https://github.com/vexa-ui/vexa-ui/commit/b6b58c8)
- **use-element-size**:
  - implement composable for dynamic element size tracking using ResizeObserver &nbsp;-&nbsp; by **Soybean** [<samp>(01b17)</samp>](https://github.com/vexa-ui/vexa-ui/commit/01b1705)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **avatar-fallback**:
  - prevent rendering delay when not in client environment &nbsp;-&nbsp; by **Soybean** [<samp>(71eed)</samp>](https://github.com/vexa-ui/vexa-ui/commit/71eedf2)
- **dialog, popover**:
  - standardize escape key event naming to 'escapeKeyDown' for consistency across components &nbsp;-&nbsp; by **Soybean** [<samp>(bcdea)</samp>](https://github.com/vexa-ui/vexa-ui/commit/bcdeaf3)
- **dom**:
  - update getAriaLabel function to handle null element parameter &nbsp;-&nbsp; by **Soybean** [<samp>(f2027)</samp>](https://github.com/vexa-ui/vexa-ui/commit/f20278d)
- **popover, popper**:
  - update CSS variable definitions to ensure consistency in transform origin and remove duplicate entries &nbsp;-&nbsp; by **Soybean** [<samp>(108fd)</samp>](https://github.com/vexa-ui/vexa-ui/commit/108fd18)
- **popper**:
  - correct floatingStyles reference in popper-content component for proper styling application &nbsp;-&nbsp; by **Soybean** [<samp>(86bd2)</samp>](https://github.com/vexa-ui/vexa-ui/commit/86bd2ec)
  - handle undefined arrow position values to prevent CSS errors &nbsp;-&nbsp; by **Soybean** [<samp>(1c337)</samp>](https://github.com/vexa-ui/vexa-ui/commit/1c33790)
- **vite.config**:
  - specify root option for tsconfigPaths plugin &nbsp;-&nbsp; by **Soybean** [<samp>(bcc22)</samp>](https://github.com/vexa-ui/vexa-ui/commit/bcc22b3)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **checkbox, radio-group**:
  - implement useControllableState for modelValue management &nbsp;-&nbsp; by **Soybean** [<samp>(2d9b9)</samp>](https://github.com/vexa-ui/vexa-ui/commit/2d9b9fd)
- **components**:
  - remove unused 'as' prop from various components for cleaner code &nbsp;-&nbsp; by **Soybean** [<samp>(07969)</samp>](https://github.com/vexa-ui/vexa-ui/commit/07969e4)
  - dialog, popover: extract event handling logic into shared composable for better code reuse and maintainability &nbsp;-&nbsp; by **Soybean** [<samp>(03369)</samp>](https://github.com/vexa-ui/vexa-ui/commit/03369fb)
- **dialog**:
  - replace closeModal with onOpenChange for improved dialog state management &nbsp;-&nbsp; by **Soybean** [<samp>(430be)</samp>](https://github.com/vexa-ui/vexa-ui/commit/430be2f)
- **popper**:
  - rename element variable to anchorElement for clarity in popper-anchor component &nbsp;-&nbsp; by **Soybean** [<samp>(6fcea)</samp>](https://github.com/vexa-ui/vexa-ui/commit/6fceadc)
- **projects**:
  - add HTMLAttributes to components props &nbsp;-&nbsp; by **Soybean** [<samp>(bd6aa)</samp>](https://github.com/vexa-ui/vexa-ui/commit/bd6aa54)
- **types**:
  - remove style type definitions and update exports for cleaner type management &nbsp;-&nbsp; by **Soybean** [<samp>(eb926)</samp>](https://github.com/vexa-ui/vexa-ui/commit/eb92633)
  - update export for VisuallyHiddenInputProps to enhance type clarity &nbsp;-&nbsp; by **Soybean** [<samp>(d6e2a)</samp>](https://github.com/vexa-ui/vexa-ui/commit/d6e2a0b)
  - update ComponentRootProps to extend HTMLAttributes and improve type definitions &nbsp;-&nbsp; by **Soybean** [<samp>(a4c34)</samp>](https://github.com/vexa-ui/vexa-ui/commit/a4c34d7)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **deps**: update deps &nbsp;-&nbsp; by **Soybean** [<samp>(358d7)</samp>](https://github.com/vexa-ui/vexa-ui/commit/358d787)
- **types**: remove global type declaration for __DEV__ as it is no longer needed &nbsp;-&nbsp; by **Soybean** [<samp>(acbe5)</samp>](https://github.com/vexa-ui/vexa-ui/commit/acbe518)

### &nbsp;&nbsp;&nbsp;❤️ Contributors


[Soybean](mailto:soybeanjs@outlook.com)

## [v0.0.1-alpha.3](https://github.com/honghuangdc/soybean-primitives/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2025-05-29)

### &nbsp;&nbsp;&nbsp;🚀 Features

- integrate vite-tsconfig-paths for improved path resolution and update TypeScript types &nbsp;-&nbsp; by @soybeanjs [<samp>(24c0d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/24c0d80)
- implement presence management with state machine and enhance slot component for development checks &nbsp;-&nbsp; by @soybeanjs [<samp>(79be3)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/79be362)
- **App**:
  - add CollapsibleExample component and enhance layout styling &nbsp;-&nbsp; by @soybeanjs [<samp>(2875d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/2875d86)
  - integrate DialogExample component into main layout alongside AccordionExample &nbsp;-&nbsp; by @soybeanjs [<samp>(010b9)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/010b9f3)
  - add AlertDialogExample component to showcase alert dialog functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(44816)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/44816a7)
- **accordion**:
  - implement accordion component structure with root, item, header, content, trigger, and context management &nbsp;-&nbsp; by @soybeanjs [<samp>(183c5)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/183c566)
- **accordion, collapsible, dialog**:
  - add default props and improve type safety for open state management &nbsp;-&nbsp; by @soybeanjs [<samp>(f988e)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f988e20)
- **alert-dialog**:
  - implement alert dialog components including root, content, cancel, and context management &nbsp;-&nbsp; by @soybeanjs [<samp>(9307b)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9307be0)
- **arrow**:
  - introduce Arrow component and example for enhanced UI elements &nbsp;-&nbsp; by @soybeanjs [<samp>(4e70d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/4e70df3)
- **aspect-ratio**:
  - add AspectRatio component and example to manage aspect ratios in UI &nbsp;-&nbsp; by @soybeanjs [<samp>(9ead7)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9ead7c4)
- **avatar**:
  - introduce Avatar component with fallback and image loading features &nbsp;-&nbsp; by @soybeanjs [<samp>(31a55)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/31a55ca)
- **checkbox**:
  - add Checkbox component with various states and group functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(3dfcb)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/3dfcbee)
- **collapse**:
  - implement collapsible component with root, content, and trigger &nbsp;-&nbsp; by @soybeanjs [<samp>(5cddf)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5cddfe6)
- **collection**:
  - implement collection component with context management and item visibility controls &nbsp;-&nbsp; by @soybeanjs [<samp>(16d48)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/16d4843)
- **common**:
  - export isEqual function for value comparison &nbsp;-&nbsp; by @soybeanjs [<samp>(77571)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/7757146)
  - add pick and omit utility functions for object manipulation &nbsp;-&nbsp; by @soybeanjs [<samp>(397a1)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/397a188)
  - add utility functions to convert strings to PascalCase and CamelCase &nbsp;-&nbsp; by @soybeanjs [<samp>(c1c6d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c1c6d5f)
- **components**:
  - add dialog components to constants for enhanced dialog functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(2e2c0)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/2e2c00f)
  - add name options to various components for better identification in Vue devtools &nbsp;-&nbsp; by @soybeanjs [<samp>(c168c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c168c57)
  - introduce visually hidden components and types for improved accessibility &nbsp;-&nbsp; by @soybeanjs [<samp>(f4b32)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f4b321a)
- **composables**:
  - add useContext composable for context management &nbsp;-&nbsp; by @soybeanjs [<samp>(abec9)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/abec9c1)
  - add useVModel composable &nbsp;-&nbsp; by @soybeanjs [<samp>(d965b)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d965b05)
  - add useForwardElement composable for element reference management &nbsp;-&nbsp; by @soybeanjs [<samp>(f1775)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f17753b)
  - add composables of dismissable-layer &nbsp;-&nbsp; by @soybeanjs in https://github.com/honghuangdc/soybean-primitives/issues/1 [<samp>(35a95)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/35a9567)
  - introduce useGlobalState for managing global state across Vue instances &nbsp;-&nbsp; by @soybeanjs [<samp>(ed89b)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ed89b1c)
  - add useFocusScope for managing focus within a defined scope &nbsp;-&nbsp; by @soybeanjs [<samp>(ccf59)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ccf598c)
  - add useFocusGuards for managing focus elements in the DOM &nbsp;-&nbsp; by @soybeanjs [<samp>(23fa4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/23fa45e)
  - implement useSingleOrMultipleValue for handling single and multiple value selection &nbsp;-&nbsp; by @soybeanjs [<samp>(1a1c3)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1a1c3cc)
  - add useArrowNavigation for keyboard navigation through collection items &nbsp;-&nbsp; by @soybeanjs [<samp>(a46a3)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/a46a368)
  - add transformPropsToContext function for prop management in Vue components &nbsp;-&nbsp; by @soybeanjs [<samp>(9524d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9524d93)
  - add useSharedComposable for shared state management across Vue instances &nbsp;-&nbsp; by @soybeanjs [<samp>(cf121)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/cf12139)
  - introduce useExposedElement for exposing element refs to parent components &nbsp;-&nbsp; by @soybeanjs [<samp>(8dee7)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8dee7cc)
  - add useBodyScrollLock composable for managing body scroll behavior &nbsp;-&nbsp; by @soybeanjs [<samp>(d6ce5)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d6ce5ed)
  - add useForwardListeners composable for event emission handling &nbsp;-&nbsp; by @soybeanjs [<samp>(c98a7)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c98a71b)
- **config-provider**:
  - introduce ConfigProvider component with context and types for global configuration management &nbsp;-&nbsp; by @soybeanjs [<samp>(1e50e)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1e50e81)
- **constants**:
  - add COLLECTION_ITEM_ATTRIBUTE constant and export from index &nbsp;-&nbsp; by @soybeanjs [<samp>(6ae79)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/6ae79ff)
  - add new component entries for accordion, collapsible, configProvider, and portal &nbsp;-&nbsp; by @soybeanjs [<samp>(30398)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/30398cd)
- **dialog**:
  - implement dialog component with context management and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(adfcc)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/adfcc72)
  - introduce DialogContentImpl component for improved focus management and dismissable layer functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(8861f)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8861fa5)
  - integrate useHideOthers composable for improved accessibility and focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(1139a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1139a38)
  - add dialog example component showcasing usage of DialogRoot, DialogTrigger, and related elements &nbsp;-&nbsp; by @soybeanjs [<samp>(e08d4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e08d4d4)
- **dismissable-layer**:
  - enhance type safety and extend options interface with event handlers &nbsp;-&nbsp; by @soybeanjs [<samp>(98249)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/982499f)
- **dom**:
  - add new types for HTML attributes and image loading status &nbsp;-&nbsp; by @soybeanjs [<samp>(645af)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/645af01)
  - add utility functions to check for disabled elements and retrieve collection item elements &nbsp;-&nbsp; by @soybeanjs [<samp>(c51af)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c51af11)
- **examples**:
  - integrate CheckboxExample component into main application view &nbsp;-&nbsp; by @soybeanjs [<samp>(10544)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/10544da)
- **focus-scope**:
  - extend UseFocusScopeOptions interface with EmitsToHookProps and add tabindex property &nbsp;-&nbsp; by @soybeanjs [<samp>(56084)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5608428)
- **form**:
  - implement form utility functions for field name creation and value parsing &nbsp;-&nbsp; by @soybeanjs [<samp>(373f1)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/373f106)
- **guide**:
  - add comprehensive development guide for Soybean Primitives component library &nbsp;-&nbsp; by @soybeanjs [<samp>(8596d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8596d56)
  - update development guide with new components and best practices for context management &nbsp;-&nbsp; by @soybeanjs [<samp>(b9315)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/b931593)
- **hide-others**:
  - add useHideOthers composable to manage ARIA visibility &nbsp;-&nbsp; by @soybeanjs [<samp>(562a4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/562a4d9)
- **image-loading**:
  - add useImageLoadingStatus composable to track image loading status &nbsp;-&nbsp; by @soybeanjs [<samp>(ea9a9)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ea9a900)
- **label**:
  - add Label component with props and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(67c61)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/67c615f)
- **lifecycle**:
  - add utility functions for component lifecycle management with onBeforeUnmount and onScopeDispose &nbsp;-&nbsp; by @soybeanjs [<samp>(d1480)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d1480a6)
- **packages**:
  - add primitive presence &nbsp;-&nbsp; by @soybeanjs [<samp>(4546d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/4546dbd)
  - add collapsible &nbsp;-&nbsp; by @soybeanjs [<samp>(bd4d8)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/bd4d899)
- **playground**:
  - add PresentExample component and enhance App layout &nbsp;-&nbsp; by @soybeanjs [<samp>(4783a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/4783af4)
- **portal**:
  - add Portal component with teleport functionality and associated types &nbsp;-&nbsp; by @soybeanjs [<samp>(9aea3)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9aea3f6)
  - add default 'to' prop for improved flexibility in portal component &nbsp;-&nbsp; by @soybeanjs [<samp>(d0a02)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d0a0254)
- **radio-group**:
  - introduce RadioGroup component with context management and accessibility features &nbsp;-&nbsp; by @soybeanjs [<samp>(937ee)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/937eecf)
- **roving-focus**:
  - implement useRovingFocus composable for managing focus navigation in groups and items &nbsp;-&nbsp; by @soybeanjs [<samp>(8c3c9)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8c3c9f9)
  - enhance useRovingFocus composable with lifecycle hooks for item addition and removal &nbsp;-&nbsp; by @soybeanjs [<samp>(5ddc8)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5ddc807)
  - add Roving Focus examples with button group and button components &nbsp;-&nbsp; by @soybeanjs [<samp>(35866)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/3586632)
  - refactor `useRovingFocus` to component RovingFocusGroup and RovingFocusItem for improved focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(1c34c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1c34ce9)
- **section-wrapper**:
  - add SectionWrapper component for consistent layout and title handling in accordion and collapsible examples &nbsp;-&nbsp; by @soybeanjs [<samp>(c44f5)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c44f563)
- **shared**:
  - add utility functions for array manipulation, DOM handling, and focus management &nbsp;-&nbsp; by @soybeanjs [<samp>(d7958)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d7958e0)
  - add wrapArray utility function to enable array wrapping at a specified start index &nbsp;-&nbsp; by @soybeanjs [<samp>(913df)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/913df84)
- **tests**:
  - enhance testing setup with additional commands and configuration for coverage and UI &nbsp;-&nbsp; by @soybeanjs [<samp>(1cba2)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1cba28d)
- **tsdown**:
  - add entry for types in tsdown configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(9b5f8)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9b5f8c7)
- **types**:
  - define new types for class values, props context, and open state management &nbsp;-&nbsp; by @soybeanjs [<samp>(dd3d0)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/dd3d0c5)
  - add new types for data orientation, scroll options, and single/multiple selection handling &nbsp;-&nbsp; by @soybeanjs [<samp>(49d4a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/49d4a25)
  - introduce common types and event interfaces for improved type safety and component interaction &nbsp;-&nbsp; by @soybeanjs [<samp>(65d10)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/65d108e)
  - add FormFieldProps interface to define form field properties for better form handling &nbsp;-&nbsp; by @soybeanjs [<samp>(d3a78)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d3a78e5)
- **vite**:
  - configure server to open automatically on start &nbsp;-&nbsp; by @soybeanjs [<samp>(2dd76)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/2dd7676)
  - add vite-plugin-vue-devtools to enhance Vue development experience &nbsp;-&nbsp; by @soybeanjs [<samp>(329ac)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/329ac34)
- **vue**:
  - enhance element reference handling with unrefElement utility and improve type imports &nbsp;-&nbsp; by @soybeanjs [<samp>(88012)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/880124f)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **accordion, collapsible**:
  - update trigger and content ID initialization to include component-specific prefixes for better uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(637f1)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/637f1c5)
- **composables**:
  - improve error handling in useInject to ensure consumerName is validated only when provided &nbsp;-&nbsp; by @soybeanjs [<samp>(c6657)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c665796)
  - update elRef type in usePresence to allow null values &nbsp;-&nbsp; by @soybeanjs [<samp>(d3f5a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d3f5a58)
- **context**:
  - rename element reference variables for consistency in useForwardElement &nbsp;-&nbsp; by @soybeanjs [<samp>(b76c2)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/b76c20c)
- **hooks**:
  - enhance useForwardElement to support generic HTMLElement types and ensure node assignment is conditional &nbsp;-&nbsp; by @soybeanjs [<samp>(1b7dd)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1b7dd11)
- **shared**:
  - update transformPropsToContext to handle function props correctly &nbsp;-&nbsp; by @soybeanjs [<samp>(e005e)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e005e53)
- **slot**:
  - update import path for getRawChildren to maintain correct module resolution &nbsp;-&nbsp; by @soybeanjs [<samp>(8aacd)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8aacdeb)
- **tsdown**:
  - update external dependencies in tsdown configuration and export additional types in index &nbsp;-&nbsp; by @soybeanjs [<samp>(fe766)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/fe76624)

### &nbsp;&nbsp;&nbsp;💅 Refactors

- **accordion**:
  - rename root element reference for clarity and update trigger ID prefix for uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(19086)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1908641)
  - replace direct collection item attribute usage with utility function to improve keydown handling &nbsp;-&nbsp; by @soybeanjs [<samp>(5e894)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5e89463)
- **alert-dialog, roving-focus**:
  - update context usage in alert-dialog-cancel and roving-focus-item to include specific component names &nbsp;-&nbsp; by @soybeanjs [<samp>(0ad27)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/0ad27cd)
- **body-scroll-lock**:
  - simplify scroll lock logic and improve iOS touch handling &nbsp;-&nbsp; by @soybeanjs [<samp>(31201)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/31201b4)
- **checkbox**:
  - remove unused constants and CSS variables from shared checkbox file &nbsp;-&nbsp; by @soybeanjs [<samp>(494f4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/494f4c3)
  - consolidate CheckedState type definition and update related functions for clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(fac63)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/fac63ac)
  - simplify checkbox component structure and enhance group functionality with improved state management &nbsp;-&nbsp; by @soybeanjs [<samp>(4d4ec)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/4d4ecf5)
  - enhance accessibility and state management by introducing getAriaLabel function and updating element references &nbsp;-&nbsp; by @soybeanjs [<samp>(472ba)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/472ba7e)
  - improve type safety by ensuring modelValue updates only with non-nullable values &nbsp;-&nbsp; by @soybeanjs [<samp>(1c300)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1c30015)
- **collapsible**:
  - rename context functions and update data handling for collapsible components &nbsp;-&nbsp; by @soybeanjs [<samp>(ef610)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ef610e9)
  - update element reference handling and enhance content ID uniqueness &nbsp;-&nbsp; by @soybeanjs [<samp>(e2673)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e267331)
- **common, env**:
  - move isBrowser and isClient functions to a new env.ts file and clean up common.ts &nbsp;-&nbsp; by @soybeanjs [<samp>(95ea1)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/95ea14b)
- **component-item**:
  - initialize trigger ID with a unique value to ensure proper context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(da55f)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/da55f7f)
- **components**:
  - rename getOpenState to getDisclosureState and update related types for consistency across accordion, collapsible, dialog, and guide components &nbsp;-&nbsp; by @soybeanjs [<samp>(a1f95)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/a1f9553)
  - update collection item and list components to use v-bind for props and improve context handling &nbsp;-&nbsp; by @soybeanjs [<samp>(df643)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/df6436f)
- **composables**:
  - simplify useContext API by removing options parameter and enhancing error handling &nbsp;-&nbsp; by @soybeanjs [<samp>(73da4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/73da47d)
  - remove useSharedComposable for code simplification and clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(dbe4c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/dbe4cae)
  - update useForwardElement to return array destructuring for improved clarity &nbsp;-&nbsp; by @soybeanjs [<samp>(2e134)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/2e1343f)
- **context**:
  - replace inline open state logic with getOpenState utility for consistency across components &nbsp;-&nbsp; by @soybeanjs [<samp>(c1c43)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c1c43b2)
- **dialog**:
  - update dialog component to use v-bind for dismissable layer and focus scope props &nbsp;-&nbsp; by @soybeanjs [<samp>(ceba2)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ceba21d)
- **examples**:
  - update import paths for alert-dialog, collapsible, and dialog components to streamline module resolution &nbsp;-&nbsp; by @soybeanjs [<samp>(01dec)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/01dec7b)
- **hooks**:
  - use `useControllableState` replace `useVModel` &nbsp;-&nbsp; by @soybeanjs [<samp>(aa2de)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/aa2deef)
- **index**:
  - reorganize exports to include accordion, config-provider, and maintain existing components &nbsp;-&nbsp; by @soybeanjs [<samp>(8c19d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8c19d5a)
- **isFormControl**:
  - update parameter type to allow null values for better type safety &nbsp;-&nbsp; by @soybeanjs [<samp>(7056d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/7056d50)
- **package**:
  - remove klona dependency and update clone function implementation &nbsp;-&nbsp; by @soybeanjs [<samp>(27801)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/278019e)
- **portal**:
  - extend PortalProps interface to include ForceMountProps for enhanced functionality &nbsp;-&nbsp; by @soybeanjs [<samp>(ba480)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ba480da)
- **projects**:
  - refactor presence &nbsp;-&nbsp; by @soybeanjs [<samp>(b833c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/b833caa)
  - use local variants replace `@soybean-ui/variants` &nbsp;-&nbsp; by @soybeanjs [<samp>(fa746)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/fa74617)
  - refactor checkbox, radio &nbsp;-&nbsp; by @soybeanjs [<samp>(3c2a8)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/3c2a8a5)
- **roving-focus, use-collection**:
  - update context and function names for clarity, enhancing element management and focus handling &nbsp;-&nbsp; by @soybeanjs [<samp>(0025a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/0025a02)
- **shared**:
  - reorganize utility functions into dedicated files and remove deprecated functions &nbsp;-&nbsp; by @soybeanjs [<samp>(2b568)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/2b568e8)
  - rename isDisabledElement to isElementHasAttribute and generalize functionality to check for any attribute &nbsp;-&nbsp; by @soybeanjs [<samp>(74c68)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/74c68f3)
- **tsdown.config**:
  - update entry points to dynamically include component indices using fast-glob &nbsp;-&nbsp; by @soybeanjs [<samp>(00fb8)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/00fb806)
- **use-arrow-navigation**:
  - enhance navigation logic with improved key mapping, configuration options, and performance optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(90156)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/9015664)
- **use-body-scroll-lock**:
  - enhance scroll locking mechanism by utilizing CSS classes for improved performance and maintainability &nbsp;-&nbsp; by @soybeanjs [<samp>(1f6be)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1f6beb2)
  - optimize scroll lock implementation with enhanced CSS class management and improved performance &nbsp;-&nbsp; by @soybeanjs [<samp>(714b4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/714b4c0)
- **use-context**:
  - enhance useInject function to handle nullish consumer names and return null for undefined values &nbsp;-&nbsp; by @soybeanjs [<samp>(d1210)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/d12102d)
- **use-dismissable-layer**:
  - improve type definitions and enhance client checks &nbsp;-&nbsp; by @soybeanjs [<samp>(5d80c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5d80c94)
  - improve layer management and event handling with enhanced encapsulation and performance optimizations &nbsp;-&nbsp; by @soybeanjs [<samp>(f9c69)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f9c6960)
  - extract DismissableLayerManager to a separate file for improved organization and maintainability &nbsp;-&nbsp; by @soybeanjs [<samp>(f8bfd)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f8bfd59)
- **useHideOthers**:
  - update target parameter type to Ref and simplify watch logic &nbsp;-&nbsp; by @soybeanjs [<samp>(a56c9)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/a56c911)
- **visually-hidden**:
  - replace FormFieldProps with FormNameValueProps and update related parsing functions &nbsp;-&nbsp; by @soybeanjs [<samp>(e4eea)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e4eea54)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **use-context**: add JSDoc comments for useInject function to clarify parameters and return value &nbsp;-&nbsp; by @soybeanjs [<samp>(83a58)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/83a585d)

### &nbsp;&nbsp;&nbsp;🏡 Chore

- **.gitignore**:
  - add .temp to ignore list for temporary files &nbsp;-&nbsp; by @soybeanjs [<samp>(77d23)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/77d23cd)
- **dependencies**:
  - add klona &nbsp;-&nbsp; by @soybeanjs [<samp>(c6e70)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/c6e7030)
  - update package.json and pnpm-lock.yaml to include new Unocss presets and dependencies, and remove unused style.css file &nbsp;-&nbsp; by @soybeanjs [<samp>(f510c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f510cc5)
  - update package.json and pnpm-lock.yaml with new dependencies and versions, add accordion example to playground &nbsp;-&nbsp; by @soybeanjs [<samp>(ec46b)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ec46be3)
- **deps**:
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(5f8fa)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5f8fa59)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(08b43)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/08b43a1)
  - update deps &nbsp;-&nbsp; by @soybeanjs [<samp>(b6ac4)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/b6ac43c)
  - add clsx, tailwind-merge, and tailwind-variants packages to dependencies &nbsp;-&nbsp; by @soybeanjs [<samp>(1de20)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1de2005)
- **eslint**:
  - update ESLint rules to disable max-params and no-empty-object-type &nbsp;-&nbsp; by @soybeanjs [<samp>(3b81e)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/3b81eea)
  - disable 'vue/multi-word-component-names' rule in ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(86051)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/86051b2)
  - disable vue/no-static-inline-styles rule in ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(5ee0a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/5ee0ad7)
  - add 'vue/no-reserved-component-names' rule to ESLint configuration &nbsp;-&nbsp; by @soybeanjs [<samp>(f41dd)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/f41dd3b)
- **index**:
  - update document title from "Template Vue TSDown" to "Soybean Primitives" &nbsp;-&nbsp; by @soybeanjs [<samp>(1a389)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1a38919)
- **package**:
  - rename project from Soybean Primitives to Vexa UI and update descriptions, homepage, and repository links &nbsp;-&nbsp; by @soybeanjs [<samp>(8dee0)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8dee09f)
  - rename project from Vexa UI to Soybean Primitives and update related metadata in package.json and README.md &nbsp;-&nbsp; by @soybeanjs [<samp>(033e1)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/033e17c)
- **projects**:
  - optimize build &nbsp;-&nbsp; by @soybeanjs [<samp>(e1593)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e159310)
  - use tsdown unbundle mode &nbsp;-&nbsp; by @soybeanjs [<samp>(8a25f)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8a25f60)
- **rules**:
  - add project standards, structure guidelines, and TypeScript best practices documentation &nbsp;-&nbsp; by @soybeanjs [<samp>(e6ea5)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/e6ea533)

### &nbsp;&nbsp;&nbsp;🎨 Styles

- **present**: enhance button styling and update layout for usePresence example &nbsp;-&nbsp; by @soybeanjs [<samp>(b2cac)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/b2cac72)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.1-alpha.2](https://github.com/honghuangdc/soybean-primitives/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2025-05-16)

### &nbsp;&nbsp;&nbsp;🚀 Features

- enhance ESLint and TypeScript configurations, add new components, and remove demo package &nbsp;-&nbsp; by @soybeanjs [<samp>(6c34d)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/6c34dba)
- **projects**: add playground & vitest & update build config &nbsp;-&nbsp; by @soybeanjs [<samp>(ff2cb)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/ff2cbf6)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- add initial changelog for v0.0.1-alpha.1 &nbsp;-&nbsp; by @soybeanjs [<samp>(4bab6)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/4bab6ba)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

## [v0.0.1-alpha.1](https://github.com/honghuangdc/soybean-primitives/compare/undefined...v0.0.1-alpha.1) (2025-05-13)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **pkg**:
  - add package placeholder &nbsp;-&nbsp; by @soybeanjs [<samp>(17f78)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/17f7829)
  - add publishConfig for npm registry &nbsp;-&nbsp; by @soybeanjs [<samp>(8ac49)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/8ac4960)
- **projects**:
  - init projects &nbsp;-&nbsp; by @soybeanjs [<samp>(1961a)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/1961a53)

### &nbsp;&nbsp;&nbsp;📖 Documentation

- **projects**: add README &nbsp;-&nbsp; by @soybeanjs [<samp>(14d5c)</samp>](https://github.com/honghuangdc/soybean-primitives/commit/14d5ca4)

### &nbsp;&nbsp;&nbsp;❤️ Contributors

[![soybeanjs](https://github.com/soybeanjs.png?size=48)](https://github.com/soybeanjs)&nbsp;&nbsp;

