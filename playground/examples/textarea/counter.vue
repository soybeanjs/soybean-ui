<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Counter</h3>
    <div class="w-80 lt-md:w-auto">
      <STextarea show-counter :maxlength="20" default-value="default value" />
    </div>
  </div>
</template>
