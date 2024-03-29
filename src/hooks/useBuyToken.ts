import { useCallback, useState } from "react";
import { presaleContractAddress, usdtContractAddress } from "../constants/basic";
import { Presale__factory, USDT__factory } from "../types";
import { Signer, ethers } from "ethers";
import { getMetamaskErrorMessage } from "../utils/metamask";

interface TransactionStatus {
    status: 'Pending' | 'Failed' | 'Success',
    errMsg?: string
}

export const useBuyToken = () => {
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>();

    const buyToken = useCallback(async (USDTAmount: number, signer: Signer) => {
        setTransactionStatus({
          status: 'Pending'  
        });
        const presale = Presale__factory.connect(presaleContractAddress, signer);
        try {
            const usdt = USDT__factory.connect(usdtContractAddress, signer);
            if ((await usdt.allowance(await signer.getAddress(), presaleContractAddress)).lt(ethers.utils.parseUnits(USDTAmount + "", 18))) {
                await usdt.approve(presaleContractAddress, ethers.utils.parseEther(USDTAmount + ""));
            }
            await presale.buyTokens(ethers.utils.parseEther(USDTAmount + ""));
            setTransactionStatus({
                status: 'Success'
            })
        } catch(err) {
            console.log("error while buying: ", err);
            setTransactionStatus({
                status: 'Failed',
                errMsg: getMetamaskErrorMessage(err),
            })
        }
    }, []);

    return {send: buyToken, state: transactionStatus};
}