<template>
  <div class="flex flex-wrap items-center gap-3">
    <SToggle disabled>Unavailable</SToggle>
    <SToggle :model-value="true" disabled>Pressed</SToggle>
    <SToggle variant="outline" color="destructive" :model-value="true" disabled>Locked</SToggle>
  </div>
</template>
