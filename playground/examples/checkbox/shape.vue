<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Shape</h3>
    <SCheckbox :default-value="true" shape="rounded" label="Rounded" />
  </div>
</template>
