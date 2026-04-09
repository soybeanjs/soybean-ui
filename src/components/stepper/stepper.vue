<script setup lang="ts">
import { computed } from 'vue';
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
  provideStepperUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { stepperVariants } from './variants';
import type { StepperEmits, StepperProps } from './types';

defineOptions({
  name: 'SStepper'
});

const props = defineProps<StepperProps>();

const emit = defineEmits<StepperEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
  'color',
  'size',
  'ui',
  'items',
  'itemProps',
  'triggerProps',
  'indicatorProps',
  'separatorProps',
  'titleProps',
  'descriptionProps'
]);

const listeners = useForwardListeners(emit);

const resolvedItems = computed(() => props.items.map((item, index) => ({ ...item, step: item.step ?? index + 1 })));

const ui = computed(() => {
  const variants = stepperVariants({
    color: props.color,
    size: props.size,
    orientation: props.orientation
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideStepperUi(ui);
</script>

<template>
  <StepperRoot v-slot="rootSlotProps" v-bind="forwardedProps" v-on="listeners">
    <template v-for="(item, index) in resolvedItems" :key="item.step">
      <StepperItem
        v-slot="itemSlotProps"
        v-bind="itemProps"
        :step="item.step"
        :disabled="item.disabled"
        :completed="item.completed"
      >
        <slot name="item" v-bind="{ ...item, ...rootSlotProps, ...itemSlotProps }">
          <StepperTrigger v-bind="triggerProps">
            <StepperIndicator v-bind="indicatorProps">
              <slot name="indicator" v-bind="{ ...item, ...rootSlotProps, ...itemSlotProps }">
                <Icon
                  v-if="itemSlotProps.state === 'completed'"
                  icon="lucide:check"
                  :class="ui.indicatorIcon"
                  :aria-hidden="true"
                />
                <span v-else>{{ item.step }}</span>
              </slot>
            </StepperIndicator>
            <div :class="ui.itemContent">
              <StepperTitle v-bind="titleProps">
                <slot name="title" v-bind="{ ...item, ...rootSlotProps, ...itemSlotProps }">
                  {{ item.title ?? `Step ${item.step}` }}
                </slot>
              </StepperTitle>
              <StepperDescription v-if="item.description || $slots.description" v-bind="descriptionProps">
                <slot name="description" v-bind="{ ...item, ...rootSlotProps, ...itemSlotProps }">
                  {{ item.description }}
                </slot>
              </StepperDescription>
            </div>
          </StepperTrigger>
          <slot
            v-if="index < resolvedItems.length - 1"
            name="separator"
            v-bind="{ ...item, ...rootSlotProps, ...itemSlotProps }"
          >
            <StepperSeparator v-bind="separatorProps" />
          </slot>
        </slot>
      </StepperItem>
    </template>
  </StepperRoot>
</template>
