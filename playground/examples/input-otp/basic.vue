<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp, toast } from '@soybeanjs/ui';

const otp = ref('');

const onComplete = () => {
  toast(`OTP complete! Value: ${otp.value}`);
};
</script>

<template>
  <div class="w-70 lt-md:w-auto">
    <SInputOtp
      v-model="otp"
      :maxlength="6"
      placeholder="000000"
      aria-label="Verification code"
      @complete="onComplete"
    />
  </div>
  <p class="text-sm text-muted-foreground">Value: {{ otp || '-' }}</p>
</template>
