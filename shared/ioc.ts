import {Container} from "inversify";
import {Services} from "./constants";
import {TableStore, TableStoreQuery} from "../features/table/table.store";
import ITableService, {TableService} from "../features/table/table.service";
import IMenuService, {MenuService} from "../features/menu/menu.service";
import {MenuStore, MenuStoreQuery} from "../features/menu/menu.store";
import {CartStore, CartStoreQuery} from "../features/cart/cart.store";
import ICartService, {CartService} from "../features/cart/cart.service";

// Dependency Injection container
export const container = new Container({skipBaseClassChecks: true, defaultScope: 'Singleton'});

// Register services
container.bind<TableStore>(TableStore.name).to(TableStore);
container.bind<TableStoreQuery>(TableStoreQuery.name).toDynamicValue((ctx) => {
    const tableStore = ctx.container.get<TableStore>(TableStore.name);
    return new TableStoreQuery(tableStore);
})
container.bind<ITableService>(Services.Table).to(TableService);

container.bind<MenuStore>(MenuStore.name).to(MenuStore)
container.bind<MenuStoreQuery>(MenuStoreQuery.name).toDynamicValue(ctx => {
    const menuStore = ctx.container.get<MenuStore>(MenuStore.name)
    return new MenuStoreQuery(menuStore)
})
container.bind<IMenuService>(Services.Menu).to(MenuService);

container.bind<CartStore>(CartStore.name).to(CartStore)
container.bind<CartStoreQuery>(CartStoreQuery.name).toDynamicValue(ctx => {
    const cartStore = ctx.container.get<CartStore>(CartStore.name)
    return new CartStoreQuery(cartStore)
})
container.bind<ICartService>(Services.Cart).to(CartService);