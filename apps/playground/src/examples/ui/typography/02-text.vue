<script setup lang="ts">
import { STypographyText } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-3">
      <STypographyText>Default text</STypographyText>
      <STypographyText type="secondary">Secondary text</STypographyText>
      <STypographyText type="success">Success text</STypographyText>
      <STypographyText type="warning">Warning text</STypographyText>
      <STypographyText type="danger">Danger text</STypographyText>
    </div>
    <div class="flex gap-3">
      <STypographyText code>const code = 1</STypographyText>
      <STypographyText mark>Highlighted</STypographyText>
      <STypographyText strong>Bold text</STypographyText>
      <STypographyText italic>Italic text</STypographyText>
      <STypographyText underline>Underlined</STypographyText>
      <STypographyText delete>Deleted</STypographyText>
    </div>
  </div>
</template>
