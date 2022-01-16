import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";

export const RouteChangeIndicator = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const onRouteChangeStart = () => {
            setLoading(true)
        }

        const onRouteChangeComplete = () => {
            setLoading(false)
        }

        router.events.on('routeChangeStart', onRouteChangeStart)
        router.events.on('routeChangeComplete', onRouteChangeComplete)

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart)
            router.events.off('routeChangeComplete', onRouteChangeComplete)
        }
    }, [router])

    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}