<script setup lang="ts">
import { SSonner, SButton, useSonner } from '@soybeanjs/ui';

const sonner = useSonner();
</script>

<template>
  <div>
    <h3 class="playground-title">Sonner</h3>
    <div class="flex flex-wrap gap-3">
      <SButton variant="pure" @click="sonner('Event has been created')">
        Default
      </SButton>
      <SButton variant="pure" @click="sonner.success('Event has been created')">
        Success
      </SButton>
      <SButton variant="pure" @click="sonner.error('Something went wrong')">
        Error
      </SButton>
    </div>
    <!-- SSonner is registered globally; shown here for documentation -->
    <SSonner />
  </div>
</template>
