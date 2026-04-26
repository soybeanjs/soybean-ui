# Form

## Overview

Building forms with validation and error handling. Supports schema validation via Zod, Valibot, etc.

## Usage

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

## Demos

```playground
valibot
zod
```

## API

<ComponentApi component="form" />
