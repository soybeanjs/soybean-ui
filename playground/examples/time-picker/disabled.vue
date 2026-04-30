<script setup lang="ts">
import { Time } from '@internationalized/date';

import { STimePicker } from '@soybeanjs/ui';

const value = new Time(9, 30, 0);
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Disabled</h3>
    <STimePicker class="w-60 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled meeting time" />
  </div>
</template>
