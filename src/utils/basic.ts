import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils.js";

export const ICOContractAddress = "0x432c3446c90dffe8b9bad49353661163e1763f3c";
export const USDTContractAddress = "0x55d398326f99059ff775485246999027b3197955";
export const MominCoinContractAddress = "0x467342163a32c974d2ed3d587de0fc00a891bbf2";
export const BSCRPCNode = new ethers.providers.StaticJsonRpcProvider(
    "https://bsc-dataseed1.defibit.io"
);
export const minPurchaseUSDT = Number(formatEther("5000000000000000000"));

