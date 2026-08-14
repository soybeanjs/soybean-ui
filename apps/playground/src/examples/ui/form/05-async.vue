<script setup lang="ts">
import { SButton, SForm, SFormFieldBase, SInput, useForm } from '@soybeanjs/ui';
import { z } from 'zod';

const user = z.object({
  username: z.string().nonempty('Username is required'),
  email: z.string().email('Email is invalid')
});

const { handleSubmit, SFormField, isSubmitting } = useForm({
  schema: user,
  onSubmit: async vals => {
    // 模拟异步提交，期间 isSubmitting 保持 true
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log('submitted', vals);
  }
});

// 模拟异步校验：用户名可用性检查
function validateUsernameAvailability(value: unknown) {
  return new Promise<string | undefined>(resolve => {
    setTimeout(() => {
      resolve(String(value) === 'taken' ? 'This username is taken' : undefined);
    }, 600);
  });
}
</script>

<template>
  <SForm class="w-80 gap-4" @submit="handleSubmit">
    <SFormField name="username" label="Username" :validate="validateUsernameAvailability">
      <SInput placeholder="Type 'taken' to trigger async error" />
    </SFormField>
    <SFormField name="email" label="Email">
      <SInput type="email" placeholder="Async submit demo" />
    </SFormField>
    <SFormFieldBase>
      <SButton type="submit" :loading="isSubmitting">Submit async</SButton>
    </SFormFieldBase>
  </SForm>
</template>
