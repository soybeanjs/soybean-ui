<script setup lang="ts">
import { menuVariants } from '@soybean-ui/variants';

defineOptions({
  name: 'SMenuRadioIndicatorIcon'
});

const { radioIndicatorIconRoot, radioIndicatorIcon } = menuVariants();
</script>

<template>
  <div :class="radioIndicatorIconRoot()">
    <div :class="radioIndicatorIcon()"></div>
  </div>
</template>
