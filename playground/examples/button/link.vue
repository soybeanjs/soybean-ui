<script setup lang="ts">
import { SButtonLink } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Button Link</h3>
    <div class="flex flex-wrap gap-3">
      <SButtonLink to="/about">Link to about</SButtonLink>
      <SButtonLink to="/about" target="_blank">New tab Link to about</SButtonLink>
      <SButtonLink to="/about" disabled>Disabled</SButtonLink>
      <SButtonLink href="https://soybeanjs.cn">soybeanjs.cn</SButtonLink>
    </div>
  </div>
</template>
