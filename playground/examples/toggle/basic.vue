<script setup lang="ts">
import { ref } from 'vue';
import { SToggle } from '@soybeanjs/ui';
import { themeColorOptions } from '../../constants/theme';

const pressed = ref(false);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle v-model="pressed" color="primary">
        {{ pressed ? 'Pressed' : 'Toggle me' }}
      </SToggle>
      <span class="text-sm text-muted-foreground">Pressed: {{ pressed }}</span>
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-3">
      <SToggle v-for="color in themeColorOptions" :key="color.value" :color="color.value" :default-value="true">
        {{ color.label }}
      </SToggle>
    </div>
  </div>
</template>
