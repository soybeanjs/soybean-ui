import { computed, ref, toValue, watch } from 'vue';
import type { MaybeRefOrGetter, Ref } from 'vue';
import { useContext } from '../../composables';
import { appendAt, insertAt, isString, moveAt, omit, prependAt, removeAt, swapAt, updateAt } from '../../shared';
import type { Path } from '../../types';
import type { FormContext, FormFieldContext, FormFieldEntry, FormRegisterOptions, FormValues } from './types';

export const [provideFormContext, _useFormContext] = useContext('Form', (params: FormContext<FormValues>) => params);

export const [provideFormFieldContext, _useFormFieldContext] = useContext(
  'FormField',
  (params: FormFieldContext<FormValues>) => params
);

export function useFormContext<Values extends FormValues>() {
  return _useFormContext('FormField') as FormContext<Values>;
}

export function useFormFieldContext<Values extends FormValues>() {
  return _useFormFieldContext('FormField') as FormFieldContext<Values>;
}

export function useField<Values extends FormValues, Name extends Path<Values>>(
  name: MaybeRefOrGetter<Name>,
  opts: FormRegisterOptions<Values> = {}
) {
  const { register } = useFormFieldContext<Values>();

  return register(name, opts);
}

export function useFieldArray<Value>(name: MaybeRefOrGetter<string>, opts: FormRegisterOptions = {}) {
  const {
    getFieldValue,
    setFieldValue,
    getFieldError,
    getFieldTouched,
    getFieldDirty,
    getFieldAttrs,
    registerFieldArray,
    setFieldArrayValue
  } = useFormFieldContext();

  const fields: Ref<FormFieldEntry<Value>[]> = ref([]);
  const values = computed(() => {
    return getFieldValue(name).value || [];
  });

  let seed = 0;
  const reset = () => {
    fields.value = values.value.map(createEntry);
  };

  function createEntry(value: Value) {
    const key = seed++;

    const index = computed(() => fields.value.findIndex(field => field.key === key));

    const nameGetter = () => `${toValue(name)}.${index.value}`;

    return {
      key,
      value: computed<Value>({
        get() {
          return index.value === -1 ? value : values.value[index.value];
        },
        set(val) {
          if (index.value === -1) return;
          setFieldValue(nameGetter, val);
        }
      }),

      name: computed(nameGetter),
      error: computed(() => getFieldError(nameGetter)),
      touched: computed(() => getFieldTouched(nameGetter)),
      dirty: computed(() => getFieldDirty(nameGetter)),
      attrs: computed(() => omit(getFieldAttrs(nameGetter).value, ['name']))
    } as unknown as FormFieldEntry<Value>;
  }

  function append(value: Value) {
    setFieldArrayValue(toValue(name), appendAt(values.value, value), appendAt, {
      argA: undefined
    });

    fields.value.push(createEntry(value));
  }

  function prepend(value: Value) {
    setFieldArrayValue(toValue(name), prependAt(values.value, value), prependAt, {
      argA: undefined
    });

    fields.value.unshift(createEntry(value));
  }

  function remove(index?: number) {
    const cloneValues = removeAt(values.value, index);
    const cloneField = removeAt(fields.value, index);

    setFieldArrayValue(toValue(name), cloneValues, removeAt, {
      argA: index
    });

    fields.value = cloneField;
  }

  function swap(indexA: number, indexB: number) {
    if (!(indexA in values.value) || !(indexB in values.value)) return;

    const cloneValues = [...values.value];
    const cloneField = [...fields.value];

    swapAt(cloneValues, indexA, indexB);
    swapAt(cloneField, indexA, indexB);

    setFieldArrayValue(
      toValue(name),
      cloneValues,
      swapAt,
      {
        argA: indexA,
        argB: indexB
      },
      false
    );

    fields.value = cloneField;
  }

  function move(from: number, to: number) {
    if (!(from in values.value)) return;

    const cloneValues = [...values.value];
    const cloneField = [...fields.value];

    moveAt(cloneValues, from, to);
    moveAt(cloneField, from, to);

    setFieldArrayValue(
      toValue(name),
      cloneValues,
      moveAt,
      {
        argA: from,
        argB: to
      },
      false
    );

    fields.value = cloneField;
  }

  function insert(index: number, value: Value) {
    const cloneValues = insertAt(values.value, index, value);
    const cloneField = insertAt(fields.value, index, createEntry(value));

    setFieldArrayValue(toValue(name), cloneValues, insertAt, {
      argA: index,
      argB: undefined
    });

    fields.value = cloneField;
  }

  function update(index: number, value: Value) {
    if (!(index in values.value)) return;

    const cloneValue = updateAt(values.value, index, value);

    setFieldArrayValue(toValue(name), cloneValue, updateAt, {
      argA: index,
      argB: undefined
    });

    if (fields.value[index]) {
      fields.value[index].value = value;
    }
  }

  function replace($values: Value[]) {
    const cloneValues = [...$values];

    setFieldArrayValue(toValue(name), cloneValues, <T>(data: T): T => data, {});

    fields.value = cloneValues.map(createEntry);
  }

  registerFieldArray(name, { ...opts, reset });

  if (!isString(name)) {
    watch(name, reset, {
      flush: 'sync'
    });
  }

  reset();

  return {
    fields,
    append,
    prepend,
    swap,
    remove,
    move,
    insert,
    update,
    replace
  };
}
