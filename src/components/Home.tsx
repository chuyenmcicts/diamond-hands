import { BigNumber } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { Balance } from '../types';

import DepositModal from './DepositAmountModal';
import Navbar from './Navbar/Navbar';

import iconBitcoin from '../../src/icon/bitcoin.png'
import iconEthereum from '../../src/icon/ethereum.png'
import usdCoin from '../../src/icon/usd_coin.png'

interface IProps {
  address: string;
  loadBalances: (address: string) => Promise<Balance>;
  deposit: (amount: number) => void;
  withdraw: (amount: BigNumber) => void;
}

const Component = ({ address, loadBalances, deposit, withdraw }: IProps) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const bitcoinAlloccation = (balance.usdtValue1 / (balance.totalUsdtValue || 1)) * 100;

  const ethereumAlloccation = (balance.usdtValue0 / (balance.totalUsdtValue || 1)) * 100;

  const usdCoinAlloccation = (balance.balance2 / (balance.totalUsdtValue || 1)) * 100;

  const handleDeposit = useCallback(() => {
    setShowDeposit(show => !show)
  }, [])

  const handleWithdraw = useCallback(() => {
    withdraw(balance.rblRawBalance)
  }, [withdraw, balance.rblRawBalance])

  useEffect(() => {
    setLoading(true);
    loadBalances(address).then(balance => {
      setBalance(balance);
      setLoading(false);
    });
  }, [address, loadBalances]);

  return (
    loading ? <p>loading...</p> :
      <div>
        <Navbar />
        <div className="text-portfolio">Your Portfolio</div>
        <div className="container-portfolio">
          <div className="container-header">
            <p className="text-header">Your Total Asset Value</p>
            <p className="text-hear-balance">Your RBL balance</p>
          </div>
          <div className="flex-container">
            <div className="group-asset">
              <div>
                <p className="number-asset-value">${balance.totalUsdtValue}</p>
              </div>
              <div>
                <p className="text-equal">=</p>
              </div>
              <div>
                <p className="number-asset-value">{balance.rblBalance}</p>
              </div>
            </div>
            <div className="group-container">
              <button type="button" className="button-content custom-button" onClick={handleDeposit}>Add</button>
              <button type="button" className="button-content custom-button" onClick={handleWithdraw}>Remove</button>
            </div>
          </div>
          <div className="text-token">Underlying Tokens</div>
          <div className="container-table">
            <table className="table-pc">
              <tr>
                <th>Token</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Token Price</th>
                <th>Allocation</th>
              </tr>
              <tr>
                <td><img src={iconBitcoin} alt="" height='20' width='20' /> Bitcoin</td>
                <td>{balance.balance1} BTC</td>
                <td>${balance.usdtValue1}</td>
                <td>${balance.wbtcPrice}</td>
                <td>{bitcoinAlloccation}%</td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator" style={{ width: `${bitcoinAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td><img src={iconEthereum} alt="" height='20' width='20' /> Ethereum</td>
                <td>{balance.balance0} ETH</td>
                <td>${balance.usdtValue0}</td>
                <td>${balance.wbtcPrice}</td>
                <td>{ethereumAlloccation}%</td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator-ethereum" style={{ width: `${ethereumAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td><img src={usdCoin} alt="" height='20' width='20' /> USD Coin</td>
                <td>{balance.balance2} USDC</td>
                <td>${balance.balance2}</td>
                <td>$1.00</td>
                <td>{usdCoinAlloccation}%</td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator-usd-coin" style={{ width: `${usdCoinAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>
            </table>
            <table className="table-mobile">
              <tr>
                <td><img src={iconBitcoin} alt="" height='20' width='20' /> Bitcoin</td>
                <td>{bitcoinAlloccation}%</td>
              </tr>
              <tr>
                <td>{balance.balance1} BTC</td>
                <td>${balance.usdtValue1}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator" style={{ width: `${bitcoinAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>

              <tr>
                <td><img src={iconEthereum} alt="" height='20' width='20' /> Ethereum</td>
                <td>{ethereumAlloccation}%</td>
              </tr>
              <tr>
                <td>{balance.balance1} ETH</td>
                <td>${balance.usdtValue0}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator-ethereum" style={{ width: `${ethereumAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>

              <tr>
                <td><img src={usdCoin} alt="" height='20' width='20' /> USD Coin</td>
                <td>{usdCoinAlloccation}%</td>
              </tr>
              <tr>
                <td>{balance.balance2} USDC</td>
                <td>${balance.balance2}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-indicator-usd-coin" style={{ width: `${usdCoinAlloccation}%` }}></div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>)
}

export default Component;
