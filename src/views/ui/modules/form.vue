<script setup lang="ts">
import { ref, watch } from 'vue';
import { FieldArray, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';
import {
  SButton,
  SButtonIcon,
  SCheckboxGroup,
  SFormField,
  SInput,
  SLabel,
  SRadioGroup,
  SSelect,
  SSwitch
} from 'soybean-ui';
import type { CheckboxGroupItem, RadioGroupItemProps, SelectOption } from 'soybean-ui';
import { Minus, Plus } from 'lucide-vue-next';

defineOptions({
  name: 'UiForm'
});

const requiredString = (message: string = 'Required!') =>
  z.string({ required_error: message }).trim().min(1, { message });

const user = z.object({
  username: requiredString('Username is required'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  remember: z.boolean({ required_error: 'Remember is required' }),
  hobbies: z.array(z.string()).min(1, { message: 'Hobbies is required' }),
  city: requiredString('City is required'),
  social: z.array(z.object({ name: z.string(), url: z.string() }), { required_error: 'Social is required' })
});

// type User = z.infer<typeof user>;

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

const cities = ref<SelectOption[]>([
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' }
]);

const onSubmit = handleSubmit(v => {
  console.log(v);
});

watch(values, v => {
  console.log(v);
});
</script>

<template>
  <form class="w-480px space-y-4" @submit="onSubmit">
    <SFormField name="username" label="Username">
      <SInput placeholder="shadcn" />
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
      <SSelect :options="cities" />
    </SFormField>
    <div class="flex-y-center gap-4px">
      <SLabel>Social</SLabel>
      <SButtonIcon
        v-if="!values.social?.length"
        type="button"
        @click="setFieldValue('social', [{ name: '', url: '' }])"
      >
        <Plus />
      </SButtonIcon>
    </div>
    <FieldArray v-slot="{ fields, push, remove }" name="social">
      <div v-for="(field, index) in fields" :key="field.key" class="flex items-end gap-12px">
        <SFormField :name="`social.${index}.name`" label="Name">
          <SInput />
        </SFormField>
        <SFormField :name="`social.${index}.url`" label="URL">
          <SInput />
        </SFormField>
        <SButtonIcon type="button" class="flex-shrink-0" @click="remove(index)">
          <Minus />
        </SButtonIcon>
        <SButtonIcon type="button" class="flex-shrink-0" @click="push({ name: '', url: '' })">
          <Plus />
        </SButtonIcon>
      </div>
    </FieldArray>
    <SButton type="submit">Submit</SButton>
  </form>
</template>

<style scoped></style>
