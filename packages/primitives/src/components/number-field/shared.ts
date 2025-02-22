import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { unrefElement, useEventListener } from '@vueuse/core';
import type { MaybeComputedElementRef } from '@vueuse/core';
import { createEventHook, isClient, reactiveComputed } from '@vueuse/shared';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { isNullish } from '../../shared';

export function usePressedHold(options: { target?: MaybeComputedElementRef; disabled: Ref<boolean> }) {
  const { disabled } = options;
  const timeout = ref<number>();
  const triggerHook = createEventHook();
  const resetTimeout = () => window.clearTimeout(timeout.value);

  const onIncrementPressStart = (delay: number) => {
    resetTimeout();
    if (disabled.value) return;

    triggerHook.trigger();

    timeout.value = window.setTimeout(() => {
      onIncrementPressStart(60);
    }, delay);
  };

  const handlePressStart = () => {
    onIncrementPressStart(400);
  };

  const handlePressEnd = () => {
    resetTimeout();
  };

  // Handle press event, modified version of useMousePressed
  const isPressed = ref(false);
  const target = computed(() => unrefElement(options.target));

  const onPressStart = (event: PointerEvent) => {
    // Only handle left clicks, and ignore events that bubbled through portals.
    if (event.button !== 0 || isPressed.value) return;

    event.preventDefault();
    isPressed.value = true;
    handlePressStart();
  };

  const onPressRelease = () => {
    isPressed.value = false;
    handlePressEnd();
  };

  if (isClient) {
    useEventListener(target || window, 'pointerdown', onPressStart);
    useEventListener(window, 'pointerup', onPressRelease);
    useEventListener(window, 'pointercancel', onPressRelease);
  }

  return {
    isPressed,
    onTrigger: triggerHook.on
  };
}

export function useNumberFormatter(locale: Ref<string>, options: Ref<Intl.NumberFormatOptions | undefined> = ref({})) {
  return reactiveComputed(() => new NumberFormatter(locale.value, options.value));
}

export function useNumberParser(locale: Ref<string>, options: Ref<Intl.NumberFormatOptions | undefined> = ref({})) {
  return reactiveComputed(() => new NumberParser(locale.value, options.value));
}

export function handleDecimalOperation(operator: '-' | '+', value1?: number, value2?: number): number {
  if (isNullish(value1) || isNullish(value2)) {
    return 0;
  }

  let v1 = value1;
  let v2 = value2;

  let result = operator === '+' ? v1 + v2 : v1 - v2;

  // Check if we have decimals
  if (v1 % 1 !== 0 || v2 % 1 !== 0) {
    const v1Decimal = v1.toString().split('.');
    const v2Decimal = v2.toString().split('.');
    const v1DecimalLength = (v1Decimal[1] && v1Decimal[1].length) || 0;
    const v2DecimalLength = (v2Decimal[1] && v2Decimal[1].length) || 0;
    const multiplier = 10 ** Math.max(v1DecimalLength, v2DecimalLength);

    // Transform the decimals to integers based on the precision
    v1 = Math.round(v1 * multiplier);
    v2 = Math.round(v2 * multiplier);

    // Perform the operation on integers values to make sure we don't get a fancy decimal value
    result = operator === '+' ? v1 + v2 : v1 - v2;

    // Transform the integer result back to decimal
    result /= multiplier;
  }

  return result;
}
