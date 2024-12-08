import { FieldArray, useForm } from 'vee-validate';
import SFormControl from './form-control.vue';
import SFormItem from './form-item.vue';
import SFormLabel from './form-label.vue';
import SFormDescription from './form-description.vue';
import SFormMessage from './form-message.vue';
import SFormField from './form-filed.vue';
import { FORM_ITEM_INJECTION_KEY } from './hooks';

export {
  SFormControl,
  SFormItem,
  SFormLabel,
  SFormDescription,
  SFormMessage,
  SFormField,
  FORM_ITEM_INJECTION_KEY,
  useForm,
  FieldArray
};
