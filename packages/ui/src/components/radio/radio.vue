<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from 'radix-vue';
import { nanoid } from 'nanoid';
import { computedOmit } from '../../shared';
import SRadioLabel from '../label/label.vue';
import SRadioRoot from './radio-root.vue';
import SRadioControl from './radio-control.vue';
import SRadioIndicator from './radio-indicator.vue';
import type { RadioProps } from './types';

defineOptions({
  name: 'SRadio'
});

const props = defineProps<RadioProps>();

const delegatedProps = computedOmit(props, [
  'id',
  'class',
  'controlClass',
  'indicatorClass',
  'forceMountIndicator',
  'label',
  'labelClass'
]);

const forwarded = useForwardProps(delegatedProps);

const radioId = computed(() => props.id || `radio-${nanoid(8)}`);
</script>

<template>
  <SRadioRoot :class="props.class">
    <SRadioControl v-bind="forwarded" :id="radioId" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SRadioIndicator :class="indicatorClass" :color="color" :force-mount="forceMountIndicator" />
      </Transition>
    </SRadioControl>
    <SRadioLabel :class="labelClass" :for="radioId">
      <slot :id="radioId">{{ label }}</slot>
    </SRadioLabel>
  </SRadioRoot>
</template>

<style scoped></style>
