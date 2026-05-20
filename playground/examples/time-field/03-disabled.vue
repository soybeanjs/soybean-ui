<script setup lang="ts">
import { STimeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = new Time(8, 0, 0);
</script>

<template>
  <STimeField :model-value="value" disabled aria-label="Disabled time" />
</template>
