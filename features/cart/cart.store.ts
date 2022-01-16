import {EntityState, EntityStore, QueryEntity, StoreConfig} from "@datorama/akita";
import {injectable} from "inversify";
import {CartItemModel} from "./cart.model";
import {map} from "rxjs/operators";

export interface CartState extends EntityState<CartItemModel, string> {
}

@StoreConfig({name: 'cart'})
@injectable()
export class CartStore extends EntityStore<CartState> {
    constructor() {
        super();
    }
}

@injectable()
export class CartStoreQuery extends QueryEntity<CartState> {
    items$ = this.selectAll()
    itemCount$ = this.selectAll().pipe(
        map(items => items.map(i => i.qty)),
        map(quantities => quantities.reduce((totalQty, qty) => totalQty + qty, 0))
    )
    totalAmount$ = this.selectAll().pipe(
        map(items => items.map(i => i.qty * i.price)),
        map(amounts => amounts.reduce((amountSum, amount) => amountSum + amount, 0))
    )

    constructor(protected readonly store: CartStore) {
        super(store);
    }

    selectCartItem(productId: string) {
        return this.selectEntity(productId);
    }
}