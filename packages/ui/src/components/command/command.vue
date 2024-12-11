<script setup lang="ts">
import SCommandRoot from './command-root.vue';
import SCommandInput from './command-input.vue';
import SCommandList from './command-list.vue';
import SCommandEmpty from './command-empty.vue';
import SCommandGroup from './command-group.vue';
import SCommandItem from './command-item.vue';
import SCommandSeparator from './command-separator.vue';
import SCommandShortcut from './command-shortcut.vue';

defineOptions({
  name: 'SCommand'
});
</script>

<template>
  <SCommandRoot>
    <SCommandInput />
    <SCommandList>
      <SCommandEmpty />
      <SCommandGroup>
        <SCommandItem>
          <SCommandShortcut>
            <slot />
          </SCommandShortcut>
        </SCommandItem>
      </SCommandGroup>
      <SCommandSeparator />
    </SCommandList>
  </SCommandRoot>
</template>
