<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCard, SIcon } from '@ui';
import { CheckboxControl, CheckboxGroupRoot, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@headless';
import type { CheckedState } from '@headless';
import { checkboxVariants } from '@variants/checkbox';

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
  <SCard title="Checkbox">
    <div>Checkbox Single:</div>
    <CheckboxRoot v-slot="{ modelValue }" :class="css.root()">
      <CheckboxControl id="checkbox-1" :class="css.control()">
        <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
          <CheckboxIndicator :class="css.indicator()">
            <SIcon v-if="modelValue === 'indeterminate'" icon="lucide:minus" class="size-full" />
            <SIcon v-else icon="lucide:check" class="size-full" />
          </CheckboxIndicator>
        </Transition>
      </CheckboxControl>
      <CheckboxLabel :class="css.label()">Label</CheckboxLabel>
    </CheckboxRoot>
    <div>Checkbox Group:</div>
    <CheckboxRoot v-slot="{ modelValue }" v-model="checked" :class="css.root()">
      <CheckboxControl id="checkbox-2" :class="css.control()">
        <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
          <CheckboxIndicator :class="css.indicator()">
            <SIcon v-if="modelValue === 'indeterminate'" icon="lucide:minus" class="size-full" />
            <SIcon v-else icon="lucide:check" class="size-full" />
          </CheckboxIndicator>
        </Transition>
      </CheckboxControl>
      <CheckboxLabel :class="css.label()">Check All</CheckboxLabel>
    </CheckboxRoot>
    <CheckboxGroupRoot v-model="selected" :class="css.groupRoot()">
      <CheckboxRoot
        v-for="item in items"
        v-slot="{ modelValue }"
        :key="item.value"
        :value="item.value"
        :class="css.root()"
      >
        <CheckboxControl :id="`checkbox-${item.value}`" :class="css.control()">
          <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
            <CheckboxIndicator :class="css.indicator()">
              <SIcon v-if="modelValue === 'indeterminate'" icon="lucide:minus" class="size-full" />
              <SIcon v-else icon="lucide:check" class="size-full" />
            </CheckboxIndicator>
          </Transition>
        </CheckboxControl>
        <CheckboxLabel :class="css.label()">{{ item.label }}</CheckboxLabel>
      </CheckboxRoot>
    </CheckboxGroupRoot>
  </SCard>
</template>
