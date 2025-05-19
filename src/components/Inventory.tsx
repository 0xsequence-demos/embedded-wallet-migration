import { useEffect, useState } from "react";
import { Insight } from "thirdweb";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { client } from "../client";
import { NftDetails } from "./NftDetails";

export function Inventory() {
  const account = useActiveAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const chain = useActiveWalletChain();

  useEffect(() => {
    if (!chain || !account?.address) return;
    Insight.getOwnedNFTs({
      client,
      chains: [chain],
      ownerAddress: account.address,
    }).then((nftsResult) => {
      if (!nftsResult) return;
      setNfts(nftsResult);
    });
  }, [chain]);

  return (
    <div>
      <h2 className="title">Inventory</h2>
      <div className="inventory-nfts-box">
        {nfts?.map((nft) => (
          <NftDetails nft={nft} key={nft?.tokenAddress + nft?.id} />
        ))}
        {nfts?.length === 0 && (
          <div className="flex justify-center">
            <p>Nothing to Show</p>
          </div>
        )}
      </div>
    </div>
  );
}
