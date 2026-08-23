<script setup lang="ts">
import { SStatistic } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex gap-8">
    <SStatistic label="Revenue (YoY)" :value="23.45" :precision="2" trend="up" suffix="%" />
    <SStatistic label="Cost (YoY)" :value="8.3" :precision="1" trend="down" suffix="%" />
  </div>
</template>
