<script setup lang="ts">
import { ref } from 'vue';
import { STextarea } from '@soybeanjs/ui';

const modelValue = ref('');
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <div class="w-80 lt-md:w-auto">
      <STextarea v-model="modelValue" placeholder="Please input" />
    </div>
  </div>
</template>
