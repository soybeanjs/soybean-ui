<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SInput } from '@soybeanjs/ui';

const modelValue = ref('');
</script>

<template>
  <SCard title="Base" split>
    <div class="leading-loose text-sm text-gray-500">modelValue: {{ modelValue }}</div>
    <SInput v-model="modelValue" placeholder="Please input" />
  </SCard>
</template>
