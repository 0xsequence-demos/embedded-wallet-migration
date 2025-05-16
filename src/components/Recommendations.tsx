import type { Account } from "thirdweb/wallets";

export function Recommendation({ account }: { account: Account | undefined }) {
  return (
    <>
      {account ? (
        <div className="recommendation-box">
          <span className="recommendation-icon">💡</span>
          <span className="recommendation-text">
            To transfer your NFTs, click the transfer button above in any card{" "}
            <span role="img" aria-label="up">
              👆
            </span>
          </span>
        </div>
      ) : (
        <div className="recommendation-box">
          <p className="recommendation-icon">💡</p>
          <p className="recommendation-text">
            To transfer your NFTs, copy your Sequence Wallet address, log in
            here with ThirdWeb, and transfer whatever you want.
          </p>
        </div>
      )}
    </>
  );
}
