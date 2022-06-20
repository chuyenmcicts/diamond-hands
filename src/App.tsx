import React, { useCallback, useEffect, useState } from 'react';
import { connectMetamask, getBalances, initialize, installMetaMask, deposit, withdraw } from './controllers/ui-helpers';
import { BigNumber } from 'ethers';
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { useMetaMaskAccount } from './hooks/useMetamaskAccount';

function App() {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const { userAddress, setAddress } = useMetaMaskAccount();

  const onGetStarted = useCallback(async () => {
    if (metaMaskInstalled) {
      const address = await connectMetamask();
      setAddress(address);
    } else {
      installMetaMask();
    }
  }, [metaMaskInstalled]);

  const loadBalances = useCallback((address: string) => {
    return getBalances(address)
  }, []);

  const onDeposit = useCallback((amount: number) => {
    console.log(`Depositing ${amount}`);
    deposit(amount);
  }, [])

  const onWithdraw = useCallback((amount: BigNumber) => {
    console.log(`Withdrawing ${amount}`)
    withdraw(amount);
  }, [])

  useEffect(() => {
    const isMetaMaskInstalled = initialize();
    setMetaMaskInstalled(isMetaMaskInstalled);
  }, []);

  return (
    <div className="App">
      {userAddress ? (
        <Home
          address={userAddress}
          loadBalances={loadBalances}
          deposit={onDeposit}
          withdraw={onWithdraw}
        />
      ) : (
        <Welcome
          onGetStarted={onGetStarted}
        />
      )}
    </div>
  );
}

export default App;
