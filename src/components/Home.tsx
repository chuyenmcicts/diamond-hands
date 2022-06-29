import React, { useCallback, useEffect, useState } from "react";
import { ChainInfo, Token, TokenData } from "../types";

import Navbar from "./Navbar/Navbar";
import RowData from "./RowData";
import RowDataMobile from "./RowDataMobile";
import NetworkUnSupport from "./NetworkUnSupport";
import Spinner from "./Spinner/Spinner";

import iconBitcoin from "../../src/icon/bitcoin.png";
import iconEthereum from "../../src/icon/ethereum.png";
import usdCoin from "../../src/icon/usd_coin.png";
import iconDiamond from "../../src/icon/diamond.png";

interface IProps {
  address: string;
  chainInfo: ChainInfo;
  supportedChainId: number;
  loadTokens: (address: string) => Promise<Token>;
  buy: () => void;
  redeem: (tokenId: number) => void;
}

const Component = ({
  address,
  chainInfo,
  supportedChainId,
  loadTokens,
  buy,
  redeem,
}: IProps) => {
  const [loading, setLoading] = useState(true);

  const [tokens, setToken] = useState<Token>({} as Token);

  const [tokenInTable, setTokenInTable] = useState<TokenData>({} as TokenData);

  let sumAllToken = 0;
  if (tokens && tokens.length) {
    tokens.forEach((item) => {
      sumAllToken += item.ethValue + item.btcValue + item.usdcAsset;
    })
  }

  const allowcationOfBitcoin = (tokenInTable.btcValue / sumAllToken) * 100;

  const allowcationOfEth = (tokenInTable.ethValue / sumAllToken) * 100;

  const allowcationOfUsd = (tokenInTable.usdcAsset / sumAllToken) * 100;

  const handleDataTable = (token: TokenData) => () => {
    setTokenInTable(token)
  };

  const handleBuy = useCallback(() => {
    buy();
  }, [buy]);

  const handleRedeem = useCallback(() => {
    redeem(tokenInTable.tokenId);
  }, [redeem, tokenInTable.tokenId]);

  const onRequestChangeNetwork = useCallback(() => {
    (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(supportedChainId).toString(16)}` }], // chainId must be in hexadecimal numbers
    });
  }, [supportedChainId]);

  useEffect(() => {
    if (!chainInfo.valid) {
      setLoading(true);
      return;
    }
    setLoading(true);
    loadTokens(address).then((data) => {
      setToken(data);
      setTokenInTable(data[0])
      setLoading(false);
    });
  }, [chainInfo, loadTokens, address]);

  return !chainInfo.valid ? (
    <NetworkUnSupport
      chainInfo={chainInfo}
      supportedChainId={supportedChainId}
      onRequestChangeNetwork={onRequestChangeNetwork}
    />
  ) : (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="container-header">
            <p className="text-header">Your Asset</p>
          </div>
          <div className="flex-container">
            <div className="group-asset">
              <div>
                <p className="number-asset-value">
                  {tokens.map((token, index) => {
                    return (
                      <img
                        className="image-diamond"
                        onClick={handleDataTable(token)}
                        key={index}
                        src={iconDiamond}
                        alt=""
                        height='50'
                        width='50'
                      />
                    )
                  })}
                </p>
              </div>
              <div>
                <p className="text-equal">=</p>
              </div>
              <div>
                <p className="number-asset-value">
                  ${sumAllToken.toFixed(6)}
                </p>
              </div>
            </div>
            <div className="group-container">
              <button
                type="button"
                className="button-content custom-button first-button"
                onClick={handleBuy}
              >
                Buy<img className="img-button" src={iconDiamond} alt="" height='30' width='30' />
              </button>
            </div>
          </div>
          <div className="container-detail">
            <div className="header-container">
              <div className="text-token">Token ID: {tokenInTable.tokenId}</div>
              <div className="button-claim">
                <button
                  className="custom-button redeem"
                  disabled={tokenInTable.count < 12}
                  onClick={handleRedeem}
                >Redeem</button>
              </div>
            </div>
            <div className="split-custom"></div>
            <div className="container-table">
              <table className="table-pc">
                <tbody>
                  <tr>
                    <th>Token</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Token Price</th>
                    <th>Allocation</th>
                  </tr>
                </tbody>

                <RowData
                  image={iconBitcoin}
                  balance={tokenInTable.btcAsset.toFixed(8)}
                  value={tokenInTable.btcValue.toFixed(6)}
                  price={tokenInTable.btcPrice.toFixed(2)}
                  percent={allowcationOfBitcoin.toFixed(2)}
                  name="Bitcoin"
                  unit="BTC"
                  className="progress-bar-indicator"
                />

                <RowData
                  image={iconEthereum}
                  balance={tokenInTable.ethAsset.toFixed(6)}
                  value={tokenInTable.ethValue.toFixed(6)}
                  price={tokenInTable.ethPrice.toFixed(2)}
                  percent={allowcationOfEth.toFixed(2)}
                  className="progress-bar-indicator-ethereum"
                  name="Ethereum"
                  unit="ETH"
                />

                <RowData
                  image={usdCoin}
                  balance={tokenInTable.usdcAsset.toFixed(6)}
                  value={tokenInTable.usdcAsset.toFixed(6)}
                  price={"1.00"}
                  percent={allowcationOfUsd.toFixed(2)}
                  className="progress-bar-indicator-usd-coin"
                  name="USD Coin"
                  unit="USDC"
                />
              </table>

              <table className="table-mobile">
                <RowDataMobile
                  image={iconBitcoin}
                  percent={allowcationOfBitcoin.toFixed(2)}
                  balance={tokenInTable.btcAsset.toFixed(8)}
                  value={tokenInTable.btcValue.toFixed(6)}
                  className="progress-bar-indicator"
                  name="Bitcoin"
                  unit="BTC"
                />

                <RowDataMobile
                  image={iconEthereum}
                  percent={allowcationOfEth.toFixed(2)}
                  balance={tokenInTable.ethAsset.toFixed(6)}
                  value={tokenInTable.ethValue.toFixed(6)}
                  className="progress-bar-indicator-ethereum"
                  name="Ethereum"
                  unit="ETH"
                />

                <RowDataMobile
                  image={usdCoin}
                  percent={allowcationOfUsd.toFixed(2)}
                  balance={tokenInTable.usdcAsset.toFixed(6)}
                  value={tokenInTable.usdcAsset.toFixed(6)}
                  className="progress-bar-indicator-usd-coin"
                  name="USD Coin"
                  unit="USDC"
                />
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Component;