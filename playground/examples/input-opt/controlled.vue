<script setup lang="ts">
import { ref } from 'vue';
import { SInputOpt, SInputOptGroup, SInputOptSlot } from '@soybeanjs/ui';

const value = ref('2468');
</script>

<template>
  <div>
    <h3 class="playground-title">Controlled</h3>
    <div class="flex flex-col gap-3">
      <SInputOpt v-model="value" :maxlength="6" placeholder="------">
        <SInputOptGroup>
          <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
        </SInputOptGroup>
      </SInputOpt>
      <div class="flex gap-2">
        <button class="rounded-md border border-input px-3 py-1 text-sm" @click="value = ''">Clear</button>
        <button class="rounded-md border border-input px-3 py-1 text-sm" @click="value = '123456'">Fill</button>
      </div>
    </div>
  </div>
</template>
