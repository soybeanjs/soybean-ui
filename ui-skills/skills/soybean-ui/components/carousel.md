# Carousel

Source URL: https://ui.soybeanjs.cn/components/carousel
Markdown URL: https://ui.soybeanjs.cn/components/carousel.md
Category: Data Display
Description: Carousel is built on top of Embla Carousel and lets users browse a sequence of content horizontally or vertically.

## Overview

Carousel is built on top of Embla Carousel and lets users browse a sequence of content horizontally or vertically.

## Usage

Usage examples for carousel are rendered on the site.

## Demos

Interactive demos for carousel are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (10): Carousel, CarouselCompact, CarouselContainer, CarouselContent, CarouselControl, CarouselItem, CarouselNavigation, CarouselNext, CarouselPrevious, CarouselRoot.

### Carousel

#### Props

Properties for the Carousel component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CarouselUi>`; optional)
- `size`: The size of the carousel, which determines the spacing and sizing of its elements. (type `ThemeSize`; optional)
- `floatNav`: Whether to use floating navigation, which positions the navigation controls outside of the carousel content and allows them to float over the content. This is useful for carousels with a lot of content or when you want to maximize the space available for the slides. (type `boolean`; optional)
- `slides`: Slides to be rendered in the carousel. (type `T[]`; required)
- `contentProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselContentProps`; optional)
- `containerProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselContainerProps`; optional)
- `itemProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselItemProps`; optional)
- `controlProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselControlProps`; optional)
- `navigationProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselNavigationProps`; optional)
- `previousProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselPreviousProps`; optional)
- `nextProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselNextProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `options`: Options. (type `Partial<import("../../../node_modules/embla-carousel/esm/components/Options").OptionsType>`; optional)
- `plugins`: Plugins. (type `import("embla-carousel").CreatePluginType<import("../../../node_modules/embla-carousel/esm/components/Plugins").Loose...`; optional)

#### Emits

Events for the Carousel component.

- `init`: Emitted when init occurs. (type `[carousel: EmblaCarouselType]`; parameters `carousel: EmblaCarouselType`)

#### Slots

Slots for the Carousel component.

- `item`: Default slot for the carousel component, which can be used to render custom content in the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps & { slide: T; index: number; selected: boolean; }) => any) | undefined`)
- `control`: Control slot for the carousel component, which can be used to render custom controls for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)
- `previous`: Navigation slot for the carousel component, which can be used to render custom navigation for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)
- `next`: Next slot for the carousel component, which can be used to render custom next controls for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)

### CarouselCompact

#### Props

Properties for the CarouselCompact component.

- `slides`: Slides to be rendered in the carousel. (type `T[]`; required)
- `contentProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselContentProps`; optional)
- `containerProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselContainerProps`; optional)
- `itemProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselItemProps`; optional)
- `controlProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselControlProps`; optional)
- `navigationProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselNavigationProps`; optional)
- `previousProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselPreviousProps`; optional)
- `nextProps`: Per-slot properties for the component, allowing you to pass props directly to the sub components without needing to use the `v-slot` API. This is useful for quickly customizing the sub components without needing to use the full flexibility of slots. (type `CarouselNextProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `options`: Options. (type `Partial<import("../../../node_modules/embla-carousel/esm/components/Options").OptionsType>`; optional)
- `plugins`: Plugins. (type `import("embla-carousel").CreatePluginType<import("../../../node_modules/embla-carousel/esm/components/Plugins").Loose...`; optional)

#### Emits

Events for the CarouselCompact component.

- `init`: Emitted when init occurs. (type `[carousel: EmblaCarouselType]`; parameters `carousel: EmblaCarouselType`)

#### Slots

Slots for the CarouselCompact component.

- `item`: Default slot for the carousel component, which can be used to render custom content in the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps & { slide: T; index: number; selected: boolean; }) => any) | undefined`)
- `control`: Control slot for the carousel component, which can be used to render custom controls for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)
- `previous`: Navigation slot for the carousel component, which can be used to render custom navigation for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)
- `next`: Next slot for the carousel component, which can be used to render custom next controls for the carousel. The slot props include all the necessary information and methods to control the carousel, such as the carousel instance, whether it can scroll next or prev, the selected index, scroll snaps, progress, and methods to scroll next, prev, or to a specific index. (type `((props: CarouselRootSlotProps) => any) | undefined`)

### CarouselContainer

- No documented props, emits, slots, or slot props were available.

### CarouselContent

- No documented props, emits, slots, or slot props were available.

### CarouselControl

- No documented props, emits, slots, or slot props were available.

### CarouselItem

- No documented props, emits, slots, or slot props were available.

### CarouselNavigation

- No documented props, emits, slots, or slot props were available.

### CarouselNext

#### Props

Properties for the CarouselNext component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CarouselPrevious

#### Props

Properties for the CarouselPrevious component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CarouselRoot

#### Props

Properties for the CarouselRoot component.

- `dir`: Reading direction of the component. (type `Direction`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `options`: Options. (type `Partial<import("../../../node_modules/embla-carousel/esm/components/Options").OptionsType>`; optional)
- `plugins`: Plugins. (type `import("embla-carousel").CreatePluginType<import("../../../node_modules/embla-carousel/esm/components/Plugins").Loose...`; optional)

#### Emits

Events for the CarouselRoot component.

- `init`: Emitted when init occurs. (type `[carousel: EmblaCarouselType]`; parameters `carousel: EmblaCarouselType`)

#### Slots

Slots for the CarouselRoot component.

- `default`: No description. (type `((props: CarouselRootSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for the CarouselRoot component.

- `carousel`: No description. (type `EmblaCarouselType | undefined`; required)
- `canScrollNext`: No description. (type `boolean`; required)
- `canScrollPrev`: No description. (type `boolean`; required)
- `selectedIndex`: No description. (type `number`; required)
- `scrollSnaps`: No description. (type `number[]`; required)
- `progress`: No description. (type `number`; required)
- `scrollNext`: No description. (type `() => void`; required)
- `scrollPrev`: No description. (type `() => void`; required)
- `scrollTo`: No description. (type `(index: number, jump?: boolean) => void`; required)
