<script setup lang="ts">
import { ref } from 'vue';
import { SInputOpt, SInputOptGroup, SInputOptSlot } from '@soybeanjs/ui';

const value = ref('12');
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-col gap-3">
      <SInputOpt v-model="value" :maxlength="6">
        <SInputOptGroup>
          <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
        </SInputOptGroup>
      </SInputOpt>
      <p class="text-sm text-muted-foreground">Value: {{ value || '-' }}</p>
    </div>
  </div>
</template>
