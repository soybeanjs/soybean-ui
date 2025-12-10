# Accordion

## Demos

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

### According Props

<PropsTable :data="[
  { name: 'v-model', type: 'string', default: '——', description: 'binding value', required: true },
  { name: 'items', type: 'array', typeSimple: '{ title: string, description: string, icon: string, value: string, disabled: boolean }', default: '——', description: 'data of items', required: true },
  { name: 'size', type: 'enum', typeSimple: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: 'According size' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple-expand is activated' },
  { name: 'ui', type: 'object', typeSimple: '{ header: string, content: string, item: string, root: string, trigger: string, triggerIcon: string, triggerLeadingIcon: string }', default: '{}', description: 'Add class name to the corresponding container' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'collapsible' },
]"/>

### According Events

<EmitsTable :data="[
  { name: 'update:modelValue', parameters: '(value: string \| array) => void', description: 'Triggers when the modelValue changes' },
]"/>

### According Slots

<SlotsTable :data="[
  { name: 'title', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: 'title of the AccordingItem' },
  { name: 'leading', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: 'pre content of the AccordingItem' },
  { name: 'content', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: 'content of the AccordionContent' },
  { name: 'trigger-icon', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: 'trigger icon of the AccordingItem' },
]"/>
