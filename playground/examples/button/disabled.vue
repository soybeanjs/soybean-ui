<script setup lang="ts">
import { SButton, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Disabled" split>
    <div class="flex flex-wrap gap-3">
      <SButton disabled>Disabled</SButton>
    </div>
  </SCard>
</template>
