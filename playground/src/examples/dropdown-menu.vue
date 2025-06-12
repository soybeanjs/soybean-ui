<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@headless/components/dropdown-menu';
import { menuVariants } from '../../../ui/variants/menu';
import { buttonVariants } from '../../../ui/variants/button';
import { popoverVariants } from '../../../ui/variants/popover';
import SectionWrapper from '../components/section-wrapper.vue';

const {
  content,
  item,
  subTrigger,
  subContent,
  subTriggerIcon,
  itemIcon,
  // itemLink,
  // itemLinkIcon,
  checkboxItem,
  itemIndicator,
  radioItem,
  separator,
  // group,
  label
  // shortcut
} = menuVariants();
const { arrow } = popoverVariants();

const checkboxValue = ref(['1', '2']);

const radioValue = ref('1');
</script>

<template>
  <SectionWrapper title="Dropdown">
    <DropdownMenuRoot trigger="hover">
      <DropdownMenuTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent :class="content()" side="right">
          <DropdownMenuLabel :class="label()">My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem :class="item()">
              <Icon icon="lucide:user" :class="itemIcon()" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <Icon icon="lucide:credit-card" :class="itemIcon()" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator :class="separator()" />
            <DropdownMenuItem :class="item()">
              <Icon icon="lucide:settings" :class="itemIcon()" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <Icon icon="lucide:keyboard" :class="itemIcon()" />
              <span>Keyboard shortcuts</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <Icon icon="lucide:users" :class="itemIcon()" />
              <span>Team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator :class="separator()" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger :class="subTrigger()">
              <Icon icon="lucide:user-plus" :class="itemIcon()" />
              <span>Invite Users</span>
              <Icon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuItem :class="item()">
                <Icon icon="lucide:mail" :class="itemIcon()" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <Icon icon="simple-icons:facebook" :class="itemIcon()" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <Icon icon="simple-icons:github" :class="itemIcon()" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <Icon icon="simple-icons:x" :class="itemIcon()" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <Icon icon="lucide:circle-plus" :class="itemIcon()" />
                <span>More</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuArrow :class="arrow()" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger :class="subTrigger()">
              <span>Checkbox</span>
              <Icon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuLabel :class="label()">Checkbox Group</DropdownMenuLabel>
              <DropdownMenuCheckboxGroup v-model="checkboxValue">
                <DropdownMenuCheckboxItem value="1" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:check" />
                  </DropdownMenuItemIndicator>
                  <span>Checkbox 1</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="2" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:check" />
                  </DropdownMenuItemIndicator>
                  <span>Checkbox 2</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="3" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:check" />
                  </DropdownMenuItemIndicator>
                  <span>Checkbox 3</span>
                </DropdownMenuCheckboxItem>
              </DropdownMenuCheckboxGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator :class="separator()" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger :class="subTrigger()">
              <span>Radio</span>
              <Icon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuLabel :class="label()">Radio Group</DropdownMenuLabel>
              <DropdownMenuRadioGroup v-model="radioValue">
                <DropdownMenuRadioItem value="1" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 1</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 2</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <Icon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 3</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </SectionWrapper>
</template>
