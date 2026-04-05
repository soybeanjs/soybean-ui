<template>
  <div>
    <h3 class="playground-title">Shape</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle shape="rounded" :default-value="true">Rounded</SToggle>
      <SToggle shape="square" variant="outline" :default-value="true">Square</SToggle>
      <SToggle shape="pill" color="primary" variant="soft" :default-value="true">Pill</SToggle>
    </div>
  </div>
</template>
