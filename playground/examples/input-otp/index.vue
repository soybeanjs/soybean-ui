<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoInputOtpBasic from './basic.vue';
import DemoInputOtpPlaceholder from './placeholder.vue';
import DemoInputOtpCustomSlot from './custom-slot.vue';
import DemoInputOtpDisabled from './disabled.vue';
</script>

<template>
  <SCard title="InputOtp" split :ui="{ content: 'flex-c gap-4' }">
    <DemoInputOtpBasic />
    <DemoInputOtpPlaceholder />
    <DemoInputOtpCustomSlot />
    <DemoInputOtpDisabled />
  </SCard>
</template>
