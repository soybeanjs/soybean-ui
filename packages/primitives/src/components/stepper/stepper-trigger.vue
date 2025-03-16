<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useArrowNavigation, useForwardExpose, useKbd } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { injectStepperItemContext, injectStepperRootContext } from './context';
import type { StepperTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperTrigger'
});

const props = withDefaults(defineProps<StepperTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectStepperRootContext();
const itemContext = injectStepperItemContext();

const kbd = useKbd();
const stepperItems = computed(() => Array.from(rootContext.totalStepperItems.value));

function handleMouseDown(event: MouseEvent) {
  if (itemContext.disabled.value) return;
  if (rootContext.linear.value) {
    if (
      itemContext.step.value <= rootContext.modelValue.value! ||
      itemContext.step.value === rootContext.modelValue.value! + 1
    ) {
      if (event.ctrlKey === false) {
        rootContext.changeModelValue(itemContext.step.value);
        return;
      }
    }
  } else if (event.ctrlKey === false) {
    rootContext.changeModelValue(itemContext.step.value);
    return;
  }

  // prevent focus to avoid accidental activation
  event.preventDefault();
}

function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault();

  if (itemContext.disabled.value) return;

  if ((event.key === kbd.ENTER || event.key === kbd.SPACE) && !event.ctrlKey && !event.shiftKey)
    rootContext.changeModelValue(itemContext.step.value);

  if ([kbd.ARROW_LEFT, kbd.ARROW_RIGHT, kbd.ARROW_UP, kbd.ARROW_DOWN].includes(event.key)) {
    useArrowNavigation(event, getActiveElement() as HTMLElement, undefined, {
      itemsArray: stepperItems.value,
      focus: true,
      loop: false,
      arrowKeyOptions: rootContext.orientation.value,
      dir: rootContext.dir.value
    });
  }
}

const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  rootContext.totalStepperItems.value.add(currentElement.value);
});

onUnmounted(() => {
  rootContext.totalStepperItems.value.delete(currentElement.value);
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-describedby="itemContext.descriptionId"
    :aria-labelledby="itemContext.titleId"
    :data-disabled="itemContext.disabled.value || !itemContext.isFocusable.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :data-state="itemContext.state.value"
    :disabled="itemContext.disabled.value || !itemContext.isFocusable.value ? '' : undefined"
    :tabindex="itemContext.isFocusable.value ? 0 : -1"
    :type="as === 'button' ? 'button' : undefined"
    @mousedown.left="handleMouseDown"
    @keydown.enter.space.left.right.up.down="handleKeyDown"
  >
    <slot />
  </Primitive>
</template>
