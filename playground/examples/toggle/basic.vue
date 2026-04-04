<script setup lang="ts">
import { ref } from 'vue';
import { SToggle } from '@soybeanjs/ui';

const pressed = ref(false);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle v-model="pressed">Bold</SToggle>
      <span class="text-sm text-muted-foreground">Pressed: {{ pressed }}</span>
    </div>
  </div>
</template>
