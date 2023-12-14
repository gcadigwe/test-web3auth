import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const AppWrap = dynamic(() => import("../components/AppWrap") as any, {
  ssr: false,
}) as any;

export default function App({ Component, pageProps }: AppProps) {
  return <AppWrap Component={Component} pageProps={pageProps} />;
}
