# @soybeanjs/admin

> SoybeanAdmin — admin shell components built on top of SoybeanUI.
>
> **Note:** This package is still under development and is scheduled to ship with the v0.40.0 release. Stay tuned!

## Overview

`@soybeanjs/admin` is a peripheral package that ships complete application-shell components for building admin dashboards on top of `@soybeanjs/ui`. It follows the peripheral-package architecture documented in [ecosystem](/overview/introduction): domain logic and styles coexist in the package, component prefix is `S` + domain noun (`App*`), and it depends on the core `headless` / `ui` / `theme` packages.

## Components

- `SAppLayout` — the unified application shell (sidebar variants, six navigation modes, responsive mobile drawer)
- `SAppMenu` — the navigation shape for every layout mode
- `SAppLogo` — brand block for sidebar / header
- `SAppBreadcrumb` — breadcrumb trail with child dropdowns
- `SAppPageHeader` — page-level header with back button and actions
- `SAppFooter` — application footer with copyright

## Quick links

- [Installation](/admin/installation)
- [Quick Start](/admin/quick-start)
