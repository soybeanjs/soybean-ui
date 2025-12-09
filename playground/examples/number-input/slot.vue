<script setup lang="ts">
import { SIcon, SNumberInput } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <div class="flex flex-wrap gap-3">
      <div class="w-60 lt-md:w-auto">
        <SNumberInput>
          <template #leading>
            <SIcon icon="lucide:dollar-sign" />
          </template>
          <template #trailing>
            <SIcon icon="lucide:percent" />
          </template>
        </SNumberInput>
      </div>
      <div class="w-60 lt-md:w-auto">
        <SNumberInput center>
          <template #leading>
            <SIcon icon="lucide:arrow-down" />
          </template>
          <template #trailing>
            <SIcon icon="lucide:arrow-up" />
          </template>
        </SNumberInput>
      </div>
    </div>
  </div>
</template>
