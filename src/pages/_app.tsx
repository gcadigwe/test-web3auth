import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const AppWrap = dynamic(() => import("../components/AppWrap") as any, {
  ssr: false,
}) as any;
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { Navbar } from "@/components/Navbar";
import { Provider } from "react-redux";
import store from "@/state/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ToastContainer />
        <Navbar />
        <AppWrap Component={Component} pageProps={pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
