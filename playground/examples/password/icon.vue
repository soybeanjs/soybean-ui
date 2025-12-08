<script setup lang="ts">
import { SCard, SIcon, SPassword } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Visible Icon" split>
    <SPassword default-value="abc123">
      <template #visible="{ visible, toggle }">
        <SIcon :icon="visible ? 'lucide:lock-open' : 'lucide:lock'" class="cursor-pointer" @click="toggle" />
      </template>
    </SPassword>
  </SCard>
</template>
