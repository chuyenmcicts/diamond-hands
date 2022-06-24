import { useEffect, useState } from "react";
import { chainList } from "../controllers/configs";
import { ChainInfo } from "../types";

export const useMetamaskNetwork = (supportedChainId: number) => {
  const ethereum = (window as any).ethereum;
  const currentChainId = Number(ethereum ? ethereum.chainId : 0);

  const [chainInfo, setChainInfo] = useState<ChainInfo>({
    valid: Number(currentChainId) === Number(supportedChainId),
    chainId: currentChainId,
    name: chainList[Number(currentChainId)] || "Unknown",
  });

  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", (chainId: number) => {
        setChainInfo({
          valid: Number(supportedChainId) === Number(chainId),
          chainId: Number(chainId),
          name: chainList[Number(chainId)] || "Unknown",
        });
      });
    }
  }, [ethereum, supportedChainId]);

  return chainInfo;
};
