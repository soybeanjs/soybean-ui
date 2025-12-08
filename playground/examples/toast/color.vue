<script setup lang="ts">
import { SButton, SCard, useToast } from '@soybeanjs/ui';

const toast = useToast();
</script>

<template>
  <SCard title="Color" :ui="{ content: 'flex gap-3' }">
    <SButton
      color="success"
      @click="toast({ color: 'success', title: 'Toast Title', description: 'Toast Description' })"
    >
      Success
    </SButton>
    <SButton
      color="destructive"
      @click="toast({ color: 'destructive', title: 'Toast Title', description: 'Toast Description' })"
    >
      Destructive
    </SButton>
    <SButton
      color="warning"
      @click="toast({ color: 'warning', title: 'Toast Title', description: 'Toast Description' })"
    >
      Warning
    </SButton>
    <SButton color="info" @click="toast({ color: 'info', title: 'Toast Title', description: 'Toast Description' })">
      Info
    </SButton>
    <SButton color="carbon" @click="toast({ color: 'carbon', title: 'Toast Title', description: 'Toast Description' })">
      Carbon
    </SButton>
    <SButton
      color="secondary"
      @click="toast({ color: 'secondary', title: 'Toast Title', description: 'Toast Description' })"
    >
      Secondary
    </SButton>
    <SButton color="accent" @click="toast({ color: 'accent', title: 'Toast Title', description: 'Toast Description' })">
      Accent
    </SButton>
  </SCard>
</template>
