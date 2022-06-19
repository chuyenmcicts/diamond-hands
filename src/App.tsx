import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { connectMetamask, getBalances, initialize, installMetaMask } from './controllers/ui-helpers';

function App() {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [userAddress, setAddress] = useState('');

  const onGetStarted = useCallback(async () => {
    if (metaMaskInstalled) {
      const address = await connectMetamask();
      setAddress('0x8e6F7613C259d10a2e88D874D76F6d8DD647c351');
    } else {
      installMetaMask();
    }
  }, [metaMaskInstalled]);

  const loadBalances = useCallback((address: string) => {
    return getBalances(address)
  }, []);

  const deposit = useCallback((amount: number) => {
    console.log(`Depositing ${amount}`);
  }, [])

  const withdraw = useCallback((amount: number) => {
    console.log(`Withdrawing ${amount}`)
  }, [])

  useEffect(() => {
    const isMetaMaskInstalled = initialize();
    setMetaMaskInstalled(isMetaMaskInstalled);
  }, []);

  return (
    <div className="App">
      {userAddress ? <Home address={userAddress} loadBalances={loadBalances} deposit={deposit} withdraw={withdraw} /> : <Welcome onGetStarted={onGetStarted} />}
    </div>
  );
}

export default App;
