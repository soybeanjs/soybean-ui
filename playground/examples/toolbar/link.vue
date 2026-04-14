<script setup lang="ts">
import { SToolbar, SToolbarButton, SToolbarLink, SToolbarSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Link</h3>
    <SToolbar>
      <SToolbarButton>Back</SToolbarButton>
      <SToolbarSeparator />
      <SToolbarLink href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">Website</SToolbarLink>
      <SToolbarLink href="https://github.com/soybeanjs/soybean-ui" target="_blank" rel="noopener noreferrer">
        GitHub
      </SToolbarLink>
    </SToolbar>
  </div>
</template>
