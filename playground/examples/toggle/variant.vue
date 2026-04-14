<template>
  <div>
    <h3 class="playground-title">Variants</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle variant="soft" color="primary" :default-value="true">Soft</SToggle>
      <SToggle variant="outline" color="warning" :default-value="true">Outline</SToggle>
      <SToggle variant="ghost" color="success" :default-value="true">Ghost</SToggle>
    </div>
  </div>
</template>
