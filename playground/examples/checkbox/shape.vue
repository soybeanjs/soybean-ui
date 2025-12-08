<script setup lang="ts">
import { SCard, SCheckbox } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Shape">
    <SCheckbox :default-value="true" shape="rounded" label="Rounded" />
  </SCard>
</template>
