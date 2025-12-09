<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Clearable</h3>
    <div class="w-80 lt-md:w-auto">
      <STextarea clearable default-value="default value" />
    </div>
  </div>
</template>
