# Components

> Auto-generated. Run `pnpm sui skills` to update.

Shared component index for the SoybeanHeadless consumer skill.
Links point to the SoybeanUI generated component reference files because those files already include headless exports such as `Root`, `Trigger`, `Content`, and `Compact` symbols from the generated API metadata.

## General

| Component | Description | Shared File |
| --- | --- | --- |
| **button** | A button component that can be used to trigger an action. | [soybean-ui/components/button.md](../../soybean-ui/components/button.md) |
| **clipboard** | A clipboard action component for copying text values with accessible button semantics and copied-state feedback. | [soybean-ui/components/clipboard.md](../../soybean-ui/components/clipboard.md) |
| **config-provider** | The `SConfigProvider` component is the root configuration provider for the SoybeanUI library. It manages global themes, localization, icon settings, and other context-aware features. It should wrap your entire application or specific sections that require isolated configuration. | [soybean-ui/components/config-provider.md](../../soybean-ui/components/config-provider.md) |
| **icon** | `SIcon` is a unified icon component built on top of [Iconify](https://iconify.design/). It supports rendering icons from the Iconify dataset or custom components/VNodes. It integrates with `SConfigProvider` for consistent sizing across the application. | [soybean-ui/components/icon.md](../../soybean-ui/components/icon.md) |
| **link** | A styled anchor tag or router link component. | [soybean-ui/components/link.md](../../soybean-ui/components/link.md) |
| **spinner** | `SSpinner` is a lightweight loading indicator built on top of `SIcon`. It defaults to the Iconify `svg-spinners` | [soybean-ui/components/spinner.md](../../soybean-ui/components/spinner.md) |

## Layout

| Component | Description | Shared File |
| --- | --- | --- |
| **aspect-ratio** | Displays content within a desired ratio. | [soybean-ui/components/aspect-ratio.md](../../soybean-ui/components/aspect-ratio.md) |
| **layout** | The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas. | [soybean-ui/components/layout.md](../../soybean-ui/components/layout.md) |
| **separator** | Visually or semantically separates content. | [soybean-ui/components/separator.md](../../soybean-ui/components/separator.md) |
| **splitter** | A composable layout component that divides an area into resizable panels. | [soybean-ui/components/splitter.md](../../soybean-ui/components/splitter.md) |
| **toolbar** | A compact container that groups related actions, links, and toggle controls into a single roving-focus toolbar. | [soybean-ui/components/toolbar.md](../../soybean-ui/components/toolbar.md) |

## Navigation

| Component | Description | Shared File |
| --- | --- | --- |
| **anchor** | Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling. | [soybean-ui/components/anchor.md](../../soybean-ui/components/anchor.md) |
| **breadcrumb** | Breadcrumbs allow users to navigate through the hierarchy of pages. It displays the current location within the application structure. | [soybean-ui/components/breadcrumb.md](../../soybean-ui/components/breadcrumb.md) |
| **command** | Fast, composable, command menu for Vue. | [soybean-ui/components/command.md](../../soybean-ui/components/command.md) |
| **context-menu** | Displays a menu located at the pointer, triggered by a right-click. | [soybean-ui/components/context-menu.md](../../soybean-ui/components/context-menu.md) |
| **dropdown-menu** | Displays a menu to the user—such as a set of actions or functions—triggered by a button. | [soybean-ui/components/dropdown-menu.md](../../soybean-ui/components/dropdown-menu.md) |
| **menu** | The Menu component family allows you to build complex nested menus, including dropdowns and context menus. It supports a data-driven approach using `SMenuOptions` for easy configuration of groups, submenus, checkboxes, and radio items. | [soybean-ui/components/menu.md](../../soybean-ui/components/menu.md) |
| **menubar** | Displays a persistent application-style menu bar with horizontal trigger navigation, nested menus, and keyboard roving focus. | [soybean-ui/components/menubar.md](../../soybean-ui/components/menubar.md) |
| **navigation-menu** | A collection of links for navigating websites. Supports submenus and responsive behavior. | [soybean-ui/components/navigation-menu.md](../../soybean-ui/components/navigation-menu.md) |
| **page-tabs** | A tabbed interface designed for navigating between different pages or views. It supports features like closable tabs, context menus, and customizable styling. | [soybean-ui/components/page-tabs.md](../../soybean-ui/components/page-tabs.md) |
| **pagination** | Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page. | [soybean-ui/components/pagination.md](../../soybean-ui/components/pagination.md) |
| **stepper** | Displays progress through a multi-step workflow. | [soybean-ui/components/stepper.md](../../soybean-ui/components/stepper.md) |
| **tabs** | A set of layered sections of content—known as tab panels—that are displayed one at a time. | [soybean-ui/components/tabs.md](../../soybean-ui/components/tabs.md) |
| **tree** | A component used to display hierarchical data. | [soybean-ui/components/tree.md](../../soybean-ui/components/tree.md) |
| **tree-menu** | A hierarchical menu component commonly used for sidebar navigation. It supports nested items, grouping, icons, badges, and collapse state. | [soybean-ui/components/tree-menu.md](../../soybean-ui/components/tree-menu.md) |

## Forms

| Component | Description | Shared File |
| --- | --- | --- |
| **autocomplete** | Autocomplete filters suggestion items from text input and quickly fills the input with a selected result. | [soybean-ui/components/autocomplete.md](../../soybean-ui/components/autocomplete.md) |
| **calendar** | Browse and select dates by month with support for single or multiple selection, disabled dates, range limits, custom cell rendering, and built-in month/year Select controls in the compact header. | [soybean-ui/components/calendar.md](../../soybean-ui/components/calendar.md) |
| **calendar-range** | CalendarRange displays one or more month grids and lets users choose a start and end date directly from the calendar surface. | [soybean-ui/components/calendar-range.md](../../soybean-ui/components/calendar-range.md) |
| **checkbox** | A control that allows the user to select one or more items from a set. | [soybean-ui/components/checkbox.md](../../soybean-ui/components/checkbox.md) |
| **color-area** | A two-dimensional color editor for saturation/lightness, saturation/brightness, or OKLCH chroma/lightness selection. | [soybean-ui/components/color-area.md](../../soybean-ui/components/color-area.md) |
| **color-field** | An input for editing either a full color string or a single channel, with support for `hex`, `rgb`, `hsl`, and `oklch` output. | [soybean-ui/components/color-field.md](../../soybean-ui/components/color-field.md) |
| **color-picker** | A composite color picker that combines a color area, hue/alpha sliders, formatted inputs, and preset swatches, with full `oklch` editing and output support. | [soybean-ui/components/color-picker.md](../../soybean-ui/components/color-picker.md) |
| **color-slider** | A single-channel color slider for hue, alpha, and individual RGB/HSL/HSV/OKLCH channels. | [soybean-ui/components/color-slider.md](../../soybean-ui/components/color-slider.md) |
| **color-swatch-picker** | Choose a color quickly from a preset palette, useful for theme panels and suggested color selections. | [soybean-ui/components/color-swatch-picker.md](../../soybean-ui/components/color-swatch-picker.md) |
| **combobox** | A combobox component for searching and selecting values from an option list, with explicit anchor composition, clearable input support, and more complete popup and filtering behavior. | [soybean-ui/components/combobox.md](../../soybean-ui/components/combobox.md) |
| **date-field** | DateField is a segmented date input that keeps keyboard-editable parts for day, month, year, and optional time values while still submitting a native form value. | [soybean-ui/components/date-field.md](../../soybean-ui/components/date-field.md) |
| **date-picker** | A date picker component that combines a text input with a calendar popup for selecting dates. | [soybean-ui/components/date-picker.md](../../soybean-ui/components/date-picker.md) |
| **date-range-field** | DateRangeField is a segmented date range input that provides two sets of editable date segments for selecting a start and end date, while submitting native form values for both dates. | [soybean-ui/components/date-range-field.md](../../soybean-ui/components/date-range-field.md) |
| **date-range-picker** | A date range picker component that allows users to select a start and end date from a calendar popup. | [soybean-ui/components/date-range-picker.md](../../soybean-ui/components/date-range-picker.md) |
| **editable** | An inline text editor that switches between preview and edit states. | [soybean-ui/components/editable.md](../../soybean-ui/components/editable.md) |
| **form** | Building forms with validation and error handling. Supports schema validation via Zod, Valibot, etc. | [soybean-ui/components/form.md](../../soybean-ui/components/form.md) |
| **input** | Displays a form input field or a component that looks like an input field. It supports standard input attributes, icons, and clearable functionality. | [soybean-ui/components/input.md](../../soybean-ui/components/input.md) |
| **input-number** | A text input field that only accepts numeric input. Supports increment/decrement controls. | [soybean-ui/components/input-number.md](../../soybean-ui/components/input-number.md) |
| **input-otp** | InputOtp is a one-time-password input built around a real native input. It keeps the robust selection, paste, and mobile autofill behavior from vue-input-otp while exposing a default SoybeanUI presentation and a fully custom scoped slot. | [soybean-ui/components/input-otp.md](../../soybean-ui/components/input-otp.md) |
| **label** | `SLabel` is a primitive component used to render accessible labels for form controls. It supports standard styled variants and integrates seamlessly with the design system. | [soybean-ui/components/label.md](../../soybean-ui/components/label.md) |
| **month-picker** | MonthPicker lets users pick a month from a year-based popup while keeping the selected value as a `DateValue` anchored to the first day of that month. | [soybean-ui/components/month-picker.md](../../soybean-ui/components/month-picker.md) |
| **month-range-picker** | MonthRangePicker lets users select a start and end month from a year-based popup while preserving values as `DateValue` objects anchored to the first day of each selected month. | [soybean-ui/components/month-range-picker.md](../../soybean-ui/components/month-range-picker.md) |
| **password** | A password input field with a toggle button to show/hide the password. | [soybean-ui/components/password.md](../../soybean-ui/components/password.md) |
| **radio-group** | A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time. | [soybean-ui/components/radio-group.md](../../soybean-ui/components/radio-group.md) |
| **segment** | A linear set of two or more segments, each of which functions as a mutually exclusive button. | [soybean-ui/components/segment.md](../../soybean-ui/components/segment.md) |
| **select** | Displays a list of options for the user to pick from—triggered by a button. | [soybean-ui/components/select.md](../../soybean-ui/components/select.md) |
| **slider** | A slider component for selecting one or more numeric values within a continuous range, with horizontal and vertical support. | [soybean-ui/components/slider.md](../../soybean-ui/components/slider.md) |
| **switch** | A control that allows the user to toggle between checked and not checked. | [soybean-ui/components/switch.md](../../soybean-ui/components/switch.md) |
| **tags-input** | A composable multi-value input for adding, displaying, and removing tags, with support for object values, delimiter-based creation, and keyboard navigation. | [soybean-ui/components/tags-input.md](../../soybean-ui/components/tags-input.md) |
| **textarea** | Multi-line text input field. Supports auto-resizing and character count. | [soybean-ui/components/textarea.md](../../soybean-ui/components/textarea.md) |
| **time-field** | TimeField is a segmented time input for hour, minute, optional second, and locale-aware day period editing while still submitting a native form value. | [soybean-ui/components/time-field.md](../../soybean-ui/components/time-field.md) |
| **time-picker** | TimePicker lets users choose a single time from a popup list while preserving the selected value as a `TimeValue`. | [soybean-ui/components/time-picker.md](../../soybean-ui/components/time-picker.md) |
| **time-range-field** | TimeRangeField is a segmented time range input with independent editable start and end time segments while still submitting native form values for both sides. | [soybean-ui/components/time-range-field.md](../../soybean-ui/components/time-range-field.md) |
| **time-range-picker** | TimeRangePicker lets users select a start and end time from a popup list while preserving the selected values as `TimeValue` objects. | [soybean-ui/components/time-range-picker.md](../../soybean-ui/components/time-range-picker.md) |
| **toggle** | A two-state button that toggles between pressed and unpressed. | [soybean-ui/components/toggle.md](../../soybean-ui/components/toggle.md) |
| **toggle-group** | A set of two-state buttons that can be toggled on or off as a single or multiple selection group. | [soybean-ui/components/toggle-group.md](../../soybean-ui/components/toggle-group.md) |
| **year-picker** | YearPicker lets users choose a single year from a paged year grid while preserving the selected value as a `DateValue` anchored to the first day of that year. | [soybean-ui/components/year-picker.md](../../soybean-ui/components/year-picker.md) |
| **year-range-picker** | YearRangePicker lets users select a start and end year from a paged year grid while preserving the selected values as `DateValue` objects anchored to the first day of each year. | [soybean-ui/components/year-range-picker.md](../../soybean-ui/components/year-range-picker.md) |

## Data Display

| Component | Description | Shared File |
| --- | --- | --- |
| **accordion** | A vertically stacked set of interactive headings that each reveal a section of content. It supports single or multiple expansion modes and fully customizable styling. | [soybean-ui/components/accordion.md](../../soybean-ui/components/accordion.md) |
| **affix** | Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling. | [soybean-ui/components/affix.md](../../soybean-ui/components/affix.md) |
| **avatar** | An image element with a fallback for representing the user. | [soybean-ui/components/avatar.md](../../soybean-ui/components/avatar.md) |
| **backtop** | Backtop reveals a floating button after the scroll target passes a threshold and scrolls that target back to the start when activated. | [soybean-ui/components/backtop.md](../../soybean-ui/components/backtop.md) |
| **badge** | A small, interactive component used to categorize or label content. | [soybean-ui/components/badge.md](../../soybean-ui/components/badge.md) |
| **card** | A container component that groups related content and actions. It supports headers, footers, titles, descriptions, and can be split into sections. | [soybean-ui/components/card.md](../../soybean-ui/components/card.md) |
| **carousel** | Carousel is built on top of Embla Carousel and lets users browse a sequence of content horizontally or vertically. | [soybean-ui/components/carousel.md](../../soybean-ui/components/carousel.md) |
| **collapsible** | An interactive component which expands/collapses a panel. | [soybean-ui/components/collapsible.md](../../soybean-ui/components/collapsible.md) |
| **color-swatch** | A read-only color preview block with support for transparent and OKLCH values. | [soybean-ui/components/color-swatch.md](../../soybean-ui/components/color-swatch.md) |
| **empty** | A lightweight empty state component for highlighting missing content, actions, and follow-up guidance. | [soybean-ui/components/empty.md](../../soybean-ui/components/empty.md) |
| **kbd** | Represents a keyboard input element. Useful for displaying keyboard shortcuts. | [soybean-ui/components/kbd.md](../../soybean-ui/components/kbd.md) |
| **list** | A container for displaying a list of items. | [soybean-ui/components/list.md](../../soybean-ui/components/list.md) |
| **progress** | A progress bar component for displaying determinate or indeterminate task completion. | [soybean-ui/components/progress.md](../../soybean-ui/components/progress.md) |
| **scroll-area** | A custom scroll container that keeps native scrolling behavior while rendering styled scrollbars for vertical and horizontal overflow. | [soybean-ui/components/scroll-area.md](../../soybean-ui/components/scroll-area.md) |
| **skeleton** | A skeleton placeholder component for loading states. | [soybean-ui/components/skeleton.md](../../soybean-ui/components/skeleton.md) |
| **table** | A data table component for displaying row and column data. Supports grouped headers, sorting, filtering, selection, expansion, tree rows, virtualization, empty states, and more, with default and simple visual variants plus a rounded toggle. | [soybean-ui/components/table.md](../../soybean-ui/components/table.md) |
| **tag** | A small, interactive component used to categorize or label content. | [soybean-ui/components/tag.md](../../soybean-ui/components/tag.md) |
| **virtualizer** | A virtual scrolling component that efficiently renders large lists by only rendering items currently in the viewport. | [soybean-ui/components/virtualizer.md](../../soybean-ui/components/virtualizer.md) |

## Feedback

| Component | Description | Shared File |
| --- | --- | --- |
| **alert** | Displays a callout for user attention. Useful for warnings, errors, or information. | [soybean-ui/components/alert.md](../../soybean-ui/components/alert.md) |
| **toast** | `SToastProvider` renders the toast viewports and `toast` is the imperative API used to create, update, dismiss, and inspect notifications. | [soybean-ui/components/toast.md](../../soybean-ui/components/toast.md) |

## Overlay

| Component | Description | Shared File |
| --- | --- | --- |
| **bottom-sheet** | A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog`, and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support. | [soybean-ui/components/bottom-sheet.md](../../soybean-ui/components/bottom-sheet.md) |
| **dialog** | A window overlaid on either the primary window or another dialog window, rendering the content underneath inert. | [soybean-ui/components/dialog.md](../../soybean-ui/components/dialog.md) |
| **drawer** | A panel that slides out from the edge of the screen. It reuses the declarative API and slot contract of `SDialog`, and adds `side` to control where the panel enters. | [soybean-ui/components/drawer.md](../../soybean-ui/components/drawer.md) |
| **hover-card** | Displays a richer preview card when the trigger is hovered or receives focus. | [soybean-ui/components/hover-card.md](../../soybean-ui/components/hover-card.md) |
| **popconfirm** | A confirmation box component based on Popover, used for lightweight secondary confirmation operations. | [soybean-ui/components/popconfirm.md](../../soybean-ui/components/popconfirm.md) |
| **popover** | Displays rich content in a portal, triggered by a button. | [soybean-ui/components/popover.md](../../soybean-ui/components/popover.md) |
| **tooltip** | A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. | [soybean-ui/components/tooltip.md](../../soybean-ui/components/tooltip.md) |

## Utilities

| Component | Description | Shared File |
| --- | --- | --- |
| **arrow** | A primitive component used to render an arrow for popovers, tooltips, and other floating elements. Usually used internally by other components. | [soybean-ui/components/arrow.md](../../soybean-ui/components/arrow.md) |
| **visually-hidden** | `VisuallyHidden` is a utility component that hides content from the screen but keeps it accessible to screen readers. It is essential for accessibility when you want to provide context to users relying on assistive technologies without affecting the visual design. | [soybean-ui/components/visually-hidden.md](../../soybean-ui/components/visually-hidden.md) |
