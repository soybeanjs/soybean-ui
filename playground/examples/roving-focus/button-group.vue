<script setup lang="ts">
import { ref } from 'vue';
import { RovingFocusGroup } from '@soybeanjs/headless';
import type { RovingFocusGroupProps } from '@soybeanjs/headless';
import { SButtonGroup } from '@soybeanjs/ui';
import type { ButtonGroupProps } from '@soybeanjs/ui';
import { provideButtonRovingFocusContext } from './context';

type Props = Omit<ButtonGroupProps, 'dir'> &
  RovingFocusGroupProps & {
    defaultValue?: string;
  };

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
