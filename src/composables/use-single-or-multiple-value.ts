import { computed } from 'vue';
import { isEqual, isNullish, isValueEqualOrExist } from '../shared';
import type { AcceptableValue, SingleOrMultipleProps } from '../types';
import { useControllableState } from './use-controllable-state';

export function useSingleOrMultipleValue<P extends SingleOrMultipleProps>(
  props: P,
  onUpdateModelValue: (value: P['modelValue']) => void
) {
  const type = computed(() => getDefaultType(props));

  const isSingle = computed(() => type.value === 'single');

  const modelValue = useControllableState(
    () => props.modelValue,
    value => {
      onUpdateModelValue(value);
    },
    getDefaultValue(props)
  );

  function toggleModelValue(value: AcceptableValue) {
    if (type.value === 'single') {
      modelValue.value = isEqual(value, modelValue.value) ? undefined : value;
      return;
    }

    const updated = Array.isArray(modelValue.value)
      ? [...modelValue.value]
      : [modelValue.value].filter(v => !isNullish(v));

    if (isValueEqualOrExist(updated, value)) {
      const index = updated.findIndex(v => isEqual(v, value));
      updated.splice(index, 1);
    } else {
      updated.push(value);
    }

    modelValue.value = updated;
  }

  return {
    modelValue,
    toggleModelValue,
    isSingle
  };
}

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
function validateProps(props: SingleOrMultipleProps) {
  const { modelValue, defaultValue, type } = props;

  const value = isNullish(modelValue) ? defaultValue : modelValue;
  const canTypeBeInferred = !isNullish(modelValue) || !isNullish(defaultValue);

  if (canTypeBeInferred) {
    return Array.isArray(value) ? 'multiple' : 'single';
  }

  // always fallback to `single`
  return type ?? 'single';
}

function getDefaultType(props: SingleOrMultipleProps) {
  if (props.type) {
    return props.type;
  }

  return validateProps(props);
}

function getDefaultValue(props: SingleOrMultipleProps) {
  if (!isNullish(props.defaultValue)) {
    return props.defaultValue;
  }

  return props.type === 'single' ? undefined : [];
}
