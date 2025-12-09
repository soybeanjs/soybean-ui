<script setup lang="ts">
import { SButton, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <div class="flex flex-wrap gap-12px">
      <SButton color="primary">
        <template #leading>
          <SIcon icon="lucide:plus" />
        </template>
        leading
      </SButton>
      <SButton color="destructive" variant="outline">
        After
        <template #trailing>
          <SIcon icon="lucide:minus" />
        </template>
      </SButton>
      <SButton color="success" variant="dashed">
        <template #leading>
          <SIcon icon="lucide:plus" />
        </template>
        Both
        <template #trailing>
          <SIcon icon="lucide:minus" />
        </template>
      </SButton>
    </div>
  </div>
</template>
