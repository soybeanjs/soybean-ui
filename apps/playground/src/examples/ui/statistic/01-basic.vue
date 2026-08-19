<script setup lang="ts">
import { SStatistic } from '@soybeanjs/ui';
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <SStatistic label="Total Sales" :value="126560" prefix="¥" suffix="CNY" />
    <SStatistic label="Active Users" :value="93217" />
    <SStatistic label="Conversion Rate" :value="12.86" precision="2" suffix="%" />
  </div>
</template>
