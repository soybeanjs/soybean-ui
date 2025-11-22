---
title: Button
---

# Button

Trigger an action or event, such as submitting a form or opening a dialog.

## Basic Usage

```demo
demos/basic.vue
```

## Variants & Shapes

Button comes with different variants and shapes.

```demo
demos/variants.vue
```

## API

### Props

| Name       | Type                                          | Default     | Description                               |
| :--------- | :-------------------------------------------- | :---------- | :---------------------------------------- |
| `color`    | `ThemeColor`                                  | `'default'` | The color of the button.                  |
| `size`     | `ThemeSize`                                   | `'medium'`  | The size of the button.                   |
| `variant`  | `'solid' \| 'outline' \| 'ghost' \| 'link'`   | `'solid'`   | The visual style of the button.           |
| `shape`    | `'rounded' \| 'pill' \| 'circle' \| 'square'` | `'rounded'` | The shape of the button.                  |
| `disabled` | `boolean`                                     | `false`     | Whether the button is disabled.           |
| `loading`  | `boolean`                                     | `false`     | Whether the button is in a loading state. |

### Slots

| Name       | Description                                             |
| :--------- | :------------------------------------------------------ |
| `default`  | The content of the button.                              |
| `leading`  | Content to display before the button text (e.g., icon). |
| `trailing` | Content to display after the button text (e.g., icon).  |

### Events

| Name    | Parameters            | Description                         |
| :------ | :-------------------- | :---------------------------------- |
| `click` | `(event: MouseEvent)` | Emitted when the button is clicked. |
