<script setup lang="ts">
import {
  SButton,
  SButtonIcon,
  SCard,
  SCheckboxGroup,
  SForm,
  SFormField,
  SFormFieldArray,
  SInput,
  SRadioGroup,
  SSelect,
  SSwitch,
  useForm,
  zodResolver
} from '@soybeanjs/ui';
import type { CheckboxGroupOptionData, RadioGroupOptionData, SelectOptionData } from '@soybeanjs/ui';
import { z } from 'zod';

const user = z.object({
  username: z.string('Username is required').nonempty('Username is required'),
  gender: z.enum(['male', 'female'], 'Gender is required'),
  remember: z.boolean('Remember is required'),
  hobbies: z.array(z.string(), 'Hobbies is required').min(1, 'Hobbies is required'),
  city: z.string('City is required'),
  social: z
    .array(
      z.object({
        name: z.string('Name is required').nonempty('Name is required'),
        url: z.string('URL is required').nonempty('URL is required')
      }),
      'Social is required'
    )
    .min(1, 'Social is required')
});

const validate = zodResolver(user);

const { handleSubmit } = useForm({
  validate,
  onSubmit: async vals => {
    console.log(vals);
  }
});

type Gender = 'male' | 'female';

const genderItems: RadioGroupOptionData<Gender>[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];

const hobbiesItems: CheckboxGroupOptionData<string>[] = [
  { label: 'Reading', value: 'reading' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' }
];

const citiesItems: SelectOptionData<string>[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' }
];
</script>

<template>
  <SCard title="Zod">
    <SForm class="w-480px space-y-4" @submit="handleSubmit">
      <SFormField name="username" label="Username">
        <SInput placeholder="Please input username" />
      </SFormField>
      <SFormField name="gender" label="Gender">
        <SRadioGroup :items="genderItems" />
      </SFormField>
      <SFormField name="remember" label="Remember">
        <SSwitch />
      </SFormField>
      <SFormField name="hobbies" label="Hobbies">
        <SCheckboxGroup :items="hobbiesItems" />
      </SFormField>
      <SFormField name="city" label="City">
        <SSelect :items="citiesItems" />
      </SFormField>
      <SFormFieldArray name="social">
        <template #label="{ fields, append }">
          <span>Social</span>
          <SButtonIcon v-if="!fields.length" icon="lucide:plus" @click="append({ name: '', url: '' })" />
        </template>
        <template #default="{ fields, append, remove }">
          <div v-for="(field, index) in fields" :key="field.key" class="flex gap-12px">
            <SFormField :name="`${field.name}.name`" label="Name">
              <SInput />
            </SFormField>
            <SFormField :name="`${field.name}.url`" label="URL">
              <SInput />
            </SFormField>
            <SButtonIcon icon="lucide:minus" class="mt-7 flex-shrink-0" @click="remove(index)" />
            <SButtonIcon icon="lucide:plus" class="mt-7 flex-shrink-0" @click="append({ name: '', url: '' })" />
          </div>
        </template>
      </SFormFieldArray>
      <SButton type="submit">Submit</SButton>
    </SForm>
  </SCard>
</template>
