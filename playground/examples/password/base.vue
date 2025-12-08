<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SPassword } from '@soybeanjs/ui';

const modelValue = ref('abc123');
</script>

<template>
  <SCard title="Base" split>
    <SPassword v-model="modelValue" placeholder="Please input" />
  </SCard>
</template>
