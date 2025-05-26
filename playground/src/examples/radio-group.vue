<script setup lang="ts">
import { ref } from 'vue';
import { radioVariants } from '@soybean-ui/variants';
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '../../../src';
import SectionWrapper from '../components/section-wrapper.vue';

const css = radioVariants();

const selected = ref<string>('apple');

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];
</script>

<template>
  <SectionWrapper title="RadioGroup">
    <RadioGroupRoot v-model="selected">
      <div v-for="item in items" :key="item.value" :class="css.root()">
        <RadioGroupItem :id="`radio-${item.value}`" :class="css.control()" :value="item.value">
          <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
            <RadioGroupIndicator :class="css.indicator()" />
          </Transition>
        </RadioGroupItem>
        <label :for="`radio-${item.value}`" :class="css.label()">{{ item.label }}</label>
      </div>
    </RadioGroupRoot>
  </SectionWrapper>
</template>
