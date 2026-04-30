<script setup lang="ts">
import { shallowRef } from 'vue';

import { SDateRangePicker } from '@soybeanjs/ui';

const range = shallowRef();
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SDateRangePicker v-model="range" class="w-90 lt-md:w-auto" />
  </div>
</template>
