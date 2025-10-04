<script setup lang="ts">
import { SCard, STextarea } from '@ui';
</script>

<template>
  <SCard title="Counter" split>
    <STextarea show-counter :maxlength="20" default-value="default value" />
  </SCard>
</template>
