<script setup lang="ts">
import { ref } from 'vue';
import { CheckboxGroupRoot, CheckboxIndicator, CheckboxRoot } from '../../../src/components/checkbox';
import SectionWrapper from '../components/section-wrapper.vue';

const singleCheckbox = ref(false);
const indeterminateCheckbox = ref<'indeterminate' | boolean>('indeterminate');
const disabledChecked = ref(true);
const disabledUnchecked = ref(false);

const checkboxGroupValue = ref(['apple', 'orange']);
const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];

function handleCheckboxChange(value: boolean | 'indeterminate') {
  console.log('Checkbox changed:', value);
}

function handleGroupChange(values: string[]) {
  console.log('Checkbox group changed:', values);
}
</script>

<template>
  <SectionWrapper title="Checkbox">
    <div class="space-y-8">
      <!-- Basic Checkbox -->
      <section>
        <h2 class="text-lg font-semibold mb-4">Basic Checkbox</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <CheckboxRoot
              id="checkbox-1"
              v-model="singleCheckbox"
              class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              @update:model-value="handleCheckboxChange"
            >
              <CheckboxIndicator class="text-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <label for="checkbox-1" class="text-sm font-medium text-gray-700 cursor-pointer">
              Accept terms and conditions
            </label>
          </div>
          <p class="text-sm text-gray-500">Value: {{ singleCheckbox }}</p>
        </div>
      </section>

      <!-- Indeterminate Checkbox -->
      <section>
        <h2 class="text-lg font-semibold mb-4">Indeterminate Checkbox</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <CheckboxRoot
              id="checkbox-indeterminate"
              v-model="indeterminateCheckbox"
              class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <CheckboxIndicator class="text-white">
                <svg
                  v-if="indeterminateCheckbox === 'indeterminate'"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 7.5H4v-1h7v1z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
                </svg>
                <svg v-else width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <label for="checkbox-indeterminate" class="text-sm font-medium text-gray-700 cursor-pointer">
              Indeterminate state checkbox
            </label>
          </div>
          <p class="text-sm text-gray-500">Value: {{ indeterminateCheckbox }}</p>
          <div class="flex space-x-2">
            <button
              class="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              @click="indeterminateCheckbox = 'indeterminate'"
            >
              Set Indeterminate
            </button>
            <button
              class="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              @click="indeterminateCheckbox = true"
            >
              Set Checked
            </button>
            <button
              class="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              @click="indeterminateCheckbox = false"
            >
              Set Unchecked
            </button>
          </div>
        </div>
      </section>

      <!-- Disabled Checkboxes -->
      <section>
        <h2 class="text-lg font-semibold mb-4">Disabled Checkboxes</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <CheckboxRoot
              id="checkbox-disabled-checked"
              v-model="disabledChecked"
              disabled
              class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckboxIndicator class="text-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <label for="checkbox-disabled-checked" class="text-sm font-medium text-gray-400 cursor-not-allowed">
              Disabled (checked)
            </label>
          </div>

          <div class="flex items-center space-x-3">
            <CheckboxRoot
              id="checkbox-disabled-unchecked"
              v-model="disabledUnchecked"
              disabled
              class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckboxIndicator class="text-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <label for="checkbox-disabled-unchecked" class="text-sm font-medium text-gray-400 cursor-not-allowed">
              Disabled (unchecked)
            </label>
          </div>
        </div>
      </section>

      <!-- Checkbox Group -->
      <section>
        <h2 class="text-lg font-semibold mb-4">Checkbox Group</h2>
        <div class="space-y-4">
          <CheckboxGroupRoot v-model="checkboxGroupValue" class="space-y-3" @update:model-value="handleGroupChange">
            <div v-for="fruit in fruits" :key="fruit.value" class="flex items-center space-x-3">
              <CheckboxRoot
                :id="`fruit-${fruit.value}`"
                :value="fruit.value"
                class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckboxIndicator class="text-white">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    />
                  </svg>
                </CheckboxIndicator>
              </CheckboxRoot>
              <label :for="`fruit-${fruit.value}`" class="text-sm font-medium text-gray-700 cursor-pointer">
                {{ fruit.label }}
              </label>
            </div>
          </CheckboxGroupRoot>
          <p class="text-sm text-gray-500">Selected fruits: {{ checkboxGroupValue.join(', ') || 'None' }}</p>
        </div>
      </section>

      <!-- Different Sizes -->
      <section>
        <h2 class="text-lg font-semibold mb-4">Different Sizes</h2>
        <div class="flex items-center space-x-6">
          <!-- Small -->
          <div class="flex items-center space-x-2">
            <CheckboxRoot
              class="flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <CheckboxIndicator class="text-white">
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <span class="text-xs text-gray-600">Small</span>
          </div>

          <!-- Medium -->
          <div class="flex items-center space-x-2">
            <CheckboxRoot
              class="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <CheckboxIndicator class="text-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <span class="text-sm text-gray-600">Medium</span>
          </div>

          <!-- Large -->
          <div class="flex items-center space-x-2">
            <CheckboxRoot
              class="flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <CheckboxIndicator class="text-white">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m11.4669 3.72684.00049 1.24696L5.82716 11.0945l-.25145.25145-.25149-.25149L2.83178 8.60078l.25146-.25146.25136.25137L5.4669 10.7333 11.217 3.83037z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  />
                </svg>
              </CheckboxIndicator>
            </CheckboxRoot>
            <span class="text-base text-gray-600">Large</span>
          </div>
        </div>
      </section>
    </div>
  </SectionWrapper>
</template>
