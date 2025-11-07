<script setup lang="ts">
import { SCard, SSeparator } from '@ui';
</script>

<template>
  <SCard title="Border" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Solid">
      <SSeparator label="Solid" border="solid" />
    </SCard>
    <SCard title="Dashed">
      <SSeparator label="Dashed" border="dashed" />
    </SCard>
    <SCard title="Dotted">
      <SSeparator label="Dotted" border="dotted" />
    </SCard>
  </SCard>
</template>
