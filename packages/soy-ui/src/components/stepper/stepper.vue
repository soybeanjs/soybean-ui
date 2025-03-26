<script setup lang="ts" generic="T extends StepperOptionData = StepperOptionData">
import { computed } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, stepperVariants } from '@soybean-ui/variants';
import { Check, Circle, Dot } from 'lucide-vue-next';
import { useThemeSize } from '../../context/theme';
import SButton from '../button/button.vue';
import SStepperRoot from './stepper-root.vue';
import SStepperDescription from './stepper-description.vue';
import SStepperItem from './stepper-item.vue';
import SStepperSeparator from './stepper-separator.vue';
import SStepperTitle from './stepper-title.vue';
import SStepperTrigger from './stepper-trigger.vue';
import type { StepperEmits, StepperOptionData, StepperProps } from './types';

defineOptions({
  name: 'SStepper'
});

const { class: cls, size: _size, ui, items, ...delegatedRootProps } = defineProps<StepperProps<T>>();

const emit = defineEmits<StepperEmits>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const forwardedRoot = useForwardPropsEmits(delegatedRootProps, emit);

const titleDescWrapperCls = computed(() => {
  const { titleDescWrapper } = stepperVariants({ orientation: delegatedRootProps.orientation });

  return cn(titleDescWrapper(), ui?.titleDescWrapper);
});
</script>

<template>
  <SStepperRoot v-bind="forwardedRoot" :class="cls || ui?.root" :size="size">
    <template v-for="(item, index) in items" :key="index">
      <slot name="item" :item="item" :index="index">
        <SStepperItem
          v-slot="{ state }"
          :class="ui?.item"
          :size="size"
          :orientation="orientation"
          :step="item.step"
          :disabled="item.disabled"
          :completed="item.completed"
        >
          <SStepperSeparator
            v-if="item.step !== items[items.length - 1].step"
            :class="ui?.separator"
            :size="size"
            :orientation="orientation"
          />
          <slot name="trigger" :item="item" :state="state">
            <SStepperTrigger :class="ui?.trigger" :size="size" as-child>
              <SButton
                :variant="state == 'completed' || state == 'active' ? 'solid' : 'outline'"
                :size="size"
                shape="circle"
                class="z-10"
                :class="{ 'ring-2 ring-primary ring-offset-2 ring-offset-background': state === 'active' }"
              >
                <Check v-if="state == 'completed'" />
                <Circle v-if="state == 'active'" />
                <Dot v-if="state == 'inactive'" />
              </SButton>
            </SStepperTrigger>
          </slot>
          <div :class="titleDescWrapperCls">
            <SStepperTitle :class="ui?.title">{{ item.title }}</SStepperTitle>
            <SStepperDescription :class="ui?.description">{{ item.description }}</SStepperDescription>
          </div>
        </SStepperItem>
      </slot>
    </template>
  </SStepperRoot>
</template>
