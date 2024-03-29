import React, { ChangeEvent, useEffect, useState } from "react";
import { useSigner, useBalance } from "wagmi";
import { getTokenAmountPerUSDT } from "../utils/Presale";
import { useBuyToken } from "../hooks/useBuyToken";
import { ethers } from "ethers";
import { usdtContractAddress } from "../constants/basic";
import ConnectWallet from "../components/ConnectWallet";

const Presale = () => {
  const { data: signer } = useSigner();
  const staticProvider = new ethers.providers.StaticJsonRpcProvider(
    "https://bsc-dataseed1.defibit.io"
  );

  const floorTokenAmount = 0.01;
  const [tokenAmountPerUSDT, setTokenAmountPerUSDT] = useState(0);
  const [USDTAmount, setUSDTAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [USDTStatus, setUSDTStatus] = useState<string>("");
  const [connectStatus, setConnectStatus] = useState<string>("");

  const { send: buyNMDToken, state: buyTransactionState } = useBuyToken();

  const buyUSDTValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUSDTAmount(parseFloat(evt.target.value));
    setTokenAmount(parseFloat(evt.target.value) * tokenAmountPerUSDT);
  };

  const loadBalance = async () => {
    if (staticProvider) {
      setTokenAmountPerUSDT(await getTokenAmountPerUSDT(staticProvider));
    } else {
      setTokenAmountPerUSDT(0);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [staticProvider]);

  const { data: USDTBalance } = useBalance({ address: usdtContractAddress });
  console.log("Balance", Number(USDTBalance?.formatted));

  useEffect(() => {
    if (signer && USDTBalance) {
      if (Number(USDTBalance?.formatted) < floorTokenAmount) {
        setUSDTStatus(`USDT Balance is lesser than 10`);
        return;
      }
      if (USDTAmount < floorTokenAmount)
        setUSDTStatus(`USDT Amount should be over ${floorTokenAmount}`);
      else setUSDTStatus("");
    } else {
      setUSDTStatus("");
    }
  }, [USDTAmount]);

  const handleBuyPressed = async () => {
    if (!signer) {
      setConnectStatus("Connect Wallet!");
      return;
    }
    if (!USDTAmount || USDTAmount < floorTokenAmount) {
      return;
    }
    setConnectStatus("");
    await buyNMDToken(USDTAmount, signer);
  };

  return (
    <div className="bg-[#0d0d0d] w-full py-5 rounded-lg text-gray-200 font-sans mx-3">
      <div className="border-b border-white p-4 sm:p-5">
        <h4 className="text-xl sm:text-2xl font-medium">Buy NMD Token</h4>
        <p className="text-[12px] sm:text-base">
          Minimum Purchase {floorTokenAmount} USDT (
          {floorTokenAmount * tokenAmountPerUSDT} NMD)
        </p>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="py-2 sm:py-3 text-[12px] sm:text-base">
            Enter USDT Value to purchase:
          </p>
          <input
            type="number"
            placeholder="0"
            onChange={buyUSDTValueChange}
            value={USDTAmount}
            className="bg-gray-800 py-2 px-3 text-white appearance-none text-[12px] sm:text-base"
          />
          <p className="text-[#fa1111] py-2 sm:py-3 text-[12px] sm:text-base">
            {USDTStatus}
          </p>
        </div>
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="text-[12px] sm:text-base">
            NMD Amount:{" "}
            <span className="text-[#ff7500]">{tokenAmount || 0} NMD</span>
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="py-2 px-4 rounded-md bg-orange-500 hover: text-[12px] sm:text-base cursor-pointer"
            onClick={handleBuyPressed}
            disabled={buyTransactionState?.status === "Pending"}
          >
            Buy NMD Token
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
