<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SEditable
      default-value="Custom editable surface"
      :ui="{
        area: 'border-primary/40 bg-primary/5',
        preview: 'font-medium text-primary',
        input: 'font-medium text-primary',
        controls: 'gap-0.5',
        editTrigger: 'text-primary',
        submitTrigger: 'text-success',
        cancelTrigger: 'text-destructive'
      }"
    />
  </div>
</template>
