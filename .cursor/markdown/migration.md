# Migration Guide

this guide is for migrating the already existing code ".temp/soybean-ui" to current project with standard structure and code.

## Code Location

### Headless Components

source code: ".temp/soybean-ui/packages/primitives"

target code: "src"

### UI Components

source code: ".temp/soybean-ui/packages/soy-ui"

target code: "ui"

### Attentions

- keep the original code content, only change the structure and code style with standard.

### Alternative

some composables used in the original code are not in the current project, you can use the following alternatives:

- useForwardRef, useForwardExpose => useForwardElement, useExposedElement (if you need to expose the element)
- useForwardPropsEmits => useOmitProps, usePickProps, useForwardListeners
- useForwardProps => deprecated, use useOmitProps, usePickProps if needed
- useVModel => useControllableState
