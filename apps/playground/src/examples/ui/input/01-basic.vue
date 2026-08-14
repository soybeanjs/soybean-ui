<script setup lang="ts">
import { ref } from 'vue';
import { SInput } from '@soybeanjs/ui';

const modelValue = ref('');

function handleFocus() {
  console.log('Input focused');
}

function handleBlur() {
  console.log('Input blurred');
}
</script>

<template>
  <div class="leading-loose text-sm text-gray-500">modelValue: {{ modelValue }}</div>
  <div class="w-60 lt-md:w-auto">
    <SInput v-model="modelValue" placeholder="Please input" @focus="handleFocus" @blur="handleBlur" />
  </div>
</template>
