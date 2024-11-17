<script setup lang="ts">
import { ref } from 'vue';
import SwitchRoot from './switch-root.vue';
import SwitchThumb from './switch-thumb.vue';

const checked = ref(false);
</script>

<template>
  <p>{{ checked ? 'checked' : 'unchecked' }}</p>
  <div>
    <label for="airplane-mode">Airplane mode</label>
    <SwitchRoot
      id="airplane-mode"
      v-model="checked"
      aria-label="Airplane mode"
      data-testId="root"
      name="test"
      value="true"
    >
      <SwitchThumb data-testId="thumb" />
    </SwitchRoot>
  </div>
</template>
