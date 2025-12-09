<script setup lang="ts">
import { shallowRef } from 'vue';
import { SSwitch, STag } from '@soybeanjs/ui';

const open = shallowRef(true);
</script>

<template>
  <div>
    <h3 class="playground-title">Closable</h3>
    <div class="flex-y-center">
      <SSwitch v-model="open" class="mr-4" />
      <STag v-model:open="open" variant="soft" closable>closable tag</STag>
    </div>
  </div>
</template>
