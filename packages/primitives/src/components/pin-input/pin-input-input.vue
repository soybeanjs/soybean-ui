<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { useArrowNavigation, usePrimitiveElement } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { injectPinInputRootContext } from './context';
import type { PinInputInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'PinInputInput'
});

const props = withDefaults(defineProps<PinInputInputPropsWithPrimitive>(), {
  as: 'input'
});

const context = injectPinInputRootContext();
const inputElements = computed(() => Array.from(context.inputElements!.value));
const currentValue = computed(() => context.currentModelValue.value[props.index]);

const disabled = computed(() => props.disabled || context.disabled.value);
const isOtpMode = computed(() => context.otp.value);
const isPasswordMode = computed(() => context.mask.value);

const { primitiveElement, currentElement } = usePrimitiveElement();
function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;

  if ((event.data?.length ?? 0) > 1) {
    handleMultipleCharacter(target.value);
    return;
  }

  if (context.isNumericMode.value && !/^\d*$/.test(target.value)) {
    target.value = target.value.replace(/\D/g, '');
    return;
  }

  target.value = target.value.slice(-1);
  updateModelValueAt(props.index, target.value);

  const nextEl = inputElements.value[props.index + 1];
  if (nextEl) nextEl.focus();
}

async function resetPlaceholder() {
  const target = currentElement.value as HTMLInputElement;
  await nextTick();
  if (target && !target.value) {
    target.placeholder = context.placeholder.value;
  }
}

function handleKeydown(event: KeyboardEvent) {
  useArrowNavigation(event, getActiveElement() as HTMLElement, undefined, {
    itemsArray: inputElements.value,
    focus: true,
    loop: false,
    arrowKeyOptions: 'horizontal',
    dir: context.dir.value
  });
}

function handleBackspace(event: KeyboardEvent) {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value) {
    updateModelValueAt(props.index, '');
  } else {
    const prevEl = inputElements.value[props.index - 1];
    if (prevEl) {
      prevEl.focus();
      updateModelValueAt(props.index - 1, '');
    }
  }
}

function handleDelete(event: KeyboardEvent) {
  if (event.key === 'Delete') {
    event.preventDefault();
    updateModelValueAt(props.index, '');
  }
}

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement;
  target.setSelectionRange(1, 1);

  if (!target.value) target.placeholder = '';
}

function handleBlur(_event: FocusEvent) {
  resetPlaceholder();
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const clipboardData = event.clipboardData;
  if (!clipboardData) return;

  const values = clipboardData.getData('text');
  handleMultipleCharacter(values);
}

function handleMultipleCharacter(values: string) {
  const tempModelValue = [...context.currentModelValue.value];
  const initialIndex = values.length >= inputElements.value.length ? 0 : props.index;
  const lastIndex = Math.min(initialIndex + values.length, inputElements.value.length);
  for (let i = initialIndex; i < lastIndex; i++) {
    const input = inputElements.value[i];
    const value = values[i - initialIndex];
    // eslint-disable-next-line no-continue
    if (context.isNumericMode.value && !/^\d*$/.test(value)) continue;

    tempModelValue[i] = value;
    input.focus();
  }
  context.modelValue.value = tempModelValue;
  inputElements.value[lastIndex]?.focus();
}

function removeTrailingEmptyStrings(input: (string | number)[]) {
  let i = input.length - 1;

  while (i >= 0 && input[i] === '') {
    input.pop();
    i--;
  }

  return input;
}

function updateModelValueAt(index: number, value: string) {
  const tempModelValue = [...context.currentModelValue.value];

  if (context.isNumericMode.value) {
    const num = Number(value);

    if (value === '' || Number.isNaN(num)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete tempModelValue[index];
    } else {
      // @ts-expect-error ignore type
      tempModelValue[index] = num;
    }
  } else {
    tempModelValue[index] = value;
  }

  // @ts-expect-error ignore type
  context.modelValue.value = removeTrailingEmptyStrings(tempModelValue);
}

watch(currentValue, () => {
  if (!currentValue.value) {
    resetPlaceholder();
  }
});

onMounted(() => {
  context.onInputElementChange(currentElement.value as HTMLInputElement);
});
onUnmounted(() => {
  context.inputElements?.value.delete(currentElement.value as HTMLInputElement);
});
</script>

<template>
  <Primitive
    ref="primitiveElement"
    autocapitalize="none"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :autocomplete="isOtpMode ? 'one-time-code' : 'false'"
    :type="isPasswordMode ? 'password' : 'text'"
    :inputmode="context.isNumericMode.value ? 'numeric' : 'text'"
    :pattern="context.isNumericMode.value ? '[0-9]*' : undefined"
    :placeholder="context.placeholder.value"
    :value="currentValue"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :data-complete="context.isCompleted.value ? '' : undefined"
    :aria-label="`pin input ${index + 1} of ${inputElements.length}`"
    @input="handleInput($event as InputEvent)"
    @keydown.left.right.up.down.home.end="handleKeydown"
    @keydown.backspace="handleBackspace"
    @keydown.delete="handleDelete"
    @focus="handleFocus"
    @blur="handleBlur"
    @paste="handlePaste"
  >
    <slot />
  </Primitive>
</template>
