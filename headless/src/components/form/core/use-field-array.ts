import { computed, toRef } from 'vue';
import type { Ref } from 'vue';
import type { ArrayElement, Path, PathValue } from '../../../types';
import { appendAt, insertAt, moveAt, prependAt, removeAt, swapAt, updateAt } from '../../../shared';
import type {
  FormFieldArrayState,
  FormFieldArrayStates,
  FormFieldValidator,
  FormValues,
  UseRegisterFieldArrayOptions
} from './types';

export function useRegisterFieldArray<Values extends FormValues, Name extends Path<Values>>(
  name: Name,
  options: UseRegisterFieldArrayOptions<Values>,
  validate?: FormFieldValidator<PathValue<Values, Name>>
) {
  type ArrayValue = NonNullable<PathValue<Values, Name>>;

  type Value = ArrayElement<ArrayValue>;

  const { getFieldState, getFieldValue, setFieldArrayValue, registerFieldArray } = options;

  registerFieldArray(name, { validate });

  const fieldValue = computed(() => (getFieldValue(name).value || []) as ArrayValue);

  const fields = computed(() => fieldValue.value.map(createEntry));

  function createEntry(value: Value) {
    const fieldState = getFieldState(name);

    const state: FormFieldArrayState<Values, Name> = {
      ...fieldState.value,
      name,
      value
    };

    return state;
  }

  function append(value: Value) {
    const cloneValues = appendAt(fieldValue.value, value) as ArrayValue;

    setFieldArrayValue(name, cloneValues, appendAt, {
      argA: undefined
    });
  }

  function prepend(value: Value) {
    const cloneValues = prependAt(fieldValue.value, value) as ArrayValue;

    setFieldArrayValue(name, cloneValues, prependAt, {
      argA: undefined
    });
  }

  function remove(index?: number) {
    const cloneValues = removeAt(fieldValue.value, index) as ArrayValue;

    setFieldArrayValue(name, cloneValues, removeAt, {
      argA: index
    });
  }

  function swap(indexA: number, indexB: number) {
    if (!(indexA in fieldValue.value) || !(indexB in fieldValue.value)) return;

    const cloneValues = [...fieldValue.value] as ArrayValue;

    swapAt(cloneValues, indexA, indexB);

    setFieldArrayValue(
      name,
      cloneValues,
      swapAt,
      {
        argA: indexA,
        argB: indexB
      },
      false
    );
  }

  function move(from: number, to: number) {
    if (!(from in fieldValue.value)) return;

    const cloneValues = [...fieldValue.value] as ArrayValue;

    moveAt(cloneValues, from, to);

    setFieldArrayValue(
      name,
      cloneValues,
      moveAt,
      {
        argA: from,
        argB: to
      },
      false
    );
  }

  function insert(index: number, value: Value) {
    const cloneValues = insertAt(fieldValue.value, index, value) as ArrayValue;

    setFieldArrayValue(name, cloneValues, insertAt, {
      argA: index,
      argB: undefined
    });
  }

  function update(index: number, value: Value) {
    if (!(index in fieldValue.value)) return;

    const cloneValue = updateAt(fieldValue.value, index, value) as ArrayValue;

    setFieldArrayValue(name, cloneValue, updateAt, {
      argA: index,
      argB: undefined
    });
  }

  function replace($values: Value[]) {
    const cloneValues = [...$values] as ArrayValue;

    setFieldArrayValue(name, cloneValues, <T>(data: T): T => data, {});
  }

  const state = getFieldState(name);

  const result = {
    name,
    fields,
    meta: computed(() => state.value.meta),
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    update,
    replace
  };

  return toRef(result) as Ref<FormFieldArrayStates<Values, Name>>;
}
