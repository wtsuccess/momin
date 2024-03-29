import { useCallback, useState } from "react";
import { Presale__factory, USDT__factory } from "../types";
import { Signer, ethers } from "ethers";
import { getMetamaskErrorMessage } from "../utils/metamask";
import { ICOContractAddress, USDTContractAddress } from "../utils/basic";

interface TransactionStatus {
    status: 'Pending' | 'Failed' | 'Success',
    errMsg?: string
}

export const useBuyMominCoin = () => {
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>();

    const buyToken = useCallback(async (USDTAmount: number, signer: Signer) => {
        setTransactionStatus({
            status: 'Pending'
        });
        const presale = Presale__factory.connect(ICOContractAddress, signer);
        try {
            const usdt = USDT__factory.connect(USDTContractAddress, signer);
            if ((await usdt.allowance(await signer.getAddress(), ICOContractAddress)).lt(ethers.utils.parseUnits(USDTAmount + "", 18))) {
                await usdt.approve(ICOContractAddress, ethers.utils.parseEther(USDTAmount + ""));
            }
            await presale.buyTokens(await signer.getAddress(), ethers.utils.parseEther(USDTAmount + ""))
            setTransactionStatus({
                status: 'Success'
            })
        } catch (err) {
            setTransactionStatus({
                status: 'Failed',
                errMsg: getMetamaskErrorMessage(err),
            })
        }
    }, []);

    return { send: buyToken, state: transactionStatus };
}