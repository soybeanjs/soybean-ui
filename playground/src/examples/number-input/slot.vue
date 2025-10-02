<script setup lang="ts">
import { SCard, SIcon, SNumberInput } from '@ui';
</script>

<template>
  <SCard title="Slot" split :ui="{ content: 'flex-c gap-3' }">
    <SNumberInput>
      <template #leading>
        <SIcon icon="lucide:dollar-sign" />
      </template>
      <template #trailing>
        <SIcon icon="lucide:percent" />
      </template>
    </SNumberInput>
    <SNumberInput center>
      <template #leading>
        <SIcon icon="lucide:arrow-down" />
      </template>
      <template #trailing>
        <SIcon icon="lucide:arrow-up" />
      </template>
    </SNumberInput>
  </SCard>
</template>
