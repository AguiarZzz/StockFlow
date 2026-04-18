import { ref, readonly } from 'vue'
import type { Toast } from '@/types'

const toasts = ref<Toast[]>([])

export function useToast() {
  const addToast = (type: Toast['type'], message: string) => {
    const id = String(Date.now())
    const toast: Toast = { id, type, message }
    toasts.value = [...toasts.value, toast]

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string) => addToast('success', message)
  const error = (message: string) => addToast('error', message)
  const info = (message: string) => addToast('info', message)

  return {
    toasts: readonly(toasts),
    success,
    error,
    info,
    removeToast
  }
}
