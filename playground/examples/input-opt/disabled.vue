<script setup lang="ts">
import { SInputOpt, SInputOptGroup, SInputOptSlot } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <SInputOpt disabled default-value="098765" :maxlength="6">
      <SInputOptGroup>
        <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
      </SInputOptGroup>
    </SInputOpt>
  </div>
</template>
