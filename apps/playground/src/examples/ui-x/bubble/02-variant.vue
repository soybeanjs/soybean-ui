<script setup lang="ts">
import { SxBubble } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="flex flex-col gap-3">
    <SxBubble variant="filled" placement="start" content="Filled variant" />
    <SxBubble variant="outlined" placement="start" content="Outlined variant" />
    <SxBubble variant="shadow" placement="start" content="Shadow variant" />
  </div>
</template>
