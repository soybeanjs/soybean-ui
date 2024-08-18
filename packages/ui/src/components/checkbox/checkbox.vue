<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { Check, Minus } from 'lucide-vue-next';
import SCheckboxWrapper from './checkbox-wrapper.vue';
import SCheckboxRoot from './checkbox-root.vue';
import SCheckboxIndicator from './checkbox-indicator.vue';
import SCheckboxLabel from './checkbox-label.vue';
import type { CheckboxCheckedState, CheckboxProps } from './types';

defineOptions({
  name: 'SCheckbox'
});

const props = defineProps<CheckboxProps>();

const emit = defineEmits<CheckboxRootEmits>();

const delegatedProps = reactiveOmit(props, ['checked', 'rootClass', 'class', 'label', 'labelClass', 'indicatorProps']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const checked = defineModel<CheckboxCheckedState>('checked', { default: false });

function clickLabel() {
  checked.value = !checked.value;
}

const isIndeterminate = computed(() => checked.value === 'indeterminate');
</script>

<template>
  <SCheckboxWrapper :class="props.class">
    <SCheckboxRoot v-bind="forwarded" v-model:checked="checked" :class="rootClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SCheckboxIndicator v-bind="indicatorProps">
          <Minus v-if="isIndeterminate" class="size-full" />
          <Check v-else class="size-full" />
        </SCheckboxIndicator>
      </Transition>
    </SCheckboxRoot>
    <SCheckboxLabel @click="clickLabel">
      <slot>{{ label }}</slot>
    </SCheckboxLabel>
  </SCheckboxWrapper>
</template>

<style scoped></style>
