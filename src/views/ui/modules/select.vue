<script setup lang="ts">
import { SSelect } from 'soybean-ui';

defineOptions({
  name: 'UiSelect'
});
</script>

<template>
  <div class="w-200px lt-sm:w-auto">
    <SSelect :options="[]" />
  </div>
</template>

<style scoped></style>
