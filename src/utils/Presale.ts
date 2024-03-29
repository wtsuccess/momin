import { ethers } from "ethers";
import { presaleContractAddress } from "../constants/basic";
import { Presale__factory } from "../types";

export const getTokenAmountPerUSDT = async (provider: ethers.providers.Provider | ethers.Signer) => {
    const presale = Presale__factory.connect(presaleContractAddress, provider);
    try {
        const tokenAmountPerUSDT = await presale.tokenprice();
        return tokenAmountPerUSDT.toNumber();
    } catch (err) {
        console.log(err);
        return 0;
    }
}