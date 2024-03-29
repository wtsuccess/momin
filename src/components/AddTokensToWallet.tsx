import React from "react";
import { addNMDToMetamask, addUSDTToMetamask } from "../utils/metamask";

const AddTokensToWallet = () => {
  return (
    <div className="text-white text-sm md:text-lg grid grid-rows-2 items-center justify-center gap-3 py-2">
      <button
        type="button"
        className="py-3 px-4 rounded-sm bg-[#696762] hover:bg-[#305e9c] text-[12px] sm:text-base cursor-pointer font-bold"
        onClick={addNMDToMetamask}
      >
        Add NMD token to your wallet
      </button>
      <button
        type="button"
        className="py-3 px-4 rounded-sm bg-[#696762] hover:bg-[#305e9c] text-[12px] sm:text-base cursor-pointer font-bold"
        onClick={addUSDTToMetamask}
      >
        Add USDT token to your wallet
      </button>
    </div>
  );
};

export default AddTokensToWallet;
