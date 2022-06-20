import { BigNumber } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { Balance } from '../types';

import DepositModal from './DepositAmountModal';

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
    <p>{`Balance 0: ${balance.balance0}`}</p>
    <p>{`Balance 1: ${balance.balance1}`}</p>
    <p>{`Balance 2: ${balance.balance2}`}</p>
    <p>{`RBL Balance: ${balance.rblBalance}`}</p>
    <p>{`Value 1: ${balance.usdtValue0}`}</p>
    <p>{`Value 2: ${balance.usdtValue1}`}</p>
    <p>{`Total USDT value: ${balance.totalUsdtValue}`}</p>
    <button type="button" className="btn btn-primary" onClick={handleDeposit} >Deposit</button>
    <button type="button" className="btn btn-primary" onClick={handleWithdraw} >Withdraw</button>
    {showDeposit && <DepositModal onDeposit={deposit}/>}
  </div>)
}

export default Component;
