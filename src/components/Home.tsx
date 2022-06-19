import React, { useCallback, useEffect, useState } from 'react';
import { Balance } from '../types';

import DepositModal from './DepositAmountModal';

interface IProps {
  address: string;
  loadBalances: (address: string) => Promise<Balance>;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

const Component = ({ address, loadBalances, deposit, withdraw }: IProps) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const handleDeposit = useCallback(() => {
    setShowDeposit(show => !show)
  }, [])

  const handleWithdraw = useCallback(() => {
    withdraw(Number(balance.rblBalance))
  }, [withdraw, balance.rblBalance])

  useEffect(() => {
    loadBalances(address).then(setBalance);
  }, [address, loadBalances]);

  return (
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
