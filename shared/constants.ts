export const EaterApi = {
    getTable: (tableId: string) => `/v1/table/${tableId}`,
    featuredProducts: '/v1/products/featured',
    productCategory: '/v1/category'
}

export const Services = {
    TableService: Symbol.for("TableService"),
    TableStore: Symbol.for("TableStore"),
    TableStoreQuery: Symbol.for("TableStoreQuery"),
    MenuService: Symbol.for("MenuService"),
    MenuStore: Symbol.for("MenuStore"),
    MenuStoreQuery: Symbol.for("MenuStoreQuery"),
    CartService: Symbol.for("CartService"),
    CartStore: Symbol.for("CartStore"),
    CartStoreQuery: Symbol.for("CartStoreQuery")
}