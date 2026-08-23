<script setup lang="ts">
import { SCode } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex flex-col gap-3">
    <p>
      Install the package with
      <SCode variant="inline" code="pnpm add @soybeanjs/ui" />
      and import it in your component.
    </p>
    <p>
      The
      <SCode variant="inline" code="variant" />
      prop switches between block and inline rendering.
    </p>
  </div>
</template>
