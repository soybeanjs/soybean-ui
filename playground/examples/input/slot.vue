<script setup lang="ts">
import { SIcon, SInput } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <div class="w-60 lt-md:w-auto">
      <SInput>
        <template #leading>
          <SIcon icon="lucide:search" />
        </template>
        <template #trailing>
          <SIcon icon="lucide:mic" />
        </template>
      </SInput>
    </div>
  </div>
</template>
