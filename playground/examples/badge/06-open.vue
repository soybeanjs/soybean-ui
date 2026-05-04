<script setup lang="ts">
import { shallowRef } from 'vue';
import { SBadge, SButton, SSwitch } from '@soybeanjs/ui';

const open = shallowRef(true);
</script>

<template>
  <SBadge v-model:open="open">
    <SButton variant="pure">Open</SButton>
  </SBadge>
  <SSwitch v-model="open" class="ml-3" />
</template>
