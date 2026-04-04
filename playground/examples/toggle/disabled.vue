<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle disabled>Disabled</SToggle>
      <SToggle :model-value="true" disabled>Pressed</SToggle>
    </div>
  </div>
</template>
