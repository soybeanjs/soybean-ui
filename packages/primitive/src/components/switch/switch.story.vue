<script setup lang="ts">
import { ref } from 'vue';
import { SwitchRoot, SwitchThumb } from '.';

const switchState = ref(true);
</script>

<template>
  <Story title="Switch/Demo" :layout="{ type: 'single', iframe: true }">
    <Variant title="default">
      <div class="flex items-center gap-2">
        <label class="pr-[15px] text-[15px] text-white leading-none" for="airplane-mode">Airplane mode</label>
        <SwitchRoot
          id="airplane-mode"
          v-model="switchState"
          class="relative h-[25px] w-[42px] flex cursor-default rounded-full bg-black/50 shadow-sm data-[state=checked]:bg-black focus-within:outline-black focus-within:outline"
        >
          <SwitchThumb
            class="my-auto block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
          />
        </SwitchRoot>
      </div>
    </Variant>
  </Story>
</template>
