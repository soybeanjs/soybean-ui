<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { InputControl, InputRoot, provideInputUi } from '@soybeanjs/headless';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { inputVariants } from './variants';
import type { InputEmits, InputProps } from './types';

defineOptions({
  name: 'SInput',
  inheritAttrs: false
});

const props = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['class', 'inputRef', 'size', 'ui', 'controlProps', 'clearable']);

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

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
    <InputControl v-bind="{ ...controlProps, ...attrs }" :ref="setInputElement" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <slot name="trailing" />
  </InputRoot>
</template>
