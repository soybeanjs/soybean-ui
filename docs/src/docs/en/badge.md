# Badge

## Demos

```playground
color
content
position
slot
open
```

## Badge API

### Props

<DataTable preset="props" :data="[
  { name: 'content', type: 'string', default: '-', description: 'Badge content' },
  { name: 'open', type: 'boolean', default: undefined, description: 'Whether the Badge is open' },
  { name: 'class', type: 'string', default: '-', description: 'Root container class name'},
  { name: 'position', type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`, default: 'top-right', description: 'Badge position' },
  { name: 'contentProps', type: 'HTMLAttributes', default: '{}', description: 'Badge content properties' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: 'Badge size' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Add class name to the corresponding container' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Custom default content', required: true },
  { name: 'content', parameters: '-', description: 'Badge content' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class name of Badge',
    fields: [
      { name: 'root', type: 'string', description: 'Add class name to the root container' },
      { name: 'content', type: 'string', description: 'Add class name to the Badge content container' },
    ],
  }
]"/>
