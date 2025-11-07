<script setup lang="ts">
import { shallowRef } from 'vue';
import { SBadge, SButton, SCard, SSwitch } from '@ui';

const open = shallowRef(true);
</script>

<template>
  <SCard title="Open" split>
    <SSwitch v-model="open" class="mr-3" />
    <SBadge v-model:open="open">
      <SButton variant="pure">Open</SButton>
    </SBadge>
  </SCard>
</template>
