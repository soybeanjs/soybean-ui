<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAvatarBase from './base.vue';
import DemoAvatarFallback from './fallback.vue';
import DemoAvatarDelay from './delay.vue';
import DemoAvatarSize from './size.vue';
</script>

<template>
  <SCard title="Avatar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAvatarBase />
    <DemoAvatarFallback />
    <DemoAvatarDelay />
    <DemoAvatarSize />
  </SCard>
</template>
