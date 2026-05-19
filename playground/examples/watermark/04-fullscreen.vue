<template>
  <div class="relative h-72 overflow-auto rounded-md border bg-muted/20">
    <SWatermark content="FULLSCREEN" fullscreen :font-size="20" :gap="[160, 140]">
      <div class="p-4">
        <p class="text-sm text-muted-foreground">
          Fullscreen mode positions the watermark overlay fixed to the viewport, so it remains visible even when content
          scrolls.
        </p>
        <div class="mt-2 space-y-2">
          <div v-for="i in 8" :key="i" class="rounded-md border bg-background px-3 py-2 text-sm">
            Scrollable content row {{ i }}
          </div>
        </div>
      </div>
    </SWatermark>
  </div>
</template>
