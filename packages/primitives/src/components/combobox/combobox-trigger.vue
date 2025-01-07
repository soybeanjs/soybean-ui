<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectComboboxRootContext } from './context';
import type { ComboboxTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const rootContext = injectComboboxRootContext();

const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  if (currentElement.value) {
    rootContext.onTriggerElementChange(currentElement.value);
  }
});
</script>

<template>
  <Primitive
    v-bind="props"
    :ref="forwardRef"
    :type="tag"
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
