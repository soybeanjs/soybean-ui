<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { Check, Minus } from 'lucide-vue-next';
import { nanoid } from 'nanoid';
import { computedOmit } from '../../shared';
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

const delegatedProps = computedOmit(props, [
  'id',
  'class',
  'checked',
  'controlClass',
  'indicatorClass',
  'forceMountIndicator',
  'label',
  'labelClass'
]);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const checkboxId = computed(() => props.id || `checkbox-${nanoid(8)}`);

const checked = defineModel<CheckboxCheckedState>('checked', { default: false });

const isIndeterminate = computed(() => checked.value === 'indeterminate');
</script>

<template>
  <SCheckboxRoot :class="props.class">
    <SCheckboxControl v-bind="forwarded" :id="checkboxId" v-model:checked="checked" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SCheckboxIndicator :class="indicatorClass" :force-mount="forceMountIndicator">
          <Minus v-if="isIndeterminate" class="size-full" />
          <Check v-else class="size-full" />
        </SCheckboxIndicator>
      </Transition>
    </SCheckboxControl>
    <SCheckboxLabel :class="labelClass" :for="checkboxId">
      <slot :id="checkboxId">{{ label }}</slot>
    </SCheckboxLabel>
  </SCheckboxRoot>
</template>

<style scoped></style>
