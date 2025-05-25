<script setup lang="ts">
import { ref } from 'vue';
import { RovingFocusGroup } from '../../../../src/components/roving-focus';
import type { RovingFocusGroupProps } from '../../../../src/components/roving-focus';
import { provideButtonRovingFocusContext } from './context';

interface Props extends RovingFocusGroupProps {
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
  <RovingFocusGroup
    :loop="props.loop"
    :orientation="props.orientation"
    class="inline-flex gap-2"
    :class="props.orientation === 'horizontal' ? 'flex-row' : 'flex-col'"
  >
    <slot />
  </RovingFocusGroup>
</template>
