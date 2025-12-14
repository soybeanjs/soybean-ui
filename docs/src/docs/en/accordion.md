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

### Props

<DataTable preset="props" :data="[
  { name: 'v-model', type: 'string', default: '—', description: 'binding value', required: true },
  { name: 'items', type: 'Array<AccordionOptionData>', default: '-', description: 'data of items', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'According size' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple-expand is activated' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'collapsible' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Add class name to the corresponding container' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string \| array) => void', description: 'Triggers when the modelValue changes' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'title', parameters: 'AccordionSlotProps', description: 'title of the AccordingItem' },
  { name: 'leading', parameters: 'AccordionSlotProps', description: 'pre content of the AccordingItem' },
  { name: 'content', parameters: 'AccordionSlotProps', description: 'content of the AccordionContent' },
  { name: 'trigger-icon', parameters: 'AccordionSlotProps', description: 'trigger icon of the AccordingItem' },
]"/>

### Type

<TypeTable :data="[
  {
    name: 'AccordionSlotProps',
    description: 'Slot props for accordion slots.',
    fields: [
      { name: 'item', type: 'AccordionOptionData', required: true, description: 'Current item data.' },
      { name: 'modelValue', type: 'string | string[]', required: true, description: 'Current active value(s).' },
      { name: 'open', type: 'boolean', required: true, description: 'Whether current item is open.' },
    ]
  },
  {
    name: 'AccordionOptionData',
    description: 'Data of accordion items.',
    fields: [
      { name: 'value', type: 'string', required: true, description: 'Value of the accordion item. All items should use a unique value.' },
      { name: 'disabled', type: 'boolean', description: 'When true, prevents the user from interacting with the accordion item.' },
      { name: 'title', type: 'string', description: 'The title of the accordion item.' },
      { name: 'description', type: 'string', description: 'The description of the accordion content.' },
      { name: 'icon', type: 'string', description: 'The icon of the accordion item.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom class names for accordion components.',
    fields: [
      { name: 'header', type: 'string', description: 'Class name applied to the header element.' },
      { name: 'content', type: 'string', description: 'Class name applied to the content area.' },
      { name: 'item', type: 'string', description: 'Class name applied to each item.' },
      { name: 'root', type: 'string', description: 'Class name applied to the accordion root container.' },
      { name: 'trigger', type: 'string', description: 'Class name applied to the trigger area.' },
      { name: 'triggerIcon', type: 'string', description: 'Class name applied to the trigger icon.' },
      { name: 'triggerLeadingIcon', type: 'string', description: 'Class name applied to the leading icon of the trigger.' },
    ],
  }
]" />
