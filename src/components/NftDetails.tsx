import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "../client";

export function NftDetails({ nft }: { nft: any }) {
  const account = useActiveAccount();
  const [openedTransferModal, setOpenedTransferModal] =
    useState<boolean>(false);
  const [transferDestination, setTransferDestination] = useState<string>("");
  const {
    mutate: sendTransaction,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useSendTransaction();
  const chain = useActiveWalletChain();
  let { tokenAddress, id } = nft;
  let { image, name, quantityOwned } = nft?.metadata;
  const quantityOwnedString = quantityOwned?.toString() || "1";

  function handleOnCloseTransferModal() {
    setOpenedTransferModal(false);
    setTransferDestination("");
  }

  function handleOnOpenTransferModal() {
    reset();
    setOpenedTransferModal(true);
    setTransferDestination("");
  }

  function onChangeTransferDestination(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setTransferDestination(event.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chain || !transferDestination || !account?.address) return;

    const contract = getContract({
      client,
      chain,
      address: tokenAddress,
    });

    const transaction = prepareContractCall({
      contract,
      method:
        "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
      params: [
        account.address,
        transferDestination,
        BigInt(id),
        BigInt(1),
        "0x",
      ],
      value: BigInt(0),
    });

    sendTransaction(transaction);
  }

  return (
    <>
      <div className="inventory-nft-box" key={tokenAddress + id}>
        <img
          className="inventory-nft-image"
          src={image || undefined}
          alt={name || ""}
        />
        <p className="inventory-nft-name">{name || ""}</p>
        <button onClick={handleOnOpenTransferModal}>Transfer</button>
      </div>

      {/* Transfer Modal */}
      {openedTransferModal && (
        <div className="inventory-nft-transfer-box">
          <form onSubmit={handleSubmit}>
            <h2>Transfer NFT modal</h2>
            <img
              className="inventory-nft-image"
              src={image || undefined}
              alt={name || ""}
            />
            <div className="inventory-nft-transfer-metadata">
              <p className="inventory-nft-name">{name || ""}</p>
              <p>Owned: {quantityOwnedString}</p>
            </div>
            {!isSuccess && (
              <>
                <label className="inventory-nft-transfer-label">
                  <span>Destination Address</span>
                  <input type="text" onChange={onChangeTransferDestination} />
                </label>
                <button type="submit">
                  {!isPending ? (
                    "Transfer now"
                  ) : (
                    <div className="spinner margin-auto"></div>
                  )}
                </button>
              </>
            )}
            {isSuccess && <p>Transfer completed successfully!</p>}
            {isError && <p>{error.message}</p>}
            <button type="button" onClick={handleOnCloseTransferModal}>
              Close modal
            </button>
          </form>
        </div>
      )}
    </>
  );
}
