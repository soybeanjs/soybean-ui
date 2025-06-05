<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger } from '@/components/dropdown-menu';
import SectionWrapper from '../components/section-wrapper.vue';
</script>

<template>
  <SectionWrapper title="Dropdown">
    <DropdownMenuRoot>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    </DropdownMenuRoot>
  </SectionWrapper>
</template>
