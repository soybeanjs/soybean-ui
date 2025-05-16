import { FieldArray, useForm } from 'vee-validate';
import SFormControl from './source/form-control.vue';
import SFormDescription from './source/form-description.vue';
import SFormFieldArray from './source/form-field-array.vue';
import SFormField from './source/form-filed.vue';
import SFormItem from './source/form-item.vue';
import SFormLabel from './source/form-label.vue';
import SFormMessage from './source/form-message.vue';
import { FORM_ITEM_INJECTION_KEY } from './hooks';

export {
  SFormControl,
  SFormDescription,
  SFormField,
  SFormFieldArray,
  SFormItem,
  SFormLabel,
  SFormMessage,
  FORM_ITEM_INJECTION_KEY,
  useForm,
  FieldArray
};

export * from './types';
