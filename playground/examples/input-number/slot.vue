<script setup lang="ts">
import { SIcon, SInputNumber } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <div class="flex flex-wrap gap-3">
      <div class="w-60 lt-md:w-auto">
        <SInputNumber>
          <template #leading>
            <SIcon icon="lucide:dollar-sign" />
          </template>
          <template #trailing>
            <SIcon icon="lucide:percent" />
          </template>
        </SInputNumber>
      </div>
      <div class="w-60 lt-md:w-auto">
        <SInputNumber center>
          <template #leading>
            <SIcon icon="lucide:arrow-down" />
          </template>
          <template #trailing>
            <SIcon icon="lucide:arrow-up" />
          </template>
        </SInputNumber>
      </div>
    </div>
  </div>
</template>
