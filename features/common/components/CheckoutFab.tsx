import {useService} from "../../../shared/ioc.react";
import {CartStoreQuery} from "../../cart/cart.store";
import {useObservableState} from "observable-hooks";
import {Badge, duration, easing, Fab, Slide} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";

export const CheckoutFab = () => {
    const cartStoreQuery = useService<CartStoreQuery>(CartStoreQuery.name)
    const itemCount = useObservableState(cartStoreQuery.itemCount$, 0)
    const totalAmount = useObservableState(cartStoreQuery.totalAmount$, 0)

    return (
        <div className={"fixed bottom-0 right-0 py-7 px-4"}>
            <Slide
                direction={"left"}
                easing={{enter: easing.easeInOut, exit: easing.easeInOut}}
                timeout={{enter: 1000, exit: duration.leavingScreen}}
                in={itemCount > 0}
                mountOnEnter
                unmountOnExit
            >
                <Fab variant={"extended"} color={"primary"}>
                    <Badge badgeContent={itemCount} color={"secondary"} sx={{mr: 1.8}} showZero>
                        <ShoppingCart/>
                    </Badge>
                    Checkout (<strong>Rp {totalAmount.toLocaleString("id")}</strong>)
                </Fab>
            </Slide>
        </div>
    )
}