<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../../composables';
import type { StringOrNumber } from '../../types';

import { injectTabsRootContext } from './tabs-root.vue';
import { makeContentId, makeTriggerId } from './utils';

export interface TabsTriggerProps extends PrimitiveProps {
  /** A unique value that associates the trigger with a content. */
  value: StringOrNumber;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
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
      role="tab"
      :type="as === 'button' ? 'button' : undefined"
      :as
      :as-child
      :aria-selected="isSelected ? 'true' : 'false'"
      :aria-controls="contentId"
      :data-state="isSelected ? 'active' : 'inactive'"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="
        event => {
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
