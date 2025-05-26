<script setup lang="ts">
import { computed, onBeforeMount, onMounted, useAttrs } from 'vue';
import { useForwardElement } from '../../composables';
import { getAriaLabel, handleAndDispatchCustomEvent, isFormControl, isNullish } from '../../shared';
import type { NavigationKey } from '../../types';
import { RovingFocusItem } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { getCheckedState } from '../checkbox/shared';
import { provideRadioGroupItemContext, useRadioGroupRootContext } from './context';
import type { RadioGroupItemEmits, RadioGroupItemProps, RadioSelectEvent } from './types';

defineOptions({
  name: 'RadioGroupItem'
});

const props = defineProps<RadioGroupItemProps>();

const emit = defineEmits<RadioGroupItemEmits>();

const attrs = useAttrs();

const [itemElement, setItemElement] = useForwardElement();
const rootContext = useRadioGroupRootContext('RadioGroupItem');

const formControl = computed(() => isFormControl(itemElement.value));
const disabled = computed(() => rootContext.disabled.value || props.disabled);
const required = computed(() => rootContext.required.value || props.required);
const checked = computed(
  () => !isNullish(rootContext.modelValue.value) && rootContext.modelValue.value === props.value
);
const dataState = computed(() => getCheckedState(checked.value));
const ariaLabel = computed(() => getAriaLabel(itemElement.value, props.id, attrs['aria-label'] as string));

provideRadioGroupItemContext({ disabled, checked });

/** Arrow key constants for keyboard navigation */
const ARROW_KEYS: NavigationKey[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
/** Event name constant for radio selection */
const RADIO_SELECT = 'radio.select';

let isArrowKeyPressed = false;

function onKeyDown(event: KeyboardEvent) {
  if (ARROW_KEYS.includes(event.key as NavigationKey)) {
    isArrowKeyPressed = true;
  }
}

function onKeyUp() {
  isArrowKeyPressed = false;
}

function onClick(event: MouseEvent) {
  const eventDetail = { originalEvent: event, value: props.value };

  handleAndDispatchCustomEvent(
    RADIO_SELECT,
    (selectEvent: RadioSelectEvent) => {
      emit('select', selectEvent);

      if (selectEvent?.defaultPrevented) return;

      rootContext.modelValue.value = props.value;

      if (formControl.value) {
        // if radio is in a form, stop propagation from the button so that we only propagate
        // one click event (from the input). We propagate changes from an input so that native
        // form validation works and form events reflect radio updates.
        event.stopPropagation();
      }
    },
    eventDetail
  );
}

function onFocus() {
  setTimeout(() => {
    /**
     * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys and we need to 'check' it in that
     * case. We click it to 'check' it (instead of updating `context.value`) so that the radio change event fires.
     */
    if (isArrowKeyPressed) {
      itemElement.value?.click();
    }
  }, 0);
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
});

onBeforeMount(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
});
</script>

<template>
  <RovingFocusItem as="template" :checked="checked" :focusable="!disabled" :active="checked">
    <button
      :id="id"
      :ref="setItemElement"
      :class="props.class"
      role="radio"
      type="button"
      :disabled="disabled"
      :aria-checked="checked"
      :aria-label="ariaLabel"
      :data-disabled="disabled ? '' : undefined"
      :data-state="dataState"
      :value="value"
      :required="required"
      :name="name"
      @click.stop="onClick"
      @keydown.enter.prevent
      @focus="onFocus"
    >
      <slot :checked="checked" :required="required" :disabled="disabled" />

      <VisuallyHiddenInput
        v-if="formControl && name"
        type="radio"
        tabindex="-1"
        :value="value"
        :checked="checked"
        :name="name"
        :disabled="disabled"
        :required="required"
      />
    </button>
  </RovingFocusItem>
</template>
