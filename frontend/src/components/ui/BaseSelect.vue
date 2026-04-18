<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue?: string
  options: Option[]
  label?: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="text-sm font-medium text-foreground">
      {{ label }}
    </label>
    <div class="relative">
      <select
        v-model="selectValue"
        class="flex h-10 w-full appearance-none rounded-lg border border-input bg-card px-3 py-2 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  </div>
</template>
