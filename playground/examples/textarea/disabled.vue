<script setup lang="ts">
import { SCard, STextarea } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Disabled" split>
    <STextarea model-value="the textarea is disabled" disabled placeholder="Please input" />
  </SCard>
</template>
