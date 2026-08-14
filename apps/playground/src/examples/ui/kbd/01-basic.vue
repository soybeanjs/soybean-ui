<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SKbd value="command" />
    <SKbd value="K" />
    <SKbd :value="['ctrl', 'alt']" />
    <SKbd :value="['ctrl', 'alt', 'delete']" />
    <SKbd :value="['ctrl', 'shift', 'A']" />
  </div>
</template>
