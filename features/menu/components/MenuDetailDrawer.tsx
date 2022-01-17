import React, {useEffect, useState} from "react";
import {Box, Button, SwipeableDrawer, Typography} from "@mui/material";
import {useObservableState} from "observable-hooks";
import {useService} from "../../../shared/ioc.react";
import {MenuStore, MenuStoreQuery} from "../menu.store";
import {Services} from "../../../shared/constants";
import {CartStoreQuery} from "../../cart/cart.store";
import {CartItemModel} from "../../cart/cart.model";
import {Subscription} from "rxjs";
import {Add, Remove} from "@mui/icons-material";
import ICartService from "../../cart/cart.service";

export const MenuDetailDrawer: React.FC = () => {
    const menuStore = useService<MenuStore>(Services.MenuStore)
    const menuStoreQuery = useService<MenuStoreQuery>(Services.MenuStoreQuery)
    const cartService = useService<ICartService>(Services.CartService)
    const cartStoreQuery = useService<CartStoreQuery>(Services.CartStoreQuery)
    const selectedMenu = useObservableState(menuStoreQuery.selectedMenu$)

    const [itemInCart, setItemInCart] = useState<CartItemModel>()
    const [open, setOpen] = useState(false)

    const onAddBtnClicked = () => {
        if (selectedMenu) cartService.addToCart(selectedMenu)
    }

    const onIncBtnClicked = () => {
        if (selectedMenu && itemInCart) cartService.setQty(selectedMenu.id, itemInCart.qty + 1)
    }

    const onDecBtnClicked = () => {
        if (selectedMenu && itemInCart) cartService.setQty(selectedMenu.id, itemInCart.qty - 1)
    }

    const onDrawerClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        let timeout: number | undefined = undefined
        if (!open) {
            timeout = window.setTimeout(() => menuStore.selectMenu(undefined), 500)
        }
        return () => {
            if (timeout !== undefined) window.clearTimeout(timeout)
        }
    }, [menuStore, open])

    useEffect(() => {
        let cartItemSubscription: Subscription | undefined;

        if (selectedMenu) {
            cartItemSubscription = cartStoreQuery
                .selectCartItem(selectedMenu.id)
                .subscribe(item => setItemInCart(item))

            setOpen(true)
        }

        return () => {
            cartItemSubscription?.unsubscribe()
        }
    }, [cartStoreQuery, selectedMenu])

    const ItemActionButton = () => {
        if (itemInCart) return (
            <div className={"flex justify-end"}>
                <div className={"flex items-center justify-between"} style={{maxWidth: '130px', width: '100%'}}>
                    <Button onClick={onDecBtnClicked} variant={"outlined"} color={"primary"}
                            sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Remove/></Button>
                    <Typography variant={"body1"} sx={{mx: 2}} fontWeight={"bolder"}>{itemInCart.qty}</Typography>
                    <Button onClick={onIncBtnClicked} variant={"outlined"} color={"primary"}
                            sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Add/></Button>
                </div>
            </div>
        )

        return (
            <Button variant={"contained"} onClick={onAddBtnClicked}>Add +</Button>
        )
    }

    return (
        <SwipeableDrawer
            PaperProps={{
                sx: {
                    borderTopLeftRadius: '14px',
                    borderTopRightRadius: '14px',
                    mx: 1
                }
            }}
            disableDiscovery
            anchor={"bottom"}
            open={open}
            onClose={onDrawerClose}
            onOpen={() => {
            }}
        >
            <div className={"flex items-center justify-center w-full mt-2"}>
                <div style={{width: '50px', height: '8px', borderRadius: '20px', background: 'grey'}}/>
            </div>
            {selectedMenu && (
                <Box p={3} display={"grid"} gap={"1.5rem"}>
                    <div style={{width: "100%", height: 200}} className={"flex items-center justify-center"}>
                        <img src={selectedMenu.imageUrl} alt={selectedMenu.name} style={{height: '100%'}}/>
                    </div>
                    <div className={"grid gap-5"}>
                        <div className={"grid gap-4"}>
                            <div>
                                <Typography variant={"h6"} fontWeight={"bold"}
                                            lineHeight={1.25}>{selectedMenu.name}</Typography>
                                <Typography variant={"body1"} lineHeight={1.25}>{selectedMenu.description}</Typography>
                            </div>
                            <Typography variant={"body2"}>Rp {selectedMenu.price.toLocaleString("id")}</Typography>
                        </div>
                        <ItemActionButton/>
                    </div>
                </Box>
            )}
        </SwipeableDrawer>
    )
}