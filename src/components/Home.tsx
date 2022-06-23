import { BigNumber } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { Balance } from '../types';

import DepositModal from './DepositAmountModal';
import Navbar from './Navbar/Navbar';
import RowData from './RowData'
import RowDataMobile from './RowDataMobile'

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

  const onToggleDeposit = useCallback(() => {
    setShowDeposit(show =>!show);
  }, [])

  const handleDeposit = useCallback((amount: number) => {
    setShowDeposit(false);
    deposit(amount);
  }, [deposit]);

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
                <p className="number-asset-value">${balance.totalUsdtValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-equal">=</p>
              </div>
              <div>
                <p className="number-asset-value">{balance.rblBalance.toFixed(6)}</p>
              </div>
            </div>
            <div className="group-container">
              <button type="button" className="button-content custom-button" onClick={onToggleDeposit}>Add</button>
              <button type="button" className="button-content custom-button" onClick={handleWithdraw}>Remove</button>
              {showDeposit && <DepositModal onDeposit={handleDeposit} toggleModal={onToggleDeposit} />}
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

              <RowData
                image={iconBitcoin}
                balance={balance.balance1.toFixed(8)}
                value={balance.usdtValue1.toFixed(2)}
                price={balance.wbtcPrice.toFixed(2)}
                percent={bitcoinAlloccation}
                name='Bitcoin'
                unit='BTC'
                className='progress-bar-indicator'
              />

              <RowData
                image={iconEthereum}
                balance={balance.balance0.toFixed(6)}
                value={balance.usdtValue0.toFixed(2)}
                price={balance.ethPrice.toFixed(2)}
                percent={ethereumAlloccation}
                className='progress-bar-indicator-ethereum'
                name='Ethereum'
                unit='ETH'
              />

              <RowData
                image={usdCoin}
                balance={balance.balance2.toFixed(6)}
                value={balance.balance2.toFixed(2)}
                price={'1.00'}
                percent={usdCoinAlloccation}
                className='progress-bar-indicator-usd-coin'
                name='USD Coin'
                unit='USDC'
              />
            </table>

            <table className="table-mobile">
              <RowDataMobile
                image={iconBitcoin}
                percent={bitcoinAlloccation}
                balance={balance.balance1.toFixed(8)}
                value={balance.usdtValue1.toFixed(2)}
                className='progress-bar-indicator'
                name='Bitcoin'
                unit='BTC'
              />

              <RowDataMobile
                image={iconEthereum}
                percent={ethereumAlloccation}
                balance={balance.balance1.toFixed(6)}
                value={balance.usdtValue0.toFixed(2)}
                className='progress-bar-indicator-ethereum'
                name='Ethereum'
                unit='ETH'
              />

              <RowDataMobile
                image={usdCoin}
                percent={usdCoinAlloccation}
                balance={balance.balance2.toFixed(6)}
                value={balance.balance2.toFixed(2)}
                className='progress-bar-indicator-usd-coin'
                name='USD Coin'
                unit='USDC'
              />
            </table>
          </div>
        </div>
      </div>)
}

export default Component;
