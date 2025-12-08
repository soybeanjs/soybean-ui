<script setup lang="ts">
import { SCard, STextarea } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Autosize" split :ui="{ content: 'flex-c gap-3' }">
    <STextarea placeholder="Min 2 rows, Max 4 rows" :autosize="{ minRows: 2, maxRows: 4 }" />
  </SCard>
</template>
