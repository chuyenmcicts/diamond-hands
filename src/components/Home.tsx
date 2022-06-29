import { BigNumber } from "ethers";
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
  loadBalances: () => Promise<Token>;
  deposit: (amount: number) => void;
  withdraw: (amount: BigNumber) => void;
}

const Component = ({
  address,
  chainInfo,
  supportedChainId,
  loadBalances,
  deposit,
  withdraw,
}: IProps) => {
  const [loading, setLoading] = useState(true);

  const [tokens, setToken] = useState<Token>({} as Token);

  const [tokenInTable, setTokenInTable] = useState<TokenData>({} as TokenData);

  let sumAllToken = 0;
  if (tokens && tokens.length) {
    tokens.forEach((item) => {
      sumAllToken += item.ethAsset * item.ethPrice + item.btcAsset * item.btcPrice + item.usdcAsset;
    })
  }

  const allowcationOfBitcoin = ((tokenInTable.btcAsset * tokenInTable.btcPrice) / sumAllToken) * 100;

  const allowcationOfEth = ((tokenInTable.ethAsset * tokenInTable.ethPrice) / sumAllToken) * 100;

  const allowcationOfUsd = (tokenInTable.usdcAsset / sumAllToken) * 100;

  const matureMonth = (unixTimestamp: number) => {
    const a = new Date(unixTimestamp * 1000);
    const monthCalc = a.setMonth(a.getMonth() + 12 - tokenInTable.count);
    const convertedMonth = new Date(monthCalc);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = convertedMonth.getFullYear();
    const month = months[convertedMonth.getMonth()];
    const time = month + ' ' + year;
    return time;
  }

  const renderButton = () => {
    return (
      <>
        {
          tokenInTable.count >= 12 ?
            (
              <button className="custom-button redeem">Redeem</button>
            ) :
            <button disabled={tokenInTable.count !== 12} className="custom-button claim">{matureMonth(tokenInTable.startMonth)}<br></br>to redeem</button>
        }
      </>
    )
  }

  const handleDataTable = (token: TokenData) => () => {
    setTokenInTable(token)
  };

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
    loadBalances().then((data) => {
      setToken(data);
      setTokenInTable(data[0])
      setLoading(false);
    });
  }, [chainInfo, loadBalances]);

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
                  ${sumAllToken.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="group-container">
              <button
                type="button"
                className="button-content custom-button first-button">
                Buy <img src={iconDiamond} alt="" height='30' width='30' />
              </button>
            </div>
          </div>
          <div className="container-detail">
            <ul>
              <li className="text-token">{tokenInTable.tokenId}</li>
              <li className="button-claim">{renderButton()}</li>
            </ul>
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
                  value={(tokenInTable.btcAsset * tokenInTable.btcPrice).toFixed(2)}
                  price={tokenInTable.btcPrice.toFixed(2)}
                  percent={allowcationOfBitcoin.toFixed(2)}
                  name="Bitcoin"
                  unit="BTC"
                  className="progress-bar-indicator"
                />

                <RowData
                  image={iconEthereum}
                  balance={tokenInTable.ethAsset.toFixed(6)}
                  value={(tokenInTable.ethAsset * tokenInTable.ethPrice).toFixed(2)}
                  price={tokenInTable.ethPrice.toFixed(2)}
                  percent={allowcationOfEth.toFixed(2)}
                  className="progress-bar-indicator-ethereum"
                  name="Ethereum"
                  unit="ETH"
                />

                <RowData
                  image={usdCoin}
                  balance={tokenInTable.usdcAsset.toFixed(6)}
                  value={tokenInTable.usdcAsset.toFixed(2)}
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
                  value={(tokenInTable.btcAsset * tokenInTable.btcPrice).toFixed(2)}
                  className="progress-bar-indicator"
                  name="Bitcoin"
                  unit="BTC"
                />

                <RowDataMobile
                  image={iconEthereum}
                  percent={allowcationOfEth.toFixed(2)}
                  balance={tokenInTable.ethAsset.toFixed(6)}
                  value={(tokenInTable.ethAsset * tokenInTable.ethPrice).toFixed(2)}
                  className="progress-bar-indicator-ethereum"
                  name="Ethereum"
                  unit="ETH"
                />

                <RowDataMobile
                  image={usdCoin}
                  percent={allowcationOfUsd.toFixed(2)}
                  balance={tokenInTable.usdcAsset.toFixed(6)}
                  value={tokenInTable.usdcAsset.toFixed(2)}
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