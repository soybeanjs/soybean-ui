<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STextarea } from '@ui';

const modelValue = ref('');
</script>

<template>
  <SCard title="Base" split>
    <STextarea v-model="modelValue" placeholder="Please input" />
  </SCard>
</template>
