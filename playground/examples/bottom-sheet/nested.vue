<script setup lang="ts">
import { ref } from 'vue';
import { SBottomSheet, SButton } from '@soybeanjs/ui';

const nestedSnapPoints = ['120px', '260px', 1] as const;

const nestedOpen = ref(false);
const nestedActiveSnapPoint = ref<number | string | null>(nestedSnapPoints[0]);

function closeNestedSheet() {
  nestedOpen.value = false;
}

function setNestedSnapPoint(point: number | string) {
  nestedActiveSnapPoint.value = point;
}
</script>

<template>
  <div>
    <h3 class="playground-title">Nested</h3>
    <SBottomSheet title="Parent Sheet" description="Open a nested sheet from inside the current bottom sheet.">
      <template #trigger>
        <SButton variant="pure">Open Parent</SButton>
      </template>

      <div class="flex flex-col gap-3 py-2">
        <p class="text-sm text-muted-foreground">
          The inner sheet uses BottomSheetRootNested so drag, release, and open state stay coordinated with the parent.
        </p>

        <SBottomSheet
          v-model:open="nestedOpen"
          :snap-points="nestedSnapPoints"
          v-model:active-snap-point="nestedActiveSnapPoint"
        >
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

            <div class="flex flex-wrap gap-2">
              <SButton
                v-for="point in nestedSnapPoints"
                :key="String(point)"
                variant="outline"
                size="sm"
                @click="setNestedSnapPoint(point)"
              >
                {{ point }}
              </SButton>
            </div>

            <div class="text-sm text-muted-foreground">Current nested snap point: {{ nestedActiveSnapPoint }}</div>

            <SButton size="sm" class="w-fit" @click="closeNestedSheet">Close Nested Sheet</SButton>
          </div>
        </SBottomSheet>
      </div>
    </SBottomSheet>
  </div>
</template>
