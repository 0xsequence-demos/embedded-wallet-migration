import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import WalletInformation from "../components/WalletInformation";
import { Recommendation } from "../components/Recommendations";
import { arbitrumSepolia, ethereum } from "thirdweb/chains";
import { Inventory } from "../components/Inventory";

export function Landing() {
  const account = useActiveAccount();
  return (
    <div className="main-box">
      <h1>Migration Page - ThirdWeb to Sequence</h1>
      <div>
        <ConnectButton client={client} chains={[ethereum, arbitrumSepolia]} />
      </div>
      {account && (
        <>
          <WalletInformation />
          <Inventory />
        </>
      )}
      <Recommendation account={account} />
    </div>
  );
}
