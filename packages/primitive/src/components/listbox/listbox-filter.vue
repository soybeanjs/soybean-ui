<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { usePrimitiveElement } from '../../composables';
import { injectListboxRootContext } from './context';
import type { ListboxFilterEmits, ListboxFilterPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxFilter'
});

const props = withDefaults(defineProps<ListboxFilterPropsWithPrimitive>(), {
  modelValue: undefined,
  as: 'input'
});

const emit = defineEmits<ListboxFilterEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: (props.modelValue === undefined) as false
});

const rootContext = injectListboxRootContext();
rootContext.focusable.value = false;

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

function onInput(event: InputEvent) {
  modelValue.value = (event.target as HTMLInputElement).value;
  rootContext.highlightFirstItem(event);
}

onMounted(() => {
  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) currentElement.value?.focus();
  }, 1);
});
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    type="text"
    @keydown.down.up.home.end.prevent="rootContext.onKeydownNavigation"
    @keydown.enter="rootContext.onKeydownEnter"
    @input="onInput"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
