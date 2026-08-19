<script setup lang="ts">
import { SEllipsis } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-60 flex flex-col gap-4">
    <SEllipsis>
      A single-line ellipsis truncates this long text with a trailing ellipsis when it overflows the container width.
    </SEllipsis>
    <SEllipsis :lines="2">
      A two-line ellipsis clamps the content to two lines and shows a tooltip with the full text when it overflows, so
      long paragraphs stay compact.
    </SEllipsis>
  </div>
</template>
