export interface ProductCategory {
    id: string
    name: string
    sortIndex?: number
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    category: ProductCategory
    enabled: boolean
}

export interface FeaturedProducts {
    category: ProductCategory
    products: Product[]
}