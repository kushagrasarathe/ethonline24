import { useConnectWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWalletButton() {
  // const {
  //   ready,
  //   user,
  //   authenticated,
  //   login,
  //   connectWallet,
  //   logout,
  //   linkWallet,
  // } = usePrivy();
  // const { wallets, ready: walletsReady } = useWallets();

  // const { isConnected, address } = useAccount();

  // Users must be `authenticated` in order to create an embedded wallet
  return (
    // <>
    //   {isConnected && address && (
    //     <>
    //       {address.slice(0, 6)}...
    //       {address.slice(-6)}
    //     </>
    //   )}
    //   {ready && !authenticated ? (
    //     <Button onClick={login}>Connect Wallet</Button>
    //   ) : (
    //     <Button onClick={logout}>
    //       Logout
    //       {/* Might wanna add logout or disconnect here  */}
    //     </Button>
    //   )}
    // </>
    <ConnectButton />
  );
}
