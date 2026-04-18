import type { Product, CreateProductPayload, CreateStockMovementPayload, StockMovement } from '@/types'

// Simulated database
let products: Product[] = [
  { id: '1', name: 'MacBook Pro 14"', price: 12999.00, stock: 15, createdAt: new Date('2024-01-15') },
  { id: '2', name: 'iPhone 15 Pro', price: 7999.00, stock: 42, createdAt: new Date('2024-01-20') },
  { id: '3', name: 'AirPods Pro 2', price: 1899.00, stock: 8, createdAt: new Date('2024-02-01') },
  { id: '4', name: 'iPad Air', price: 5499.00, stock: 23, createdAt: new Date('2024-02-10') },
  { id: '5', name: 'Apple Watch Ultra', price: 6299.00, stock: 3, createdAt: new Date('2024-02-15') },
]

let stockMovements: StockMovement[] = []

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  async getProductsWithStock(): Promise<Product[]> {
    await delay(500)
    return [...products]
  },

  async createProduct(payload: CreateProductPayload): Promise<Product> {
    await delay(600)
    
    if (!payload.name || payload.name.trim() === '') {
      throw new Error('Nome do produto é obrigatório')
    }
    
    if (payload.price <= 0) {
      throw new Error('Preço deve ser maior que zero')
    }

    const newProduct: Product = {
      id: String(Date.now()),
      name: payload.name.trim(),
      price: payload.price,
      stock: 0,
      createdAt: new Date()
    }

    products = [...products, newProduct]
    return newProduct
  },

  async createStockMovement(payload: CreateStockMovementPayload): Promise<StockMovement> {
    await delay(400)

    const product = products.find(p => p.id === payload.productId)
    
    if (!product) {
      throw new Error('Produto não encontrado')
    }

    if (payload.quantity <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }

    if (payload.type === 'OUT' && product.stock < payload.quantity) {
      throw new Error(`Estoque insuficiente. Disponível: ${product.stock} unidades`)
    }

    const movement: StockMovement = {
      id: String(Date.now()),
      productId: payload.productId,
      type: payload.type,
      quantity: payload.quantity,
      createdAt: new Date()
    }

    // Update product stock
    products = products.map(p => {
      if (p.id === payload.productId) {
        return {
          ...p,
          stock: payload.type === 'IN' 
            ? p.stock + payload.quantity 
            : p.stock - payload.quantity
        }
      }
      return p
    })

    stockMovements = [...stockMovements, movement]
    return movement
  }
}
