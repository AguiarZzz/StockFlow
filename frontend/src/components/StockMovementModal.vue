<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Product } from '@/types'

const props = defineProps<{
  open: boolean
  product: Product | null
}>()

const emit = defineEmits(['close', 'submit'])

const movementType = ref<'IN' | 'OUT'>('IN')
const quantity = ref<number>(1)
const isSubmitting = ref(false)
const error = ref('')

const typeOptions = [
  { value: 'IN', label: 'Entrada (IN)' },
  { value: 'OUT', label: 'Saída (OUT)' }
]

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    movementType.value = 'IN'
    quantity.value = 1
    error.value = ''
  }
})

const handleSubmit = async () => {
  if (!props.product) return

  error.value = ''

  if (quantity.value <= 0) {
    error.value = 'Quantidade deve ser maior que zero'
    return
  }

  if (movementType.value === 'OUT' && quantity.value > props.product.stock) {
    error.value = `Estoque insuficiente. Disponível: ${props.product.stock} unidades`
    return
  }

  isSubmitting.value = true

  try {
    await emit('submit', {
      productId: props.product.id,
      type: movementType.value,
      quantity: quantity.value
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseModal :open="open" title="Movimentação de Estoque" @close="emit('close')">
    <div v-if="product" class="space-y-4">
      <!-- Product Info -->
      <div class="rounded-lg bg-secondary p-3">
        <p class="text-sm text-muted-foreground">Produto</p>
        <p class="font-medium text-foreground">{{ product.name }}</p>
        <p class="mt-1 text-sm text-muted-foreground">
          Estoque atual: <span class="font-medium text-foreground">{{ product.stock }}</span> unidades
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseSelect
          v-model="movementType"
          :options="typeOptions"
          label="Tipo de Movimentação"
        />

        <BaseInput
          v-model="quantity"
          type="number"
          label="Quantidade"
          :error="error"
          :min="1"
        />

        <div class="flex gap-3 pt-2">
          <BaseButton
            type="button"
            variant="secondary"
            class="flex-1"
            @click="emit('close')"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            type="submit"
            class="flex-1"
            :loading="isSubmitting"
          >
            Confirmar
          </BaseButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>
