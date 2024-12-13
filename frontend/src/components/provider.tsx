"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { holesky } from "viem/chains";
import { WagmiProvider } from "wagmi";

import store from "@/redux/store";
import React from "react";

const client = new QueryClient();

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const wagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [holesky],
  ssr: true,
});

function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    <ReduxProvider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
}
export default Provider;
