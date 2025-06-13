<script setup lang="ts">
import { SButtonLink, SCard } from '@ui';
</script>

<template>
  <SCard title="Button Link">
    <SButtonLink to="/demo">Link to demo</SButtonLink>
    <SButtonLink to="/demo" target="_blank">New tab Link to demo</SButtonLink>
    <SButtonLink to="/demo" disabled>Disabled</SButtonLink>
    <SButtonLink href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">soybeanjs.cn</SButtonLink>
  </SCard>
</template>
