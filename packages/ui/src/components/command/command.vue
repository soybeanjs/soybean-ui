<script setup lang="ts" generic="T extends AcceptableValue, S extends CommandItemOption<T>">
import { computed } from 'vue';
import { useCombinedPropsEmits, useForwardProps, useOmitEmitAsProps, usePickEmitAsProps } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import SCommandRoot from './command-root.vue';
import SCommandInputWrapper from './command-input-wrapper.vue';
import SCommandInput from './command-input.vue';
import SCommandInputIcon from './command-input-icon.vue';
import SCommandList from './command-list.vue';
import SCommandEmpty from './command-empty.vue';
import SCommandGroup from './command-group.vue';
import SCommandGroupHeading from './command-group-heading.vue';
import SCommandItem from './command-item.vue';
import SCommandSeparator from './command-separator.vue';
import SCommandShortcut from './command-shortcut.vue';
import { isCommandGroupOption } from './shared';
import type { CommandEmits, CommandItemOption, CommandProps } from './types';

defineOptions({
  name: 'SCommand'
});

const {
  items,
  inputWrapperClass,
  inputClass,
  inputProps,
  inputIconClass,
  emptyClass,
  listClass,
  listProps,
  groupClass,
  groupHeadingClass,
  itemClass,
  itemIconClass,
  separatorClass,
  shortcutClass,
  ...delegatedRootProps
} = defineProps<CommandProps<T, S>>();

const emit = defineEmits<CommandEmits<T>>();

const forwardedRootProps = useForwardProps(delegatedRootProps);
const forwardedRootEmits = usePickEmitAsProps<CommandEmits<T>>(emit, ['update:modelValue', 'highlight', 'update:open']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const forwardedListEmits = useOmitEmitAsProps<CommandEmits<T>>(emit, [
  'update:modelValue',
  'highlight',
  'update:open',
  'select'
]);
const forwardedList = useCombinedPropsEmits(
  computed(() => listProps || {}),
  forwardedListEmits
);
</script>

<template>
  <SCommandRoot v-bind="forwardedRoot">
    <SCommandInputWrapper :class="inputWrapperClass">
      <SCommandInputIcon :class="inputIconClass" />
      <SCommandInput :class="inputClass" v-bind="inputProps" />
    </SCommandInputWrapper>
    <SCommandList :class="listClass" v-bind="forwardedList">
      <SCommandEmpty :class="emptyClass">
        <slot v-if="emptyLabel">{{ emptyLabel }}</slot>
      </SCommandEmpty>
      <template v-for="(itemOrGroup, itemOrGroupIndex) in items" :key="itemOrGroupIndex">
        <template v-if="isCommandGroupOption(itemOrGroup)">
          <SCommandGroup :class="groupClass">
            <SCommandGroupHeading :class="groupHeadingClass">{{ itemOrGroup.label }}</SCommandGroupHeading>
            <template v-for="(item, index) in itemOrGroup.items" :key="index">
              <SCommandItem
                :class="itemClass"
                :value="item.value"
                :disabled="item.disabled"
                :text-value="item.textValue || item.label"
                @select="emit('select', item, $event)"
              >
                <slot :item="item">
                  <component :is="item.icon" v-if="item.icon" :class="itemIconClass" />
                  {{ item.label }}
                  <SCommandShortcut v-if="item.shortcut" :class="shortcutClass">{{ item.shortcut }}</SCommandShortcut>
                </slot>
              </SCommandItem>
              <SCommandSeparator v-if="item.separator" :class="separatorClass" />
            </template>
          </SCommandGroup>
          <SCommandSeparator v-if="itemOrGroup.separator" :class="separatorClass" />
        </template>
        <template v-else>
          <SCommandItem
            :class="itemClass"
            :value="itemOrGroup.value"
            :disabled="itemOrGroup.disabled"
            :text-value="itemOrGroup.textValue || itemOrGroup.label"
            @select="emit('select', itemOrGroup, $event)"
          >
            <slot :item="itemOrGroup">
              <component :is="itemOrGroup.icon" v-if="itemOrGroup.icon" :class="itemIconClass" />
              {{ itemOrGroup.label }}
              <SCommandShortcut v-if="itemOrGroup.shortcut" :class="shortcutClass">
                {{ itemOrGroup.shortcut }}
              </SCommandShortcut>
            </slot>
          </SCommandItem>
          <SCommandSeparator v-if="itemOrGroup.separator" :class="separatorClass" />
        </template>
      </template>
    </SCommandList>
  </SCommandRoot>
</template>
