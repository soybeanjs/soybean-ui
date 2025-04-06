<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watchSyncEffect } from 'vue';
import { useVModel } from '@vueuse/core';
import { usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
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

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

const activedescendant = ref<string | undefined>();
watchSyncEffect(() => {
  activedescendant.value = rootContext.highlightedElement.value?.id;
});

function onInput(event: InputEvent) {
  modelValue.value = (event.target as HTMLInputElement).value;
  rootContext.highlightFirstItem(event);
}

onMounted(() => {
  rootContext.focusable.value = false;

  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) currentElement.value?.focus();
  }, 1);
});

onUnmounted(() => {
  rootContext.focusable.value = true;
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
    :aria-activedescendant="activedescendant"
    :aria-disabled="disabled ?? undefined"
    type="text"
    @keydown.down.up.home.end.prevent="rootContext.onKeydownNavigation"
    @keydown.enter="rootContext.onKeydownEnter"
    @input="onInput"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
