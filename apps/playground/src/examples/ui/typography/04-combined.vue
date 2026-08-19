<script setup lang="ts">
import { SCard, STypographyParagraph, STypographyText, STypographyTitle } from '@soybeanjs/ui';
</script>

<template>
  <SCard class="w-100">
    <STypographyTitle :level="4">SoybeanUI</STypographyTitle>
    <STypographyParagraph class="mt-1">
      A headless-first component library for Vue. Every component ships with zero styles in the logic layer, so you can
      bring your own design system.
    </STypographyParagraph>
    <div class="mt-2 flex items-center gap-2">
      <STypographyText type="success">v0.30.0</STypographyText>
      <STypographyText type="secondary">MIT License</STypographyText>
      <STypographyText code>pnpm add @soybeanjs/ui</STypographyText>
    </div>
  </SCard>
</template>
