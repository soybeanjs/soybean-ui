<script setup lang="ts">
import { ref } from 'vue';
import { SPassword } from '@soybeanjs/ui';

const modelValue = ref('abc123');
</script>

<template>
  <SPassword v-model="modelValue" placeholder="Please input" class="w-60 lt-md:w-auto" />
</template>
