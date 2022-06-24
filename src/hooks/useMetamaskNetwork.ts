import { useEffect, useState } from "react";
import { chainList } from "../controllers/configs";
import { ChainInfo } from "../types";

const composeChainInfo = (chainId: number, supportedChainId: number) => ({
  valid: Number(chainId) === Number(supportedChainId),
  chainId,
  name: chainList[Number(chainId)] || "Unknown",
});

export const useMetamaskNetwork = (supportedChainId: number) => {
  const ethereum = (window as any).ethereum;
  const currentChainId = Number(ethereum ? ethereum.chainId : 0);

  const [chainInfo, setChainInfo] = useState<ChainInfo>(
    composeChainInfo(currentChainId, supportedChainId)
  );

  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", (chainId: number) => {
        setChainInfo(composeChainInfo(chainId, supportedChainId));
      });
    }
  }, [ethereum, supportedChainId]);

  // Sometime chainId is not available after starting
  // Need retry again
  useEffect(() => {
    let chainId = Number(ethereum ? ethereum.chainId : 0);
    if (!chainId) {
      setTimeout(() => {
        chainId = Number(ethereum ? ethereum.chainId : 0);
        setChainInfo(composeChainInfo(chainId, supportedChainId));
      }, 500)
    }
  }, [ethereum, supportedChainId])

  return chainInfo;
};
