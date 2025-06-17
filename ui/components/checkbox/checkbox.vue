<script setup lang="ts">
import { computed, useId } from 'vue';
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  provideCheckboxThemeContext
} from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { checkboxVariants } from '@variants/checkbox';
import Icon from '../icon/icon.vue';
import type { CheckboxEmits, CheckboxProps } from './types';

defineOptions({
  name: 'SCheckbox'
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined
});

const emit = defineEmits<CheckboxEmits>();

const forwardedProps = useOmitProps(props, [
  'color',
  'size',
  'ui',
  'label',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const defaultId = useId();

const checkboxId = computed(() => props.id || `checkbox-${defaultId}`);

const ui = computed(() => {
  const variants = checkboxVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui);
});

provideCheckboxThemeContext({
  ui
});
</script>

<template>
  <CheckboxRoot v-slot="slotProps" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <CheckboxControl v-bind="controlProps" :id="checkboxId">
      <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
        <CheckboxIndicator v-bind="indicatorProps">
          <slot name="indicator" v-bind="slotProps">
            <Icon :icon="slotProps.state === 'indeterminate' ? 'lucide:minus' : 'lucide:check'" class="size-full" />
          </slot>
        </CheckboxIndicator>
      </Transition>
    </CheckboxControl>
    <CheckboxLabel v-bind="labelProps" :for="checkboxId">
      <slot v-bind="slotProps" :id="checkboxId">{{ label }}</slot>
    </CheckboxLabel>
  </CheckboxRoot>
</template>
