<script setup lang="ts">
import { SCard, SPassword } from '@ui';
</script>

<template>
  <SCard title="Disabled" split>
    <SPassword default-value="abc123" disabled placeholder="Please input" />
  </SCard>
</template>
