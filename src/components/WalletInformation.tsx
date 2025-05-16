import { useActiveAccount, useWalletBalance, useActiveWalletChain } from "thirdweb/react";
import { client } from "../client";

export default function WalletInformation() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { data: balance } = useWalletBalance({
    client,
    chain,
    address: account!.address,
  });

  return (
    <div>
      <p>
        <strong>Wallet address: {account!.address}</strong>
      </p>
      <p>
        <strong>
          Wallet balance: {balance?.displayValue} {balance?.symbol}
        </strong>
      </p>
    </div>
  );
}
