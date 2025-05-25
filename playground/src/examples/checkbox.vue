<script setup lang="ts">
import { computed, ref } from 'vue';
import { checkboxVariants } from '@soybean-ui/variants';
import { Check, Minus } from 'lucide-vue-next';
import { CheckboxGroupRoot, CheckboxIndicator, CheckboxRoot } from '../../../src/components/checkbox';
import type { CheckedState } from '../../../src/types';
import SectionWrapper from '../components/section-wrapper.vue';

const css = checkboxVariants();

const selected = ref<string[]>(['apple', 'orange']);

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];

const checked = computed<CheckedState>({
  get() {
    if (selected.value.length === 0) return false;

    if (selected.value.length === items.length) return true;

    return 'indeterminate';
  },
  set(value) {
    selected.value = value === true ? items.map(item => item.value) : [];
  }
});
</script>

<template>
  <SectionWrapper title="Checkbox">
    <div>Checkbox Single:</div>
    <div :class="css.root()">
      <CheckboxRoot id="checkbox-1" v-slot="{ modelValue }" :class="css.control()">
        <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
          <CheckboxIndicator :class="css.indicator()">
            <Minus v-if="modelValue === 'indeterminate'" class="size-full" />
            <Check v-else class="size-full" />
          </CheckboxIndicator>
        </Transition>
      </CheckboxRoot>
      <label for="checkbox-1" :class="css.label()">Label</label>
    </div>
    <div>Checkbox Group:</div>
    <div :class="css.root()">
      <CheckboxRoot id="checkbox-2" v-slot="{ modelValue }" v-model="checked" :class="css.control()">
        <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
          <CheckboxIndicator :class="css.indicator()">
            <Minus v-if="modelValue === 'indeterminate'" class="size-full" />
            <Check v-else class="size-full" />
          </CheckboxIndicator>
        </Transition>
      </CheckboxRoot>
      <label for="checkbox-2" :class="css.label()">Check All</label>
    </div>
    <CheckboxGroupRoot v-model="selected" :class="css.groupRoot()">
      <div v-for="item in items" :key="item.value" :class="css.root()">
        <CheckboxRoot :id="`checkbox-${item.value}`" v-slot="{ modelValue }" :value="item.value" :class="css.control()">
          <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
            <CheckboxIndicator :class="css.indicator()">
              <Minus v-if="modelValue === 'indeterminate'" class="size-full" />
              <Check v-else class="size-full" />
            </CheckboxIndicator>
          </Transition>
        </CheckboxRoot>
        <label :for="item.value" :class="css.label()">{{ item.label }}</label>
      </div>
    </CheckboxGroupRoot>
  </SectionWrapper>
</template>
