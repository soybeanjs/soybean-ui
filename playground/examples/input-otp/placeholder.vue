<script setup lang="ts">
import { ref } from 'vue';
import { REGEXP_ONLY_DIGITS_AND_CHARS, SInputOtp } from '@soybeanjs/ui';

const otp = ref('A3F');
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Alphanumeric</h3>
    <div class="w-70 lt-md:w-auto">
      <SInputOtp
        v-model="otp"
        :maxlength="6"
        inputmode="text"
        :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
        placeholder="ABC123"
        aria-label="Invite code"
        size="lg"
      />
    </div>
  </div>
</template>
