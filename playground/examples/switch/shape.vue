<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';
import type { SwitchShape } from '@soybeanjs/ui';

const shapes: SwitchShape[] = ['rounded', 'square'];
</script>

<template>
  <div>
    <h3 class="playground-title">Shape</h3>
    <div class="flex flex-wrap gap-3">
      <SSwitch v-for="shape in shapes" :key="shape" size="xl" :default-value="true" :shape="shape" />
    </div>
  </div>
</template>
