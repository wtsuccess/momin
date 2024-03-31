import React, { useEffect, useState } from "react";
import { useSigner, useBalance } from "wagmi";
import { minPurchaseUSDT, USDTContractAddress } from "../utils/basic";
import ConnectWallet from "../components/ConnectWallet";
import { useBuyMominCoin } from "../hooks/useBuyToken";
import { formatUnits, parseEther } from "ethers/lib/utils.js";
import { useRate } from "../hooks/useCoinAmount";

const Presale = () => {
  const { send: buyMominCoin, state: buyTransactionState } = useBuyMominCoin();
  const { data: USDTBalance } = useBalance({ address: USDTContractAddress });
  const { data: signer } = useSigner();
  const rate: number = useRate();

  const [USDTAmount, setUSDTAmount] = useState<number | undefined>();
  const [USDTStatus, setUSDTStatus] = useState<string>("");
  const [connectStatus, setConnectStatus] = useState<string>("");

  useEffect(() => {
    if (!Number(USDTBalance?.formatted)) {
      setUSDTStatus(`USDT Balance is 0, Please fund USDT to your wallet`);
      return;
    }
    if (USDTAmount && USDTAmount < minPurchaseUSDT) {
      setUSDTStatus(`USDT Amount should be larger than ${minPurchaseUSDT}`);
      return;
    }
    if (
      USDTAmount &&
      USDTAmount > Number(formatUnits(Number(USDTBalance?.formatted)))
    ) {
      setUSDTStatus(`Over USDT Balance ${USDTBalance?.formatted}`);
      return;
    }
  }, [USDTAmount, USDTBalance]);

  const getCoinAmount = (usdtAmount: number | undefined) => {
    if (!usdtAmount) return 0;
    return parseEther(usdtAmount + "").mul(rate);
  };

  const handleBuyMominCoin = async () => {
    if (!signer) {
      setConnectStatus("Connect Wallet!");
      return;
    }
    console.log("USDTAmount", USDTAmount);
    console.log("minPurchaseUSDT", minPurchaseUSDT);
    
    if (!USDTAmount || USDTAmount < minPurchaseUSDT) {
      return;
    }
    setConnectStatus("");
    await buyMominCoin(USDTAmount, signer);
  };

  return (
    <div className="bg-[#0d0d0d] w-full py-5 rounded-lg text-gray-200 font-sans mx-3">
      <div className="border-b border-white p-4 sm:p-5">
        <h4 className="text-xl sm:text-2xl font-medium">Buy MominCoin</h4>
        <p className="text-[12px] sm:text-base">
          Minimum Purchase {minPurchaseUSDT} USDT (
          {Number(getCoinAmount(minPurchaseUSDT))} MOMIN)
        </p>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="py-2 sm:py-3 text-[12px] sm:text-base">
            Enter USDT Value to purchase Momin Coin:
          </p>
          <input
            onChange={(e) => setUSDTAmount(Number(e.target.value))}
            value={USDTAmount}
            className="bg-gray-800 py-2 px-3 text-white appearance-none text-[12px] sm:text-base"
          />
          <p className="text-[#fa1111] py-2 sm:py-3 text-[12px] sm:text-base">
            {USDTStatus}
          </p>
        </div>
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="text-[12px] sm:text-base">
            Momin Coin Amount:
            <span className="text-[#ff7500]">
              {Number(getCoinAmount(USDTAmount))} MOMIN
            </span>
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="py-2 px-4 rounded-md bg-orange-500 hover: text-[12px] sm:text-base cursor-pointer"
            onClick={handleBuyMominCoin}
            disabled={buyTransactionState?.status === "Pending"}
          >
            Buy MominCoin
          </button>
          <div className="bg-[#40b126] px-4 py-2 rounded-md hover:bg-[#198726]">
            <ConnectWallet />
          </div>
        </div>
        {!signer && (
          <p className="text-[#fa1111] py-2 sm:py-3 text-[12px] sm:text-base text-right">
            {connectStatus}
          </p>
        )}
        {buyTransactionState?.status === "Failed" && (
          <p className="text-[#fa1111] py-2 sm:py-3 text-[12px] sm:text-base text-right">
            {buyTransactionState.errMsg}
          </p>
        )}
        {buyTransactionState?.status === "Success" && (
          <p className="text-green-500 py-2 sm:py-3 text-[12px] sm:text-base text-right">
            Transaction successful
          </p>
        )}
      </div>
    </div>
  );
};

export default Presale;
