<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';
import { RadioGroupControl, RadioGroupIndicator, RadioGroupItem, RadioGroupLabel, Slot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import type { RadioCardProps } from './types';

defineOptions({
  name: 'SRadioCard'
});

const props = defineProps<RadioCardProps>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'ui',
  'icon',
  'description',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const defaultId = useId();

const radioId = computed(() => props.id || `radio-${defaultId}`);
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps">
    <div :class="ui?.content">
      <Icon :icon="icon" :class="ui?.icon" />
      <div :class="ui?.textContent">
        <RadioGroupLabel v-bind="labelProps" :for="radioId">
          <slot :id="radioId">{{ label }}</slot>
        </RadioGroupLabel>
        <Slot v-if="slots.description || description" :class="ui?.description">
          <slot name="description">
            <p v-if="description">{{ description }}</p>
          </slot>
        </Slot>
      </div>
    </div>
    <RadioGroupControl v-bind="controlProps" :id="radioId">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <RadioGroupIndicator v-bind="indicatorProps" />
      </Transition>
    </RadioGroupControl>
  </RadioGroupItem>
</template>
