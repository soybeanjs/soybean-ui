<script setup lang="ts">
import { SCard, SPassword } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Clearable" split>
    <SPassword default-value="abc123" clearable />
  </SCard>
</template>
