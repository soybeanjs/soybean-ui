<template>
  <div>
    <h3 class="playground-title">Shape</h3>
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex-c-center">
        <SToggle shape="auto" variant="outline" :default-value="true">Outline</SToggle>
        <span>Auto</span>
      </div>
      <div class="flex-c-center">
        <SToggle shape="rounded" variant="outline" :default-value="true">Outline</SToggle>
        <span>Rounded</span>
      </div>
      <div class="flex-c-center">
        <SToggle shape="square" variant="outline" :default-value="true" />
        <span>Square</span>
      </div>
      <div class="flex-c-center">
        <SToggle shape="circle" variant="outline" :default-value="true" />
        <span>Circle</span>
      </div>
    </div>
  </div>
</template>
