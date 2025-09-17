<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef, watchSyncEffect } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useListboxRootContext, useListboxThemeContext } from './context';
import type { ListboxFilterEmits, ListboxFilterProps } from './types';

defineOptions({
  name: 'ListboxFilter'
});

const props = withDefaults(defineProps<ListboxFilterProps>(), {
  modelValue: undefined,
  as: 'input'
});

const emit = defineEmits<ListboxFilterEmits>();

const {
  disabled: rootDisabled,
  focusable,
  highlightedElement,
  highlightFirstItem,
  onKeydownNavigation,
  onKeydownEnter
} = useListboxRootContext('ListboxFilter');

const themeContext = useListboxThemeContext();
const cls = computed(() => themeContext?.ui?.value?.filter);

const [filterElement, setFilterElement] = useForwardElement();

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (value) {
      emit('update:modelValue', value);
    }
  },
  props.modelValue
);

const disabled = computed(() => props.disabled || rootDisabled.value || false);

const activedescendant = shallowRef<string>();

const onInput = (event: InputEvent) => {
  modelValue.value = (event.target as HTMLInputElement).value;
  highlightFirstItem();
};

watchSyncEffect(() => {
  activedescendant.value = highlightedElement.value?.id;
});

onMounted(() => {
  focusable.value = false;

  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) {
      filterElement.value?.focus();
    }
  }, 1);
});

onUnmounted(() => {
  focusable.value = true;
});
</script>

<template>
  <Primitive
    :ref="setFilterElement"
    :class="cls"
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-activedescendant="activedescendant"
    :aria-disabled="disabled ?? undefined"
    type="text"
    @keydown.down.up.home.end.prevent="onKeydownNavigation"
    @keydown.enter="onKeydownEnter"
    @input="onInput"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
