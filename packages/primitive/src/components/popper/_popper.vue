<script setup lang="ts">
import PopperAnchor from './popper-anchor.vue';
import PopperArrow from './popper-arrow.vue';
import PopperContent from './popper-content.vue';
import PopperRoot from './popper-root.vue';
</script>

<template>
  <PopperRoot>
    <PopperAnchor>Anchor</PopperAnchor>

    <PopperContent>
      Content

      <PopperArrow />
    </PopperContent>
  </PopperRoot>
</template>
