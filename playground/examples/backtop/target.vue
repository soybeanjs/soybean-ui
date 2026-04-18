<template>
  <div>
    <h3 class="playground-title">Target</h3>
    <div id="__DEMO_BACKTOP_TARGET" class="relative h-64 overflow-auto rounded-md border bg-muted/20 p-4">
      <p class="text-sm text-muted-foreground">Backtop can observe a selector target and render custom content.</p>
      <div class="h-88" />
      <SBacktop
        target="#__DEMO_BACKTOP_TARGET"
        :visibility-height="160"
        shape="auto"
        :fit-content="false"
        class="absolute bottom-4 end-4"
      >
        Top
      </SBacktop>
    </div>
  </div>
</template>
