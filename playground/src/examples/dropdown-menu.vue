<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SIcon } from '@ui';
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
} from '@headless';
import { menuVariants } from '@variants/menu';
import { popoverVariants } from '@variants/popover';

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
  <SCard title="Dropdown">
    <DropdownMenuRoot trigger="hover">
      <DropdownMenuTrigger as-child>
        <SButton variant="pure" class="w-20">Open</SButton>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent :class="content()" side="right">
          <DropdownMenuLabel :class="label()">My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem :class="item()">
              <SIcon icon="lucide:user" :class="itemIcon()" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <SIcon icon="lucide:credit-card" :class="itemIcon()" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator :class="separator()" />
            <DropdownMenuItem :class="item()">
              <SIcon icon="lucide:settings" :class="itemIcon()" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <SIcon icon="lucide:keyboard" :class="itemIcon()" />
              <span>Keyboard shortcuts</span>
            </DropdownMenuItem>
            <DropdownMenuItem :class="item()">
              <SIcon icon="lucide:users" :class="itemIcon()" />
              <span>Team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator :class="separator()" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger :class="subTrigger()">
              <SIcon icon="lucide:user-plus" :class="itemIcon()" />
              <span>Invite Users</span>
              <SIcon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuItem :class="item()">
                <SIcon icon="lucide:mail" :class="itemIcon()" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <SIcon icon="simple-icons:facebook" :class="itemIcon()" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <SIcon icon="simple-icons:github" :class="itemIcon()" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <SIcon icon="simple-icons:x" :class="itemIcon()" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem :class="item()">
                <SIcon icon="lucide:circle-plus" :class="itemIcon()" />
                <span>More</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuArrow :class="arrow()" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger :class="subTrigger()">
              <span>Checkbox</span>
              <SIcon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuLabel :class="label()">Checkbox Group</DropdownMenuLabel>
              <DropdownMenuCheckboxGroup v-model="checkboxValue">
                <DropdownMenuCheckboxItem value="1" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:check" />
                  </DropdownMenuItemIndicator>
                  <span>Checkbox 1</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="2" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:check" />
                  </DropdownMenuItemIndicator>
                  <span>Checkbox 2</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="3" :class="checkboxItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:check" />
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
              <SIcon icon="lucide:chevron-right" :class="subTriggerIcon()" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent :class="subContent()">
              <DropdownMenuLabel :class="label()">Radio Group</DropdownMenuLabel>
              <DropdownMenuRadioGroup v-model="radioValue">
                <DropdownMenuRadioItem value="1" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 1</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 2</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3" :class="radioItem()">
                  <DropdownMenuItemIndicator :class="itemIndicator()">
                    <SIcon icon="lucide:circle-small" />
                  </DropdownMenuItemIndicator>
                  <span>Radio 3</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </SCard>
</template>
