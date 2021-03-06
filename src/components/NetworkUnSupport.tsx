import React from "react";
import { chainList } from "../controllers/configs";
import { ChainInfo } from "../types";

interface IProps {
  chainInfo: ChainInfo;
  supportedChainId: number;
  onRequestChangeNetwork: () => void;
}

const Component = (props: IProps) => (
  <div className="group-text-connect">
    <p className="header-content-support">{`Not supported network ${chainList[Number(props.chainInfo.chainId)] || "Unknown"
      }. Please change it to ${chainList[Number(props.supportedChainId)]}`}</p>
    <button
      type="button"
      className="button-content custom-button"
      onClick={props.onRequestChangeNetwork}
    >
      Switch Network
    </button>
  </div>
);

export default Component;
