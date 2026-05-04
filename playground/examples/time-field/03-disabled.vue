<script setup lang="ts">
import { Time } from '@internationalized/date';
import { STimeField } from '@soybeanjs/ui';

const value = new Time(8, 0, 0);
</script>

<template>
  <STimeField class="w-60 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled time" />
</template>
