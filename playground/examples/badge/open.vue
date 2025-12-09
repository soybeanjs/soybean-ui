<script setup lang="ts">
import { shallowRef } from 'vue';
import { SBadge, SButton, SSwitch } from '@soybeanjs/ui';

const open = shallowRef(true);
</script>

<template>
  <div>
    <h3 class="playground-title">Open</h3>
    <SBadge v-model:open="open">
      <SButton variant="pure">Open</SButton>
    </SBadge>
    <SSwitch v-model="open" class="ml-3" />
  </div>
</template>
