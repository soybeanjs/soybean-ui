<script setup lang="ts">
import { ref } from 'vue';
import { SSplitNav } from '@soybeanjs/ui';
import { splitNavItems } from './data';

const active = ref('');
</script>

<template>
  <div class="h-110">
    <SSplitNav
      v-model="active"
      mode="horizontal-dual-vertical"
      :items="splitNavItems"
      class="bg-sidebar border rounded-md"
    />
  </div>
</template>
