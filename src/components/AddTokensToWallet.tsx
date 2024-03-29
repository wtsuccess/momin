import React from "react";
import { MominCoinContractAddress, USDTContractAddress } from "../utils/basic";
import { useDecimals, useSymbol } from "../hooks/useTokenInfo";

const AddTokensToWallet = () => {
  const { usdtSymbol, mominSymbol } = useSymbol();
  const { usdtDecimals, mominDecimals } = useDecimals();

  const addUSDTToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: USDTContractAddress,
              symbol: usdtSymbol,
              decimals: usdtDecimals,
            },
          },
        });
      } catch (err) {
        console.error("Add reverted");
      }
    }
  };

  const addMominToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: MominCoinContractAddress,
              symbol: mominSymbol,
              decimals: mominDecimals,
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="text-white text-sm md:text-lg grid grid-rows-2 items-center justify-center gap-3 py-2">
      <button
        type="button"
        className="py-3 px-4 rounded-sm bg-[#696762] hover:bg-[#305e9c] text-[12px] sm:text-base cursor-pointer font-bold"
        onClick={addMominToWallet}
      >
        Add MominCoin to your wallet
      </button>
      <button
        type="button"
        className="py-3 px-4 rounded-sm bg-[#696762] hover:bg-[#305e9c] text-[12px] sm:text-base cursor-pointer font-bold"
        onClick={addUSDTToWallet}
      >
        Add USDT to your wallet
      </button>
    </div>
  );
};

export default AddTokensToWallet;
