export const EaterApi = {
    getTable: (tableId: string) => `/v1/table/${tableId}`,
    featuredProducts: '/v1/products/featured',
    productCategory: '/v1/category'
}

export const Services = {
    Table: Symbol.for("TableService"),
    Menu: Symbol.for("MenuService"),
    Cart: Symbol.for("CartService")
}