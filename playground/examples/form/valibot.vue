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
  valibotResolver
} from '@soybeanjs/ui';
import type { CheckboxGroupOptionData, RadioGroupOptionData, SelectOptionData } from '@soybeanjs/ui';
import * as v from 'valibot';

const user = v.object({
  username: v.pipe(v.string('Username is required'), v.nonEmpty('Username is required')),
  gender: v.picklist(['male', 'female'], 'Gender is required'),
  remember: v.boolean('Remember is required'),
  hobbies: v.pipe(v.array(v.string(), 'Hobbies is required'), v.minLength(1, 'Hobbies is required')),
  city: v.string('City is required'),
  social: v.pipe(
    v.array(
      v.object({
        name: v.pipe(v.string('Name is required'), v.nonEmpty('Name is required')),
        url: v.pipe(v.string('URL is required'), v.nonEmpty('URL is required'))
      }),
      'Social is required'
    ),
    v.minLength(1, 'Social is required')
  )
});

const validate = valibotResolver(user);

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
  <SCard title="Valibot">
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
