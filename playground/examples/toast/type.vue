<script setup lang="ts">
import { SButton, SCard, useToast } from '@ui';

const toast = useToast();
</script>

<template>
  <SCard title="Type" :ui="{ content: 'flex gap-3' }">
    <SButton variant="pure" @click="toast({ type: 'success', title: 'Toast Title', description: 'Toast Description' })">
      Success
    </SButton>
    <SButton
      variant="pure"
      @click="toast({ type: 'destructive', title: 'Toast Title', description: 'Toast Description' })"
    >
      Destructive
    </SButton>
    <SButton variant="pure" @click="toast({ type: 'warning', title: 'Toast Title', description: 'Toast Description' })">
      Warning
    </SButton>
    <SButton variant="pure" @click="toast({ type: 'info', title: 'Toast Title', description: 'Toast Description' })">
      Info
    </SButton>
  </SCard>
</template>
