import React, { useCallback, useEffect, useState } from 'react';
import { connectMetamask, getBalances, initialize, installMetaMask, deposit, withdraw, checkConnection } from './controllers/ui-helpers';
import { BigNumber } from 'ethers';
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';

function App() {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [userAddress, setAddress] = useState('');

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

    if (isMetaMaskInstalled) {
      const ethereum = (window as any).ethereum;
      ethereum.on('accountsChanged', (accounts: string[]) => {
        // Time to reload your interface with accounts[0]!
        setAddress(accounts[0]);
      })
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (userAddress) {
      timer = setInterval(() => {
        checkConnection().then(setAddress)
      }, 1000);
    }

    return () => {
      timer && clearInterval(timer);
    }
  }, [userAddress])

  return (
    <div className="App">
      {userAddress ? <Home address={userAddress} loadBalances={loadBalances} deposit={onDeposit} withdraw={onWithdraw} /> : <Welcome onGetStarted={onGetStarted} />}
    </div>
  );
}

export default App;
