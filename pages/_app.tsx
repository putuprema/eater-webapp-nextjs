import 'reflect-metadata'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../shared/theme";
import {EmotionCache} from "@emotion/cache";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import Head from "next/head";
import {ServiceProvider} from "../shared/ioc.react";
import {container} from "../shared/ioc";
import {RouteChangeIndicator} from "../features/common/components/RouteChangeIndicator";
import {akitaDevtools} from "@datorama/akita";

akitaDevtools({name: 'Eater'})
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

export default function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}: MyAppProps) {
    return (
        <ServiceProvider container={container}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>Eater</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <RouteChangeIndicator/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </ServiceProvider>
    )
}
