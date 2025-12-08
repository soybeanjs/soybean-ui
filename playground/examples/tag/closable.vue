<script setup lang="ts">
import { shallowRef } from 'vue';
import { SCard, SSwitch, STag } from '@soybeanjs/ui';

const open = shallowRef(true);
</script>

<template>
  <SCard title="Closable" split>
    <template #extra>
      <SSwitch v-model="open" />
    </template>
    <STag v-model:open="open" variant="soft" closable>closable tag</STag>
  </SCard>
</template>
