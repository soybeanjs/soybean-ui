# Accordion

## 示例

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

### According Props

| Name            | Type                                                                                                                                         | Default | Description                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------- |
| **v-model**     | string                                                                                                                                       | ——      | binding value                                 |
| **items**       | array {? { title: string, description: string, icon: string, value: string, disabled: boolean }}                                             | ——      | data of items                                 |
| **size**        | enum {? 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' }                                                                                      | md      | According size                                |
| **multiple**    | boolean                                                                                                                                      | false   | Whether multiple-expand is activated          |
| **ui**          | object {? { header: string, content: string, item: string, root: string, trigger: string, triggerIcon: string, triggerLeadingIcon: string }} | {}      | Add class name to the corresponding container |
| **collapsible** | boolean                                                                                                                                      | false   | collapsible                                   |

### According Events

| Name              | Type                                           | Description                          |
| ----------------- | ---------------------------------------------- | ------------------------------------ |
| update:modelValue | Function {? (value: string \| array) => void } | Triggers when the modelValue changes |

### According Slots

| Slot Name    | Type                                                                    | Description                       |
| ------------ | ----------------------------------------------------------------------- | --------------------------------- |
| title        | object {? { item: object, modelValue: string \| array, open: boolean }} | title of the AccordingItem        |
| leading      | object {? { item: object, modelValue: string \| array, open: boolean }} | pre content of the AccordingItem  |
| content      | object {? { item: object, modelValue: string \| array, open: boolean }} | content of the AccordionContent   |
| trigger-icon | object {? { item: object, modelValue: string \| array, open: boolean }} | trigger icon of the AccordingItem |
