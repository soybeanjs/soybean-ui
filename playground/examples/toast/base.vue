<script setup lang="ts">
import { SButton, useToast } from '@soybeanjs/ui';

const toast = useToast();
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <SButton variant="pure" @click="toast({ title: 'Toast Title', description: 'Toast Description' })">Default</SButton>
  </div>
</template>
