<script setup lang="ts">
import { SButton, SCheckbox, SForm, SFormFieldBase, SInput, SSelect, useForm } from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';
import { z } from 'zod';

const user = z.object({
  username: z.string().nonempty('Username is required'),
  city: z.string('City is required'),
  agreement: z.boolean('Agreement is required')
});

const { handleSubmit, SFormField } = useForm({
  schema: user,
  initialValues: {
    username: 'soybean',
    city: 'shanghai',
    agreement: true
  },
  onSubmit: async vals => {
    console.log(vals);
  }
});

const citiesItems: SelectOptionData<string>[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' }
];
</script>

<template>
  <!-- 字段级禁用：控件层 disabled 直接阻断交互与校验提交 -->
  <SForm class="w-80 gap-4" @submit="handleSubmit">
    <SFormField name="username" label="Username">
      <SInput disabled placeholder="Disabled input" />
    </SFormField>
    <SFormField name="city" label="City">
      <SSelect :items="citiesItems" disabled />
    </SFormField>
    <SFormField name="agreement" label="Agreement">
      <SCheckbox disabled>I agree</SCheckbox>
    </SFormField>
    <SFormFieldBase>
      <SButton type="submit">Submit</SButton>
    </SFormFieldBase>
  </SForm>
</template>
