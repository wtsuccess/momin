import { useEffect, useState } from "react";
import {
    BSCRPCNode,
    MominCoinContractAddress,
    USDTContractAddress,
} from "../utils/basic";
import { MominCoin__factory, USDT__factory } from "../types";

const usdtContract = USDT__factory.connect(USDTContractAddress, BSCRPCNode);
const momincoinContract = MominCoin__factory.connect(
    MominCoinContractAddress,
    BSCRPCNode
);

export const useSymbol = () => {
    const [usdtSymbol, setUsdtSymbol] = useState<string>("");
    const [mominSymbol, setMominSymbol] = useState<string>("");

    useEffect(() => {
        (async () => {
            const usdtSymbol = await usdtContract.symbol();
            setUsdtSymbol(usdtSymbol);
            const mominSymbol = await momincoinContract.symbol();
            setMominSymbol(mominSymbol);
        })();
    }, []);

    return {
        usdtSymbol, mominSymbol
    }
}

export const useDecimals = () => {
    const [usdtDecimals, setUsdtDecimals] = useState<number>(18);
    const [mominDecimals, setMominDecimals] = useState<number>(18);

    useEffect(() => {
        (async () => {
            const usdtDecimals = await usdtContract.decimals();
            setUsdtDecimals(usdtDecimals);
            const mominDecimals = await momincoinContract.decimals();
            setMominDecimals(mominDecimals)
        })();
    }, [])
    return {
        usdtDecimals, mominDecimals
    }
}