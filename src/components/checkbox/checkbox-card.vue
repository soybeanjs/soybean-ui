<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  Slot,
  provideCheckboxUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxCardVariants } from '@/variants/checkbox';
import Icon from '../icon/icon.vue';
import type { CheckboxCardProps, CheckboxEmits } from './types';

defineOptions({
  name: 'SCheckboxCard'
});

const props = withDefaults(defineProps<CheckboxCardProps>(), {
  modelValue: undefined
});

const emit = defineEmits<CheckboxEmits>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'ui',
  'color',
  'size',
  'shape',
  'label',
  'icon',
  'description',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const defaultId = useId();

const checkboxId = computed(() => props.id || `checkbox-${defaultId}`);

const isIndeterminate = computed(() => props.modelValue === 'indeterminate');

const ui = computed(() => {
  const variants = checkboxCardVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui);
});

provideCheckboxUi(ui);
</script>

<template>
  <CheckboxRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <div :class="ui.content">
      <Icon :icon="icon" :class="ui.icon" />
      <div :class="ui.textContent">
        <CheckboxLabel v-bind="labelProps" :for="checkboxId">
          <slot :id="checkboxId">{{ label }}</slot>
        </CheckboxLabel>
        <Slot v-if="slots.description || description" :class="ui.description">
          <slot name="description">
            <p v-if="description">{{ description }}</p>
          </slot>
        </Slot>
      </div>
    </div>
    <CheckboxControl v-bind="controlProps" :id="checkboxId" class="checkbox-control">
      <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
        <CheckboxIndicator v-bind="indicatorProps">
          <Icon :icon="isIndeterminate ? 'lucide:minus' : 'lucide:check'" class="size-full" />
        </CheckboxIndicator>
      </Transition>
    </CheckboxControl>
  </CheckboxRoot>
</template>
