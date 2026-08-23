<script setup lang="ts">
import { SStatistic } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex gap-8">
    <SStatistic label="Custom prefix / value / suffix slots" :value="2048">
      <template #prefix>
        <span class="text-success">▲</span>
      </template>
      <template #value>
        <span class="text-primary">2,048</span>
      </template>
      <template #suffix>GB</template>
    </SStatistic>
    <SStatistic label="Custom ui override" :value="99.5" :precision="1">
      <template #suffix>%</template>
    </SStatistic>
  </div>
</template>
