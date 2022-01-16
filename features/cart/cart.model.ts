import {Product} from "../menu/menu.model";

export type CartItemModel = Product & {
    qty: number
}