<script setup lang="ts">
import { ref } from 'vue';
import { SBottomSheet, SBottomSheetClose, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <div>
    <h3 class="playground-title">Controlled</h3>
    <SBottomSheet
      v-model:open="open"
      title="Confirm booking"
      description="Review the summary before you finish the reservation."
    >
      <template #trigger>
        <SButton variant="outline">Open controlled sheet</SButton>
      </template>
      <div class="flex-c gap-3 text-sm text-muted-foreground">
        <p>Open state: {{ open ? 'open' : 'closed' }}</p>
        <p>The sheet can still be dismissed by dragging down or tapping the action below.</p>
      </div>
      <template #footer>
        <SBottomSheetClose as-child>
          <SButton class="w-full">Done</SButton>
        </SBottomSheetClose>
      </template>
    </SBottomSheet>
  </div>
</template>
