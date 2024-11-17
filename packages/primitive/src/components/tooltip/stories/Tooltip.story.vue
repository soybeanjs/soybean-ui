<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from '..';

const toggleState = ref(false);
const disableTooltip = ref(false);
</script>

<template>
  <Story title="Tooltip/Default" :layout="{ type: 'single', iframe: true }">
    <Variant title="default">
      <div class="py-20">
        <TooltipProvider :disabled="disableTooltip">
          <TooltipRoot v-model:open="toggleState">
            <TooltipTrigger
              class="shadow-blackA7 text-violet11 h-[35px] w-[35px] inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon icon="radix-icons:plus" />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                :side-offset="5"
                class="text-violet11 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              >
                Add to library
                <TooltipArrow class="fill-white" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      </div>
    </Variant>
    <Variant title="closeAnimation">
      <div class="py-20">
        <TooltipProvider :disabled="disableTooltip">
          <TooltipRoot v-model:open="toggleState">
            <TooltipTrigger
              class="text-violet11 shadow-blackA7 h-[35px] w-[35px] inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon icon="radix-icons:plus" />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                :side-offset="5"
                class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 will-change-[transform,opacity] data-[state=closed]:animate-fadeOut select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              >
                Add to library
                <TooltipArrow class="fill-white" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      </div>
    </Variant>
  </Story>
</template>
