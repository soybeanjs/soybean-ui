<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from 'radix-vue';
import { Circle } from 'lucide-vue-next';
import { nanoid } from 'nanoid';
import { radioVariants } from '@soybean-unify/ui-variants';
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

const { icon } = radioVariants();

const radioId = computed(() => props.id || `radio-${nanoid(8)}`);
</script>

<template>
  <SRadioRoot :class="props.class">
    <SRadioControl v-bind="forwarded" :id="radioId" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SRadioIndicator :class="indicatorClass" :force-mount="forceMountIndicator">
          <Circle :class="icon()" />
        </SRadioIndicator>
      </Transition>
    </SRadioControl>
    <SRadioLabel :class="labelClass" :for="radioId">
      <slot>{{ label }}</slot>
    </SRadioLabel>
  </SRadioRoot>
</template>

<style scoped></style>
