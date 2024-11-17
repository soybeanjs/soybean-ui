<script setup lang="ts">
import { Label } from '.';
</script>

<template>
  <Story title="Label/Demo" :layout="{ type: 'single', iframe: true }">
    <Variant title="default">
      <div class="flex flex-wrap items-center gap-[15px] px-5">
        <Label class="text-[15px] text-white font-medium leading-[35px]" for="firstName">First name</Label>
        <input
          id="firstName"
          class="h-[35px] w-[200px] inline-flex appearance-none items-center justify-center rounded-[4px] bg-black/50 px-[10px] text-[15px] text-white leading-none shadow-[0_0_0_1px] shadow-black/40 outline-none selection:bg-black/80 selection:color-white focus:shadow-[0_0_0_2px_black]"
          type="text"
          value="Pedro Duarte"
        />
      </div>
    </Variant>
  </Story>
</template>
