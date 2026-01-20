# Arrow

## Overview

A primitive component used to render an arrow for popovers, tooltips, and other floating elements. Usually used internally by other components.

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'width', type: 'number', default: '10', description: 'Width of the arrow in pixels.' },
  { name: 'height', type: 'number', default: '5', description: 'Height of the arrow in pixels.' },
  { name: 'as', type: 'string | Component', default: `'svg'`, description: 'The rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element.' }
]"/>
