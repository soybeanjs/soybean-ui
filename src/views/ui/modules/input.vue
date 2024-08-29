<script setup lang="ts">
import { ref } from 'vue';
import type { InputSize } from 'soybean-ui';
import { SInput } from 'soybean-ui';

defineOptions({
  name: 'UiInput'
});

const sizes: InputSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const modelValue = ref<string>('');
</script>

<template>
  <div class="w-320px">
    <div class="py-12px text-18px">Input Size</div>
    <div class="flex-col-stretch gap-3">
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

<style scoped></style>
