<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import { Check, Minus } from 'lucide-vue-next';
import SCheckboxLabel from '../label/label.vue';
import SCheckboxRoot from './checkbox-root.vue';
import SCheckboxControl from './checkbox-control.vue';
import SCheckboxIndicator from './checkbox-indicator.vue';
import type { CheckboxEmits, CheckboxProps } from './types';

defineOptions({
  name: 'SCheckbox'
});

const {
  class: rootCls,
  id,
  checked,
  controlClass,
  indicatorClass,
  forceMountIndicator,
  label,
  labelClass,
  ...delegatedProps
} = defineProps<CheckboxProps>();

const emit = defineEmits<CheckboxEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const defaultId = useId();

const checkboxId = computed(() => id || `checkbox-${defaultId}`);

const isIndeterminate = computed(() => checked === 'indeterminate');
</script>

<template>
  <SCheckboxRoot :class="rootCls">
    <SCheckboxControl v-bind="forwarded" :id="checkboxId" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SCheckboxIndicator :class="indicatorClass" :force-mount="forceMountIndicator">
          <Minus v-if="isIndeterminate" class="size-full" />
          <Check v-else class="size-full" />
        </SCheckboxIndicator>
      </Transition>
    </SCheckboxControl>
    <SCheckboxLabel :class="labelClass" :for="checkboxId" :size="size">
      <slot :id="checkboxId">{{ label }}</slot>
    </SCheckboxLabel>
  </SCheckboxRoot>
</template>

<style scoped></style>
