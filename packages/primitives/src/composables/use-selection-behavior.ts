import { ref } from 'vue';
import type { Ref, UnwrapNestedRefs } from 'vue';
import { findValuesBetween } from '../shared';

type Intent = 'first' | 'last' | 'prev' | 'next';

export function useSelectionBehavior<T>(
  modelValue: Ref<T | T[]>,
  props: UnwrapNestedRefs<{ multiple?: boolean; selectionBehavior?: 'toggle' | 'replace' }>
) {
  const firstValue = ref();

  const onSelectItem = (val: T, condition: (existingValue: T) => boolean) => {
    // multiple select
    if (props.multiple && Array.isArray(modelValue.value)) {
      if (props.selectionBehavior === 'replace') {
        modelValue.value = [val];
        firstValue.value = val;
      } else {
        const index = modelValue.value.findIndex(v => condition(v));
        if (index !== -1) {
          modelValue.value = modelValue.value.filter((_, i) => i !== index);
        } else {
          modelValue.value = [...modelValue.value, val];
        }
      }
    }
    // single select
    else if (props.selectionBehavior === 'replace') {
      modelValue.value = { ...val };
    } else if (!Array.isArray(modelValue.value) && condition(modelValue.value)) modelValue.value = undefined as any;
    else {
      modelValue.value = { ...val };
    }

    return modelValue.value;
  };

  function handleMultipleReplace(
    intent: Intent,
    currentElement: HTMLElement | Element | null,
    getItems: () => { ref: HTMLElement; value?: any }[],
    options: any[]
  ) {
    if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) return;

    const collection = getItems().filter(i => i.ref.dataset.disabled !== '');
    const lastValue = collection.find(i => i.ref === currentElement)?.value;
    if (!lastValue) return;

    const intentMap: Record<Intent, T[]> = {
      prev: findValuesBetween(options, firstValue.value, lastValue),
      next: findValuesBetween(options, firstValue.value, lastValue),
      first: findValuesBetween(options, firstValue.value, options?.[0]),
      last: findValuesBetween(options, firstValue.value, options?.[options.length - 1])
    };

    modelValue.value = intentMap[intent];
  }

  return {
    firstValue,
    onSelectItem,
    handleMultipleReplace
  };
}
