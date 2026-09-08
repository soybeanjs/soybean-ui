<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';
import type { SwitchShape } from '@soybeanjs/ui';

const shapes: SwitchShape[] = ['rounded', 'square'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SSwitch v-for="shape in shapes" :key="shape" size="xl" :default-value="true" :shape="shape" />
  </div>
</template>
