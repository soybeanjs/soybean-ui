<script setup lang="ts">
import { STextarea } from '@vean/ui';
</script>

<template>
  <STextarea show-counter :maxlength="20" default-value="default value" class="w-80 lt-md:w-auto" />
</template>
