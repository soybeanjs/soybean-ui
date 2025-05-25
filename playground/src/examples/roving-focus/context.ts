import type { Ref } from 'vue';
import { useContext, useRovingFocus } from '../../../../src/composables';

export const { provideRovingFocusGroupContext, useRovingFocusItem } = useRovingFocus('Button');

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
