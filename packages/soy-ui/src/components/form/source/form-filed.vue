<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import { Field } from 'vee-validate';
import { vAutoAnimate } from '@formkit/auto-animate';
import type { FormFieldProps } from '../types';
import SFormItem from './form-item.vue';
import SFormControl from './form-control.vue';
import SFormLabel from './form-label.vue';
import SFormDescription from './form-description.vue';
import SFormMessage from './form-message.vue';

defineOptions({
  name: 'SFormField'
});

const { class: cls, size, ui, description, ...delegatedProps } = defineProps<FormFieldProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <Field v-slot="{ componentField, ...slotProps }" v-bind="forwardedProps">
    <SFormItem v-auto-animate :class="cls || ui?.item" :size="size">
      <SFormLabel :class="ui?.label" :size="size" :label="label">
        <slot name="label" />
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
      <SFormDescription v-if="description" :class="ui?.description">{{ description }}</SFormDescription>
      <SFormMessage :class="ui?.message" />
    </SFormItem>
  </Field>
</template>
