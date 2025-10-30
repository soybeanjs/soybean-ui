<script setup lang="ts">
import { SAlert, SCard } from '@ui';
</script>

<template>
  <SCard title="Closable" split>
    <SAlert variant="outline" title="Closable" description="You can click close icon to close alert." closable />
  </SCard>
</template>
