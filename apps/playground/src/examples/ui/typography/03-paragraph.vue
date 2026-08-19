<script setup lang="ts">
import { STypographyParagraph } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-80 flex flex-col gap-4">
    <STypographyParagraph>
      A paragraph without any extra capabilities. It renders as a semantic paragraph element with a comfortable line
      height.
    </STypographyParagraph>
    <STypographyParagraph copyable>
      This paragraph exposes a copy button in the corner. Clicking it copies the text content to the clipboard and shows
      a brief success state.
    </STypographyParagraph>
  </div>
</template>
