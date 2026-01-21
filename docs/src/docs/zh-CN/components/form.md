# 表单

## 概述

用于构建表单与校验交互的组件集合。

## 用法

```vue
<script setup lang="ts">
import { SForm, SFormField, SInput, SButton, useForm } from '@soybeanjs/ui';
import * as z from 'zod';

const user = z.object({
  username: z.string('Username is required').nonempty('Username is required'),
  gender: z.enum(['male', 'female'], 'Gender is required')
});

const { handleSubmit, SFormField, SFormFieldArray } = useForm({
  schema: user,
  onSubmit: async vals => {
    console.log(vals);
  },
  onInvalid: errors => {
    console.log(errors);
  }
});
</script>

<template>
  <SForm @submit="handleSubmit">
    <SFormField name="username" label="Username">
      <SInput placeholder="Please input username" />
    </SFormField>
    <SFormField name="gender" label="Gender">
      <SRadioGroup :items="genderItems" />
    </SFormField>
    <SButton type="submit">Submit</SButton>
  </SForm>
</template>
```

## 演示

```playground
valibot
zod
```

## API

### SForm Props

<DataTable preset="props" :data="[
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Form size (affects spacing).' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SFormField Props

<DataTable preset="props" :data="[
  { name: 'name', type: 'string', required: true, description: 'Field name path.' },
  { name: 'label', type: 'string', default: '-', description: 'Field label.' },
  { name: 'description', type: 'string', default: '-', description: 'Field description.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名 for the field.' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'FormFieldState', description: 'Field content (Input).' },
  { name: 'label', parameters: 'FormFieldState', description: 'Custom label.' },
  { name: 'description', parameters: 'FormFieldState', description: 'Custom description.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: 'Root form element class.' },
      { name: 'item', type: 'string', description: 'Field item wrapper class.' },
      { name: 'label', type: 'string', description: 'Label class.' },
      { name: 'control', type: 'string', description: 'Control wrapper class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'message', type: 'string', description: 'Error message class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
