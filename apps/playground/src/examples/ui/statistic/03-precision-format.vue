<script setup lang="ts">
import { SStatistic } from '@soybeanjs/ui';

const formatter = (value: number) => `${value.toFixed(2)} USD`;
</script>

<template>
  <div class="flex flex-col gap-6">
    <SStatistic label="Thousands Separator" :value="1234567.891" precision="2" />
    <SStatistic
      label="Custom Decimal Separator"
      :value="1234567.891"
      precision="2"
      decimal-separator=","
      group-separator=" "
    />
    <SStatistic label="Custom Formatter" :value="1092" :formatter="formatter" />
  </div>
</template>
