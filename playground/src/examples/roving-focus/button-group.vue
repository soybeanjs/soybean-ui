<script setup lang="ts">
import { ref } from 'vue';
import { SButtonGroup } from '@ui';
import type { ButtonGroupProps } from '@ui';
import { RovingFocusGroup } from '@headless';
import type { RovingFocusGroupProps } from '@headless';
import { provideButtonRovingFocusContext } from './context';

interface Props extends Omit<ButtonGroupProps, 'dir'>, Omit<RovingFocusGroupProps, 'color'> {
  defaultValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  loop: false,
  orientation: undefined
});

const modelValue = ref(props.defaultValue);

provideButtonRovingFocusContext({ modelValue });
</script>

<template>
  <RovingFocusGroup v-bind="props" as-child>
    <SButtonGroup>
      <slot />
    </SButtonGroup>
  </RovingFocusGroup>
</template>
