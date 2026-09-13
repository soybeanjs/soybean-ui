<script setup lang="ts">
import { ref } from 'vue';
import { STextarea } from '@vean/ui';

const modelValue = ref('');
</script>

<template>
  <STextarea v-model="modelValue" placeholder="Please input" class="w-80 lt-md:w-auto" />
</template>
