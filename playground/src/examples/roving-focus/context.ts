import type { Ref } from 'vue';
import { useContext } from '@headless/composables';

interface ButtonRovingFocusContextParams {
  modelValue: Ref<string>;
}

export const [provideButtonRovingFocusContext, useButtonRovingFocusContext] = useContext(
  'ButtonRovingFocus',
  (params: ButtonRovingFocusContextParams) => {
    const { modelValue } = params;

    const onModelValueChange = (val: string) => {
      modelValue.value = val;
    };

    return {
      modelValue,
      onModelValueChange
    };
  }
);
