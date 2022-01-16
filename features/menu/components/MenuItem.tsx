import React from 'react'
import {Product} from "../menu.model";
import {Button, Card, CardContent, Skeleton, Typography} from "@mui/material";
import Image from 'next/image'
import {useService} from "../../../shared/ioc.react";
import ICartService from '../../cart/cart.service'
import {Services} from "../../../shared/constants";
import {CartStoreQuery} from "../../cart/cart.store";
import {useObservableState} from "observable-hooks";
import {Add, Remove} from "@mui/icons-material";

interface MenuItemProps {
    data?: Product
}

export const MenuItem: React.FC<MenuItemProps> = ({data}) => {
    const cartService = useService<ICartService>(Services.Cart);
    const cartStoreQuery = useService<CartStoreQuery>(CartStoreQuery.name)
    const itemInCart = useObservableState(cartStoreQuery.selectCartItem(data?.id || "XXX"))

    const onAddBtnClicked = () => {
        if (data) cartService.addToCart(data)
    }

    const onIncBtnClicked = () => {
        if (data && itemInCart) cartService.setQty(data.id, itemInCart.qty + 1)
    }

    const onDecBtnClicked = () => {
        if (data && itemInCart) cartService.setQty(data.id, itemInCart.qty - 1)
    }

    const ItemActionButton = () => {
        if (itemInCart) return (
            <div className={"flex items-center justify-between"}>
                <Button onClick={onDecBtnClicked} variant={"outlined"} color={"primary"}
                        sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Remove/></Button>
                <Typography variant={"body1"} sx={{mx: 2}} fontWeight={"bolder"}>{itemInCart.qty}</Typography>
                <Button onClick={onIncBtnClicked} variant={"outlined"} color={"primary"}
                        sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Add/></Button>
            </div>
        )

        return (
            <Button variant={"contained"} onClick={onAddBtnClicked}>Add +</Button>
        )
    }

    return (
        <Card sx={{maxWidth: '200px', borderRadius: '10px'}} elevation={6}>
            <CardContent className={"grid gap-3"}>
                <div style={{width: '100%', height: 100}} className={"flex items-center justify-center"}>
                    {data ? (
                        <Image src={data.imageUrl} height={"100%"} width={"100%"} alt={data.name}/>
                    ) : (
                        <Skeleton width={"100%"} height={100} sx={{transform: 'none'}} animation={"wave"}/>
                    )}
                </div>
                <div className={"grid gap-4"}>
                    <div className={"grid gap-1"}>
                        <Typography variant={"body1"} fontWeight={"bold"} lineHeight={1.25} noWrap>{data ? data.name :
                            <Skeleton animation={"wave"}/>}</Typography>
                        <Typography variant={"body2"}>{data ? `Rp ${data.price.toLocaleString("id")}` :
                            <Skeleton animation={"wave"} width={"70%"}/>}</Typography>
                    </div>
                    {data ? <ItemActionButton/> :
                        <Skeleton animation={"wave"} width={"100%"}><ItemActionButton/></Skeleton>}
                </div>
            </CardContent>
        </Card>
    )
}