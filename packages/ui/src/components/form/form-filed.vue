<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import { Field } from 'vee-validate';
import { vAutoAnimate } from '@formkit/auto-animate';
import SFormItem from './form-item.vue';
import SFormControl from './form-control.vue';
import SFormLabel from './form-label.vue';
import SFormDescription from './form-description.vue';
import SFormMessage from './form-message.vue';
import type { FormFieldProps } from './types';

defineOptions({
  name: 'SFormField'
});

const { class: cls, description, ...delegatedProps } = defineProps<FormFieldProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <Field v-slot="{ componentField, ...slotProps }" v-bind="forwardedProps">
    <SFormItem v-auto-animate :class="cls">
      <SFormLabel>
        <slot name="label">{{ label }}</slot>
      </SFormLabel>
      <SFormControl
        :model-value="componentField.modelValue"
        @update:model-value="componentField['onUpdate:modelValue']"
        @change="componentField['onChange']"
        @blur="componentField['onBlur']"
        @input="componentField['onInput']"
      >
        <slot v-bind="slotProps" />
      </SFormControl>
      <SFormDescription v-if="description">{{ description }}</SFormDescription>
      <SFormMessage />
    </SFormItem>
  </Field>
</template>
