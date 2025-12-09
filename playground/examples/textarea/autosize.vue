<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Autosize</h3>
    <div class="w-80 lt-md:w-auto">
      <STextarea placeholder="Min 2 rows, Max 4 rows" :autosize="{ minRows: 2, maxRows: 4 }" />
    </div>
  </div>
</template>
