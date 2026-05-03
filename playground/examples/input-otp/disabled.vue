<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('8241');
</script>

<template>
  <SInputOtp v-model="otp" :maxlength="4" disabled aria-label="Disabled code" class="w-70 lt-md:w-auto" />
</template>
