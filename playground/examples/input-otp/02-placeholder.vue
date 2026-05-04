<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from '@soybeanjs/headless/constants';

const otp = ref('A3F');
</script>

<template>
  <SInputOtp
    v-model="otp"
    :maxlength="6"
    inputmode="text"
    :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
    placeholder="ABC123"
    aria-label="Invite code"
    size="lg"
    class="w-70 lt-md:w-auto"
  />
</template>
