<script setup lang="ts">
import { SCard, SSwitch } from 'soy-ui';
import type { ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoSwitch'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default Checked" split>
      <SSwitch default-value />
    </SCard>
    <SCard title="Color" split>
      <div class="flex gap-12px">
        <SSwitch v-for="color in colors" :key="color" default-value :color="color" />
      </div>
    </SCard>
    <SCard title="Disabled" split>
      <SSwitch disabled default-value color="success" />
    </SCard>
  </div>
</template>
