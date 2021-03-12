import App, { AppInitialProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import createStore from "../createStore";
import { WithSagaTaskStore } from "../interfaces";
import GlobalStyles from "../styles/global-styles";
import { ThemeProvider } from "../styles/themed-components";
import theme from "../styles/themes";
interface MyAppProps {
  store: WithSagaTaskStore;
}

class MyApp extends App<MyAppProps, {}> {
  static async getInitialProps({
                                 Component,
                                 ctx,
                                  }: any): Promise<AppInitialProps> {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render(): JSX.Element {
    const { props } = this;
    const { Component, pageProps, store } = props;

    // const viewFlag = loading && props.store.getState().getMe.userData !== null;

    return (
        <Provider store={store}>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
