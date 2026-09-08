<script setup lang="ts">
import { ref } from 'vue';
import { SBottomSheet, SButton } from '@soybeanjs/ui';

const nestedOpen = ref(false);

function closeNestedSheet() {
  nestedOpen.value = false;
}
</script>

<template>
  <SBottomSheet title="Parent Sheet" description="Open a nested sheet from inside the current bottom sheet.">
    <template #trigger>
      <SButton variant="pure">Open Parent</SButton>
    </template>

    <div class="flex flex-col gap-3 py-2">
      <p class="text-sm text-muted-foreground">
        The inner sheet uses BottomSheetRootNested so drag, release, and open state stay coordinated with the parent.
      </p>

      <SBottomSheet v-model:open="nestedOpen" nested>
        <template #trigger>
          <SButton variant="outline" class="w-fit">Open Nested</SButton>
        </template>

        <div class="flex flex-col gap-3 px-4 pb-4 pt-2">
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium">Nested Bottom Sheet</p>
            <p class="text-sm text-muted-foreground">
              Use the handle to drag between snap points, or jump directly with the quick actions below.
            </p>
          </div>

          <SButton size="sm" class="w-fit" @click="closeNestedSheet">Close Nested Sheet</SButton>
        </div>
      </SBottomSheet>
    </div>
  </SBottomSheet>
</template>
