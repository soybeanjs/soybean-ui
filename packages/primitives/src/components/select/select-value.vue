<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import type { AcceptableValue } from '../../types';
import { Primitive } from '../primitive';
import { injectSelectRootContext } from './context';
import type { SelectValuePropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectValue'
});

const props = withDefaults(defineProps<SelectValuePropsWithPrimitive>(), {
  as: 'span',
  placeholder: ''
});

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectSelectRootContext();

onMounted(() => {
  rootContext.valueElement = currentElement;
});

const selectedLabel = computed(() => {
  let list: string[] = [];
  const options = Array.from(rootContext.optionsSet.value);
  const getOption = (value?: AcceptableValue) => options.find(option => option.value === value);
  if (Array.isArray(rootContext.modelValue.value)) {
    list = rootContext.modelValue.value.map(value => getOption(value)?.textContent ?? '');
  } else {
    list = [getOption(rootContext.modelValue.value)?.textContent ?? ''];
  }
  return list.filter(Boolean);
});

const slotText = computed(() => {
  return selectedLabel.value.length ? selectedLabel.value.join(', ') : props.placeholder;
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-placeholder="selectedLabel.length ? undefined : props.placeholder"
    :style="{ pointerEvents: 'none' }"
  >
    <slot :model-value="rootContext.modelValue.value" :selected-label="selectedLabel" :slot-text="slotText">
      {{ slotText }}
    </slot>
  </Primitive>
</template>
