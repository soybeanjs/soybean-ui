<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { Check, Minus } from 'lucide-vue-next';
import SCheckboxLabel from '../label/label.vue';
import SCheckboxRoot from './checkbox-root.vue';
import SCheckboxControl from './checkbox-control.vue';
import SCheckboxIndicator from './checkbox-indicator.vue';
import type { CheckboxCheckedState, CheckboxProps } from './types';

defineOptions({
  name: 'SCheckbox'
});

const props = defineProps<CheckboxProps>();

const emit = defineEmits<CheckboxRootEmits>();

const delegatedProps = reactiveOmit(props, [
  'class',
  'checked',
  'controlClass',
  'indicatorClass',
  'forceMountIndicator',
  'label',
  'labelClass'
]);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const checked = defineModel<CheckboxCheckedState>('checked', { default: false });

function clickLabel() {
  checked.value = !checked.value;
}

const isIndeterminate = computed(() => checked.value === 'indeterminate');
</script>

<template>
  <SCheckboxRoot :class="props.class">
    <SCheckboxControl v-bind="forwarded" v-model:checked="checked" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SCheckboxIndicator :class="indicatorClass" :force-mount="forceMountIndicator">
          <Minus v-if="isIndeterminate" class="size-full" />
          <Check v-else class="size-full" />
        </SCheckboxIndicator>
      </Transition>
    </SCheckboxControl>
    <SCheckboxLabel :class="labelClass" @click="clickLabel">
      <slot>{{ label }}</slot>
    </SCheckboxLabel>
  </SCheckboxRoot>
</template>

<style scoped></style>
