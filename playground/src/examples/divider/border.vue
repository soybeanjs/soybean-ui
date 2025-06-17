<script setup lang="ts">
import { SCard, SDivider } from '@ui';
</script>

<template>
  <SCard title="Border" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Solid">
      <SDivider label="Solid" border="solid" />
    </SCard>
    <SCard title="Dashed">
      <SDivider label="Dashed" border="dashed" />
    </SCard>
    <SCard title="Dotted">
      <SDivider label="Dotted" border="dotted" />
    </SCard>
  </SCard>
</template>
