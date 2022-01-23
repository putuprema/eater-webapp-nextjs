import {Add, Remove} from "@mui/icons-material";
import {Button, Divider, Typography} from "@mui/material";
import Image from "next/image";
import React, {FC} from "react";
import {Services} from "../../../shared/constants";
import {useService} from "../../../shared/ioc.react";
import {CartItemModel} from "../cart.model";
import ICartService from "../cart.service";

interface CartItemProps {
    data: CartItemModel;
    idx: number;
    totalItems: number;
}

const CartItem: FC<CartItemProps> = ({data, idx, totalItems}) => {
    const cartService = useService<ICartService>(Services.CartService);

    const onIncBtnClicked = (ev: React.MouseEvent) => {
        cartService.setQty(data.id, data.qty + 1)
    }

    const onDecBtnClicked = (ev: React.MouseEvent) => {
        cartService.setQty(data.id, data.qty - 1)
    }

    return (
        <div>
            <div className="flex items-center mb-2">
                <Image src={data.imageUrl} height={80} width={80} alt={data.name}/>
                <div className="grow ml-4">
                    <Typography variant={"body1"} fontWeight={"bold"} lineHeight={1.25} noWrap>{data.name}</Typography>
                    <Typography variant={"body2"}>{`@ Rp ${data.price.toLocaleString("id")}`}</Typography>
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Typography variant={"body1"}
                            fontWeight={600}>{`Rp ${(data.price * data.qty).toLocaleString("id")}`}</Typography>
                <div className={"flex items-center justify-between"} style={{minWidth: '120px'}}>
                    <Button onClick={onDecBtnClicked} variant={"outlined"} color={"primary"}
                            sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Remove/></Button>
                    <Typography variant={"body1"} sx={{mx: 2}} fontWeight={"bolder"}>{data.qty}</Typography>
                    <Button onClick={onIncBtnClicked} variant={"outlined"} color={"primary"}
                            sx={{minWidth: 'auto', width: '32px', height: '32px', p: 0}}><Add/></Button>
                </div>
            </div>
            {(idx < totalItems - 1) && (
                <Divider/>
            )}
        </div>
    )
}

export default CartItem