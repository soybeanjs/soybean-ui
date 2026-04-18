<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div id="__DEMO_BACKTOP_DISABLED" class="relative h-64 overflow-auto rounded-md border bg-muted/20 p-4">
      <p class="text-sm text-muted-foreground">Disabled Backtop stays visible but does not trigger scrolling.</p>
      <div class="h-72" />
      <SBacktop target="#__DEMO_BACKTOP_DISABLED" :visibility-height="0" disabled class="absolute bottom-4 end-4" />
    </div>
  </div>
</template>
