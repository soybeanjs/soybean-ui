<script setup lang="ts">
import { ref } from 'vue';
import { SPassword } from '@soybeanjs/ui';

const modelValue = ref('abc123');
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <div class="w-60 lt-md:w-auto">
      <SPassword v-model="modelValue" placeholder="Please input" />
    </div>
  </div>
</template>
