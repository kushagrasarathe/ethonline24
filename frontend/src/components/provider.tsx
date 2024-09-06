"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";

import React from "react";
import store from "@/redux/store";

function Provider({ children }: React.PropsWithChildren<{}>) {
  const [client] = React.useState(new QueryClient());

  return (
    <PrivyProvider
      appId="cm0qn45mg00fvy2ogz5zf4j3m"
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          showWalletLoginFirst: false,
          logo: "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png",
        },
        loginMethods: ["wallet"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: true,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      <ReduxProvider store={store}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ReduxProvider>
    </PrivyProvider>
  );
}
export default Provider;
