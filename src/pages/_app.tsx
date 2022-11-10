import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<StoreProvider>
    <Component {...pageProps} />;
    </StoreProvider>);
};

export default trpc.withTRPC(MyApp);
