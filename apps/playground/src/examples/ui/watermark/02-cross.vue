<template>
  <div class="relative h-72 overflow-hidden rounded-md border bg-muted/20">
    <SWatermark content="INTERNAL USE" cross :rotate="-30" :gap="[120, 80]" class="h-full">
      <div class="flex items-center justify-center h-full">
        <p class="text-sm text-muted-foreground">
          Cross pattern creates a denser watermark with two overlapping diagonal layers.
        </p>
      </div>
    </SWatermark>
  </div>
</template>
