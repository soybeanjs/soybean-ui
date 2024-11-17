<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectComboboxRootContext } from './combobox-root.vue';

export interface ComboboxTriggerProps extends PrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}

const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
  as: 'button'
});

useForwardExpose();
const rootContext = injectComboboxRootContext();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    tabindex="-1"
    aria-label="Show popup"
    aria-haspopup="listbox"
    :aria-expanded="rootContext.open.value"
    :aria-controls="rootContext.contentId"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    @click="rootContext.onOpenChange(!rootContext.open.value)"
  >
    <slot />
  </Primitive>
</template>
