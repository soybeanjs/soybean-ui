<script setup lang="ts">
import { computed, useId } from 'vue';
import { RadioGroupControl, RadioGroupIndicator, RadioGroupItem, RadioGroupLabel } from '@headless';
import { useOmitProps } from '@headless/composables';
import type { RadioProps } from './types';

defineOptions({
  name: 'SRadio'
});

const props = defineProps<RadioProps>();

const forwardedProps = useOmitProps(props, ['color', 'size', 'controlProps', 'indicatorProps', 'labelProps']);

const defaultId = useId();

const radioId = computed(() => props.id || `radio-${defaultId}`);
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps">
    <RadioGroupControl v-bind="controlProps" :id="radioId">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <RadioGroupIndicator v-bind="indicatorProps" />
      </Transition>
    </RadioGroupControl>
    <RadioGroupLabel v-bind="labelProps" :for="radioId" :size="size">
      <slot>{{ label }}</slot>
    </RadioGroupLabel>
  </RadioGroupItem>
</template>
