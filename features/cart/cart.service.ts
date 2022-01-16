import {Product} from "../menu/menu.model";
import {inject, injectable} from "inversify";
import {CartStore} from "./cart.store";
import {Services} from "../../shared/constants";

export default interface ICartService {
    addToCart(product: Product): void

    setQty(productId: string, qty: number): void

    removeFromCart(productId: string): void
}

@injectable()
export class CartService implements ICartService {
    @inject(Services.CartStore) private cartStore: CartStore = undefined!

    addToCart(product: Product): void {
        this.cartStore.add({...product, qty: 1});
    }

    setQty(productId: string, qty: number) {
        if (qty === 0) this.removeFromCart(productId)
        else this.cartStore.update(productId, {qty: qty});
    }

    removeFromCart(productId: string) {
        this.cartStore.remove(productId)
    }
}