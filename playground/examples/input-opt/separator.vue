<script setup lang="ts">
import { SInputOpt, SInputOptGroup, SInputOptSeparator, SInputOptSlot } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Separator</h3>
    <SInputOpt :maxlength="6" placeholder="------">
      <SInputOptGroup>
        <SInputOptSlot v-for="index in 3" :key="index" :index="index - 1" />
      </SInputOptGroup>
      <SInputOptSeparator />
      <SInputOptGroup>
        <SInputOptSlot v-for="index in 3" :key="index" :index="index + 2" />
      </SInputOptGroup>
    </SInputOpt>
  </div>
</template>
