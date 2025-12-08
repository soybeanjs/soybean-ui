<script setup lang="ts">
import { SButton, SCard, useToast } from '@soybeanjs/ui';

const toast = useToast();
</script>

<template>
  <SCard title="Position" :ui="{ content: 'flex gap-3' }">
    <SButton
      variant="pure"
      @click="toast({ position: 'top-left', title: 'Toast Title', description: 'Toast Description' })"
    >
      Top Left
    </SButton>
    <SButton variant="pure" @click="toast({ position: 'top', title: 'Toast Title', description: 'Toast Description' })">
      Top
    </SButton>
    <SButton
      variant="pure"
      @click="toast({ position: 'top-right', title: 'Toast Title', description: 'Toast Description' })"
    >
      Top Right
    </SButton>
    <SButton
      variant="pure"
      @click="toast({ position: 'bottom-left', title: 'Toast Title', description: 'Toast Description' })"
    >
      Bottom Left
    </SButton>
    <SButton
      variant="pure"
      @click="toast({ position: 'bottom', title: 'Toast Title', description: 'Toast Description' })"
    >
      Bottom
    </SButton>
    <SButton
      variant="pure"
      @click="toast({ position: 'bottom-right', title: 'Toast Title', description: 'Toast Description' })"
    >
      Bottom Right
    </SButton>
  </SCard>
</template>
