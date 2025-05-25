<script setup lang="ts">
import { ref } from 'vue';
import type { RovingFocusGroupProps } from '../../../../src/types';
import { transformPropsToContext } from '../../../../src/shared';
import { provideButtonRovingFocusContext, provideRovingFocusGroupContext } from './context';

interface Props extends RovingFocusGroupProps {
  defaultValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  loop: false,
  orientation: undefined
});

const modelValue = ref(props.defaultValue);

const { rovingFocusGroupProps, rovingFocusGroupEvents } = provideRovingFocusGroupContext(
  transformPropsToContext(props)
);

provideButtonRovingFocusContext({ modelValue });
</script>

<template>
  <div
    v-bind="rovingFocusGroupProps"
    :loop="props.loop"
    :orientation="props.orientation"
    class="inline-flex gap-2"
    :class="props.orientation === 'horizontal' ? 'flex-row' : 'flex-col'"
    v-on="rovingFocusGroupEvents"
  >
    <slot />
  </div>
</template>
