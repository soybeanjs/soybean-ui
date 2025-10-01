<script setup lang="ts">
import { SCard, SIcon, SInput } from '@ui';
</script>

<template>
  <SCard title="Slot" split>
    <SInput>
      <template #leading>
        <SIcon icon="lucide:search" />
      </template>
      <template #trailing>
        <SIcon icon="lucide:mic" />
      </template>
    </SInput>
  </SCard>
</template>
