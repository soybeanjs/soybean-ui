<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('8241');
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Disabled</h3>
    <div class="w-70 lt-md:w-auto">
      <SInputOtp v-model="otp" :maxlength="4" disabled aria-label="Disabled code" />
    </div>
  </div>
</template>
