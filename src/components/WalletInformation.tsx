import {
  useActiveAccount,
  useWalletBalance,
  useActiveWalletChain,
} from "thirdweb/react";
import { client } from "../client";

export default function WalletInformation() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { data: balance } = useWalletBalance({
    client,
    chain,
    address: account?.address,
  });

  return (
    <div className="wallet-info-container">
      <table className="wallet-info-table">
        <tbody>
          <tr className="wallet-info-row">
            <td className="wallet-info-label">Wallet Address</td>
            <td className="wallet-info-value">{account?.address}</td>
          </tr>
          <tr className="wallet-info-row">
            <td className="wallet-info-label">Active Chain</td>
            <td className="wallet-info-value">{chain?.name}</td>
          </tr>
          <tr className="wallet-info-row">
            <td className="wallet-info-label">Wallet Balance</td>
            <td className="wallet-info-value">
              {balance?.displayValue} {balance?.symbol}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
