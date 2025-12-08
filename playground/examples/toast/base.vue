<script setup lang="ts">
import { SButton, SCard, useToast } from '@soybeanjs/ui';

const toast = useToast();
</script>

<template>
  <SCard title="Base" :ui="{ content: 'flex gap-3' }">
    <SButton variant="pure" @click="toast({ title: 'Toast Title', description: 'Toast Description' })">Default</SButton>
  </SCard>
</template>
