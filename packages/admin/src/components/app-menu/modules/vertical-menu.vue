<script setup lang="ts">
import { computed } from 'vue';
import { STreeMenu } from '@soybeanjs/ui';
import { toTreeMenuOptions } from '../shared';
import { SIDER_COLLAPSED_WIDTH } from '../../app-layout/shared';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppVerticalMenu'
});

const props = withDefaults(defineProps<AppMenuModeProps>(), {
  collapsedWidth: SIDER_COLLAPSED_WIDTH
});

const emit = defineEmits<AppMenuModeEmits>();

const options = computed(() => toTreeMenuOptions(props.data));

function handleSelect(value: string | undefined) {
  if (!value) {
    return;
  }
  emit('select', value);
  emit('update:selectedKey', value);
}
</script>

<template>
  <Teleport defer :to="siderMenuEl ? `#${siderMenuEl}` : undefined" :disabled="!siderMenuEl">
    <STreeMenu
      :model-value="selectedKey"
      :default-value="defaultSelectedKey"
      :expanded="expanded"
      :default-expanded="defaultExpanded"
      :collapsed="siderCollapse"
      :collapsed-width="collapsedWidth"
      :items="options"
      :class="rootClass"
      @update:model-value="handleSelect"
      @update:expanded="emit('update:expanded', $event)"
    >
      <template v-if="$slots.top" #top>
        <slot name="top" />
      </template>
      <template v-if="$slots.bottom" #bottom>
        <slot name="bottom" />
      </template>
    </STreeMenu>
  </Teleport>
</template>
