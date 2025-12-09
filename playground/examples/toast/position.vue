<script setup lang="ts">
import { SButton, useToast } from '@soybeanjs/ui';

const toast = useToast();
</script>

<template>
  <div>
    <h3 class="playground-title">Position</h3>
    <div class="flex flex-wrap gap-3">
      <SButton
        variant="pure"
        @click="toast({ position: 'top-left', title: 'Toast Title', description: 'Toast Description' })"
      >
        Top Left
      </SButton>
      <SButton
        variant="pure"
        @click="toast({ position: 'top', title: 'Toast Title', description: 'Toast Description' })"
      >
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
    </div>
  </div>
</template>
