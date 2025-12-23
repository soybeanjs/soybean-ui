# Card

## Demos

```playground
base
only-content
split
title-slot
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: 'Card size' },
  { name: 'title', type: 'string', default: '-', description: 'Card title' },
  { name: 'description', type: 'string', default: '-', description: 'Card description' },
  { name: 'split', type: 'boolean', default: false, description: 'Show split line' },
  { name: 'scrollable', type: 'boolean', default: false, description: 'Whether the content is scrollable' },
  { name: 'headerProps', type: 'object', default: '{}', description: 'Header container properties' },
  { name: 'contentProps', type: 'object', default: '{}', description: 'Content container properties' },
  { name: 'footerProps', type: 'object', default: '{}', description: 'Footer container properties' },
  { name: 'titleRootProps', type: 'object', default: '{}', description: 'Title root container properties' },
  { name: 'titleProps', type: 'object', default: '{}', description: 'Title container properties' },
  { name: 'descriptionProps', type: 'object', default: '{}', description: 'Description container properties' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Add class name to the corresponding container' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', params: '-', description: 'Custom default content' },
  { name: 'title-leading', params: '-', description: 'Custom title leading content' },
  { name: 'title', params: '-', description: 'Custom title' },
  { name: 'title-trailing', params: '-', description: 'Custom title trailing content' },
  { name: 'extra', params: '-', description: 'Custom extra content' },
  { name: 'footer', params: '-', description: 'Custom footer content' },
  { name: 'description', params: '-', description: 'Custom description content' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class name for Card component',
    fields: [
      { name: 'root', type: 'string', description: 'Class name for root container' },
      { name: 'header', type: 'string', description: 'Class name for header container' },
      { name: 'titleRoot', type: 'string', description: 'Class name for title root container' },
      { name: 'title', type: 'string', description: 'Class name for title container' },
      { name: 'description', type: 'string', description: 'Class name for description container' },
      { name: 'content', type: 'string', description: 'Class name for content container' },
      { name: 'footer', type: 'string', description: 'Class name for footer container' },
    ],
  }
]"/>
