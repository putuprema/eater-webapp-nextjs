import {EmotionCache} from "@emotion/cache";
import {AppProps} from "next/app";

export default interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}