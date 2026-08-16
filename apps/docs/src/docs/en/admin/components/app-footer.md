# AppFooter

## Overview

`SAppFooter` renders the application footer — custom slot content, an optional text line and a built-in copyright line.

## Usage

<UsageCode component="app-footer" />

## Features

- 🧩 Custom content — the default slot renders first
- 📝 Text line — `text` renders a centered text block
- ©️ Copyright — `showCopyright` renders `Copyright © <year>` automatically
- 🎨 Theme-aware — uses muted foreground colors from the recipe

## Demos

<PlaygroundGallery component="app-footer" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: '-', description: 'The footer text block.' },
  { name: 'showCopyright', type: 'boolean', default: 'false', description: 'Whether to show a built-in copyright line.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
]"/>

### Emits

This component emits no events.

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Custom content rendered inside the footer.' },
]"/>
