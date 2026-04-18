<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <div id="__DEMO_BACKTOP_CUSTOM" class="relative h-64 overflow-auto rounded-md border bg-muted/20 p-4">
      <p class="text-sm text-muted-foreground">Use button style props, slot content, and custom positioning classes.</p>
      <div class="h-96" />
      <SBacktop
        target="#__DEMO_BACKTOP_CUSTOM"
        :visibility-height="140"
        color="secondary"
        variant="pure"
        shape="rounded"
        shadow="md"
        :fit-content="false"
        class="absolute bottom-6 end-6 gap-2 ps-3 pe-4"
      >
        Back to top
      </SBacktop>
    </div>
  </div>
</template>
