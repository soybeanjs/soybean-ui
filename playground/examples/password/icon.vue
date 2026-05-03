<script setup lang="ts">
import { SIcon, SPassword } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-60 lt-md:w-auto">
    <SPassword default-value="abc123">
      <template #visible="{ visible, toggle }">
        <SIcon :icon="visible ? 'lucide:lock-open' : 'lucide:lock'" class="cursor-pointer" @click="toggle" />
      </template>
    </SPassword>
  </div>
</template>
