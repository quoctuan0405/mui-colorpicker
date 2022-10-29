import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/mui/createEmotionCache";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { useAppDispatch, useAppSelector } from "../src/redux/hooks";
import { selectThemeOption } from "../src/redux/reducer/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

const MUIWrapper: React.FC<MyAppProps> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;
  const themeOption = useAppSelector(selectThemeOption);

  const theme = React.useMemo<Theme>(
    () => createTheme(themeOption),
    [themeOption]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <MUIWrapper {...props}>
        <Component {...pageProps} />
      </MUIWrapper>
    </Provider>
  );
}
