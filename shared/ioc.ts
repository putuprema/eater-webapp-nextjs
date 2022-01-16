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
container.bind<TableStore>(Services.TableStore).to(TableStore);
container.bind<TableStoreQuery>(Services.TableStoreQuery).toDynamicValue((ctx) => {
    const tableStore = ctx.container.get<TableStore>(Services.TableStore);
    return new TableStoreQuery(tableStore);
})
container.bind<ITableService>(Services.TableService).to(TableService);

container.bind<MenuStore>(Services.MenuStore).to(MenuStore)
container.bind<MenuStoreQuery>(Services.MenuStoreQuery).toDynamicValue(ctx => {
    const menuStore = ctx.container.get<MenuStore>(Services.MenuStore)
    return new MenuStoreQuery(menuStore)
})
container.bind<IMenuService>(Services.MenuService).to(MenuService);

container.bind<CartStore>(Services.CartStore).to(CartStore)
container.bind<CartStoreQuery>(Services.CartStoreQuery).toDynamicValue(ctx => {
    const cartStore = ctx.container.get<CartStore>(Services.CartStore)
    return new CartStoreQuery(cartStore)
})
container.bind<ICartService>(Services.CartService).to(CartService);