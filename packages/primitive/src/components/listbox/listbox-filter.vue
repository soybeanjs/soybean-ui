<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, onMounted } from 'vue';
import { usePrimitiveElement } from '../primitive';
import { Primitive, type PrimitiveProps } from '..';
import { injectListboxRootContext } from './listbox-root.vue';

export interface ListboxFilterProps extends PrimitiveProps {
  /** The controlled value of the filter. Can be bound-with with v-model. */
  modelValue?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}

export type ListboxFilterEmits = {
  'update:modelValue': [string];
};

const props = withDefaults(defineProps<ListboxFilterProps>(), {
  as: 'input'
});
const emits = defineEmits<ListboxFilterEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: '',
  passive: (props.modelValue === undefined) as false
});

const rootContext = injectListboxRootContext();
rootContext.focusable.value = false;

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

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
    :as
    :as-child
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    type="text"
    @keydown.down.up.home.end.prevent="rootContext.onKeydownNavigation"
    @keydown.enter="rootContext.onKeydownEnter"
    @input="
      (event: InputEvent) => {
        modelValue = (event.target as HTMLInputElement).value;
        rootContext.highlightFirstItem(event);
      }
    "
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
