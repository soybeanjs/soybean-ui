<script setup lang="ts">
import { computed } from 'vue';
import { InputControl, InputRoot, provideInputUi } from '@soybeanjs/headless';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { inputVariants } from '@/variants/input';
import Icon from '../icon/icon.vue';
import type { InputEmits, InputProps } from './types';

defineOptions({
  name: 'SInput'
});

const props = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

const forwardedProps = useOmitProps(props, ['class', 'inputRef', 'size', 'ui', 'controlProps', 'clearable']);

const ui = computed(() => {
  const variants = inputVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideInputUi(ui);
</script>

<template>
  <InputRoot v-slot="{ clear }" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot name="leading" />
    <InputControl v-bind="controlProps" :ref="setInputElement" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <slot name="trailing" />
  </InputRoot>
</template>
