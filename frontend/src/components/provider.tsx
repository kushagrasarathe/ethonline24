"use client";
import "@rainbow-me/rainbowkit/styles.css";

// import { PrivyProvider } from "@privy-io/react-auth";
// import { createConfig, WagmiProvider } from "@privy-io/wagmi";

// import type { PrivyClientConfig } from "@privy-io/react-auth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { holesky, mainnet } from "viem/chains";
import { http, WagmiProvider } from "wagmi";

import React from "react";
import store from "@/redux/store";

const client = new QueryClient();

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const wagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [holesky],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// const wagmiConfig = createConfig({
//   chains: [holesky], // mainnet commented out for now
//   transports: {
//     // [mainnet.id]: http(),
//     [holesky.id]: http(),
//   },
// });

// const privyConfig: PrivyClientConfig = {
//   appearance: {
//     accentColor: "#6A6FF5",
//     theme: "#FFFFFF",
//     showWalletLoginFirst: true,
//     logo: "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png",
//   },
//   loginMethods: ["wallet"],
//   fundingMethodConfig: {
//     moonpay: {
//       useSandbox: true,
//     },
//   },
//   embeddedWallets: {
//     createOnLogin: "users-without-wallets",
//     requireUserPasswordOnCreate: true,
//     noPromptOnSignature: false,
//   },
// };

function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    // <PrivyProvider appId="cm0qn45mg00fvy2ogz5zf4j3m" config={privyConfig}>
    <ReduxProvider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
    // </PrivyProvider>
  );
}
export default Provider;
