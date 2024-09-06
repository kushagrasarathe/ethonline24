import { useConnectWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "./ui/button";

export default function ConnectWalletButton() {
  const { ready, wallets } = useWallets();
  const { connectWallet } = useConnectWallet();
  const { connectOrCreateWallet } = usePrivy();

  // Users must be `authenticated` in order to create an embedded wallet
  return (
    <>
      <Button onClick={connectWallet}>
        {wallets[0] ? (
          <span>
            {wallets[0].address.slice(0, 6)}...{wallets[0].address.slice(-6)}
            {ready}
          </span>
        ) : (
          "Connect Wallet"
        )}
      </Button>
      {/* <button onClick={connectOrCreateWallet}>Connect wallet</button>; */}
    </>
  );
}
