<script setup lang="ts">
import { SCard, SInput } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Disabled" split>
    <SInput model-value="the input is disabled" disabled placeholder="Please input" />
  </SCard>
</template>
