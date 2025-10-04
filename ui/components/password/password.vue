<script setup lang="ts">
import { computed } from 'vue';
import { InputControl, InputRoot, provideInputThemeContext } from '@headless';
import { useControllableState, useForwardElement, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { inputVariants } from '@variants/input';
import Icon from '../icon/icon.vue';
import type { PasswordEmits, PasswordProps } from './types';

defineOptions({
  name: 'SPassword'
});

const props = withDefaults(defineProps<PasswordProps>(), {
  visible: undefined
});

const emit = defineEmits<PasswordEmits>();

const [_, setInputElement] = useForwardElement(el => props.inputRef?.(el as HTMLInputElement));

const forwardedProps = useOmitProps(props, ['size', 'ui', 'clearable', 'visible', 'inputRef', 'controlProps']);

const visible = useControllableState(
  () => props.visible,
  value => {
    emit('update:visible', value as boolean);
  },
  false
);

const toggleVisible = () => {
  visible.value = !visible.value;
};

const ui = computed(() => {
  const variants = inputVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideInputThemeContext({
  ui
});
</script>

<template>
  <InputRoot v-slot="{ clear }" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot name="leading" />
    <InputControl v-bind="controlProps" :ref="setInputElement" :type="visible ? 'text' : 'password'" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <slot name="trailing" />
    <slot name="visible" :visible="visible" :toggle="toggleVisible">
      <Icon :icon="visible ? 'lucide:eye' : 'lucide:eye-off'" :class="ui.visible" @click="toggleVisible" />
    </slot>
  </InputRoot>
</template>
