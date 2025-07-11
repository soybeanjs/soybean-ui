<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { injectTabsRootContext } from './context';
import { makeContentId, makeTriggerId } from './shared';
import type { TabsTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsTrigger'
});

const props = withDefaults(defineProps<TabsTriggerPropsWithPrimitive>(), {
  disabled: false,
  as: 'button'
});

const { forwardRef } = useForwardExpose();
const rootContext = injectTabsRootContext();

const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
const contentId = computed(() => makeContentId(rootContext.baseId, props.value));

const isSelected = computed(() => props.value === rootContext.modelValue.value);
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled" :active="isSelected">
    <Primitive
      :id="triggerId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-controls="contentId"
      :aria-selected="isSelected ? 'true' : 'false'"
      :data-disabled="disabled ? '' : undefined"
      :data-orientation="rootContext.orientation.value"
      :data-state="isSelected ? 'active' : 'inactive'"
      :disabled="disabled"
      role="tab"
      :type="as === 'button' ? 'button' : undefined"
      @mousedown.left="
        (event: MouseEvent) => {
          // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
          // but not when the control key is pressed (avoiding MacOS right click)
          if (!disabled && event.ctrlKey === false) {
            rootContext.changeModelValue(value);
          } else {
            // prevent focus to avoid accidental activation
            event.preventDefault();
          }
        }
      "
      @keydown.enter.space="rootContext.changeModelValue(value)"
      @focus="
        () => {
          // handle 'automatic' activation if necessary
          // ie. activate tab following focus
          const isAutomaticActivation = rootContext.activationMode !== 'manual';
          if (!isSelected && !disabled && isAutomaticActivation) {
            rootContext.changeModelValue(value);
          }
        }
      "
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
