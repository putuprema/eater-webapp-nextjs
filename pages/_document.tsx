import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document"
import createEmotionCache from "../utils/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import {AppContextType, AppInitialProps, AppPropsType, NextComponentType} from "next/dist/shared/lib/utils";
import MyAppProps from "../shared/models/MyAppProps";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;

        // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
        // However, be aware that it can have global side effects.
        const cache = createEmotionCache();
        const {extractCriticalToChunks} = createEmotionServer(cache);

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App: NextComponentType<AppContextType, AppInitialProps, AppPropsType | MyAppProps>) => {
                return function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />
                }
            }
        })

        const initialProps = await Document.getInitialProps(ctx);

        // This is important. It prevents emotion to render invalid HTML.
        // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                key={style.key}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{__html: style.css}}
            />
        ));

        return {
            ...initialProps,
            emotionStyleTags,
        };
    }

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Nunito:300,400,500,700,800,900&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <link rel="icon" type="image/svg+xml"
                          href="/eater-logo-small.svg"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}