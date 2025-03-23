import { FieldArray, useForm } from 'vee-validate';
import SFormControl from './form-control.vue';
import SFormDescription from './form-description.vue';
import SFormFieldArray from './form-field-array.vue';
import SFormField from './form-filed.vue';
import SFormItem from './form-item.vue';
import SFormLabel from './form-label.vue';
import SFormMessage from './form-message.vue';
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
