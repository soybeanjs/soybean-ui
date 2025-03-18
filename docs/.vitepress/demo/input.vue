<script setup lang="ts">
import { ref } from 'vue';
import { SInput } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiInput'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const modelValue = ref<string>('');
</script>

<template>
  <div class="demo-input w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Input Size</div>
    <div class="flex-c-stretch gap-3">
      <div v-for="size in sizes" :key="size">
        <div>{{ size }}</div>
        <SInput :size="size" placeholder="Please input" />
      </div>
    </div>
    <div class="py-12px text-18px">Input modelValue : {{ modelValue }}</div>
    <SInput v-model="modelValue" placeholder="Please input" />
    <div class="py-12px text-18px">Input Disabled</div>
    <SInput model-value="the input is disabled" disabled placeholder="Please input" />
    <div class="py-12px text-18px">Input File</div>
    <SInput type="file" />
  </div>
</template>

<style>
.demo-input input {
  border: 1px solid hsl(var(--input));
}
</style>
