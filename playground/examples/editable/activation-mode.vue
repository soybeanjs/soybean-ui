<template>
  <div>
    <h3 class="playground-title">Activation Mode</h3>
    <div class="flex-c gap-3 w-100 lt-md:w-auto">
      <SEditable default-value="Focus me to edit" />
      <SEditable activation-mode="dblclick" default-value="Double click me to edit" />
    </div>
  </div>
</template>
