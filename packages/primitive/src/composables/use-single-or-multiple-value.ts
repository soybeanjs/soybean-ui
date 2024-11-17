import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import isEqual from 'fast-deep-equal';
import { isValueEqualOrExist } from '../shared';
import type { AcceptableValue, SingleOrMultipleProps } from '../types';

/**
 * Validates the props and it makes sure that the types are coherent with each other
 *
 * 1. If type, defaultValue, and modelValue are all undefined, throw an error.
 * 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
 * 3. If type is defined: a. If type is 'single' and either modelValue or defaultValue is an array, log an error and return
 *    'multiple'. b. If type is 'multiple' and neither modelValue nor defaultValue is an array, log an error and return
 *    'single'.
 * 4. Return 'multiple' if modelValue is an array, else return 'single'.
 */
function validateProps({ type, defaultValue, modelValue }: SingleOrMultipleProps) {
  const value = modelValue || defaultValue;
  // One of the three must be defined
  // if (isNullish(type) && isNullish(modelValue) && isNullish(defaultValue))
  //   throw new Error('Either the `type` or the `value` or `default-value` prop must be defined.')

  if (modelValue !== undefined && defaultValue !== undefined && typeof modelValue !== typeof defaultValue) {
    function getValueTypeMessage(_type: string | undefined) {
      if (_type === 'single') return '- a string';
      if (_type === 'multiple') return '- an array of strings';
      return '- a string\n- an array of strings';
    }

    throw new Error(
      `Invalid prop \`value\` of value \`${modelValue}\` supplied, should be the same type as the \`defaultValue\` prop, which is \`${defaultValue}\`. The \`value\` prop must be:
  ${getValueTypeMessage(type)}
  - \`undefined\``
    );
  }

  const canTypeBeInferred = modelValue !== undefined || defaultValue !== undefined;
  // Ensure the type matches the provided values
  if (type && canTypeBeInferred) {
    const isArray = Array.isArray(modelValue) || Array.isArray(defaultValue);
    const propUsed = modelValue !== undefined ? 'modelValue' : 'defaultValue';
    const typeUsed = propUsed === 'modelValue' ? typeof modelValue : typeof defaultValue;
    if (type === 'single' && isArray) {
      console.error(`Invalid prop \`${propUsed}\` of type ${typeUsed} supplied with type \`single\`. The \`modelValue\` prop must be a string or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${propUsed} prop.`);
      return 'multiple';
    } else if (type === 'multiple' && !isArray) {
      console.error(`Invalid prop \`${propUsed}\` of type ${typeUsed} supplied with type \`multiple\`. The \`modelValue\` prop must be an array of strings or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${propUsed} prop.`);
      return 'single';
    }
  }

  if (canTypeBeInferred) {
    return Array.isArray(value) ? 'multiple' : 'single';
  }

  return type ?? 'single'; // always fallback to `single`
}

function getDefaultType({ type, defaultValue, modelValue }: SingleOrMultipleProps) {
  if (type) return type;

  return validateProps({ type, defaultValue, modelValue });
}

function getDefaultValue({ type, defaultValue }: SingleOrMultipleProps) {
  if (defaultValue !== undefined) return defaultValue;

  return type === 'single' ? undefined : [];
}

export function useSingleOrMultipleValue<P extends SingleOrMultipleProps, Name extends string>(
  props: P,
  emits: (name: Name, ...args: any[]) => void
) {
  const type = ref(getDefaultType(props));

  const isSingle = computed(() => type.value === 'single');

  const modelValue = useVModel(props, 'modelValue', emits, {
    defaultValue: getDefaultValue(props),
    passive: (props.modelValue === undefined) as false,
    deep: true
  }) as Ref<AcceptableValue | AcceptableValue[] | undefined>;

  function changeModelValue(value: AcceptableValue) {
    if (type.value === 'single') {
      modelValue.value = isEqual(value, modelValue.value) ? undefined : value;
    } else {
      const modelValueArray = [...((modelValue.value as AcceptableValue[]) || [])];
      if (isValueEqualOrExist(modelValueArray, value)) {
        const index = modelValueArray.findIndex(i => isEqual(i, value));
        modelValueArray.splice(index, 1);
      } else {
        modelValueArray.push(value);
      }
      modelValue.value = modelValueArray;
    }
  }

  watch(
    () => [props.type, props.modelValue, props.defaultValue],
    () => {
      const validatedType = validateProps(props);
      if (type.value !== validatedType) type.value = validatedType;
    },
    { immediate: true }
  );

  return {
    modelValue,
    type,
    changeModelValue,
    isSingle
  };
}
