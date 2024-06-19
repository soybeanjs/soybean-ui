<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/components/ui/select';
import { Label } from '@ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/components/ui/radio-group';
import type { FieldProps } from './interface';
import { beautifyObjectName } from './utils';
import AutoFormLabel from './AutoFormLabel.vue';

defineProps<
  FieldProps & {
    options?: string[];
  }
>();
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <RadioGroup
            v-if="config?.component === 'radio'"
            :disabled="disabled"
            orientation="vertical"
            v-bind="{ ...slotProps.componentField }"
          >
            <div v-for="(option, index) in options" :key="option" class="mb-2 flex items-center gap-3 space-y-0">
              <RadioGroupItem :id="`${option}-${index}`" :value="option" />
              <Label :for="`${option}-${index}`">{{ beautifyObjectName(option) }}</Label>
            </div>
          </RadioGroup>

          <Select v-else :disabled="disabled" v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in options" :key="option" :value="option">
                {{ beautifyObjectName(option) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
