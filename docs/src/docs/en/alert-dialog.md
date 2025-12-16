# AlertDialog

## 示例

```playground
destructive
info
success
warning
action
```

## AlertDialog API

### Props

<DataTable preset="props" :data="[
  { name: 'v-model:open', type: 'boolean', default: '-', description: 'binding value'},
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'size of AlertDialog' },
  { name: 'title', type: 'string', default: '-', description: 'title'},
  { name: 'type', type: `'destructive' \| 'success' \| 'warning' \| 'info'`, default: '-', description: 'type'},
  { name: 'description', type: 'string', default: '-', description: 'description'},
  { name: 'show-icon', type: 'boolean', default: 'true', description: 'whether to show icon'},
  { name: 'default-open', type: 'boolean', default: 'false', description: 'whether to default open, invalid when setting v-model:open'},
  { name: 'ui', type: 'Ui', default: '{}', description: 'add class name to the corresponding container' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(value: boolean) => void', description: `triggers when 'open' changes` },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'slot of trigger', required: true },
  { name: 'default', parameters: '-', description: 'slot of content', required: true },
  { name: 'footer', parameters: '-', description: 'slot of footer', required: true },
  { name: 'title', parameters: '-', description: 'slot of title' },
  { name: 'description', parameters: '-', description: 'slot of description' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'custom class name of AlertDialog',
    fields: [
      { name: 'header', type: 'string', description: 'add class name to the header' },
      { name: 'footer', type: 'string', description: 'add class name to the footer' },
    ]
  }
]"/>

## AlertDialogCancel API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Cancel', description: 'text of cancel button' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: 'function to execute before closing' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '—', description: 'slot of cancel button content' },
  { name: 'content', parameters: '—', description: 'slot of content, higher priority than default slot' },
]"/>

## AlertDialogAction API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Confirm', description: 'text of confirm button' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: 'function to execute before closing' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '—', description: 'slot of confirm button content' },
  { name: 'content', parameters: '—', description: 'slot of content, higher priority than default slot' },
]"/>
