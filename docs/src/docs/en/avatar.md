# Avatar

## Demos

```playground
base
fallback
delay
size
```

## Avatar Api

### Props

<DataTable preset="props" :data="[
  { name: 'src', type: 'string', default: '-', description: 'avatar image src', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: 'avatar size' },
  { name: 'delay-ms', type: 'number', default: 0, description: 'avatar image load delay time, unit: milliseconds' },
  { name: 'fallback-label', type: 'string', default: '{}', description: 'avatar image load failed text' },
  { name: 'image-props', type: 'object', default: '{}', description: 'add attributes to image tag' },
  { name: 'fallback-props', type: 'object', default: '{}', description: 'add attributes to fallback tag' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'add class name to the corresponding container' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'fallback', type: 'string', default: '-', description: 'custom avatar load failed text' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'loading-status-change', parameters: `(status: 'loading' | 'loaded' | 'error') => void`, description: `triggers when avatar loading status changes` },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'custom class name for Avatar component',
    fields: [
      { name: 'root', type: 'string', description: 'class name for root container' },
      { name: 'image', type: 'string', description: 'class name for image element' },
      { name: 'fallback', type: 'string', description: 'class name for fallback element' },
    ],
  }
]"/>
