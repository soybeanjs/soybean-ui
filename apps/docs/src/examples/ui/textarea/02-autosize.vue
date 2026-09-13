<script setup lang="ts">
import { STextarea } from '@vean/ui';
</script>

<template>
  <STextarea placeholder="Min 2 rows, Max 4 rows" :autosize="{ minRows: 2, maxRows: 4 }" class="w-80 lt-md:w-auto" />
</template>
