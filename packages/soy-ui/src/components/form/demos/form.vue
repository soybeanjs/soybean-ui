<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  SButton,
  SButtonIcon,
  SCard,
  SCheckboxGroup,
  SFormField,
  SFormFieldArray,
  SInput,
  SRadioGroup,
  SSelect,
  SSwitch,
  useForm
} from 'soy-ui';
import type { CheckboxGroupItem, RadioGroupItemProps, SelectOptionData } from 'soy-ui';
import * as v from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { Minus, Plus } from 'lucide-vue-next';

defineOptions({
  name: 'DemoForm'
});

const user = v.object({
  username: v.string('Username is required'),
  gender: v.picklist(['male', 'female'], 'Gender is required'),
  remember: v.boolean('Remember is required'),
  hobbies: v.pipe(v.array(v.string(), 'Hobbies is required'), v.minLength(1, 'Hobbies is required')),
  city: v.string('City is required'),
  social: v.pipe(
    v.array(
      v.object({
        name: v.pipe(v.string(), v.nonEmpty('Name is required')),
        url: v.pipe(v.string(), v.nonEmpty('URL is required'))
      }),
      'Social is required'
    ),
    v.minLength(1, 'Social is required')
  )
});

const formSchema = toTypedSchema(user);

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema
});

const genderItems = ref<RadioGroupItemProps[]>([
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]);

const hobbies = ref<CheckboxGroupItem[]>([
  { label: 'Reading', value: 'reading' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' }
]);

const cities = ref<SelectOptionData[]>([
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' }
]);

const onSubmit = handleSubmit(value => {
  console.log(value);
});

watch(values, value => {
  console.log(value);
});
</script>

<template>
  <SCard title="Form" split>
    <form class="w-480px space-y-4" @submit="onSubmit">
      <SFormField name="username" label="Username">
        <SInput placeholder="Please input username" />
      </SFormField>
      <SFormField name="gender" label="Gender">
        <SRadioGroup :items="genderItems" />
      </SFormField>
      <SFormField name="remember" label="Remember">
        <SSwitch class="block" />
      </SFormField>
      <SFormField name="hobbies" label="Hobbies">
        <SCheckboxGroup :items="hobbies" />
      </SFormField>
      <SFormField name="city" label="City">
        <SSelect :items="cities" />
      </SFormField>
      <SFormFieldArray name="social">
        <template #label>
          <span>Social</span>
          <SButtonIcon
            v-if="!values.social?.length"
            type="button"
            @click="setFieldValue('social', [{ name: '', url: '' }])"
          >
            <Plus />
          </SButtonIcon>
        </template>
        <template #default="{ fields, push, remove }">
          <div v-for="(field, index) in fields" :key="field.key" class="flex gap-12px">
            <SFormField :name="`social.${index}.name`" label="Name">
              <SInput />
            </SFormField>
            <SFormField :name="`social.${index}.url`" label="URL">
              <SInput />
            </SFormField>
            <SButtonIcon type="button" class="mt-7 flex-shrink-0" @click="remove(index)">
              <Minus />
            </SButtonIcon>
            <SButtonIcon type="button" class="mt-7 flex-shrink-0" @click="push({ name: '', url: '' })">
              <Plus />
            </SButtonIcon>
          </div>
        </template>
      </SFormFieldArray>
      <SButton type="submit">Submit</SButton>
    </form>
  </SCard>
</template>
