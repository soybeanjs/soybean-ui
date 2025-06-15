<script setup lang="ts">
import { ref } from 'vue';
import { SCard } from '@ui';
import { RadioGroupControl, RadioGroupIndicator, RadioGroupItem, RadioGroupLabel, RadioGroupRoot } from '@headless';
import { radioVariants } from '@variants/radio';

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
  <SCard title="RadioGroup">
    <RadioGroupRoot v-model="selected">
      <RadioGroupItem v-for="item in items" :key="item.value" :value="item.value" :class="css.root()">
        <RadioGroupControl :id="`radio-${item.value}`" :class="css.control()">
          <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
            <RadioGroupIndicator :class="css.indicator()" />
          </Transition>
        </RadioGroupControl>
        <RadioGroupLabel :class="css.label()">{{ item.label }}</RadioGroupLabel>
      </RadioGroupItem>
    </RadioGroupRoot>
  </SCard>
</template>
