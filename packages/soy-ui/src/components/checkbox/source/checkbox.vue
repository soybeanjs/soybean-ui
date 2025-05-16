<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import { Check, Minus } from 'lucide-vue-next';
import SCheckboxLabel from '../../label/source/label.vue';
import type { CheckboxEmits, CheckboxProps } from '../types';
import SCheckboxRoot from './checkbox-root.vue';
import SCheckboxControl from './checkbox-control.vue';
import SCheckboxIndicator from './checkbox-indicator.vue';

defineOptions({
  name: 'SCheckbox'
});

const { class: rootCls, id, size, ui, forceMountIndicator, label, ...delegatedProps } = defineProps<CheckboxProps>();

const emit = defineEmits<CheckboxEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const defaultId = useId();

const checkboxId = computed(() => id || `checkbox-${defaultId}`);

const isIndeterminate = computed(() => delegatedProps.modelValue === 'indeterminate');
</script>

<template>
  <SCheckboxRoot :class="rootCls || ui?.root">
    <SCheckboxControl v-bind="forwarded" :id="checkboxId" :class="ui?.control" :size="size">
      <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
        <SCheckboxIndicator :class="ui?.indicator" :force-mount="forceMountIndicator">
          <Minus v-if="isIndeterminate" class="size-full" />
          <Check v-else class="size-full" />
        </SCheckboxIndicator>
      </Transition>
    </SCheckboxControl>
    <SCheckboxLabel :class="ui?.label" :for="checkboxId" :size="size">
      <slot :id="checkboxId">{{ label }}</slot>
    </SCheckboxLabel>
  </SCheckboxRoot>
</template>
