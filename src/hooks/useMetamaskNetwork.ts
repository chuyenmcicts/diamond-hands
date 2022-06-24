import { useEffect, useState } from "react";
import { chainList } from "../controllers/configs";
import { ChainInfo } from "../types";

const composeChainInfo = (chainId: number, supportedChainId: number) => chainId ? ({
  valid: Number(chainId) === Number(supportedChainId),
  chainId,
  name: chainList[Number(chainId)] || "Unknown",
}) : undefined;

export const useMetamaskNetwork = (supportedChainId: number) => {
  const ethereum = (window as any).ethereum;

  const [chainInfo, setChainInfo] = useState<ChainInfo | undefined>(undefined);

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
      const interval = setInterval(() => {
        chainId = Number(ethereum ? ethereum.chainId : 0);
        if (chainId) {
          setChainInfo(composeChainInfo(chainId, supportedChainId));
          clearInterval(interval);
        }
      }, 100)
    } else {
      setChainInfo(composeChainInfo(chainId, supportedChainId));
    }
  }, [ethereum, supportedChainId])

  return chainInfo;
};
