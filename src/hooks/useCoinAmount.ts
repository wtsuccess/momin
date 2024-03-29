import {
    BSCRPCNode, ICOContractAddress,
} from "../utils/basic";
import { Presale__factory } from "../types";
import { useEffect, useState } from "react";

const presale = Presale__factory.connect(ICOContractAddress, BSCRPCNode);

export const useRate = () => {
    const [rate, setRate] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const rate = await presale.rate();
            setRate(Number(rate));
        })();
    }, [])

    return rate;
}

