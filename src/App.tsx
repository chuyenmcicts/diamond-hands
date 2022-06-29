import React, { useCallback, useEffect, useState } from 'react';
import { connectMetamask, getTokens, initialize, installMetaMask, buy, redeem, loadEnv } from './controllers/ui-helpers';
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { useMetaMaskAccount } from './hooks/useMetamaskAccount';
import { useMetamaskNetwork } from './hooks/useMetamaskNetwork';

function App() {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const { supportedChainId } = loadEnv();
  const chainInfo = useMetamaskNetwork(supportedChainId);
  const { userAddress, setAddress } = useMetaMaskAccount();

  const onGetStarted = useCallback(async () => {
    if (metaMaskInstalled) {
      const address = await connectMetamask();
      setAddress(address);
    } else {
      installMetaMask();
    }
  }, [metaMaskInstalled, setAddress]);

  const loadTokens = useCallback((address: string) => {
    return getTokens(address)
  }, []);

  const onBuy = useCallback(() => {    
    buy();
  }, [])

  const onRedeem = useCallback((tokenId: number) => {    
    redeem(tokenId);
  }, [])

  useEffect(() => {
    const isMetaMaskInstalled = initialize();
    setMetaMaskInstalled(isMetaMaskInstalled);
  }, []);

  return (
    <div className="App">
      {userAddress ? !chainInfo ? null : (
        <Home
          address={userAddress}
          chainInfo={chainInfo}
          supportedChainId={supportedChainId}
          loadTokens={loadTokens}
          buy={onBuy}
          redeem={onRedeem}
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
