export interface Product {
  id: string
  name: string
  price: number
  stock: number
  createdAt: Date
}

export interface StockMovement {
  id: string
  productId: string
  type: 'IN' | 'OUT'
  quantity: number
  createdAt: Date
}

export interface CreateProductPayload {
  name: string
  price: number
}

export interface CreateStockMovementPayload {
  productId: string
  type: 'IN' | 'OUT'
  quantity: number
}

export type SortDirection = 'asc' | 'desc'
export type SortField = 'name' | 'stock' | 'price'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}
