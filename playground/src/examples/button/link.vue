<script setup lang="ts">
import { ButtonLink, Card } from '@ui';
</script>

<template>
  <Card title="Button Link">
    <ButtonLink to="/demo">Link to demo</ButtonLink>
    <ButtonLink to="/demo" target="_blank">New tab Link to demo</ButtonLink>
    <ButtonLink to="/demo" disabled>Disabled</ButtonLink>
    <ButtonLink href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">soybeanjs.cn</ButtonLink>
  </Card>
</template>
