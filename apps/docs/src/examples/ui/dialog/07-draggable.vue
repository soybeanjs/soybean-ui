<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';
</script>

<template>
  <SDialog draggable title="Draggable Dialog" description="Drag the header to move this dialog.">
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div class="w-80">
      Drag the header to move the dialog around the screen. The position is preserved after you stop dragging.
    </div>
  </SDialog>
</template>
