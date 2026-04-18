<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Package } from 'lucide-vue-next'
import { useProducts } from '@/composables/useProducts'
import { useToast } from '@/composables/useToast'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const { createProduct } = useProducts()
const { success, error } = useToast()

const isSubmitting = ref(false)

const form = reactive({
  name: '',
  price: ''
})

const errors = reactive({
  name: '',
  price: ''
})

const validateForm = () => {
  let isValid = true
  
  errors.name = ''
  errors.price = ''

  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  }

  const priceValue = parseFloat(form.price)
  if (!form.price || isNaN(priceValue) || priceValue <= 0) {
    errors.price = 'Preço deve ser maior que zero'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await createProduct({
      name: form.name.trim(),
      price: parseFloat(form.price)
    })
    
    success('Produto criado com sucesso!')
    router.push('/')
  } catch (err) {
    error(err instanceof Error ? err.message : 'Erro ao criar produto')
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-lg">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-foreground">Novo Produto</h1>
      <p class="mt-1 text-muted-foreground">Adicione um novo produto ao inventário</p>
    </div>

    <BaseCard>
      <div class="mb-6 flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Package class="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 class="font-semibold text-foreground">Informações do Produto</h2>
          <p class="text-sm text-muted-foreground">Preencha os dados abaixo</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput
          v-model="form.name"
          label="Nome do Produto"
          placeholder="Ex: iPhone 15 Pro"
          :error="errors.name"
        />

        <BaseInput
          v-model="form.price"
          type="number"
          label="Preço (R$)"
          placeholder="0.00"
          :error="errors.price"
          step="0.01"
          min="0"
        />

        <div class="flex gap-3 pt-4">
          <BaseButton
            type="button"
            variant="secondary"
            class="flex-1"
            @click="handleCancel"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            type="submit"
            class="flex-1"
            :loading="isSubmitting"
          >
            Criar Produto
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>
