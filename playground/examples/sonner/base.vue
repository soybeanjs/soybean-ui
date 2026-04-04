<script setup lang="ts">
import { SButton, useSonner } from '@soybeanjs/ui';

const sonner = useSonner();
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <div class="flex flex-wrap gap-3">
      <SButton variant="pure" @click="sonner('Event has been created', { description: 'Sunday, December 03, 2023 at 9:00 AM' })">
        Default
      </SButton>
    </div>
  </div>
</template>
