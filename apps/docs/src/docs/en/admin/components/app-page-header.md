# AppPageHeader

## Overview

`SAppPageHeader` renders a page-level header — optional back button, title, description and an action area — used at the top of content pages.

## Usage

<UsageCode component="app-page-header" />

## Features

- ⬅️ Back button — `showBack` renders a ghost back button that emits `back`
- 📝 Title + description — `title` / `description` render in a truncated, min-w-0 block
- 🎬 Action area — the default slot holds page actions (buttons, filters…)
- 📌 Sticky — `sticky` pins the header to the top of the scroll container with a backdrop blur

## Demos

<PlaygroundGallery component="app-page-header" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'The page title.' },
  { name: 'description', type: 'string', default: '-', description: 'The page description shown under the title.' },
  { name: 'showBack', type: 'boolean', default: 'false', description: 'Whether to show a back button.' },
  { name: 'sticky', type: 'boolean', default: 'false', description: 'Whether the header is sticky on top of the content area.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'back', parameters: '[]', description: 'Emitted when the back button is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Action content rendered on the right side.' },
]"/>
