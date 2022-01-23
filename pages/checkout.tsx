import {ArrowBackIos} from "@mui/icons-material";
import {AppBar, Card, CardContent, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useObservableState} from "observable-hooks";
import {CartStoreQuery} from "../features/cart/cart.store";
import CartItem from "../features/cart/components/CartItem";
import {Services} from "../shared/constants";
import {useService} from "../shared/ioc.react";

const CheckoutPage: NextPage = () => {
    const router = useRouter()
    const cartStoreQuery = useService<CartStoreQuery>(Services.CartStoreQuery)
    const cartItems = useObservableState(cartStoreQuery.items$)

    return (
        <>
            <AppBar position="sticky" sx={{background: 'white'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" sx={{zIndex: 2, mr: 2}}
                                onClick={() => router.back()}>
                        <ArrowBackIos color={"primary"}/>
                    </IconButton>
                    <Typography color={"InfoText"} variant="h6" fontWeight="bold">Checkout</Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                {cartItems?.length ? (
                    <div>
                        <Card sx={{borderRadius: '10px'}} elevation={6}>
                            <CardContent className="grid gap-3">
                                <Typography variant="h6" fontWeight="bold">
                                    Your Items
                                </Typography>
                                <div className="grid gap-4 p-3">
                                    {cartItems.map((c, idx) => (
                                        <CartItem key={c.id} data={c} idx={idx} totalItems={cartItems.length}/>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
                        <Typography variant="body1">There are no items in cart!</Typography>
                    </div>
                )}
            </Container>
        </>
    )
}

export default CheckoutPage