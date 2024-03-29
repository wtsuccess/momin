import { NMDAddress, usdtContractAddress } from "../constants/basic";

export const METAMASK_ERRORS: Record<string, string> = {
  "-32700":
    "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
  "-32600": "The JSON sent is not a valid Request object.",
  "-32601": "The method does not exist / is not available.",
  "-32602": "Invalid method parameter(s).",
  "-32603": "Internal JSON-RPC error.",
  "-32000": "Invalid input.",
  "-32001": "Resource not found.",
  "-32002": "Resource unavailable.",
  "-32003": "Transaction rejected.",
  "-32004": "Method not supported.",
  "-32005": "Request limit exceeded.",
  "4001": "User rejected the request.",
  "4100":
    "The requested account and/or method has not been authorized by the user.",
  "4200": "The requested method is not supported by this Ethereum provider.",
  "4900": "The provider is disconnected from all chains.",
  "4901": "The provider is disconnected from the specified chain.",
};

export const getMetamaskErrorMessage = (error: any) => {
  const errorCode = error.code + "";
  if (errorCode === "-32603" && error?.data?.message) {
    return error.data.message as string;
  }
  if (METAMASK_ERRORS[errorCode]) {
    return METAMASK_ERRORS[errorCode];
  }
  return "Buy Failed";
};

export const addUSDTToMetamask = async () => {
  const tokenSymbol = "USDT";
  const tokenDecimals = 18;
  // const tokenImage = "http://placekitten.com/200/300";

  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: usdtContractAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (err) {
      console.log("Add reverted");
    }
  }
};

export const addNMDToMetamask = async () => {
  const tokenSymbol = "NMD";
  const tokenDecimals = 18;
  // const tokenImage = "http://placekitten.com/200/300";

  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: NMDAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};
